import { Link } from "react-router-dom";

import "../../styles/hero.css";
import heroImage from "../../assets/hero/hero-electrical.png";

function Hero() {
  return (
    <section className="hero-section">

      <div className="hero-container">

        {/* LEFT CONTENT */}
        <div className="hero-content">

          <span className="hero-badge">
            <span className="hero-badge-icon">⚡</span>
            Trusted Electrical Store
          </span>

          <h1>
            Powering Every
            <span> Connection.</span>
            <br />
            Lighting Every Life.
          </h1>

          <p className="hero-description">
            Premium electrical products for your
            home, office and industrial needs.
          </p>

          {/* Features */}
          <div className="hero-features">

            <div className="hero-feature">
              <span>✓</span>
              <p>Premium Quality</p>
            </div>

            <div className="hero-feature">
              <span>✓</span>
              <p>Best Prices</p>
            </div>

            <div className="hero-feature">
              <span>✓</span>
              <p>Fast Delivery</p>
            </div>

          </div>

          {/* Buttons */}
          <div className="hero-buttons">

            <Link
              to="/products"
              className="hero-btn hero-btn-primary"
            >
              Shop Now
              <span>→</span>
            </Link>

            <Link
              to="/products"
              className="hero-btn hero-btn-secondary"
            >
              Explore Products
            </Link>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-image-wrapper">

          <img
            src={heroImage}
            alt="Mishra Electro Electrical Products"
            className="hero-image"
          />

        </div>

      </div>

    </section>
  );
}

export default Hero;