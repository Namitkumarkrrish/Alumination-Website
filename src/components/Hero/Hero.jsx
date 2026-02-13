import React, { useEffect, useRef } from "react";
import styles from "./Hero.module.css";
import { revealHero, handleCompassMove, resetCompass } from '../../components/Hero/heroAnimation';

const Hero = () => {
  const housingRef = useRef(null);
  const needleRef = useRef(null);
  const contentRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    revealHero(housingRef.current, contentRef.current.children);

    const onMove = (e) => handleCompassMove(e, housingRef.current, needleRef.current);
    const onLeave = () => resetCompass(housingRef.current, needleRef.current);
    
    window.addEventListener("mousemove", onMove);
    heroRef.current?.addEventListener("mouseleave", onLeave);
    
    return () => {
      window.removeEventListener("mousemove", onMove);
      heroRef.current?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className={styles.hero} ref={heroRef}>
      <div className={styles.compassContainer}>
        {/* Outer Glow Ring */}
        <div className={styles.outerGlow}></div>
        
        {/* Glass Shine Effect */}
        <div className={styles.glassShine}></div>
        
        {/* The housing moves in 3D, the needle rotates inside */}
        <div ref={housingRef} className={styles.compassWrapper}>
          <svg viewBox="0 0 400 400" className={styles.compassSvg}>
            <defs>
              {/* Premium Gradients */}
              <radialGradient id="compassBg">
                <stop offset="0%" stopColor="#1a1410" />
                <stop offset="50%" stopColor="#0f0c08" />
                <stop offset="100%" stopColor="#050402" />
              </radialGradient>
              
              <radialGradient id="compassGlow">
                <stop offset="0%" stopColor="rgba(253, 230, 138, 0.4)" />
                <stop offset="40%" stopColor="rgba(180, 83, 9, 0.2)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="25%" stopColor="#fde68a" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="75%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              
              <linearGradient id="goldGradReverse" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#b45309" />
                <stop offset="25%" stopColor="#d97706" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="75%" stopColor="#fde68a" />
                <stop offset="100%" stopColor="#fef3c7" />
              </linearGradient>
              
              <linearGradient id="needleGold" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="20%" stopColor="#fde68a" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="80%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              
              <linearGradient id="needleDark" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#1a0f0a" />
                <stop offset="50%" stopColor="#2d1810" />
                <stop offset="100%" stopColor="#4a2615" />
              </linearGradient>
              
              <radialGradient id="centerGlow">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="30%" stopColor="#fde68a" />
                <stop offset="60%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#78350f" />
              </radialGradient>
              
              {/* Advanced Shadow Filters */}
              <filter id="dropShadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                <feOffset dx="0" dy="3" result="offsetblur"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.6"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id="innerShadow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
                <feOffset dx="0" dy="2" result="offsetblur"/>
                <feFlood floodColor="#000000" floodOpacity="0.5"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id="strongGlow">
                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Dark Background Circle */}
            <circle cx="200" cy="200" r="195" fill="url(#compassBg)" opacity="0.95" />
            
            {/* Ambient Glow */}
            <circle cx="200" cy="200" r="200" fill="url(#compassGlow)" opacity="0.7" />
            
            {/* Outer Decorative Rings with 3D effect */}
            <circle cx="200" cy="200" r="195" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.4" />
            <circle cx="200" cy="200" r="188" fill="none" stroke="url(#goldGradReverse)" strokeWidth="4" opacity="0.9" filter="url(#glow)" />
            <circle cx="200" cy="200" r="182" fill="none" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.5" />
            
            {/* Inner Shadow Ring */}
            <circle cx="200" cy="200" r="175" fill="none" stroke="#000" strokeWidth="8" opacity="0.3" />
            
            {/* Ancient Compass Markings - Outer Circle */}
            <g className={styles.ancientMarkings}>
              {[...Array(36)].map((_, i) => {
                const angle = (i * 10 - 90) * (Math.PI / 180);
                const isCardinal = i % 9 === 0;
                const isMajor = i % 3 === 0;
                const x1 = 200 + 173 * Math.cos(angle);
                const y1 = 200 + 173 * Math.sin(angle);
                const x2 = 200 + (isCardinal ? 150 : isMajor ? 158 : 165) * Math.cos(angle);
                const y2 = 200 + (isCardinal ? 150 : isMajor ? 158 : 165) * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#goldGrad)"
                    strokeWidth={isCardinal ? "3" : isMajor ? "2" : "1"}
                    opacity={isCardinal ? "1" : isMajor ? "0.8" : "0.4"}
                    filter={isCardinal ? "url(#glow)" : "none"}
                  />
                );
              })}
            </g>
            
            {/* Decorative Circles - Multiple layers for depth */}
            <circle cx="200" cy="200" r="148" fill="none" stroke="url(#goldGrad)" strokeWidth="0.5" opacity="0.3" />
            <circle cx="200" cy="200" r="145" fill="none" stroke="url(#goldGradReverse)" strokeWidth="1.5" opacity="0.6" />
            <circle cx="200" cy="200" r="142" fill="none" stroke="url(#goldGrad)" strokeWidth="0.5" opacity="0.3" />
            
            {/* Ancient Runes/Symbols - Animated */}
            <g className={styles.runes}>
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45 - 90) * (Math.PI / 180);
                const x = 200 + 136 * Math.cos(angle);
                const y = 200 + 136 * Math.sin(angle);
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="4" fill="#b45309" opacity="0.3" />
                    <circle cx={x} cy={y} r="2.5" fill="#fbbf24" opacity="0.8" filter="url(#glow)" />
                  </g>
                );
              })}
            </g>
            
            {/* Intermediate detail ring */}
            <circle cx="200" cy="200" r="128" fill="none" stroke="url(#goldGrad)" strokeWidth="0.5" opacity="0.2" />
            
            {/* Small decorative dots */}
            <g className={styles.smallDots}>
              {[...Array(24)].map((_, i) => {
                const angle = (i * 15 - 90) * (Math.PI / 180);
                const x = 200 + 120 * Math.cos(angle);
                const y = 200 + 120 * Math.sin(angle);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="1"
                    fill="#fde68a"
                    opacity="0.5"
                  />
                );
              })}
            </g>
            
            {/* Cardinal Points with Premium Styling */}
            <g className={styles.points} filter="url(#strongGlow)">
              <text x="200" y="42" textAnchor="middle" className={styles.northPoint}>N</text>
              <text x="370" y="210" textAnchor="middle">E</text>
              <text x="200" y="378" textAnchor="middle">S</text>
              <text x="30" y="210" textAnchor="middle">W</text>
            </g>

            {/* THE NEEDLE - Ultra Premium with realistic metallic look */}
            <g ref={needleRef} filter="url(#dropShadow)">
              {/* Soft shadow beneath needle for depth */}
              <ellipse cx="200" cy="207" rx="30" ry="10" fill="#000" opacity="0.4" />
              <ellipse cx="200" cy="205" rx="28" ry="8" fill="#000" opacity="0.3" />
              
              {/* North Pointer - Premium Gold with highlights */}
              <path 
                d="M200 55 L212 192 L200 198 L188 192 Z" 
                fill="url(#needleGold)" 
                stroke="#b45309"
                strokeWidth="1.5"
                filter="url(#glow)"
              />
              
              {/* North Pointer Highlights - Multiple layers */}
              <path 
                d="M200 55 L207 192 L200 195 Z" 
                fill="rgba(254, 243, 199, 0.5)" 
              />
              <path 
                d="M200 55 L203 150 L200 155 Z" 
                fill="rgba(254, 243, 199, 0.7)" 
              />
              
              {/* North Pointer Edge Shine */}
              <path 
                d="M200 55 L201 100 L200 105 Z" 
                fill="rgba(255, 255, 255, 0.6)" 
              />
              
              {/* South Pointer - Dark with subtle gradient */}
              <path 
                d="M200 345 L212 208 L200 202 L188 208 Z" 
                fill="url(#needleDark)" 
                stroke="#0a0604"
                strokeWidth="1.5"
              />
              
              {/* South Pointer Highlight */}
              <path 
                d="M200 345 L207 208 L200 205 Z" 
                fill="rgba(74, 38, 21, 0.6)" 
              />
              
              {/* Center Pivot - Multi-layered with depth */}
              <circle cx="200" cy="200" r="22" fill="url(#centerGlow)" opacity="0.4" filter="url(#glow)" />
              <circle cx="200" cy="200" r="18" fill="#0a0a0a" opacity="0.9" />
              <circle cx="200" cy="200" r="14" fill="url(#goldGrad)" stroke="#b45309" strokeWidth="2" filter="url(#glow)" />
              <circle cx="200" cy="200" r="10" fill="#1a1410" stroke="#fbbf24" strokeWidth="1" />
              <circle cx="200" cy="200" r="6" fill="url(#centerGlow)" />
              <circle cx="200" cy="200" r="3" fill="#050402" />
              
              {/* Metallic Highlights on Center - Multiple points */}
              <circle cx="197" cy="197" r="4" fill="rgba(254, 243, 199, 0.7)" />
              <circle cx="195" cy="195" r="2" fill="rgba(255, 255, 255, 0.9)" />
            </g>
            
            {/* Glass Cover Reflections - Multiple layers */}
            <ellipse 
              cx="140" 
              cy="110" 
              rx="90" 
              ry="70" 
              fill="rgba(255, 255, 255, 0.04)"
              transform="rotate(-35 140 110)"
            />
            <ellipse 
              cx="150" 
              cy="120" 
              rx="70" 
              ry="50" 
              fill="rgba(255, 255, 255, 0.06)"
              transform="rotate(-35 150 120)"
            />
            
            {/* Edge highlights for 3D depth */}
            <path
              d="M 200 5 A 195 195 0 0 1 320 60"
              fill="none"
              stroke="rgba(253, 230, 138, 0.3)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      <div className={styles.content} ref={contentRef}>
        <h1 className={styles.title}>
          CHART YOUR COURSE.
          <span className={styles.goldText}>EMBARK ON THE ODYSSEY</span>
        </h1>
        <p className={styles.subtitle}>Guidance • Knowledge • Expedition</p>
        <button className={styles.voyageBtn}>BEGIN YOUR VOYAGE</button>
      </div>
    </div>
  );
};

export default Hero;
