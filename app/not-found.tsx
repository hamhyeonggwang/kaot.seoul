import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-kaot-green-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-kaot-green-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">페이지를 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-flex items-center bg-kaot-green-600 text-white px-6 py-3 rounded-lg hover:bg-kaot-green-700 transition-colors duration-200"
          >
            <Home className="h-5 w-5 mr-2" />
            홈으로 돌아가기
          </Link>
          
          <div className="text-sm text-gray-500">
            <Link href="/info" className="text-kaot-green-600 hover:text-kaot-green-700 mr-4">
              정보마당
            </Link>
            <Link href="/news" className="text-kaot-green-600 hover:text-kaot-green-700 mr-4">
              지부소식
            </Link>
            <Link href="/community" className="text-kaot-green-600 hover:text-kaot-green-700">
              커뮤니티
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 