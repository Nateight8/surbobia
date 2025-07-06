import { WavyPaths } from "@/slices/Hero/wavy-path";
import { SkateBoardModel } from "./skate-model";
import { Environment, Html, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

const INITIAL_CAMERA_POSITION = [1.5, 1, 1.4] as const;

export default function SkateBoardScene({
  wheelTextureURLs,
  wheelTextureURL,
  deckTextureURLs,
  deckTextureURL,
  truckColor,
  boltColor,
}: {
  wheelTextureURLs: string[];
  wheelTextureURL: string;
  deckTextureURLs: string[];
  deckTextureURL: string;
  truckColor: string;
  boltColor: string;
}) {
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(new THREE.Vector3(-0.2, 0.15, 0));

    setZoom();

    window.addEventListener("resize", setZoom);

    function setZoom() {
      const scale = Math.max(Math.min(1000 / window.innerWidth, 2.2), 1);

      camera.position.x = INITIAL_CAMERA_POSITION[0] * scale;
      camera.position.y = INITIAL_CAMERA_POSITION[1] * scale;
      camera.position.z = INITIAL_CAMERA_POSITION[2] * scale;
    }

    return () => window.removeEventListener("resize", setZoom);
  }, [camera]);

  return (
    <group>
      <Environment files={"/hdr/warehouse-256.hdr"} />
      <ambientLight intensity={1} color="#ffffff" />
      <directionalLight
        position={[5, 10, 7]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <ambientLight intensity={0.8} color="#ffffff" />
      <OrbitControls
        enableZoom={false} // Disable default zoom
        enablePan={false} // Disable default pan
        // Enable zoom only when Ctrl key is pressed
        onUpdate={(self) => {
          const keyboardEvent = window.event as KeyboardEvent | undefined;
          self.enableZoom = keyboardEvent?.ctrlKey || false;
          self.enablePan = keyboardEvent?.ctrlKey || false;
        }}
        // Optional: Add these if you want to control zoom differently
        // zoomSpeed={0.8}
        // minDistance={2}
        // maxDistance={10}
      />
      <SkateBoardModel
        wheelTextureURLs={wheelTextureURLs}
        wheelTextureURL={wheelTextureURL}
        deckTextureURLs={deckTextureURLs}
        deckTextureURL={deckTextureURL}
        truckColor={truckColor}
        boltColor={boltColor}
      />
      <group
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        position={[0, -0.09, -0.5]}
        scale={[0.2, 0.2, 0.2]}
      >
        <Html
          wrapperClass="pointer-events-none"
          transform
          zIndexRange={[1, 0]}
          occlude="blending"
        >
          <WavyPaths />
        </Html>
      </group>
    </group>
  );
}
