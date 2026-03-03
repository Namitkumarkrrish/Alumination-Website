import gsap from "gsap";

export const initInfiniteLogos = (track) => {
  if (!track) return;

  gsap.killTweensOf(track);
  gsap.set(track, { x: 0 });

  const loop = gsap.to(track, {
    xPercent: -33.333, 
    ease: "none",
    duration: 22, 
    repeat: -1,
  });

  const handleMouseEnter = () => {
    gsap.to(loop, { timeScale: 0.3, duration: 1, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(loop, { timeScale: 1, duration: 1, ease: "power2.inOut" });
  };

  track.addEventListener("mouseenter", handleMouseEnter);
  track.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    loop.kill();
    track.removeEventListener("mouseenter", handleMouseEnter);
    track.removeEventListener("mouseleave", handleMouseLeave);
  };
};