'use client'

import { useState } from 'react'
import { User, Mail, Phone, MapPin, Building, Award, Calendar, FileText, Users, Newspaper, ArrowRight } from 'lucide-react'

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    email: '',
    phone: '',
    address: '',
    workplace: '',
    position: '',
    experience: '',
    interests: '',
    memo: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const benefits = [
    {
      icon: <Users className="h-8 w-8" />,
      title: '전문가 네트워킹',
      description: '서울 지역 작업치료사들과의 소통과 협력 기회를 통해 전문성을 향상시킬 수 있습니다.'
    },
    {
      icon: <User className="h-8 w-8" />,
      title: '자조모임 지원',
      description: '지부 회원 간 자조모임을 통해 경험을 공유하고 서로를 지원합니다.'
    },
    {
      icon: <Newspaper className="h-8 w-8" />,
      title: '뉴스레터 발송',
      description: '서울지역 작업치료 이슈 관련 뉴스레터를 정기적으로 발송합니다.'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Google Apps Script API 호출
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'addMember',
          data: formData
        })
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          licenseNumber: '',
          email: '',
          phone: '',
          address: '',
          workplace: '',
          position: '',
          experience: '',
          interests: '',
          memo: ''
        })
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.error || '회원가입 중 오류가 발생했습니다.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-kaot-green-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-kaot-green-50 to-kaot-green-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-kaot-green-600">서울지부</span> 회원가입
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            함께 성장하는 서울 작업치료사들의 따뜻한 공간에 참여하세요
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* 회원 혜택 */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">회원 혜택</h2>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="card">
                  <div className="flex items-start">
                    <div className="bg-kaot-green-100 w-12 h-12 rounded-lg flex items-center justify-center text-kaot-green-600 mr-4">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 회원가입 폼 */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">회원가입</h2>
            
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
                회원가입이 성공적으로 완료되었습니다! 승인 후 로그인이 가능합니다.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 기본 정보 */}
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">기본 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      이름 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      자격번호 *
                    </label>
                    <input
                      type="text"
                      id="licenseNumber"
                      name="licenseNumber"
                      required
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* 연락처 정보 */}
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">연락처 정보</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      전화번호 *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      주소
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* 근무 정보 */}
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">근무 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="workplace" className="block text-sm font-medium text-gray-700 mb-2">
                      근무기관
                    </label>
                    <input
                      type="text"
                      id="workplace"
                      name="workplace"
                      value={formData.workplace}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                      직책
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    경력 (년)
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    min="0"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                  />
                </div>
              </div>

              {/* 관심분야 및 메모 */}
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">추가 정보</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
                      관심분야
                    </label>
                    <textarea
                      id="interests"
                      name="interests"
                      rows={3}
                      value={formData.interests}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                      placeholder="예: 소아 작업치료, 뇌졸중 재활, 정신건강 등"
                    />
                  </div>
                  <div>
                    <label htmlFor="memo" className="block text-sm font-medium text-gray-700 mb-2">
                      메모
                    </label>
                    <textarea
                      id="memo"
                      name="memo"
                      rows={3}
                      value={formData.memo}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                      placeholder="추가로 전달하고 싶은 내용이 있으시면 작성해주세요"
                    />
                  </div>
                </div>
              </div>

              {/* 제출 버튼 */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-kaot-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-kaot-green-700 focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    처리 중...
                  </>
                ) : (
                  <>
                    회원가입 완료
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 