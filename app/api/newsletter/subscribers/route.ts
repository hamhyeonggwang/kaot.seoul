import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// 구독자 데이터 파일 경로
const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'newsletter-subscribers.json')

// 구독자 타입 정의
interface Subscriber {
  id: string
  name: string
  licenseNumber: string
  organization: string
  email: string
  subscribedAt: string
  status: string
}

export async function GET(request: NextRequest) {
  try {
    // 파일이 존재하지 않으면 빈 배열 반환
    if (!existsSync(SUBSCRIBERS_FILE)) {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0
      })
    }

    // 구독자 목록 읽기
    const fileContent = await readFile(SUBSCRIBERS_FILE, 'utf-8')
    const subscribers: Subscriber[] = JSON.parse(fileContent)

    // URL 파라미터에서 페이지네이션 정보 추출
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    // 검색 필터링
    let filteredSubscribers = subscribers
    if (search) {
      filteredSubscribers = subscribers.filter(sub => 
        sub.name.toLowerCase().includes(search.toLowerCase()) ||
        sub.email.toLowerCase().includes(search.toLowerCase()) ||
        sub.organization.toLowerCase().includes(search.toLowerCase()) ||
        sub.licenseNumber.includes(search)
      )
    }

    // 정렬 (최신 구독 순)
    filteredSubscribers.sort((a, b) => 
      new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime()
    )

    // 페이지네이션
    const total = filteredSubscribers.length
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedSubscribers = filteredSubscribers.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedSubscribers,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })

  } catch (error) {
    console.error('구독자 목록 조회 중 오류:', error)
    return NextResponse.json(
      { 
        success: false,
        message: '구독자 목록을 불러오는 중 오류가 발생했습니다.' 
      },
      { status: 500 }
    )
  }
} 