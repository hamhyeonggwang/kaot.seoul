import { NextRequest, NextResponse } from 'next/server'
import { passwordUtils } from '@/app/utils/password'

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
    createdAt: '2024-01-15T10:00:00Z',
    lastLogin: '2025-01-20T10:30:00Z'
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
    createdAt: '2024-02-20T14:30:00Z',
    lastLogin: '2025-01-19T16:45:00Z'
  }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // 필수 필드 검증
    if (!email || !password) {
      return NextResponse.json({ 
        success: false, 
        error: '이메일과 비밀번호를 입력해주세요.' 
      }, { status: 400 })
    }

    // 사용자 찾기
    const user = usersData.find(u => u.email === email)
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: '등록되지 않은 이메일입니다.' 
      }, { status: 401 })
    }

    // 비밀번호 검증
    const isPasswordValid = await passwordUtils.verifyPassword(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ 
        success: false, 
        error: '비밀번호가 올바르지 않습니다.' 
      }, { status: 401 })
    }

    // 계정 상태 확인
    if (user.status !== 'active') {
      return NextResponse.json({ 
        success: false, 
        error: '비활성화된 계정입니다. 관리자에게 문의하세요.' 
      }, { status: 403 })
    }

    // 이메일 인증 확인
    if (!user.emailVerified) {
      return NextResponse.json({ 
        success: false, 
        error: '이메일 인증이 완료되지 않았습니다. 이메일을 확인해주세요.' 
      }, { status: 403 })
    }

    // 마지막 로그인 시간 업데이트
    user.lastLogin = new Date().toISOString()

    // 로그인 성공 시 반환할 사용자 정보 (비밀번호 제외)
    const userInfo = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      licenseNumber: user.licenseNumber,
      workplace: user.workplace,
      specialty: user.specialty,
      membershipType: user.membershipType,
      joinDate: user.joinDate,
      emailVerified: user.emailVerified,
      lastLogin: user.lastLogin
    }

    return NextResponse.json({ 
      success: true, 
      message: '로그인이 완료되었습니다.',
      data: userInfo
    })
  } catch (error) {
    console.error('로그인 중 오류:', error)
    return NextResponse.json({ 
      success: false, 
      error: '로그인 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
} 