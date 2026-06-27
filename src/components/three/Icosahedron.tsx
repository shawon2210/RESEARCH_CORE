"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

export function Icosahedron() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.position.x = 2.4 + Math.sin(t * 0.2) * 0.2;
    meshRef.current.position.y = Math.sin(t * 0.25) * 0.15;
    const scale = 1 + Math.sin(t * 0.4) * 0.05;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={[2.4, -0.5, -2]}>
      <icosahedronGeometry args={[0.6, 0]} />
      <meshBasicMaterial
        color="#DA840A"
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  );
}
