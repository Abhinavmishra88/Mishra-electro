import { Link } from "react-router-dom";
import "./OfferBanner.css";

function OfferBanner() {
  return (
    <section className="offer-section">
      <div className="container">
        <div className="offer-banner">

          <div className="offer-content">
            <span>LIMITED TIME OFFER</span>

            <h2>
              Upgrade Your Electrical Setup
            </h2>

            <p>
              Get premium electrical products at
              special prices.
            </p>

            <Link
              to="/products"
              className="btn btn-warning"
            >
              Shop Now
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default OfferBanner;