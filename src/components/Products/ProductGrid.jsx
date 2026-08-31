import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  return (
    <div className="product-grid">

      {products.length === 0 ? (

        <h4>No Products Found</h4>

      ) : (

        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))

      )}

    </div>
  );
}

export default ProductGrid;