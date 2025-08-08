import React, { useEffect, useState } from "react";
import type { Product } from "../types/type";
import ProductCard from "../components/productCard";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingData(true);
      setError(false);
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/product`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      } finally {
        setLoadingData(false);
      }
    };

    fetchProducts();
  }, []);

  if (loadingData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  } else if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 rounded shadow-2xl max-w-[50vw] mx-auto mt-10">
        Error in Loading.. Kindly Refresh the Page
      </div>
    );
  } else if (!loadingData && !error && products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">No products available.</p>
      </div>
    );
  }

  return (
    <>
      <div className="font-bold text-center m-4 text-4xl word-spacing-2 break-words">
        Our All Products
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Products;
