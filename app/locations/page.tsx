'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Users, Star, Calendar, ArrowRight } from 'lucide-react'

const venues = [
  {
    id: 1,
    name: 'Grand Palace',
    type: 'Банкетный зал',
    capacity: 'до 300 гостей',
    rating: 4.9,
    reviews: 156,
    price: 'от 50 000 ₽',
    location: 'Москва, центр',
    description: 'Роскошный банкетный зал в историческом здании с современным оборудованием.',
    features: ['Парковка', 'Кейтеринг', 'Декор', 'Музыка'],
    image: '/api/placeholder/400/300',
    available: true
  },
  {
    id: 2,
    name: 'Sky Lounge',
    type: 'Ресторан',
    capacity: 'до 150 гостей',
    rating: 4.8,
    reviews: 89,
    price: 'от 35 000 ₽',
    location: 'Москва, небоскреб',
    description: 'Элегантный ресторан на 25 этаже с панорамным видом на город.',
    features: ['Панорамный вид', 'Кейтеринг', 'Бар', 'Терраса'],
    image: '/api/placeholder/400/300',
    available: true
  },
  {
    id: 3,
    name: 'Garden Villa',
    type: 'Загородный клуб',
    capacity: 'до 200 гостей',
    rating: 4.7,
    reviews: 203,
    price: 'от 80 000 ₽',
    location: 'Подмосковье',
    description: 'Уютный загородный клуб в окружении природы с собственным садом.',
    features: ['Сад', 'Бассейн', 'Спортзал', 'Проживание'],
    image: '/api/placeholder/400/300',
    available: false
  },
  {
    id: 4,
    name: 'Industrial Loft',
    type: 'Лофт',
    capacity: 'до 100 гостей',
    rating: 4.6,
    reviews: 67,
    price: 'от 25 000 ₽',
    location: 'Москва, арт-квартал',
    description: 'Стильный лофт в бывшем промышленном здании с индустриальным дизайном.',
    features: ['Индустриальный дизайн', 'Световое оборудование', 'Звук', 'Декор'],
    image: '/api/placeholder/400/300',
    available: true
  },
  {
    id: 5,
    name: 'Marina Club',
    type: 'Яхт-клуб',
    capacity: 'до 80 гостей',
    rating: 4.9,
    reviews: 124,
    price: 'от 120 000 ₽',
    location: 'Москва, набережная',
    description: 'Эксклюзивный яхт-клуб с выходом к воде и современной инфраструктурой.',
    features: ['Водная набережная', 'Яхты', 'Ресторан', 'Спа'],
    image: '/api/placeholder/400/300',
    available: true
  },
  {
    id: 6,
    name: 'Tech Hub',
    type: 'Конференц-зал',
    capacity: 'до 500 гостей',
    rating: 4.5,
    reviews: 45,
    price: 'от 100 000 ₽',
    location: 'Москва, бизнес-центр',
    description: 'Современный конференц-зал с передовым техническим оборудованием.',
    features: ['Проекторы', 'Звук', 'Wi-Fi', 'Кейтеринг'],
    image: '/api/placeholder/400/300',
    available: true
  }
]

const venueTypes = ['Все', 'Банкетный зал', 'Ресторан', 'Загородный клуб', 'Лофт', 'Яхт-клуб', 'Конференц-зал']
const locations = ['Все районы', 'Центр', 'Небоскреб', 'Подмосковье', 'Арт-квартал', 'Набережная', 'Бизнес-центр']

export default function LocationsPage() {
  const [selectedType, setSelectedType] = useState('Все')
  const [selectedLocation, setSelectedLocation] = useState('Все районы')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [showFilters, setShowFilters] = useState(false)

  const filteredVenues = venues.filter(venue => {
    const matchesType = selectedType === 'Все' || venue.type === selectedType
    const matchesLocation = selectedLocation === 'Все районы' || venue.location.includes(selectedLocation)
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venue.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesType && matchesLocation && matchesSearch
  })

  const sortedVenues = [...filteredVenues].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'price':
        return parseInt(a.price.match(/\d+/)?.[0] || '0') - parseInt(b.price.match(/\d+/)?.[0] || '0')
      case 'capacity':
        return parseInt(b.capacity.match(/\d+/)?.[0] || '0') - parseInt(a.capacity.match(/\d+/)?.[0] || '0')
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
            Локации для <span className="gradient-text">мероприятий</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Уникальные площадки для ваших особенных событий
          </motion.p>
        </div>
      </div>

      {/* Фильтры */}
      <div className="px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск локаций..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 glass-effect rounded-xl border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="w-5 h-5 text-white" />
              <span className="text-white">Фильтры</span>
            </motion.button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="rating">По рейтингу</option>
              <option value="price">По цене</option>
              <option value="capacity">По вместимости</option>
            </select>
          </div>

          {/* Расширенные фильтры */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-6 glass-effect rounded-xl border border-white/20"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Тип локации</label>
                    <div className="flex flex-wrap gap-2">
                      {venueTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                            selectedType === type
                              ? 'bg-primary-500 text-white'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Район</label>
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Сетка локаций */}
      <div className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {sortedVenues.map((venue, index) => (
                <VenueCard key={venue.id} venue={venue} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {sortedVenues.length === 0 && (
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

interface VenueCardProps {
  venue: typeof venues[0]
  index: number
}

function VenueCard({ venue, index }: VenueCardProps) {
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
              <h3 className="text-xl font-bold text-white mb-1">{venue.name}</h3>
              <p className="text-primary-400 font-medium">{venue.type}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white font-semibold">{venue.rating}</span>
              </div>
              <p className="text-gray-400 text-sm">{venue.reviews} отзывов</p>
            </div>
          </div>

          {/* Описание */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{venue.description}</p>

          {/* Вместимость и локация */}
          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{venue.capacity}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{venue.location}</span>
            </div>
          </div>

          {/* Особенности */}
          <div className="flex flex-wrap gap-2 mb-4">
            {venue.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300"
              >
                {feature}
              </span>
            ))}
            {venue.features.length > 3 && (
              <span className="px-2 py-1 bg-primary-500/20 rounded-lg text-xs text-primary-300">
                +{venue.features.length - 3}
              </span>
            )}
          </div>

          {/* Цена и кнопка */}
          <div className="flex items-center justify-between">
            <div className="text-primary-400 font-semibold">{venue.price}</div>
            <motion.button
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>3D тур</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Статус доступности */}
          <div className="mt-4 flex items-center justify-between">
            <div className={`flex items-center space-x-2 text-sm ${
              venue.available ? 'text-green-400' : 'text-red-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                venue.available ? 'bg-green-400' : 'bg-red-400'
              }`} />
              <span>{venue.available ? 'Доступно' : 'Занято'}</span>
            </div>
            {venue.available && (
              <motion.button
                className="text-primary-400 text-sm hover:text-primary-300 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Забронировать
              </motion.button>
            )}
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