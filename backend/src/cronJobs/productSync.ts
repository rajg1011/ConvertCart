import Product from "../models/products.js";
import dotenv from "dotenv";
import WooCommerceRestApiModule from "@woocommerce/woocommerce-rest-api";
const WooCommerceRestApi = WooCommerceRestApiModule.default;
dotenv.config();
if (
  !process.env.WOOCOMMERCE_BASE_URL ||
  !process.env.WOOCOMMERCE_CUSTOMER_SECRET ||
  !process.env.WOOCOMMERCE_CUSTOMER_KEY
) {
  throw new Error("Missing WooCommerce API credentials");
}

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_BASE_URL,
  consumerKey: process.env.WOOCOMMERCE_CUSTOMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CUSTOMER_SECRET,
  version: "wc/v3",
  timeout: 60000,
});

const operationsOnDB = (products: any[]) => {
  return products.map((product) => ({
    updateOne: {
      filter: { id: product.id },
      update: {
        $set: {
          id: product.id,
          title: product.name,
          price: product.price,
          stock_status: product.stock_status,
          stock_quantity: product.stock_quantity,
          category: product.categories?.[0]?.name,
          tags: product.tags?.map((tag: any) => tag.name),
          on_sale: product.on_sale,
          created_at: product.date_created,
        },
      },
      upsert: true,
    },
  }));
};

const fetchAllProducts = async () => {
  try {
    let page = 1;
    let per_page = 100;
    let allProducts = [];
    let totalPages = 1;
    do {
      const response = await WooCommerce.get("products", {
        per_page: per_page,
        page: page,
      });
      const products = response.data;

      allProducts.push(...products);
      if (page === 1 && response.headers["x-wp-totalpages"]) {
        totalPages = parseInt(response.headers["x-wp-totalpages"]);
      }
      page++;
    } while (page <= totalPages);

    return allProducts;
  } catch (err) {
    throw new Error(
      `Fetching products failed: ${(err as Error)?.message || err}`
    );
  }
};

const ingestProducts = async () => {
  try {
    const products = await fetchAllProducts();
    const operations = operationsOnDB(products as any[]);
    await Product.bulkWrite(operations, { ordered: false });
    return { message: "Products ingested successfully" };
  } catch (err) {
    throw new Error(
      `Products ingestion failed: ${(err as Error)?.message || err}`
    );
  }
};

export default ingestProducts;
