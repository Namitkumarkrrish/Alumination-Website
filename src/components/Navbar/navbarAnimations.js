import { gsap } from "gsap";

export const navbarEntrance = (navRef) => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline();

    // 1. Celestial Entrance: Nav slides down through a divine fog
    tl.fromTo(navRef.current, 
      { y: -30, opacity: 0, filter: "blur(15px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "power4.out" }
    )
    // 2. Logo Crystallization: Icon and Text scale up with an "expo" feel
    .fromTo([".logo-anim-icon", ".logo-anim-text"], 
      { scale: 0.7, opacity: 0, filter: "brightness(2)" }, // Starts bright/white
      { scale: 1, opacity: 1, filter: "brightness(1)", duration: 1.2, stagger: 0.2, ease: "expo.out" },
      "-=1.4"
    )
    // 3. Sequential Link Reveal: Items rise gently into their golden positions
    .fromTo(".nav-item-anim", 
      { y: 15, opacity: 0, letterSpacing: "5px" }, 
      { y: 0, opacity: 1, letterSpacing: "2.5px", duration: 1, stagger: 0.1, ease: "power3.out" },
      "-=1"
    );
  }, navRef);

  return () => ctx.revert();
};

export const animateMobileMenu = (menuRef, linksRef, isOpen) => {
  const tl = gsap.timeline();

  if (isOpen) {
    // Open: The Realm Slides in majestically
    tl.to(menuRef.current, {
      right: 0,
      duration: 1.2,
      ease: "expo.inOut",
    })
    // Links Materialize: Using X-axis slide and Blur for a "ghostly" Odyssey feel
    .fromTo(linksRef.current, 
      { 
        opacity: 0, 
        x: 40, 
        filter: "blur(10px)", 
        skewX: -10 
      }, 
      { 
        opacity: 1, 
        x: 0, 
        filter: "blur(0px)", 
        skewX: 0,
        stagger: 0.12, 
        duration: 0.8, 
        ease: "power4.out" 
      },
      "-=0.6"
    );
  } else {
    // Close: Faster slide-out to feel responsive
    tl.to(menuRef.current, {
      right: "-100%",
      duration: 0.8,
      ease: "expo.inOut",
    });

    // Reset Link states immediately after close to prevent layout flickers
    gsap.set(linksRef.current, { 
      opacity: 0, 
      x: 40, 
      filter: "blur(10px)" 
    });
  }
};