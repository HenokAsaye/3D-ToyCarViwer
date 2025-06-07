3D Toy Car Viewer

An interactive 3D product viewer application built with Three.js. Users can explore a toy car constructed entirely from basic geometries, interact with it using mouse controls, and watch the camera automatically orbit around the product.

 Features

- Three.js scene setup with PerspectiveCamera and WebGLRenderer
- Responsive canvas that adapts to window resizing
- Toy car model built from boxes, cylinders, and other primitives
- Realistic materials using MeshStandardMaterial and MeshPhysicalMaterial with textures for color, normal, and roughness
- Ambient and directional lighting for realism
- OrbitControls for zooming, panning, and rotating the view
- Raycasting for mouse interaction; clicking on car parts shows an info panel
- Headlights and taillights with emissive materials
- Animated camera smoothly orbits around the car
- Modular code structure for maintainability

Project Structure

- `index.html` — Main HTML file with canvas and info panel
- `style/style.css` — Styles for the viewer and info panel
- `scripts/`
  - `main.js` — Entry point, initializes and runs the app
  - `initScene.js` — Sets up the Three.js scene, camera, renderer, and controls
  - `createProduct.js` — Builds the toy car from basic meshes and applies textures
  - `addLighting.js` — Adds ambient and directional lights
  - `interaction.js` — Handles raycasting and user interaction
  - `cameraAnimation.js` — Animates the camera to orbit the product
  - `OrbitControls.js` — OrbitControls module
  - `three.module.js` — Three.js ES module
- `assets/textures/` — Texture files for the car body and tires
- `ui/infoPanel.js` — UI logic for the info panel

How to Run

1. Download or clone the repository
2. Ensure all dependencies and textures are present in the correct folders
3. Open `index.html` in a modern web browser

The viewer will display a 3D toy car. You can rotate, zoom, and pan with the mouse. Clicking on parts of the car will show their names. The camera will automatically orbit around the car unless interrupted by user interaction.
