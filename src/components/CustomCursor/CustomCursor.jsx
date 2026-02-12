import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./CustomCursor.module.css";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // 1. Force the cursor to be visible even if the page starts over a 3D element
    const moveCursor = (e) => {
      const { clientX, clientY } = e;

      // Primary Point (Snap)
      gsap.to(cursorRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.05,
        ease: "none",
      });

      // Follower Ring (Smooth Lag)
      gsap.to(followerRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseDown = () => {
      gsap.to(cursorRef.current, { scale: 1.5, duration: 0.1 });
      gsap.to(followerRef.current, { scale: 0.6, borderWidth: "3px", duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
      gsap.to(followerRef.current, { scale: 1, borderWidth: "2px", duration: 0.2 });
    };

    // Attach to window to ensure global capture across all page components
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={styles.cursorPoint} />
      <div ref={followerRef} className={styles.cursorFollower} />
    </>
  );
};

export default CustomCursor;