// src/pages/Practica6.jsx
import React from "react";
import CasaEscena from "../components/CasaEscena";

const Practica6 = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Escenario 3D Interactivo</h2>
      <p>
        En esta entrega se construye una escena tridimensional compuesta por una
        casa principal, un entorno texturizado, iluminación variada, niebla y
        elementos animados como fantasmas que recorren el espacio. Todo esto se
        integra en un ambiente dinámico y con efectos visuales.
      </p>

      <div
        style={{
          backgroundColor: "black",
          minHeight: "100vh",
          padding: "1rem",
        }}
      >
        <CasaEscena />
      </div>
    </div>
  );
};

export default Practica6;