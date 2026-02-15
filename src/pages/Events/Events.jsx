import React, { useState, useRef, useEffect } from "react";
import styles from "./Events.module.css";
import { scrollReveal, detailAnimation, revealTitleLetters, modalFadeIn } from "./eventsAnimation";

const odysseyEvents = [
  { id: 1, title: "Linkedin bootcamp", date: "EPOCH I", desc: "Unlock the secrets of professional networking. Master your digital presence under the guidance of industry titans.", img: "/images/linkedin bootcamp.jpeg", longDesc: "Detailed breakdown of LinkedIn networking, profile SEO, and recruiter outreach.", link: "#" },
  { id: 2, title: "Mock EN Joy", date: "EPOCH II", desc: "A trial by fire. Face the pressure of real-world interviews in a safe, constructive arena of growth.", longDesc: "Live simulated interviews with feedback from industry veterans.", link: "#" },
  { id: 3, title: "Ideathon", date: "EPOCH III", desc: "Forge new paths. A 24-hour journey to transform abstract thoughts into concrete solutions for the modern world.", longDesc: "A marathon of innovation focusing on rapid prototyping and business modeling.", link: "#" },
  { id: 4, title: "CaseXpert", date: "EPOCH IV", desc: "Analyze the complex myths of business. Solve intricate case studies and present your scrolls to the council.", longDesc: "Advanced case study competition evaluating strategy and financial logic.", link: "#" },
  { id: 5, title: "Master's Talk", date: "EPOCH V", desc: "Listen to the Oracles. Seasoned alumni return to share the wisdom gained from their own professional odysseys.", longDesc: "An interactive Q&A session with alumni placed in Fortune 500 companies.", link: "#" },
  { id: 6, title: "CV Review", date: "EPOCH VI", desc: "Refine your sacred scrolls. Experts will dissect and polish your resume to ensure it shines like gold.", longDesc: "One-on-one resume auditing and ATS optimization workshop.", link: "#" },
];

const Events = () => {
  const [activeEvent, setActiveEvent] = useState(odysseyEvents[0]);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false); // Added for Modal
  
  const writeupRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const modalRef = useRef(null); // Added for GSAP

  useEffect(() => {
    revealTitleLetters(titleRef.current);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !isMobile) return;

    const handleScroll = () => {
      const scrollLeft = grid.scrollLeft;
      const gridWidth = grid.offsetWidth;
      const centerX = scrollLeft + gridWidth / 2;
      const cards = grid.querySelectorAll(`.${styles.card}`);
      let activeIdx = 0;

      cards.forEach((card, index) => {
        const cardLeft = card.offsetLeft;
        const cardRight = cardLeft + card.offsetWidth;
        if (centerX >= cardLeft && centerX <= cardRight) {
          activeIdx = index;
        }
      });

      if (odysseyEvents[activeIdx] && odysseyEvents[activeIdx].id !== activeEvent.id) {
        setActiveEvent(odysseyEvents[activeIdx]);
        detailAnimation(".writeup-anim");
      }
    };

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

  const handleMoreDetails = () => {
    setShowModal(true);
    setTimeout(() => modalFadeIn(modalRef.current), 10);
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
          
          {/* THE NEW BUTTONS */}
          <div className={`${styles.buttonContainer} writeup-anim`}>
            <a href={activeEvent.link} className={styles.registerBtn}>REGISTER NOW</a>
            <button onClick={handleMoreDetails} className={styles.detailsBtn}>MORE DETAILS</button>
          </div>

          <div className={`${styles.metaInfo} writeup-anim`}>
            <div className={styles.metaBox}><span>CHRONOS</span><p>{activeEvent.date}</p></div>
            <div className={styles.metaBox}><span>REALM</span><p>THE GRAND OLYMPUS</p></div>
          </div>
        </div>
      </div>

      {/* POPUP MODAL */}
{showModal && (
  <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
    <div ref={modalRef} className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
      <button className={styles.closeBtn} onClick={() => setShowModal(false)}>&times;</button>
      
      <h2 className={styles.modalTitle}>{activeEvent.title}</h2>
      <p className={styles.modalContent}>{activeEvent.longDesc}</p>
      
      {/* UPDATED MODAL BUTTONS */}
      <div className={styles.modalActions}>
        <a href={activeEvent.link} className={styles.modalReg}>REGISTER NOW</a>
        {/* <button className={styles.modalBack} onClick={() => setShowModal(false)}>BACK</button> */}
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Events;