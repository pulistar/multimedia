import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import GUI from 'lil-gui';
import React, { useRef } from 'react';
import * as THREE from 'three';

function MaterialScene() {
  // Referencias para los objetos
  const sphereRef = useRef();
  const cubeRef = useRef();

  // Tipos de materiales para experimentación
  const materialTypes = {
    Standard: THREE.MeshStandardMaterial,
    Phong: THREE.MeshPhongMaterial,
    Lambert: THREE.MeshLambertMaterial
  };

  // Estado inicial de materiales y propiedades
  const [currentMaterialType, setCurrentMaterialType] = React.useState('Standard');
  const [materialProperties, setMaterialProperties] = React.useState({
    color: 0x00ff00,
    metalness: 0.5,
    roughness: 0.5
  });

  // Configuración de GUI
  React.useEffect(() => {
    const gui = new GUI();

    // Carpeta de selección de material
    const materialFolder = gui.addFolder('Material Type');
    materialFolder.add(
      { 
        Material: currentMaterialType 
      }, 
      'Material', 
      ['Standard', 'Phong', 'Lambert']
    ).onChange((value) => {
      setCurrentMaterialType(value);
    });

    // Carpeta de propiedades de material
    const propertiesFolder = gui.addFolder('Material Properties');
    propertiesFolder.addColor(materialProperties, 'color')
      .name('Color')
      .onChange((value) => {
        setMaterialProperties(prev => ({ ...prev, color: value }));
      });

    propertiesFolder.add(materialProperties, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((value) => {
        setMaterialProperties(prev => ({ ...prev, metalness: value }));
      });

    propertiesFolder.add(materialProperties, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value) => {
        setMaterialProperties(prev => ({ ...prev, roughness: value }));
      });

    return () => gui.destroy();
  }, []);

  // Animación de objetos
  useFrame((state, delta) => {
    if (sphereRef.current && cubeRef.current) {
      sphereRef.current.rotation.y += delta * 0.2;
      cubeRef.current.rotation.y += delta * 0.2;
    }
  });

  // Crear material dinámicamente
  const createMaterial = () => {
    const MaterialClass = materialTypes[currentMaterialType];
    return new MaterialClass({
      color: materialProperties.color,
      metalness: currentMaterialType === 'Standard' ? materialProperties.metalness : undefined,
      roughness: currentMaterialType === 'Standard' ? materialProperties.roughness : undefined
    });
  };

  return (
    <>
      {/* Luces */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />

      {/* Plano base */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -2, 0]} 
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.3} />
      </mesh>

      {/* Esfera */}
      <mesh 
        ref={sphereRef} 
        position={[-2, 0, 0]} 
        castShadow 
        receiveShadow
      >
        <sphereGeometry args={[1, 32, 32]} />
        <primitive object={createMaterial()} attach="material" />
      </mesh>

      {/* Cubo */}
      <mesh 
        ref={cubeRef} 
        position={[2, 0, 0]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <primitive object={createMaterial()} attach="material" />
      </mesh>

      {/* Controles de órbita */}
      <OrbitControls />
    </>
  );
}

function Practica5() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas shadows>
        <MaterialScene />
      </Canvas>
    </div>
  );
}

export default Practica5;
