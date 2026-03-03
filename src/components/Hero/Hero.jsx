import React, { useEffect, useRef } from "react";
import styles from "./Hero.module.css";
import { revealHero } from "../../components/Hero/heroAnimation";
import Compass from "../../components/Compass/Compass";

const Hero = () => {
  const housingRef = useRef(null);
  const needleRef = useRef(null);
  const contentRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    revealHero(housingRef.current, contentRef.current.children);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('main section') || document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.hero} ref={heroRef} data-hero>
      {/* Compass is fully self-contained — handles its own mouse events */}
      <Compass compassRef={housingRef} needleRef={needleRef} />

      <div className={styles.content} ref={contentRef}>
        <div className={styles.logoWrapper}>
          <img src="./logos/Alumination.png" alt="Alumination Logo" className={styles.aluminationlogo} />
        </div>
        <h1 className={styles.title}>
          <span className={styles.goldText}>EMBARK ON THE ODYSSEY</span>
        </h1>
        <p className={styles.subtitle}>Guidance • Knowledge • Expedition</p>
        <button className={styles.voyageBtn} onClick={scrollToAbout}>BEGIN YOUR VOYAGE</button>
      </div>
    </div>
  );
};

export default Hero;
