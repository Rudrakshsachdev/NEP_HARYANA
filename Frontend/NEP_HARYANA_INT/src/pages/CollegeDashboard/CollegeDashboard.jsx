import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Dashboard/Dashboard.module.css";
import pageStyles from "./CollegeDashboard.module.css";
import {
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  getSavedAuthUser,
} from "../../api/auth";

function formatRole(role) {
  if (role === "principal") {
    return "College Principal";
  }
  if (role === "admin") {
    return "DHE Admin";
  }
  if (role === "committee") {
    return "Screening Committee";
  }
  return "Principal";
}

function CollegeDashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const savedUser = getSavedAuthUser();
  const collegeName = savedUser?.college_name || "Govt College Example";
  const principalName = savedUser?.full_name || "Dr. Rajesh Kumar";
  const principalRole = formatRole(savedUser?.role);
  const aisheCode = savedUser?.aishe_code || "C-12345";

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    setShowProfileDropdown(false);
    navigate("/auth/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
  ];

  return (
    <div className={styles.dashboardLayout}>
      <aside className={styles.sidebar}>
        <div
          className={styles.sidebarLogo}
          onClick={() => setActiveMenu("Dashboard")}
          style={{ cursor: "pointer" }}
        >
          <svg
            className={styles.logoIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A8.995 8.995 0 0112 21a8.995 8.995 0 01-6.825-4.943 12.083 12.083 0 01.665-6.479L12 14z" />
            <path d="M12 14v7" />
          </svg>
          <div className={styles.logoText}>
            <h1>HSHEC</h1>
            <span>Principal Portal</span>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.navItem} ${activeMenu === item.title ? styles.active : ""}`}
              onClick={() => setActiveMenu(item.title)}
            >
              <svg
                className={styles.navIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d={item.icon} />
              </svg>
              <span>{item.title}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.collegeProfile}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0V5a2 2 0 012-2h2a2 2 0 012 2v16" />
            </svg>
            <div>
              <h4>{collegeName}</h4>
              <span>AISHE: {aisheCode}</span>
            </div>
          </div>
        </div>
      </aside>

      <div className={styles.mainContent}>
        <header className={styles.topNavbar}>
          <div className={styles.headerTitle}>
            <div className={styles.breadcrumbs}>
              <span>Home</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
              <span className={styles.breadcrumbActive}>{activeMenu}</span>
            </div>
            <h2>{activeMenu}</h2>
            <p>NEP Excellence Awards Evaluation Portal.</p>
          </div>

          <div className={styles.headerActions}>
            <div className={styles.profileWrapper}>
              <div
                className={styles.userProfile}
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <div className={styles.avatar}>PP</div>
                <div>
                  <h4>{principalName}</h4>
                  <span>{principalRole}</span>
                </div>
              </div>

              {showProfileDropdown && (
                <div className={styles.dropdownMenu}>
                  <button
                    type="button"
                    className={styles.dropdownItemButton}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        {activeMenu === "Dashboard" ? (
          <div className={pageStyles.overviewGrid}>
            <section className={pageStyles.welcomeCard}>
              <h3>HSHEC Principal Portal</h3>
              <p>
                Welcome to the Haryana State Higher Education Council portal.
                The nomination workflow and scoring modules have been removed
                from this build.
              </p>
            </section>

            <section className={pageStyles.infoCard}>
              <h3>Institution Profile</h3>
              <div className={pageStyles.infoDetails}>
                <div className={pageStyles.infoRow}>
                  <span>College Name:</span>
                  <strong>{collegeName}</strong>
                </div>
                <div className={pageStyles.infoRow}>
                  <span>AISHE Code:</span>
                  <strong>{aisheCode}</strong>
                </div>
                <div className={pageStyles.infoRow}>
                  <span>Principal:</span>
                  <strong>{principalName}</strong>
                </div>
                <div className={pageStyles.infoRow}>
                  <span>Role:</span>
                  <strong>{principalRole}</strong>
                </div>
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CollegeDashboard;
