import React, { useState } from 'react';
import styles from './NEPIndicators.module.css';

const NEPIndicators = () => {
  const [formData, setFormData] = useState({
    multidisciplinary: 'No',
    abcIntegration: 'No',
    iksCourses: 'No',
    skillCourses: 'No',
    creditTransfer: 'No',
    dualDegree: 'No',
    localLanguageInstruction: 'No'
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
          <h2>NEP Indicators</h2>
          <p>Track the implementation of National Education Policy (NEP) 2020 initiatives.</p>
        </div>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="multidisciplinary">Multidisciplinary Courses Offered *</label>
              <select id="multidisciplinary" name="multidisciplinary" value={formData.multidisciplinary} onChange={handleChange} required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="abcIntegration">Academic Bank of Credits (ABC) Integration *</label>
              <select id="abcIntegration" name="abcIntegration" value={formData.abcIntegration} onChange={handleChange} required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="iksCourses">Courses in Indian Knowledge System (IKS) *</label>
              <select id="iksCourses" name="iksCourses" value={formData.iksCourses} onChange={handleChange} required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="skillCourses">Skill Development Courses Offered *</label>
              <select id="skillCourses" name="skillCourses" value={formData.skillCourses} onChange={handleChange} required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="creditTransfer">Credit Transfer Policy Implemented *</label>
              <select id="creditTransfer" name="creditTransfer" value={formData.creditTransfer} onChange={handleChange} required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="dualDegree">Dual Degree Programs Offered *</label>
              <select id="dualDegree" name="dualDegree" value={formData.dualDegree} onChange={handleChange} required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="localLanguageInstruction">Instruction in Local Language/Mother Tongue *</label>
              <select id="localLanguageInstruction" name="localLanguageInstruction" value={formData.localLanguageInstruction} onChange={handleChange} required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className={styles.fileUploadSection}>
            <label>Supporting Document (NEP Implementation Report/Policy Docs)</label>
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

export default NEPIndicators;
