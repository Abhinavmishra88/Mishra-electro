import "../styles/contact.css";

function Contact() {
  return (
    <main className="contact-page">

      {/* Hero */}
      <section className="contact-hero">

        <div className="container">

          <span className="contact-label">
            GET IN TOUCH
          </span>

          <h1>
            Contact{" "}
            <span>Mishra Electro</span>
          </h1>

          <p>
            Have a question about our electrical
            products? Our team is here to help.
          </p>

        </div>

      </section>


      {/* Contact Section */}
      <section className="contact-section">

        <div className="container">

          <div className="row g-4">

            {/* Information */}
            <div className="col-lg-5">

              <div className="contact-info-card">

                <h3>
                  Let's Talk
                </h3>

                <p>
                  Contact us for product information,
                  orders, pricing and customer support.
                </p>


                <div className="contact-item">

                  <div className="contact-item-icon">
                    📞
                  </div>

                  <div className="contact-item-content">
                    <strong>
                      Phone
                    </strong>

                    <span>
                      +91 XXXXX XXXXX
                    </span>
                  </div>

                </div>


                <div className="contact-item">

                  <div className="contact-item-icon">
                    ✉
                  </div>

                  <div className="contact-item-content">
                    <strong>
                      Email
                    </strong>

                    <span>
                      info@mishraelectro.com
                    </span>
                  </div>

                </div>


                <div className="contact-item">

                  <div className="contact-item-icon">
                    📍
                  </div>

                  <div className="contact-item-content">
                    <strong>
                      Address
                    </strong>

                    <span>
                      India
                    </span>
                  </div>

                </div>

              </div>


              {/* Business Hours */}
              <div className="business-hours">

                <h4>
                  Business Hours
                </h4>

                <ul>

                  <li>
                    <span>
                      Monday - Saturday
                    </span>

                    <span>
                      9:00 AM - 8:00 PM
                    </span>
                  </li>

                  <li>
                    <span>
                      Sunday
                    </span>

                    <span>
                      Closed
                    </span>
                  </li>

                </ul>

              </div>

            </div>


            {/* Form */}
            <div className="col-lg-7">

              <div className="contact-form-card">

                <h3>
                  Send Us a Message
                </h3>

                <form
                  onSubmit={(e) =>
                    e.preventDefault()
                  }
                >

                  <div className="row g-3">

                    <div className="col-md-6">

                      <label>
                        Your Name
                      </label>

                      <input
                        type="text"
                        placeholder="Enter your name"
                      />

                    </div>


                    <div className="col-md-6">

                      <label>
                        Email Address
                      </label>

                      <input
                        type="email"
                        placeholder="Enter your email"
                      />

                    </div>


                    <div className="col-12">

                      <label>
                        Subject
                      </label>

                      <input
                        type="text"
                        placeholder="What can we help you with?"
                      />

                    </div>


                    <div className="col-12">

                      <label>
                        Message
                      </label>

                      <textarea
                        placeholder="Write your message..."
                      />

                    </div>


                    <div className="col-12">

                      <button
                        type="submit"
                        className="contact-submit"
                      >
                        Send Message
                      </button>

                    </div>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Contact;