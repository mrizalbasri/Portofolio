'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Robot({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Robot mengikuti mouse dengan smooth interpolation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePosition.x * 0.5,
        0.1
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mousePosition.y * 0.3,
        0.1
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Robot Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2, 1]} />
        <meshStandardMaterial color="#4a90e2" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Robot Head */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.2, 1, 1]} />
        <meshStandardMaterial color="#5aa3f0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.3, 1.5, 0.51]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.3, 1.5, 0.51]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
        <meshStandardMaterial color="#ff6b6b" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.8} />
      </mesh>

      {/* Arms */}
      <mesh position={[-1, 0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.2, 0.2, 1.5, 8]} />
        <meshStandardMaterial color="#3a7bc8" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[1, 0.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.2, 0.2, 1.5, 8]} />
        <meshStandardMaterial color="#3a7bc8" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Hands */}
      <mesh position={[-1.3, -0.3, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#5aa3f0" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.3, -0.3, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#5aa3f0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.4, -1.5, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 1, 8]} />
        <meshStandardMaterial color="#3a7bc8" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.4, -1.5, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 1, 8]} />
        <meshStandardMaterial color="#3a7bc8" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.4, -2.2, 0.2]}>
        <boxGeometry args={[0.4, 0.2, 0.6]} />
        <meshStandardMaterial color="#2a5a9e" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.4, -2.2, 0.2]}>
        <boxGeometry args={[0.4, 0.2, 0.6]} />
        <meshStandardMaterial color="#2a5a9e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Chest Light */}
      <mesh position={[0, 0.3, 0.51]}>
        <circleGeometry args={[0.3, 16]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

export default function RobotScene() {
  const mousePosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mousePosition.current = { x, y };
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none"
      onMouseMove={handleMouseMove}
      style={{ pointerEvents: 'auto' }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#06b6d4" intensity={0.3} />
        
        <Robot mousePosition={mousePosition.current} />
        
        {/* Optional: Enable orbit controls for manual rotation */}
        {/* <OrbitControls enableZoom={false} /> */}
      </Canvas>
    </div>
  );
}
