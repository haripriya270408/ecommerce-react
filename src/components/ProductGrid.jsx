import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="row">
      {products.map(p => (
        <div className="col-md-4 mb-4" key={p.id}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;