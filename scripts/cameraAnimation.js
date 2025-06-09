// Import the camera object from initScene.js to manipulate its position and orientation
import { camera } from './initScene.js';

// Initialize an angle variable used to calculate the camera's circular path.
// This variable is kept in the module scope to persist its value across animation frames.
let angle = 0;

/**
 * Animates the camera to orbit around the scene's origin (0,0,0).
 * This function is typically called in the main animation loop.
 */
export function animateCamera() {
  // Increment the angle slightly on each frame to create continuous motion.
  // The value 0.003 controls the speed of the orbit; smaller values mean slower animation.
  angle += 0.003;

  // Calculate the new X and Z positions for the camera using sine and cosine functions.
  // This creates a circular path around the Y-axis at a radius of 10 units.
  camera.position.x = 10 * Math.sin(angle);
  camera.position.z = 10 * Math.cos(angle);
  // The camera's Y position remains unchanged by this specific animation, 
  // but it would have been set during initialization (e.g., camera.position.set(5, 5, 10) in initScene.js).

  // Make the camera always look at the origin of the scene (0,0,0).
  // This ensures the center of the scene remains in focus as the camera orbits.
  camera.lookAt(0, 0, 0);
}

