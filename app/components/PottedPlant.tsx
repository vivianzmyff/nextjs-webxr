// Interactive 3D model component that loads a GLTF file
// This demonstrates advanced concepts: file loading, state management, and user interaction

import * as THREE from 'three'
import React, { useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFResult } from '../types/gltf'

// Component that renders a 3D potted plant model with interactive features
// It accepts group props, which means you can position, rotate, and scale the entire model
export function Model(props: React.ComponentProps<'group'>) {
  
  // GLTF LOADING
  // useGLTF hook loads a 3D model file and extracts its parts
  // The file '/potted-plant.glb' must be in the public folder
  const { nodes, materials } = useGLTF('/potted-plant.glb') as unknown as GLTFResult
  
  // STATE MANAGEMENT
  // useState hook manages the plant's position in 3D space
  // The position is an array of [x, y, z] coordinates
  // TypeScript annotation ensures type safety
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0])
  
  // INTERACTION HANDLER
  // Function that generates a random position when the plant is clicked
  const randomizePosition = () => {
    // Math.random() gives 0-1, subtract 0.5 to get -0.5 to 0.5, multiply by 20 for -10 to +10 range
    const randomX = (Math.random() - 0.5) * 20 // Random X coordinate between -10 and +10
    const randomZ = (Math.random() - 0.5) * 20 // Random Z coordinate between -10 and +10
    // Y is set to -1 to position the plant on the grid floor
    setPosition([randomX, -1, randomZ])
  }
  
  return (
    // group is like a container that holds multiple 3D objects together
    // It's useful for organizing complex models with multiple parts
    // dispose={null} prevents automatic cleanup, position applies our state
    <group {...props} dispose={null} position={position}>
      
      {/* 
        The actual 3D mesh that renders the plant model
        This uses the geometry and materials loaded from the GLTF file
        Enhanced with XR interaction capabilities
      */}
      <mesh 
        // Extract geometry from the loaded model
        // We cast to THREE.Mesh because our generic type doesn't know the specific node type
        geometry={(nodes.Potted_Plant000 as THREE.Mesh).geometry} 
        
        // Use the material that came with the 3D model
        material={materials.Material} 
        
        // Scale up the model (original might be very small)
        scale={100}
        
        // XR INTERACTION SETTINGS
        // Allow both clicking and grabbing for more immersive XR experience
        pointerEventsType={{ allow: ['click', 'grab'] }}
        
        // INTERACTION EVENTS
        // onClick: When user clicks the plant, trigger position randomization
        onClick={randomizePosition}
        
        // onPointerOver: When mouse or XR controller hovers over the plant
        onPointerOver={(e) => {
          // Mark the object as hovered (useful for other effects)
          e.object.parent!.userData.hovered = true;
          // Change cursor to pointer to indicate it's clickable (for desktop users)
          if (document.body) {
            document.body.style.cursor = 'pointer';
          }
        }}
        
        // onPointerOut: When mouse or XR controller leaves the plant
        onPointerOut={(e) => {
          // Remove hovered state
          e.object.parent!.userData.hovered = false;
          // Reset cursor back to default (for desktop users)
          if (document.body) {
            document.body.style.cursor = 'default';
          }
        }}
      />
    </group>
  )
}

// PERFORMANCE OPTIMIZATION
// Preload the GLTF file so it's ready when the component mounts
// This prevents loading delays when the component first renders
useGLTF.preload('/potted-plant.glb')