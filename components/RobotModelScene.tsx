'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface RobotProps {
  mousePosition: { x: number; y: number };
}

// Geometric Robot Fallback
function GeometricRobot({ mousePosition }: RobotProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
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
      
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.3;
      const breathScale = 1 + Math.sin(time * 1.5) * 0.05;
      groupRef.current.scale.set(breathScale, breathScale, breathScale);
      groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2, 1]} />
        <meshStandardMaterial color="#4a90e2" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.2, 1, 1]} />
        <meshStandardMaterial color="#5aa3f0" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.3, 1.5, 0.51]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.3, 1.5, 0.51]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
        <meshStandardMaterial color="#ff6b6b" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0, 0.3, 0.51]}>
        <circleGeometry args={[0.3, 16]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

// GLTF Model Loader with Mouse-Driven Movement
function GLTFRobot({ mousePosition }: RobotProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/Robot.glb');
  const prevMousePos = useRef({ x: 0, y: 0 });

  // Only enhance eyes, keep everything else original
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      const meshName = mesh.name.toLowerCase();
      
      // Only modify eyes to make them bright white
      if (meshName.includes('eye') || 
          meshName.includes('pupil') || 
          meshName.includes('iris')) {
        mesh.material = new THREE.MeshStandardMaterial({
          color: '#ffffff',
          emissive: '#ffffff',
          emissiveIntensity: 1.5,
          metalness: 0.1,
          roughness: 0.1,
        });
      }
      // Keep all other materials from GLB file
      else if (mesh.material) {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.needsUpdate = true;
      }
    }
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Robot mengikuti mouse dengan range yang lebih terkontrol
      const targetX = mousePosition.x * 2.5; // -2.5 to +2.5 (controlled horizontal)
      const targetZ = -mousePosition.y * 3; // -3 to +3 (controlled depth)
      
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX,
        0.08 // Lebih responsive
      );
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        targetZ,
        0.08
      );
      
      // Floating animation (naik-turun) - centered vertically
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.3;
      
      // Calculate mouse velocity for dynamic tilt
      const velocityX = mousePosition.x - prevMousePos.current.x;
      const velocityY = mousePosition.y - prevMousePos.current.y;
      
      // Robot menghadap arah mouse dengan smooth rotation
      const targetRotationY = Math.atan2(velocityX, velocityY) + mousePosition.x * 0.8;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.1
      );
      
      // Dynamic tilt based on movement
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -velocityX * 5,
        0.1
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        velocityY * 3 + Math.sin(time * 1.5) * 0.1,
        0.1
      );
      
      // Breathing effect
      const breathScale = 1 + Math.sin(time * 2) * 0.08;
      groupRef.current.scale.set(breathScale * 0.8, breathScale * 0.8, breathScale * 0.8);
      
      // Update previous mouse position
      prevMousePos.current = { ...mousePosition };
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={0.8} />
    </group>
  );
}

// Error Boundary Component
function RobotWithFallback({ mousePosition }: RobotProps) {
  try {
    return <GLTFRobot mousePosition={mousePosition} />;
  } catch (error) {
    console.log('GLTF failed, using geometric robot');
    return <GeometricRobot mousePosition={mousePosition} />;
  }
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4a90e2" wireframe />
    </mesh>
  );
}

export default function RobotModelScene() {
  const mousePosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mousePosition.current = { x, y };
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full"
      onMouseMove={handleMouseMove}
      style={{ pointerEvents: 'auto' }}
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[-0.5, 1.5, 10]} fov={50} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#06b6d4" intensity={0.3} />
        
        <Suspense fallback={<Loader />}>
          <RobotWithFallback mousePosition={mousePosition.current} />
        </Suspense>

        {/* Enable mouse drag to rotate */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}

// Preload
useGLTF.preload('/models/Robot.glb');
