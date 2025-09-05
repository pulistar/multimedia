import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import Objgrupo from "../components/objgrupo";

const Ejercicio4 = () => {
  const [preset, setPreset] = useState("warehouse");

  const presets = ["warehouse", "sunset", "forest", "city"];

  const handlePresetChange = () => {
    const currentIndex = presets.indexOf(preset);
    const nextIndex = (currentIndex + 1) % presets.length;
    setPreset(presets[nextIndex]);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h3>Agrupacion de Elementos con @react-three/fiber</h3>
      <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "10px" }}>
        <button onClick={handlePresetChange}>
          Cambiar Preset
        </button>
        <span>Preset Actual: {preset}</span>
      </div>

      <div style={{ height: "600px" }}>
        <Canvas
          className="position-absolute w-100 h-100"
          style={{ position: "fixed", width: "100vw", height: "100vh" }}
          camera={{ position: [10, 5, 10], fov: 40 }}
        >
          <axesHelper args={[2]} />
          <Environment preset={preset} />
          <Objgrupo/>
          <OrbitControls enableRotate={true} />
        </Canvas>
      </div>
    </div>
  );
};

export default Ejercicio4;
