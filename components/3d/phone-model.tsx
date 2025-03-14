"use client"

import { useRef, useEffect, useMemo } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PresentationControls, Environment, ContactShadows, useGLTF, Center } from "@react-three/drei"
import { Group, Mesh, MeshStandardMaterial } from "three"
import { memo } from "react"

const PhoneModel = memo(({ color = "#b0c4de" }) => {
  const group = useRef<Group>(null)
  const { scene } = useGLTF("/models/14pro/scene.gltf")

  // Memoize material update to avoid redundant computations
  useMemo(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
        if (child.name.includes("Front") || child.name.includes("Glass")) return;
        child.material.color.set(color)
        child.material.roughness = 0.2
        child.material.needsUpdate = true
      }
    })
  }, [scene, color])

  return (
    <Center>
      <group ref={group}>
        <primitive object={scene} scale={2} />
      </group>
    </Center>
  )
})

// Memoize the viewer to prevent unnecessary re-renders
export const Phone3DViewer = memo(({ color = "#b0c4de" }) => {
  return (
    <div className="h-full w-full">
      <Canvas 
        shadows 
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 5], fov: 50 }}
        performance={{ min: 0.5, max: 1 }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} />

        <PresentationControls
          global
          rotation={[0, -Math.PI / 4, 0]}
          polar={[0, 0]}
          azimuth={[-Math.PI, Math.PI]}
        >
          <PhoneModel color={color} />
        </PresentationControls>

        <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={4} blur={2} far={3} />

        {/* Lazy-load Environment for performance */}
        <Environment preset="city" background={false} />
        <OrbitControls enableZoom={true} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
      </Canvas>
    </div>
  )
})

// Preload the model to improve performance
useGLTF.preload("/models/14pro/scene.gltf")
