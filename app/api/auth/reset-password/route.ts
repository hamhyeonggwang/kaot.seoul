import { NextRequest, NextResponse } from 'next/server'

// 실제로는 데이터베이스에서 관리해야 하지만, 여기서는 메모리 기반으로 구현
let usersData = [
  {
    id: 1,
    email: 'kim@example.com',
    password: 'hashed_password123',
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
    password: 'hashed_password456',
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
    const { email } = body

    // 이메일 필드 검증
    if (!email) {
      return NextResponse.json({ 
        success: false, 
        error: '이메일을 입력해주세요.' 
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

    // 사용자 찾기
    const user = usersData.find(u => u.email === email)
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: '등록되지 않은 이메일입니다.' 
      }, { status: 404 })
    }

    // 계정 상태 확인
    if (user.status !== 'active') {
      return NextResponse.json({ 
        success: false, 
        error: '비활성화된 계정입니다. 관리자에게 문의하세요.' 
      }, { status: 403 })
    }

    // 임시 비밀번호 생성 (8자리 영문+숫자)
    const generateTempPassword = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let result = ''
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return result
    }

    const tempPassword = generateTempPassword()
    
    // 실제로는 이메일 발송 로직이 필요
    // 여기서는 콘솔에 출력
    console.log(`임시 비밀번호 발송: ${email} -> ${tempPassword}`)

    // 사용자 비밀번호 업데이트 (실제로는 해시)
    user.password = `hashed_${tempPassword}`

    return NextResponse.json({ 
      success: true, 
      message: '임시 비밀번호가 이메일로 발송되었습니다. 이메일을 확인해주세요.',
      data: {
        email: user.email,
        tempPassword: tempPassword // 실제로는 이메일로만 전송
      }
    })
  } catch (error) {
    console.error('비밀번호 재설정 중 오류:', error)
    return NextResponse.json({ 
      success: false, 
      error: '비밀번호 재설정 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
} 