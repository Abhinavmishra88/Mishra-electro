import { Link } from "react-router-dom";

function OrderSummary() {
  return (
    <div className="checkout-summary">

      <h4>Order Summary</h4>

      <div className="summary-item">
        <span>Subtotal</span>
        <span>₹2,846</span>
      </div>

      <div className="summary-item">
        <span>Shipping</span>
        <span>FREE</span>
      </div>

      <div className="summary-item">
        <span>GST</span>
        <span>₹180</span>
      </div>

      <hr />

      <div className="summary-item total">
        <span>Total</span>
        <span>₹3,026</span>
      </div>

      <Link
        to="/order-success"
        className="btn btn-primary w-100 mt-4"
      >
        Place Order
      </Link>

    </div>
  );
}

export default OrderSummary;