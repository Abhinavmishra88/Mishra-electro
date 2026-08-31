import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "./ContactCTA.css";

function ContactCTA() {
  return (
    <section className="contact-cta">

      <div className="container">

        <div className="cta-box">

          <div className="cta-content">

            <h2>Need Help Choosing Electrical Products?</h2>

            <p>
              Our experts are ready to help you choose the right electrical
              products for your home, office, or industrial project.
            </p>

          </div>

          <div className="cta-buttons">

            <a href="tel:+919876543210" className="btn-call">
              <FaPhoneAlt />
              Call Now
            </a>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
            >
              <FaWhatsapp />
              WhatsApp
            </a>

            <a
              href="mailto:info@mishraelectro.com"
              className="btn-email"
            >
              <FaEnvelope />
              Email Us
            </a>

          </div>

          <div className="cta-address">

            <FaMapMarkerAlt />

            <span>
              Mishra Electro, Noida, Uttar Pradesh, India
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ContactCTA;