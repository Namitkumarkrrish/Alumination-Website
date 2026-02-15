import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export const revealTitleLetters = (element) => {
  if (!element) return;

  // 1. STOP RE-RUNS: If already split, don't do it again
  if (element.getAttribute("data-split") === "true") return;

  const text = element.textContent.trim();
  if (!text) return;

  // 2. PREPARE DOM
  element.innerHTML = "";
  // Force visibility now that we are ready to animate
  gsap.set(element, { autoAlpha: 1, opacity: 1 }); 

  // 3. CREATE SPANS
  const frag = document.createDocumentFragment();
  [...text].forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    span.style.opacity = "0";

    /* APPLY GRADIENT TO EACH LETTER */
    span.style.background = "linear-gradient(to bottom, #fde68a, #b45309)";
    span.style.webkitBackgroundClip = "text";
    span.style.backgroundClip = "text";
    span.style.webkitTextFillColor = "transparent";

    frag.appendChild(span);
  });
  
  element.appendChild(frag);
  element.setAttribute("data-split", "true");

  // 4. ANIMATE
  gsap.fromTo(
    element.querySelectorAll("span"),
    { 
      y: 40, 
      opacity: 0, 
      filter: "blur(10px) brightness(2)" 
    },
    {
      y: 0,
      opacity: 1,
      filter: "blur(0px) brightness(1)",
      stagger: 0.05,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.5, // Slight delay to ensure page is settled
      onComplete: () => {
        // Final safeguard to keep it visible
        gsap.set(element, { opacity: 1, visibility: "visible" });
      }
    }
  );
};

export const scrollReveal = (targetRef) => {
  if (!targetRef?.current) return;
  gsap.to(window, {
    duration: 1.2,
    scrollTo: { y: targetRef.current, offsetY: 80 },
    ease: "power4.inOut"
  });
};

export const detailAnimation = (selector) => {
  gsap.killTweensOf(selector);
  gsap.set(selector, { filter: "blur(12px)", opacity: 0, y: 30 });
  gsap.to(selector, {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.15,
    ease: "expo.out"
  });
};

/**
 * NEW: Modal Entrance Animation
 * Keeps the "Odyssey" feel by scaling up with a slight bounce
 */
export const modalFadeIn = (element) => {
  if (!element) return;
  
  gsap.fromTo(element, 
    { 
      opacity: 0, 
      scale: 0.85, 
      y: 20 
    }, 
    { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      duration: 0.5, 
      ease: "back.out(1.7)" 
    }
  );
};