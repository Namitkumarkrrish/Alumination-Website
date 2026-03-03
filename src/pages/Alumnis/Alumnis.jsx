import React, { useEffect, useRef } from 'react';
import styles from './Alumnis.module.css';
import { initAlumniAnimations } from './alumnisAnimation.js';

const alumniData = [
  {
    id: 1,
    name: "Arjun Bhattacharya",
    role: "Associate Director - CAPGRID",
    batch: "Class of 2012",
    detail: "Charting public infrastructure paths with 10+ years in urban development.",
    image: "./alumniImage/Arjun Bhattacharya.jpg",
    linkedin: "https://linkedin.com/in/aris-thorne"
  },
  {
    id: 2,
    name: "Dr. Pradip Acharya",
    role: "Senior Engineering Manager @Tekion",
    batch: "Class of 2015",
    detail: "Leading the next generation of quantum computing networks at Global Tech.",
    image: "./alumniImage/Dr. Pradip Acharya.jpg",
    linkedin: "https://linkedin.com/in/sarah-jenkins"
  },
  {
    id: 3,
    name: "Jeet Karmakar",
    role: "Founder & CTO, StepOut",
    batch: "Class of 2018",
    detail: "Bridging the gap between legacy systems and future-ready AI protocols.",
    image: "./alumniImage/Jeet Karmakar.jpg",
    linkedin: "https://linkedin.com/in/marcus-vane"
  },
  {
    id: 4,
    name: "Nidhi Rungta",
    role: "Personal Finance Coach",
    batch: "Class of 2014",
    detail: "Redesigning metropolitan hubs with a focus on sustainable green energy.",
    image: "./alumniImage/Nidhi Rungta.jpg",
    linkedin: "https://linkedin.com/in/elena-rossi"
  },
  {
    id: 5,
    name: "Sayak Ghosh",
    role: "CEO & Founder @ StepOut",
    batch: "Class of 2013",
    detail: "Consulting for global NGOs on digital ethics and data privacy laws.",
    image: "./alumniImage/Sayak Ghosh.jpg",
    linkedin: "https://linkedin.com/in/aria-smith"
  },
  {
    id: 6,
    name: "Sourav Das",
    role: "Supply Chain Consultant - Deloitte",
    batch: "Class of 2011",
    detail: "Developing propulsion systems for deep-space exploration missions.",
    image: "./alumniImage/Sourav Das.jpg",
    linkedin: "https://linkedin.com/in/viktor-kael"
  },
  {
    id: 7,
    name: "Arobindo Pal",
    role: "UX Researcher",
    batch: "Class of 2020",
    detail: "Specializing in human-computer interaction for neural link interfaces.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nora",
    linkedin: "https://linkedin.com/in/nora-quinn"
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
                <p className={styles.detail}>{alumnus.detail}</p>
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