import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.css';
import { initFooterAnimations } from './footerAnimations';

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const { pathname } = useLocation(); // Track route changes

  useEffect(() => {
    let ctx;
    
    // Small delay to ensure the page height has settled after route change
    const timer = setTimeout(() => {
      if (footerRef.current) {
        ctx = initFooterAnimations(footerRef.current, contentRef.current);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [pathname]); // Re-run whenever the page path changes

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={styles.starField}></div>
      
      <div className={styles.container} ref={contentRef}>
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <div className={styles.logoContainer}>
              <img src="./logos/saiclogo3.png" alt="saiclogo" className={styles.logoSquare}/>
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
                <div className={`${styles.btnGlow} btnGlow`}></div>
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
              <a href='https://www.instagram.com/saicell_nitdgp?igsh=MTI4eTVrdXpydm9xNQ==' target='_blank' rel="noreferrer">INSTAGRAM</a>
              <span className={styles.sep}>•</span>
              <a href='https://www.linkedin.com/in/saic-nitd' target='_blank' rel="noreferrer">LINKEDIN</a>
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