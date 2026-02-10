import React, { useState, useRef, useEffect } from "react";
import styles from "./Events.module.css";
import { scrollReveal, detailAnimation, revealTitleLetters } from "./eventsAnimation";

const odysseyEvents = [
  { id: 1, title: "Linkedin bootcamp", date: "EPOCH I", desc: "Unlock the secrets of professional networking. Master your digital presence under the guidance of industry titans.", img: "/images/linkedin bootcamp.jpeg"},
  { id: 2, title: "Mock EN Joy", date: "EPOCH II", desc: "A trial by fire. Face the pressure of real-world interviews in a safe, constructive arena of growth." },
  { id: 3, title: "Ideathon", date: "EPOCH III", desc: "Forge new paths. A 24-hour journey to transform abstract thoughts into concrete solutions for the modern world." },
  { id: 4, title: "CaseXpert", date: "EPOCH IV", desc: "Analyze the complex myths of business. Solve intricate case studies and present your scrolls to the council." },
  { id: 5, title: "Master's Talk", date: "EPOCH V", desc: "Listen to the Oracles. Seasoned alumni return to share the wisdom gained from their own professional odysseys." },
  { id: 6, title: "CV Review", date: "EPOCH VI", desc: "Refine your sacred scrolls. Experts will dissect and polish your resume to ensure it shines like gold." },
];

const Events = () => {
  const [activeEvent, setActiveEvent] = useState(odysseyEvents[0]);
  const [isMobile, setIsMobile] = useState(false);
  const writeupRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  // 1. Initial Setup
  useEffect(() => {
    revealTitleLetters(titleRef.current);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. REFINED MOBILE SCROLL WATCHER
useEffect(() => {
  const grid = gridRef.current;
  if (!grid || !isMobile) return;

  const handleScroll = () => {
    const scrollLeft = grid.scrollLeft;
    const gridWidth = grid.offsetWidth;
    
    // Calculate the center point of the viewport
    const centerX = scrollLeft + gridWidth / 2;

    // Find which card is currently spanning the center point
    const cards = grid.querySelectorAll(`.${styles.card}`);
    let activeIdx = 0;

    cards.forEach((card, index) => {
      const cardLeft = card.offsetLeft;
      const cardRight = cardLeft + card.offsetWidth;

      // If the center of the grid is within this card's boundaries
      if (centerX >= cardLeft && centerX <= cardRight) {
        activeIdx = index;
      }
    });

    if (odysseyEvents[activeIdx] && odysseyEvents[activeIdx].id !== activeEvent.id) {
      setActiveEvent(odysseyEvents[activeIdx]);
      detailAnimation(".writeup-anim");
    }
  };

  // Add a small debounce or use requestAnimationFrame for performance if needed, 
  // but for 6 events, a standard listener is usually smooth.
  grid.addEventListener("scroll", handleScroll, { passive: true });
  return () => grid.removeEventListener("scroll", handleScroll);
}, [isMobile, activeEvent.id]);


  const handleCardClick = (event) => {
    setActiveEvent(event);
    if (!isMobile) {
      scrollReveal(writeupRef);
    }
    detailAnimation(".writeup-anim");
  };

  const scrollMobile = (direction) => {
    if (gridRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      gridRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.eventsPage}>
      <h1 ref={titleRef} className={styles.title}>Our Events</h1>

      <div className={styles.gridContainer}>
        {isMobile && (
          <button className={`${styles.navBtn} ${styles.prev}`} onClick={() => scrollMobile("left")}>&#8249;</button>
        )}
        
        <div ref={gridRef} className={styles.eventsGrid}>
          {odysseyEvents.map((ev) => (
            <div key={ev.id} className={styles.card} onClick={() => handleCardClick(ev)}>
              <div className={styles.imagePlaceholder}>
                {ev.img ? (
                  <img src={ev.img} alt={ev.title} className={styles.eventImage} />
                ) : (
                <span>[SACRED IMAGERY]</span>
                )}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{ev.title}</h3>
                <p className={styles.cardDate}>{ev.date}</p>
              </div>
            </div>
          ))}
        </div>

        {isMobile && (
          <button className={`${styles.navBtn} ${styles.next}`} onClick={() => scrollMobile("right")}>&#8250;</button>
        )}
      </div>

      <div ref={writeupRef} className={styles.detailsSection}>
        <div className={styles.detailWrapper}>
          <h2 className={`${styles.writeupTitle} writeup-anim`}>{activeEvent.title}</h2>
          <p className={`${styles.writeupText} writeup-anim`}>{activeEvent.desc}</p>
          <div className={`${styles.metaInfo} writeup-anim`}>
            <div className={styles.metaBox}><span>CHRONOS</span><p>{activeEvent.date}</p></div>
            <div className={styles.metaBox}><span>REALM</span><p>THE GRAND OLYMPUS</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;