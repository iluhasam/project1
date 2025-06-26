'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Mic, Search, Sparkles } from 'lucide-react'
import ChampagneBackground from './ChampagneBackground'
import VoiceSearch from './VoiceSearch'

export default function HeroSection() {
  const [isListening, setIsListening] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15])
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set(e.clientX - centerX)
        mouseY.set(e.clientY - centerY)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const handleVoiceSearch = () => {
    setIsListening(!isListening)
    // Здесь будет логика распознавания речи
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Логика поиска
      console.log('Поиск:', searchQuery)
    }
  }

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* WebGL фон */}
      <ChampagneBackground />
      
      {/* Градиентный оверлей */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/50 to-dark-900 dark:from-transparent dark:via-black/60 dark:to-black" />
      
      {/* Основной контент */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          style={{ rotateX, rotateY }}
          className="perspective-1000"
        >
          {/* Заголовок */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white dark:text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="gradient-text">EventVerse</span>
            <br />
            <span className="text-3xl md:text-4xl text-gray-300 dark:text-gray-200">
              Кинематографичный маркетплейс мероприятий
            </span>
          </motion.h1>

          {/* Подзаголовок */}
          <motion.p
            className="text-xl text-gray-400 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Где каждая локация и исполнитель оживают в 3D. 
            Создайте незабываемое мероприятие с помощью интерактивных технологий.
          </motion.p>

          {/* Поисковая строка */}
          <motion.div
            className="relative max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Найдите фотографа, ведущего, локацию..."
                className="w-full px-6 py-4 bg-white/10 dark:bg-black/30 backdrop-blur-lg border border-white/20 dark:border-white/30 rounded-2xl text-white dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              
              {/* Кнопка голосового поиска */}
              <motion.button
                onClick={handleVoiceSearch}
                className="absolute right-4 p-2 rounded-full glass-effect hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mic className={`w-5 h-5 ${isListening ? 'text-red-400' : 'text-white'}`} />
              </motion.button>
            </div>

            {/* Голосовой поиск */}
            {isListening && (
              <VoiceSearch onClose={() => setIsListening(false)} />
            )}
          </motion.div>

          {/* CTA кнопки */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={handleSearch}
              className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-700 dark:to-primary-900 rounded-2xl text-white font-semibold text-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Начать поиск</span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              className="px-8 py-4 border-2 border-white/20 dark:border-white/40 rounded-2xl text-white font-semibold text-lg hover:bg-white/10 dark:hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Узнать больше</span>
              </span>
            </motion.button>
          </motion.div>

          {/* Статистика */}
          <motion.div
            className="flex justify-center space-x-8 mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { number: '500+', label: 'Исполнителей' },
              { number: '200+', label: 'Локаций' },
              { number: '1000+', label: 'Мероприятий' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary-400 dark:text-primary-300">{stat.number}</div>
                <div className="text-gray-400 dark:text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Плавающие элементы */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-primary-500 rounded-full opacity-60"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-40 right-20 w-6 h-6 bg-champagne-400 rounded-full opacity-40"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-3 h-3 bg-primary-300 rounded-full opacity-50"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 2 }}
      />
    </section>
  )
} 