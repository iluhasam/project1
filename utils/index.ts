// Форматирование цены
export const formatPrice = (price: number, currency: string = '₽'): string => {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ' + currency
}

// Форматирование даты
export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  
  return new Intl.DateTimeFormat('ru-RU', options || defaultOptions).format(new Date(date))
}

// Форматирование времени
export const formatTime = (time: string): string => {
  return time.slice(0, 5) // Убираем секунды
}

// Получение инициалов из имени
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Генерация случайного ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

// Проверка валидности email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Проверка валидности телефона
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Ограничение длины текста
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Клонирование объекта
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T
  if (typeof obj === 'object') {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}

// Дебаунс функция
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Троттлинг функция
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Получение случайного элемента из массива
export const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

// Перемешивание массива
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Группировка массива по ключу
export const groupBy = <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key])
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

// Сортировка массива по ключу
export const sortBy = <T, K extends keyof T>(
  array: T[],
  key: K,
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
}

// Фильтрация массива по условию
export const filterBy = <T>(
  array: T[],
  predicate: (item: T, index: number) => boolean
): T[] => {
  return array.filter(predicate)
}

// Уникальные элементы массива
export const unique = <T>(array: T[]): T[] => {
  return Array.from(new Set(array))
}

// Проверка на мобильное устройство
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// Проверка на планшет
export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false
  return /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768
}

// Получение размера экрана
export const getScreenSize = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop'
  
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

// Сохранение в localStorage
export const saveToStorage = (key: string, value: any): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

// Получение из localStorage
export const getFromStorage = <T>(key: string, defaultValue?: T): T | null => {
  if (typeof window === 'undefined') return defaultValue || null
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue || null
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return defaultValue || null
  }
}

// Удаление из localStorage
export const removeFromStorage = (key: string): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing from localStorage:', error)
  }
}

// Копирование в буфер обмена
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    }
  } catch (error) {
    console.error('Error copying to clipboard:', error)
    return false
  }
}

// Скачивание файла
export const downloadFile = (url: string, filename?: string): void => {
  const link = document.createElement('a')
  link.href = url
  link.download = filename || 'download'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Получение параметров URL
export const getUrlParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return {}
  
  const params = new URLSearchParams(window.location.search)
  const result: Record<string, string> = {}
  
  Array.from(params.entries()).forEach(([key, value]) => {
    result[key] = value
  })
  
  return result
}

// Установка параметров URL
export const setUrlParams = (params: Record<string, string>): void => {
  if (typeof window === 'undefined') return
  
  const url = new URL(window.location.href)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })
  
  window.history.pushState({}, '', url.toString())
}

// Форматирование размера файла
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Проверка поддержки WebGL
export const isWebGLSupported = (): boolean => {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch (e) {
    return false
  }
}

// Проверка поддержки Web Speech API
export const isSpeechRecognitionSupported = (): boolean => {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
}

// Получение случайного цвета
export const getRandomColor = (): string => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ]
  return getRandomElement(colors)
}

// Создание градиента
export const createGradient = (color1: string, color2: string, direction: string = 'to right'): string => {
  return `linear-gradient(${direction}, ${color1}, ${color2})`
}

// Анимация числа
export const animateNumber = (
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void
): void => {
  const startTime = performance.now()
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    const current = start + (end - start) * progress
    callback(Math.round(current))
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  
  requestAnimationFrame(animate)
}

// Получение расстояния между точками
export const getDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

// Ограничение значения в диапазоне
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

// Интерполяция между значениями
export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor
}

// Преобразование градусов в радианы
export const degToRad = (degrees: number): number => {
  return degrees * (Math.PI / 180)
}

// Преобразование радиан в градусы
export const radToDeg = (radians: number): number => {
  return radians * (180 / Math.PI)
} 