import faq from "../../data/faq";
import FAQItem from "./FAQItem";

import "./FAQ.css";

function FAQ() {
  return (
    <section className="faq-section">

      <div className="container">

        <div className="section-title">

          <h2>Frequently Asked Questions</h2>

          <p>
            Everything you need to know before purchasing.
          </p>

        </div>

        <div
          className="accordion"
          id="faqAccordion"
        >

          {faq.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default FAQ;