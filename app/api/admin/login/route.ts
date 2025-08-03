import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // 필수 필드 검증
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: '아이디와 비밀번호를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 환경변수에서 관리자 계정 정보 가져오기
    const adminUsername = process.env.ADMIN_USERNAME || 'admin@kaot-seoul.or.kr'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin2024'

    // 관리자 인증
    if (username === adminUsername && password === adminPassword) {
      return NextResponse.json({
        success: true,
        message: '로그인 성공',
        data: {
          username,
          role: 'admin'
        }
      })
    } else {
      return NextResponse.json(
        { success: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('관리자 로그인 처리 중 오류:', error)
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 