// Типы для исполнителей
export interface Performer {
  id: number
  name: string
  category: string
  rating: number
  reviews: number
  price: string
  location: string
  experience: string
  image: string
  tags: string[]
  description: string
  portfolio: string[]
}

// Типы для локаций
export interface Venue {
  id: number
  name: string
  type: string
  capacity: string
  rating: number
  reviews: number
  price: string
  location: string
  description: string
  features: string[]
  image: string
  available: boolean
}

// Типы для категорий
export interface Category {
  id: number
  name: string
  description: string
  icon: any
  color: string
  bgColor: string
  borderColor: string
  count: string
  rating: number
  scene: string
}

// Типы для голосового поиска
export interface VoiceSearchResult {
  transcript: string
  keywords: string[]
  confidence: number
}

// Типы для пользователя
export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  role: 'client' | 'performer' | 'admin'
  preferences?: UserPreferences
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: 'ru' | 'en'
  notifications: boolean
}

// Типы для бронирования
export interface Booking {
  id: number
  userId: number
  performerId?: number
  venueId?: number
  date: string
  time: string
  duration: number
  guests: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  totalPrice: number
  createdAt: string
}

// Типы для отзывов
export interface Review {
  id: number
  userId: number
  performerId?: number
  venueId?: number
  rating: number
  comment: string
  images?: string[]
  createdAt: string
}

// Типы для событий
export interface Event {
  id: number
  name: string
  type: 'wedding' | 'corporate' | 'birthday' | 'conference' | 'other'
  date: string
  location: string
  description: string
  budget: number
  guests: number
  status: 'planning' | 'confirmed' | 'completed'
  performers: Performer[]
  venue?: Venue
}

// Типы для API ответов
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Типы для фильтров
export interface SearchFilters {
  category?: string
  location?: string
  priceRange?: string
  rating?: number
  date?: string
  guests?: number
}

// Типы для 3D сцен
export interface Scene3D {
  id: string
  name: string
  model: string
  textures: string[]
  animations: string[]
  camera: {
    position: [number, number, number]
    target: [number, number, number]
  }
}

// Типы для анимаций
export interface AnimationConfig {
  type: 'fade' | 'slide' | 'scale' | 'rotate'
  duration: number
  delay?: number
  easing?: string
  direction?: 'in' | 'out'
}

// Типы для уведомлений
export interface Notification {
  id: number
  userId: number
  type: 'booking' | 'message' | 'reminder' | 'system'
  title: string
  message: string
  read: boolean
  createdAt: string
  actionUrl?: string
}

// Типы для сообщений
export interface Message {
  id: number
  senderId: number
  receiverId: number
  content: string
  type: 'text' | 'image' | 'file'
  read: boolean
  createdAt: string
}

// Типы для платежей
export interface Payment {
  id: number
  bookingId: number
  amount: number
  currency: string
  method: 'card' | 'bank' | 'crypto'
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  transactionId?: string
  createdAt: string
}

// Типы для статистики
export interface Statistics {
  totalBookings: number
  totalRevenue: number
  averageRating: number
  totalUsers: number
  totalPerformers: number
  totalVenues: number
  monthlyGrowth: number
  topCategories: Array<{
    name: string
    count: number
    revenue: number
  }>
}

// Типы для настроек приложения
export interface AppSettings {
  maintenance: boolean
  registrationEnabled: boolean
  maxFileSize: number
  allowedFileTypes: string[]
  maxGuests: number
  minBookingDays: number
  maxBookingDays: number
}

// Типы для SEO
export interface SEOData {
  title: string
  description: string
  keywords: string[]
  image?: string
  url: string
  type: 'website' | 'article' | 'profile'
}

// Типы для аналитики
export interface AnalyticsEvent {
  name: string
  properties: Record<string, any>
  timestamp: string
  userId?: number
  sessionId: string
}

// Типы для кэша
export interface CacheItem<T> {
  key: string
  data: T
  timestamp: number
  ttl: number
}

// Типы для ошибок
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: string
  userId?: number
}

// Типы для логов
export interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error'
  message: string
  context?: Record<string, any>
  timestamp: string
  userId?: number
  sessionId?: string
} 