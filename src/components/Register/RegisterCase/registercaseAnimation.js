import gsap from "gsap";

export const initRegisterAnimation = (container) => {
  if (!container) return;
  const tl = gsap.timeline();
  tl.fromTo(container, 
    { opacity: 0, y: 40 }, 
    { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }
  );
  tl.from("input, select, label", {
    opacity: 0,
    x: -15,
    stagger: 0.05,
    duration: 0.8
  }, "-=0.6");
};

export const successStampAnimation = () => {
  gsap.from(".checkCircle", {
    scale: 0,
    rotation: 90,
    duration: 0.8,
    ease: "back.out(2)"
  });
};