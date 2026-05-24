import EmptyState from "../EmptyState/EmptyState";
import styles from "./charts.module.css";

function formatMonth(monthKey) {
  if (!monthKey) return "";
  const [year, month] = monthKey.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
}

export default function TrendChart({ title, subtitle, data = [] }) {
  const items = Array.isArray(data) ? data : [];
  const max = Math.max(...items.map((d) => Number(d.count) || 0), 1);

  return (
    <div className={styles.card}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.body}>
        {items.length === 0 ? (
          <EmptyState
            title="No trend data"
            description="Application activity over time will appear here."
            icon="chart"
          />
        ) : (
          <div className={styles.trendList}>
            {items.map((item) => {
              const count = Number(item.count) || 0;
              const widthPct = Math.max((count / max) * 100, count > 0 ? 6 : 0);
              return (
                <div key={item.month} className={styles.trendRow}>
                  <span className={styles.trendMonth}>{formatMonth(item.month)}</span>
                  <div className={styles.trendBar}>
                    <div className={styles.trendFill} style={{ width: `${widthPct}%` }} />
                  </div>
                  <span className={styles.trendCount}>{count}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
