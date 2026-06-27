"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

export function FloatingTorus() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1 + Math.sin(t * 0.2) * 0.1;
    meshRef.current.rotation.y = t * 0.08 + Math.sin(t * 0.15) * 0.1;
    meshRef.current.position.y = Math.sin(t * 0.25) * 0.4;
    meshRef.current.position.x = 3.8 + Math.sin(t * 0.1) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={[3.8, 0.5, -3]}>
      <torusKnotGeometry args={[1.2, 0.4, 128, 16]} />
      <meshBasicMaterial
        color="#DA840A"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}
