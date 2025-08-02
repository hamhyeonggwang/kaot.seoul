'use client'

import { useState, useEffect } from 'react'

import { Plus, Edit, Trash2, Save, X, Eye, Calendar, User, Tag, BarChart3, Users, Newspaper, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface NewsItem {
  id: number
  title: string
  content: string
  category: string
  date: string
  author: string
  views: number
  tags: string[]
}

export default function AdminPage() {
  const [newsData, setNewsData] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // 인증 체크
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession')
    if (!adminSession) {
      router.push('/admin/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminSession')
    localStorage.removeItem('adminUser')
    router.push('/admin/login')
  }

  // 데이터 로드
  useEffect(() => {
    fetchNewsData()
  }, [])

  const fetchNewsData = async () => {
    try {
      const response = await fetch('/api/news')
      const result = await response.json()
      if (result.success) {
        setNewsData(result.data)
      }
    } catch (error) {
      console.error('데이터 로드 중 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  const [showForm, setShowForm] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [formData, setFormData] = useState<Omit<NewsItem, 'id' | 'views'>>({
    title: '',
    content: '',
    category: '공지사항',
    date: new Date().toISOString().split('T')[0],
    author: 'KAOT 서울지부',
    tags: []
  })
  const [tagInput, setTagInput] = useState('')

  const categories = ['공지사항', '지부사업', '교육', '통계', '정책', '국제협력']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingNews) {
        // 수정
        const response = await fetch('/api/news', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: editingNews.id,
            ...formData
          })
        })
        
        const result = await response.json()
        if (result.success) {
          await fetchNewsData() // 데이터 다시 로드
          alert('지부소식이 성공적으로 수정되었습니다.')
        } else {
          alert('수정 중 오류가 발생했습니다.')
        }
      } else {
        // 새로 추가
        const response = await fetch('/api/news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        })
        
        const result = await response.json()
        if (result.success) {
          await fetchNewsData() // 데이터 다시 로드
          alert('지부소식이 성공적으로 추가되었습니다.')
        } else {
          alert('추가 중 오류가 발생했습니다.')
        }
      }
      
      resetForm()
    } catch (error) {
      console.error('API 호출 중 오류:', error)
      alert('오류가 발생했습니다.')
    }
  }

  const handleEdit = (news: NewsItem) => {
    setEditingNews(news)
    setFormData({
      title: news.title,
      content: news.content,
      category: news.category,
      date: news.date,
      author: news.author,
      tags: [...news.tags]
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/news?id=${id}`, {
          method: 'DELETE',
        })
        
        const result = await response.json()
        if (result.success) {
          await fetchNewsData() // 데이터 다시 로드
          alert('지부소식이 성공적으로 삭제되었습니다.')
        } else {
          alert('삭제 중 오류가 발생했습니다.')
        }
      } catch (error) {
        console.error('삭제 중 오류:', error)
        alert('오류가 발생했습니다.')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: '공지사항',
      date: new Date().toISOString().split('T')[0],
      author: 'KAOT 서울지부',
      tags: []
    })
    setTagInput('')
    setEditingNews(null)
    setShowForm(false)
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  return (
    <>
      
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">관리자 페이지</h1>
              <p className="text-xl text-kaot-green-100">지부소식 관리</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-kaot-green-600 rounded-lg hover:bg-gray-100 flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              로그아웃
            </button>
          </div>
        </div>
      </section>

      {/* Admin Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <a href="/admin/dashboard" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-kaot-green-100">
                <BarChart3 className="h-6 w-6 text-kaot-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">대시보드</h3>
                <p className="text-sm text-gray-600">통계 및 현황 확인</p>
              </div>
            </div>
          </a>

          <a href="/admin/members" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">회원 관리</h3>
                <p className="text-sm text-gray-600">회원 정보 관리</p>
              </div>
            </div>
          </a>

          <a href="/admin" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <Newspaper className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">지부소식 관리</h3>
                <p className="text-sm text-gray-600">뉴스 및 공지사항 관리</p>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Add/Edit Form */}
        {showForm && (
          <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingNews ? '지부소식 수정' : '새 지부소식 추가'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">날짜</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">작성자</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">태그</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="태그를 입력하고 Enter"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-kaot-green-600 text-white rounded-lg hover:bg-kaot-green-700"
                  >
                    추가
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-kaot-green-100 text-kaot-green-700 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-kaot-green-500 hover:text-kaot-green-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-kaot-green-600 text-white rounded-lg hover:bg-kaot-green-700 flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingNews ? '수정' : '추가'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        )}

                 {/* News List */}
         <div className="bg-white rounded-lg shadow-lg">
           <div className="p-6 border-b border-gray-200">
             <div className="flex items-center justify-between">
               <h2 className="text-2xl font-bold text-gray-900">지부소식 목록</h2>
               <button
                 onClick={() => setShowForm(true)}
                 className="px-4 py-2 bg-kaot-green-600 text-white rounded-lg hover:bg-kaot-green-700 flex items-center"
               >
                 <Plus className="h-4 w-4 mr-2" />
                 새 지부소식 추가
               </button>
             </div>
           </div>

           {loading ? (
             <div className="p-8 text-center">
               <div className="text-gray-500">데이터를 불러오는 중...</div>
             </div>
           ) : (

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">조회수</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {newsData.map((news) => (
                  <tr key={news.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{news.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{news.title}</div>
                      <div className="text-sm text-gray-500">{news.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        news.category === '공지사항' ? 'bg-red-100 text-red-700' :
                        news.category === '지부사업' ? 'bg-yellow-100 text-yellow-700' :
                        news.category === '교육' ? 'bg-blue-100 text-blue-700' :
                        news.category === '통계' ? 'bg-green-100 text-green-700' :
                        news.category === '정책' ? 'bg-purple-100 text-purple-700' :
                        news.category === '국제협력' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {news.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{news.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{news.views}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(news)}
                          className="text-kaot-green-600 hover:text-kaot-green-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(news.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                             </tbody>
             </table>
           </div>
           )}
         </div>
      </div>

    </>
  )
} 