import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import testimonials from "../../data/testimonials";

import TestimonialCard from "./TestimonialCard";

import "./Testimonials.css";

function Testimonials() {
  return (
    <section className="container py-5">
      <h2 className="text-center mb-4">
        Customer Testimonials
      </h2>

      <div className="row">
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Rahul Sharma</h5>
            <p>
              Excellent electrical products and fast delivery.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Priya Verma</h5>
            <p>
              Very good quality and reasonable prices.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Amit Singh</h5>
            <p>
              Trusted products with excellent customer support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;