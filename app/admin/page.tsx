'use client'

import { useState } from 'react'
import { 
  Users, 
  FileText, 
  MessageCircle, 
  BarChart3, 
  Settings, 
  Download, 
  Upload,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  TrendingUp,
  AlertCircle
} from 'lucide-react'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Mock data
  const stats = [
    { title: '총 회원수', value: '1,234', change: '+12%', icon: <Users className="h-6 w-6" /> },
    { title: '오늘 방문자', value: '156', change: '+5%', icon: <Eye className="h-6 w-6" /> },
    { title: '총 게시글', value: '567', change: '+8%', icon: <FileText className="h-6 w-6" /> },
    { title: '총 댓글', value: '2,890', change: '+15%', icon: <MessageCircle className="h-6 w-6" /> }
  ]

  const recentPosts = [
    { id: 1, title: '2024년 정기총회 안내', author: '관리자', date: '2024-01-15', views: 245 },
    { id: 2, title: '작업치료 교육 프로그램 신청', author: '교육위원회', date: '2024-01-14', views: 189 },
    { id: 3, title: '회원 대상 건강검진 실시', author: '복지위원회', date: '2024-01-13', views: 156 }
  ]

  const recentComments = [
    { id: 1, post: '작업치료 기법에 대한 질문', author: '김작업', date: '2024-01-15', content: '좋은 정보 감사합니다!' },
    { id: 2, post: '교육 프로그램 문의', author: '이치료', date: '2024-01-14', content: '언제 신청 가능한가요?' },
    { id: 3, post: '자격증 갱신 관련', author: '박교육', date: '2024-01-13', content: '자세한 안내 부탁드립니다.' }
  ]

  const inquiries = [
    { id: 1, title: '회원가입 문의', author: '홍길동', date: '2024-01-15', status: '답변완료' },
    { id: 2, title: '교육 프로그램 일정', author: '김철수', date: '2024-01-14', status: '처리중' },
    { id: 3, title: '자료 다운로드 오류', author: '이영희', date: '2024-01-13', status: '대기중' }
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true)
    } else {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-kaot-green-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">관리자 로그인</h1>
            <p className="text-gray-600">관리자 계정으로 로그인하세요</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                아이디
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
                placeholder="admin"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
                placeholder="admin"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full btn-primary py-3"
            >
              로그인
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>테스트 계정: admin / admin</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">관리자 대시보드</h1>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8">
          {[
            { id: 'dashboard', name: '대시보드', icon: <BarChart3 className="h-4 w-4" /> },
            { id: 'posts', name: '게시판 관리', icon: <FileText className="h-4 w-4" /> },
            { id: 'members', name: '회원 관리', icon: <Users className="h-4 w-4" /> },
            { id: 'comments', name: '댓글 관리', icon: <MessageCircle className="h-4 w-4" /> },
            { id: 'inquiries', name: '문의 관리', icon: <AlertCircle className="h-4 w-4" /> },
            { id: 'backup', name: '백업/복구', icon: <Download className="h-4 w-4" /> },
            { id: 'settings', name: '설정', icon: <Settings className="h-4 w-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-kaot-green-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change}</p>
                    </div>
                    <div className="text-kaot-green-600">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Posts */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 게시글</h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-gray-900">{post.title}</p>
                        <p className="text-sm text-gray-600">{post.author} • {post.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{post.views} 조회</span>
                        <button className="text-kaot-green-600 hover:text-kaot-green-700">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Comments */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 댓글</h3>
                <div className="space-y-4">
                  {recentComments.map((comment) => (
                    <div key={comment.id} className="p-3 bg-gray-50 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">{comment.post}</p>
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">{comment.content}</p>
                      <p className="text-xs text-gray-500 mt-1">{comment.author} • {comment.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Management */}
        {activeTab === 'posts' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">게시판 관리</h3>
              <button className="btn-primary inline-flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                새 게시판 생성
              </button>
            </div>
            <div className="space-y-4">
              {['지부소식', '커뮤니티', '정보마당', '공지사항'].map((board, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded">
                  <div>
                    <h4 className="font-medium text-gray-900">{board}</h4>
                    <p className="text-sm text-gray-600">게시글 24개 • 댓글 156개</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-kaot-green-600 hover:text-kaot-green-700">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Members Management */}
        {activeTab === 'members' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">회원 관리</h3>
              <button className="btn-primary inline-flex items-center">
                <Download className="h-4 w-4 mr-2" />
                회원 명단 다운로드
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">자격번호</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가입일</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { name: '김작업', license: '12345678', joinDate: '2024-01-15', status: '활성' },
                    { name: '이치료', license: '87654321', joinDate: '2024-01-14', status: '활성' },
                    { name: '박교육', license: '11223344', joinDate: '2024-01-13', status: '대기' }
                  ].map((member, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.license}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.joinDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          member.status === '활성' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-kaot-green-600 hover:text-kaot-green-900 mr-2">수정</button>
                        <button className="text-red-600 hover:text-red-900">삭제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Comments Management */}
        {activeTab === 'comments' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">댓글 관리</h3>
            <div className="space-y-4">
              {recentComments.map((comment) => (
                <div key={comment.id} className="border rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{comment.post}</p>
                      <p className="text-sm text-gray-600">{comment.author} • {comment.date}</p>
                    </div>
                    <button className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inquiries Management */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">문의 관리</h3>
            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <div key={inquiry.id} className="border rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{inquiry.title}</p>
                      <p className="text-sm text-gray-600">{inquiry.author} • {inquiry.date}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      inquiry.status === '답변완료' ? 'bg-green-100 text-green-800' :
                      inquiry.status === '처리중' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <button className="text-kaot-green-600 hover:text-kaot-green-700 text-sm">답변하기</button>
                    <button className="text-red-600 hover:text-red-700 text-sm">삭제</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Backup and Restore */}
        {activeTab === 'backup' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">백업 및 복구</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded p-4">
                <h4 className="font-medium text-gray-900 mb-4">데이터 백업</h4>
                <div className="space-y-3">
                  <button className="w-full btn-primary inline-flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    전체 데이터 백업
                  </button>
                  <button className="w-full btn-secondary inline-flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    회원 데이터 백업
                  </button>
                  <button className="w-full btn-secondary inline-flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    게시글 데이터 백업
                  </button>
                </div>
              </div>
              <div className="border rounded p-4">
                <h4 className="font-medium text-gray-900 mb-4">데이터 복구</h4>
                <div className="space-y-3">
                  <button className="w-full btn-primary inline-flex items-center justify-center">
                    <Upload className="h-4 w-4 mr-2" />
                    백업 파일 업로드
                  </button>
                  <p className="text-sm text-gray-600">최근 백업: 2024-01-15 14:30</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">시스템 설정</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">카테고리 관리</h4>
                <div className="space-y-2">
                  {['공지사항', '교육', '복지', '연구'].map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span>{category}</span>
                      <div className="flex space-x-2">
                        <button className="text-kaot-green-600 hover:text-kaot-green-700">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">시스템 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><span className="font-medium">서버 상태:</span> 정상</p>
                    <p><span className="font-medium">데이터베이스:</span> 연결됨</p>
                  </div>
                  <div>
                    <p><span className="font-medium">마지막 업데이트:</span> 2024-01-15</p>
                    <p><span className="font-medium">버전:</span> 1.0.0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 