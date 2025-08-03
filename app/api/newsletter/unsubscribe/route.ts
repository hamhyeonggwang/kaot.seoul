import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, reason } = body

    // 이메일 검증
    if (!email) {
      return NextResponse.json(
        { message: '이메일 주소를 입력해주세요.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: '올바른 이메일 주소를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 파일이 존재하지 않으면 오류
    if (!existsSync(SUBSCRIBERS_FILE)) {
      return NextResponse.json(
        { message: '구독자 정보를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 구독자 목록 읽기
    const fileContent = await readFile(SUBSCRIBERS_FILE, 'utf-8')
    const subscribers: Subscriber[] = JSON.parse(fileContent)

    // 구독자 찾기
    const subscriberIndex = subscribers.findIndex(sub => sub.email.toLowerCase() === email.toLowerCase())
    
    if (subscriberIndex === -1) {
      return NextResponse.json(
        { message: '해당 이메일로 구독 중인 계정을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 이미 해지된 상태인지 확인
    if (subscribers[subscriberIndex].status === 'inactive') {
      return NextResponse.json(
        { message: '이미 구독이 해지된 상태입니다.' },
        { status: 400 }
      )
    }

    // 구독 상태를 비활성으로 변경
    subscribers[subscriberIndex].status = 'inactive'

    // 파일에 저장
    await writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2))

    console.log('뉴스레터 구독 해지:', {
      email: email.toLowerCase(),
      reason: reason || '사용자 요청',
      unsubscribedAt: new Date().toISOString()
    })

    return NextResponse.json(
      { 
        message: '뉴스레터 구독이 성공적으로 해지되었습니다.',
        success: true 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('뉴스레터 구독 해지 처리 중 오류:', error)
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    )
  }
} 