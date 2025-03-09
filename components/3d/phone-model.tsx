"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PresentationControls, Environment, ContactShadows, useGLTF, Center } from "@react-three/drei"
import { type Group, Mesh, MeshStandardMaterial, Scene } from "three"

function PhoneModel({ color = "#b0c4de" }) {
  const group = useRef<Group>(null)
  const { scene, nodes, materials } = useGLTF("/models/pixel/scene.gltf")

  // Apply color to all materials that should change color
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof Mesh && child.material && child.material instanceof MeshStandardMaterial) {
          console.log(child.name);
          // Update the color of the existing material
          if (child.name.includes("Front") || child.name.includes("Glass")) return;
          child.material.color.set(color)
          // Optionally adjust roughness if needed
          child.material.roughness = 0.2
          // Ensure the material updates correctly
          child.material.needsUpdate = true
        }
      })
    }
  }, [scene, color])

  // Gentle floating animation
  // useFrame((state) => {
  //   if (group.current) {
  //     group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
  //   }
  // })

  return (
    <Center>
      <group ref={group}>
        <primitive object={scene} scale={13} position={[0, 0, 0]} rotation={[0, 0, 0]} />
      </group>
    </Center>
  )
}

export function Phone3DViewer({ color = "#b0c4de" }) {
  return (
    <div className="h-full w-full">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PresentationControls
          global
          rotation={[0, -Math.PI / 4, 0]}
          polar={[0,0]}
          azimuth={[-Math.PI, Math.PI]}
        >
          <PhoneModel color={color} />
        </PresentationControls>
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.5} far={4} />
        <Environment preset="city" />
        <OrbitControls enableZoom={true} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
      </Canvas>


    </div>
  )
}

// Preload the model to improve performance
useGLTF.preload("/models/pixel/scene.gltf")
