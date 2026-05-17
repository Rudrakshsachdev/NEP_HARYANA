import React, { useState } from 'react';
import styles from './InstitutionInfo.module.css';

const InstitutionInfo = () => {
  const [formData, setFormData] = useState({
    collegeName: '',
    aisheCode: '',
    collegeType: 'Government',
    affiliatingUni: '',
    establishmentYear: '',
    address: '',
    city: '',
    pin: '',
    state: 'Haryana',
    website: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Handle submission logic (API call)
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Institution Information</h2>
          <p>Please fill in the basic details of the institution.</p>
        </div>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="collegeName">College Name *</label>
              <input type="text" id="collegeName" name="collegeName" value={formData.collegeName} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="aisheCode">AISHE Code *</label>
              <input type="text" id="aisheCode" name="aisheCode" value={formData.aisheCode} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="collegeType">College Type *</label>
              <select id="collegeType" name="collegeType" value={formData.collegeType} onChange={handleChange} required>
                <option value="Government">Government</option>
                <option value="Aided">Aided</option>
                <option value="Self-Financing">Self-Financing</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="affiliatingUni">Affiliating University *</label>
              <input type="text" id="affiliatingUni" name="affiliatingUni" value={formData.affiliatingUni} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="establishmentYear">Year of Establishment *</label>
              <input type="number" id="establishmentYear" name="establishmentYear" value={formData.establishmentYear} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Official Email ID *</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Contact Number *</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="website">Website (Optional)</label>
              <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} />
            </div>
          </div>

          <div className={styles.formGroupFull}>
            <label htmlFor="address">Full Address *</label>
            <textarea id="address" name="address" value={formData.address} onChange={handleChange} required rows={3}></textarea>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="city">City *</label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="pin">PIN Code *</label>
              <input type="text" id="pin" name="pin" value={formData.pin} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="state">State *</label>
              <input type="text" id="state" name="state" value={formData.state} readOnly />
            </div>
          </div>

          <div className={styles.fileUploadSection}>
            <label>Supporting Document (Proof of Affiliation/Establishment)</label>
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

export default InstitutionInfo;
