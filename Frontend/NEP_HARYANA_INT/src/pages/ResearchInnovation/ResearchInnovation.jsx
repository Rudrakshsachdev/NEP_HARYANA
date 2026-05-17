import React, { useState } from 'react';
import styles from './ResearchInnovation.module.css';

const ResearchInnovation = () => {
  const [formData, setFormData] = useState({
    publications: '',
    patents: '',
    grantsAmount: '',
    innovationCell: 'No',
    incubationCenter: 'No',
    mousSigned: ''
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
          <h2>Research & Innovation</h2>
          <p>Enter details regarding research output, patents, and innovation activities.</p>
        </div>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="publications">Number of Research Publications *</label>
              <input type="number" id="publications" name="publications" value={formData.publications} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="patents">Number of Patents (Published/Granted) *</label>
              <input type="number" id="patents" name="patents" value={formData.patents} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="grantsAmount">Total Research Grants Received (in INR) *</label>
              <input type="number" id="grantsAmount" name="grantsAmount" value={formData.grantsAmount} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="mousSigned">Number of MOUs Signed *</label>
              <input type="number" id="mousSigned" name="mousSigned" value={formData.mousSigned} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="innovationCell">Institution Innovation Cell (IIC) Established *</label>
              <select id="innovationCell" name="innovationCell" value={formData.innovationCell} onChange={handleChange} required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="incubationCenter">Startup Incubation Center Available *</label>
              <select id="incubationCenter" name="incubationCenter" value={formData.incubationCenter} onChange={handleChange} required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className={styles.fileUploadSection}>
            <label>Supporting Document (List of Publications/Patent Proofs/Grant Letters)</label>
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

export default ResearchInnovation;
