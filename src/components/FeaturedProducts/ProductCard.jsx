import { Link } from "react-router-dom";
import {
  FaHeart,
  FaEye,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      {product.oldPrice && (

        <span className="sale-badge">

          {Math.round(
            ((product.oldPrice - product.price) /
              product.oldPrice) *
              100
          )}% OFF

        </span>

      )}

      <div className="product-actions">

        <button>

          <FaHeart />

        </button>

        <button>

          <FaEye />

        </button>

      </div>

      <div className="product-image">

        <img
          src={product.image}
          alt={product.name}
        />

      </div>

      <div className="product-body">

        <small>{product.category}</small>

        <h5>{product.name}</h5>

        <div className="rating">

          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />

          <span>

            ({product.rating || 5})

          </span>

        </div>

        <div className="price">

          <h4>₹{product.price}</h4>

          {product.oldPrice && (

            <del>

              ₹{product.oldPrice}

            </del>

          )}

        </div>

        <div className="d-grid gap-2 mt-3">

          <button className="btn btn-danger">

            <FaShoppingCart />

            Add To Cart

          </button>

          <Link
            to={`/product/${product.id}`}
            className="btn btn-outline-dark"
          >

            View Details

          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;