import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
} from "react-icons/fa";

import useWishlist from "../hooks/useWishlist";
import useCart from "../hooks/useCart";

function Wishlist() {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  const {
    addToCart,
    isInCart,
  } = useCart();

  if (wishlist.length === 0) {
    return (
      <section className="py-5 bg-light">
        <div className="container text-center">

          <FaHeart
            size={70}
            className="text-muted mb-4"
          />

          <h2 className="fw-bold">
            Your Wishlist is Empty
          </h2>

          <p className="text-muted">
            Add products you love to your wishlist.
          </p>

          <Link
            to="/products"
            className="btn btn-danger mt-3"
          >
            Browse Products
          </Link>

        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-light">

      <div className="container">

        {/* Header */}
        <div className="mb-4">

          <h2 className="fw-bold">
            My Wishlist
          </h2>

          <p className="text-muted">
            {wishlist.length} product
            {wishlist.length !== 1 ? "s" : ""} saved
          </p>

        </div>

        {/* Products */}
        <div className="row g-4">

          {wishlist.map((product) => (

            <div
              className="col-xl-3 col-lg-4 col-md-6"
              key={product.id}
            >

              <div className="card border-0 shadow-sm h-100">

                {/* Image */}
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    height: "220px",
                    background: "#fff",
                    padding: "20px",
                  }}
                >

                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "190px",
                      objectFit: "contain",
                    }}
                  />

                </div>

                {/* Details */}
                <div className="card-body d-flex flex-column">

                  <small className="text-muted">
                    {product.category}
                  </small>

                  <h5 className="fw-bold mt-1">
                    {product.name}
                  </h5>

                  <h5 className="text-danger fw-bold">
                    ₹{product.price}
                  </h5>

                  {/* Buttons */}
                  <div className="d-flex gap-2 mt-auto pt-3">

                    {/* Add Cart */}
                    <button
                      type="button"
                      className={
                        isInCart(product.id)
                          ? "btn btn-success flex-grow-1"
                          : "btn btn-danger flex-grow-1"
                      }
                      onClick={() =>
                        addToCart(product)
                      }
                    >

                      <FaShoppingCart className="me-2" />

                      {isInCart(product.id)
                        ? "Added"
                        : "Add to Cart"}

                    </button>

                    {/* Remove */}
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      title="Remove from Wishlist"
                      onClick={() =>
                        removeFromWishlist(
                          product.id
                        )
                      }
                    >
                      <FaTrash />
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Wishlist;