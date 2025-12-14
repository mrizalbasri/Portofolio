'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

function RotatingDiamond() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[2, 0]} />
      <meshStandardMaterial
        color="#8b5cf6"
        metalness={1}
        roughness={0.1}
        envMapIntensity={1}
        emissive="#8b5cf6"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function WireframeSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshBasicMaterial color="#06b6d4" wireframe />
    </mesh>
  );
}

export default function HeroThreeScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, 0, -10]} color="#8b5cf6" intensity={1} />
        <pointLight position={[10, 0, 10]} color="#06b6d4" intensity={0.5} />
        
        <RotatingDiamond />
        <WireframeSphere />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
