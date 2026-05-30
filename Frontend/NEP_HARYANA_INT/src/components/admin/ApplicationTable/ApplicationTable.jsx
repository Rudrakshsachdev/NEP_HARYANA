import EmptyState from "../EmptyState/EmptyState";
import styles from "./ApplicationTable.module.css";

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusLabel(status) {
  const map = {
    submitted: "Submitted",
    in_progress: "In Progress",
    draft: "Draft",
    not_started: "Not Started",
  };
  return map[status] || status;
}

export default function ApplicationTable({ applications = [] }) {
  if (!applications.length) {
    return (
      <EmptyState
        title="No applications yet"
        description="Institution nomination applications will appear here once colleges begin their submissions."
        icon="inbox"
      />
    );
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Institution</th>
            <th>AISHE Code</th>
            <th>Principal</th>
            <th>Progress</th>
            <th>Score</th>
            <th>Award</th>
            <th>Status</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.form_id || app.id}>
              <td>
                <strong>{app.institution_name}</strong>
              </td>
              <td>{app.aishe_code}</td>
              <td>
                <div className={styles.principal}>
                  <span>{app.principal_name || "—"}</span>
                  {app.principal_email && (
                    <small>{app.principal_email}</small>
                  )}
                </div>
              </td>
              <td>
                <div className={styles.progress}>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${Math.round(
                          ((app.indicators_completed || 0) /
                            (app.total_indicators || 20)) *
                            100,
                        )}%`,
                      }}
                    />
                  </div>
                  <span>
                    {app.indicators_completed ?? 0}/{app.total_indicators ?? 20}
                  </span>
                </div>
              </td>
              <td>
                {app.percentage != null ? (
                  <span className={styles.score}>
                    {Number(app.percentage).toFixed(1)}%
                    <small>({app.grand_total ?? 0} pts)</small>
                  </span>
                ) : (
                  "—"
                )}
              </td>
              <td>
                {app.award_category ? (
                  <span className={styles.badge}>{app.award_category}</span>
                ) : (
                  "—"
                )}
              </td>
              <td>
                <span className={`${styles.status} ${styles[app.status] || ""}`}>
                  {statusLabel(app.status)}
                </span>
              </td>
              <td>{formatDate(app.updated_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
