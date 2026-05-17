import React from 'react';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2>My Profile</h2>
        <p>Manage your personal information and account details.</p>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.profileCard}>
          <div className={styles.avatarLarge}>DR</div>
          <div className={styles.profileInfo}>
            <h3>Dr. Rajesh Kumar</h3>
            <p className={styles.role}>College Admin</p>
            <p className={styles.college}>Government College, Sector 14, Gurugram</p>
          </div>
          <button className={styles.editBtn}>Edit Profile</button>
        </div>

        <div className={styles.detailsCard}>
          <h3>Account Details</h3>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.label}>Email Address</span>
              <span className={styles.value}>rajesh.kumar@haryana.gov.in</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Phone Number</span>
              <span className={styles.value}>+91 98765 43210</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Department</span>
              <span className={styles.value}>Higher Education</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Employee ID</span>
              <span className={styles.value}>EMP-2026-087</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
