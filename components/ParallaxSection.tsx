'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Новый компонент: светящийся икосаэдр
function GlowingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)
  
  const colorA = new THREE.Color('#ed5aff') // фиолетовый
  const colorB = new THREE.Color('#00e0ff') // бирюзовый
  const colorC = new THREE.Color('#f2cc6b') // шампань

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      const { clock } = state
      
      // Вращение
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.2
      meshRef.current.rotation.y += 0.01

      // Плавная смена цвета
      const t = (Math.sin(clock.elapsedTime * 0.7) + 1) / 2
      const t2 = (Math.cos(clock.elapsedTime * 0.5) + 1) / 2
      const mixedColor = colorA.clone().lerp(colorB, t).lerp(colorC, t2 * 0.3)
      materialRef.current.color.copy(mixedColor)
      
      // Эффект свечения
      materialRef.current.emissive.copy(mixedColor).multiplyScalar(0.4)
    }
  })

  return (
    <mesh ref={meshRef} scale={2.5} castShadow receiveShadow>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial 
        ref={materialRef}
        color="#ed5aff"
        metalness={0.1} 
        roughness={0.1}
        emissive="#ed5aff"
        emissiveIntensity={0.8}
        wireframe={true}
      />
    </mesh>
  )
}

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300])

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-gradient-to-b from-dark-800 to-dark-900">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#f2cc6b" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ed5aff" />
          
          <GlowingIcosahedron />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
          />
        </Canvas>
      </div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <motion.div
            style={{ y: y1 }}
            className="mb-8"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="gradient-text">3D</span> Опыт
            </h2>
            <p className="text-xl text-gray-400">
              Исследуйте локации и исполнителей в интерактивном 3D-пространстве
            </p>
          </motion.div>

          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl text-white font-semibold text-lg hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Попробовать 3D-тур
          </motion.button>
        </div>
      </div>
    </section>
  )
} 