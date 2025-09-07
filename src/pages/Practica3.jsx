import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';

// Inicializar rectAreaLight (necesario para que funcione bien en R3F)
RectAreaLightUniformsLib.init();

function LightScene() {
  // Cargar modelo
  const gltf = useGLTF("/assets/RobotExpressive.glb");
  const modelRef = useRef();

  // Animación del modelo
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <>
      {/* Luces */}
      <ambientLight color={0x00ff00} intensity={1.5} />

      <directionalLight
        color={0x0000ff}
        intensity={0.3}
        position={[-2, 2, -1]}
        castShadow
      />

      <hemisphereLight
        skyColor={0x0000ff}
        groundColor={0xff0000}
        intensity={0.6}
      />

      <pointLight
        color={0xff00ff}
        intensity={2}
        distance={20}
        position={[1, 2, 2]}
        castShadow
      />

      <spotLight
        color={0x78ff00}
        intensity={2}
        distance={10}
        angle={Math.PI * 0.2}
        penumbra={0.25}
        position={[0, 3, 3]}
        castShadow
      />

      <rectAreaLight
        color={0x4e00ff}
        intensity={5}
        width={3}
        height={3}
        position={[-2, 1, 2]}
        lookAt={[0, 0, 0]}
      />

      {/* Modelo */}
      <primitive
        ref={modelRef}
        object={gltf.scene}
        position={[0.5, -0.7, -1]}
        scale={[0.3, 0.3, 0.3]}
      />

      {/* Geometrías */}
      <mesh position={[-1.5, 0, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="orange" roughness={0.4} metalness={0.3} />
      </mesh>

      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.75, 0.75, 0.75]} />
        <meshStandardMaterial color="blue" roughness={0.4} metalness={0.2} />
      </mesh>

      <mesh position={[1.5, 0, 0]} castShadow>
        <torusGeometry args={[0.3, 0.2, 32, 64]} />
        <meshStandardMaterial color="hotpink" roughness={0.4} metalness={0.6} />
      </mesh>

      <mesh
        rotation={[-Math.PI * 0.5, 0, 0]}
        position={[0, -0.65, 0]}
        receiveShadow
      >
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial color="white" roughness={0.8} />
      </mesh>

      {/* Controles */}
      <OrbitControls />
    </>
  );
}

function Practica3() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas
        shadows
        camera={{ position: [2, 2, 4], fov: 60, near: 0.1, far: 100 }}
      >
        <LightScene />
      </Canvas>
    </div>
  );
}

export default Practica3;
