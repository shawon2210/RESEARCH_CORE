"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Float32BufferAttribute, Color } from "three";
import type { Points } from "three";

export function ParticleField() {
  const ref = useRef<Points>(null);
  const count = 400;

  const [positions, colors, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const gold = new Color("#DA840A");
    const white = new Color("#f5f5f5");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 24;
      pos[i3 + 1] = (Math.random() - 0.5) * 14;
      pos[i3 + 2] = (Math.random() - 0.5) * 18 - 4;

      const mix = Math.random();
      const c = gold.clone().lerp(white, mix * 0.6);
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;

      spd[i] = 0.002 + Math.random() * 0.01;
    }
    return [pos, col, spd];
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
    geo.setAttribute("color", new Float32BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3 + 1] += speeds[i];
      if (pos[i3 + 1] > 7) pos[i3 + 1] = -7;
      pos[i3] += Math.sin(clock.getElapsedTime() * 0.05 + i) * 0.0003;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
