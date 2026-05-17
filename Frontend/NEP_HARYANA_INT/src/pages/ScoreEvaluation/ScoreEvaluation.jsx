import React from 'react';
import styles from './ScoreEvaluation.module.css';

const ScoreEvaluation = () => {
  // Simulated data based on the prompt's score classification
  const evaluationData = {
    totalScore: 612,
    maxScore: 1000,
    level: 'Gold',
    status: 'Under Review',
    parameters: [
      { name: 'Academic Performance', score: 140, max: 200 },
      { name: 'Research & Innovation', score: 120, max: 200 },
      { name: 'NEP Implementation', score: 160, max: 200 },
      { name: 'Infrastructure', score: 110, max: 200 },
      { name: 'Student Support', score: 82, max: 200 }
    ]
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Score & Evaluation</h2>
          <p>View your calculated scores and institutional classification.</p>
        </div>
        
        <div className={styles.scoreOverview}>
          <div className={styles.scoreCircle}>
            <h3>{evaluationData.totalScore}</h3>
            <span>out of {evaluationData.maxScore}</span>
          </div>
          
          <div className={styles.levelInfo}>
            <div className={styles.levelBadge}>{evaluationData.level} Level</div>
            <p>Based on your current score, your institution is categorized under the <strong>{evaluationData.level}</strong> category.</p>
            <div className={styles.statusPill}>{evaluationData.status}</div>
          </div>
        </div>

        <div className={styles.parametersSection}>
          <h3>Parameter-wise Breakdown</h3>
          <div className={styles.paramList}>
            {evaluationData.parameters.map((param, index) => (
              <div key={index} className={styles.paramItem}>
                <div className={styles.paramInfo}>
                  <span>{param.name}</span>
                  <span>{param.score} / {param.max}</span>
                </div>
                <div className={styles.progressBar}>
                  <div style={{ width: `${(param.score / param.max) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.downloadBtn}>Download Detailed Report</button>
        </div>
      </div>
    </div>
  );
};

export default ScoreEvaluation;
