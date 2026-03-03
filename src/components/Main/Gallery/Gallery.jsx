import React, { useEffect, useRef } from 'react';
import styles from './Gallery.module.css';
import { initInfiniteLogos } from './galleryAnimations';

// Mapping the local images from your public/Alumination25Images directory
const archivalImages = [
  { id: 1, fileName: "IMG_1655.JPG" },
  { id: 2, fileName: "IMG_1731.JPG"},
  { id: 3, fileName: "IMG_1780.JPG"},
  { id: 4, fileName: "IMG_1849.JPG"},
  { id: 5, fileName: "IMG_1878.JPG"},
  { id: 6, fileName: "IMG_1892.JPG"},
  { id: 7, fileName: "IMG_2068.JPG"},
  { id: 8, fileName: "IMG_2138.JPG"},
  { id: 9, fileName: "IMG_2287.JPG"},
  { id: 10, fileName: "IMG_2378.JPG"},
];

const Gallery = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (trackRef.current) {
        initInfiniteLogos(trackRef.current);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Triplicating the list to ensure a seamless infinite scroll loop
  const eventList = [...archivalImages, ...archivalImages, ...archivalImages];

  return (
    <section className={styles.sliderSection}>
      <div className={styles.titleContainer}>
        <div className={styles.voyagerHeader}>
          <span className={styles.decorLine}></span>
          <span className={styles.eyebrow}>ARCHIVAL EXPEDITIONS</span>
          <span className={styles.decorLine}></span>
        </div>
        <h2 className={styles.title}>
          THE <span className={styles.gold}>ODYSSEY</span> GALLERY
        </h2>
      </div>

      <div className={styles.sliderWindow}>
        <div className={styles.track} ref={trackRef}>
          {eventList.map((event, index) => (
            <div key={`${event.id}-${index}`} className={styles.landscapeCard}>
              <div className={styles.antiqueFrame}>
                <div className={styles.innerBezel}>
                  {/* Efficiently referencing images from the public folder */}
                  <img 
                    src={`/Alumination25Images/${event.fileName}`} 
                    alt={event.title} 
                    className={styles.image} 
                    loading="lazy" 
                  />
                  <div className={styles.vignette}></div>
                </div>
              </div>
              <div className={styles.caption}>
                {/* Generates entry codes like LOG_100, LOG_101, etc. */}
                <span className={styles.entryCode}>LOG_{index + 100}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.footerGlow}></div>
    </section>
  );
};

export default Gallery;