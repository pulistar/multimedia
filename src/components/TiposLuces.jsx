import { useLoader } from "@react-three/fiber";
import GUI from 'lil-gui'; //controlar la intensidad de la luz ambiental
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeScene = () => {
    const gltf = useLoader(GLTFLoader, "/assets/RobotExpressive.glb");
    const mountRef = useRef(null);

    useEffect(() => {
        // Verificar que el elemento existe
        if (!mountRef.current) return;

        /**
         * Base
         */
        const scene = new THREE.Scene();

        // Tamaño
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        /**
         * Camera
         */
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.set(1, 1, 2);
        scene.add(camera);

        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // Agregar el modelo GLB a la escena
        scene.add(gltf.scene);

        // Asegurar que el modelo se renderice con las luces y sombras
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // Posicionar el modelo en la escena
        gltf.scene.position.set(0.5, -0.7, -1);
        gltf.scene.scale.set(0.3, 0.3, 0.3);


        /**
         * Lights
         */
        // Luz ambiental: color verdoso, intensidad más alta
        const ambientLight = new THREE.AmbientLight(0x00ff00, 1.5); // Verde intenso, mayor intensidad
        scene.add(ambientLight);

        // Luz direccional: color azul, posición diferente, intensidad reducida
        const directionalLight = new THREE.DirectionalLight(0x0000ff, 0.3); // Azul, intensidad más baja
        directionalLight.position.set(-2, 2, -1); // Cambio de posición
        scene.add(directionalLight);

        const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 0.6);
        scene.add(hemisphereLight);

        // Luz puntual: color magenta, mayor distancia, intensidad más alta
        const pointLight = new THREE.PointLight(0xff00ff, 2, 20, 1); // Magenta, más intensa
        pointLight.position.set(1, 2, 2); // Cambio de posición
        scene.add(pointLight);

        const spotLight = new THREE.SpotLight(0x78ff00, 2, 10, Math.PI * 0.1, 0.25, 1);
        spotLight.position.set(0, 2, 3);
        scene.add(spotLight);

        RectAreaLightUniformsLib.init();
        const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 5, 3, 3);
        rectAreaLight.position.set(-1.5, 0, 1.5);
        scene.add(rectAreaLight);

        /**
         * Helpers
         */
        const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2);
        scene.add(hemisphereLightHelper);

        const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
        scene.add(directionalLightHelper);

        const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
        scene.add(pointLightHelper);

        const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
        scene.add(rectAreaLightHelper);
        /**
         * Objects
         */
        const material = new THREE.MeshStandardMaterial({ roughness: 0.4 });

        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
        sphere.position.x = -1.5;

        const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);
        const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 64), material);
        torus.position.x = 1.5;

        const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
        plane.rotation.x = -Math.PI * 0.5;
        plane.position.y = -0.65;

        scene.add(sphere, cube, torus, plane);

        /**
         * Controls
         */
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        /**
         * GUI (Lil-GUI)
         */
        const gui = new GUI();
        // Luz ambiental: intensidad y color
        gui.add(ambientLight, "intensity", 0, 3, 0.1).name("Ambient Intensity");
        gui.addColor({ color: ambientLight.color.getHex() }, "color")
            .name("Ambient Color")
            .onChange((value) => ambientLight.color.set(value));

        // Luz puntual: intensidad
        gui.add(pointLight, "intensity", 0, 5, 0.1).name("Point Intensity");

        /**
         * Resize Handling
         */
        const handleResize = () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        window.addEventListener('resize', handleResize);


        /**
         * Animate
         */
        const clock = new THREE.Clock();
        const tick = () => {
            const elapsedTime = clock.getElapsedTime();

            sphere.rotation.y = 0.1 * elapsedTime;
            cube.rotation.y = 0.1 * elapsedTime;
            torus.rotation.y = 0.1 * elapsedTime;

            sphere.rotation.x = 0.15 * elapsedTime;
            cube.rotation.x = 0.15 * elapsedTime;
            torus.rotation.x = 0.15 * elapsedTime;

            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(tick);
        };
        tick();

        /**
         * Cleanup on Unmount
         */
        return () => {
            gui.destroy();
            window.removeEventListener('resize', handleResize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} />;
};

export default ThreeScene;