import HeroSection from "../components/sections/HeroSection";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import CategoriesSection from "../components/sections/CategoriesSection";
import BenefitsSection from "../components/sections/BenefitsSection";
import ReviewsSection from "../components/sections/ReviewsSection";
import AboutSection from "../components/sections/AboutSection";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function HomePage() {
  useScrollReveal();

  return (
    <main>
      <HeroSection />
      <div className="reveal">
        <FeaturedProducts />
      </div>
      <div className="reveal">
        <CategoriesSection />
      </div>
      <div className="reveal">
        <BenefitsSection />
      </div>
      <div className="reveal">
        <ReviewsSection />
      </div>
      <div className="reveal">
        <AboutSection />
      </div>
    </main>
  );
}
