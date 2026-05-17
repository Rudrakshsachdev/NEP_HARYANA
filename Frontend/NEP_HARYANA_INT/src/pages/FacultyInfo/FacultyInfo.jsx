import React, { useState } from 'react';
import styles from './FacultyInfo.module.css';

const FacultyInfo = () => {
  const [formData, setFormData] = useState({
    sanctionedPosts: '',
    filledPosts: '',
    regularFaculty: '',
    contractualFaculty: '',
    phdFaculty: '',
    studentTeacherRatio: ''
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
          <h2>Faculty Information</h2>
          <p>Enter details regarding the teaching staff and faculty strength.</p>
        </div>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="sanctionedPosts">Total Sanctioned Posts *</label>
              <input type="number" id="sanctionedPosts" name="sanctionedPosts" value={formData.sanctionedPosts} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="filledPosts">Total Filled Posts *</label>
              <input type="number" id="filledPosts" name="filledPosts" value={formData.filledPosts} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="regularFaculty">Regular Faculty Count *</label>
              <input type="number" id="regularFaculty" name="regularFaculty" value={formData.regularFaculty} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contractualFaculty">Contractual/Ad-hoc Faculty *</label>
              <input type="number" id="contractualFaculty" name="contractualFaculty" value={formData.contractualFaculty} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phdFaculty">Faculty with Ph.D. *</label>
              <input type="number" id="phdFaculty" name="phdFaculty" value={formData.phdFaculty} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="studentTeacherRatio">Student-Teacher Ratio (e.g., 20) *</label>
              <input type="number" id="studentTeacherRatio" name="studentTeacherRatio" value={formData.studentTeacherRatio} onChange={handleChange} required />
            </div>
          </div>

          <div className={styles.fileUploadSection}>
            <label>Supporting Document (List of Faculty with Qualifications)</label>
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

export default FacultyInfo;
