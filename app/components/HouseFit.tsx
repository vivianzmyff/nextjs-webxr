import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'

type Props = {
  url: string
  footprint?: number          // desired width/depth in world units
  position?: [number, number, number]
  rotationY?: number
  margin?: number             // 0..1 space around the footprint
  roofColor?: string          // NEW: color for roof materials
}
export default function HouseFit({
  url,
  footprint = 10,            // SMALL house by default
  position = [0,0,0],
  rotationY = 0,
  margin = 0.85,
  roofColor = '#6E6A8E'      // NEW: gray-purple roof color
}: Props) {
  const gltf = useGLTF(url)
  const root = useMemo(() => gltf.scene.clone(true), [gltf.scene])

  // enable shadows + sane sides + roof tinting
  useMemo(() => {
    const isRoof = (name: string) => name?.toLowerCase().includes('roof')

    root.traverse((o: any) => {
      if (!o.isMesh) return
      o.castShadow = true
      o.receiveShadow = true

      const applyTint = (mat: any) => {
        if (!mat) return mat
        const n = `${mat.name ?? ''} ${o.name ?? ''}`
        if (!isRoof(n)) return mat
        const cloned = mat.clone()
        cloned.color = new THREE.Color(roofColor)
        cloned.needsUpdate = true
        return cloned
      }

      if (Array.isArray(o.material)) {
        o.material = o.material.map(applyTint)
      } else {
        o.material = applyTint(o.material)
      }

      // Set material side for proper rendering
      if (o.material) {
        if (Array.isArray(o.material)) {
          o.material.forEach((mat: any) => {
            if (mat) mat.side = THREE.FrontSide
          })
        } else {
          o.material.side = THREE.FrontSide
        }
      }
    })
  }, [root, roofColor])

  // center on X/Z, drop to y=0, and scale to footprint
  const { scale } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(root)
    const size = new THREE.Vector3(); box.getSize(size)
    const center = new THREE.Vector3(); box.getCenter(center)

    // move so base sits on floor and center is at origin
    root.position.x -= center.x
    root.position.z -= center.z
    root.position.y -= box.min.y

    // scale to target footprint with margin
    const maxDim = Math.max(size.x, size.z) || 1
    const s = (footprint * margin) / maxDim
    return { scale: s }
  }, [root, footprint, margin])

  return (
    <group position={position} rotation-y={rotationY}>
      <primitive object={root} scale={scale} />
    </group>
  )
}
