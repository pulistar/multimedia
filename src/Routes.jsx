// src/app/router.jsx
import React from "react";
import Efectos from "./pages/Efectos";
import Ejercicio1 from "./pages/Ejercicio1";
import Ejercicio2 from "./pages/Ejercicio2";
import Ejercicio3 from "./pages/Ejercicio3";
import Ejercicio4 from "./pages/Ejercicio4";
import Ejercicio5 from "./pages/Ejercicio5";
import Inicio from "./pages/Inicio";
import Laboratorio1 from "./pages/Laboratorio1";
import Luces from "./pages/Luces";
import Practica1 from "./pages/practica1";
import Practica2 from "./pages/Practica2";
import Practica3 from "./pages/Practica3";
import Practica4 from "./pages/Practica4";
import Practica5 from "./pages/Practica5";
import Practica6 from "./pages/Practica6";
import Sombras from "./pages/Sombras";


const routes = [
  { path: "/", element: <Inicio />, index: true },
  { path: "ejercicio1", element: <Ejercicio1 /> },
  { path: "ejercicio2", element: <Ejercicio2 /> },
  { path: "ejercicio3", element: <Ejercicio3 /> },
  { path: "ejercicio4", element: <Ejercicio4 /> },
  { path: "ejercicio5", element: <Ejercicio5 /> },
  { path: "luces", element: <Luces /> },
  { path: "sombras", element: <Sombras /> },
  { path: "efectos", element: <Efectos /> },
  { path: "laboratorio1", element: <Laboratorio1 /> },
  { path: "Practica2", element: <Practica2 /> },
  { path: "Practica3", element: <Practica3 /> },
  { path: "Practica4", element: <Practica4 /> },
  { path: "Practica1", element: <Practica1 /> },
  { path: "Practica6", element: <Practica6 /> },
  { path: "Practica5", element: <Practica5 /> },
];

export default routes;
