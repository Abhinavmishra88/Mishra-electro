import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import OfferBanner from "../components/OfferBanner/OfferBanner";
import Brands from "../components/Brands/Brands";
import Features from "../components/Features/Features";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import Testimonials from "../components/Testimonials/Testimonials";
import FAQ from "../components/FAQ/FAQ";
import ContactCTA from "../components/ContactCTA/ContactCTA";
import Newsletter from "../components/Newsletter/Newsletter";
import ScrollTop from "../components/ScrollTop/ScrollTop";

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <OfferBanner />
      <Brands />
      <Features />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <ContactCTA />
      <Newsletter />
      <ScrollTop />
    </>
  );
}

export default Home;