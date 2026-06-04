import { Link } from 'react-router-dom';
import styles from './MobileHeroSection.module.css';
import heroBg from '../../assets/hero-bg.png';

function MobileHeroSection() {
  return (
    <section className={styles.hero} id="mobile-hero-section">
      {/* Background image layer with mobile specific scaling */}
      <div
        className={styles.bgImage}
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden="true"
      />
      {/* Gradient overlay optimized for mobile text readability */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Content */}
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Badge */}
          <span className={styles.badge} id="nep-badge-mobile">
            <span className={styles.badgeDot}>●</span>
            NEP 2020 PORTAL
          </span>

          {/* Headline */}
          <h2 className={styles.headline}>
            Building a Future <span className={styles.highlight}>Ready</span> Higher Education in Haryana
          </h2>

          {/* Description */}
          <p className={styles.description}>
            The Haryana State Higher Education Council (HSHEC) is steering policy, accreditation and academic excellence across all institutions of higher learning in the State.
          </p>

          {/* CTA Buttons */}
          <div className={styles.ctas}>
            <a href="#schemes" className={styles.ctaPrimary} id="btn-explore-schemes-mobile">
              Explore Schemes
              <svg
                className={styles.ctaArrow}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <Link to="/auth/signup" className={styles.ctaSecondary} id="btn-college-login-mobile">
              College Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileHeroSection;
