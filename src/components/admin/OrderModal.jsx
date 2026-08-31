function OrderModal({ order, show, onClose }) {
  if (!show || !order) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{
        background: "rgba(0,0,0,.5)",
      }}
    >
      <div className="modal-dialog">

        <div className="modal-content">

          <div className="modal-header">

            <h5>
              Order #{order.id}
            </h5>

            <button
              className="btn-close"
              onClick={onClose}
            ></button>

          </div>

          <div className="modal-body">

            <p>
              <strong>Customer:</strong>{" "}
              {order.customer}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {order.email}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order.phone}
            </p>

            <p>
              <strong>Total:</strong> ₹
              {order.total}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {order.payment}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {order.status}
            </p>

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>

            <button
              className="btn btn-primary"
              onClick={() => window.print()}
            >
              Print Invoice
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default OrderModal;