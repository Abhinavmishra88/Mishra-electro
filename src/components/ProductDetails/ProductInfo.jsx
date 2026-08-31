import "../../styles/productDetails.css";
import {
  FaStar,
  FaShoppingCart,
  FaBolt,
} from "react-icons/fa";

function ProductInfo() {

  return (

    <div className="product-info-page">

      <span className="category">

        LED Lights

      </span>

      <h2>

        Premium LED Bulb 12W

      </h2>

      <div className="rating">

        <FaStar /><FaStar /><FaStar />
        <FaStar /><FaStar />

        <span>

          (125 Reviews)

        </span>

      </div>

      <div className="price">

        <h3>

          ₹199

        </h3>

        <del>

          ₹249

        </del>

        <span className="discount">

          20% OFF

        </span>

      </div>

      <p>

        High quality energy saving LED bulb
        suitable for home and office use.

      </p>

      <div className="stock">

        <FaBolt />

        In Stock

      </div>

      <div className="qty">

        Quantity

        <input
          type="number"
          defaultValue={1}
          min={1}
        />

      </div>

      <button className="cart-btn">

        <FaShoppingCart />

        Add To Cart

      </button>

      <button className="buy-btn">

        Buy Now

      </button>

    </div>

  );

}

export default ProductInfo;