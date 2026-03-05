import gsap from "gsap";

export const initRegisterAnimation = (container) => {
  if (!container) return;

  const tl = gsap.timeline();

  tl.fromTo(container, 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
  );

  tl.from("input, label, .submitBtn", {
    opacity: 0,
    y: 10,
    stagger: 0.1,
    duration: 0.6,
    ease: "power2.out"
  }, "-=0.5");
};

export const successStampAnimation = () => {
  gsap.from(".checkCircle", {
    scale: 0,
    rotation: -180,
    duration: 0.7,
    ease: "back.out(1.7)"
  });
};