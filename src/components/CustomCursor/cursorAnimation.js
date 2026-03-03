import gsap from "gsap";

export const initCursor = (refs, state) => {
  const { cursorRef, followerRef } = refs;
  const { setIsVisible } = state;

  if (!cursorRef.current || !followerRef.current) return;

  // Set initial positions to prevent jump from (0,0)
  gsap.set([cursorRef.current, followerRef.current], { xPercent: -50, yPercent: -50 });

  // QuickSetter is the fastest way to update properties in GSAP
  const xCursor = gsap.quickSetter(cursorRef.current, "x", "px");
  const yCursor = gsap.quickSetter(cursorRef.current, "y", "px");
  const xFollower = gsap.quickSetter(followerRef.current, "x", "px");
  const yFollower = gsap.quickSetter(followerRef.current, "y", "px");

  const moveCursor = (e) => {
    setIsVisible(true);
    
    // Cursor follows mouse instantly (or with very slight lag)
    gsap.to({}, {
      duration: 0,
      onUpdate: () => {
        xCursor(e.clientX);
        yCursor(e.clientY);
      }
    });

    // Follower has a smooth delayed lag
    gsap.to(followerRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.5,
      ease: "power3.out"
    });
  };

  const handleMouseDown = () => {
    gsap.to(cursorRef.current, { scale: 0.7, duration: 0.2 });
    gsap.to(followerRef.current, { scale: 0.8, borderWidth: "4px", duration: 0.2 });
  };

  const handleMouseUp = () => {
    gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.3)" });
    gsap.to(followerRef.current, { scale: 1, borderWidth: "2px", duration: 0.3 });
  };

  const handleHoverEnter = (e) => {
    // Check if the hovered element or its parent is clickable
    const target = e.target.closest('a, button, [role="button"], input, textarea');
    
    if (target) {
      gsap.to(followerRef.current, {
        scale: 1.5,
        backgroundColor: "rgba(253, 230, 138, 0.1)",
        borderColor: "#ffffff",
        duration: 0.3
      });
      gsap.to(cursorRef.current, { scale: 0.5, opacity: 0.5, duration: 0.3 });
    }
  };

  const handleHoverLeave = () => {
    gsap.to(followerRef.current, {
      scale: 1,
      backgroundColor: "transparent",
      borderColor: "rgba(253, 230, 138, 0.9)",
      duration: 0.3
    });
    gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
  };

  // Global Listeners
  window.addEventListener("mousemove", moveCursor);
  window.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mouseup", handleMouseUp);
  window.addEventListener("mouseover", handleHoverEnter);
  window.addEventListener("mouseout", handleHoverLeave);

  return () => {
    window.removeEventListener("mousemove", moveCursor);
    window.removeEventListener("mousedown", handleMouseDown);
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("mouseover", handleHoverEnter);
    window.removeEventListener("mouseout", handleHoverLeave);
  };
};