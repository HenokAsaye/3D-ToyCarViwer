// Import necessary modules and functions from other JavaScript files.

// initScene: Initializes the Three.js scene, camera, and renderer.
// camera, renderer, controls, scene: Exported objects from initScene for potential use elsewhere, though not directly used in this file's top level.
import { initScene, camera, renderer, controls, scene } from './initScene.js';

// createToyCar: Function to create and add the 3D toy car model to the scene.
import { createToyCar } from './createProduct.js';

// addLights: Function to add lighting (e.g., ambient, directional) to the scene.
import { addLights } from './addLighting.js';

// setupInteraction: Function to set up user interactions, possibly including mouse controls or UI elements.
import { setupInteraction } from './interaction.js';

// animateCamera: Function to handle camera animations or specific camera movements.
import { animateCamera } from './cameraAnimation.js';

// startAnimationLoop: Function to start the main rendering/animation loop.
import { startAnimationLoop } from './animationLoop.js';

// --- Application Initialization ---
// The following functions are called in sequence to set up and run the 3D application.

// 1. Initialize the basic scene, camera, and renderer.
initScene();

// 2. Add lights to the scene to illuminate the objects.
addLights();

// 3. Create the 3D toy car model and add it to the scene.
createToyCar();

// 4. Set up any interactive elements or controls.
setupInteraction();

// 5. Start the animation loop that will render the scene on each frame.
startAnimationLoop();

// 6. Start any specific camera animations or initial camera positioning sequences.
// Note: Depending on implementation, this might conflict or complement OrbitControls if not managed carefully.
animateCamera();