import React, { useEffect, useRef } from 'react';
import styles from './Team.module.css';
import { initTeamAnimations } from './teamAnimation';

const teamData = {
  seniorCoordinators: Array.from({ length: 12 }, (_, i) => ({
    id: `sr-${i}`,
    name: `Senior Lead ${i + 1}`,
    role: "Final Year Senior Coordinator",
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Sr${i}`
  })),
  preSeniorCoordinators: Array.from({ length: 15 }, (_, i) => ({
    id: `pre-${i}`,
    name: `Pre-Senior ${i + 1}`,
    role: "Pre-Final Year Senior Coordinator",
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Pre${i}`
  })),
  juniorCoordinators: Array.from({ length: 15 }, (_, i) => ({
    id: `jr-${i}`,
    name: `Junior Coord ${i + 1}`,
    role: "Junior Coordinator",
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Jr${i}`
  })),
  members: Array.from({ length: 20 }, (_, i) => ({
    id: `mem-${i}`,
    name: `Member ${i + 1}`,
    role: "Executive Member",
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Mem${i}`
  }))
};

const Team = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = initTeamAnimations(sectionRef.current);
    return () => ctx && ctx.revert();
  }, []);

  const TeamSection = ({ title, members }) => (
    <div className={styles.categoryBlock}>
      <h2 className={styles.categoryTitle}>{title}</h2>
      <div className={styles.grid}>
        {members.map((member) => (
          <div key={member.id} className={styles.memberCard}>
            <div className={styles.imageContainer}>
              <img src={member.image} alt={member.name} className={styles.avatar} loading="lazy" />
              <div className={styles.goldCorner}></div>
            </div>
            <div className={styles.memberInfo}>
              <h3 className={styles.memberName}>{member.name}</h3>
              <span className={styles.memberRole}>{member.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className={styles.teamPage} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.mainTitle}>THE <span className={styles.gold}>NAVIGATORS</span></h1>
          <div className={styles.titleUnderline}></div>
          <p className={styles.tagline}>The crew behind the Alumination Odyssey</p>
        </div>

        <TeamSection title="Final Year Senior Coordinators" members={teamData.seniorCoordinators} />
        <TeamSection title="Pre-Final Year Senior Coordinators" members={teamData.preSeniorCoordinators} />
        <TeamSection title="Junior Coordinators" members={teamData.juniorCoordinators} />
        <TeamSection title="Executive Members" members={teamData.members} />
      </div>
    </section>
  );
};

export default Team;