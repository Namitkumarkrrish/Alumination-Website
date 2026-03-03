import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initAlumniAnimations = (section, cards) => {
  if (!section) return;

  let ctx = gsap.context(() => {
    // Header Reveal
    gsap.from("[class*='header'] > *", {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      }
    });

    // Cards Stagger
    gsap.from(cards, {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
      }
    });
  }, section);

  return ctx;
};