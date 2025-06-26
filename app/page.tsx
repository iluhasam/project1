'use client'

import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import CategoriesSection from '@/components/CategoriesSection'
import ParallaxSection from '@/components/ParallaxSection'
import Navigation from '@/components/Navigation'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Navigation />
      
      <Suspense fallback={<LoadingSpinner />}>
        <HeroSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-dark-800 animate-pulse" />}>
        <CategoriesSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-screen bg-dark-800 animate-pulse" />}>
        <ParallaxSection />
      </Suspense>
    </main>
  )
} 