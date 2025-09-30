import { Environment } from '@react-three/drei'

type Props = {
  mode: 'preset' | 'custom'
}

export default function SkyController({ mode }: Props) {
  if (mode === 'preset') {
    // Built-in environment presets without background (fog shows instead)
    return (
      <Environment 
        preset="sunset" 
        background={false}
        blur={0.6} 
      />
    )
  }

  if (mode === 'custom') {
    // Custom HDRI environment without background (fog shows instead)
    return (
      <Environment 
        files="/hdris/clear_noon_2k.hdr" 
        background={false}
        blur={0.3} 
      />
    )
  }

  // Fallback to preset if mode is invalid
  return (
    <Environment 
      preset="sunset" 
      background={false}
      blur={0.6} 
    />
  )
}
