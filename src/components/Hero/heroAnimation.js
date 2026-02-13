import gsap from "gsap";

export const revealHero = (housing, content) => {
  const tl = gsap.timeline();
  
  // Compass entrance with dramatic 3D effect
  tl.fromTo(housing, 
    { 
      scale: 0.3, 
      opacity: 0, 
      rotateX: 90,
      rotateY: 45,
      z: -500
    },
    { 
      scale: 1, 
      opacity: 1, 
      rotateX: 0,
      rotateY: 0,
      z: 0,
      duration: 2.5, 
      ease: "power4.out",
      clearProps: "all" // Clear inline styles after animation
    }
  )
  // Add a subtle floating animation after entrance
  .to(housing, {
    y: -10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  }, "-=0.5")
  // Content fade in with stagger
  .fromTo(content,
    { y: 60, opacity: 0, scale: 0.9 },
    { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      duration: 0.8, 
      stagger: 0.12, 
      ease: "power3.out" 
    },
    "-=1.8"
  );
};

export const handleCompassMove = (e, housing, needle) => {
  if (!housing || !needle) return;

  const rect = housing.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Calculate vector from center to cursor
  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;
  
  // Calculate distance for magnetic effect
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const maxDistance = Math.max(window.innerWidth, window.innerHeight);
  const distanceRatio = Math.min(distance / maxDistance, 1);

  // Calculate angle with improved precision
  const angle = Math.atan2(deltaY, deltaX);
  const degree = angle * (180 / Math.PI) + 90;

  // Enhanced needle rotation with magnetic snap effect
  gsap.to(needle, {
    rotation: degree,
    transformOrigin: "50% 50%",
    duration: 1.8,
    ease: "elastic.out(1.2, 0.4)", // More pronounced elastic effect
    force3D: true
  });

  // Dynamic tilt based on cursor position with smooth damping
  const maxTilt = 15; // Maximum tilt angle
  const tiltX = ((e.clientY - centerY) / window.innerHeight) * maxTilt;
  const tiltY = ((centerX - e.clientX) / window.innerWidth) * maxTilt;

  // Apply 3D tilt to compass housing with physics-based easing
  gsap.to(housing, {
    rotateX: tiltX,
    rotateY: tiltY,
    duration: 1.2,
    ease: "power2.out",
    force3D: true,
    transformPerspective: 2000
  });

  // Subtle scale effect based on distance (compass "responds" to cursor proximity)
  const scaleAmount = 1 + (1 - distanceRatio) * 0.03; // Subtle 3% max scale
  gsap.to(housing, {
    scale: scaleAmount,
    duration: 1,
    ease: "power2.out"
  });
};

// Optional: Add this function to reset compass on mouse leave
export const resetCompass = (housing, needle) => {
  if (!housing || !needle) return;

  gsap.to(housing, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    duration: 1.5,
    ease: "power3.out"
  });

  // Needle gently returns to North
  gsap.to(needle, {
    rotation: 0,
    duration: 2,
    ease: "elastic.out(1, 0.5)"
  });
};

// Optional: Add ambient rotation when idle
export const addIdleAnimation = (housing) => {
  if (!housing) return;

  gsap.to(housing, {
    rotateZ: 2,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
};