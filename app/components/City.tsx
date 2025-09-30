import * as THREE from 'three'
import { useMemo } from 'react'
import HouseFit from './HouseFit'
import { KENNEY_HOUSES } from '../lib/kenney'

type Props = {
  floorSize?: number
  cellSize?: number
  density?: number
  urls?: string[]
  roofColor?: string
}

export default function City({
  floorSize = 160,
  cellSize = 12,
  density = 0.7,
  urls = KENNEY_HOUSES,
  roofColor = '#6E6A8E',
}: Props) {
  const items = useMemo(() => {
    const half = floorSize / 2
    const cols = Math.floor(floorSize / cellSize)
    const start = -half + cellSize * 0.5
    const yaw = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]
    const out: {url:string; position:[number,number,number]; rotationY:number}[] = []
    
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < cols; z++) {
        if (Math.random() > density) continue // leave empty for streets
        const url = urls[Math.floor(Math.random() * urls.length)]
        const px = start + x * cellSize + THREE.MathUtils.randFloatSpread(cellSize * 0.2)
        const pz = start + z * cellSize + THREE.MathUtils.randFloatSpread(cellSize * 0.2)
        const rotationY = yaw[Math.floor(Math.random() * yaw.length)]
        out.push({ url, position: [px, 0, pz], rotationY })
      }
    }
    return out
  }, [floorSize, cellSize, density, urls])

  return (
    <>
      {items.map((it, i) => (
        <HouseFit
          key={i}
          url={it.url}
          footprint={cellSize * 0.9}
          position={it.position}
          rotationY={it.rotationY}
          roofColor={roofColor}
        />
      ))}
    </>
  )
}
