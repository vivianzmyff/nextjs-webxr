// InstancedMesh Example Component
// This demonstrates memory-safe instanced rendering with proper resource management
// Previous BatchedMesh code reallocated huge GPU buffers on each refresh and exceeded
// the device's maximum buffer size. InstancedMesh keeps geometry static and only stores
// per-instance matrices, which is far smaller and stable.

import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { InstancedMesh, SphereGeometry, MeshStandardMaterial, Object3D, DynamicDrawUsage } from 'three';

// Aggressive cap to avoid huge GPU buffer reservations
const MAX_INSTANCES = 2000;

// Component that creates multiple clouds using InstancedMesh for better performance
export function BatchedMeshExample() {
  const meshRef = useRef<InstancedMesh | null>(null);
  const { scene } = useThree();
  const [instanceCount] = useState(100); // Number of cloud instances to create

  useEffect(() => {
    // Guard against multiple creations on Fast Refresh
    if (process.env.NODE_ENV !== 'production') {
      // no-op: creation is already guarded by meshRef.current
    }

    // If mesh already exists, skip creating a new one
    if (meshRef.current) return;

    // Create cloud-like geometry with noise/distortion for fluffy appearance
    const cloudGeometry = new SphereGeometry(1, 16, 16);
    
    // Apply noise/distortion to make the spheres look more cloud-like and fluffy
    for (let i = 0; i < cloudGeometry.attributes.position.count; i++) {
      cloudGeometry.attributes.position.setXYZ(
        i,
        cloudGeometry.attributes.position.getX(i) + (Math.random() - 0.5) * 0.5,
        cloudGeometry.attributes.position.getY(i) + (Math.random() - 0.5) * 0.5,
        cloudGeometry.attributes.position.getZ(i) + (Math.random() - 0.5) * 0.5
      );
    }
    cloudGeometry.attributes.position.needsUpdate = true;

    // Create cloud-like material with transparency and flat shading
    const cloudMaterial = new MeshStandardMaterial({
      color: 0xffffff,        // White color like real clouds
      transparent: true,      // Enable transparency
      opacity: 0.8,          // Semi-transparent like clouds
      flatShading: true,     // Flat shading for more organic cloud appearance
      fog: true              // Enable fog for atmospheric effect
    });

    // Cap the number of instances aggressively to avoid huge GPU buffer reservations
    const count = Math.min(instanceCount, MAX_INSTANCES);
    
    // Create InstancedMesh (more memory-safe than BatchedMesh)
    // InstancedMesh avoids the huge "reserved space" allocation that causes buffer overflow
    const instanced = new InstancedMesh(cloudGeometry, cloudMaterial, count);
    instanced.instanceMatrix.setUsage(DynamicDrawUsage);

    // Randomize transforms for each cloud instance
    const dummy = new Object3D();
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 40,  // Random X position (wider spread for clouds)
        Math.random() * 10 + 5,      // Random Y position (higher up for clouds)
        (Math.random() - 0.5) * 40   // Random Z position (wider spread for clouds)
      );
      dummy.rotation.set(
        Math.random() * Math.PI,     // Random X rotation
        Math.random() * Math.PI,     // Random Y rotation
        Math.random() * Math.PI      // Random Z rotation for more natural cloud orientation
      );
      // Vary cloud sizes for more natural appearance
      const cloudSize = 0.8 + Math.random() * 1.2; // Clouds between 0.8 and 2.0 scale
      dummy.scale.setScalar(cloudSize);
      dummy.updateMatrix();
      instanced.setMatrixAt(i, dummy.matrix);
    }
    instanced.instanceMatrix.needsUpdate = true;

    // Add to scene and store reference
    scene.add(instanced);
    meshRef.current = instanced;

    console.log('Cloud InstancedMesh created with', count, 'instances (capped from', instanceCount, ')');

    // Cleanup function to properly dispose resources
    return () => {
      if (meshRef.current) {
        scene.remove(meshRef.current);
        // Dispose the instanced mesh if it has a dispose method
        if ('dispose' in meshRef.current && typeof meshRef.current.dispose === 'function') {
          meshRef.current.dispose();
        }
        // Dispose geometry and material
        cloudGeometry.dispose();
        if (cloudMaterial.dispose) {
          cloudMaterial.dispose();
        }
        meshRef.current = null;
      }
    };
  }, [instanceCount, scene]);

  // Animation loop - gently drift the clouds
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation for cloud movement
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      // Add subtle floating motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <group>
      {/* 
        InstancedMesh renders multiple cloud instances efficiently
        Each cloud is a distorted sphere with noise for fluffy appearance
        White, semi-transparent material with flat shading for realistic cloud look
        Memory-safe approach that avoids huge GPU buffer reservations
      */}
      {meshRef.current && (
        <primitive 
          object={meshRef.current} 
          frustumCulled={true}  // Enable frustum culling
          castShadow={true}     // Enable shadow casting
          receiveShadow={true}  // Enable shadow receiving
        />
      )}
    </group>
  );
}

// Performance comparison component showing the difference
// between instanced clouds and individual clouds
export function PerformanceComparison() {
  const [useInstanced, setUseInstanced] = useState(true);
  
  return (
    <group>
      {/* Toggle between instanced and individual clouds */}
      <mesh 
        position={[0, 6, 0]}
        onClick={() => setUseInstanced(!useInstanced)}
      >
        <boxGeometry args={[1, 0.5, 0.1]} />
        <meshBasicMaterial color={useInstanced ? "#4CAF50" : "#FF9800"} />
      </mesh>
      
      {useInstanced ? (
        <BatchedMeshExample />
      ) : (
        <IndividualMeshes />
      )}
    </group>
  );
}

// Component showing individual cloud meshes (less performant)
function IndividualMeshes() {
  const meshes = [];
  
  // Cap at 50 instances for performance comparison
  const maxIndividualInstances = 50;
  
  for (let i = 0; i < maxIndividualInstances; i++) {
    const x = (Math.random() - 0.5) * 40;
    const y = Math.random() * 10 + 5;
    const z = (Math.random() - 0.5) * 40;
    
    meshes.push(
      <mesh key={i} position={[x, y, z]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color={0xffffff}
          transparent={true}
          opacity={0.8}
          flatShading={true}
          fog={true}
        />
      </mesh>
    );
  }
  
  return <group>{meshes}</group>;
}
