// Import necessary Three.js modules
import * as THREE from './three.module.js';
// Import the scene object from initScene.js to add lights to it
import { scene } from './initScene.js';

/**
 * Adds lighting to the Three.js scene.
 * This includes an ambient light for overall illumination and a directional light for shadows and highlights.
 */
export function addLights() {
  // Ambient Light: Provides a soft, even illumination to all objects in the scene.
  // Color: 0xffffff (white)
  // Intensity: 0.4 (a subtle amount of light)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight); // Add the ambient light to the scene

  // Directional Light: Simulates light from a distant source, like the sun.
  // It casts parallel rays and can create shadows (if configured).
  // Color: 0xffffff (white)
  // Intensity: 1 (stronger light source)
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  // Set the position of the directional light. This determines the direction of the light rays.
  dirLight.position.set(5, 10, 7.5); // Positioned to cast light from an upper angle
  scene.add(dirLight); // Add the directional light to the scene
}

