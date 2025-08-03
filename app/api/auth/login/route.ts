import { NextRequest, NextResponse } from 'next/server'
import { passwordUtils } from '@/app/utils/password'
import { authDataUtils } from '@/app/utils/auth-data'

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
    const user = await authDataUtils.findUserByEmail(email)
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

    // 이메일 인증 확인 (선택사항)
    if (!user.emailVerified) {
      console.log(`이메일 미인증 사용자 로그인: ${email}`)
      // 이메일 인증이 완료되지 않아도 로그인 허용
      // 필요시 나중에 이메일 인증을 완료하도록 안내
    }

    // 마지막 로그인 시간 업데이트
    await authDataUtils.updateUser(user.id, { lastLogin: new Date().toISOString() })

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
      lastLogin: user.lastLogin,
      role: user.role || 'member'
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