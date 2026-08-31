function PaymentMethods() {
  return (
    <div className="checkout-card mt-4">

      <h4>Payment Method</h4>

      <label className="d-block mb-3">
        <input type="radio" name="payment" />
        {" "}UPI
      </label>

      <label className="d-block mb-3">
        <input type="radio" name="payment" />
        {" "}Credit Card
      </label>

      <label className="d-block mb-3">
        <input type="radio" name="payment" />
        {" "}Debit Card
      </label>

      <label className="d-block">
        <input type="radio" name="payment" />
        {" "}Cash on Delivery
      </label>

    </div>
  );
}

export default PaymentMethods;