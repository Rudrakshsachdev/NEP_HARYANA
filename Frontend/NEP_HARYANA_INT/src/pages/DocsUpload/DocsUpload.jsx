import React, { useState } from 'react';
import styles from './DocsUpload.module.css';

const DocsUpload = () => {
  const [formData, setFormData] = useState({
    category: 'Institution Information',
    docTitle: '',
    description: ''
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
          <h2>Documents Upload</h2>
          <p>Upload supporting documents for various categories here.</p>
        </div>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="category">Document Category *</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} required>
                <option value="Institution Information">Institution Information</option>
                <option value="Academic Information">Academic Information</option>
                <option value="Faculty Information">Faculty Information</option>
                <option value="Student Statistics">Student Statistics</option>
                <option value="NEP Indicators">NEP Indicators</option>
                <option value="Infrastructure Details">Infrastructure Details</option>
                <option value="Research & Innovation">Research & Innovation</option>
                <option value="Internship & Placement">Internship & Placement</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="docTitle">Document Title *</label>
              <input type="text" id="docTitle" name="docTitle" value={formData.docTitle} onChange={handleChange} required placeholder="e.g., NAAC Certificate 2025" />
            </div>
          </div>

          <div className={styles.formGroupFull}>
            <label htmlFor="description">Brief Description (Optional)</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={2} placeholder="Add any relevant details about the document..."></textarea>
          </div>

          <div className={styles.fileUploadSection}>
            <label>Select File *</label>
            <input type="file" className={styles.fileInput} required />
            <p className={styles.fileHelp}>Upload PDF or Image (Max 5MB)</p>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.submitBtn}>Upload Document</button>
            <button type="button" className={styles.cancelBtn}>Cancel</button>
          </div>
        </form>

        <div className={styles.uploadedSection}>
          <h3>Recently Uploaded Documents</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Affiliation Letter</td>
                <td>Institution Info</td>
                <td>12 May 2026</td>
                <td><span className={styles.statusPillGreen}>Verified</span></td>
                <td><button className={styles.viewBtn}>View</button></td>
              </tr>
              <tr>
                <td>Faculty List</td>
                <td>Faculty Info</td>
                <td>15 May 2026</td>
                <td><span className={styles.statusPillOrange}>Pending</span></td>
                <td><button className={styles.viewBtn}>View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DocsUpload;
