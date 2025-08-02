'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Plus, Search, MessageCircle, Eye, Heart, Calendar, User, Tag } from 'lucide-react'

interface Post {
  id: number
  title: string
  content: string
  author: string
  authorId: number
  category: string
  createdAt: string
  updatedAt: string
  views: number
  likes: number
  comments: Array<{
    id: number
    postId: number
    author: string
    authorId: number
    content: string
    createdAt: string
  }>
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/community')
      const result = await response.json()
      if (result.success) {
        setPosts(result.data)
      }
    } catch (error) {
      console.error('게시글 로드 중 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['all', '공지사항', '기술공유', '사례공유', '질문답변', '일반토론']

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter
    
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '공지사항':
        return 'bg-red-100 text-red-700'
      case '기술공유':
        return 'bg-blue-100 text-blue-700'
      case '사례공유':
        return 'bg-green-100 text-green-700'
      case '질문답변':
        return 'bg-yellow-100 text-yellow-700'
      case '일반토론':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <main>
      <Navigation />
      
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">커뮤니티</h1>
          <p className="text-xl text-kaot-green-100">서울지부 회원들과 소통하고 정보를 공유하세요</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">검색</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="제목, 내용, 작성자로 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? '전체' : category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <Link
                href="/community/write"
                className="w-full px-4 py-2 bg-kaot-green-600 text-white rounded-lg hover:bg-kaot-green-700 flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                새 글 작성
              </Link>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">게시글 목록 ({filteredPosts.length}개)</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="text-gray-500">게시글을 불러오는 중...</div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <div key={post.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(post.category)}`}>
                          {post.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                      
                      <Link href={`/community/${post.id}`} className="block">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-kaot-green-600">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {post.content}
                        </p>
                      </Link>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          <span>{post.comments.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredPosts.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-gray-500">검색 결과가 없습니다.</div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
} 