import React, { useState, useRef } from 'react';
import { useTimelineAnimation } from './useTimelineAnimation';
import styles from './Timeline.module.css';

const timelineData = [
  // DAY 01 - 6 Events
  { day: 1, side: "left", time: "09:00 AM", title: "The Awakening", loc: "Main Sanctuary", desc: "Opening ceremony." },
  { day: 1, side: "right", time: "11:30 AM", title: "Star Charting", loc: "Lab 04", desc: "Mapping the digital void." },
  { day: 1, side: "left", time: "01:00 PM", title: "Star Navigation", loc: "Observatory", desc: "Tech deep dive." },
  { day: 1, side: "right", time: "04:00 PM", title: "Solar Wind", loc: "Atrium", desc: "Energy systems briefing." },
  { day: 1, side: "left", time: "07:00 PM", title: "Celestial Gala", loc: "Grand Ballroom", desc: "Networking." },
  { day: 1, side: "right", time: "09:00 PM", title: "Midnight Hub", loc: "Plaza Stage", desc: "Late night discussion." },
  
  // DAY 02 - 5 Events
  { day: 2, side: "left", time: "10:00 AM", title: "Nebula Workshop", loc: "Lab 01", desc: "Hands-on building." },
  { day: 2, side: "right", time: "01:00 PM", title: "Gravity Shift", loc: "Auditorium", desc: "Physics of the Odyssey." },
  { day: 2, side: "left", time: "03:00 PM", title: "The Void Panel", loc: "Main Stage", desc: "AI Ethics in Space." },
  { day: 2, side: "right", time: "05:30 PM", title: "Pulsar Beats", loc: "Roof Garden", desc: "Electronic music set." },
  { day: 2, side: "left", time: "08:00 PM", title: "Final Orbit", loc: "Main Stage", desc: "Closing remarks." },
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