import React, { useState } from 'react';
import styles from './InfraDetails.module.css';

const InfraDetails = () => {
  const [formData, setFormData] = useState({
    totalClassrooms: '',
    smartClassrooms: '',
    laboratories: '',
    libraryBooks: '',
    wifiAvailability: 'No',
    hostelFacility: 'No',
    sportsFacilities: '',
    computerLabs: ''
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
          <h2>Infrastructure Details</h2>
          <p>Enter details regarding the physical and digital infrastructure of the college.</p>
        </div>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="totalClassrooms">Total Classrooms *</label>
              <input type="number" id="totalClassrooms" name="totalClassrooms" value={formData.totalClassrooms} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="smartClassrooms">Number of Smart Classrooms *</label>
              <input type="number" id="smartClassrooms" name="smartClassrooms" value={formData.smartClassrooms} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="laboratories">Total Laboratories *</label>
              <input type="number" id="laboratories" name="laboratories" value={formData.laboratories} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="computerLabs">Number of Computer Labs *</label>
              <input type="number" id="computerLabs" name="computerLabs" value={formData.computerLabs} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="libraryBooks">Total Library Books *</label>
              <input type="number" id="libraryBooks" name="libraryBooks" value={formData.libraryBooks} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="wifiAvailability">Wi-Fi Campus *</label>
              <select id="wifiAvailability" name="wifiAvailability" value={formData.wifiAvailability} onChange={handleChange} required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="hostelFacility">Hostel Facility *</label>
              <select id="hostelFacility" name="hostelFacility" value={formData.hostelFacility} onChange={handleChange} required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="sportsFacilities">Sports Facilities (Indoor/Outdoor)</label>
              <input type="text" id="sportsFacilities" name="sportsFacilities" value={formData.sportsFacilities} onChange={handleChange} />
            </div>
          </div>

          <div className={styles.fileUploadSection}>
            <label>Supporting Document (Infrastructure Photos/Audit Reports)</label>
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

export default InfraDetails;
