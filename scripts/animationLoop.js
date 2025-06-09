// Import necessary components from initScene.js: renderer, scene, camera, and controls.
import { renderer, scene, camera, controls } from './initScene.js';
// Import the animateCamera function to update camera position in each frame.
import { animateCamera } from './cameraAnimation.js';

/**
 * Starts the main animation loop for the Three.js scene.
 * This function sets up a recursive loop using requestAnimationFrame to render the scene continuously.
 */
export function startAnimationLoop() {
  /**
   * The core animation function that gets called on every frame.
   */
  function animate() {
    // Request the browser to call 'animate' again on the next available frame.
    // This creates a smooth animation loop.
    requestAnimationFrame(animate);

    // Call the camera animation function to update its position or orientation.
    animateCamera();

    // Update the OrbitControls. This is necessary if damping is enabled or if controls are auto-rotating.
    controls.update();

    // Render the scene from the perspective of the camera.
    renderer.render(scene, camera);
  }
  
  // Initial call to start the animation loop.
  animate();
}

