'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, X } from 'lucide-react'

interface VoiceSearchProps {
  onClose: () => void
}

export default function VoiceSearch({ onClose }: VoiceSearchProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [keywords, setKeywords] = useState<string[]>([])
  const [audioLevel, setAudioLevel] = useState(0)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Инициализация Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'ru-RU'

      recognitionRef.current.onstart = () => {
        setIsRecording(true)
        setTranscript('')
        setKeywords([])
      }

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = ''
        let interimTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        const fullTranscript = finalTranscript + interimTranscript
        setTranscript(fullTranscript)

        // Извлечение ключевых слов
        const extractedKeywords = extractKeywords(fullTranscript)
        setKeywords(extractedKeywords)

        // Симуляция уровня звука
        setAudioLevel(Math.random() * 100)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Ошибка распознавания речи:', event.error)
        setIsRecording(false)
      }

      recognitionRef.current.onend = () => {
        setIsRecording(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const extractKeywords = (text: string): string[] => {
    const keywordPatterns = [
      /фотограф/gi,
      /ведущий/gi,
      /декоратор/gi,
      /артист/gi,
      /локация/gi,
      /зал/gi,
      /свадьба/gi,
      /корпоратив/gi,
      /день рождения/gi,
      /ретро/gi,
      /классика/gi,
      /современный/gi,
      /элегантный/gi,
      /веселый/gi
    ]

    const foundKeywords: string[] = []
    keywordPatterns.forEach(pattern => {
      const matches = text.match(pattern)
      if (matches) {
        foundKeywords.push(...matches.map(match => match.toLowerCase()))
      }
    })

    return [...new Set(foundKeywords)]
  }

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start()
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const handleSubmit = () => {
    if (transcript.trim()) {
      // Здесь будет логика отправки поискового запроса
      console.log('Голосовой поиск:', transcript)
      console.log('Ключевые слова:', keywords)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="absolute top-full left-0 right-0 mt-4 p-6 glass-effect rounded-2xl border border-white/20"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">Голосовой поиск</h3>
          <motion.button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Индикатор записи */}
        <div className="flex items-center justify-center mb-6">
          <motion.div
            className={`relative w-20 h-20 rounded-full flex items-center justify-center ${
              isRecording ? 'bg-red-500' : 'bg-gray-600'
            }`}
            animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {isRecording ? (
              <MicOff className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
            
            {/* Звуковая волна */}
            {isRecording && (
              <div className="absolute inset-0 flex items-center justify-center space-x-1">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-white rounded-full"
                    animate={{
                      height: [10, 30, 10],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Уровень звука */}
        {isRecording && (
          <motion.div
            className="w-full h-2 bg-white/20 rounded-full mb-4 overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
              animate={{ width: `${audioLevel}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>
        )}

        {/* Транскрипт */}
        {transcript && (
          <motion.div
            className="mb-4 p-4 bg-white/5 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-white text-sm mb-2">Распознанный текст:</p>
            <p className="text-gray-300">{transcript}</p>
          </motion.div>
        )}

        {/* Ключевые слова */}
        {keywords.length > 0 && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-white text-sm mb-2">Ключевые слова:</p>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-300 text-xs"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {keyword}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Кнопки управления */}
        <div className="flex gap-3">
          {!isRecording ? (
            <motion.button
              onClick={startRecording}
              className="flex-1 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg text-white font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Начать запись
            </motion.button>
          ) : (
            <motion.button
              onClick={stopRecording}
              className="flex-1 py-3 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Остановить запись
            </motion.button>
          )}

          {transcript && (
            <motion.button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-white font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Найти
            </motion.button>
          )}
        </div>

        {/* Подсказка */}
        <p className="text-gray-400 text-xs mt-3 text-center">
          Попробуйте сказать: "Найдите фотографа в стиле ретро" или "Покажите залы для свадьбы"
        </p>
      </motion.div>
    </AnimatePresence>
  )
} 