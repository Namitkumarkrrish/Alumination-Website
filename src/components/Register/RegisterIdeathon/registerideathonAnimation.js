import { gsap } from "gsap";

export const initRegisterAnimation = (container) => {
  if (!container) return;
  gsap.fromTo(container, 
    { opacity: 0, y: 30 }, 
    { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
  );
};

export const successStampAnimation = (container) => {
  if (!container) return;
  const title = container.querySelector("h3");
  if (title) {
    gsap.fromTo(title, 
      { scale: 0.5, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out" }
    );
  }
};