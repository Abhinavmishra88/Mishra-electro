import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

import "./Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    toast.success("Subscribed successfully!");

    setEmail("");
  };

  return (
    <section className="newsletter">

      <div className="container">

        <div className="newsletter-box">

          <div className="newsletter-text">

            <h2>Subscribe Our Newsletter</h2>

            <p>
              Get exclusive offers, new arrivals and latest updates directly in
              your inbox.
            </p>

          </div>

          <form
            className="newsletter-form"
            onSubmit={handleSubmit}
          >

            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit">

              <FaPaperPlane />

              Subscribe

            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default Newsletter;