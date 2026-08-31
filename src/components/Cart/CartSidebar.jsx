import "./CartSidebar.css";

import {
  FaTimes,
  FaPlus,
  FaMinus,
  FaTrash,
} from "react-icons/fa";

import useCart from "../../hooks/useCart";

function CartSidebar() {

  const {

    cart,

    cartOpen,

    setCartOpen,

    increase,

    decrease,

    removeItem,

  } = useCart();

  const total = cart.reduce(

    (sum, item) =>

      sum + item.price * item.qty,

    0

  );

  return (

    <>

      {/* Overlay */}

      <div

        className={`cart-overlay ${
          cartOpen ? "show" : ""
        }`}

        onClick={() => setCartOpen(false)}

      />

      {/* Sidebar */}

      <div

        className={`cart-sidebar ${
          cartOpen ? "open" : ""
        }`}

      >

        {/* Header */}

        <div className="cart-header">

          <h4>

            Shopping Cart

          </h4>

          <button

            onClick={() => setCartOpen(false)}

          >

            <FaTimes />

          </button>

        </div>

        {/* Items */}

        <div className="cart-body">

          {cart.length === 0 ? (

            <div className="empty-cart">

              <h5>

                Your Cart is Empty

              </h5>

              <p>

                Add products to continue shopping.

              </p>

            </div>

          ) : (

            cart.map((item) => (

              <div

                className="cart-item"

                key={item.id}

              >

                <img

                  src={item.image}

                  alt={item.name}

                />

                <div className="cart-info">

                  <h6>

                    {item.name}

                  </h6>

                  <p>

                    ₹{item.price}

                  </p>

                  <div className="qty-box">

                    <button

                      onClick={() =>
                        decrease(item.id)
                      }

                    >

                      <FaMinus />

                    </button>

                    <span>

                      {item.qty}

                    </span>

                    <button

                      onClick={() =>
                        increase(item.id)
                      }

                    >

                      <FaPlus />

                    </button>

                  </div>

                </div>

                <button

                  className="delete-btn"

                  onClick={() =>
                    removeItem(item.id)
                  }

                >

                  <FaTrash />

                </button>

              </div>

            ))

          )}

        </div>

        {/* Footer */}

        <div className="cart-footer">

          <div className="cart-total">

            <span>Total</span>

            <h4>

              ₹{total}

            </h4>

          </div>

          <button className="checkout-btn">

            Checkout

          </button>

        </div>

      </div>

    </>

  );

}

export default CartSidebar;