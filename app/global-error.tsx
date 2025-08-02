'use client'

import Link from 'next/link'
import { RefreshCw, Home } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-kaot-green-50 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-red-600 mb-4">500</h1>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">서버 오류가 발생했습니다</h2>
              <p className="text-gray-600 mb-8">
                일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={reset}
                className="inline-flex items-center bg-kaot-green-600 text-white px-6 py-3 rounded-lg hover:bg-kaot-green-700 transition-colors duration-200 mr-4"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                다시 시도
              </button>
              
              <Link 
                href="/"
                className="inline-flex items-center bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <Home className="h-5 w-5 mr-2" />
                홈으로 돌아가기
              </Link>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm text-gray-600 mb-2">
                  개발자 정보 (개발 모드에서만 표시)
                </summary>
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
                  {error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  )
} 