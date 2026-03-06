import React, { useState, useRef } from 'react';
import { useTimelineAnimation } from './useTimelineAnimation';
import styles from './Timeline.module.css';

const timelineData = [
  // DAY 01
  { day: 1, side: "left", time: "02:00 PM", title: "Welcome Ceremony", loc: "DM SEN", desc: "Lamp lighting ceremony, introduction to the fest by the anchor, followed by Masters' Talk by distinguished speakers." },

  { day: 1, side: "right", time: "04:00 PM", title: "Break", loc: "DM SEN", desc: "Short refreshment and networking break." },

  { day: 1, side: "left", time: "04:30 PM", title: "Ideathon Launch", loc: "DM SEN", desc: "Speech by Sayak and Jeet about their company and announcement of the Ideathon problem statement." },

  { day: 1, side: "right", time: "05:30 PM", title: "Break", loc: "DM SEN", desc: "Short break before the next session." },

  { day: 1, side: "left", time: "06:00 PM", title: "Mock-En-Joy (Part 1)", loc: "G Meet", desc: "First session of mock interviews conducted by alumni to simulate real industry interview experiences." },


  // DAY 02
  { day: 2, side: "right", time: "01:00 PM", title: "Ideathon Task Review", loc: "DM SEN", desc: "Participants present their progress and receive feedback on their Ideathon solutions." },

  { day: 2, side: "left", time: "02:30 PM", title: "Break", loc: "DM SEN", desc: "Short break for refreshments and networking." },

  { day: 2, side: "right", time: "03:00 PM", title: "LinkedIn Bootcamp Workshop", loc: "DM SEN", desc: "Workshop focused on optimizing LinkedIn profiles and building a strong professional presence." },

  { day: 2, side: "left", time: "04:00 PM", title: "Break", loc: "DM SEN", desc: "Short break before the next event." },

  { day: 2, side: "right", time: "04:30 PM", title: "CaseXpert", loc: "DM SEN", desc: "Participants solve real-world business cases and present strategic solutions." },

  { day: 2, side: "left", time: "06:00 PM", title: "Mock-En-Joy (Part 2)", loc: "G Meet", desc: "Second session of mock interviews with alumni providing feedback and guidance." },

  { day: 2, side: "right", time: "07:00 PM", title: "Closing Ceremony & Prize Distribution", loc: "DM SEN", desc: "Final ceremony of Alumination’25 with prize distribution and closing remarks." }
];
const Timeline = () => {
  const [activeDay, setActiveDay] = useState(1);
  const scrollRef = useRef(null);
  
  const currentEvents = timelineData.filter(e => e.day === activeDay);

  useTimelineAnimation(scrollRef, activeDay, styles);

  return (
    <div className={styles.timelinePage} ref={scrollRef}>
      {/* Background Compass Layer */}
      <div className={styles.fixedCompass}>
        <div className={styles.compassRingOuter}>
          <div className={styles.ticks} />
        </div>
        <div className={styles.compassRingInner} />
        <div className={styles.axisH} />
        <div className={styles.axisV} />
        <div className={styles.glowOrb}>
          <div className={styles.corePulse} />
        </div>
        <span className={styles.labelN}>N</span>
        <span className={styles.labelS}>S</span>
        <span className={styles.labelE}>E</span>
        <span className={styles.labelW}>W</span>
      </div>

      <div className={styles.contentOverlay}>
        <div className={styles.header}>
          <h1 className={styles.majesticTitle}>EXPEDITION TIMELINE</h1>
          <div className={styles.daySelector}>
            <button 
              onClick={() => setActiveDay(1)} 
              className={activeDay === 1 ? styles.activeDay : ""}
            >
              DAY 01
            </button>
            <button 
              onClick={() => setActiveDay(2)} 
              className={activeDay === 2 ? styles.activeDay : ""}
            >
              DAY 02
            </button>
          </div>
        </div>

        <div className={styles.scrollContainer}>
          {currentEvents.map((event, i) => (
            <div key={`${activeDay}-${i}`} className={`${styles.eventCard} ${styles[event.side]}`}>
              <div className={styles.connector} />
              <div className={styles.cardInner}>
                <div className={styles.timeWrap}>
                  <span className={styles.timeText}>{event.time}</span>
                  <div className={styles.glowDot} />
                </div>
                <h3>{event.title}</h3>
                <p className={styles.location}>{event.loc}</p>
                <p className={styles.description}>{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;