import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Signin.module.css';

function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signin data:', formData);
    // Submit logic goes here
  };

  return (
    <div className={styles.pageContainer}>
      <div className={`${styles.signinCard} ${styles.glass3d}`}>
        <div className={styles.signinHeader}>
          <h2>Sign In</h2>
          <p>Access your institutional dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.formGrid}>
          {/* Email ID */}
          <div className={styles.formGroup}>
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="official@college.edu.in"
            />
          </div>

          {/* Password */}
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitBtn}>
              Sign In
            </button>
            <p className={styles.signupPrompt}>
              Don't have an account? <Link to="/signup" className={styles.signupLink}>Register here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
