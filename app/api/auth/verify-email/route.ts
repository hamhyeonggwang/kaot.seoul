import { NextRequest, NextResponse } from 'next/server'
import { emailUtils } from '@/app/utils/email'

// 실제로는 데이터베이스에서 관리해야 하지만, 여기서는 메모리 기반으로 구현
let usersData = [
  {
    id: 1,
    email: 'kim@example.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/5QqKqKq',
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
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/5QqKqKq',
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ 
        success: false, 
        error: '인증 토큰이 없습니다.' 
      }, { status: 400 })
    }

    // 토큰 검증
    const tokenValidation = emailUtils.verifyToken(token)
    if (!tokenValidation.isValid || !tokenValidation.email) {
      return NextResponse.json({ 
        success: false, 
        error: '유효하지 않은 인증 토큰입니다.' 
      }, { status: 400 })
    }

    // 사용자 찾기
    const user = usersData.find(u => u.email === tokenValidation.email)
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: '사용자를 찾을 수 없습니다.' 
      }, { status: 404 })
    }

    // 이메일 인증 완료
    user.emailVerified = true
    
    // 토큰 삭제
    emailUtils.removeToken(token)

    return NextResponse.json({ 
      success: true, 
      message: '이메일 인증이 완료되었습니다.',
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified
      }
    })
  } catch (error) {
    console.error('이메일 인증 중 오류:', error)
    return NextResponse.json({ 
      success: false, 
      error: '이메일 인증 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
} 