import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
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
    const { name, licenseNumber, organization, email } = body

    // 필수 필드 검증
    if (!name || !licenseNumber || !organization || !email) {
      const missingFields = []
      if (!name) missingFields.push('이름')
      if (!licenseNumber) missingFields.push('면허번호')
      if (!organization) missingFields.push('소속')
      if (!email) missingFields.push('이메일')
      
      return NextResponse.json(
        { message: `다음 필드를 입력해주세요: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // 이름 검증 (2글자 이상, 한글/영문만)
    const nameRegex = /^[가-힣a-zA-Z\s]{2,}$/
    if (!nameRegex.test(name.trim())) {
      return NextResponse.json(
        { message: '이름은 2글자 이상의 한글이나 영문만 입력해주세요.' },
        { status: 400 }
      )
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: '올바른 이메일 주소를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 면허번호 형식 검증 (숫자만 허용, 2-6자리)
    const licenseRegex = /^\d{2,6}$/
    if (!licenseRegex.test(licenseNumber)) {
      return NextResponse.json(
        { message: '면허번호는 2-6자리 숫자만 입력해주세요.' },
        { status: 400 }
      )
    }

    // 소속 검증 (2글자 이상)
    if (organization.trim().length < 2) {
      return NextResponse.json(
        { message: '소속은 2글자 이상 입력해주세요.' },
        { status: 400 }
      )
    }

    // 구독자 정보 준비
    const subscriber: Subscriber = {
      id: Date.now().toString(),
      name: name.trim(),
      licenseNumber,
      organization: organization.trim(),
      email: email.toLowerCase().trim(),
      subscribedAt: new Date().toISOString(),
      status: 'active'
    }

    // data 디렉토리가 없으면 생성
    const dataDir = path.dirname(SUBSCRIBERS_FILE)
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true })
    }

    // 기존 구독자 목록 읽기
    let subscribers: Subscriber[] = []
    if (existsSync(SUBSCRIBERS_FILE)) {
      try {
        const fileContent = await readFile(SUBSCRIBERS_FILE, 'utf-8')
        subscribers = JSON.parse(fileContent)
      } catch (error) {
        console.error('기존 구독자 파일 읽기 오류:', error)
        subscribers = []
      }
    }

    // 이메일 중복 확인
    const existingSubscriber = subscribers.find((sub: Subscriber) => sub.email === subscriber.email)
    if (existingSubscriber) {
      return NextResponse.json(
        { message: '이미 구독 중인 이메일 주소입니다.' },
        { status: 400 }
      )
    }

    // 면허번호 중복 확인 (선택사항)
    const existingLicense = subscribers.find((sub: Subscriber) => sub.licenseNumber === subscriber.licenseNumber)
    if (existingLicense) {
      return NextResponse.json(
        { message: '이미 등록된 면허번호입니다.' },
        { status: 400 }
      )
    }

    // 새 구독자 추가
    subscribers.push(subscriber)

    // 파일에 저장
    await writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2))

    console.log('뉴스레터 구독 신청:', subscriber)

    return NextResponse.json(
      { 
        message: '뉴스레터 구독이 성공적으로 완료되었습니다.',
        success: true 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('뉴스레터 구독 처리 중 오류:', error)
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    )
  }
} 