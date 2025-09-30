import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { InstancedMesh, SphereGeometry, MeshToonMaterial, Object3D } from 'three';
import { GradientTexture } from '@react-three/drei';

type CloudsProps = {
  areaSize?: number      // width/depth of the floor (same as <Floor size/>)
  count?: number         // number of clouds
  height?: [number, number]  // y-range in world units
  scale?: [number, number]   // uniform scale range for each cloud
}

export function BatchedMeshExample({
  areaSize = 160,
  count = 260,
  height = [10, 35],
  scale = [1.4, 3.6],
}: CloudsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Create cloud geometry with noise/distortion
  const geometry = useMemo(() => {
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
    
    return cloudGeometry;
  }, []);

  // Create cloud material with gradient texture
  const material = useMemo(() => {
    return new MeshToonMaterial({
      color: '#B7DDF4',       // Pastel blue color for soft plastic look
      transparent: false,     // Keep opaque for candy look (no transparency)
      fog: true              // Enable fog for atmospheric effect
    });
  }, []);

  // Update instance positions and transforms
  useEffect(() => {
    const m = meshRef.current;
    if (!m) return;

    const half = areaSize * 0.5;
    for (let i = 0; i < count; i++) {
      const x = THREE.MathUtils.randFloat(-half, half);
      const z = THREE.MathUtils.randFloat(-half, half);
      const y = THREE.MathUtils.randFloat(height[0], height[1]);
      const s = THREE.MathUtils.randFloat(scale[0], scale[1]);

      dummy.position.set(x, y, z);
      dummy.rotation.set(
        0,
        Math.random() * Math.PI * 2,
        0
      );
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  }, [areaSize, count, height, scale, dummy]);

  // Slow ambient drift animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0006;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      frustumCulled={false} // avoids popping off-screen when very large
      castShadow
      receiveShadow={false}
    />
  );
}