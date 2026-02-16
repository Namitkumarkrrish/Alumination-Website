import React, { useEffect, useState, useRef } from "react";
import styles from "./CustomCursor.module.css";
import { initCursor } from "./cursorAnimation";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const cursorPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const followerPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafId = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobileQuery = window.matchMedia("(max-width: 768px)").matches;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(mobileQuery || hasTouch || hasCoarsePointer);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isMobile) {
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
      return;
    }

    // Call external GSAP and Animation logic
    const cleanup = initCursor(
      { cursorRef, followerRef, mousePos, cursorPos, followerPos, rafId },
      { setIsVisible }
    );

    return () => {
      window.removeEventListener("resize", checkMobile);
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
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