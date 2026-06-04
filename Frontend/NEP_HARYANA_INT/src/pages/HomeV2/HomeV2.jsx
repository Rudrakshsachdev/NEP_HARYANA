import React from 'react';
import HeroV2 from "../../components/HeroV2/HeroV2";
import LeadershipSection from "../../components/LeadershipSection/LeadershipSection";
import AboutSystem from "../../components/AboutSystem/AboutSystem";
import StatsAndNews from "../../components/StatsAndNews/StatsAndNews";
import Schemes from "../../components/Schemes/Schemes";
import { useMobile } from "../../hooks/useMobile";
import MobileHeroSection from "../../components/MobileHeroSection/MobileHeroSection";

function HomeV2() {
  const isMobile = useMobile();

  return (
    <main id="main-content" className="bg-slate-50/30">
      {isMobile ? <MobileHeroSection /> : <HeroV2 />}
      <LeadershipSection />
      <AboutSystem />
      <Schemes />
      <StatsAndNews />
    </main>
  );
}

export default HomeV2;
