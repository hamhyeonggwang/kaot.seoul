import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // 실제로는 서버 세션을 무효화하는 로직이 필요
    // 여기서는 클라이언트에서 처리하도록 안내
    
    return NextResponse.json({ 
      success: true, 
      message: '로그아웃이 완료되었습니다.'
    })
  } catch (error) {
    console.error('로그아웃 중 오류:', error)
    return NextResponse.json({ 
      success: false, 
      error: '로그아웃 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
} 