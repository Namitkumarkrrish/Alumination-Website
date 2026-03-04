import React, { useState, useRef } from 'react';
import { useTimelineAnimation } from './useTimelineAnimation';
import styles from './Timeline.module.css';

const timelineData = [
  // DAY 01
  { day: 1, side: "left", time: "01:00 PM", title: "Opening Ceremony", loc: "DM SEN", desc: "The official launch of Alumination’25." },
  { day: 1, side: "right", time: "01:30 PM", title: "CivilQuest", loc: "DM SEN", desc: "Dive into the world of civil services." },
  { day: 1, side: "left", time: "02:30 PM", title: "CaseXpert", loc: "NAB 401", desc: "Solving real-world business cases." },
  { day: 1, side: "right", time: "03:00 PM", title: "Mock-En-Joy", loc: "G Meet", desc: "Mock Industry/IT interview by Alumni." },
  { day: 1, side: "left", time: "03:30 PM", title: "Linkedin BootCamp", loc: "NAB 401", desc: "Optimizing your professional presence." },
  { day: 1, side: "right", time: "04:00 PM", title: "Ideathon", loc: "DM SEN", desc: "Igniting innovation and problem-solving." },
  { day: 1, side: "left", time: "05:30 PM", title: "Masters’ Talk", loc: "DM SEN", desc: "Insights from industry veterans." },
  { day: 1, side: "right", time: "07:00 PM", title: "QnA session with Speaker", loc: "DM SEN", desc: "Direct interaction and knowledge exchange." },
  
  // DAY 02
  { day: 2, side: "left", time: "01:00 PM", title: "CaseXpert", loc: "DM SEN", desc: "Interview round conducted by Alumni." },
  { day: 2, side: "right", time: "03:00 PM", title: "Ideathon", loc: "Checkpoint 2", desc: "Mid-expedition progress evaluation." },
  { day: 2, side: "left", time: "03:30 PM", title: "Mock-En-Joy", loc: "G Meet", desc: "IT interview session with Alumni." },
  { day: 2, side: "right", time: "04:00 PM", title: "Masters’ Talk (TENTATIVE)", loc: "DM SEN", desc: "Insightful session with special guests." },
  { day: 2, side: "left", time: "05:30 PM", title: "QnA session with Speaker (TENTATIVE)", loc: "DM SEN", desc: "Open floor for archival inquiries." },
  { day: 2, side: "right", time: "06:00 PM", title: "Final Presentations & Results", loc: "DM SEN", desc: "Ideathon finals, jury deliberations, and prize distribution." },
  { day: 2, side: "left", time: "07:00 PM", title: "Closing of Alumination’25", loc: "DM SEN", desc: "Final remarks and conclusion of the odyssey." },
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