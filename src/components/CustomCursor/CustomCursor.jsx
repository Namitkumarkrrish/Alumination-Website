import React, { useEffect, useState, useRef } from "react";
import styles from "./CustomCursor.module.css";
import { initCursor } from "./cursorAnimation";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window);
    };

    checkMobile();
    if (isMobile) return;

    const cleanup = initCursor({ cursorRef, followerRef }, { setIsVisible });

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cleanup();
    };
  }, [isMobile]);

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