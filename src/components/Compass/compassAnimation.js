import gsap from "gsap";

let floatTween = null;

export const handleCompassMove = (e, housing, needle) => {
  if (!housing || !needle) return;

  const rect = housing.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;

  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const maxDistance = Math.max(window.innerWidth, window.innerHeight);
  const distanceRatio = Math.min(distance / maxDistance, 1);

  const angle = Math.atan2(deltaY, deltaX);
  const degree = angle * (180 / Math.PI) + 90;

  gsap.to(needle, {
    rotation: degree,
    transformOrigin: "50% 50%",
    duration: 1.8,
    ease: "elastic.out(1.2, 0.4)",
    force3D: true,
  });

  const maxTilt = 15;
  const tiltX = ((e.clientY - centerY) / window.innerHeight) * maxTilt;
  const tiltY = ((centerX - e.clientX) / window.innerWidth) * maxTilt;

  gsap.to(housing, {
    rotateX: tiltX,
    rotateY: tiltY,
    duration: 1.2,
    ease: "power2.out",
    force3D: true,
    transformPerspective: 2000,
  });

  const scaleAmount = 1 + (1 - distanceRatio) * 0.03;
  gsap.to(housing, {
    scale: scaleAmount,
    duration: 1,
    ease: "power2.out",
  });
};

export const resetCompass = (housing, needle) => {
  if (!housing || !needle) return;

  gsap.to(housing, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    duration: 1.5,
    ease: "power3.out",
    force3D: true,
    transformPerspective: 2000,
  });

  gsap.to(needle, {
    rotation: 0,
    duration: 2,
    ease: "elastic.out(1, 0.5)",
  });
};

/**
 * Hard-snaps all 3D transforms back to neutral.
 * Call this on scroll so the compass never appears flat when returning.
 */
export const snapResetCompass = (housing, needle) => {
  if (!housing) return;

  gsap.set(housing, {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    force3D: true,
    transformPerspective: 2000,
  });

  if (needle) {
    gsap.set(needle, { rotation: 0 });
  }
};

/**
 * Starts the gentle floating bob after the reveal animation completes.
 * Uses overwrite: true so it safely replaces any lingering tilt tweens.
 */
export const startIdleFloat = (housing) => {
  if (!housing) return;

  if (floatTween) {
    floatTween.kill();
    floatTween = null;
  }

  // First snap rotateX/Y to 0 so the float always starts from a neutral position
  gsap.set(housing, { rotateX: 0, rotateY: 0, force3D: true, transformPerspective: 2000 });

  floatTween = gsap.to(housing, {
    y: -10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    force3D: true,
    overwrite: "auto",
  });
};

// Alias kept for backward compatibility
export const addIdleAnimation = (housing) => {
  startIdleFloat(housing);
};