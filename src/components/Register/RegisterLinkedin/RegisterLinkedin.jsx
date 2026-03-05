import React, { useState, useEffect, useRef } from "react";
import styles from "./RegisterLinkedin.module.css";
import * as animations from "./registerlinkedinAnimation.js";

export default function RegisterLinkedin() {
  const [formData, setFormData] = useState({ name: "", rollNo: "", phone: "" });
  const [status, setStatus] = useState("idle");
  const containerRef = useRef(null);

  const scriptURL = "https://script.google.com/macros/s/AKfycbz0VBclE35v1_s6MJ5LN5afdzCO6zEhGcV6u1OftPQmUP5IXCmuOe2UVBrsS1qZwQraTQ/exec";

  useEffect(() => {
    if (animations.initRegisterAnimation && containerRef.current) {
      animations.initRegisterAnimation(containerRef.current);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setStatus("idle");
    // Re-trigger reveal animation after React swaps the view back to the form
    setTimeout(() => {
      if (animations.revealFormFields) {
        animations.revealFormFields(containerRef.current);
      }
    }, 50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(formData),
      });
      setStatus("success");
      // Pass the ref to ensure GSAP finds the success elements
      setTimeout(() => animations.successStampAnimation(containerRef.current), 100);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.decoratorLine}></div>
        
        <header>
          <span className={styles.eyebrow}>UPGRADING PROFILE : LINKEDIN_BOOTCAMP</span>
          <h2 className={styles.title}>BOOTCAMP <span className={styles.gold}>REGISTRATION</span></h2>
        </header>

        {status === "success" ? (
          <div className={styles.successState}>
            <div className={styles.checkCircle}>✓</div>
            <h3 className={styles.gold}>TRANSMISSION COMPLETE</h3>
            <p className={styles.successText}>Profile optimization protocol initiated.</p>
            <button onClick={handleReset} className={styles.backBtn}>REGISTER ANOTHER</button>
          </div>
        ) : (
          <>
            <p className={styles.compulsory}>* ALL FIELDS ARE COMPULSORY</p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>FULL NAME</label>
                <input className={styles.input} name="name" type="text" onChange={handleChange} required />
              </div>
              
              <div className={styles.inputGroup}>
                <label className={styles.label}>ROLL NUMBER</label>
                <input className={styles.input} name="rollNo" type="text" onChange={handleChange} required />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>WHATSAPP NUMBER</label>
                <input className={styles.input} name="phone" type="text" placeholder="+91" onChange={handleChange} required />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={status === "loading"}>
                {status === "loading" ? "UPLOADING..." : "INITIATE TRANSMISSION"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}