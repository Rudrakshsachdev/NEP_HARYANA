import React, { useState } from 'react';
import styles from './InternshipPlacement.module.css';

const InternshipPlacement = () => {
  const [formData, setFormData] = useState({
    studentsPlaced: '',
    averagePackage: '',
    studentsInternship: '',
    placementCell: 'No',
    topRecruiters: '',
    highestPackage: ''
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
          <h2>Internship & Placement</h2>
          <p>Enter details regarding student placements and internships.</p>
        </div>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="studentsPlaced">Number of Students Placed *</label>
              <input type="number" id="studentsPlaced" name="studentsPlaced" value={formData.studentsPlaced} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="averagePackage">Average Package (in LPA) *</label>
              <input type="number" step="0.01" id="averagePackage" name="averagePackage" value={formData.averagePackage} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="highestPackage">Highest Package (in LPA) *</label>
              <input type="number" step="0.01" id="highestPackage" name="highestPackage" value={formData.highestPackage} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="studentsInternship">Students Who Completed Internships *</label>
              <input type="number" id="studentsInternship" name="studentsInternship" value={formData.studentsInternship} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="placementCell">Active Placement Cell *</label>
              <select id="placementCell" name="placementCell" value={formData.placementCell} onChange={handleChange} required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="topRecruiters">Top Recruiters (Comma separated)</label>
              <input type="text" id="topRecruiters" name="topRecruiters" value={formData.topRecruiters} onChange={handleChange} />
            </div>
          </div>

          <div className={styles.fileUploadSection}>
            <label>Supporting Document (Placement Reports/Internship Certificates Summary)</label>
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

export default InternshipPlacement;
