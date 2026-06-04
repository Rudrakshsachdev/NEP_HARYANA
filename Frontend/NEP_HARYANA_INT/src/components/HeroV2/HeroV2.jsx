import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Users, BookOpen, GraduationCap, CheckCircle } from 'lucide-react';
import styles from './HeroV2.module.css';

function HeroV2() {
  return (
    <section className={styles.heroSection} id="hero-v2">
      {/* Decorative background glow circles */}
      <div className={styles.glowLeft} aria-hidden="true" />
      <div className={styles.glowRight} aria-hidden="true" />
      
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column: Headings & Call to Actions */}
          <div className={styles.contentColumn}>
            {/* Tag Badge */}
            <div className={styles.badge}>
              <span className={styles.badgePulse} />
              <span className={styles.badgeText}>NEP 2020 Excellence Framework</span>
            </div>

            {/* Main Headline */}
            <h1 className={styles.title}>
              Steering <span className={styles.gradientText}>Academic Quality</span> & Governance across Haryana
            </h1>

            {/* Description Paragraph */}
            <p className={styles.description}>
              The Haryana State Higher Education Council (HSHEC) centralizes institutional evaluation, benchmarking, and quality metrics to empower colleges and universities for future-ready academic standards.
            </p>

            {/* Call To Actions */}
            <div className={styles.actionRow}>
              <a href="#schemes" className={styles.btnPrimary}>
                <span>Explore Evaluation Schemes</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link to="/auth/login" className={styles.btnSecondary}>
                <span>College Portal Login</span>
              </Link>
            </div>

            {/* Key Trust Stats/Labels */}
            <div className={styles.trustGrid}>
              <div className={styles.trustItem}>
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <h4>Statutory Authority</h4>
                  <span>Govt. of Haryana</span>
                </div>
              </div>
              <div className={styles.trustItem}>
                <Award className="w-5 h-5 text-amber-500" />
                <div>
                  <h4>Central Evaluation</h4>
                  <span>Centralized & Digital</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Dashboard Mockup / Visual Element */}
          <div className={styles.visualColumn}>
            <div className={styles.mockupWrapper}>
              
              {/* Decorative mesh back-shadow */}
              <div className={styles.mockupGlow} />

              {/* Main Mockup Card */}
              <div className={styles.mockupCard}>
                {/* Mockup Header */}
                <div className={styles.mockupHeader}>
                  <div className={styles.mockupWindowControls}>
                    <span className={styles.winDotRed} />
                    <span className={styles.winDotYellow} />
                    <span className={styles.winDotGreen} />
                  </div>
                  <span className={styles.mockupUrl}>hshec.gov.in/portal/evaluator</span>
                </div>

                {/* Mockup Content Panel */}
                <div className={styles.mockupBody}>
                  {/* Dashboard top stats */}
                  <div className={styles.mockupTopRow}>
                    <div className={styles.mockupMiniCard}>
                      <span>TOTAL COLLEGES</span>
                      <h3>184</h3>
                    </div>
                    <div className={styles.mockupMiniCard}>
                      <span>EVALUATED</span>
                      <h3 className="text-blue-600">142</h3>
                    </div>
                  </div>

                  {/* Institution List simulation */}
                  <div className={styles.mockupList}>
                    <div className={styles.mockupListItem}>
                      <div className={styles.mockupListLeft}>
                        <div className={styles.mockupListIconWrapper}>
                          <GraduationCap className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h4>Govt College, Panchkula</h4>
                          <span>AISHE: C-12345</span>
                        </div>
                      </div>
                      <span className={`${styles.mockupBadge} ${styles.badgePlatinum}`}>Platinum</span>
                    </div>

                    <div className={styles.mockupListItem}>
                      <div className={styles.mockupListLeft}>
                        <div className={styles.mockupListIconWrapper}>
                          <GraduationCap className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h4>GCW, Sector 14, Gurugram</h4>
                          <span>AISHE: C-98765</span>
                        </div>
                      </div>
                      <span className={`${styles.mockupBadge} ${styles.badgeGold}`}>Gold</span>
                    </div>

                    <div className={styles.mockupListItem}>
                      <div className={styles.mockupListLeft}>
                        <div className={styles.mockupListIconWrapper}>
                          <GraduationCap className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h4>MLN College, Yamunanagar</h4>
                          <span>AISHE: C-54321</span>
                        </div>
                      </div>
                      <span className={`${styles.mockupBadge} ${styles.badgeSilver}`}>Silver</span>
                    </div>
                  </div>

                  {/* Submission status snippet */}
                  <div className={styles.mockupStatusFooter}>
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Real-time score audit complete (NEP V2)</span>
                  </div>
                </div>
              </div>

              {/* Floating Element 1: Score achievement badge */}
              <div className={`${styles.floatingElement} ${styles.floatScore}`}>
                <span className={styles.floatLabel}>State Median Score</span>
                <span className={styles.floatValue}>74.5 / 100</span>
                <span className={styles.floatTrend}>+3.4% this year</span>
              </div>

              {/* Floating Element 2: Activity Badge */}
              <div className={`${styles.floatingElement} ${styles.floatActivity}`}>
                <div className={styles.activityDot} />
                <span>Live Submissions Active</span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroV2;
