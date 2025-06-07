import { renderer, scene, camera, controls } from './initScene.js';
import { animateCamera } from './cameraAnimation.js';

export function startAnimationLoop() {
  function animate() {
    requestAnimationFrame(animate);
    animateCamera();
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}
