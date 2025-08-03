'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Link from 'next/link'
import { User, Mail, Phone, FileText, Building, Award, Eye, EyeOff, Check, X } from 'lucide-react'

export default function JoinPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    licenseNumber: '',
    workplace: '',
    specialty: '',
    membershipType: '준회원'
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const specialties = ['소아작업치료', '성인재활', '정신건강', '노인재활', '의료재활', '기타']
  const membershipTypes = ['준회원', '정회원', '학생회원']

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // 이메일 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.'
    }

    // 비밀번호 검증
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.'
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = '비밀번호는 8자 이상의 영문, 숫자, 특수문자를 포함해야 합니다.'
    }

    // 비밀번호 확인 검증
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
    }

    // 이름 검증
    if (!formData.name) {
      newErrors.name = '이름을 입력해주세요.'
    }

    // 전화번호 검증
    const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/
    if (!formData.phone) {
      newErrors.phone = '전화번호를 입력해주세요.'
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = '올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)'
    }

    // 면허번호 검증
    if (!formData.licenseNumber) {
      newErrors.licenseNumber = '면허번호를 입력해주세요.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
          licenseNumber: formData.licenseNumber,
          workplace: formData.workplace,
          specialty: formData.specialty,
          membershipType: formData.membershipType
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      } else {
        alert(result.error || '회원가입 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('회원가입 중 오류:', error)
      alert('회원가입 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    let processedValue = value
    
    // 전화번호 필드에 대한 자동 하이픈 처리
    if (field === 'phone') {
      // 숫자만 추출
      const numbers = value.replace(/[^0-9]/g, '')
      
      // 11자리 이하일 때만 하이픈 추가
      if (numbers.length <= 11) {
        if (numbers.length <= 3) {
          processedValue = numbers
        } else if (numbers.length <= 7) {
          processedValue = numbers.slice(0, 3) + '-' + numbers.slice(3)
        } else {
          processedValue = numbers.slice(0, 3) + '-' + numbers.slice(3, 7) + '-' + numbers.slice(7)
        }
      } else {
        // 11자리를 초과하면 이전 값 유지
        processedValue = formData.phone
      }
    }
    
    setFormData(prev => ({ ...prev, [field]: processedValue }))
    // 에러 메시지 제거 (비밀번호 필드는 제외)
    if (errors[field] && field !== 'password' && field !== 'confirmPassword') {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (success) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">회원가입 완료!</h2>
            <p className="text-gray-600 mb-6">
              회원가입이 성공적으로 완료되었습니다. 로그인 페이지로 이동합니다.
            </p>
            <Link
              href="/login"
              className="inline-block bg-kaot-green-600 text-white px-6 py-2 rounded-lg hover:bg-kaot-green-700"
            >
              로그인하기
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">회원가입</h1>
          <p className="text-xl text-kaot-green-100">서울지부 회원이 되어 다양한 혜택을 누리세요</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="example@email.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Eye className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="8자 이상 영문+숫자+특수문자"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호 확인 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Eye className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="비밀번호 재입력"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이름 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="실명을 입력하세요"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                전화번호 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 ${
                    errors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="010-1234-5678"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* License Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                면허번호 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 ${
                    errors.licenseNumber ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="작업치료사 면허번호"
                />
              </div>
              {errors.licenseNumber && <p className="text-red-500 text-sm mt-1">{errors.licenseNumber}</p>}
            </div>

            {/* Workplace */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">근무지</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.workplace}
                  onChange={(e) => handleInputChange('workplace', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                  placeholder="소속 기관명"
                />
              </div>
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">전문분야</label>
              <select
                value={formData.specialty}
                onChange={(e) => handleInputChange('specialty', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
              >
                <option value="">전문분야 선택</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            {/* Membership Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">회원 유형</label>
              <select
                value={formData.membershipType}
                onChange={(e) => handleInputChange('membershipType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
              >
                {membershipTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-kaot-green-600 text-white py-3 px-4 rounded-lg hover:bg-kaot-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? '가입 중...' : '회원가입'}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                이미 계정이 있으신가요?{' '}
                <Link href="/login" className="text-kaot-green-600 hover:text-kaot-green-700 font-medium">
                  로그인하기
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
} 