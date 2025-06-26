'use client'

import { motion } from 'framer-motion'
import { Camera, Users, Palette, Music, MapPin, Star } from 'lucide-react'

const categories = [
  {
    id: 1,
    name: 'Фотографы',
    description: 'Профессиональная фотосъемка',
    icon: Camera,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    count: '150+',
    rating: 4.8,
    scene: 'wedding-camera'
  },
  {
    id: 2,
    name: 'Ведущие',
    description: 'Опытные тамады и ведущие',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    count: '80+',
    rating: 4.9,
    scene: 'party-host'
  },
  {
    id: 3,
    name: 'Декораторы',
    description: 'Украшение и оформление',
    icon: Palette,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    count: '120+',
    rating: 4.7,
    scene: 'decoration'
  },
  {
    id: 4,
    name: 'Артисты',
    description: 'Музыканты и исполнители',
    icon: Music,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    count: '200+',
    rating: 4.6,
    scene: 'music-performance'
  },
  {
    id: 5,
    name: 'Локации',
    description: 'Залы и площадки',
    icon: MapPin,
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    count: '300+',
    rating: 4.8,
    scene: 'venue-hall'
  },
  {
    id: 6,
    name: 'Премиум',
    description: 'Элитные услуги',
    icon: Star,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    count: '50+',
    rating: 5.0,
    scene: 'premium-service'
  }
]

export default function CategoriesSection() {
  return (
    <section className="py-20 px-4 bg-transparent transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок секции */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-white mb-6">
            Популярные <span className="gradient-text">категории</span>
          </h2>
          <p className="text-xl text-gray-400 dark:text-gray-300 max-w-3xl mx-auto">
            Выберите категорию и найдите идеального исполнителя для вашего мероприятия
          </p>
        </motion.div>

        {/* Сетка категорий */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* Дополнительная информация */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-gray-400 dark:text-gray-300 mb-6">
            Не нашли нужную категорию? Обратитесь к нашему консультанту
          </p>
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-700 dark:to-primary-900 rounded-xl text-white font-semibold hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Получить консультацию
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

interface CategoryCardProps {
  category: typeof categories[0]
  index: number
}

function CategoryCard({ category, index }: CategoryCardProps) {
  const IconComponent = category.icon

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      {/* 3D карточка */}
      <motion.div
        className={`relative p-8 rounded-2xl ${category.bgColor} dark:bg-white/5 border ${category.borderColor} dark:border-white/10 backdrop-blur-lg overflow-hidden cursor-pointer transition-colors duration-300`}
        whileHover={{ 
          scale: 1.05,
          rotateY: 5,
          rotateX: 5,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Градиентный фон */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        
        {/* Иконка */}
        <motion.div
          className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <IconComponent className="w-8 h-8 text-white dark:text-white" />
        </motion.div>

        {/* Контент */}
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white dark:text-white mb-2">{category.name}</h3>
          <p className="text-gray-400 dark:text-gray-300 mb-4">{category.description}</p>
          
          {/* Статистика */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400 dark:text-gray-300">Исполнителей:</span>
              <span className="text-white dark:text-white font-semibold">{category.count}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-white dark:text-white font-semibold">{category.rating}</span>
            </div>
          </div>
        </div>

        {/* 3D эффект тени */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            transform: 'translateZ(-10px)',
          }}
        />

        {/* Анимированные частицы */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Эффект свечения при наведении */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${category.color.replace('from-', '').replace('to-', '').split(' ')[0]}/20, transparent 50%)`,
          }}
        />
      </motion.div>

      {/* Мини-сцена при наведении */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5`} />
        
        {/* Анимированные элементы сцены */}
        {category.scene === 'wedding-camera' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-20 h-20 border-4 border-white/20 rounded-full"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        )}
        
        {category.scene === 'party-host' && (
          <div className="absolute inset-0 flex items-center justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-white/30 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        )}
        
        {category.scene === 'decoration' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 border-2 border-white/30 rounded-lg"
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  )
} 