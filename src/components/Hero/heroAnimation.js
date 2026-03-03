import gsap from "gsap";
import { startIdleFloat } from "../Compass/compassAnimation";

export const revealHero = (housing, content) => {
  const tl = gsap.timeline();

  tl.fromTo(
    housing,
    {
      scale: 0.3,
      opacity: 0,
      rotateX: 90,
      rotateY: 45,
      z: -500,
    },
    {
      scale: 1,
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      z: 0,
      duration: 2.5,
      ease: "power4.out",
      // Do NOT use clearProps:"all" — it removes transformPerspective and causes
      // the compass to lose its 3D context, making it look flat after animating in.
      force3D: true,
      transformPerspective: 2000,
      onComplete: () => {
        // Start the idle float only after the entrance animation is fully done,
        // so the float tween always begins from a clean, upright state.
        startIdleFloat(housing);
      },
    }
  )
  .fromTo(
    content,
    { y: 60, opacity: 0, scale: 0.9 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
    },
    "-=1.8"
  );
};