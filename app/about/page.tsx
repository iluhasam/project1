'use client'

import { motion } from 'framer-motion'
import { Users, Award, Target, Zap, Heart, Globe } from 'lucide-react'

const stats = [
  { number: '500+', label: 'Исполнителей', icon: Users },
  { number: '200+', label: 'Локаций', icon: Globe },
  { number: '1000+', label: 'Мероприятий', icon: Award },
  { number: '98%', label: 'Довольных клиентов', icon: Heart },
]

const team = [
  {
    name: 'Александр Петров',
    role: 'CEO & Основатель',
    description: '10+ лет в event-индустрии. Создал EventVerse с целью революционизировать рынок мероприятий.',
    image: '/api/placeholder/200/200'
  },
  {
    name: 'Мария Сидорова',
    role: 'CTO & Технический директор',
    description: 'Эксперт в 3D-графике и WebGL. Отвечает за все технические инновации платформы.',
    image: '/api/placeholder/200/200'
  },
  {
    name: 'Дмитрий Козлов',
    role: 'Head of Design',
    description: 'Креативный директор с опытом в UX/UI. Создает уникальный пользовательский опыт.',
    image: '/api/placeholder/200/200'
  },
  {
    name: 'Елена Волкова',
    role: 'Head of Marketing',
    description: 'Специалист по digital-маркетингу. Развивает бренд EventVerse на рынке.',
    image: '/api/placeholder/200/200'
  }
]

const values = [
  {
    icon: Target,
    title: 'Инновации',
    description: 'Мы постоянно внедряем новые технологии для улучшения пользовательского опыта.'
  },
  {
    icon: Heart,
    title: 'Качество',
    description: 'Каждый исполнитель проходит тщательную проверку и отбор.'
  },
  {
    icon: Zap,
    title: 'Скорость',
    description: 'Быстрый поиск и бронирование за несколько кликов.'
  },
  {
    icon: Users,
    title: 'Сообщество',
    description: 'Создаем сообщество профессионалов и клиентов.'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Hero секция */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            О <span className="gradient-text">EventVerse</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Первый маркетплейс мероприятий с кинематографичным интерфейсом. 
            Мы соединяем технологии и творчество, чтобы создать незабываемые события.
          </motion.p>

          {/* Статистика */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Миссия и видение */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Наша <span className="gradient-text">миссия</span>
              </h2>
              <p className="text-lg text-gray-400 mb-6">
                Сделать организацию мероприятий простой, увлекательной и технологичной. 
                Мы верим, что каждое событие должно быть особенным, а процесс его создания - приятным.
              </p>
              <p className="text-lg text-gray-400">
                EventVerse объединяет лучших исполнителей, уникальные локации и передовые технологии, 
                чтобы вы могли сосредоточиться на главном - создании незабываемых воспоминаний.
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full h-96 bg-gradient-to-br from-primary-500/20 to-champagne-500/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <p className="text-white text-xl font-semibold">Создаем будущее мероприятий</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ценности */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Наши <span className="gradient-text">ценности</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div
                  key={index}
                  className="p-6 glass-effect rounded-2xl border border-white/20 text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Наша <span className="gradient-text">команда</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-primary-400 font-medium mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="p-12 glass-effect rounded-2xl border border-white/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Готовы создать незабываемое мероприятие?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Присоединяйтесь к EventVerse и откройте для себя мир возможностей
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white font-semibold text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Начать поиск
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-white/20 rounded-xl text-white font-semibold text-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Связаться с нами
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 