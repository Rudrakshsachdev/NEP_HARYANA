import styles from "./StatsCard.module.css";

export default function StatsCard({ label, value, hint, accent = "blue", trend }) {
  return (
    <article className={`${styles.card} ${styles[accent]}`}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {trend != null && trend !== "" && (
          <span className={styles.trend}>{trend}</span>
        )}
      </div>
      <div className={styles.value}>{value ?? "—"}</div>
      {hint && <p className={styles.hint}>{hint}</p>}
    </article>
  );
}
