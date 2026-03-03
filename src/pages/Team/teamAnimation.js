import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initTeamAnimations = (section) => {
  if (!section) return;

  let ctx = gsap.context(() => {
    // Reveal the main header
    gsap.from("[class*='header'] > *", {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out"
    });

    // Animate section titles
    gsap.utils.toArray("[class*='categoryTitle']").forEach(title => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: "top 90%",
        },
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: "power2.out"
      });
    });

    // Efficiently batch animate the cards
    ScrollTrigger.batch("[class*='memberCard']", {
      onEnter: batch => gsap.to(batch, {
        opacity: 1, 
        y: 0, 
        stagger: 0.05, 
        duration: 0.6, 
        ease: "power2.out"
      }),
      start: "top 95%"
    });
    
    // Set initial state for cards to prevent flash
    gsap.set("[class*='memberCard']", { opacity: 0, y: 30 });

  }, section);

  return ctx;
};