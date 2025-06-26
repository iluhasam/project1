'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Star, MapPin, Clock, Users } from 'lucide-react'

const performers = [
  {
    id: 1,
    name: 'Анна Петрова',
    category: 'Фотограф',
    rating: 4.9,
    reviews: 127,
    price: 'от 15 000 ₽',
    location: 'Москва',
    experience: '8 лет',
    image: '/api/placeholder/300/400',
    tags: ['Свадьбы', 'Портреты', 'Репортаж'],
    description: 'Профессиональный фотограф с 8-летним опытом. Специализируюсь на свадебной и портретной фотографии.',
    portfolio: ['/api/placeholder/300/200', '/api/placeholder/300/200', '/api/placeholder/300/200']
  },
  {
    id: 2,
    name: 'Михаил Соколов',
    category: 'Ведущий',
    rating: 4.8,
    reviews: 89,
    price: 'от 25 000 ₽',
    location: 'Санкт-Петербург',
    experience: '12 лет',
    image: '/api/placeholder/300/400',
    tags: ['Свадьбы', 'Корпоративы', 'Дни рождения'],
    description: 'Опытный ведущий мероприятий. Создаю незабываемую атмосферу на любом празднике.',
    portfolio: ['/api/placeholder/300/200', '/api/placeholder/300/200']
  },
  {
    id: 3,
    name: 'Елена Козлова',
    category: 'Декоратор',
    rating: 4.7,
    reviews: 156,
    price: 'от 20 000 ₽',
    location: 'Москва',
    experience: '6 лет',
    image: '/api/placeholder/300/400',
    tags: ['Свадьбы', 'Цветы', 'Световые эффекты'],
    description: 'Креативный декоратор. Создаю уникальные композиции и атмосферные декорации.',
    portfolio: ['/api/placeholder/300/200', '/api/placeholder/300/200', '/api/placeholder/300/200', '/api/placeholder/300/200']
  },
  {
    id: 4,
    name: 'Дмитрий Волков',
    category: 'Музыкант',
    rating: 4.9,
    reviews: 203,
    price: 'от 30 000 ₽',
    location: 'Москва',
    experience: '15 лет',
    image: '/api/placeholder/300/400',
    tags: ['Живая музыка', 'Джаз', 'Классика'],
    description: 'Профессиональный пианист и саксофонист. Выступаю на мероприятиях любого масштаба.',
    portfolio: ['/api/placeholder/300/200', '/api/placeholder/300/200']
  },
  {
    id: 5,
    name: 'Ольга Морозова',
    category: 'Фотограф',
    rating: 4.6,
    reviews: 94,
    price: 'от 12 000 ₽',
    location: 'Казань',
    experience: '5 лет',
    image: '/api/placeholder/300/400',
    tags: ['Семейные фото', 'Дети', 'Праздники'],
    description: 'Детский и семейный фотограф. Создаю теплые и душевные кадры.',
    portfolio: ['/api/placeholder/300/200', '/api/placeholder/300/200', '/api/placeholder/300/200']
  },
  {
    id: 6,
    name: 'Алексей Иванов',
    category: 'Ведущий',
    rating: 4.5,
    reviews: 67,
    price: 'от 18 000 ₽',
    location: 'Екатеринбург',
    experience: '7 лет',
    image: '/api/placeholder/300/400',
    tags: ['Корпоративы', 'Тимбилдинг', 'Презентации'],
    description: 'Ведущий корпоративных мероприятий и тимбилдингов. Профессиональный подход к каждому событию.',
    portfolio: ['/api/placeholder/300/200', '/api/placeholder/300/200']
  }
]

