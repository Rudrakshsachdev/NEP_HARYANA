import layoutStyles from "../../../pages/Dashboard/Dashboard.module.css";

const SECTION_TITLES = {
  overview: "Dashboard Overview",
  applications: "Applications",
  institutions: "Institutions",
  analytics: "Analytics & Reports",
};

export default function AdminHeader({
  activeSection,
  officerName,
  officerRole,
  showProfileDropdown,
  onToggleProfile,
  onLogout,
}) {
  return (
    <header className={layoutStyles.topNavbar}>
      <div className={layoutStyles.headerTitle}>
        <div className={layoutStyles.breadcrumbs}>
          <span>Admin</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
          <span className={layoutStyles.breadcrumbActive}>
            {SECTION_TITLES[activeSection] || "Dashboard"}
          </span>
        </div>
        <h2>{SECTION_TITLES[activeSection] || "Dashboard"}</h2>
      </div>

      <div className={layoutStyles.headerActions}>
        <div className={layoutStyles.profileWrapper}>
          <div
            className={layoutStyles.userProfile}
            onClick={onToggleProfile}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onToggleProfile()}
          >
            <div className={layoutStyles.avatar}>
              {officerName?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div>
              <h4>{officerName}</h4>
              <span>{officerRole}</span>
            </div>
          </div>

          {showProfileDropdown && (
            <div className={layoutStyles.dropdownMenu}>
              <button
                type="button"
                className={layoutStyles.dropdownItemButton}
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <button type="button" className={layoutStyles.logoutButton} onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
