"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

export function Octahedron() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.25 + Math.sin(t * 0.3) * 0.05;
    meshRef.current.rotation.y = t * 0.18 + Math.sin(t * 0.2) * 0.08;
    meshRef.current.position.y = Math.sin(t * 0.35) * 0.3;
    meshRef.current.position.x = -0.3 + Math.sin(t * 0.12) * 0.15;
    const scale = 1 + Math.sin(t * 0.3) * 0.06;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={[-0.3, 1, -4]}>
      <octahedronGeometry args={[0.8]} />
      <meshBasicMaterial
        color="#DA840A"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}
