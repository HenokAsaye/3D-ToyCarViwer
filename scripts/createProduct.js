import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { scene } from './initScene.js';

export function createToyCar() {
  const bodyTexture = new THREE.TextureLoader().load('assets/textures/car_body.jpg');
  const tireTexture = new THREE.TextureLoader().load('assets/textures/tire_texture.jpg');

  // Car Body
  const bodyMat = new THREE.MeshStandardMaterial({ map: bodyTexture });
  const body = new THREE.Mesh(new THREE.BoxGeometry(4, 1.5, 2), bodyMat);
  body.name = 'Car Body';
  scene.add(body);

  // Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.5, 32);
  const wheelMat = new THREE.MeshStandardMaterial({ map: tireTexture });

  const positions = [
    [-1.5, -0.75, 1],
    [1.5, -0.75, 1],
    [-1.5, -0.75, -1],
    [1.5, -0.75, -1],
  ];

  positions.forEach((pos, idx) => {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(...pos);
    wheel.name = `Wheel ${idx + 1}`;
    scene.add(wheel);
  });

  // Headlights
  const headlightMat = new THREE.MeshStandardMaterial({ color: 0xffffcc, emissive: 0xffffcc });
  const lightL = new THREE.Mesh(new THREE.SphereGeometry(0.2), headlightMat);
  lightL.position.set(2.1, 0.3, 0.5);
  lightL.name = 'Left Headlight';

  const lightR = lightL.clone();
  lightR.position.z = -0.5;
  lightR.name = 'Right Headlight';

  scene.add(lightL, lightR);
}
