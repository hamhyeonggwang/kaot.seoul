'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { MessageCircle, Calendar, User, Eye, ThumbsUp, MessageSquare, Plus, Search, Filter } from 'lucide-react'

export default function JobForumPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showWriteForm, setShowWriteForm] = useState(false)
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: '서울 지역 병원 작업치료사 채용 정보',
      content: '서울 지역 주요 병원에서 작업치료사 채용 공고가 있습니다. 경력과 자격 요건을 확인하시고 지원하시기 바랍니다.',
      author: '정취업',
      date: '2024-01-11',
      views: 298,
      likes: 45,
      comments: 23
    },
    {
      id: 2,
      title: '재활의학과 작업치료사 경력 개발 세미나',
      content: '재활의학과에서 작업치료사 경력 개발을 위한 세미나를 개최합니다. 전문성 향상과 경력 관리에 대한 정보를 공유합니다.',
      author: '김경력',
      date: '2024-01-10',
      views: 134,
      likes: 28,
      comments: 12
    }
  ])

  const [newPost, setNewPost] = useState({
    title: '',
    content: ''
  })

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.title.trim() && newPost.content.trim()) {
      const post = {
        id: posts.length + 1,
        title: newPost.title,
        content: newPost.content,
        author: '작성자',
        date: new Date().toISOString().split('T')[0],
        views: 0,
        likes: 0,
        comments: 0
      }
      setPosts([post, ...posts])
      setNewPost({ title: '', content: '' })
      setShowWriteForm(false)
    }
  }

  return (
    <main>
      <Navigation />
      
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/community" className="inline-flex items-center text-kaot-green-100 hover:text-white mb-4 transition-colors">
            ← 커뮤니티로 돌아가기
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">취업정보</h1>
          <p className="text-xl text-kaot-green-100">채용 정보와 경력 개발에 대한 정보를 공유하는 공간</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Write */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="게시글 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                />
              </div>
            </div>
            
            {/* Write Button */}
            <button
              onClick={() => setShowWriteForm(!showWriteForm)}
              className="bg-kaot-green-600 hover:bg-kaot-green-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              글쓰기
            </button>
          </div>
        </div>

        {/* Write Form */}
        {showWriteForm && (
          <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">새 글 작성</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                  placeholder="제목을 입력하세요"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                  placeholder="내용을 입력하세요"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-kaot-green-600 hover:bg-kaot-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  등록
                </button>
                <button
                  type="button"
                  onClick={() => setShowWriteForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded mr-3">
                      취업정보
                    </span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>작성자: {post.author}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {post.views}
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {post.likes}
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {post.comments}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">검색 결과가 없습니다.</div>
            <button
              onClick={() => setSearchTerm('')}
              className="text-kaot-green-600 hover:text-kaot-green-700 font-medium"
            >
              검색 조건 초기화
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
} 