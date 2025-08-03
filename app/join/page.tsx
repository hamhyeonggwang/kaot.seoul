'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function JoinPage() {
  const router = useRouter()

  useEffect(() => {
    // 회원가입 페이지 대신 뉴스레터 구독 페이지로 리다이렉트
    router.replace('/newsletter')
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kaot-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">페이지를 이동하고 있습니다...</p>
      </div>
    </div>
  )
} 