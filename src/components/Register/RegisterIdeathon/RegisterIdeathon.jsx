import React, { useState, useEffect, useRef } from "react";
import styles from "./RegisterIdeathon.module.css";
import * as animations from "./registerideathonAnimation.js";

export default function RegisterIdeathon() {
  const [formData, setFormData] = useState({
    teamLeaderName: "", teamLeaderRoll: "", teamLeaderPhone: "", member1Year: "", member1Dept: "",
    member2Name: "", member2Roll: "", member2Year: "", member2Dept: "",
    member3Name: "", member3Roll: "", member3Year: "", member3Dept: "",
    member4Name: "", member4Roll: "", member4Year: "", member4Dept: "",
  });

  const [status, setStatus] = useState("idle");
  const containerRef = useRef(null);
  
  const scriptURL = "https://script.google.com/macros/s/AKfycbwMlFkb4AGI89N72Tc-rbyU7uT31q7OJEjxPzBG_PSlJT-_EvlCrlAghwIJ3BIOp1kC/exec";

  useEffect(() => {
    if (containerRef.current) {
      animations.initRegisterAnimation(containerRef.current);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      setTimeout(() => {
        animations.successStampAnimation(containerRef.current);
      }, 100);
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus("error");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.decoratorLine}></div>

        <header className={styles.header}>
          <span className={styles.eyebrow}>ENCRYPTED CHANNEL : IDEATHON_HQ</span>
          <h2 className={styles.title}>IDEATHON <span className={styles.gold}>REGISTRATION</span></h2>
          <p className={styles.mandatoryClause}>* MINIMUM 2 MEMBERS REQUIRED (INCLUDING LEADER)</p>
        </header>

        {status === "success" ? (
          <div className={styles.successState}>
            <div className={styles.checkCircle}>✓</div>
            <h3 className={styles.successTitle}>MISSION DEPLOYED</h3>
            <p className={styles.successText}>Team dossier integrated successfully.</p>
            <button onClick={() => window.location.reload()} className={styles.backBtn}>REGISTER ANOTHER TEAM</button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h4 className={styles.sectionTitle}>TEAM LEADER (MEMBER 1)</h4>
            <div className={styles.inputGroup}>
              <label className={styles.label}>FULL NAME</label>
              <input className={styles.input} type="text" name="teamLeaderName" value={formData.teamLeaderName} onChange={handleChange} required />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>ROLL NUMBER</label>
                <input className={styles.input} type="text" name="teamLeaderRoll" value={formData.teamLeaderRoll} onChange={handleChange} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>YEAR</label>
                <select className={styles.input} name="member1Year" value={formData.member1Year} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="1st year">1st Year</option>
                  <option value="2nd year">2nd Year</option>
                  <option value="3rd year">3rd Year</option>
                  <option value="4th year">4th Year</option>
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>WHATSAPP</label>
                <input className={styles.input} type="text" name="teamLeaderPhone" placeholder="+91" value={formData.teamLeaderPhone} onChange={handleChange} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>DEPARTMENT</label>
                <input className={styles.input} type="text" name="member1Dept" value={formData.member1Dept} onChange={handleChange} required />
              </div>
            </div>

            {[2, 3, 4].map((num) => (
              <div key={num} className={styles.memberSection}>
                <h4 className={styles.sectionTitle}>MEMBER {num} {num === 2 ? "(MANDATORY)" : "(OPTIONAL)"}</h4>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>NAME</label>
                  <input 
                    className={styles.input} 
                    type="text" 
                    name={`member${num}Name`} 
                    value={formData[`member${num}Name`]} 
                    onChange={handleChange} 
                    required={num === 2} 
                  />
                </div>
                <div className={styles.row}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>ROLL NO</label>
                    <input 
                      className={styles.input} 
                      type="text" 
                      name={`member${num}Roll`} 
                      value={formData[`member${num}Roll`]} 
                      onChange={handleChange} 
                      required={num === 2}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>YEAR</label>
                    <select 
                      className={styles.input} 
                      name={`member${num}Year`} 
                      value={formData[`member${num}Year`]} 
                      onChange={handleChange}
                      required={num === 2}
                    >
                      <option value="">Select</option>
                      <option value="1st year">1st Year</option>
                      <option value="2nd year">2nd Year</option>
                      <option value="3rd year">3rd Year</option>
                      <option value="4th year">4th Year</option>
                    </select>
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>DEPARTMENT</label>
                  <input 
                    className={styles.input} 
                    type="text" 
                    name={`member${num}Dept`} 
                    value={formData[`member${num}Dept`]} 
                    onChange={handleChange} 
                    required={num === 2}
                  />
                </div>
              </div>
            ))}

            <button type="submit" className={styles.submitBtn} disabled={status === "loading"}>
              {status === "loading" ? "UPLOADING..." : "INITIATE REGISTRATION"}
            </button>
            {status === "error" && <p className={styles.errorMsg}>CONNECTION ERROR. RETRY.</p>}
          </form>
        )}
      </div>
    </div>
  );
}