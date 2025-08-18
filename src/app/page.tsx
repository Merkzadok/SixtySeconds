import CTASection from "./(landing-page)/CTAsection";
import FeaturesSection from "./(landing-page)/FeatureSection";
import Footer from "./(landing-page)/FooterSection";
import GamesSection from "./(landing-page)/GameSection";
import HeroSection from "./(landing-page)/HeroSection";
import LandingHeader from "./(landing-page)/LandingHeader";
import LeaderboardSection from "./(landing-page)/LeaderboardSection";
import ProfileSection from "./(landing-page)/ProfileSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-emerald-50">
      <LandingHeader />
      <HeroSection />
      <FeaturesSection />
      <GamesSection />
      <LeaderboardSection />
      <ProfileSection />
      <CTASection />
      <Footer />
    </div>
  );
}
