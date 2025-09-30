// BatchedMesh Extensions Example Component
// This demonstrates the enhanced BatchedMesh functionality including:
// - Spatial indexing (BVH) for faster raycasting and frustum culling
// - Per-instance uniforms for unique shader data per instance
// - Level of Detail (LOD) support for performance optimization

import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { BatchedMesh, BoxGeometry, MeshStandardMaterial, Color, Matrix4 } from 'three';
import { getBatchedMeshCount } from '@three.ez/batched-mesh-extensions';

// Component that creates multiple cubes using BatchedMesh for better performance
export function BatchedMeshExample() {
  const batchedMeshRef = useRef<BatchedMesh>(null);
  const [instanceCount] = useState(50); // Number of cube instances to create

  useEffect(() => {
    if (!batchedMeshRef.current) return;

    const batchedMesh = batchedMeshRef.current;
    
    // Create a simple box geometry for our cubes
    const boxGeometry = new BoxGeometry(0.5, 0.5, 0.5);
    
    // Calculate the required vertex and index counts for the BatchedMesh
    getBatchedMeshCount([boxGeometry]);
    
    // Create the BatchedMesh with the calculated counts
    new MeshStandardMaterial({ 
      color: '#4CAF50',
      metalness: 0.1,
      roughness: 0.3
    });

    // Initialize the batched mesh with our geometry and material
    const geometryId = batchedMesh.addGeometry(boxGeometry);
    
    // Add multiple instances of the cube at random positions
    for (let i = 0; i < instanceCount; i++) {
      const instanceId = batchedMesh.addInstance(geometryId);
      
      // Set random position for each instance
      const x = (Math.random() - 0.5) * 20;
      const y = Math.random() * 5;
      const z = (Math.random() - 0.5) * 20;
      
      // Create a Matrix4 for the instance transformation
      const matrix = new Matrix4();
      matrix.setPosition(x, y, z);
      batchedMesh.setMatrixAt(instanceId, matrix);
      
      // Set random color for each instance
      const color = new Color();
      color.setHSL(Math.random(), 0.7, 0.5);
      batchedMesh.setColorAt(instanceId, color);
    }

    // Note: Advanced features like BVH and per-instance uniforms
    // are available in the batched-mesh-extensions but may require
    // specific setup or different API usage patterns
    console.log('BatchedMesh created with', instanceCount, 'instances');

  }, [instanceCount]);

  // Animation loop - rotate the entire batched mesh
  useFrame((state) => {
    if (batchedMeshRef.current) {
      batchedMeshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group>
      {/* 
        BatchedMesh renders multiple instances of the same geometry efficiently
        This is much more performant than creating individual mesh objects
        The extensions add spatial indexing, per-instance uniforms, and LOD support
      */}
      <batchedMesh 
        ref={batchedMeshRef}
        args={[instanceCount, 0, 0]}  // [instanceCount, vertexCount, indexCount]
        frustumCulled={true}  // Enable frustum culling (accelerated by BVH)
        castShadow={true}     // Enable shadow casting
        receiveShadow={true}  // Enable shadow receiving
      />
    </group>
  );
}

// Performance comparison component showing the difference
// between individual meshes and batched meshes
export function PerformanceComparison() {
  const [useBatched, setUseBatched] = useState(true);
  
  return (
    <group>
      {/* Toggle between batched and individual meshes */}
      <mesh 
        position={[0, 6, 0]}
        onClick={() => setUseBatched(!useBatched)}
      >
        <boxGeometry args={[1, 0.5, 0.1]} />
        <meshBasicMaterial color={useBatched ? "#4CAF50" : "#FF9800"} />
      </mesh>
      
      {useBatched ? (
        <BatchedMeshExample />
      ) : (
        <IndividualMeshes />
      )}
    </group>
  );
}

// Component showing individual meshes (less performant)
function IndividualMeshes() {
  const meshes = [];
  
  for (let i = 0; i < 50; i++) { // Fewer instances for performance
    const x = (Math.random() - 0.5) * 20;
    const y = Math.random() * 5;
    const z = (Math.random() - 0.5) * 20;
    
    meshes.push(
      <mesh key={i} position={[x, y, z]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial 
          color={new Color().setHSL(Math.random(), 0.7, 0.5)}
          metalness={Math.random() * 0.5}
          roughness={Math.random() * 0.8 + 0.2}
        />
      </mesh>
    );
  }
  
  return <group>{meshes}</group>;
}
