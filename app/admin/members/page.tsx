'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Plus, Edit, Trash2, Save, X, Search, Filter, User, Mail, Phone, Building, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Member {
  id: number
  name: string
  email: string
  phone: string
  licenseNumber: string
  joinDate: string
  status: 'active' | 'inactive'
  membershipType: '정회원' | '준회원' | '학생회원'
  workplace: string
  specialty: string
  lastLogin: string
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [membershipFilter, setMembershipFilter] = useState('all')
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

  const [formData, setFormData] = useState<Omit<Member, 'id' | 'joinDate' | 'lastLogin'>>({
    name: '',
    email: '',
    phone: '',
    licenseNumber: '',
    status: 'active',
    membershipType: '준회원',
    workplace: '',
    specialty: ''
  })

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/members')
      const result = await response.json()
      if (result.success) {
        setMembers(result.data)
      }
    } catch (error) {
      console.error('회원 데이터 로드 중 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingMember) {
        // 수정
        const response = await fetch('/api/members', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: editingMember.id,
            ...formData
          })
        })
        
        const result = await response.json()
        if (result.success) {
          await fetchMembers()
          alert('회원 정보가 성공적으로 수정되었습니다.')
        } else {
          alert('수정 중 오류가 발생했습니다.')
        }
      } else {
        // 새로 추가
        const response = await fetch('/api/members', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        })
        
        const result = await response.json()
        if (result.success) {
          await fetchMembers()
          alert('회원이 성공적으로 추가되었습니다.')
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

  const handleEdit = (member: Member) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      licenseNumber: member.licenseNumber,
      status: member.status,
      membershipType: member.membershipType,
      workplace: member.workplace,
      specialty: member.specialty
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/members?id=${id}`, {
          method: 'DELETE',
        })
        
        const result = await response.json()
        if (result.success) {
          await fetchMembers()
          alert('회원이 성공적으로 삭제되었습니다.')
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
      name: '',
      email: '',
      phone: '',
      licenseNumber: '',
      status: 'active',
      membershipType: '준회원',
      workplace: '',
      specialty: ''
    })
    setEditingMember(null)
    setShowForm(false)
  }

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter
    const matchesMembership = membershipFilter === 'all' || member.membershipType === membershipFilter
    
    return matchesSearch && matchesStatus && matchesMembership
  })

  const specialties = ['소아작업치료', '성인재활', '정신건강', '노인재활', '의료재활', '기타']

  return (
    <main>
      <Navigation />
      
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">회원 관리</h1>
              <p className="text-xl text-kaot-green-100">서울지부 회원 정보 관리</p>
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
        <div className="flex justify-center space-x-4">
          <a href="/admin/dashboard" className="px-4 py-2 bg-white text-kaot-green-600 border border-kaot-green-600 rounded-lg font-medium hover:bg-kaot-green-50">
            대시보드
          </a>
          <a href="/admin/members" className="px-4 py-2 bg-kaot-green-600 text-white rounded-lg font-medium">
            회원 관리
          </a>
          <a href="/admin" className="px-4 py-2 bg-white text-kaot-green-600 border border-kaot-green-600 rounded-lg font-medium hover:bg-kaot-green-50">
            지부소식 관리
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Add/Edit Form */}
        {showForm && (
          <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingMember ? '회원 정보 수정' : '새 회원 추가'}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">면허번호</label>
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                  >
                    <option value="active">활성</option>
                    <option value="inactive">비활성</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">회원 유형</label>
                  <select
                    value={formData.membershipType}
                    onChange={(e) => setFormData({...formData, membershipType: e.target.value as '정회원' | '준회원' | '학생회원'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                  >
                    <option value="정회원">정회원</option>
                    <option value="준회원">준회원</option>
                    <option value="학생회원">학생회원</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">근무지</label>
                  <input
                    type="text"
                    value={formData.workplace}
                    onChange={(e) => setFormData({...formData, workplace: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">전문분야</label>
                  <select
                    value={formData.specialty}
                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                  >
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-kaot-green-600 text-white rounded-lg hover:bg-kaot-green-700 flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingMember ? '수정' : '추가'}
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

        {/* Filters and Search */}
        <div className="mb-6 bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">검색</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="이름, 이메일, 면허번호로 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
              >
                <option value="all">전체</option>
                <option value="active">활성</option>
                <option value="inactive">비활성</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">회원 유형</label>
              <select
                value={membershipFilter}
                onChange={(e) => setMembershipFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
              >
                <option value="all">전체</option>
                <option value="정회원">정회원</option>
                <option value="준회원">준회원</option>
                <option value="학생회원">학생회원</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setShowForm(true)}
                className="w-full px-4 py-2 bg-kaot-green-600 text-white rounded-lg hover:bg-kaot-green-700 flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                새 회원 추가
              </button>
            </div>
          </div>
        </div>

        {/* Members List */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">회원 목록 ({filteredMembers.length}명)</h2>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회원 정보</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">면허번호</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회원 유형</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">근무지</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가입일</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-kaot-green-100 flex items-center justify-center">
                              <User className="h-6 w-6 text-kaot-green-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {member.email}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {member.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.licenseNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {member.status === 'active' ? '활성' : '비활성'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          member.membershipType === '정회원' ? 'bg-blue-100 text-blue-700' :
                          member.membershipType === '준회원' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {member.membershipType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Building className="h-4 w-4 mr-1" />
                          {member.workplace}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.joinDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(member)}
                            className="text-kaot-green-600 hover:text-kaot-green-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id)}
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

      <Footer />
    </main>
  )
} 