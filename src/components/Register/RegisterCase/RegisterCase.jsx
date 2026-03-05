import React, { useState, useEffect, useRef } from "react";
import styles from "./RegisterCase.module.css";
import { initRegisterAnimation, successStampAnimation } from "./registercaseAnimation";

export default function RegisterCase() {
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    phone: "",
    year: "",
    department: ""
  });

  const [status, setStatus] = useState("idle"); 
  const containerRef = useRef(null);

  const scriptURL = "https://script.google.com/macros/s/AKfycbyX9p095EYExFjJcTMKZu1hAT4R96BaDr041MuPuDuEWjvkDCYf7R30nl0GRgWxFSrA/exec";

  useEffect(() => {
    initRegisterAnimation(containerRef.current);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const payload = { ...formData, eventType: "CASE" };

    try {
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });

      setStatus("success");
      successStampAnimation();
      setFormData({ name: "", roll: "", phone: "", year: "", department: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.decoratorLine}></div>
        
        <header className={styles.header}>
          <span className={styles.eyebrow}>ENCRYPTED CHANNEL : CASE_EXPERTS</span>
          <h2 className={styles.title}>CASEXPERT <span className={styles.gold}>REGISTRATION</span></h2>
          {/* --- ADDED THE COMPULSORY CLAUSE HERE --- */}
          <p className={styles.mandatoryClause}>* ALL FIELDS ARE COMPULSORY</p>
        </header>

        {status === "success" ? (
          <div className={styles.successState}>
            <div className={styles.checkCircle}>✓</div>
            <h3>TRANSMISSION COMPLETE</h3>
            <p className={styles.successText}>Your dossier has been uploaded to the CaseXpert database.</p>
            <button onClick={() => setStatus("idle")} className={styles.backBtn}>SUBMIT ANOTHER</button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>PILOT NAME</label>
              <input 
                className={styles.input} 
                type="text" 
                name="name" 
                autoComplete="off"
                placeholder="Full Name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>IDENTIFICATION (ROLL)</label>
                <input 
                  className={styles.input} 
                  type="text" 
                  name="roll" 
                  autoComplete="off"
                  placeholder="Roll No." 
                  value={formData.roll} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>YEAR</label>
                <select 
                  className={styles.input} 
                  name="year" 
                  value={formData.year} 
                  onChange={handleChange} 
                  required
                >
                  <option value="" disabled>Select</option>
                  <option value="1st year">1st Year</option>
                  <option value="2nd year">2nd Year</option>
                  <option value="3rd year">3rd Year</option>
                  <option value="4th year">4th Year</option>
                </select>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>DEPARTMENT / BRANCH</label>
              <input 
                className={styles.input} 
                type="text" 
                name="department" 
                autoComplete="off"
                placeholder="e.g. Mechanical" 
                value={formData.department} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>COMMUNICATION (WHATSAPP)</label>
              <input 
                className={styles.input} 
                type="text" 
                name="phone" 
                autoComplete="off"
                placeholder="+91 XXXXX" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={status === "loading"}>
                {status === "loading" ? "UPLOADING..." : "INITIATE TRANSMISSION"}
            </button>
            
            {status === "error" && <p className={styles.errorMsg}>Transmission Interrupted. Retry.</p>}
          </form>
        )}
      </div>
    </div>
  );
}