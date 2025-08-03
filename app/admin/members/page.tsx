'use client'

import { useState, useEffect } from 'react'

import { Users, Plus, Edit, Trash2, Search, Filter, Download, Upload, RefreshCw, Database, CheckCircle, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Member {
  id: number
  name: string
  email: string
  phone: string
  licenseNumber: string
  workplace: string
  specialty: string
  joinDate: string
  status: string
  membershipType?: string
  lastLogin?: string
}

interface GoogleAppsScriptStatus {
  connected: boolean
  message: string
  loading: boolean
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [googleAppsScriptStatus, setGoogleAppsScriptStatus] = useState<GoogleAppsScriptStatus>({
    connected: false,
    message: '연결 상태 확인 중...',
    loading: true
  })
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    licenseNumber: '',
    workplace: '',
    specialty: '',
    membershipType: '일반회원'
  })
  const router = useRouter()

  // 인증 체크
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession')
    if (!adminSession) {
      router.push('/admin/login')
    }
  }, [router])

  useEffect(() => {
    checkGoogleAppsScriptConnection()
    fetchMembers()
  }, [])

  const checkGoogleAppsScriptConnection = async () => {
    try {
      const response = await fetch('/api/google-apps-script/test')
      const result = await response.json()
      
      setGoogleAppsScriptStatus({
        connected: result.success,
        message: result.success ? 'Google Apps Script 연결됨' : result.error || '연결 실패',
        loading: false
      })
    } catch (error) {
      console.error('Google Apps Script 연결 테스트 중 오류:', error)
      setGoogleAppsScriptStatus({
        connected: false,
        message: '연결 테스트 중 오류 발생',
        loading: false
      })
    }
  }

  const fetchMembers = async () => {
    try {
      setLoading(true)
      
      // 항상 API에서 데이터 가져오기 (로컬 + Google 데이터)
      const response = await fetch('/api/members')
      const result = await response.json()
      
      if (result.success) {
        setMembers(result.data || [])
        console.log('회원 데이터 로드 성공:', result.data)
      } else {
        console.error('회원 데이터 로드 실패:', result.error)
        // 실패 시 더미 데이터 사용
        setMembers(getDummyMembers())
      }
    } catch (error) {
      console.error('회원 데이터 로드 중 오류:', error)
      setMembers(getDummyMembers())
    } finally {
      setLoading(false)
    }
  }

  const getDummyMembers = (): Member[] => {
    return [
      {
        id: 1,
        name: '김작업',
        email: 'kim@example.com',
        phone: '010-1234-5678',
        licenseNumber: 'OT-2024-001',
        workplace: '서울대학교병원',
        specialty: '재활치료',
        joinDate: '2024-01-15',
        status: '활성',
        membershipType: '정회원',
        lastLogin: '2024-01-20'
      },
      {
        id: 2,
        name: '이치료',
        email: 'lee@example.com',
        phone: '010-2345-6789',
        licenseNumber: 'OT-2024-002',
        workplace: '연세대학교병원',
        specialty: '소아치료',
        joinDate: '2024-01-20',
        status: '활성',
        membershipType: '정회원',
        lastLogin: '2024-01-21'
      },
      {
        id: 3,
        name: '박재활',
        email: 'park@example.com',
        phone: '010-3456-7890',
        licenseNumber: 'OT-2024-003',
        workplace: '고려대학교병원',
        specialty: '노인치료',
        joinDate: '2024-01-25',
        status: '대기',
        membershipType: '준회원',
        lastLogin: '2024-01-26'
      }
    ]
  }

  const handleAddMember = async () => {
    try {
      if (googleAppsScriptStatus.connected) {
        // Google Apps Script에 회원 추가
        const response = await fetch('/api/members', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMember),
        })
        
        const result = await response.json()
        if (result.success) {
          alert('회원이 성공적으로 추가되었습니다.')
          setShowAddModal(false)
          setNewMember({
            name: '',
            email: '',
            phone: '',
            licenseNumber: '',
            workplace: '',
            specialty: '',
            membershipType: '일반회원'
          })
          fetchMembers()
        } else {
          alert('회원 추가 중 오류가 발생했습니다: ' + result.error)
        }
      } else {
        // 더미 데이터에 추가
        const newId = Math.max(...members.map(m => m.id)) + 1
        const member: Member = {
          id: newId,
          ...newMember,
          joinDate: new Date().toISOString().split('T')[0],
          status: '대기',
          lastLogin: new Date().toISOString().split('T')[0]
        }
        setMembers([...members, member])
        setShowAddModal(false)
        setNewMember({
          name: '',
          email: '',
          phone: '',
          licenseNumber: '',
          workplace: '',
          specialty: '',
          membershipType: '일반회원'
        })
        alert('회원이 추가되었습니다. (더미 데이터)')
      }
    } catch (error) {
      console.error('회원 추가 중 오류:', error)
      alert('회원 추가 중 오류가 발생했습니다.')
    }
  }

  const handleEditMember = async () => {
    if (!selectedMember) return
    
    try {
      if (googleAppsScriptStatus.connected) {
        // Google Apps Script에서 회원 수정
        const response = await fetch('/api/members', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedMember),
        })
        
        const result = await response.json()
        if (result.success) {
          alert('회원 정보가 성공적으로 수정되었습니다.')
          setShowEditModal(false)
          setSelectedMember(null)
          fetchMembers()
        } else {
          alert('회원 정보 수정 중 오류가 발생했습니다: ' + result.error)
        }
      } else {
        // 더미 데이터에서 수정
        setMembers(members.map(m => m.id === selectedMember.id ? selectedMember : m))
        setShowEditModal(false)
        setSelectedMember(null)
        alert('회원 정보가 수정되었습니다. (더미 데이터)')
      }
    } catch (error) {
      console.error('회원 정보 수정 중 오류:', error)
      alert('회원 정보 수정 중 오류가 발생했습니다.')
    }
  }

  const handleDeleteMember = async (id: number) => {
    if (!confirm('정말로 이 회원을 삭제하시겠습니까?')) return
    
    try {
      if (googleAppsScriptStatus.connected) {
        // Google Apps Script에서 회원 삭제
        const response = await fetch('/api/members', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        })
        
        const result = await response.json()
        if (result.success) {
          alert('회원이 성공적으로 삭제되었습니다.')
          fetchMembers()
        } else {
          alert('회원 삭제 중 오류가 발생했습니다: ' + result.error)
        }
      } else {
        // 더미 데이터에서 삭제
        setMembers(members.filter(m => m.id !== id))
        alert('회원이 삭제되었습니다. (더미 데이터)')
      }
    } catch (error) {
      console.error('회원 삭제 중 오류:', error)
      alert('회원 삭제 중 오류가 발생했습니다.')
    }
  }

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || member.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  return (
    <>
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-white bg-opacity-20">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-4xl font-bold text-white">회원 관리</h1>
                <p className="text-xl text-kaot-green-100">대한작업치료사협회 서울지부 회원 관리</p>
              </div>
            </div>
            
            {/* Google Apps Script 상태 */}
            <div className="flex items-center space-x-4">
              <div className={`flex items-center px-3 py-2 rounded-lg ${
                googleAppsScriptStatus.connected 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {googleAppsScriptStatus.loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                ) : googleAppsScriptStatus.connected ? (
                  <CheckCircle className="h-4 w-4 mr-2" />
                ) : (
                  <XCircle className="h-4 w-4 mr-2" />
                )}
                <span className="text-sm font-medium">
                  {googleAppsScriptStatus.message}
                </span>
              </div>
              
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 bg-white text-kaot-green-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                회원 추가
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 검색 및 필터 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="회원 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
              >
                <option value="all">전체 상태</option>
                <option value="활성">활성</option>
                <option value="대기">대기</option>
                <option value="비활성">비활성</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={fetchMembers}
                className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                새로고침
              </button>
              
              <button className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                내보내기
              </button>
            </div>
          </div>
        </div>

        {/* 회원 목록 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-kaot-green-600" />
              <p className="mt-2 text-gray-600">회원 데이터를 불러오는 중...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회원 정보</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연락처</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">근무기관</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가입일</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.licenseNumber}</div>
                          <div className="text-sm text-gray-500">{member.specialty}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{member.email}</div>
                        <div className="text-sm text-gray-500">{member.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {member.workplace}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {member.joinDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          member.status === '활성' ? 'bg-green-100 text-green-800' :
                          member.status === '대기' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedMember(member)
                              setShowEditModal(true)
                            }}
                            className="text-kaot-green-600 hover:text-kaot-green-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteMember(member.id)}
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
          
          {!loading && filteredMembers.length === 0 && (
            <div className="p-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto" />
              <p className="mt-2 text-gray-600">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* 회원 추가 모달 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">새 회원 추가</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="이름"
                value={newMember.name}
                onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="이메일"
                value={newMember.email}
                onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="전화번호"
                value={newMember.phone}
                onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="자격번호"
                value={newMember.licenseNumber}
                onChange={(e) => setNewMember({...newMember, licenseNumber: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="근무기관"
                value={newMember.workplace}
                onChange={(e) => setNewMember({...newMember, workplace: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="전문분야"
                value={newMember.specialty}
                onChange={(e) => setNewMember({...newMember, specialty: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
              />
              <select
                value={newMember.membershipType}
                onChange={(e) => setNewMember({...newMember, membershipType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
              >
                <option value="일반회원">일반회원</option>
                <option value="정회원">정회원</option>
                <option value="준회원">준회원</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                취소
              </button>
              <button
                onClick={handleAddMember}
                className="px-4 py-2 bg-kaot-green-600 text-white rounded-lg hover:bg-kaot-green-700"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 회원 수정 모달 */}
      {showEditModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">회원 정보 수정</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="이름"
                value={selectedMember.name}
                onChange={(e) => setSelectedMember({...selectedMember, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="이메일"
                value={selectedMember.email}
                onChange={(e) => setSelectedMember({...selectedMember, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="전화번호"
                value={selectedMember.phone}
                onChange={(e) => setSelectedMember({...selectedMember, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="자격번호"
                value={selectedMember.licenseNumber}
                onChange={(e) => setSelectedMember({...selectedMember, licenseNumber: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="근무기관"
                value={selectedMember.workplace}
                onChange={(e) => setSelectedMember({...selectedMember, workplace: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="전문분야"
                value={selectedMember.specialty}
                onChange={(e) => setSelectedMember({...selectedMember, specialty: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
              />
              <select
                value={selectedMember.status}
                onChange={(e) => setSelectedMember({...selectedMember, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
              >
                <option value="활성">활성</option>
                <option value="대기">대기</option>
                <option value="비활성">비활성</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                취소
              </button>
              <button
                onClick={handleEditMember}
                className="px-4 py-2 bg-kaot-green-600 text-white rounded-lg hover:bg-kaot-green-700"
              >
                수정
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 