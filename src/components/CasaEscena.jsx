import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import GUI from "lil-gui";
import React, { Suspense, useRef } from "react";
import * as THREE from "three";

/* ---------------------------------------------------
   Piso con texturas y control interactivo (GUI)
--------------------------------------------------- */
function Piso() {
  const [color, displacement] = useLoader(THREE.TextureLoader, [
    "/assets/piso_rosado.jpg",
    "/assets/piso_desplazamiento.jpeg",
  ]);

  const materialRef = useRef();

  React.useEffect(() => {
    const gui = new GUI();
    gui.add(materialRef.current, "displacementScale", 0, 1, 0.01).name("Escala piso");
    gui.add(materialRef.current, "displacementBias", -0.2, 0.2, 0.01).name("Bias piso");

    return () => gui.destroy();
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[30, 30, 100, 100]} />
      <meshStandardMaterial
        ref={materialRef}
        map={color}
        displacementMap={displacement}
        displacementScale={0.15}
        displacementBias={-0.05}
        roughness={0.6}
      />
    </mesh>
  );
}

/* ---------------------------------------------------
   Casa 
--------------------------------------------------- */
function Casa() {
  const paredTexture = useLoader(THREE.TextureLoader, "/assets/pared_rosada.jpg");
  const techoTexture = useLoader(THREE.TextureLoader, "/assets/techo_lila.jpg");
  const puertaTexture = useLoader(THREE.TextureLoader, "/assets/puerta_blanca.jpg");

  return (
    <group>
      {/* Bloque principal */}
      <mesh castShadow receiveShadow position={[0, 1, 0]}>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial map={paredTexture} />
      </mesh>

      {/* Techo tipo carpa */}
      <mesh position={[0, 3, 0]} castShadow>
        <coneGeometry args={[2.5, 1.7, 4]} rotation={[0, Math.PI/4, 0]} />
        <meshStandardMaterial map={techoTexture} color="#c9a0dc" />
      </mesh>

      {/* Puerta principal */}
      <mesh position={[0, 0.6, 1.55]} castShadow>
        <boxGeometry args={[0.9, 1.2, 0.1]} />
        <meshStandardMaterial map={puertaTexture} />
      </mesh>

      {/* Ventanas laterales */}
      <mesh position={[-1, 1, 1.55]}>
        <boxGeometry args={[0.4, 0.4, 0.05]} />
        <meshStandardMaterial color="#fff0f5" />
      </mesh>
      <mesh position={[1, 1, 1.55]}>
        <boxGeometry args={[0.4, 0.4, 0.05]} />
        <meshStandardMaterial color="#fff0f5" />
      </mesh>
    </group>
  );
}

/* ---------------------------------------------------
   Cruces simples hechas con dos cajas
--------------------------------------------------- */
function Cruces() {
  const textura = useLoader(THREE.TextureLoader, "/assets/piedra_difusa.jpg");

  const cruces = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x = Math.cos(angle) * 6;
    const z = Math.sin(angle) * 6;

    cruces.push(
      <group key={i} position={[x, 0, z]} castShadow>
        {/* Parte vertical */}
        <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
          <boxGeometry args={[0.2, 1, 0.2]} />
          <meshStandardMaterial map={textura} />
        </mesh>
        {/* Parte horizontal */}
        <mesh castShadow receiveShadow position={[0, 0.75, 0]}>
          <boxGeometry args={[0.6, 0.2, 0.2]} />
          <meshStandardMaterial map={textura} />
        </mesh>
      </group>
    );
  }

  return <group>{cruces}</group>;
}

/* ---------------------------------------------------
   Fantasmas 
--------------------------------------------------- */
function Fantasmas() {
  const ghost1 = useRef();
  const ghost2 = useRef();
  const ghost3 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ghost1.current.position.x = Math.cos(t * 0.5) * 4;
    ghost1.current.position.z = Math.sin(t * 0.5) * 4;
    ghost1.current.position.y = 1 + Math.sin(t * 3) * 0.3;

    ghost2.current.position.x = Math.cos(-t * 0.32) * 5;
    ghost2.current.position.z = Math.sin(-t * 0.32) * 5;
    ghost2.current.position.y = 1 + Math.sin(t * 4) * 0.3;

    ghost3.current.position.x = Math.cos(t * 0.7) * 6;
    ghost3.current.position.z = Math.sin(t * 0.7) * 6;
    ghost3.current.position.y = 1 + Math.sin(t * 5) * 0.3;
  });

  const ghostMaterial = new THREE.MeshStandardMaterial({
    color: "#ffe6f9",
    transparent: true,
    opacity: 0.7,
    roughness: 0.5,
  });

  return (
    <>
      {[ghost1, ghost2, ghost3].map((ref, idx) => (
        <group ref={ref} key={idx}>
          <mesh position={[0, 0.5, 0]} material={ghostMaterial}>
            <sphereGeometry args={[0.25, 16, 16]} />
          </mesh>
          <mesh position={[0, 0, 0]} material={ghostMaterial}>
            <coneGeometry args={[0.25, 0.8, 16]} />
          </mesh>
        </group>
      ))}
    </>
  );
}

/* ---------------------------------------------------
   Cúpula que envuelve el escenario con textura de cielo
--------------------------------------------------- */
function Cielo() {
  const texturaCielo = useLoader(THREE.TextureLoader, "/assets/cielo.jpg");
  return (
    <mesh>
      <sphereGeometry args={[50, 60, 60]} />
      <meshBasicMaterial map={texturaCielo} side={THREE.BackSide} />
    </mesh>
  );
}

/* ---------------------------------------------------
   Escena principal con luces, niebla y controles
--------------------------------------------------- */
export default function CasaEscena() {
  return (
    <Canvas
      shadows
      camera={{ position: [8, 6, 8], fov: 50 }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2("#f7d6e0", 0.05);
      }}
    >
      <Suspense fallback={null}>
        {/* Luces */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 15, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[0, 4, 0]} intensity={0.8} color="#ffb6c1" castShadow />

        {/* Objetos */}
        <Piso />
        <Casa />
        <Cruces />
        <Fantasmas />
        <Cielo />

        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}