import EmptyState from "../EmptyState/EmptyState";
import styles from "./charts.module.css";

const COLORS = ["", "green", "amber", "purple"];

export default function BarChart({
  title,
  subtitle,
  data = [],
  labelKey = "label",
  valueKey = "count",
  colorIndex = 0,
}) {
  const items = Array.isArray(data) ? data : [];
  const max = Math.max(...items.map((d) => Number(d[valueKey]) || 0), 1);

  return (
    <div className={styles.card}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.body}>
        {items.length === 0 ? (
          <EmptyState
            title="No chart data"
            description="Data will appear once institutions submit applications."
            icon="chart"
          />
        ) : (
          <div className={styles.barChart}>
            {items.map((item, index) => {
              const value = Number(item[valueKey]) || 0;
              const heightPct = Math.max((value / max) * 100, value > 0 ? 8 : 0);
              const colorClass = COLORS[(colorIndex + index) % COLORS.length];
              return (
                <div key={item[labelKey] ?? index} className={styles.barGroup}>
                  <span className={styles.barValue}>{value}</span>
                  <div className={styles.barTrack}>
                    <div
                      className={`${styles.barFill} ${colorClass ? styles[colorClass] : ""}`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className={styles.barLabel}>{item[labelKey]}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
