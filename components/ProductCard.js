// components/ProductCard.js
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 mb-4">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="mt-2 text-green-600">${product.price}</p>
    </div>
  );
};

export default ProductCard;
