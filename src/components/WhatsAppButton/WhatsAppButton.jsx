import "./WhatsAppButton.css";
import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {

  const phone = "919876543210"; // Replace with your WhatsApp Number

  return (

    <a
      href={`https://wa.me/${phone}`}
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
    >

      <FaWhatsapp />

      <span>

        Chat With Us

      </span>

    </a>

  );

}

export default WhatsAppButton;