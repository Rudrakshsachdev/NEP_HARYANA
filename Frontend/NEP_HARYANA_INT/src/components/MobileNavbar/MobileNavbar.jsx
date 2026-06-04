import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hshecLogo from "../../assets/hshec_logo.jpeg";
import { getDashboardPathForUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./MobileNavbar.module.css";

function MobileNavbar() {
  const navigate = useNavigate();
  const { user: savedUser } = useAuth();
  const [activeNav, setActiveNav] = useState("HOME");
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems = [
    "HOME",
    "ABOUT",
    "SCHEMES",
    "COLLEGES",
    "NOTICES",
    "DASHBOARD",
    "CONTACT",
  ];

  const handleFontSize = (action) => {
    let newSize = fontSize;
    if (action === "increase" && fontSize < 22) newSize = fontSize + 1;
    if (action === "decrease" && fontSize > 12) newSize = fontSize - 1;
    if (action === "reset") newSize = 16;
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  const toggleContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle("high-contrast");
  };

  const handleDashboardClick = (e) => {
    e.preventDefault();
    setIsDrawerOpen(false);
    if (savedUser) {
      navigate(getDashboardPathForUser(savedUser));
    } else {
      navigate("/auth/login");
    }
  };

  const handleSignInClick = () => {
    setIsDrawerOpen(false);
    if (savedUser) {
      navigate(getDashboardPathForUser(savedUser));
      return;
    }
    navigate("/auth/login");
  };

  const handleNavClick = (e, item) => {
    setActiveNav(item);
    setIsDrawerOpen(false);

    if (item === "HOME") {
      e.preventDefault();
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (item === "DASHBOARD") {
      handleDashboardClick(e);
    } else {
      e.preventDefault();
      const targetId = item.toLowerCase();
      let elementId = targetId;
      if (targetId === "about") elementId = "leadership-section";
      if (targetId === "schemes") elementId = "schemes";
      if (targetId === "colleges") elementId = "about-stats";
      if (targetId === "notices") elementId = "news-events";
      if (targetId === "contact") elementId = "contact";

      const element = document.getElementById(elementId);
      if (element) {
        const offset = 80; // Mobile navbar height offset (smaller than desktop)
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      } else {
        navigate(`/#${elementId}`);
        setTimeout(() => {
          const el = document.getElementById(elementId);
          if (el) {
            const offset = 80;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }, 150);
      }
    }
  };

  return (
    <>
      <header
        className={`${styles.mobileNavbar} ${highContrast ? styles.highContrast : ""}`}
        id="govt-mobile-navbar"
      >
        <div className={styles.headerContainer}>
          {/* Brand/Logo group */}
          <div className={styles.brandGroup} onClick={() => navigate("/")}>
            <div className={styles.logoWrapper}>
              <img
                src={hshecLogo}
                alt="HSHEC Logo"
                className={styles.logoImg}
              />
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandSub}>GOVT. OF HARYANA</span>
              <span className={styles.brandTitle}>HSHEC Portal</span>
            </div>
          </div>

          {/* Quick Actions & Hamburger */}
          <div className={styles.actionsGroup}>
            <button
              className={styles.quickSignInBtn}
              onClick={handleSignInClick}
              aria-label={savedUser ? "Go to Dashboard" : "Sign In"}
            >
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <button
              className={`${styles.hamburger} ${isDrawerOpen ? styles.hamburgerOpen : ""}`}
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className={styles.drawerOverlay}
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Slide-out Drawer */}
      <div
        className={`${styles.drawer} ${isDrawerOpen ? styles.drawerOpen : ""} ${
          highContrast ? styles.highContrast : ""
        }`}
      >
        <div className={styles.drawerHeader}>
          <div className={styles.drawerStateIndicator}>
            <span className={styles.flagStub}></span>
            <span>Government of Haryana</span>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={styles.drawerContent}>
          {/* Search bar inside drawer */}
          <div className={styles.searchWrapper}>
            <svg
              className={styles.searchIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search portal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search portal"
            />
          </div>

          {/* Navigation Links */}
          <nav className={styles.navContainer}>
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item} className={styles.navItem}>
                  <a
                    href={
                      item === "HOME"
                        ? "/"
                        : item === "DASHBOARD"
                          ? (savedUser ? getDashboardPathForUser(savedUser) : "/auth/login")
                          : `#${item.toLowerCase()}`
                    }
                    className={`${styles.navLink} ${activeNav === item ? styles.navActive : ""}`}
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Accessibility Settings */}
          <div className={styles.accessibilityGroup}>
            <div className={styles.fontSizeSelector}>
              <span className={styles.controlLabel}>Text Size</span>
              <div className={styles.btnGroup}>
                <button onClick={() => handleFontSize("decrease")}>A-</button>
                <button onClick={() => handleFontSize("reset")}>A</button>
                <button onClick={() => handleFontSize("increase")}>A+</button>
              </div>
            </div>

            <div className={styles.contrastSelector}>
              <span className={styles.controlLabel}>Contrast</span>
              <button
                className={`${styles.contrastBtn} ${highContrast ? styles.active : ""}`}
                onClick={toggleContrast}
              >
                {highContrast ? "Standard" : "High Contrast"}
              </button>
            </div>
          </div>
        </div>

        {/* Footer actions in drawer */}
        <div className={styles.drawerFooter}>
          <button
            className={styles.primaryActionBtn}
            onClick={handleSignInClick}
          >
            {savedUser ? "Go to Dashboard" : "Sign In to Portal"}
          </button>
        </div>
      </div>
    </>
  );
}

export default MobileNavbar;
