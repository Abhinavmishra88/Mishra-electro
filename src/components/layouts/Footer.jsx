import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "../../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-grid">

          {/* Company */}

          <div>

            <h3>Mishra Electro</h3>

            <p>
              Premium electrical products for homes,
              offices and industries.
            </p>

            <div className="social-icons">

              <a href="#">
                <FaFacebookF />
              </a>

              <a href="#">
                <FaInstagram />
              </a>

              <a href="#">
                <FaLinkedinIn />
              </a>

              <a href="#">
                <FaYoutube />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h4>Quick Links</h4>

            <ul>

              <li><Link to="/">Home</Link></li>

              <li><Link to="/products">Products</Link></li>

              <li><Link to="/contact">Contact</Link></li>

              <li><Link to="/login">Login</Link></li>

            </ul>

          </div>

          {/* Categories */}

          <div>

            <h4>Categories</h4>

            <ul>

              <li>Switches</li>

              <li>MCB</li>

              <li>Wires</li>

              <li>Fans</li>

              <li>LED Lights</li>

              <li>Extension Boards</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h4>Contact</h4>

            <p>
              <FaMapMarkerAlt /> Noida, Uttar Pradesh
            </p>

            <p>
              <FaPhoneAlt /> +91 9876543210
            </p>

            <p>
              <FaEnvelope /> info@mishraelectro.com
            </p>

          </div>

          {/* Newsletter */}

          <div>

            <h4>Newsletter</h4>

            <p>
              Subscribe for latest offers.
            </p>

            <div className="newsletter">

              <input
                type="email"
                placeholder="Enter email"
              />

              <button>

                <FaPaperPlane />

              </button>

            </div>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 Mishra Electro. All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;