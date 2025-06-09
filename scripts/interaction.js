// Import necessary Three.js modules
import * as THREE from './three.module.js';
// Import camera, scene from initScene.js for raycasting and object intersection
import { camera, scene } from './initScene.js'; 
// Import UI function to display information about clicked objects
import { showInfo } from '../ui/infoPanel.js';

/**
 * Sets up mouse click interactions for the 3D scene.
 * When an object is clicked, its name is displayed, and it's briefly highlighted.
 */
export function setupInteraction() {
  // Raycaster is used to detect intersections between mouse clicks and objects in the scene.
  const raycaster = new THREE.Raycaster();
  // Vector2 to store normalized mouse coordinates.
  const mouse = new THREE.Vector2();

  // Add an event listener for 'click' events on the window.
  window.addEventListener('click', (event) => {
    // Calculate normalized device coordinates (NDC) for the mouse position.
    // (x and y range from -1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position.
    raycaster.setFromCamera(mouse, camera);

    // Find all objects in the scene that intersect with the ray.
    // 'scene.children' gets all top-level objects; for nested objects, pass the specific group or use recursive search.
    const intersects = raycaster.intersectObjects(scene.children, true); // Set recursive to true if car parts are nested in carGroup

    // Check if any objects were intersected.
    if (intersects.length > 0) {
      // Get the first intersected object (the closest one to the camera).
      const intersectedObject = intersects[0].object;
      
      // Display information about the clicked object (e.g., its name).
      // This assumes the object has a 'name' property assigned during its creation.
      if (intersectedObject.name) {
        showInfo(intersectedObject.name);
      }

      // Briefly highlight the clicked object by changing its emissive color.
      // Check if the material has an 'emissive' property before trying to set it.
      if (intersectedObject.material && typeof intersectedObject.material.emissive !== 'undefined') {
        const originalEmissive = intersectedObject.material.emissive.getHex();
        intersectedObject.material.emissive.setHex(0xff0000); // Set emissive to red

        // Revert the emissive color after a short delay.
        setTimeout(() => {
          intersectedObject.material.emissive.setHex(originalEmissive); // Restore original emissive color
        }, 500); // 500 milliseconds delay
      }
    }
  });
}

