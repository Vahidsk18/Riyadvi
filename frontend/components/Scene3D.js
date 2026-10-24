'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, MeshDistortMaterial } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Network({ count }) {
  const group = useRef();
  const pts = useMemo(() => Array.from({ length: count }, (_, i) => {
    const phi = Math.acos(1 - 2 * (i + 0.5) / count), th = Math.PI * (1 + Math.sqrt(5)) * i;
    return new THREE.Vector3(Math.cos(th) * Math.sin(phi), Math.sin(th) * Math.sin(phi), Math.cos(phi)).multiplyScalar(2);
  }), [count]);
  const lines = useMemo(() => pts.flatMap((p, i) => pts.slice(i + 1).filter((q) => p.distanceTo(q) < 1.1).map((q) => [p, q])), [pts]);
  useFrame(({ pointer }, dt) => {
    group.current.rotation.y += dt * 0.15;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.4, 0.05);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointer.x * 0.4, 0.05);
  });
  return (
    <group ref={group}>
      {pts.map((p, i) => <mesh key={i} position={p}><sphereGeometry args={[0.05, 12, 12]} /><meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.8} /></mesh>)}
      {lines.map((l, i) => <Line key={i} points={l} color="#D4AF37" transparent opacity={0.25} lineWidth={1} />)}
    </group>
  );
}
function Shape({ kind }) {
  const geo = { torus: <torusKnotGeometry args={[0.8, 0.25, 128, 16]} />, icosa: <icosahedronGeometry args={[1.2, 1]} />,
    phone: <boxGeometry args={[1, 2, 0.12]} />, browser: <boxGeometry args={[2.2, 1.4, 0.1]} />, bars: <cylinderGeometry args={[0.6, 0.6, 1.8, 6]} />, cards: <boxGeometry args={[1.6, 1.1, 0.06]} /> }[kind] || <sphereGeometry args={[1, 32, 32]} />;
  return <Float speed={2} rotationIntensity={1.2}><mesh>{geo}<MeshDistortMaterial color="#D4AF37" metalness={0.9} roughness={0.2} distort={0.15} speed={2} /></mesh></Float>;
}
// Mobile strategy: fewer nodes, capped DPR, no antialias.
export default function Scene3D({ kind = 'network', mobile = false }) {
  return (
    <Canvas dpr={mobile ? 1 : [1, 2]} gl={{ antialias: !mobile, powerPreference: 'high-performance' }} camera={{ position: [0, 0, 6], fov: 50 }}>
      <ambientLight intensity={0.6} /><pointLight position={[5, 5, 5]} intensity={40} />
      {kind === 'network' ? <Network count={mobile ? 40 : 90} /> : <Shape kind={kind} />}
    </Canvas>
  );
}
