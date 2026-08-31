import {
  FaPhoneAlt,
  FaEnvelope,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";

import "../../styles/topheader.css";

function TopHeader() {
  return (
    <div className="top-header">

      <div className="container">

        <div className="top-left">

          <span>
            <FaPhoneAlt />
            +91 9876543210
          </span>

          <span>
            <FaEnvelope />
            info@mishraelectro.com
          </span>

        </div>

        <div className="top-right">

          <span>
            <FaTruck />
            Free Shipping Above ₹999
          </span>

          <span>
            <FaShieldAlt />
            100% Genuine Products
          </span>

        </div>

      </div>
    </div>
  );
}

export default TopHeader;