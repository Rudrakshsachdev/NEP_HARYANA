import HeroV2 from "../../components/HeroV2/HeroV2";
import LeadershipSection from "../../components/LeadershipSection/LeadershipSection";
import AboutSystem from "../../components/AboutSystem/AboutSystem";
import Schemes from "../../components/Schemes/Schemes";
import StatsAndNews from "../../components/StatsAndNews/StatsAndNews";

function Home() {
  return (
    <main id="main-content">
      <HeroV2 />
      <LeadershipSection />
      <AboutSystem />
      <StatsAndNews />
      <Schemes />

    </main>
  );
}

export default Home;

