import GUI from 'lil-gui';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Practica4() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Verificar que el elemento existe
    if (!mountRef.current) return;

    // Escena
    const scene = new THREE.Scene();

    // Tamaño
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Cámara
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(1, 1, 2);
    scene.add(camera);

    // Renderizador
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Cargar modelo
    const loader = new GLTFLoader();
    let model;
    loader.load('/assets/RobotExpressive.glb', (gltf) => {
      model = gltf.scene;
      model.position.set(0.5, -0.7, -1);
      model.scale.set(0.3, 0.3, 0.3);
      scene.add(model);
    });

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffcc00, 0.7);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff9000, 1, 10);
    pointLight.position.set(0, 1, 1);
    scene.add(pointLight);

    // Controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // crear una nueva instancia de la interfaz gráfica de usuario (GUI)
    // permite crear controles interactivos para modificar propiedades en tiempo real
    const gui = new GUI();

    // Control de intensidad de luz ambiental
    // - Añade un control deslizante para ajustar la intensidad
    gui.add(ambientLight, "intensity", 0, 3, 0.1).name("Ambient Intensity");

    // Control de color de luz ambiental
    // - Añade un selector de color para la luz ambiental
    // - Permite cambiar el color en tiempo real
    // - Actualiza el color de la luz cuando se selecciona uno nuevo
    gui.addColor({ color: ambientLight.color.getHex() }, "color")
      .name("Ambient Color")
      .onChange((value) => ambientLight.color.set(value));

    // Control de intensidad de luz puntual
    // - Añade un control deslizante para ajustar la intensidad de la luz puntual
    gui.add(pointLight, "intensity", 0, 5, 0.1).name("Point Intensity");

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handling
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      gui.destroy();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '100vh', 
        position: 'fixed', 
        top: 0, 
        left: 0 
      }} 
    />
  );
}

export default Practica4;
