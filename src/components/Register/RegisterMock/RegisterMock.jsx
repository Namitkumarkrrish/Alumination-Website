import React, { useState, useEffect, useRef } from "react";
import styles from "./RegisterMock.module.css";
import { initRegisterAnimation, successStampAnimation } from "./registermockAnimation";

export default function RegisterMock() {
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    phone: ""
  });

  const [status, setStatus] = useState("idle"); 
  const containerRef = useRef(null);

  // YOUR WORKING URL
  const scriptURL = "https://script.google.com/macros/s/AKfycbxH2aeWTS-LEXluJgkpp-89kGt9_fm5dnvK43lCX2mWFJE7n074ICzGpnllCT1GIQ9u/exec";

  useEffect(() => {
    initRegisterAnimation(containerRef.current);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(formData),
      });

      setStatus("success");
      successStampAnimation();
      setFormData({ name: "", roll: "", phone: "" });
    } catch (error) {
      console.error("Error!", error.message);
      setStatus("error");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.decoratorLine}></div>
        
        <header className={styles.header}>
          <span className={styles.eyebrow}>TRANSMISSION ESTABLISHED</span>
          <h2 className={styles.title}>MOCK ENJOY <span className={styles.gold}>REGISTRATION</span></h2>
        </header>

        {status === "success" ? (
          <div className={styles.successState}>
            <div className={styles.checkCircle}>✓</div>
            <h3>ENTRY LOGGED</h3>
            <p className={styles.successText}>Your coordinates have been synchronized with the Alumination'25 archives.</p>
            <button onClick={() => setStatus("idle")} className={styles.backBtn}>SUBMIT ANOTHER ENTRY</button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>PILOT NAME</label>
              <input
                className={styles.input}
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>IDENTIFICATION (ROLL)</label>
              <input
                className={styles.input}
                type="text"
                name="roll"
                placeholder="Roll Number"
                value={formData.roll}
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
                placeholder="WhatsApp Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={status === "loading"}>
              <span className={styles.btnText}>
                {status === "loading" ? "UPLOADING TO ARCHIVES..." : "INITIATE REGISTRATION"}
              </span>
            </button>
            
            {status === "error" && <p className={styles.errorMsg}>Transmission Interrupted. Try again.</p>}
          </form>
        )}
      </div>
    </div>
  );
}