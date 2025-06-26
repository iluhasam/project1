# 🚀 Настройка и запуск EventVerse

## 📋 Предварительные требования

Перед запуском проекта убедитесь, что у вас установлены:

- **Node.js** версии 18 или выше
- **npm** или **yarn** пакетный менеджер
- **Git** для клонирования репозитория

### Проверка версий

```bash
node --version  # Должно быть v18.0.0 или выше
npm --version   # Должно быть 8.0.0 или выше
git --version   # Любая актуальная версия
```

## 🛠 Установка и настройка

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd eventverse
```

### 2. Установка зависимостей

```bash
npm install
# или
yarn install
```

### 3. Запуск в режиме разработки

```bash
npm run dev
# или
yarn dev
```

После успешного запуска откройте браузер и перейдите по адресу:
**http://localhost:3000**

## 🎯 Структура проекта

```
eventverse/
├── app/                    # Next.js App Router
│   ├── globals.css        # Глобальные стили
│   ├── layout.tsx         # Корневой layout
│   ├── page.tsx           # Главная страница
│   ├── catalog/           # Страница каталога
│   ├── locations/         # Страница локаций
│   ├── performers/        # Страница исполнителей
│   └── about/             # Страница "О нас"
├── components/            # React компоненты
│   ├── Navigation.tsx     # Навигация
│   ├── HeroSection.tsx    # Hero секция
│   ├── CategoriesSection.tsx # Категории
│   ├── ParallaxSection.tsx   # 3D параллакс
│   ├── ChampagneBackground.tsx # WebGL фон
│   ├── VoiceSearch.tsx    # Голосовой поиск
│   └── LoadingSpinner.tsx # Загрузка
├── types/                 # TypeScript типы
│   └── index.ts
├── utils/                 # Утилиты
│   └── index.ts
├── public/               # Статические файлы
├── tailwind.config.js    # Конфигурация Tailwind
├── next.config.js        # Конфигурация Next.js
├── tsconfig.json         # Конфигурация TypeScript
├── package.json          # Зависимости
└── README.md             # Документация
```

## 🔧 Конфигурация

### Tailwind CSS

Проект использует Tailwind CSS с кастомными цветами и анимациями:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { /* градиенты фиолетового */ },
        champagne: { /* градиенты золотого */ },
        dark: { /* оттенки темного */ }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        // ... другие анимации
      }
    }
  }
}
```

### Next.js

Конфигурация оптимизирована для 3D-контента:

```javascript
// next.config.js
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    // Поддержка 3D-моделей (.glb, .gltf)
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: { loader: 'file-loader' }
    });
    return config;
  }
}
```

## 🎨 Особенности дизайна

### Цветовая палитра

- **Primary**: Фиолетовые градиенты (#ed5aff → #b91cff)
- **Champagne**: Золотые градиенты (#f2cc6b → #edb73d)
- **Dark**: Темные оттенки (#0f172a → #1e293b)

### Анимации

- **Framer Motion**: Плавные переходы и микроанимации
- **GSAP**: Сложные анимации и параллакс-эффекты
- **Three.js**: 3D-анимации и интерактивные элементы

### Эффекты

- **Glass-morphism**: Стеклянные элементы с размытием
- **Gradient overlays**: Градиентные наложения
- **Particle effects**: Анимированные частицы
- **Hover animations**: Интерактивные эффекты при наведении

## 🚀 Развертывание

### Локальная сборка

```bash
npm run build
npm start
```

### Vercel (рекомендуется)

1. Подключите репозиторий к Vercel
2. Настройте переменные окружения (если необходимо)
3. Деплой произойдет автоматически

### Другие платформы

Проект совместим с:
- **Netlify**
- **Railway**
- **Heroku**
- **AWS Amplify**

## 🔍 Отладка

### Логи разработки

```bash
npm run dev
# Следите за консолью для ошибок
```

### Проверка типов

```bash
npx tsc --noEmit
```

### Линтинг

```bash
npm run lint
```

## 📱 Адаптивность

Проект полностью адаптивен и оптимизирован для:

- **Desktop**: 1920px и выше
- **Tablet**: 768px - 1024px
- **Mobile**: 320px - 767px

## 🌐 Браузерная поддержка

### Поддерживаемые браузеры

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Проверка поддержки

```javascript
// Проверка WebGL
const isWebGLSupported = () => {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch (e) {
    return false
  }
}

// Проверка Web Speech API
const isSpeechRecognitionSupported = () => {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
}
```

## 🔧 Пользовательские настройки

### Темная/светлая тема

Переключение темы доступно в навигации. Настройки сохраняются в localStorage.

### Голосовой поиск

Для работы голосового поиска требуется:
- HTTPS соединение (или localhost)
- Разрешение на доступ к микрофону
- Поддержка Web Speech API

### 3D-эффекты

Для оптимальной производительности 3D-эффектов:
- Используйте современный браузер
- Убедитесь в поддержке WebGL
- Закройте лишние вкладки

## 🐛 Известные проблемы

### WebGL на мобильных устройствах

Некоторые мобильные браузеры могут иметь проблемы с WebGL. В таких случаях 3D-эффекты автоматически отключаются.

### Голосовой поиск

- Работает только в HTTPS
- Требует разрешения микрофона
- Может не работать в некоторых браузерах

### Производительность

- На слабых устройствах 3D-эффекты могут быть отключены
- Рекомендуется использовать современные браузеры

## 📞 Поддержка

Если у вас возникли проблемы:

1. Проверьте консоль браузера на наличие ошибок
2. Убедитесь в совместимости браузера
3. Проверьте версии Node.js и npm
4. Очистите кэш браузера

## 🎉 Готово!

Теперь у вас есть полностью функциональный сайт EventVerse с:

- ✅ Интерактивными 3D-анимациями
- ✅ Голосовым поиском
- ✅ Современным дизайном
- ✅ Адаптивностью
- ✅ TypeScript поддержкой
- ✅ Оптимизацией производительности

Наслаждайтесь созданием незабываемых мероприятий! 🎊 