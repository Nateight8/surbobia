import { Billboard } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

type HotspotProps = {
  position: [number, number, number];
  isVisible: boolean;
  color?: string;
  onClick?: () => void;
};

export function Hotspot({
  position,
  isVisible,
  color = "#E6FC6A",
  onClick,
}: HotspotProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRing1Ref = useRef<THREE.Mesh>(null);
  const pulseRing2Ref = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const hoverRef = useRef(false);

  useFrame((state) => {
    if (
      !groupRef.current ||
      !pulseRing1Ref.current ||
      !pulseRing2Ref.current ||
      !innerRingRef.current
    )
      return;

    const time = state.clock.getElapsedTime();

    // Base pulsing effect (always active)
    const basePulse = Math.sin(time * 2) * 0.05 + 0.95; // Subtle pulse between 0.9 and 1.0

    // Hover effect (more pronounced)
    const hoverPulse = hoverRef.current
      ? Math.sin(time * 5) * 0.1 + 1.1 // Bigger pulse when hovered
      : 1;

    // Combine both effects
    const pulse = basePulse * hoverPulse;

    // Animate pulse rings with different phases
    pulseRing1Ref.current.scale.setScalar(1 + Math.sin(time * 1.5) * 0.3);
    pulseRing2Ref.current.scale.setScalar(1 + Math.sin(time * 1.2 + 1) * 0.25);

    // Inner ring scales with hover
    innerRingRef.current.scale.setScalar(pulse);

    // Pulsing opacity for the outer rings
    const opacity1 = 0.3 + Math.sin(time * 1.5) * 0.1;
    const opacity2 = 0.2 + Math.sin(time * 1.2 + 1) * 0.1;

    // @ts-expect-error - TypeScript doesn't know about material.opacity
    pulseRing1Ref.current.material.opacity = opacity1;
    // @ts-expect-error - TypeScript doesn't know about material.opacity
    pulseRing2Ref.current.material.opacity = opacity2;
  });

  const handlePointerOver = () => {
    hoverRef.current = true;
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    hoverRef.current = false;
    document.body.style.cursor = "default";
  };

  return (
    <group ref={groupRef} visible={isVisible}>
      <Billboard position={position} follow={true}>
        {/* Outer pulse ring 1 */}
        <mesh
          ref={pulseRing1Ref}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={onClick}
        >
          <circleGeometry args={[0.06, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3}
            depthWrite={false}
          />
        </mesh>

        {/* Outer pulse ring 2 */}
        <mesh
          ref={pulseRing2Ref}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={onClick}
        >
          <circleGeometry args={[0.04, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2}
            depthWrite={false}
          />
        </mesh>

        {/* Inner ring */}
        <mesh
          ref={innerRingRef}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={onClick}
        >
          <circleGeometry args={[0.02, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.9}
            depthWrite={false}
          />
        </mesh>

        {/* Center dot */}
        <mesh
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={onClick}
        >
          <circleGeometry args={[0.008, 16]} />
          <meshBasicMaterial
            color="white"
            transparent
            opacity={0.9}
            depthWrite={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
}
