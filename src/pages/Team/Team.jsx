import React from "react";
import styles from "./Team.module.css";

const teamData = {
  fourthYear: [
    { id: "4-1", name: "K Bala Ganesh", role: "4th Year", image: "/teamImage/4th-year/K Bala Ganesh.jpg" },
    { id: "4-2", name: "Rahul", role: "4th Year", image: "/teamImage/4th-year/Rahul.jpg" },
    { id: "4-3", name: "SANJIB MAITY", role: "4th Year", image: "/teamImage/4th-year/SANJIB MAITY.jpg" },
    { id: "4-4", name: "Swarnim Suryansh", role: "4th Year", image: "/teamImage/4th-year/Swarnim Suryansh.jpeg" },
  ],

  thirdYear: [
    { id: "3-1", name: "Galipelly Sriram", role: "3rd Year", image: "/teamImage/3rd-year/Galipelly_Sriram - Sriram Galipelly.jpg" },
    { id: "3-2", name: "Jaswika Mithram", role: "3rd Year", image: "/teamImage/3rd-year/Jaswika Mithram.jpg" },
    { id: "3-3", name: "Piyush Raj", role: "3rd Year", image: "/teamImage/3rd-year/Piyush Raj.jpeg" },
    { id: "3-4", name: "Prakash Ch das", role: "3rd Year", image: "/teamImage/3rd-year/Prakash Ch das.jpg" },
    { id: "3-5", name: "Riya Singh", role: "3rd Year", image: "/teamImage/3rd-year/Riya Singh.jpg" },
    { id: "3-6", name: "Sourasish Das", role: "3rd Year", image: "/teamImage/3rd-year/Sourasish Das.png" },
  ],

  secondYear: [
    { id: "2-1", name: "Afreen", role: "2nd Year", image: "/teamImage/2nd-year/IMG_2250 - Afreen.JPG" },
    { id: "2-2", name: "Karthik", role: "2nd Year", image: "/teamImage/2nd-year/Karthik.jpg" },
    { id: "2-3", name: "Lokesh Kusumanchi", role: "2nd Year", image: "/teamImage/2nd-year/Lokesh Kusumanchi.jpg" },
    { id: "2-4", name: "NAAZ HUSSAIN", role: "2nd Year", image: "/teamImage/2nd-year/NAAZ HUSSAIN.jpg" },
    { id: "2-5", name: "Namit kumar Krrish", role: "2nd Year", image: "/teamImage/2nd-year/Namit kumar Krrish.jpg" },
    { id: "2-6", name: "Neelanjan Bhandary", role: "2nd Year", image: "/teamImage/2nd-year/Neelanjan Bhandary.jpg" },
    { id: "2-7", name: "Raghav Maheshwari", role: "2nd Year", image: "/teamImage/2nd-year/Raghav Maheshwari.jpg" },
    { id: "2-8", name: "Sambhav Gupta", role: "2nd Year", image: "/teamImage/2nd-year/Sambhav Gupta.jpg" },
    { id: "2-9", name: "Sayandeep Halder", role: "2nd Year", image: "/teamImage/2nd-year/Sayandeep Halder.JPG" },
    { id: "2-10", name: "Shagun Singh", role: "2nd Year", image: "/teamImage/2nd-year/Shagun Singh.jpg" },
    { id: "2-11", name: "Soumy Das", role: "2nd Year", image: "/teamImage/2nd-year/Soumy Das.jpg" },
    { id: "2-12", name: "Sudip kumar Pal", role: "2nd Year", image: "/teamImage/2nd-year/Sudip kumar Pal.jpg" },
    { id: "2-13", name: "Vivek Munda", role: "2nd Year", image: "/teamImage/2nd-year/Vivek Munda.jpg" },
  ],

  firstYear: [
    { id: "1-1", name: "Ayusi Singh Sardar", role: "1st Year", image: "/teamImage/1st-year/Ayusi Singh Sardar - Ayusi.jpg" },
    { id: "1-2", name: "Kartikey", role: "1st Year", image: "/teamImage/1st-year/Kartikey.jpeg" },
    { id: "1-3", name: "Madhu Bysani", role: "1st Year", image: "/teamImage/1st-year/Madhu Bysani.jpg" },
    { id: "1-4", name: "MANDRITA DAS", role: "1st Year", image: "/teamImage/1st-year/MANDRITA DAS.jpg" },
    { id: "1-5", name: "niranjan pegu", role: "1st Year", image: "/teamImage/1st-year/niranjan pegu.jpg" },
    { id: "1-6", name: "Prachi Verma", role: "1st Year", image: "/teamImage/1st-year/Prachi Verma.jpg" },
    { id: "1-7", name: "Pragya Nandi", role: "1st Year", image: "/teamImage/1st-year/Pragya Nandi.jpg" },
    { id: "1-8", name: "Sanjanasuman Shaw", role: "1st Year", image: "/teamImage/1st-year/Sanjanasuman Shaw.jpg" },
    { id: "1-9", name: "Sasyanth Alapati", role: "1st Year", image: "/teamImage/1st-year/Sasyanth Alapati.png" },
    { id: "1-10", name: "shruti", role: "1st Year", image: "/teamImage/1st-year/shruti.jpg" },
    { id: "1-11", name: "Snehith G", role: "1st Year", image: "/teamImage/1st-year/Snehith G.jpg" },
    { id: "1-12", name: "Subhrodip Patra", role: "1st Year", image: "/teamImage/1st-year/Subhrodip Patra.png" },
    { id: "1-13", name: "Swaroop Raj", role: "1st Year", image: "/teamImage/1st-year/Swaroop Raj.JPG" },
    { id: "1-14", name: "Tanveer Mallick", role: "1st Year", image: "/teamImage/1st-year/Tanveer Mallick.jpg" },
    { id: "1-15", name: "Taras Mandi", role: "1st Year", image: "/teamImage/1st-year/Taras Mandi.jpg" },
    { id: "1-16", name: "yash jareda", role: "1st Year", image: "/teamImage/1st-year/yash jareda.jpeg" },
    { id: "1-17", name: "Yashashree Sen", role: "1st Year", image: "/teamImage/1st-year/Yashashree Sen.jpg" },
  ],
};

const TeamSection = ({ title, members }) => (
  <div className={styles.categoryBlock}>
    <h2 className={styles.categoryTitle}>{title}</h2>
    <div className={styles.grid}>
      {members.map((member) => (
        <div key={member.id} className={styles.memberCard}>
          <div className={styles.imageContainer}>
            <img
              src={member.image}
              alt={member.name}
              className={styles.avatar}
              loading="lazy"
            />
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

const Team = () => {
  return (
    <section className={styles.teamPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.mainTitle}>
            THE <span className={styles.gold}>NAVIGATORS</span>
          </h1>
          <div className={styles.titleUnderline}></div>
          <p className={styles.tagline}>
            The crew behind the Alumination Odyssey
          </p>
        </div>

        <TeamSection title="4th Year" members={teamData.fourthYear} />
        <TeamSection title="3rd Year" members={teamData.thirdYear} />
        <TeamSection title="2nd Year" members={teamData.secondYear} />
        <TeamSection title="1st Year" members={teamData.firstYear} />
      </div>
    </section>
  );
};

export default Team;