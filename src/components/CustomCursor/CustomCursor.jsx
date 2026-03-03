import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import styles from "./CustomCursor.module.css";
import { initCursor } from "./cursorAnimation";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => {
      // Robust check for mobile: screen width OR touch capability
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      return isTouch || isSmallScreen;
    };

    if (checkMobile()) {
      setIsMobile(true);
      return;
    }

    // Initialize desktop-only logic
    const cleanup = initCursor({ cursorRef, followerRef }, { setIsVisible });

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (cleanup) cleanup();
    };
  }, []); // Run once on mount

  // If mobile is detected, render nothing to avoid any click-triggered artifacts
  if (isMobile) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`${styles.cursorPoint} ${!isVisible ? styles.hidden : ''}`}
      />
      <div 
        ref={followerRef} 
        className={`${styles.cursorFollower} ${!isVisible ? styles.hidden : ''}`}
      />
    </>
  );
};

export default CustomCursor;