import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from '../Loader'

const Earth = () => {
  const earth = useGLTF('/earth/earth.gltf')

  return (
    <primitive
      object={earth.scene}
      scale={1.5}
      position-y={-0.6}
      rotation-y={0}
    />
  )
}

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        position: [-4, 3, 6],
        near: 0.1,
        far: 200,
        fov: 45,
      }}
    >
      <ambientLight intensity={0.5} />  {/* Soft light */}
      <directionalLight
        intensity={1}
        position={[5, 5, 5]}
        castShadow
      />
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          autoRotate
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <Earth />
      </Suspense>
    </Canvas>
  )
}

export default EarthCanvas