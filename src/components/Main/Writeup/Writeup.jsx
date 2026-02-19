import React, { useEffect, useRef } from 'react';
import styles from './Writeup.module.css';
import { initWriteupAnimations } from './writeupAnimations';
import { Link } from "react-router-dom";

const eventNames = [
  "LINKEDIN BOOTCAMP",
  "MOCK EN JOY",
  "IDEATHON",
  "CASEXPERT",
  "MASTER'S TALK",
  "CIVILQUEST"
];

const Writeup = () => {
  const sectionRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const ctx = initWriteupAnimations(sectionRef.current, boxRef.current);
    return () => ctx && ctx.revert(); // Clean up GSAP context
  }, []);

  return (
    <section className={styles.writeupSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.briefingBox} ref={boxRef}>
          
          <div className={styles.aluminationSide}>
            <h2 className={styles.title}>ALUMINATION</h2>
            <div className={styles.goldLine}></div>
            <p className={styles.statement}>
              The legacy of SAIC is not just in its history, but in the collective 
              brilliance of its voyagers. We call this <strong>Alumination</strong>—the 
              guiding light that fuels our journey forward.
            </p>
            <Link to="/events" className={styles.voyageBtn}>
              EXPLORE EVENTS
              <span className={styles.arrow}>→</span>
            </Link>
          </div>

          <div className={styles.rosterSide}>
            <span className={styles.rosterLabel}>OUR EVENTS</span>
            <ul className={styles.eventList}>
              {eventNames.map((name, index) => (
                <li key={index} className={styles.eventItem}>
                  <span className={styles.index}>0{index + 1}</span>
                  <span className={styles.name}>{name}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Writeup;