import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSavedAuthUser } from "../../../api/auth";
import {
  fetchNominationHeaderById,
  saveNominationHeaderById,
} from "../../../api/nomination";
import styles from "./NominationForm.module.css";

const initialState = {
  institution_name: "",
  aishe_code: "",
  head_name: "",
  head_contact: "",
  hei_address: "",
  institution_type: "college",
};

function NominationForm() {
  const navigate = useNavigate();
  const { formId } = useParams();
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!formId) {
      setStatus({
        type: "error",
        message: "Missing form id. Please open the form from the Forms tab.",
      });
      setIsLoading(false);
      return undefined;
    }

    let active = true;

    const loadForm = async () => {
      try {
        const data = await fetchNominationHeaderById(formId);

        if (!active) {
          return;
        }

        setFormData({
          institution_name: data.institution_name || "",
          aishe_code: data.aishe_code || "",
          head_name: data.head_name || "",
          head_contact: data.head_contact || "",
          hei_address: data.hei_address || "",
          institution_type: data.institution_type || "college",
        });
      } catch (error) {
        if (active) {
          setStatus({
            type: "error",
            message: error.message || "Could not load nomination form.",
          });
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadForm();

    return () => {
      active = false;
    };
  }, [formId]);

  useEffect(() => {
    const savedUser = getSavedAuthUser();
    if (!savedUser) {
      return;
    }

    setFormData((current) => ({
      ...current,
      institution_name:
        current.institution_name || savedUser.college_name || "",
      aishe_code: current.aishe_code || savedUser.aishe_code || "",
      head_name: current.head_name || savedUser.full_name || "",
      head_contact: current.head_contact || savedUser.email || "",
      hei_address: current.hei_address || savedUser.address || "",
    }));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formId) {
      setStatus({
        type: "error",
        message: "Missing form id. Cannot save the submission.",
      });
      return;
    }

    setStatus({ type: "", message: "" });
    setIsSubmitting(true);

    try {
      const response = await saveNominationHeaderById(formId, formData);
      const saved = response.data || response;
      setFormData({
        institution_name: saved.institution_name || formData.institution_name,
        aishe_code: saved.aishe_code || formData.aishe_code,
        head_name: saved.head_name || formData.head_name,
        head_contact: saved.head_contact || formData.head_contact,
        hei_address: saved.hei_address || formData.hei_address,
        institution_type: saved.institution_type || formData.institution_type,
      });
      setStatus({
        type: "success",
        message: response.message || "Nomination header saved.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Could not save nomination header.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.pageShell}>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate("/college/dashboard")}
          >
            Back to dashboard
          </button>
          <div>
            <span className={styles.badge}>Phase 2</span>
            <h3>Nomination Form & Indicator Submission</h3>
            <p>
              Section A is the institution header. It is auto-filled from the
              college profile and can be saved as a draft for later indicator
              submission.
            </p>
          </div>
          <div className={styles.formMeta}>
            <span>Form ID</span>
            <strong>{formId || "Pending"}</strong>
          </div>
        </div>

        {status.message && (
          <div
            className={`${styles.statusMessage} ${status.type === "success" ? styles.success : styles.error}`}
          >
            {status.message}
          </div>
        )}

        <section className={styles.formCard}>
          <form className={styles.formGrid} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="institution_name">Institution Name</label>
              <input
                id="institution_name"
                name="institution_name"
                value={formData.institution_name}
                onChange={handleChange}
                readOnly
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="aishe_code">AISHE Code</label>
              <input
                id="aishe_code"
                name="aishe_code"
                value={formData.aishe_code}
                onChange={handleChange}
                readOnly
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="head_name">Name of Head of Institute</label>
              <input
                id="head_name"
                name="head_name"
                value={formData.head_name}
                onChange={handleChange}
                required
                placeholder="Enter head of institute name"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="head_contact">Contact of Head of Institute</label>
              <input
                id="head_contact"
                name="head_contact"
                value={formData.head_contact}
                onChange={handleChange}
                required
                placeholder="Email or phone"
              />
            </div>

            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label htmlFor="hei_address">Address of HEI</label>
              <textarea
                id="hei_address"
                name="hei_address"
                value={formData.hei_address}
                onChange={handleChange}
                required
                rows="3"
                placeholder="Institution address"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="institution_type">Type</label>
              <select
                id="institution_type"
                name="institution_type"
                value={formData.institution_type}
                onChange={handleChange}
                required
              >
                <option value="university">University</option>
                <option value="college">College</option>
              </select>
            </div>

            <div
              className={`${styles.field} ${styles.fullWidth} ${styles.actions}`}
            >
              <button type="submit" disabled={isSubmitting || isLoading}>
                {isSubmitting ? "Saving..." : "Save Section A"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default NominationForm;
