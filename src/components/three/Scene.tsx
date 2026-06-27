"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { FloatingTorus } from "./FloatingTorus";
import { Octahedron } from "./Octahedron";
import { Icosahedron } from "./Icosahedron";
import { ParticleField } from "./ParticleField";
import { FloatingRing } from "./FloatingRing";

function CameraController() {
  const { camera } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));

  const target = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame(({ pointer, clock }) => {
    mouse.current.lerp(pointer, 0.03);
    const rx = mouse.current.y * 0.3;
    const ry = mouse.current.x * 0.3;
    camera.position.x = Math.sin(clock.getElapsedTime() * 0.04) * 0.5 + ry;
    camera.position.y = Math.sin(clock.getElapsedTime() * 0.06) * 0.3 + rx;
    camera.lookAt(target);
  });

  return null;
}

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      dpr={[1, 1.2]}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={["#0a0a0a", 8, 20]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#DA840A" />
      <CameraController />
      <ParticleField />
      <FloatingTorus />
      <Octahedron />
      <Icosahedron />
      <FloatingRing />
    </Canvas>
  );
}
