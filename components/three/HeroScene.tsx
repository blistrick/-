"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { createToothGeometry } from "@/lib/three/toothGeometry";

const GOLD = "#c9a765";
const FOREST = "#0f3b32";

function GemTooth() {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => createToothGeometry(10), []);

  useFrame((state, delta) => {
    if (!group.current) return;
    // Gentle continuous spin plus a subtle parallax toward the pointer.
    group.current.rotation.y += delta * 0.18;
    const targetX = state.pointer.y * 0.18;
    const targetZ = -state.pointer.x * 0.18;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.04);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetZ, 0.04);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
      <group ref={group} scale={1.5} position={[0, 0.35, 0]}>
        <mesh geometry={geometry} castShadow receiveShadow>
          {/* Glossy porcelain/ceramic finish — reads as premium dental
              material, and (unlike a transmission "glass" material) renders
              reliably across GPUs without an expensive render-to-texture
              pass. */}
          <meshPhysicalMaterial
            color="#f7f2e4"
            roughness={0.22}
            metalness={0}
            clearcoat={1}
            clearcoatRoughness={0.12}
            envMapIntensity={1.2}
          />
        </mesh>
        {/* Gold "gumline" ring accent */}
        <mesh position={[0, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.135, 0.016, 16, 48]} />
          <meshStandardMaterial color={GOLD} roughness={0.25} metalness={0.85} />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitDots() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.12;
  });
  const dots = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const r = 1.7;
        return [Math.cos(angle) * r, 0.45 + Math.sin(angle * 1.7) * 0.35, Math.sin(angle) * r] as const;
      }),
    []
  );
  return (
    <group ref={ref}>
      {dots.map((pos, i) => (
        <mesh key={i} position={pos as unknown as [number, number, number]}>
          <sphereGeometry args={[0.028, 12, 12]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? GOLD : "#e7ded0"}
            emissive={i % 2 === 0 ? GOLD : FOREST}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.2, 5.2], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 2]} intensity={1.2} castShadow />
      <directionalLight position={[-3, 1, -2]} intensity={0.4} color={GOLD} />
      <Suspense fallback={null}>
        <GemTooth />
        <OrbitDots />
        {/* Fully procedural (offline) studio environment — no external HDR
            fetch, so the glass material's reflections never depend on a
            third-party CDN being reachable. */}
        <Environment resolution={256}>
          <group>
            <Lightformer intensity={2.2} color="#ffffff" position={[-3, 2, 1]} scale={[3, 3, 1]} />
            <Lightformer intensity={1.6} color={GOLD} position={[3, 1, 2]} scale={[3, 1.5, 1]} />
            <Lightformer
              intensity={1.2}
              color={FOREST}
              position={[0, -3, -2]}
              scale={[5, 2, 1]}
              rotation={[Math.PI / 2, 0, 0]}
            />
          </group>
        </Environment>
        <ContactShadows position={[0, -1.35, 0]} opacity={0.35} scale={6} blur={2.6} far={2} color="#0f3b32" />
      </Suspense>
    </Canvas>
  );
}
