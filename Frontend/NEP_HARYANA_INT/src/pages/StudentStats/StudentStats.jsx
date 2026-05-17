import React, { useState } from 'react';
import styles from './StudentStats.module.css';

const StudentStats = () => {
  const [formData, setFormData] = useState({
    totalStudents: '',
    maleStudents: '',
    femaleStudents: '',
    scStudents: '',
    stStudents: '',
    obcStudents: '',
    generalStudents: '',
    otherStateStudents: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Student Statistics</h2>
          <p>Enter the demographic and enrollment statistics of students.</p>
        </div>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="totalStudents">Total Students *</label>
              <input type="number" id="totalStudents" name="totalStudents" value={formData.totalStudents} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="maleStudents">Total Male Students *</label>
              <input type="number" id="maleStudents" name="maleStudents" value={formData.maleStudents} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="femaleStudents">Total Female Students *</label>
              <input type="number" id="femaleStudents" name="femaleStudents" value={formData.femaleStudents} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="scStudents">SC Category Students *</label>
              <input type="number" id="scStudents" name="scStudents" value={formData.scStudents} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="stStudents">ST Category Students *</label>
              <input type="number" id="stStudents" name="stStudents" value={formData.stStudents} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="obcStudents">OBC Category Students *</label>
              <input type="number" id="obcStudents" name="obcStudents" value={formData.obcStudents} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="generalStudents">General Category Students *</label>
              <input type="number" id="generalStudents" name="generalStudents" value={formData.generalStudents} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="otherStateStudents">Students from Other States</label>
              <input type="number" id="otherStateStudents" name="otherStateStudents" value={formData.otherStateStudents} onChange={handleChange} />
            </div>
          </div>

          <div className={styles.fileUploadSection}>
            <label>Supporting Document (Student Enrollment Register/Summary)</label>
            <input type="file" className={styles.fileInput} />
            <p className={styles.fileHelp}>Upload PDF or Image (Max 5MB)</p>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.submitBtn}>Save & Continue</button>
            <button type="button" className={styles.cancelBtn}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentStats;
