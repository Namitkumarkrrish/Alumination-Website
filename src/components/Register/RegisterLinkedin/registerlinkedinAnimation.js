import { gsap } from "gsap";

/**
 * Entry animation: Handles the initial container reveal.
 */
export const initRegisterAnimation = (container) => {
  if (!container) return;

  gsap.killTweensOf(container);
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  // 1. Reveal the main container
  tl.fromTo(container, 
    { opacity: 0, y: 20, scale: 0.99 },
    { opacity: 1, y: 0, scale: 1, duration: 1, clearProps: "all" }
  );

  // 2. Immediate reveal of children to ensure nothing stays hidden
  tl.fromTo(container.querySelectorAll("header, label, input, button"), 
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.8 },
    "-=0.6"
  );
};

/**
 * Success animation: Triggered when transmission is complete.
 */
export const successStampAnimation = (container) => {
  if (!container) return;
  
  const tl = gsap.timeline();
  const check = container.querySelector('[class*="checkCircle"]');
  const text = container.querySelectorAll("h3, p, button");

  if (check) {
    tl.fromTo(check, 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
    );
    
    tl.to(check, {
      boxShadow: "0 0 15px rgba(253, 230, 138, 0.5)",
      borderColor: "rgba(253, 230, 138, 0.8)",
      duration: 1,
      repeat: -1,
      yoyo: true
    });
  }

  if (text.length > 0) {
    tl.fromTo(text, 
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, 
      "-=0.3"
    );
  }
};

/**
 * Reset reveal: Essential for "Submit Another" button.
 * Ensures that when the form returns, all fields are visible.
 */
export const revealFormFields = (container) => {
  if (!container) return;
  // This forces all form elements to become visible immediately
  gsap.fromTo(container.querySelectorAll("label, input, button, header"), 
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: "power2.out" }
  );
};