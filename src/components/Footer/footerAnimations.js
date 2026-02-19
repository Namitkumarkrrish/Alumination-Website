import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initFooterAnimations = (footer, content) => {
  if (!footer || !content) return;

  // Staggered reveal of footer columns
  gsap.fromTo(
    content.children,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.3,
      ease: "power4.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 85%",
      },
    }
  );

  // Subtle pulsing glow for the Connect button
  gsap.to(`.${content.className} button div`, {
    opacity: 0.5,
    scale: 1.2,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
};