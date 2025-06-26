'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function PerformersPage() {
  const router = useRouter()

  useEffect(() => {
    // Редирект на каталог, так как страница исполнителей - это каталог
    router.push('/catalog')
  }, [router])

  return <LoadingSpinner />
} 