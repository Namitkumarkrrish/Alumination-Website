import React, { useEffect, useRef } from 'react';
import styles from './Footer.module.css';
import { initFooterAnimations } from './footerAnimations';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (footerRef.current) {
      initFooterAnimations(footerRef.current, contentRef.current);
    }
  }, []);

  // Function to handle scroll to top
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 'smooth' for animated scroll, 'auto' for instant
    });
  };

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
              <Link to="/" onClick={handleScrollToTop}>Home</Link>
              <Link to="/events" onClick={handleScrollToTop}>Events</Link>
              <Link to="/timeline" onClick={handleScrollToTop}>Timeline</Link>
            </div>
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>VOYAGERS</h4>
              <Link to="/alumnis" onClick={handleScrollToTop}>Alumni</Link>
              <Link to="/team" onClick={handleScrollToTop}>Our Team</Link>
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
              <Link to='https://www.instagram.com/saicell_nitdgp?igsh=MTI4eTVrdXpydm9xNQ==' target='/' >INSTAGRAM</Link>
              <span className={styles.sep}>•</span>
              <Link to='https://www.linkedin.com/in/saic-nitd' target='/'>LINKEDIN</Link>
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