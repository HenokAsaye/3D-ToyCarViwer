import { camera } from './initScene.js';

let angle = 0;

export function animateCamera() {
  angle += 0.003;
  camera.position.x = 10 * Math.sin(angle);
  camera.position.z = 10 * Math.cos(angle);
  camera.lookAt(0, 0, 0);
}
