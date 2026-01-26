"use client";

import React, { useRef, Suspense, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// UBAH 1: Interface sekarang menerima MutableRefObject, bukan object biasa
interface RobotProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
  isMobile: boolean;
}

// Geometric Robot Fallback
function GeometricRobot({ mousePosition, isMobile }: RobotProps) {
  const groupRef = useRef<THREE.Group>(null);
  const baseScale = isMobile ? 0.6 : 1;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // UBAH 2: Akses .current.x dan .current.y langsung di dalam loop
      // Ini memastikan data yang dibaca selalu TERBARU
      const mouseX = mousePosition.current.x;
      const mouseY = mousePosition.current.y;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseX * 0.5,
        0.1
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseY * 0.3,
        0.1
      );

      groupRef.current.position.y = Math.sin(time * 0.8) * 0.3;
      const breathScale = baseScale * (1 + Math.sin(time * 1.5) * 0.05);
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
      {/* ... (sisa mesh geometric sama seperti sebelumnya) ... */}
    </group>
  );
}

// GLTF Model Loader with Mouse-Driven Movement
function GLTFRobot({ mousePosition, isMobile }: RobotProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/Robot.glb");
  const prevMousePos = useRef({ x: 0, y: 0 });
  const baseScale = isMobile ? 0.7 : 0.8;

  // Search for head bone to rotate separately
  const headBone = useMemo(() => {
    // Prioritize specific known names
    let found =
      scene.getObjectByName("Head") ||
      scene.getObjectByName("head") ||
      scene.getObjectByName("Neck") ||
      scene.getObjectByName("neck") ||
      scene.getObjectByName("mixamorigHead") ||
      scene.getObjectByName("mixamorigNeck");

    // Fallback: search recursively for any bone with "head" or "neck" in the name
    if (!found) {
      scene.traverse((child) => {
        if (
          !found &&
          (child instanceof THREE.Bone || child.type === "Bone") &&
          (child.name.toLowerCase().includes("head") ||
            child.name.toLowerCase().includes("neck"))
        ) {
          found = child;
        }
      });
    }
    
    return found;
  }, [scene]);

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      const meshName = mesh.name.toLowerCase();
      if (
        meshName.includes("eye") ||
        meshName.includes("pupil") ||
        meshName.includes("iris")
      ) {
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#ffffff",
          emissive: "#4fd1c5", // Cyan glow
          emissiveIntensity: 2,
          toneMapped: false,
          metalness: 0.1,
          roughness: 0.1,
        });
      } else if (mesh.material) {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.needsUpdate = true;
      }
    }
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // UBAH 3: Ambil posisi mouse dari Ref Object secara langsung
      const currentMouseX = mousePosition.current.x;
      const currentMouseY = mousePosition.current.y;

      groupRef.current.position.y = Math.sin(time * 1.2) * 0.3;

      // Hitung velocity based on ref values
      const velocityX = currentMouseX - prevMousePos.current.x;
      // velocityY removed as it is no longer used

      // Modified rotation logic based on user feedback (fixed position, more rotation)
      
      // Separate Body and Head rotation
      const targetBodyRotationY = currentMouseX * 0.25; // Decreased from 0.4 to prevent self-clipping
      const targetBodyRotationX = -currentMouseY * 0.1; // Decreased from 0.15

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetBodyRotationY,
        0.15
      );

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetBodyRotationX,
        0.15
      );

      // Z Rotation (Tilt): Reduced velocity influence
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -velocityX * 1.5,
        0.1
      );

      // Head Rotation: Validates if head bone exists
      if (headBone) {
         // Head follows mouse but clamped to avoid broken neck look
         // Since body also rotates, head rotation can be subtler
         const targetHeadY = currentMouseX * 0.6; 
         const targetHeadX = -currentMouseY * 0.5; 

         // Increased lerp speed for faster response
         // eslint-disable-next-line
         headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, targetHeadY, 0.2);
         headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, targetHeadX, 0.2);
      }

      const breathScale = 1 + Math.sin(time * 2) * 0.08;
      groupRef.current.scale.set(
        breathScale * baseScale,
        breathScale * baseScale,
        breathScale * baseScale
      );

      // Update prevMousePos
      prevMousePos.current = { x: currentMouseX, y: currentMouseY };
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={baseScale} />
    </group>
  );
}

// Class-based Error Boundary to catch render errors
class ErrorBoundary extends React.Component<{ children: React.ReactNode, fallback: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode, fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.log("GLTF Component failed:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Error Boundary Component
function RobotWithFallback({ mousePosition, isMobile }: RobotProps) {
  return (
    <ErrorBoundary 
      fallback={<GeometricRobot mousePosition={mousePosition} isMobile={isMobile} />}
    >
      <GLTFRobot mousePosition={mousePosition} isMobile={isMobile} />
    </ErrorBoundary>
  );
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
  // Ref ini akan di-update oleh window event listener
  const mousePosition = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // UBAH 4: Gunakan GLOBAL Window Event Listener
    // Ini kuncinya: Mouse dideteksi dilayar manapun, tidak harus diatas Canvas
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full h-full bg-transparent">
      <Canvas gl={{ alpha: true }} style={{ background: 'transparent' }}>
        <PerspectiveCamera
          makeDefault
          position={isMobile ? [0, 0.5, 10] : [-0.5, 0.5, 10]}
          fov={isMobile ? 55 : 50}
        />

        {/* Standard lights only to prevent errors */}
        <ambientLight intensity={2} />
        <directionalLight position={[10, 10, 5]} intensity={3} />
        <directionalLight position={[-10, 10, -5]} intensity={2} />
        <pointLight
          position={[-10, -10, -10]}
          color="#8b5cf6"
          intensity={1}
        />
        <pointLight position={[10, 10, 10]} color="#06b6d4" intensity={1} />

        <Suspense fallback={<Loader />}>
          {/* UBAH 5: Passing REF objectnya langsung (mousePosition), bukan valuenya (mousePosition.current) */}
          <RobotWithFallback
            mousePosition={mousePosition}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload
useGLTF.preload("/models/Robot.glb");
