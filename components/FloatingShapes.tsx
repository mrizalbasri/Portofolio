'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingCube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          distort={0.3}
          speed={2}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.z += 0.01;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.8, 0.3, 16, 100]} />
        <MeshDistortMaterial
          color="#06b6d4"
          distort={0.2}
          speed={1.5}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
}

function FloatingOctahedron({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.015;
      meshRef.current.rotation.z += 0.005;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={2.5}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[1]} />
        <MeshDistortMaterial
          color="#ec4899"
          distort={0.4}
          speed={2.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#06b6d4" intensity={0.3} />
        
        {/* Multiple floating shapes */}
        <FloatingCube position={[-3, 2, 0]} />
        <FloatingTorus position={[3, -1, -2]} />
        <FloatingOctahedron position={[0, -2, -1]} />
        <FloatingCube position={[4, 1, -3]} />
        <FloatingTorus position={[-2, -3, -2]} />
      </Canvas>
    </div>
  );
}
