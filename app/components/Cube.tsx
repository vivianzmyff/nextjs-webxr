// A reusable 3D cube component built with React Three Fiber
// This demonstrates how to create modular 3D objects that can be used anywhere
// Now enhanced with XR interactions and visual feedback

import React, { useState } from 'react';
import * as THREE from 'three';

// Define the Cube component as a function that accepts mesh properties
// React.ComponentProps<'mesh'> means it accepts any props that a regular mesh would accept
// This includes position, rotation, scale, onClick handlers, etc.
export function Cube(props: React.ComponentProps<'mesh'>) {
  
  // STATE MANAGEMENT FOR INTERACTIONS
  // Track whether the cube is being hovered or has been clicked
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [color, setColor] = useState("#ff6b35"); // Initial orange color

  // INTERACTION HANDLERS
  // Handle clicking - cycle through different colors
  const handleClick = () => {
    const colors = ["#ff6b35", "#4CAF50", "#2196F3", "#9C27B0", "#FF9800"];
    const currentIndex = colors.indexOf(color);
    const nextIndex = (currentIndex + 1) % colors.length;
    setColor(colors[nextIndex]);
    setIsClicked(true);
    
    // Reset clicked state after animation
    setTimeout(() => setIsClicked(false), 200);
  };

  // Handle hover enter - make cube slightly larger and brighter
  const handlePointerOver = () => {
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  // Handle hover exit - return to normal size and color
  const handlePointerOut = () => {
    setIsHovered(false);
    document.body.style.cursor = 'default';
  };

  return (
    // mesh is the fundamental 3D object in Three.js
    // It combines geometry (shape) with material (appearance)
    // {...props} spreads any props passed to this component onto the mesh
    <mesh 
      {...props}
      // XR INTERACTION SETTINGS
      // pointerEventsType allows fine control over how XR controllers interact
      pointerEventsType={{ deny: 'grab' }} // Prevent grabbing but allow clicking
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      
      // ANIMATION PROPERTIES
      // Scale changes based on hover and click state for visual feedback
      scale={isHovered ? 1.1 : isClicked ? 1.2 : 1.0}
    >
      
      {/* 
        boxGeometry defines the shape of our cube
        args={[width, height, depth]} - in this case, a 2x2x2 cube
        Geometry defines the vertices and faces that make up the 3D shape
      */}
      <boxGeometry args={[2, 2, 2]} />
      
      {/* 
        meshStandardMaterial defines how the surface looks and reacts to light
        This material responds realistically to lighting in the scene
        Color changes dynamically based on user interactions
      */}
      <meshStandardMaterial 
        color={color}        // Dynamic color that changes on click
        metalness={0.1}      // How metallic the surface looks (0 = not metallic, 1 = very metallic)
        roughness={0.3}      // How rough the surface is (0 = mirror-like, 1 = very rough)
        emissive={isHovered ? "#222222" : "#000000"} // Subtle glow when hovered
        emissiveIntensity={isHovered ? 0.2 : 0}      // Intensity of the glow effect
      />
    </mesh>
  );
}