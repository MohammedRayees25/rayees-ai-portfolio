"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 1400 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const primary = new THREE.Color("#00ff88");
    const accent = new THREE.Color("#00e5ff");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 4 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i3 + 2] = radius * Math.cos(phi);

      const c = Math.random() > 0.5 ? primary : accent;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.04;
    pointsRef.current.rotation.x = Math.sin(t * 0.12) * 0.12;
    const { x, y } = state.pointer;
    pointsRef.current.rotation.y += x * 0.0009;
    pointsRef.current.rotation.x += y * 0.0009;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function NetworkLines({ nodeCount = 34 }: { nodeCount?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const { nodes, geometry } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 10
        )
      );
    }
    const linePositions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 4.2) {
          linePositions.push(
            nodes[i].x,
            nodes[i].y,
            nodes[i].z,
            nodes[j].x,
            nodes[j].y,
            nodes[j].z
          );
        }
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    return { nodes, geometry };
  }, [nodeCount]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.03;
    groupRef.current.rotation.z = Math.sin(t * 0.1) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          color="#00ff88"
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      {nodes.map((n, i) => (
        <mesh key={i} position={n}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#00e5ff" : "#00ff88"}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function NeuralScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 60 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <fog attach="fog" args={["#050505", 12, 26]} />
      <Particles />
      <NetworkLines />
    </Canvas>
  );
}
