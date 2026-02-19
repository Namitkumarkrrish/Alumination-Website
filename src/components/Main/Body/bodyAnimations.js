import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initScrollAnimations = (container) => {
  if (!container) return;
  gsap.from(container.querySelectorAll("p, h2, img"), {
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
    },
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
  });
};

export const countUpNumbers = (element, endValue) => {
  if (!element) return;
  gsap.fromTo(element, 
    { innerText: 0 }, 
    { 
      innerText: endValue, 
      duration: 2.5, 
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
      },
      snap: { innerText: 1 },
      onUpdate: function() {
        element.innerHTML = Math.ceil(this.targets()[0].innerText);
      }
    }
  );
};

export const initLegacySlider = (element) => {
  if (!element) return;

  const content = element.innerHTML;
  element.innerHTML += content; 

  gsap.to(element, {
    xPercent: -50,
    repeat: -1,
    duration: 25,
    ease: "none",
  });
};