const categories = ['Все', 'Фотографы', 'Ведущие', 'Декораторы', 'Музыканты', 'Артисты']
const locations = ['Все города', 'Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург']
const priceRanges = ['Любая цена', 'до 10 000 ₽', '10 000 - 20 000 ₽', '20 000 - 50 000 ₽', 'от 50 000 ₽']

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [selectedLocation, setSelectedLocation] = useState('Все города')
  const [selectedPrice, setSelectedPrice] = useState('Любая цена')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [showFilters, setShowFilters] = useState(false)

  const filteredPerformers = performers.filter(performer => {
    const matchesCategory = selectedCategory === 'Все' || performer.category === selectedCategory
    const matchesLocation = selectedLocation === 'Все города' || performer.location === selectedLocation
    const matchesSearch = performer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         performer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         performer.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesLocation && matchesSearch
  })

  const sortedPerformers = [...filteredPerformers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'price':
        const aPrice = a.price.match(/\d+/)?.[0] || '0'
        const bPrice = b.price.match(/\d+/)?.[0] || '0'
        return parseInt(aPrice) - parseInt(bPrice)
      case 'experience':
        const aExp = a.experience.match(/\d+/)?.[0] || '0'
        const bExp = b.experience.match(/\d+/)?.[0] || '0'
        return parseInt(bExp) - parseInt(aExp)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Заголовок */}
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Каталог <span className="gradient-text">исполнителей</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Найдите идеального исполнителя для вашего мероприятия
          </motion.p>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <div className="px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Поиск */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск исполнителей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Кнопка фильтров */}
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 glass-effect rounded-xl border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-5 h-5 text-white" />
              <span className="text-white">Фильтры</span>
            </motion.button>

            {/* Сортировка */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="rating">По рейтингу</option>
              <option value="price">По цене</option>
              <option value="experience">По опыту</option>
            </select>
          </div>

          {/* Расширенные фильтры */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-6 glass-effect rounded-xl border border-white/20"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Категории */}
                  <div>
                    <label className="block text-white font-medium mb-2">Категория</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                            selectedCategory === category
                              ? 'bg-primary-500 text-white'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Локации */}
                  <div>
                    <label className="block text-white font-medium mb-2">Город</label>
                    <div className="flex flex-wrap gap-2">
                      {locations.map((location) => (
                        <button
                          key={location}
                          onClick={() => setSelectedLocation(location)}
                          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                            selectedLocation === location
                              ? 'bg-primary-500 text-white'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Цены */}
                  <div>
                    <label className="block text-white font-medium mb-2">Цена</label>
                    <div className="flex flex-wrap gap-2">
                      {priceRanges.map((price) => (
                        <button
                          key={price}
                          onClick={() => setSelectedPrice(price)}
                          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                            selectedPrice === price
                              ? 'bg-primary-500 text-white'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                        >
                          {price}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Сетка исполнителей */}
      <div className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {sortedPerformers.map((performer, index) => (
                <PerformerCard key={performer.id} performer={performer} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {sortedPerformers.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-400 text-xl">По вашему запросу ничего не найдено</p>
              <p className="text-gray-500 mt-2">Попробуйте изменить параметры поиска</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

interface PerformerCardProps {
  performer: typeof performers[0]
  index: number
}

function PerformerCard({ performer, index }: PerformerCardProps) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      <div className="relative p-6 glass-effect rounded-2xl border border-white/20 overflow-hidden cursor-pointer">
        {/* Фоновое изображение */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Основная информация */}
        <div className="relative z-10">
          {/* Заголовок */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{performer.name}</h3>
              <p className="text-primary-400 font-medium">{performer.category}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white font-semibold">{performer.rating}</span>
              </div>
              <p className="text-gray-400 text-sm">{performer.reviews} отзывов</p>
            </div>
          </div>

          {/* Описание */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{performer.description}</p>

          {/* Теги */}
          <div className="flex flex-wrap gap-2 mb-4">
            {performer.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Детали */}
          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{performer.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{performer.experience}</span>
            </div>
          </div>

          {/* Цена и кнопка */}
          <div className="flex items-center justify-between">
            <div className="text-primary-400 font-semibold">{performer.price}</div>
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Подробнее
            </motion.button>
          </div>
        </div>

        {/* Анимированные частицы */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
} 