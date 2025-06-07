import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { camera, scene, renderer } from './initScene.js';
import { showInfo } from '../ui/infoPanel.js';

export function setupInteraction() {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      const obj = intersects[0].object;
      showInfo(obj.name);

      obj.material.emissive?.setHex(0xff0000);
      setTimeout(() => {
        obj.material.emissive?.setHex(0x000000);
      }, 500);
    }
  });
}
