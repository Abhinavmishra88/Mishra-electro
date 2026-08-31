import { Link } from "react-router-dom";
import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaShoppingCart,
  FaArrowLeft,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";

import useCart from "../hooks/useCart";
import "../styles/cart.css";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useCart();

  const shipping =
    cartTotal >= 1000 || cartTotal === 0 ? 0 : 50;

  const grandTotal = cartTotal + shipping;

  /* =====================================================
     EMPTY CART
  ===================================================== */

  if (!cart || cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">

          <div className="cart-empty">

            <div className="cart-empty-icon">
              <FaShoppingCart />
            </div>

            <h1>Your Cart is Empty</h1>

            <p>
              Looks like you haven't added anything to your cart yet.
            </p>

            <Link
              to="/products"
              className="cart-primary-btn"
            >
              <FaShoppingCart />
              Continue Shopping
            </Link>

          </div>

        </div>
      </div>
    );
  }

  /* =====================================================
     CART PAGE
  ===================================================== */

  return (
    <div className="cart-page">

      <div className="cart-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="cart-header">

          <div>
            <h1>Shopping Cart</h1>

            <p>
              {cart.length} product
              {cart.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>

          <button
            type="button"
            className="clear-cart-btn"
            onClick={clearCart}
          >
            <FaTrash />
            Clear Cart
          </button>

        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="cart-layout">

          {/* =================================================
              LEFT - PRODUCTS
          ================================================= */}

          <div className="cart-products">

            {cart.map((item) => {

              const quantity = item.quantity || 1;

              const itemTotal =
                Number(item.price) * quantity;

              return (
                <div
                  className="cart-product-card"
                  key={item.id}
                >

                  {/* Product Image */}

                  <div className="cart-product-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                  </div>

                  {/* Product Information */}

                  <div className="cart-product-info">

                    <h2>{item.name}</h2>

                    <span className="cart-product-category">
                      {item.category}
                    </span>

                    <div className="cart-product-price">
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </div>

                  </div>

                  {/* Quantity */}

                  <div className="cart-quantity">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      aria-label="Decrease quantity"
                    >
                      <FaMinus />
                    </button>

                    <span>{quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      aria-label="Increase quantity"
                    >
                      <FaPlus />
                    </button>

                  </div>

                  {/* Item Total */}

                  <div className="cart-item-total">
                    ₹{itemTotal.toLocaleString("en-IN")}
                  </div>

                  {/* Delete */}

                  <button
                    type="button"
                    className="cart-delete-btn"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    title="Remove product"
                    aria-label="Remove product"
                  >
                    <FaTrash />
                  </button>

                </div>
              );
            })}

            {/* Continue Shopping */}

            <Link
              to="/products"
              className="continue-shopping-btn"
            >
              <FaArrowLeft />
              Continue Shopping
            </Link>

          </div>

          {/* =================================================
              RIGHT - ORDER SUMMARY
          ================================================= */}

          <aside className="cart-summary">

            <div className="cart-summary-card">

              <div className="cart-summary-title">

                <div>
                  <h2>Order Summary</h2>
                  <span>
                    {cart.length} item
                    {cart.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="summary-cart-icon">
                  <FaShoppingCart />
                </div>

              </div>

              {/* Price Details */}

              <div className="cart-price-details">

                <div className="price-row">
                  <span>Subtotal</span>
                  <strong>
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </strong>
                </div>

                <div className="price-row">
                  <span>Shipping</span>

                  <strong
                    className={
                      shipping === 0
                        ? "free-shipping"
                        : ""
                    }
                  >
                    {shipping === 0
                      ? "FREE"
                      : `₹${shipping}`}
                  </strong>
                </div>

              </div>

              {/* Total */}

              <div className="cart-total-row">

                <span>Total</span>

                <strong>
                  ₹{grandTotal.toLocaleString("en-IN")}
                </strong>

              </div>

              {/* Checkout */}

              <Link
                to="/checkout"
                className="checkout-btn"
              >
                Proceed to Checkout
              </Link>

              {/* Free Shipping Message */}

              {cartTotal < 1000 && (
                <div className="free-shipping-message">
                  Add{" "}
                  <strong>
                    ₹{(1000 - cartTotal).toLocaleString("en-IN")}
                  </strong>{" "}
                  more for free shipping
                </div>
              )}

              {/* Benefits */}

              <div className="cart-benefits">

                <div className="cart-benefit">

                  <div className="benefit-icon">
                    <FaShieldAlt />
                  </div>

                  <div>
                    <strong>Safe & Secure</strong>
                    <span>Secure checkout</span>
                  </div>

                </div>

                <div className="cart-benefit">

                  <div className="benefit-icon">
                    <FaTruck />
                  </div>

                  <div>
                    <strong>Reliable Delivery</strong>
                    <span>Fast & reliable shipping</span>
                  </div>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </div>
  );
}

export default Cart;