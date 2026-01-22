"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

function RotatingDiamond({
  mousePosition,
}: {
  mousePosition: { x: number; y: number };
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        state.clock.getElapsedTime() * 0.5 + mousePosition.x * 0.3;
      meshRef.current.rotation.x = mousePosition.y * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.3;
      meshRef.current.position.x = mousePosition.x * 0.5;
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

function WireframeSphere({
  mousePosition,
}: {
  mousePosition: { x: number; y: number };
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        state.clock.getElapsedTime() * 0.2 - mousePosition.y * 0.2;
      meshRef.current.rotation.y =
        state.clock.getElapsedTime() * 0.3 + mousePosition.x * 0.2;
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
      style={{ pointerEvents: "auto" }}
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, 0, -10]} color="#8b5cf6" intensity={1} />
        <pointLight position={[10, 0, 10]} color="#06b6d4" intensity={0.5} />

        <RotatingDiamond mousePosition={mousePosition.current} />
        <WireframeSphere mousePosition={mousePosition.current} />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
