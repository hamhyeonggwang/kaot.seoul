'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Save, X } from 'lucide-react'

export default function WritePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('기술공유')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const categories = ['공지사항', '기술공유', '사례공유', '질문답변', '일반토론']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/community', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          category,
          author: '김작업', // 실제로는 로그인된 사용자 정보 사용
          authorId: 1 // 실제로는 로그인된 사용자 ID 사용
        })
      })

      const result = await response.json()
      
      if (result.success) {
        alert('게시글이 성공적으로 작성되었습니다.')
        router.push('/community')
      } else {
        alert('게시글 작성 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('게시글 작성 중 오류:', error)
      alert('게시글 작성 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (title.trim() || content.trim()) {
      if (confirm('작성 중인 내용이 있습니다. 정말 나가시겠습니까?')) {
        router.push('/community')
      }
    } else {
      router.push('/community')
    }
  }

  return (
    <main>
      <Navigation />
      
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">게시글 작성</h1>
          <p className="text-xl text-kaot-green-100">커뮤니티에 새로운 글을 작성하세요</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                placeholder="게시글 제목을 입력하세요"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                placeholder="게시글 내용을 입력하세요"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-kaot-green-600 text-white rounded-lg hover:bg-kaot-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? '작성 중...' : '게시글 작성'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 flex items-center"
              >
                <X className="h-4 w-4 mr-2" />
                취소
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  )
} 