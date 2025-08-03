import { NextRequest, NextResponse } from 'next/server'
import { passwordUtils } from '@/app/utils/password'
import { emailUtils } from '@/app/utils/email'
import { authDataUtils } from '@/app/utils/auth-data'

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
    const existingUser = authDataUtils.findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        error: '이미 등록된 이메일입니다.' 
      }, { status: 409 })
    }

    // 면허번호 중복 확인
    const existingLicense = authDataUtils.getAllUsers().find(user => user.licenseNumber === licenseNumber)
    if (existingLicense) {
      return NextResponse.json({ 
        success: false, 
        error: '이미 등록된 면허번호입니다.' 
      }, { status: 409 })
    }

    // 비밀번호 해싱
    const hashedPassword = await passwordUtils.hashPassword(password)

    // 새 사용자 생성
    const now = new Date().toISOString()
    
    const newUser = authDataUtils.addUser({
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
      emailVerified: true, // 이메일 인증 자동 완료
      createdAt: now
    })



    return NextResponse.json({ 
      success: true, 
      message: '회원가입이 완료되었습니다. 바로 로그인이 가능합니다.',
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        emailVerified: newUser.emailVerified,
        emailSent: false
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