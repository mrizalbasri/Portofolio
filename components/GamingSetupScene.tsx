"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

function GamingSetupModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/gaming_setup.glb");

  // Subtle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.5} position={[0, -1, 0]} />
    </group>
  );
}

// Preload the model
useGLTF.preload("/models/gaming_setup.glb");

export default function GamingSetupScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight
            position={[-10, -10, -5]}
            intensity={0.5}
            color="#a855f7"
          />
          <pointLight position={[10, -10, 5]} intensity={0.5} color="#06b6d4" />

          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* The Model */}
          <GamingSetupModel />

          {/* Shadow */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
