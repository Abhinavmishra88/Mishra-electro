import "./FeaturedProducts.css";
import { Link } from "react-router-dom";

import {
  FaHeart,
  FaShoppingCart,
  FaEye,
  FaStar,
} from "react-icons/fa";

import products from "../../data/products";
 
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

function FeaturedProducts() {
  const { addToCart } = useCart();

  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  /*
   * Show first 8 products
   */
  const featuredProducts = products.slice(0, 8);

  /*
   * Check wishlist
   */
  const isInWishlist = (productId) => {
    return wishlist.some(
      (item) =>
        String(item.id) === String(productId)
    );
  };

  /*
   * Wishlist handler
   */
  const handleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  /*
   * Cart handler
   */
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <section className="featured-products-section">

      <div className="featured-products-container">

        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="featured-products-header">

          <span className="featured-products-eyebrow">
            BEST SELLERS
          </span>

          <h2 className="featured-products-heading">
            Featured Products
          </h2>

          <p className="featured-products-subtitle">
            Explore our most popular electrical products
            selected for quality, reliability and performance.
          </p>

        </div>

        {/* =================================================
            PRODUCTS GRID
        ================================================= */}

        <div className="featured-products-grid">

          {featuredProducts.length > 0 ? (

            featuredProducts.map((product, index) => {

              const wishlistActive =
                isInWishlist(product.id);

              return (
                <article
                  className="featured-product-card"
                  key={product.id}
                >

                  {/* =================================================
                      PRODUCT NUMBER
                  ================================================= */}

                  <span className="featured-product-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* =================================================
                      PRODUCT IMAGE
                  ================================================= */}

                  <div className="featured-product-media">

                    <Link
                      to={`/product/${product.id}`}
                      className="featured-product-image-link"
                    >

                      {product.image ? (

                        <img
                          src={product.image}
                          alt={product.name}
                          className="featured-product-image"
                          loading="lazy"
                        />

                      ) : (

                        <div className="featured-no-image">
                          No Image
                        </div>

                      )}

                    </Link>

                    {/* =================================================
                        PRODUCT ACTIONS
                    ================================================= */}

                    <div className="featured-product-actions">

                      <button
                        type="button"
                        className={
                          wishlistActive
                            ? "featured-action-button wishlist-active"
                            : "featured-action-button"
                        }
                        onClick={() =>
                          handleWishlist(product)
                        }
                        aria-label={
                          wishlistActive
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                        title={
                          wishlistActive
                            ? "Remove from Wishlist"
                            : "Add to Wishlist"
                        }
                      >
                        <FaHeart />
                      </button>

                      <Link
                        to={`/product/${product.id}`}
                        className="featured-action-button"
                        aria-label="View product"
                        title="View Product"
                      >
                        <FaEye />
                      </Link>

                    </div>

                  </div>

                  {/* =================================================
                      PRODUCT INFORMATION
                  ================================================= */}

                  <div className="featured-product-info">

                    {/* Category */}

                    <span className="featured-product-category">
                      {product.category || "Electrical"}
                    </span>

                    {/* Product name */}

                    <Link
                      to={`/product/${product.id}`}
                      className="featured-product-name-link"
                    >

                      <h3 className="featured-product-name">
                        {product.name}
                      </h3>

                    </Link>

                    {/* =================================================
                        RATING
                    ================================================= */}

                    <div className="featured-product-rating">

                      <div className="featured-product-stars">

                        {[1, 2, 3, 4, 5].map(
                          (star) => (
                            <FaStar
                              key={star}
                            />
                          )
                        )}

                      </div>

                      <span>
                        5.0
                      </span>

                    </div>

                    {/* =================================================
                        PRICE
                    ================================================= */}

                    <div className="featured-product-pricing">

                      <span className="featured-product-current-price">
                        ₹{product.price}
                      </span>

                      {product.oldPrice && (
                        <span className="featured-product-old-price">
                          ₹{product.oldPrice}
                        </span>
                      )}

                    </div>

                    {/* =================================================
                        ADD TO CART
                    ================================================= */}

                    <button
                      type="button"
                      className="featured-product-cart-button"
                      onClick={() =>
                        handleAddToCart(product)
                      }
                    >

                      <FaShoppingCart />

                      <span>
                        Add to Cart
                      </span>

                    </button>

                  </div>

                </article>
              );
            })

          ) : (

            /* =================================================
               EMPTY STATE
            ================================================= */

            <div className="featured-products-empty">

              <h3>
                No featured products available
              </h3>

              <p>
                Please add products to your product list.
              </p>

              <Link
                to="/products"
                className="featured-products-empty-button"
              >
                View Products
              </Link>

            </div>

          )}

        </div>

        {/* =================================================
            VIEW ALL PRODUCTS
        ================================================= */}

        <div className="featured-products-footer">

          <Link
            to="/products"
            className="featured-products-view-all"
          >

            <span>
              View All Products
            </span>

            <span className="featured-products-arrow">
              →
            </span>

          </Link>

        </div>

      </div>

    </section>
  );
}

export default FeaturedProducts;