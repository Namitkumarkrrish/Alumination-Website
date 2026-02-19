import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initWriteupAnimations = (section, box) => {
  if (!section || !box) return;

  let ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%", // Trigger slightly later for better mobile experience
        toggleActions: "play none none reverse"
      }
    });

    tl.from(box, {
      scale: 0.98,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from(box.querySelector('[class*="goldLine"]'), { 
      scaleX: 0, 
      duration: 0.8, 
      ease: "expo.inOut" 
    }, "-=0.4")
    .from(box.querySelectorAll('[class*="aluminationSide"] > *'), {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .from(box.querySelectorAll('[class*="eventItem"]'), {
      x: 15,
      opacity: 0,
      stagger: 0.08,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.6");
  }, section); 

  return ctx;
};