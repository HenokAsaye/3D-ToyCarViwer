import { initScene, camera, renderer, controls, scene } from './initScene.js';
import { createToyCar } from './createProduct.js';
import { addLights } from './addLighting.js';
import { setupInteraction } from './interaction.js';
import { animateCamera } from './cameraAnimation.js';
import { startAnimationLoop } from './animationLoop.js';

initScene();
addLights();
createToyCar();
setupInteraction();
startAnimationLoop();
animateCamera();