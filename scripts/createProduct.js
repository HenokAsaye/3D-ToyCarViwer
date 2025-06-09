// Import necessary Three.js modules
import * as THREE from './three.module.js';
// Import the scene object from initScene.js to add the car to it
import { scene } from './initScene.js';

/**
 * Creates and adds a 3D toy car model to the scene.
 * The car is constructed from various geometric primitives and materials.
 */
export function createToyCar() {
  // --- Texture Loading ---
  // Load textures for different parts of the car to give them a more realistic appearance.
  const textureLoader = new THREE.TextureLoader();
  const bodyColor = textureLoader.load('assets/textures/car_body_color.jpg');
  const bodyNormal = textureLoader.load('assets/textures/car_body_normal.jpg');
  const bodyRough = textureLoader.load('assets/textures/car_body_roughness.jpg');
  const tireColor = textureLoader.load('assets/textures/tire_color.jpg');
  const tireNormal = textureLoader.load('assets/textures/tire_normal.jpg');
  const tireRough = textureLoader.load('assets/textures/tire_roughness.jpg');

  // --- Car Group ---
  // Create a group to hold all parts of the car. This allows moving/rotating the car as a single unit.
  const carGroup = new THREE.Group();
  carGroup.name = 'Toy Car'; // Assign a name for easier identification in the scene graph

  // --- Materials Definition ---
  // Define materials for different components of the car.

  // Material for the car body, using loaded textures
  const bodyMat = new THREE.MeshStandardMaterial({
    map: bodyColor,       // Color texture
    normalMap: bodyNormal,  // Normal map for surface detail
    roughnessMap: bodyRough, // Roughness map for light scattering
    metalness: 0.3,       // How metallic the surface appears
    roughness: 0.7        // How rough the surface appears
  });

  // Material for the car windows (transparent and reflective)
  const windowMat = new THREE.MeshPhysicalMaterial({
    color: 0x99ccff,      // Light blue color
    transparent: true,    // Enable transparency
    opacity: 0.5,         // Set opacity level
    metalness: 0.1,
    roughness: 0.1,
    side: THREE.DoubleSide // Render both sides, important for thin geometries like windows
  });

  // Material for the car wheels, using loaded textures
  const wheelMat = new THREE.MeshStandardMaterial({
    map: tireColor,
    normalMap: tireNormal,
    roughnessMap: tireRough,
    metalness: 0.2,
    roughness: 0.8
  });

  // Material for headlights (emissive for a glowing effect)
  const headlightMat = new THREE.MeshPhysicalMaterial({ 
    color: 0xffffcc,      // Light yellow color
    emissive: 0xffffbb,   // Emissive color to simulate light emission
    metalness: 0.7, 
    roughness: 0.3 
  });

  // Material for taillights (emissive red)
  const taillightMat = new THREE.MeshPhysicalMaterial({ 
    color: 0xff3333,      // Red color
    emissive: 0xaa0000,   // Darker red emissive color
    metalness: 0.7, 
    roughness: 0.3 
  });

  // --- Car Body Parts ---
  // Define dimensions and create geometries for various car parts.

  // Define wheel dimensions early as they are used in body positioning calculations
  const wheelRadius = 0.4;
  const wheelWidth = 0.2; // Making wheels a bit thinner than the original 0.5

  // Main lower body (chassis)
  const mainBodyWidth = 1.8;  // Width of the chassis
  const mainBodyHeight = 0.8; // Height of the chassis
  const mainBodyLength = 4.0; // Length of the chassis
  const mainBodyGeo = new THREE.BoxGeometry(mainBodyWidth, mainBodyHeight, mainBodyLength);
  const mainBodyMesh = new THREE.Mesh(mainBodyGeo, bodyMat);
  // Position the chassis so its bottom aligns with the wheel axles
  mainBodyMesh.position.y = wheelRadius + (mainBodyHeight / 2); 
  mainBodyMesh.name = 'Car Chassis';
  carGroup.add(mainBodyMesh); // Add chassis to the car group

  // Cabin (upper part of the car body)
  const cabinWidth = 1.6;
  const cabinHeight = 0.7;
  const cabinLength = 2.2;
  const cabinGeo = new THREE.BoxGeometry(cabinWidth, cabinHeight, cabinLength);
  const cabinMesh = new THREE.Mesh(cabinGeo, bodyMat);
  // Position the cabin on top of the main body, slightly forward
  cabinMesh.position.y = mainBodyMesh.position.y + (mainBodyHeight / 2) + (cabinHeight / 2);
  cabinMesh.position.z = 0.2; // Offset cabin slightly forward from the chassis center
  cabinMesh.name = 'Car Cabin';
  carGroup.add(cabinMesh);

  // Windows
  // Windshield
  const windshieldWidth = 1.4;
  const windshieldHeight = 0.5;
  const windshieldDepth = 0.05; // Thin geometry for the window pane
  const windshieldGeo = new THREE.BoxGeometry(windshieldWidth, windshieldHeight, windshieldDepth);
  const windshield = new THREE.Mesh(windshieldGeo, windowMat);
  windshield.position.set(
    cabinMesh.position.x, // Centered with the cabin's x-position
    cabinMesh.position.y + (cabinHeight / 2) * 0.3, // Positioned on the upper front part of the cabin
    cabinMesh.position.z + (cabinLength / 2) - (windshieldDepth / 2) + 0.05 // Slightly forward on the cabin face
  );
  windshield.rotation.x = -Math.PI / 7; // Apply a slope (approx 25 degrees)
  windshield.name = 'Windshield';
  carGroup.add(windshield);

  // Rear Window
  const rearWindowWidth = 1.4;
  const rearWindowHeight = 0.45;
  const rearWindowDepth = 0.05;
  const rearWindowGeo = new THREE.BoxGeometry(rearWindowWidth, rearWindowHeight, rearWindowDepth);
  const rearWindow = new THREE.Mesh(rearWindowGeo, windowMat);
  rearWindow.position.set(
    cabinMesh.position.x,
    cabinMesh.position.y + (cabinHeight / 2) * 0.2, // Positioned on the upper rear part of the cabin
    cabinMesh.position.z - (cabinLength / 2) + (rearWindowDepth / 2) - 0.05 // Slightly backward on the cabin face
  );
  rearWindow.rotation.x = Math.PI / 8; // Apply a slope (approx 22 degrees, inward at the top)
  rearWindow.name = 'Rear Window';
  carGroup.add(rearWindow);

  // Side Windows (Left and Right)
  const sideWindowWidth = 0.05; // Thin geometry for side windows
  const sideWindowHeight = 0.4;
  const sideWindowLength = 1.2; // Length along the Z-axis of the car (side of the cabin)
  const sideWindowGeo = new THREE.BoxGeometry(sideWindowWidth, sideWindowHeight, sideWindowLength);
  
  // Left Side Window
  const leftWindow = new THREE.Mesh(sideWindowGeo, windowMat);
  leftWindow.position.set(
    cabinMesh.position.x - (cabinWidth / 2) + (sideWindowWidth / 2), // Position on the left side of the cabin
    cabinMesh.position.y + (cabinHeight / 2) * 0.1, // Centered vertically on the cabin's upper part
    cabinMesh.position.z // Centered along the cabin's length (z-offset)
  );
  leftWindow.name = 'Left Window';
  carGroup.add(leftWindow);

  // Right Side Window (cloned or created similarly to the left)
  const rightWindow = new THREE.Mesh(sideWindowGeo, windowMat);
  rightWindow.position.set(
    cabinMesh.position.x + (cabinWidth / 2) - (sideWindowWidth / 2), // Position on the right side of the cabin
    leftWindow.position.y, // Same Y-position as the left window
    leftWindow.position.z  // Same Z-position as the left window
  );
  rightWindow.name = 'Right Window';
  carGroup.add(rightWindow);

  // Wheels (Main four wheels)
  // wheelRadius and wheelWidth are defined earlier in the script
  const wheelGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 32); // Cylinder geometry for wheels (32 segments for smoothness)
  
  // Define positions for the four wheels relative to the car's body
  const wheelPositions = [
    { x: -(mainBodyWidth / 2 - wheelWidth / 2 - 0.05), y: wheelRadius, z: (mainBodyLength / 2) - wheelRadius * 1.5, name: 'Front Left Wheel' },
    { x: (mainBodyWidth / 2 - wheelWidth / 2 - 0.05), y: wheelRadius, z: (mainBodyLength / 2) - wheelRadius * 1.5, name: 'Front Right Wheel' },
    { x: -(mainBodyWidth / 2 - wheelWidth / 2 - 0.05), y: wheelRadius, z: -(mainBodyLength / 2) + wheelRadius * 1.5, name: 'Rear Left Wheel' },
    { x: (mainBodyWidth / 2 - wheelWidth / 2 - 0.05), y: wheelRadius, z: -(mainBodyLength / 2) + wheelRadius * 1.5, name: 'Rear Right Wheel' },
  ];

  // Create and position each wheel
  wheelPositions.forEach(posData => {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.rotation.z = Math.PI / 2; // Rotate cylinder to stand upright as a wheel
    wheel.position.set(posData.x, posData.y, posData.z);
    wheel.name = posData.name;
    carGroup.add(wheel);
  });

  // Headlights (Left and Right)
  const headlightRadius = 0.13;
  const headlightDepth = 0.12;
  const headlightGeo = new THREE.CylinderGeometry(headlightRadius, headlightRadius, headlightDepth, 32);
  
  // Calculate common Y and Z positions for headlights based on the main body
  const headlightY = mainBodyMesh.position.y + (mainBodyHeight / 2) - headlightRadius * 1.2;
  const headlightZ = mainBodyMesh.position.z + (mainBodyLength / 2) - (headlightDepth / 2);
  const headlightXOffset = mainBodyWidth / 2 * 0.5; // Offset from the center for each headlight

  const headlight1 = new THREE.Mesh(headlightGeo, headlightMat);
  headlight1.rotation.x = Math.PI / 2; // Rotate to point forward
  headlight1.position.set(-headlightXOffset, headlightY, headlightZ);
  headlight1.name = 'Headlight Left';
  carGroup.add(headlight1);

  const headlight2 = new THREE.Mesh(headlightGeo, headlightMat);
  headlight2.rotation.x = Math.PI / 2;
  headlight2.position.set(headlightXOffset, headlightY, headlightZ);
  headlight2.name = 'Headlight Right';
  carGroup.add(headlight2);

  // Taillights (Left and Right)
  const taillightRadius = 0.13;
  const taillightDepth = 0.12;
  const taillightGeo = new THREE.CylinderGeometry(taillightRadius, taillightRadius, taillightDepth, 32);

  // Calculate common Y and Z positions for taillights
  const taillightY = mainBodyMesh.position.y + (mainBodyHeight / 2) - taillightRadius * 1.2;
  const taillightZ = mainBodyMesh.position.z - (mainBodyLength / 2) + (taillightDepth / 2);
  const taillightXOffset = mainBodyWidth / 2 * 0.6;

  const taillight1 = new THREE.Mesh(taillightGeo, taillightMat);
  taillight1.rotation.x = Math.PI / 2; // Rotate to point backward
  taillight1.position.set(-taillightXOffset, taillightY, taillightZ);
  taillight1.name = 'Taillight Left';
  carGroup.add(taillight1);

  const taillight2 = new THREE.Mesh(taillightGeo, taillightMat);
  taillight2.rotation.x = Math.PI / 2;
  taillight2.position.set(taillightXOffset, taillightY, taillightZ);
  taillight2.name = 'Taillight Right';
  carGroup.add(taillight2);

  // Roof Rack
  const rackMaterial = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.8, roughness: 0.4 });
  const rackBarThickness = 0.05;
  const rackBarLength = cabinLength * 0.9; // Length of longitudinal bars, relative to cabin length
  const rackBarWidth = cabinWidth * 0.8;   // Width of transversal bars, relative to cabin width

  // Longitudinal bars (2, running along the car's length on the roof)
  const longBarGeo = new THREE.BoxGeometry(rackBarThickness, rackBarThickness, rackBarLength);
  const longBar1 = new THREE.Mesh(longBarGeo, rackMaterial);
  const longBarY = cabinMesh.position.y + (cabinHeight / 2) + (rackBarThickness / 2); // Position on top of the cabin
  const longBarXOffset = cabinWidth / 2 * 0.7; // Offset from the cabin center
  longBar1.position.set(cabinMesh.position.x - longBarXOffset, longBarY, cabinMesh.position.z);
  longBar1.name = 'Roof Rack Long Bar 1';
  carGroup.add(longBar1);

  const longBar2 = new THREE.Mesh(longBarGeo, rackMaterial);
  longBar2.position.set(cabinMesh.position.x + longBarXOffset, longBarY, cabinMesh.position.z);
  longBar2.name = 'Roof Rack Long Bar 2';
  carGroup.add(longBar2);

  // Transversal bars (3, running across the car's width on the roof)
  const transBarGeo = new THREE.BoxGeometry(rackBarWidth, rackBarThickness, rackBarThickness);
  const numTransBars = 3;
  for (let i = 0; i < numTransBars; i++) {
    const transBar = new THREE.Mesh(transBarGeo, rackMaterial);
    // Distribute transversal bars along the length of the longitudinal bars
    const transBarZOffset = (rackBarLength / (numTransBars -1)) * i - (rackBarLength / 2);
    transBar.position.set(
      cabinMesh.position.x, // Centered with the cabin's x-position
      longBarY,             // Same height as longitudinal bars
      cabinMesh.position.z + transBarZOffset // Positioned along the Z-axis of the cabin
    );
    transBar.name = `Roof Rack Trans Bar ${i + 1}`;
    carGroup.add(transBar);
  }

  // Add a spare tire to the rear of the car
  const spareTire = new THREE.Mesh(wheelGeo, wheelMat); // Re-use wheel geometry and material
  spareTire.name = 'Spare Tire';
  spareTire.rotation.x = Math.PI / 2; // Orient it upright, facing rearward (like main wheels)
  spareTire.position.set(
    0, // Centered on X-axis of the car
    mainBodyMesh.position.y, // Align with the main body's vertical center (can be adjusted)
    mainBodyMesh.position.z - (mainBodyLength / 2) - wheelWidth / 2 - 0.05 // Positioned at the back of the main body
  );
  carGroup.add(spareTire);

  // --- Final Car Adjustments and Scene Addition ---
  // Scale the entire car group to make it larger
  carGroup.scale.set(1.5, 1.5, 1.5);

  // Add the fully assembled car group to the main scene
  scene.add(carGroup);
}

