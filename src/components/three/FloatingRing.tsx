"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

export function FloatingRing() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = t * 0.12;
    meshRef.current.position.y = Math.sin(t * 0.2) * 0.4;
  });

  return (
    <mesh ref={meshRef} position={[0.8, 1.2, -3.5]}>
      <torusGeometry args={[0.9, 0.03, 32, 64]} />
      <meshBasicMaterial
        color="#DA840A"
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}
