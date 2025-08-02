import { NextRequest, NextResponse } from 'next/server'
import { passwordUtils } from '@/app/utils/password'
import { emailUtils } from '@/app/utils/email'

// 실제로는 데이터베이스에서 관리해야 하지만, 여기서는 메모리 기반으로 구현
let usersData = [
  {
    id: 1,
    email: 'kim@example.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/5QqKqKq', // hashed_password123
    name: '김작업',
    phone: '010-1234-5678',
    licenseNumber: 'OT-2024-001',
    workplace: '서울대학교병원',
    specialty: '소아작업치료',
    membershipType: '정회원',
    joinDate: '2024-01-15',
    status: 'active',
    emailVerified: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    email: 'lee@example.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/5QqKqKq', // hashed_password456
    name: '이치료',
    phone: '010-2345-6789',
    licenseNumber: 'OT-2024-002',
    workplace: '삼성서울병원',
    specialty: '성인재활',
    membershipType: '정회원',
    joinDate: '2024-02-20',
    status: 'active',
    emailVerified: true,
    createdAt: '2024-02-20T14:30:00Z'
  }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      email, 
      password, 
      name, 
      phone, 
      licenseNumber, 
      workplace, 
      specialty,
      membershipType = '준회원'
    } = body

    // 필수 필드 검증
    if (!email || !password || !name || !phone || !licenseNumber) {
      return NextResponse.json({ 
        success: false, 
        error: '필수 정보를 모두 입력해주세요.' 
      }, { status: 400 })
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        success: false, 
        error: '올바른 이메일 형식을 입력해주세요.' 
      }, { status: 400 })
    }

    // 비밀번호 강도 검증
    const passwordValidation = passwordUtils.validatePasswordStrength(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json({ 
        success: false, 
        error: passwordValidation.message
      }, { status: 400 })
    }

    // 이메일 중복 확인
    const existingUser = usersData.find(user => user.email === email)
    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        error: '이미 등록된 이메일입니다.' 
      }, { status: 409 })
    }

    // 면허번호 중복 확인
    const existingLicense = usersData.find(user => user.licenseNumber === licenseNumber)
    if (existingLicense) {
      return NextResponse.json({ 
        success: false, 
        error: '이미 등록된 면허번호입니다.' 
      }, { status: 409 })
    }

    // 비밀번호 해싱
    const hashedPassword = await passwordUtils.hashPassword(password)

    // 새 사용자 생성
    const newId = Math.max(...usersData.map(user => user.id)) + 1
    const now = new Date().toISOString()
    
    const newUser = {
      id: newId,
      email,
      password: hashedPassword,
      name,
      phone,
      licenseNumber,
      workplace: workplace || '',
      specialty: specialty || '',
      membershipType,
      joinDate: now.split('T')[0],
      status: 'active',
      emailVerified: false, // 이메일 인증 필요
      createdAt: now
    }

    usersData.push(newUser)

    // 이메일 인증 토큰 생성 및 저장
    const verificationToken = emailUtils.generateVerificationToken()
    emailUtils.saveVerificationToken(email, verificationToken)

    // 이메일 인증 메일 발송
    const emailSent = await emailUtils.sendVerificationEmail(email, name, verificationToken)
    
    if (!emailSent) {
      // 이메일 발송 실패 시 사용자 삭제
      usersData = usersData.filter(user => user.id !== newId)
      return NextResponse.json({ 
        success: false, 
        error: '이메일 발송에 실패했습니다. 다시 시도해주세요.' 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: '회원가입이 완료되었습니다. 이메일을 확인하여 인증을 완료해주세요.',
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        emailVerified: newUser.emailVerified
      }
    })
  } catch (error) {
    console.error('회원가입 중 오류:', error)
    return NextResponse.json({ 
      success: false, 
      error: '회원가입 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
} 