import { useEffect, useRef, useState } from "react";
import { useLocation, NavLink, Link } from "react-router-dom";
import { gsap } from "gsap";
import styles from "./Navbar.module.css";
import { navbarEntrance, animateMobileMenu } from "./navbarAnimations";

const Navbar = () => {
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Mentorship", path: "/mentorship" },
    { name: "Archive", path: "/archive" },
    { name: "Team", path: "/team" },
  ];

  // Run entrance animation on every page change
  useEffect(() => {
    const cleanup = navbarEntrance(navRef);
    return cleanup;
  }, [location.pathname]);

  // Handle Mobile Toggle
  useEffect(() => {
    animateMobileMenu(menuRef, mobileLinksRef, isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const handleMouseEnter = (e) => {
    if (!e.target.classList.contains(styles.activeLink)) {
      gsap.to(e.target, { y: -3, color: "#3b82f6", duration: 0.3 });
    }
  };

  const handleMouseLeave = (e) => {
    if (!e.target.classList.contains(styles.activeLink)) {
      gsap.to(e.target, { y: 0, color: "inherit", duration: 0.3 });
    }
  };

  return (
    <>
      <nav ref={navRef} className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          <div className={`${styles.logoIcon} logo-anim-icon`}>S</div>
          <span className={`${styles.logoText} logo-anim-text`}>SAIC</span>
        </Link>
        
        <div className={styles.links}>
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.path} 
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.activeLink : ""} nav-item-anim`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {link.name}
            </NavLink>
          ))}
          <button className={`${styles.cta} nav-item-anim`}>Connect</button>
        </div>

        <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
          <div className={`${styles.bar} ${isOpen ? styles.bar1 : ""}`}></div>
          <div className={`${styles.bar} ${isOpen ? styles.bar2 : ""}`}></div>
          <div className={`${styles.bar} ${isOpen ? styles.bar3 : ""}`}></div>
        </button>
      </nav>

      <div ref={menuRef} className={styles.mobileMenu}>
        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>Back</button>
        {navLinks.map((link, index) => (
          <NavLink
            key={link.name}
            to={link.path}
            ref={(el) => (mobileLinksRef.current[index] = el)}
            className={({ isActive }) => `${styles.mobileLink} ${isActive ? styles.activeMobile : ""}`}
            onClick={() => setIsOpen(false)} 
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Navbar;