import styles from "./EmptyState.module.css";

export default function EmptyState({
  title = "No data available",
  description = "There is nothing to display yet.",
  icon = "inbox",
}) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon} data-icon={icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {icon === "chart" ? (
            <path d="M3 3v18h18M7 16l4-8 4 5 5-9" />
          ) : icon === "building" ? (
            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h6" />
          ) : (
            <path d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4m16 0H4" />
          )}
        </svg>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
