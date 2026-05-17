import React from 'react';
import styles from './Settings.module.css';

const Settings = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2>Settings</h2>
        <p>Configure your account preferences and notifications.</p>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.settingsCard}>
          <h3>Account Settings</h3>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <span>Email Notifications</span>
              <p>Receive daily summary of activity.</p>
            </div>
            <label className={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <span>Two-Factor Authentication</span>
              <p>Add an extra layer of security to your account.</p>
            </div>
            <button className={styles.actionBtn}>Enable</button>
          </div>
        </div>

        <div className={styles.settingsCard}>
          <h3>Theme Preferences</h3>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <span>Dark Mode</span>
              <p>Switch to a dark color scheme.</p>
            </div>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
