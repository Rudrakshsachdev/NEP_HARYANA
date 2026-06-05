import styles from "./LeadershipSection.module.css";
import LeadershipMessageCard from "./LeadershipMessageCard";
import { leadershipHighlights, leaders } from "./leadershipData";

function LeadershipSection() {
  return (
    <section
      className={styles.section}
      id="leadership-section"
      aria-label="Messages from leadership"
    >
      <div className={styles.container}>
        <div className={styles.heroPanel}>
          <div className={styles.copyColumn}>
            <div className={styles.accentLine} aria-hidden="true" />
            <h2 className={styles.sectionTitle}>
              Guidance that sets the tone{" "}
              <span className={styles.sectionTitleHighlight}>
                for the entire platform
              </span>
            </h2>
            <p className={styles.sectionLead}>
              A clear institutional mandate for quality, accountability, and
              digital-first governance across Haryana's higher education
              ecosystem.
            </p>

            <div
              className={styles.highlightRow}
              aria-label="Leadership priorities"
            >
              {leadershipHighlights.map((item) => (
                <span key={item} className={styles.highlightPill}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.cardsGrid}>
          {leaders.map((leader, index) => (
            <LeadershipMessageCard
              key={leader.id}
              leader={leader}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LeadershipSection;
