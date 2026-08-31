function FAQItem({ item }) {
  return (
    <div className="accordion-item">

      <h2 className="accordion-header">

        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#faq${item.id}`}
        >
          {item.question}
        </button>

      </h2>

      <div
        id={`faq${item.id}`}
        className="accordion-collapse collapse"
        data-bs-parent="#faqAccordion"
      >

        <div className="accordion-body">
          {item.answer}
        </div>

      </div>

    </div>
  );
}

export default FAQItem;