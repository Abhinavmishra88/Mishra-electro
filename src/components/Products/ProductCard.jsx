import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaEye,
  FaHeart,
} from "react-icons/fa";

import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

function ProductCard({ product }) {
  const {
    addToCart,
    isInCart,
  } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const wishlistActive =
    isInWishlist(product.id);

  const cartActive =
    isInCart(product.id);

  const handleWishlist = () => {
    if (wishlistActive) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">

      {/* Product Image */}
      <div className="product-image">

        <img
          src={product.image}
          alt={product.name}
        />

        {/* Wishlist */}
        <button
          type="button"
          className={
            wishlistActive
              ? "wishlist-btn active"
              : "wishlist-btn"
          }
          onClick={handleWishlist}
          title={
            wishlistActive
              ? "Remove from Wishlist"
              : "Add to Wishlist"
          }
        >
          <FaHeart />
        </button>

      </div>

      {/* Product Information */}
      <div className="product-info">

        <p className="product-category">
          {product.category}
        </p>

        <h3>
          {product.name}
        </h3>

        {/* Price */}
        <div className="product-price">

          <strong>
            ₹{product.price}
          </strong>

          {product.oldPrice && (
            <del>
              ₹{product.oldPrice}
            </del>
          )}

        </div>

        {/* Actions */}
        <div className="product-actions">

          {/* Cart */}
          <button
            type="button"
            className={
              cartActive
                ? "cart-btn added"
                : "cart-btn"
            }
            onClick={handleCart}
          >
            <FaShoppingCart />

            {cartActive
              ? "Added"
              : "Add to Cart"}
          </button>

          {/* Details */}
          <Link
            to={`/products/${product.id}`}
            className="view-btn"
            title="View Product"
          >
            <FaEye />
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;