import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initFooterAnimations = (footer, content) => {
  if (!footer || !content) return;

  // Clear any existing triggers on this specific element before starting
  ScrollTrigger.getAll().forEach(t => {
    if (t.trigger === footer) t.kill();
  });

  let ctx = gsap.context(() => {
    // Staggered reveal of footer columns
    gsap.fromTo(
      content.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 92%", // Trigger when footer is 8% from bottom
          toggleActions: "play none none none",
          // Force GSAP to recalculate page height when this starts
          onRefresh: (self) => {
            if (self.progress > 0) gsap.set(content.children, { opacity: 1, y: 0 });
          }
        },
      }
    );

    // Subtle pulsing glow for the Connect button
    gsap.to(".btnGlow", {
      opacity: 0.5,
      scale: 1.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, footer);

  // Global refresh to account for dynamic content loading in Event/Home pages
  ScrollTrigger.refresh();

  return ctx;
};