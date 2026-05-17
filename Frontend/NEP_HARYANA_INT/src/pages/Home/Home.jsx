import Hero from '../../components/Hero/Hero';
import LeadershipPro from '../../components/LeadershipPro/LeadershipPro';
import AboutSystem from '../../components/AboutSystem/AboutSystem';
import Schemes from '../../components/Schemes/Schemes';
import StatsAndNews from '../../components/StatsAndNews/StatsAndNews';

function Home() {
  return (
    <main id="main-content">
      <Hero />
      <LeadershipPro />
      <AboutSystem />
      <Schemes />
      <StatsAndNews />
    </main>
  );
}

export default Home;
