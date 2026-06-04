import Hero from "../../components/Hero/Hero";
import MobileHeroSection from "../../components/MobileHeroSection/MobileHeroSection";
import LeadershipSection from "../../components/LeadershipSection/LeadershipSection";
import AboutSystem from "../../components/AboutSystem/AboutSystem";
import Schemes from "../../components/Schemes/Schemes";
import StatsAndNews from "../../components/StatsAndNews/StatsAndNews";
import { useMobile } from "../../hooks/useMobile";

function Home() {
  const isMobile = useMobile();

  return (
    <main id="main-content">
      {isMobile ? <MobileHeroSection /> : <Hero />}
      <LeadershipSection />
      <AboutSystem />
      <Schemes />
      <StatsAndNews />

    </main>
  );
}

export default Home;

