import {
  Link,
  useParams,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaShoppingCart,
  FaHeart,
  FaCheckCircle,
} from "react-icons/fa";

import { useProduct } from "../context/ProductContext";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

import "../styles/ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();

  const {
    getProductById,
  } = useProduct();

  const {
    addToCart,
    isInCart,
  } = useCart();

  const {
    wishlist = [],
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();


  /* =========================================
     GET PRODUCT
  ========================================= */

  const product =
    getProductById(id);


  /* =========================================
     PRODUCT NOT FOUND
  ========================================= */

  if (!product) {

    return (
      <section className="product-not-found">

        <div className="container text-center">

          <h2>
            Product Not Found
          </h2>

          <p>
            The product you are looking for
            does not exist.
          </p>

          <Link
            to="/products"
            className="btn btn-danger"
          >
            Back to Products
          </Link>

        </div>

      </section>
    );
  }


  /* =========================================
     WISHLIST
  ========================================= */

  const isWishlisted =
    wishlist.some(
      (item) =>
        String(item.id) === String(product.id)
    );


  const handleWishlist = () => {

    if (isWishlisted) {

      removeFromWishlist(product.id);

    } else {

      addToWishlist(product);

    }
  };


  return (
    <section className="product-details-section">

      <div className="container">

        {/* =====================================
            BACK
        ===================================== */}

        <Link
          to="/products"
          className="back-products"
        >
          <FaArrowLeft />
          Back to Products
        </Link>


        {/* =====================================
            PRODUCT
        ===================================== */}

        <div className="product-details-card">

          {/* ===================================
              IMAGE
          =================================== */}

          <div className="product-details-image">

            {product.image ? (

              <img
                src={product.image}
                alt={product.name}
              />

            ) : (

              <div className="no-product-image">
                No Image
              </div>

            )}

          </div>


          {/* ===================================
              INFORMATION
          =================================== */}

          <div className="product-details-info">

            {/* Category */}

            <span className="product-category">
              {product.category}
            </span>


            {/* Name */}

            <h1>
              {product.name}
            </h1>


            {/* Rating */}

            <div className="product-rating">

              <span>★★★★★</span>

              <small>
                5.0 / 5
              </small>

            </div>


            {/* Price */}

            <div className="product-details-price">

              <strong>
                ₹{product.price}
              </strong>

              {product.oldPrice && (
                <del>
                  ₹{product.oldPrice}
                </del>
              )}

            </div>


            {/* Description */}

            <div className="product-description">

              <h3>
                Product Description
              </h3>

              <p>
                {product.description ||
                  "High-quality electrical product designed for reliable and safe everyday use."}
              </p>

            </div>


            {/* Product information */}

            <div className="product-information">

              <h3>
                Product Information
              </h3>

              <div className="information-grid">

                <div>
                  <span>
                    Product
                  </span>

                  <strong>
                    {product.name}
                  </strong>
                </div>


                <div>
                  <span>
                    Category
                  </span>

                  <strong>
                    {product.category}
                  </strong>
                </div>


                {product.brand && (
                  <div>
                    <span>
                      Brand
                    </span>

                    <strong>
                      {product.brand}
                    </strong>
                  </div>
                )}


                {product.model && (
                  <div>
                    <span>
                      Model
                    </span>

                    <strong>
                      {product.model}
                    </strong>
                  </div>
                )}


                {product.wattage && (
                  <div>
                    <span>
                      Wattage
                    </span>

                    <strong>
                      {product.wattage}
                    </strong>
                  </div>
                )}


                {product.voltage && (
                  <div>
                    <span>
                      Voltage
                    </span>

                    <strong>
                      {product.voltage}
                    </strong>
                  </div>
                )}

              </div>

            </div>


            {/* Features */}

            {product.features &&
              product.features.length > 0 && (

                <div className="product-features">

                  <h3>
                    Key Features
                  </h3>

                  <ul>

                    {product.features.map(
                      (feature, index) => (

                        <li
                          key={index}
                        >
                          <FaCheckCircle />

                          <span>
                            {feature}
                          </span>
                        </li>

                      )
                    )}

                  </ul>

                </div>

              )}


            {/* =================================
                ACTIONS
            ================================= */}

            <div className="product-actions">

              {/* Cart */}

              <button
                type="button"
                className={
                  isInCart(product.id)
                    ? "details-cart-btn added"
                    : "details-cart-btn"
                }
                onClick={() =>
                  addToCart(product)
                }
              >

                <FaShoppingCart />

                {isInCart(product.id)
                  ? "Added to Cart"
                  : "Add to Cart"}

              </button>


              {/* Wishlist */}

              <button
                type="button"
                className={
                  isWishlisted
                    ? "details-wishlist-btn active"
                    : "details-wishlist-btn"
                }
                onClick={
                  handleWishlist
                }
              >

                <FaHeart />

                {isWishlisted
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProductDetails;