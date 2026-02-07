import { useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import { navbarEntrance } from "./navbarAnimations";

const Navbar = () => {
  const navRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Mentorship", path: "/mentorship" },
    { name: "Archive", path: "/archive" },
    { name: "Team", path: "/team" },
  ];

  useEffect(() => {
    navbarEntrance(navRef);
  }, []);

  return (
    <nav ref={navRef} className={styles.navbar}>
      {/* Logo */}
      <div className={`${styles.logo} logo`}>
        <div className={styles.logoIcon}>S</div>
        <span className={styles.logoText}>SAIC</span>
      </div>

      {/* Links */}
      <div className={styles.links}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.path}
            className={`${styles.navItem} nav-item`}
          >
            {link.name}
            <span className={styles.underline}></span>
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="nav-item">
        <button className={styles.cta}>Connect</button>
      </div>
    </nav>
  );
};

export default Navbar;
