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
    { name: "Timeline", path: "/timeline" },
    { name: "Alumnis", path: "/alumnis" },
    { name: "Team", path: "/team" },
    
  ];

  // 1. Entrance Animation: Triggers on mount and route change
  useEffect(() => {
    const cleanup = navbarEntrance(navRef);
    return cleanup;
  }, [location.pathname]);

  // 2. Mobile Menu Logic: Handles GSAP timeline and Body Scroll Lock
  useEffect(() => {
    animateMobileMenu(menuRef, mobileLinksRef, isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  // 3. Hover Animations for The Golden Odyssey Theme
  const handleMouseEnter = (e) => {
    const isCta = e.target.classList.contains(styles.cta);
    
    if (isCta) {
      // Golden pulse for the CTA
      gsap.to(e.target, { 
        scale: 1.05, 
        backgroundColor: "rgba(180, 83, 9, 0.15)", 
        borderColor: "#fde68a",
        duration: 0.4 
      });
    } else if (!e.target.classList.contains(styles.activeLink)) {
      // Celestial rise for Nav Items
      gsap.to(e.target, { 
        y: -3, 
        color: "#fde68a", 
        textShadow: "0px 0px 8px rgba(253, 230, 138, 0.5)",
        duration: 0.3 
      });
    }
  };

  const handleMouseLeave = (e) => {
    const isCta = e.target.classList.contains(styles.cta);

    if (isCta) {
      gsap.to(e.target, { 
        scale: 1, 
        backgroundColor: "transparent", 
        borderColor: "rgba(180, 83, 9, 0.6)",
        duration: 0.4 
      });
    } else if (!e.target.classList.contains(styles.activeLink)) {
      gsap.to(e.target, { 
        y: 0, 
        color: "#9ca3af", 
        textShadow: "none",
        duration: 0.3 
      });
    }
  };

  return (
    <>
      <nav ref={navRef} className={styles.navbar}>
        {/* Logo Section */}
        <Link to="https://www.alumninitdgp.in" target="/" className={styles.logo}>
          <div className={`${styles.logoIcon} logo-anim-icon`}>S</div>
          <span className={`${styles.logoText} logo-anim-text`}>SAIC</span>
        </Link>
        
        {/* Desktop View */}
        <div className={styles.links}>
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.path} 
              className={({ isActive }) => 
                `${styles.navItem} ${isActive ? styles.activeLink : ""} nav-item-anim`
              }
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Hamburger Button */}
        <button 
          className={styles.menuButton} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <div className={`${styles.bar} ${isOpen ? styles.bar1 : ""}`}></div>
          <div className={`${styles.bar} ${isOpen ? styles.bar2 : ""}`}></div>
          <div className={`${styles.bar} ${isOpen ? styles.bar3 : ""}`}></div>
        </button>
      </nav>

      {/* Mobile Overlay Menu */}
      <div ref={menuRef} className={styles.mobileMenu}>
        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
          &larr; RETURN
        </button>

        {navLinks.map((link, index) => (
          <NavLink
            key={link.name}
            to={link.path}
            ref={(el) => (mobileLinksRef.current[index] = el)}
            className={({ isActive }) => 
              `${styles.mobileLink} ${isActive ? styles.activeMobile : ""}`
            }
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