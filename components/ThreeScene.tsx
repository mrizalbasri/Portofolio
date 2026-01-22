"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Box } from "@react-three/drei";
import * as THREE from "three";

function AnimatedBot() {
  const groupRef = useRef<THREE.Group>(null);

  // 1. Kita buat variable penyimpan posisi mouse sendiri
  // Nilai default 0,0 (tengah)
  const mouse = useRef(new THREE.Vector2(0, 0));

  // 2. Pasang pendengar mouse ke WINDOW (seluruh layar)
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Rumus mengubah pixel layar menjadi koordinat -1 sampai 1 (Normalized)
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      mouse.current.set(x, y);
    };

    // SET POSISI MOUSE AWAL saat component mount
    // Ambil posisi awal dari center atau posisi real mouse saat mount
    const initialX = (window.innerWidth / 2 / window.innerWidth) * 2 - 1;
    const initialY = -(window.innerHeight / 2 / window.innerHeight) * 2 + 1;
    mouse.current.set(initialX, initialY);

    window.addEventListener("mousemove", handleMouseMove);

    // Bersihkan event saat component dicopot
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // 3. Ambil posisi dari variable buatan kita (bukan state.mouse)
      const target = new THREE.Vector3(
        mouse.current.x * 10,
        mouse.current.y * 10,
        5
      );

      // Gunakan lerp (Linear Interpolation) agar gerakannya smooth/halus
      // Tidak langsung patah menengok
      const currentRotation = groupRef.current.quaternion;
      const targetQuaternion = new THREE.Quaternion();

      // Buat quaternion dari target lookAt
      const tempMatrix = new THREE.Matrix4();
      tempMatrix.lookAt(
        groupRef.current.position,
        target,
        new THREE.Vector3(0, 1, 0)
      );
      targetQuaternion.setFromRotationMatrix(tempMatrix);

      // Lerp antara rotasi saat ini dan target (smooth)
      currentRotation.slerp(targetQuaternion, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* KEPALA (Bola) */}
      <Sphere args={[1, 64, 64]} scale={1.5}>
        <meshStandardMaterial color="#222" roughness={0.4} metalness={0.6} />
      </Sphere>

      {/* MATA KIRI */}
      <Sphere args={[0.2, 32, 32]} position={[-0.5, 0.2, 1.2]}>
        <meshStandardMaterial
          color="#00ffcc"
          emissive="#00ffcc"
          emissiveIntensity={2}
        />
      </Sphere>

      {/* MATA KANAN */}
      <Sphere args={[0.2, 32, 32]} position={[0.5, 0.2, 1.2]}>
        <meshStandardMaterial
          color="#00ffcc"
          emissive="#00ffcc"
          emissiveIntensity={2}
        />
      </Sphere>
    </group>
  );
}

export default function ThreeScene() {
  return (
    // Pastikan container ini full screen dan berada di belakang (z-index rendah jika perlu)
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-slate-900">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} color="blue" intensity={1} />

        <AnimatedBot />
      </Canvas>
    </div>
  );
}
