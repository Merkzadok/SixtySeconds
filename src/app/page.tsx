import FeaturesSection from "./(landing-page)/FeatureSection";
import FinalFooter from "./(landing-page)/FinalFooter";
import GamesSection from "./(landing-page)/GameSection";
import HeroSection from "./(landing-page)/HeroSection";
import LandingHeader from "./(landing-page)/LandingHeader";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-emerald-50">
      <LandingHeader />
      <HeroSection />
      <FeaturesSection />
      <GamesSection />
      <FinalFooter />
    </div>
  );
}
