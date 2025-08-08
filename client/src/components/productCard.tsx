import type { Product } from "../types/type";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="border p-4 rounded shadow-xl">
    <h2 className="text-xl font-bold">{product.title}</h2>
    {product.price && (
      <p>
        <span className="font-bold">Price:</span> ₹{product.price}
      </p>
    )}
    {product.stock_status && (
      <p>
        <span className="font-bold">Status:</span> {product.stock_status}
      </p>
    )}
    {product.category && (
      <p>
        <span className="font-bold">Category:</span> {product.category}
      </p>
    )}
    {product.tags.length !== 0 && (
      <p>
        <span className="font-bold">Tags:</span> {product.tags.join(", ")}
      </p>
    )}
    {product.on_sale && (
      <p className="text-red-600 font-bold text-right">Sale!🎉🥳🎊🎁</p>
    )}
  </div>
);

export default ProductCard;
