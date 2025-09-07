import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

// Componente para crear grupos con 3 objetos diferentes
const Objgrupo = ({ rotation = [0, 0, 0], position = [0, 0, 0], scale = [1, 1, 1] }) => {
  return (
    <group rotation={rotation} position={position} scale={scale}>
      {/* Objeto 1: Cubo */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Objeto 2: Esfera */}
      <mesh position={[2.5, 0, 0]}>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* Objeto 3: Cilindro */}
      <mesh position={[-2.5, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </group>
  );
};

const Practica1 = () => {
  const [preset, setPreset] = useState("warehouse");

  const presets = ["warehouse", "studio", "sunset"];

  return (
    <div style={{ padding: "2rem" }}>
      <h3>Práctica-1: Agrupación de Elementos con @react-three/fiber</h3>
      
      {/* Botones para cambiar presets */}
      <div style={{ marginBottom: "1rem" }}>
        <strong>Preset del Environment: </strong>
        {presets.map((presetOption) => (
          <button
            key={presetOption}
            onClick={() => setPreset(presetOption)}
            style={{
              margin: "0 0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: preset === presetOption ? "#007bff" : "#f8f9fa",
              color: preset === presetOption ? "white" : "black",
              border: "1px solid #dee2e6",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            {presetOption}
          </button>
        ))}
      </div>

      <div style={{ height: "600px" }}>
        <Canvas
          style={{ position: "fixed", width: "100vw", height: "100vh" }}
          camera={{ position: [12, 8, 12], fov: 40 }}
        >
          <axesHelper args={[3]} />
          <Environment preset={preset} />

          {/* Grupo 1: Rotación 8 grados */}
          <Objgrupo
            position={[0, 4, 0]}
            rotation={[(8 * Math.PI) / 180, 0, 0]}
          />

          {/* Grupo 2: Rotación 10 grados */}
          <Objgrupo
            position={[0, 0, 0]}
            rotation={[(10 * Math.PI) / 180, 0, 0]}
          />

          {/* Grupo 3: Rotación 15 grados */}
          <Objgrupo
            position={[0, -4, 0]}
            rotation={[(15 * Math.PI) / 180, 0, 0]}
          />

          <OrbitControls enableRotate={true} />
        </Canvas>
      </div>
    </div>
  );
};

export default Practica1;