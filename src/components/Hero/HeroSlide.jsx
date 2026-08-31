import { Link } from "react-router-dom";

function HeroSlide({ slide }) {
  return (
    <div
      className="hero-slide"
      style={{
        backgroundImage: `url(${slide.image})`,
      }}
    >
      <div className="container">

        <div className="hero-content">

          <h5>{slide.subtitle}</h5>

          <h1>{slide.title}</h1>

          <Link
            to="/products"
            className="btn btn-warning btn-lg"
          >
            {slide.button}
          </Link>

        </div>

      </div>
    </div>
  );
}

export default HeroSlide;