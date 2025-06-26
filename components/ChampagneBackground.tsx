'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import * as THREE from 'three'

// Компонент пузырька
function Bubble({ position, size, speed }: { position: Vector3; size: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Пузырьки поднимаются вверх
      meshRef.current.position.y += speed * 0.01
      
      // Если пузырек вышел за пределы экрана, возвращаем его вниз
      if (meshRef.current.position.y > 10) {
        meshRef.current.position.y = -10
        meshRef.current.position.x = (Math.random() - 0.5) * 20
      }

      // Легкое покачивание
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 1.5) * 0.1
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[size, 16, 16]} />
      <meshPhongMaterial
        color={hovered ? '#f2cc6b' : '#ffffff'}
        transparent
        opacity={0.6}
        shininess={100}
      />
    </mesh>
  )
}

// Компонент фона
function Background() {
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    // Плавное следование камеры за курсором
    camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.01
    camera.position.y += (mouseRef.current.y * 2 - camera.position.y) * 0.01
    camera.lookAt(0, 0, 0)
  })

  return null
}

// Основной компонент
export default function ChampagneBackground() {
  const bubbles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    position: new Vector3(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10
    ),
    size: Math.random() * 0.3 + 0.1,
    speed: Math.random() * 2 + 1
  }))

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #1a1a2e, #16213e, #0f3460)' }}
      >
        <Background />
        
        {/* Освещение */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#f2cc6b" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ed5aff" />
        
        {/* Пузырьки */}
        {bubbles.map((bubble) => (
          <Bubble
            key={bubble.id}
            position={bubble.position}
            size={bubble.size}
            speed={bubble.speed}
          />
        ))}
        
        {/* Дополнительные эффекты */}
        <mesh position={[0, 0, -5]}>
          <planeGeometry args={[50, 50]} />
          <meshBasicMaterial
            color="#1a1a2e"
            transparent
            opacity={0.1}
          />
        </mesh>
      </Canvas>
    </div>
  )
} 