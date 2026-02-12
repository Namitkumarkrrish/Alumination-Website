import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Line } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';
import styles from './CosmicBackground.module.css';

const Constellation = ({ points, position, scale = 1 }) => {
  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group position={position} scale={scale}>
        {/* Sharp, Clean Gold Lines */}
        <Line 
          points={points} 
          color="#fde68a" 
          lineWidth={1.2} // Thinner for a more precise, sophisticated look
          transparent 
          opacity={0.5} // Lower opacity prevents that "cheap" over-bright look
        />
        
        {points.map((pos, i) => (
          <group key={i} position={pos}>
            {/* Single Sharp Pinpoint Star */}
            <mesh>
              <sphereGeometry args={[0.007, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
};

const SceneContent = () => {
  const starRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Dense but tiny background stars
  const starField = useMemo(() => random.inSphere(new Float32Array(15000), { radius: 1.5 }), []);

  useFrame((state) => {
    const { x, y } = mouse.current;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 0.4, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 0.4, 0.05);
    state.camera.lookAt(0, 0, 0);
    starRef.current.rotation.y += 0.0001;
  });

  return (
    <group>
      <Points ref={starRef} positions={starField} stride={3}>
        <PointMaterial 
          transparent 
          color="#ffffff" 
          size={0.002} // Smaller stars for a crisper background
          sizeAttenuation 
          depthWrite={false} 
        />
      </Points>

      {/* Scattered layout as per your reference images */}
      <Constellation position={[-1, 0.5, -0.2]} points={[[0,0,0], [0.1, 0.2, 0], [-0.1, 0.3, 0]]} scale={0.8} />
      <Constellation position={[1.1, 0.6, -0.1]} points={[[0,0,0], [-0.1, 0.2, 0], [-0.2, 0.1, 0]]} scale={0.7} />
      <Constellation position={[0.1, 0.5, 0]} points={[[0, 0.1, 0], [0.15, 0, 0], [0, -0.1, 0], [-0.15, 0, 0], [0, 0.1, 0]]} scale={0.9} />
      <Constellation position={[-0.9, -0.6, 0]} points={[[0,0,0], [0.2, 0, 0], [0.1, -0.2, 0]]} scale={0.9} />
      <Constellation position={[1, -0.5, 0.2]} points={[[0,0,0], [-0.2, -0.1, 0], [-0.1, -0.3, 0]]} scale={0.8} />
    </group>
  );
};

const CosmicBackground = () => {
  return (
    <div className={styles.cosmicContainer}>
      <Canvas camera={{ position: [0, 0, 1.3], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default CosmicBackground;