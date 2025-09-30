import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { useMemo } from 'react'

type Props = { size?: number; tileRepeat?: number }
export default function Floor({ size = 160, tileRepeat = 8 }: Props) {
  const gl = useThree((s) => s.gl)
  const maps = useTexture({
    map:          '/textures/snow/snow_field_aerial_col_4k.jpg',
    roughnessMap: '/textures/snow/snow_field_aerial_rough_4k.jpg',
    // normalMap: '/textures/snow/snow_field_aerial_nor_gl_4k.exr', // skipped for now
    // displacementMap: '/textures/snow/snow_field_aerial_height_4k.png', // only if we subdivide
  })

  // Correct color space for the base color
  maps.map.colorSpace = THREE.SRGBColorSpace

  // Tiling & filtering
  Object.values(maps).forEach((t) => {
    if (!t) return
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(tileRepeat, tileRepeat)
    t.anisotropy = gl.capabilities.getMaxAnisotropy?.() ?? 8
  })

  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(size, size, 1, 1)
    // If we add aoMap later we'll copy uv -> uv2 here.
    return g
  }, [size])

  return (
    <mesh geometry={geom} rotation-x={-Math.PI / 2} receiveShadow>
      <meshStandardMaterial {...maps} metalness={0} roughness={1.0} />
    </mesh>
  )
}