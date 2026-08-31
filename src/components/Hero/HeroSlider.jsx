import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import banner1 from "../../assets/banners/hero-banner-1.png";
import banner2 from "../../assets/banners/hero-banner-2.png";
import banner3 from "../../assets/banners/hero-banner-3.png";

import HeroSlide from "./HeroSlide";

function HeroSlider() {
  const slides = [
    {
      id: 1,
      image: banner1,
      title: "Premium Electrical Products",
      subtitle: "Quality Products For Every Home",
      button: "Shop Now",
    },
    {
      id: 2,
      image: banner2,
      title: "Modern Electrical Solutions",
      subtitle: "Best Price Guaranteed",
      button: "Explore",
    },
    {
      id: 3,
      image: banner3,
      title: "Industrial & Home Electrical",
      subtitle: "Trusted By Thousands",
      button: "View Products",
    },
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: 3500 }}
      pagination={{ clickable: true }}
      navigation
      loop
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <HeroSlide slide={slide} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HeroSlider;