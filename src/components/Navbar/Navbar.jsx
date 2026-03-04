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

  useEffect(() => {
    const cleanup = navbarEntrance(navRef);
    return cleanup;
  }, [location.pathname]);

  useEffect(() => {
    animateMobileMenu(menuRef, mobileLinksRef, isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const handleMouseEnter = (e) => {
    const isCta = e.target.classList.contains(styles.cta);
    
    if (isCta) {
      gsap.to(e.target, { 
        scale: 1.05, 
        backgroundColor: "rgba(180, 83, 9, 0.15)", 
        borderColor: "#fde68a",
        duration: 0.4 
      });
    } else if (!e.target.classList.contains(styles.activeLink)) {
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

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Wrapper function to handle multiple actions on mobile link click
  const handleMobileLinkClick = () => {
    setIsOpen(false);
    handleScrollToTop();
  };

  return (
    <>
      <nav ref={navRef} className={styles.navbar}>
        <Link to="https://www.alumninitdgp.in" target="/" className={styles.logo}>
          <img src="./logos/saiclogo3.png" alt="saic logo" className={styles.logoIcon}/>
        </Link>
        
        <div className={styles.links}>
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.path} 
              // Added scroll to top for desktop links as well
              onClick={handleScrollToTop}
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
            // FIXED: Using the wrapper function here
            onClick={handleMobileLinkClick} 
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Navbar;