import layoutStyles from "../../../pages/Dashboard/Dashboard.module.css";

const MENU_ITEMS = [
  {
    id: "overview",
    title: "Dashboard",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  { section: "MANAGEMENT" },
  {
    id: "applications",
    title: "Applications",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    id: "institutions",
    title: "Institutions",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0V5a2 2 0 012-2h2a2 2 0 012 2v16",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
];

export default function AdminSidebar({
  activeSection,
  onSectionChange,
  departmentName,
  zoneCode,
}) {
  return (
    <aside className={layoutStyles.sidebar}>
      <div
        className={layoutStyles.sidebarLogo}
        onClick={() => onSectionChange("overview")}
        style={{ cursor: "pointer" }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onSectionChange("overview")}
      >
        <svg
          className={layoutStyles.logoIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A8.995 8.995 0 0112 21a8.995 8.995 0 01-6.825-4.943 12.083 12.083 0 01.665-6.479L12 14z" />
          <path d="M12 14v7" />
        </svg>
        <div className={layoutStyles.logoText}>
          <h1>HSHEC</h1>
          <span>Admin Portal</span>
        </div>
      </div>

      <nav className={layoutStyles.sidebarNav}>
        {MENU_ITEMS.map((item, index) =>
          item.section ? (
            <div key={index} className={layoutStyles.navSectionHeader}>
              {item.section}
            </div>
          ) : (
            <button
              key={item.id}
              type="button"
              className={`${layoutStyles.navItem} ${
                activeSection === item.id ? layoutStyles.active : ""
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <svg
                className={layoutStyles.navIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d={item.icon} />
              </svg>
              <span>{item.title}</span>
            </button>
          ),
        )}
      </nav>

      <div className={layoutStyles.sidebarFooter}>
        <div className={layoutStyles.collegeProfile}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0V5a2 2 0 012-2h2a2 2 0 012 2v16" />
          </svg>
          <div>
            <h4>{departmentName}</h4>
            <span>Zone: {zoneCode}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
