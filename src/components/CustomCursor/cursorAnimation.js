import gsap from "gsap";

export const initCursor = (refs, state) => {
  const { cursorRef, followerRef, mousePos, cursorPos, followerPos, rafId } = refs;
  const { setIsVisible } = state;

  // Smooth animation loop
  const animateCursor = () => {
    // Smooth lerp for cursor
    cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.3;
    cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.3;

    // Slower lerp for follower
    followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.12;
    followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.12;

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px) translate(-50%, -50%)`;
    }
    if (followerRef.current) {
      followerRef.current.style.transform = `translate(${followerPos.current.x}px, ${followerPos.current.y}px) translate(-50%, -50%)`;
    }

    rafId.current = requestAnimationFrame(animateCursor);
  };

  const moveCursor = (e) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    setIsVisible(true);
  };

  const handleMouseDown = () => {
    if (!cursorRef.current || !followerRef.current) return;
    gsap.to(cursorRef.current, { scale: 0.8, duration: 0.15, ease: "power2.out" });
    gsap.to(followerRef.current, { scale: 0.7, borderWidth: "3px", duration: 0.15, ease: "power2.out" });
  };

  const handleMouseUp = () => {
    if (!cursorRef.current || !followerRef.current) return;
    gsap.to(cursorRef.current, { scale: 1, duration: 0.2, ease: "elastic.out(1, 0.3)" });
    gsap.to(followerRef.current, { scale: 1, borderWidth: "2px", duration: 0.2, ease: "elastic.out(1, 0.3)" });
  };

  const handleHoverEnter = (e) => {
    const target = e.target;
    if (
      target.tagName === 'A' || 
      target.tagName === 'BUTTON' || 
      target.onclick ||
      target.style.cursor === 'pointer' ||
      window.getComputedStyle(target).cursor === 'pointer'
    ) {
      if (followerRef.current && cursorRef.current) {
        gsap.to(followerRef.current, {
          scale: 1.8, borderColor: '#ffffff', borderWidth: '3px', duration: 0.3, ease: "power2.out"
        });
        gsap.to(cursorRef.current, {
          scale: 0.6, backgroundColor: '#fbbf24', duration: 0.3, ease: "power2.out"
        });
      }
    }
  };

  const handleHoverLeave = () => {
    if (followerRef.current && cursorRef.current) {
      gsap.to(followerRef.current, {
        scale: 1, borderColor: 'rgba(253, 230, 138, 0.9)', borderWidth: '2px', duration: 0.3, ease: "power2.out"
      });
      gsap.to(cursorRef.current, {
        scale: 1, backgroundColor: '#ffffff', duration: 0.3, ease: "power2.out"
      });
    }
  };

  // Visibility Handlers
  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);
  const handleVisibilityChange = () => setIsVisible(!document.hidden);

  // Start loop
  rafId.current = requestAnimationFrame(animateCursor);

  // Listeners
  window.addEventListener("mousemove", moveCursor);
  window.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("mouseenter", handleMouseEnter);
  document.addEventListener("mouseleave", handleMouseLeave);
  document.addEventListener("visibilitychange", handleVisibilityChange);
  document.addEventListener("mouseover", handleHoverEnter);
  document.addEventListener("mouseout", handleHoverLeave);

  return () => {
    window.removeEventListener("mousemove", moveCursor);
    window.removeEventListener("mousedown", handleMouseDown);
    window.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mouseenter", handleMouseEnter);
    document.removeEventListener("mouseleave", handleMouseLeave);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    document.removeEventListener("mouseover", handleHoverEnter);
    document.removeEventListener("mouseout", handleHoverLeave);
    if (rafId.current) cancelAnimationFrame(rafId.current);
  };
};