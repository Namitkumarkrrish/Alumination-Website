import { gsap } from "gsap";

export const navbarEntrance = (navRef) => {
  const ctx = gsap.context(() => {
    gsap.from(".nav-item", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power4.out",
    });

    gsap.from(".logo", {
      x: -20,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
    });
  }, navRef);

  return () => ctx.revert();
};
