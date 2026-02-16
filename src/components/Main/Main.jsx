import React, { useEffect, useRef } from "react";
import styles from "./Main.module.css";
import { initScrollAnimations, countUpNumbers, initLegacySlider } from "./mainAnimations";

const Main = () => {
  const containerRef = useRef(null);
  const voyagerRef = useRef(null);
  const yearsRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    initScrollAnimations(containerRef.current);
    countUpNumbers(voyagerRef.current, 5000);
    countUpNumbers(yearsRef.current, 20);
    initLegacySlider(marqueeRef.current);
  }, []);

  return (
    <main className={styles.mainContainer} ref={containerRef}>
      <section className={styles.aboutSection}>
        <div className={styles.contentSide}>
          <h2 className={styles.title}>THE GOLDEN <br /> <span>ODYSSEY</span></h2>
          
          <div className={styles.description}>
            <p>
              <span className={styles.dropcap}>W</span>e invite you to <strong>The Golden Odyssey</strong>. 
              This year, Alumination 2026 transforms into a legendary voyage. Just as the ancient 
              mariners navigated by the stars, we look to our alumni—the "Golden Fleet"—to guide 
              our students through the uncharted waters of the future.
            </p>
            <p>
              This is more than a reunion; it is an expedition. From the depths of history to 
              the horizons of innovation, join us as we chart a course for glory.
            </p>
          </div>

          <div className={styles.statsContainer}>
            <div className={styles.statBox}>
              <h3 ref={voyagerRef} className={styles.statNumber}>0</h3>
              <span className={styles.plus}>+</span>
              <p className={styles.statLabel}>VOYAGERS</p>
            </div>
            <div className={styles.statBox}>
              <h3 ref={yearsRef} className={styles.statNumber}>0</h3>
              <p className={styles.statLabel}>YEARS</p>
            </div>
          </div>
        </div>

        <div className={styles.imageSide}>
          <div className={styles.imageFrame}>
            <img src="/images/odyssey-ship.jpg" alt="Charting the Course" className={styles.mainImg} />
            <div className={styles.overlayText}>CHARTING THE COURSE</div>
            <div className={styles.frameBorder}></div>
          </div>
        </div>
      </section>

      {/* --- LEGACY SLIDER --- */}
      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeContent} ref={marqueeRef}>
          <span>LEGACY</span>
          <span>LEGACY</span>
          <span>LEGACY</span>
          <span>LEGACY</span>
          <span>LEGACY</span>
          <span>LEGACY</span>
        </div>
      </div>
    </main>
  );
};

export default Main;