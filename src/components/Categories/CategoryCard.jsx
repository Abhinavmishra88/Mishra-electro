import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className="category-card"
    >
      <img src={category.image} alt={category.name} />

      <h5>{category.name}</h5>

      <span className="view-products">
        View Products →
      </span>
    </Link>
  );
}

export default CategoryCard;