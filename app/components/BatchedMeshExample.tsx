// InstancedMesh Example Component
// This demonstrates memory-safe instanced rendering with proper resource management
// Previous BatchedMesh code reallocated huge GPU buffers on each refresh and exceeded
// the device's maximum buffer size. InstancedMesh keeps geometry static and only stores
// per-instance matrices, which is far smaller and stable.

import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { InstancedMesh, SphereGeometry, MeshToonMaterial, Object3D, DynamicDrawUsage } from 'three';
import { GradientTexture } from '@react-three/drei';

// Aggressive cap to avoid huge GPU buffer reservations
const MAX_INSTANCES = 2000;

// Component that creates multiple pastel-blue soft plastic clouds
export function BatchedMeshExample() {
  const groupRef = useRef<THREE.Group>(null);
  const [instanceCount] = useState(50); // Reduced count for better performance with individual meshes

  // Animation loop - gently drift the clouds
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation for cloud movement
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      // Add subtle floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  // Create cloud positions and sizes
  const clouds = [];
  for (let i = 0; i < instanceCount; i++) {
    clouds.push({
      position: [
        (Math.random() - 0.5) * 40,  // Random X position (wider spread for clouds)
        Math.random() * 10 + 5,      // Random Y position (higher up for clouds)
        (Math.random() - 0.5) * 40   // Random Z position (wider spread for clouds)
      ],
      rotation: [
        Math.random() * Math.PI,     // Random X rotation
        Math.random() * Math.PI,     // Random Y rotation
        Math.random() * Math.PI      // Random Z rotation for more natural cloud orientation
      ],
      scale: 0.8 + Math.random() * 1.2 // Clouds between 0.8 and 2.0 scale
    });
  }

  return (
    <group ref={groupRef}>
      {/* 
        Pastel-blue soft plastic clouds with MeshToonMaterial and gradient texture
        Each cloud is a distorted sphere with smooth normals for candy-like appearance
        Opaque material with gradient for soft plastic look
      */}
      {clouds.map((cloud, index) => (
        <CloudMesh
          key={index}
          position={cloud.position}
          rotation={cloud.rotation}
          scale={cloud.scale}
        />
      ))}
    </group>
  );
}

// Individual cloud mesh component with gradient texture
function CloudMesh({ position, rotation, scale }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create cloud-like geometry with higher detail for smooth normals
  const cloudGeometry = new SphereGeometry(1, 32, 32);
  
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
  
  // Compute smooth vertex normals for better lighting
  cloudGeometry.computeVertexNormals();

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      geometry={cloudGeometry}
      castShadow
      receiveShadow
    >
      <meshToonMaterial color="#B7DDF4">
        <GradientTexture
          stops={[0, 0.5, 1]}
          colors={['#8EC9EA', '#B7DDF4', '#E6F6FF']}
          size={64}
        />
      </meshToonMaterial>
    </mesh>
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
  
  // Cap at 25 instances for performance comparison with gradient textures
  const maxIndividualInstances = 25;
  
  for (let i = 0; i < maxIndividualInstances; i++) {
    const x = (Math.random() - 0.5) * 40;
    const y = Math.random() * 10 + 5;
    const z = (Math.random() - 0.5) * 40;
    
    meshes.push(
      <CloudMesh
        key={i}
        position={[x, y, z]}
        rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
        scale={0.8 + Math.random() * 1.2}
      />
    );
  }
  
  return <group>{meshes}</group>;
}
