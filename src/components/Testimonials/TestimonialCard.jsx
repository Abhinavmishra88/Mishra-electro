import { FaStar } from "react-icons/fa";

function TestimonialCard({ testimonial }) {
  return (
    <div className="testimonial-card">

      <img
        src={testimonial.image}
        alt={testimonial.name}
      />

      <h4>{testimonial.name}</h4>

      <span>{testimonial.location}</span>

      <div className="rating">
        {[...Array(testimonial.rating)].map((_, index) => (
          <FaStar key={index} />
        ))}
      </div>

      <p>"{testimonial.review}"</p>

    </div>
  );
}

export default TestimonialCard;