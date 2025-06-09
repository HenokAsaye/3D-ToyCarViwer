// Import necessary Three.js modules
import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js'; // Camera control library

// Declare variables to be exported and used by other modules
export let camera, scene, renderer, controls;

/**
 * Initializes the Three.js scene, camera, renderer, and orbit controls.
 */
export function initScene() {
  // Get the canvas element from the HTML
  const canvas = document.querySelector('#webglCanvas');

  // Create a new Three.js scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff); // Set background color to white

  // Create a perspective camera
  // Parameters: FOV, aspect ratio, near clipping plane, far clipping plane
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(5, 5, 10); // Set initial camera position

  // Create a WebGL renderer
  // Parameters: canvas to render on, antialiasing enabled
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight); // Set renderer size to window size
  // Enable shadow mapping in the renderer (if you plan to use shadows)
  // renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: softer shadows

  // Initialize OrbitControls for camera manipulation
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Enable smooth camera movement (damping)
  controls.dampingFactor = 0.05;
  // controls.minDistance = 5; // Optional: set min zoom distance
  // controls.maxDistance = 50; // Optional: set max zoom distance
  // controls.maxPolarAngle = Math.PI / 2 - 0.05; // Optional: prevent camera from going below ground

  // Add an event listener for window resize to update camera and renderer
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // Update camera projection matrix on resize
    renderer.setSize(window.innerWidth, window.innerHeight); // Update renderer size
  });
}
