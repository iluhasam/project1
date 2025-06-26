import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'EventVerse - Кинематографичный маркетплейс мероприятий',
  description: 'Первый маркетплейс мероприятий с кинематографичным интерфейсом – где каждая локация и исполнитель оживают в 3D.',
  keywords: 'мероприятия, бронирование, фотографы, ведущие, декораторы, 3D, анимации',
  authors: [{ name: 'EventVerse Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'EventVerse - Кинематографичный маркетплейс мероприятий',
    description: 'Первый маркетплейс мероприятий с кинематографичным интерфейсом – где каждая локация и исполнитель оживают в 3D.',
    type: 'website',
    locale: 'ru_RU',
    url: 'http://localhost:3000',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className + " bg-white text-black dark:bg-black dark:text-white transition-colors duration-300"}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
} 