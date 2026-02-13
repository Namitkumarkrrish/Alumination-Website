import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useTimelineAnimation = (containerRef, activeDay, styles) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Compass entrance
      gsap.fromTo(`.${styles.fixedCompass}`, 
        { opacity: 0, rotate: -45, scale: 0.8 },
        { opacity: 1, rotate: 0, scale: 1, duration: 1.5, ease: "expo.out" }
      );

      // Card scroll entrance
      gsap.utils.toArray(`.${styles.eventCard}`).forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          // Reduced x value to minimize horizontal overflow risks
          x: card.classList.contains(styles.left) ? -50 : 50, 
          duration: 0.8,
          ease: "power2.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeDay, styles]);
};