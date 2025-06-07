import * as THREE from './three.module.js';
import { scene } from './initScene.js';

export function createToyCar() {
  const bodyColor = new THREE.TextureLoader().load('assets/textures/car_body_color.jpg');
  const bodyNormal = new THREE.TextureLoader().load('assets/textures/car_body_normal.jpg');
  const bodyRough = new THREE.TextureLoader().load('assets/textures/car_body_roughness.jpg');
  const tireColor = new THREE.TextureLoader().load('assets/textures/tire_color.jpg');
  const tireNormal = new THREE.TextureLoader().load('assets/textures/tire_normal.jpg');
  const tireRough = new THREE.TextureLoader().load('assets/textures/tire_roughness.jpg');

  const bodyMat = new THREE.MeshStandardMaterial({
    map: bodyColor,
    normalMap: bodyNormal,
    roughnessMap: bodyRough,
    metalness: 0.3,
    roughness: 0.7
  });
  const body = new THREE.Mesh(new THREE.BoxGeometry(4, 1.5, 2), bodyMat);
  body.position.y = 0.5;
  body.name = 'Car Body';
  scene.add(body);

  
  const windowMat = new THREE.MeshPhysicalMaterial({
    color: 0x99ccff,
    transparent: true,
    opacity: 0.5,
    metalness: 0.1,
    roughness: 0.1
  });
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.6, 0.05), windowMat);
  windshield.position.set(0, 1, 1.03);
  windshield.name = 'Windshield';
  scene.add(windshield);
  const rearwindow = windshield.clone();
  rearwindow.position.z = -1.03;
  scene.add(rearwindow);
  const leftwindow = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.6, 1.8), windowMat);
  leftwindow.position.set(-1.25, 1, 0);
  scene.add(leftwindow);
  const rightwindow = leftwindow.clone();
  rightwindow.position.x = 1.25;
  scene.add(rightwindow);

  
  const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.5, 32);
  const wheelMat = new THREE.MeshStandardMaterial({
    map: tireColor,
    normalMap: tireNormal,
    roughnessMap: tireRough,
    metalness: 0.2,
    roughness: 0.8
  });
  const positions = [
    [-1.5, -0.3, 1],
    [1.5, -0.3, 1],
    [-1.5, -0.3, -1],
    [1.5, -0.3, -1],
  ];
  positions.forEach((pos, idx) => {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(...pos);
    wheel.name = `Wheel ${idx + 1}`;
    scene.add(wheel);
  });


  const headlightMat = new THREE.MeshPhysicalMaterial({ color: 0xffffcc, emissive: 0xffffbb, metalness: 0.7, roughness: 0.3 });
  const headlight1 = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.12, 32), headlightMat);
  headlight1.rotation.x = Math.PI / 2;
  headlight1.position.set(-0.7, 0.7, 1.06);
  scene.add(headlight1);
  const headlight2 = headlight1.clone();
  headlight2.position.x = 0.7;
  scene.add(headlight2);

  
  const taillightMat = new THREE.MeshPhysicalMaterial({ color: 0xff3333, emissive: 0xaa0000, metalness: 0.7, roughness: 0.3 });
  const taillight1 = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.12, 32), taillightMat);
  taillight1.rotation.x = Math.PI / 2;
  taillight1.position.set(-0.7, 0.7, -1.06);
  scene.add(taillight1);
  const taillight2 = taillight1.clone();
  taillight2.position.x = 0.7;
  scene.add(taillight2);
}

