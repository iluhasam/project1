'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// 3D модель зала
function VenueModel({ scrollYProgress }: { scrollYProgress: any }) {
  const groupRef = useRef<THREE.Group>(null)
  const boxRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
      const y = scrollYProgress.get() * 10
      groupRef.current.position.y = y
    }

    if (boxRef.current) {
      boxRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      boxRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <Box ref={boxRef} args={[4, 2, 6]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#4a5568"
          transparent
          opacity={0.8}
          metalness={0.1}
          roughness={0.8}
        />
      </Box>

      <Box args={[3, 0.5, 2]} position={[0, 1.25, -2]}>
        <meshStandardMaterial
          color="#ed5aff"
          emissive="#ed5aff"
          emissiveIntensity={0.2}
        />
      </Box>

      {[...Array(4)].map((_, i) => (
        <Box
          key={i}
          args={[0.3, 3, 0.3]}
          position={[
            (i % 2 === 0 ? -2 : 2),
            0.5,
            (i < 2 ? -3 : 3)
          ]}
        >
          <meshStandardMaterial
            color="#2d3748"
            metalness={0.3}
            roughness={0.7}
          />
        </Box>
      ))}

      {[...Array(6)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.1, 8, 8]}
          position={[
            (i % 3 - 1) * 2,
            2.5,
            (i < 3 ? -2.5 : 2.5)
          ]}
        >
          <meshStandardMaterial
            color="#f2cc6b"
            emissive="#f2cc6b"
            emissiveIntensity={0.5}
          />
        </Sphere>
      ))}
    </group>
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
    <section ref={containerRef} className="relative h-screen bg-gradient-to-b from-dark-800 to-dark-900 overflow-hidden">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 5, 10], fov: 60 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#f2cc6b" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ed5aff" />
          
          <VenueModel scrollYProgress={scrollYProgress} />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
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