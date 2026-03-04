import React, { useEffect, useRef } from 'react';
import styles from './Alumnis.module.css';
import { initAlumniAnimations } from './alumnisAnimation.js';

const alumniData = [
  {
    id: 1,
    name: "Arjun Bhattacharya",
    role: "Associate Director - CAPGRID",
    batch: "Class of 2016",
    image: "./alumniImage/Arjun Bhattacharya.jpg",
    linkedin: "https://www.linkedin.com/in/arjun-bhattacharya?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    id: 2,
    name: "Dr. Pradip Acharya",
    role: "Senior Engineering Manager @Tekion",
    batch: "Class of 2005",
    image: "./alumniImage/Dr. Pradip Acharya.jpg",
    linkedin: "https://www.linkedin.com/in/pradip-acharya?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    id: 3,
    name: "Jeet Karmakar",
    role: "Founder & CTO, StepOut",
    batch: "Class of 2017",
    image: "./alumniImage/Jeet Karmakar.jpg",
    linkedin: "https://www.linkedin.com/in/jeet-karmakar?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    id: 4,
    name: "Nidhi Rungta",
    role: "Personal Finance Coach",
    batch: "Class of 2014",
    image: "./alumniImage/Nidhi Rungta.jpg",
    linkedin: "https://www.linkedin.com/in/nidhirungta?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  },
  {
    id: 5,
    name: "Sayak Ghosh",
    role: "CEO & Founder @ StepOut",
    batch: "Class of 2017",
    image: "./alumniImage/Sayak Ghosh.jpg",
    linkedin: "https://www.linkedin.com/in/sayakghosh14?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    id: 6,
    name: "Sourav Das",
    role: "Supply Chain Consultant - Deloitte",
    batch: "Class of 2019",
    image: "./alumniImage/Sourav Das.jpg",
    linkedin: "https://www.linkedin.com/in/sourav-das-075529165?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  },
  {
    id: 7,
    name: "Arobindo Pal",
    role: "",
    batch: "Class of 1979",
    image: "",
    linkedin: "https://linkedin.com/in/arobindo pal/"
  }
];

const Alumni = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = initAlumniAnimations(sectionRef.current, cardsRef.current);
    return () => ctx && ctx.revert();
  }, []);

  return (
    <section className={styles.alumniSection} ref={sectionRef}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>THE <span className={styles.gold}>GOLDEN</span> FLEET</h1>
          <p className={styles.subtitle}>Profiles of the voyagers who lead the way.</p>
        </header>

        <div className={styles.rosterGrid}>
          {alumniData.map((alumnus, index) => (
            <div 
              key={alumnus.id} 
              className={styles.alumniCard}
              ref={el => cardsRef.current[index] = el}
            >
              <div className={styles.imageWrapper}>
                <img src={alumnus.image} alt={alumnus.name} className={styles.portrait} />
                <div className={styles.frameDecoration}></div>
              </div>
              
              <div className={styles.info}>
                <span className={styles.batch}>{alumnus.batch}</span>
                <h3 className={styles.name}>{alumnus.name}</h3>
                <span className={styles.role}>{alumnus.role}</span>
                <a 
                  href={alumnus.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.profileBtn}
                >
                  LINKEDIN
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Alumni;