import React, { useEffect, useRef } from 'react';
import styles from './Footer.module.css';
import { initFooterAnimations } from './footerAnimations';

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (footerRef.current) {
      initFooterAnimations(footerRef.current, contentRef.current);
    }
  }, []);

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={styles.starField}></div>
      
      <div className={styles.container} ref={contentRef}>
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <div className={styles.logoContainer}>
              <div className={styles.logoSquare}>S</div>
              <span className={styles.logoText}>SAIC</span>
            </div>
            <p className={styles.missionText}>
              Charting courses for glory since the dawn of our odyssey. 
              Join the expedition into the horizons of innovation.
            </p>
          </div>

          <div className={styles.linksGrid}>
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>EXPEDITION</h4>
              <a href="#home">Home</a>
              <a href="#events">Events</a>
              <a href="#timeline">Timeline</a>
            </div>
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>VOYAGERS</h4>
              <a href="#alumni">Alumni</a>
              <a href="#team">Our Team</a>
              <a href="#gallery">Archives</a>
            </div>
          </div>

          <div className={styles.ctaSection}>
            <h4 className={styles.columnTitle}>STAY CONNECTED</h4>
            <div className={styles.buttonWrapper}>
              <button className={styles.connectBtn}>
                BEGIN YOUR VOYAGE
                <div className={styles.btnGlow}></div>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.divider}>
            <div className={styles.dividerCompass}></div>
          </div>
          <div className={styles.legal}>
            <p>© 2026 SAIC ALUMNI ASSOCIATION • COORDINATES: 23.5° N, 87.3° E</p>
            <div className={styles.socials}>
              <span>INSTAGRAM</span>
              <span className={styles.sep}>•</span>
              <span>LINKEDIN</span>
              <span className={styles.sep}>•</span>
              <span>X</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;