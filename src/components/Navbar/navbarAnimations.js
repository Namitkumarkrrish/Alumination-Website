import { gsap } from "gsap";

export const navbarEntrance = (navRef) => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline();

    tl.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" }
    )
    .fromTo([".logo-anim-icon", ".logo-anim-text"], 
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "expo.out" },
      "-=0.4"
    )
    .fromTo(".nav-item-anim", 
      { y: -20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
      "-=0.4"
    );
  }, navRef);

  return () => ctx.revert();
};

export const animateMobileMenu = (menuRef, linksRef, isOpen) => {
  const tl = gsap.timeline();

  if (isOpen) {
    tl.to(menuRef.current, {
      right: 0,
      duration: 0.7,
      ease: "power4.inOut",
    })
    .fromTo(linksRef.current, 
      { opacity: 0, y: 30, rotateX: -30 }, 
      { opacity: 1, y: 0, rotateX: 0, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.3"
    );
  } else {
    tl.to(menuRef.current, {
      right: "-100%",
      duration: 0.5,
      ease: "power4.inOut",
    });
    // Reset states so they don't 'flicker' next time
    gsap.set(linksRef.current, { opacity: 0, y: 30 });
  }
};