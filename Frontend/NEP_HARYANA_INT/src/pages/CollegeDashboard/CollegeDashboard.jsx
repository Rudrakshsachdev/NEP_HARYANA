import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Dashboard/Dashboard.module.css";
import pageStyles from "./CollegeDashboard.module.css";
import FormsHub from "./FormsHub/FormsHub";
import {
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  getSavedAuthUser,
} from "../../api/auth";
import { fetchMyScore, openNominationHeaderForm } from "../../api/nomination";

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

const SCORING_INDICATORS_CONFIG = [
  { id: 1, title: "Internship/Apprenticeship Embedded Degree Programmes", max: 4, category: 1 },
  { id: 2, title: "Courses Offered in Indian Languages", max: 4, category: 1 },
  { id: 3, title: "Special Programmes in IKS", max: 4, category: 1 },
  { id: 4, title: "IDP Targets Achieved (Part A & B)", max: 6, category: 1 },
  { id: 5, title: "NAAC Accreditation Grade", max: 8, category: 1 },
  { id: 6, title: "Academic Bank of Credits (ABC) Registration %", max: 6, category: 1 },
  { id: 7, title: "Professor of Practice (PoP) Appointed", max: 4, category: 1 },
  { id: 8, title: "Incubation/Startup Cell Performance", max: 4, category: 1 },
  { id: 9, title: "Academic/Research Collaboration with Foreign HEIs", max: 6, category: 1 },
  { id: 10, title: "Alumni Connect Cell Functional", max: 4, category: 1 },
  { id: 11, title: "Gender Parity Initiatives", max: 5, category: 1 },
  { id: 12, title: "UGC Student Well-Being, Wellness & Calendar", max: 5, category: 1 },
  { id: 13, title: "Online Courses / MOOCs Adoption", max: 4, category: 1 },
  { id: 14, title: "Teachers Trained under MMTTC (NEP Orientation)", max: 4, category: 1 },
  { id: 15, title: "Multidisciplinary Education Features", max: 8, category: 2 },
  { id: 16, title: "Multiple Entry-Exit System Operationalised", max: 2, category: 2 },
  { id: 17, title: "Research Outcome: Patents Filed & Granted", max: 4, category: 2 },
  { id: 18, title: "Registration & Performance in NIRF", max: 2, category: 2 },
  { id: 19, title: "Outcome-Based Education (OBE) Implementation %", max: 6, category: 2 },
  { id: 20, title: "Utilization of Funds %", max: 2, category: 2 },
  { id: 21, title: "Research Enrollment (PhD Scholars) %", max: 4, category: 2 },
  { id: 22, title: "RPL Adoption & Implementation", max: 4, category: 2 }
];

function CollegeDashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [scoreData, setScoreData] = useState(null);
  const [isScoreLoading, setIsScoreLoading] = useState(true);

  const savedUser = getSavedAuthUser();
  const collegeName = savedUser?.college_name || "Govt College Example";
  const principalName = savedUser?.full_name || "Dr. Rajesh Kumar";
  const principalRole = formatRole(savedUser?.role);
  const aisheCode = savedUser?.aishe_code || "C-12345";

  useEffect(() => {
    let active = true;
    const loadScoreData = async () => {
      try {
        setIsScoreLoading(true);
        const data = await fetchMyScore();
        if (active) {
          setScoreData(data);
        }
      } catch (err) {
        console.error("Failed to load scoring data:", err);
      } finally {
        if (active) {
          setIsScoreLoading(false);
        }
      }
    };
    loadScoreData();
    return () => {
      active = false;
    };
  }, [activeMenu]);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    setShowProfileDropdown(false);
    navigate("/auth/login");
  };

  const handleStartNomination = async () => {
    try {
      setIsScoreLoading(true);
      const response = await openNominationHeaderForm();
      const formId = response?.id;
      if (!formId) {
        throw new Error("Could not start nomination.");
      }
      const nameSlug = String(savedUser?.college_name || "college")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      const codeSlug = String(savedUser?.aishe_code || "code")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      navigate(`/institution/${nameSlug}/${codeSlug}/forms/nomination/${formId}`);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to start nomination form.");
    } finally {
      setIsScoreLoading(false);
    }
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      title: "Forms",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z",
    },
  ];

  // Helper to determine CSS classes for award tier badges
  const getTierBadgeClass = (category) => {
    if (!category) return pageStyles.badgeNone;
    const cat = category.toLowerCase();
    if (cat.includes("platinum")) return pageStyles.badgePlatinum;
    if (cat.includes("gold")) return pageStyles.badgeGold;
    if (cat.includes("silver")) return pageStyles.badgeSilver;
    return pageStyles.badgeNone;
  };

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

        {isScoreLoading ? (
          <div className={pageStyles.loadingContainer}>
            <div className={pageStyles.spinner}></div>
            <p>Loading nomination evaluation status...</p>
          </div>
        ) : activeMenu === "Dashboard" ? (
          <>
            {/* If nomination is not started */}
            {(!scoreData || !scoreData.is_started) ? (
              <div className={pageStyles.welcomeCard}>
                <h3>NEP Implementation Excellence Awards 2024-25</h3>
                <p>
                  Welcome to the Haryana State Higher Education Council (HSHEC) Portal.
                  Your institution has not initiated the nomination proforma yet.
                  Begin by submitting details in Section A (Institutional Profile) and Section B (20 Evaluation Indicators)
                  to evaluate your college's score.
                </p>
                <button
                  type="button"
                  className={pageStyles.startBtn}
                  onClick={handleStartNomination}
                >
                  Start Nomination Process
                </button>
              </div>
            ) : (
              /* If nomination is started */
              <>
                <div className={pageStyles.overviewGrid}>
                  {/* Visual Scoring Gauge & Tier Card */}
                  <section className={pageStyles.scoreCard}>
                    <div className={pageStyles.scoreHeader}>
                      <h3>NEP Excellence Evaluation Score</h3>
                    </div>
                    <div className={pageStyles.gaugeArea}>
                      <div
                        className={pageStyles.radialGauge}
                        style={{ "--percentage": `${scoreData.scoring?.percentage || 0}%` }}
                      >
                        <div className={pageStyles.gaugeInner}>
                          <span className={pageStyles.gaugeValue}>
                            {scoreData.scoring?.grand_total || 0}
                          </span>
                          <span className={pageStyles.gaugeMax}>/ 92 Marks</span>
                        </div>
                      </div>
                      <span className={pageStyles.percentagePill}>
                        {scoreData.scoring?.percentage || 0}% Score
                      </span>
                    </div>
                    <div
                      className={`${pageStyles.tierBadge} ${getTierBadgeClass(
                        scoreData.scoring?.award_category
                      )}`}
                    >
                      {scoreData.scoring?.award_category || "No Award"}
                    </div>
                    <span className={pageStyles.tierSub}>
                      {scoreData.is_submitted ? "Final Award Level" : "Draft Projection"}
                    </span>

                    <div className={pageStyles.categorySplit}>
                      <div className={pageStyles.catBox}>
                        <span>Existing Params</span>
                        <strong>{scoreData.scoring?.existing_total || 0} / 60</strong>
                      </div>
                      <div className={pageStyles.catBox}>
                        <span>Proposed Params</span>
                        <strong>{scoreData.scoring?.proposed_total || 0} / 32</strong>
                      </div>
                    </div>
                  </section>

                  {/* Submission Status & Guidance */}
                  <section className={pageStyles.statusCard}>
                    <div>
                      <div className={pageStyles.statusHeader}>
                        <h3>Submission Status</h3>
                        <span
                          className={`${pageStyles.statusBadge} ${
                            scoreData.is_submitted
                              ? pageStyles.submitted
                              : pageStyles.draft
                          }`}
                        >
                          {scoreData.is_submitted ? "Submitted & Locked" : "Draft (In Progress)"}
                        </span>
                      </div>
                      <div className={pageStyles.statusContent}>
                        {scoreData.is_submitted ? (
                          <p>
                            Your nomination has been successfully submitted and locked. The DHE
                            Admin and Screening Committee will review your inputs and uploaded
                            documents. No further modifications are allowed.
                          </p>
                        ) : (
                          <p>
                            Your nomination is currently in draft mode. You can edit the form
                            fields, save drafts, and upload evidence PDFs/images. Submit the forms
                            from the Forms Hub when ready to locks details and trigger evaluation.
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={pageStyles.actionButtonGroup}>
                      <button
                        type="button"
                        className={pageStyles.primaryActionBtn}
                        onClick={() => setActiveMenu("Forms")}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                        Open Forms Library
                      </button>
                    </div>
                  </section>

                  {/* Institution Quick Info */}
                  <section className={pageStyles.infoCard}>
                    <h3>Institution Profile</h3>
                    <div className={pageStyles.infoDetails}>
                      <div className={pageStyles.infoRow}>
                        <span>College Name:</span>
                        <strong>{scoreData.header?.institution_name}</strong>
                      </div>
                      <div className={pageStyles.infoRow}>
                        <span>AISHE Code:</span>
                        <strong>{scoreData.header?.aishe_code}</strong>
                      </div>
                      <div className={pageStyles.infoRow}>
                        <span>Academic Session:</span>
                        <strong>{scoreData.header?.academic_session}</strong>
                      </div>
                      <div className={pageStyles.infoRow}>
                        <span>Portal Status:</span>
                        <strong>{scoreData.is_submitted ? "Finalized" : "Editing"}</strong>
                      </div>
                      <div className={pageStyles.infoRow}>
                        <span>Last Updated:</span>
                        <strong>
                          {scoreData.header?.updated_at
                            ? new Date(scoreData.header.updated_at).toLocaleString()
                            : "N/A"}
                        </strong>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Score Breakdown Indicator List */}
                <section className={pageStyles.breakdownSection}>
                  <h3 className={pageStyles.sectionTitle}>Detailed Indicators Score breakdown</h3>
                  <p className={pageStyles.sectionSubtitle}>
                    A complete audit list of the 22 parameters computed by the HSHEC scoring engine.
                  </p>

                  {/* Category 1 (Existing Parameters) */}
                  <div className={pageStyles.categoryGroup}>
                    <div className={pageStyles.categoryHeader}>
                      <span>Category 1: Existing Parameters (Capped at 60 Marks)</span>
                      <span>Total: {scoreData.scoring?.existing_total || 0} / 60 Marks</span>
                    </div>
                    <div className={pageStyles.indicatorList}>
                      {SCORING_INDICATORS_CONFIG.filter((ind) => ind.category === 1).map(
                        (config) => {
                          const achieved = scoreData.scoring?.scores?.[`indicator_${config.id}`] || 0;
                          return (
                            <div key={config.id} className={pageStyles.indicatorItem}>
                              <div className={pageStyles.indicatorDetails}>
                                <h4 className={pageStyles.indicatorTitle}>
                                  Indicator {config.id}: {config.title}
                                </h4>
                                <span className={pageStyles.indicatorMeta}>
                                  Maximum marks available: {config.max}
                                </span>
                              </div>
                              <span
                                className={`${pageStyles.scoreBadge} ${
                                  achieved === config.max
                                    ? pageStyles.high
                                    : achieved > 0
                                    ? pageStyles.medium
                                    : pageStyles.zero
                                }`}
                              >
                                {achieved} / {config.max}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Category 2 (Proposed Parameters) */}
                  <div className={pageStyles.categoryGroup}>
                    <div className={pageStyles.categoryHeader}>
                      <span>Category 2: Proposed/New Parameters (Max 32 Marks)</span>
                      <span>Total: {scoreData.scoring?.proposed_total || 0} / 32 Marks</span>
                    </div>
                    <div className={pageStyles.indicatorList}>
                      {SCORING_INDICATORS_CONFIG.filter((ind) => ind.category === 2).map(
                        (config) => {
                          const achieved = scoreData.scoring?.scores?.[`indicator_${config.id}`] || 0;
                          return (
                            <div key={config.id} className={pageStyles.indicatorItem}>
                              <div className={pageStyles.indicatorDetails}>
                                <h4 className={pageStyles.indicatorTitle}>
                                  Indicator {config.id}: {config.title}
                                </h4>
                                <span className={pageStyles.indicatorMeta}>
                                  Maximum marks available: {config.max}
                                </span>
                              </div>
                              <span
                                className={`${pageStyles.scoreBadge} ${
                                  achieved === config.max
                                    ? pageStyles.high
                                    : achieved > 0
                                    ? pageStyles.medium
                                    : pageStyles.zero
                                }`}
                              >
                                {achieved} / {config.max}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </section>
              </>
            )}
          </>
        ) : activeMenu === "Forms" ? (
          <FormsHub />
        ) : null}
      </div>
    </div>
  );
}

export default CollegeDashboard;
