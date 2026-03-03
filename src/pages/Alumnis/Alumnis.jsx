import React, { useEffect, useRef } from 'react';
import styles from './Alumnis.module.css';
import { initAlumniAnimations } from './alumnisAnimation.js';

const alumniData = [
  {
    id: 1,
    name: "Dr. Aris Thorne",
    role: "Civil Service Lead",
    batch: "Class of 2012",
    detail: "Charting public infrastructure paths with 10+ years in urban development.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aris",
    linkedin: "https://linkedin.com/in/aris-thorne"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Systems Architect",
    batch: "Class of 2015",
    detail: "Leading the next generation of quantum computing networks at Global Tech.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    linkedin: "https://linkedin.com/in/sarah-jenkins"
  },
  {
    id: 3,
    name: "Marcus Vane",
    role: "Strategic Analyst",
    batch: "Class of 2018",
    detail: "Bridging the gap between legacy systems and future-ready AI protocols.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    linkedin: "https://linkedin.com/in/marcus-vane"
  },
  {
    id: 4,
    name: "Elena Rossi",
    role: "Urban Planner",
    batch: "Class of 2014",
    detail: "Redesigning metropolitan hubs with a focus on sustainable green energy.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    linkedin: "https://linkedin.com/in/elena-rossi"
  },
  {
    id: 5,
    name: "Julian Cho",
    role: "Blockchain Dev",
    batch: "Class of 2019",
    detail: "Securing decentralized finance through advanced cryptographic audits.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Julian",
    linkedin: "https://linkedin.com/in/julian-cho"
  },
  {
    id: 6,
    name: "Aria Smith",
    role: "Policy Advisor",
    batch: "Class of 2013",
    detail: "Consulting for global NGOs on digital ethics and data privacy laws.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aria",
    linkedin: "https://linkedin.com/in/aria-smith"
  },
  {
    id: 7,
    name: "Viktor Kael",
    role: "Aerospace Eng",
    batch: "Class of 2011",
    detail: "Developing propulsion systems for deep-space exploration missions.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Viktor",
    linkedin: "https://linkedin.com/in/viktor-kael"
  },
  {
    id: 8,
    name: "Nora Quinn",
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