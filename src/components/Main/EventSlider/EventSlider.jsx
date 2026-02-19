import React, { useEffect, useRef } from 'react';
import styles from './EventSlider.module.css';
import { initInfiniteLogos } from './eventSliderAnimations';

const events = [
  { id: 1, title: "Grand Reunion", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200", coord: "LAT 40° N" },
  { id: 2, title: "Tech Symposium", image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=1200", coord: "LAT 22° S" },
  { id: 3, title: "Cultural Night", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200", coord: "LON 51° E" },
  { id: 4, title: "Mentorship Drive", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200", coord: "LON 35° W" },
  { id: 5, title: "Corporate Dinner", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200", coord: "LAT 12° N" },
];

const EventSlider = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (trackRef.current) {
        initInfiniteLogos(trackRef.current);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const eventList = [...events, ...events, ...events];

  return (
    <section className={styles.sliderSection}>
      <div className={styles.titleContainer}>
        <div className={styles.voyagerHeader}>
          <span className={styles.decorLine}></span>
          <span className={styles.eyebrow}>ARCHIVAL EXPEDITIONS</span>
          <span className={styles.decorLine}></span>
        </div>
        <h2 className={styles.title}>THE <span className={styles.gold}>ODYSSEY</span> GALLERY</h2>
      </div>

      <div className={styles.sliderWindow}>
        <div className={styles.track} ref={trackRef}>
          {eventList.map((event, index) => (
            <div key={`${event.id}-${index}`} className={styles.landscapeCard}>
              <div className={styles.antiqueFrame}>
                <div className={styles.innerBezel}>
                  <img src={event.image} alt={event.title} className={styles.image} />
                  <div className={styles.vignette}></div>
                  <div className={styles.coordStamp}>{event.coord}</div>
                </div>
              </div>
              <div className={styles.caption}>
                <span className={styles.entryCode}>LOG_{index + 100}</span>
                <h3 className={styles.eventName}>{event.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.footerGlow}></div>
    </section>
  );
};

export default EventSlider;