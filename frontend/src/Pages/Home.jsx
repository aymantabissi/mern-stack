import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useProductStore } from '../store/product';
import ProductCard from '../componentes/ProductCard';

function Home() {
  const { fetchProduct, products } = useProductStore();

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <div className="flex flex-col items-center py-12 bg-gray-100 min-h-screen">
      <div className="w-full max-w-6xl px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">Current Products</h1>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-4">No products found 😭</p>
            <Link 
              to="/CreateProduct" 
              className="text-blue-600 font-semibold hover:underline"
            >
              Create a Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
