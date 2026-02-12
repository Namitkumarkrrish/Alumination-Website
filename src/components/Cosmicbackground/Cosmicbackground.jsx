import React from 'react';
import styles from './CosmicBackground.module.css';

const CosmicBackground = () => {
  return (
    <div className={styles.cosmicContainer}>
      {/* Shooting Stars */}
      <div className={styles.shootingStars}>
        <div className={styles.shootingStar}></div>
        <div className={styles.shootingStar}></div>
        <div className={styles.shootingStar}></div>
        <div className={styles.shootingStar}></div>
        <div className={styles.shootingStar}></div>
      </div>
      
      {/* Cosmic Nebula Effects */}
      <div className={styles.nebula}></div>
      <div className={styles.nebulaAccent}></div>
      <div className={styles.nebulaBottom}></div>
      
      {/* Distant Galaxy */}
      <div className={styles.distantGalaxy}></div>
      
      {/* Star Clusters */}
      <div className={styles.starCluster1}></div>
      <div className={styles.starCluster2}></div>
      
      {/* Milky Way Band */}
      <div className={styles.milkyWay}></div>
    </div>
  );
};

export default CosmicBackground;
