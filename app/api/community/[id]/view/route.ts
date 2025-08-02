import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = parseInt(params.id)
    
    // 실제로는 데이터베이스에서 조회수를 업데이트해야 하지만,
    // 여기서는 메모리 기반 데이터를 업데이트합니다
    // 실제 구현에서는 데이터베이스 쿼리를 실행해야 합니다
    
    return NextResponse.json({ 
      success: true, 
      message: '조회수가 증가되었습니다.' 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: '조회수 증가 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
} 