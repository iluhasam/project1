'use client'

import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="text-center">
        <motion.div
          className="flex justify-center space-x-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-primary-500 rounded-full"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        
        <motion.p
          className="text-white text-lg font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Загружаем EventVerse...
        </motion.p>
        
        <motion.div
          className="mt-4 w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </div>
  )
} 