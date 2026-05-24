import EmptyState from "../EmptyState/EmptyState";
import styles from "./InstitutionList.module.css";

function statusLabel(status) {
  const map = {
    submitted: "Submitted",
    in_progress: "In Progress",
    draft: "Draft",
    not_started: "Not Started",
  };
  return map[status] || status;
}

export default function InstitutionList({ institutions = [], compact = false }) {
  if (!institutions.length) {
    return (
      <EmptyState
        title="No institutions found"
        description="Registered colleges will appear here once they are added to the system."
        icon="building"
      />
    );
  }

  return (
    <ul className={`${styles.list} ${compact ? styles.compact : ""}`}>
      {institutions.map((inst) => (
        <li key={inst.college_id || inst.aishe_code} className={styles.item}>
          <div className={styles.info}>
            <strong>{inst.name}</strong>
            <span className={styles.code}>{inst.aishe_code}</span>
          </div>
          <div className={styles.meta}>
            {inst.has_application ? (
              <>
                {inst.percentage != null && (
                  <span className={styles.score}>
                    {Number(inst.percentage).toFixed(1)}%
                  </span>
                )}
                {inst.award_category && (
                  <span className={styles.award}>{inst.award_category}</span>
                )}
              </>
            ) : (
              <span className={styles.noApp}>No application</span>
            )}
            <span className={`${styles.status} ${styles[inst.application_status] || ""}`}>
              {statusLabel(inst.application_status)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
