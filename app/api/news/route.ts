import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// 뉴스 데이터 파일 경로
const NEWS_FILE = path.join(process.cwd(), 'data', 'news.json')

// 뉴스 타입 정의
interface NewsItem {
  id: number
  title: string
  content: string
  category: string
  date: string
  author: string
  views: number
  tags: string[]
}

// 기본 뉴스 데이터
const defaultNewsData: NewsItem[] = [
  {
    id: 1,
    title: 'KAOT 서울지부 홈페이지 개설 안내',
    content: '대한작업치료사협회 서울지부 홈페이지가 2025년 8월 1일부터 정식 서비스를 시작합니다. 회원 여러분께 더 나은 서비스와 정보를 제공하기 위해 노력하겠습니다. 많은 관심과 이용 부탁드립니다.',
    category: '공지사항',
    date: '2025-08-01',
    author: 'KAOT 서울지부',
    views: 1,
    tags: ['홈페이지개설', '서울지부', '공지사항']
  },
  {
    id: 2,
    title: 'SST 캠프 - 사회기술훈련 프로그램 운영',
    content: '서울지부에서 아동 및 청소년을 대상으로 한 SST(Social Skills Training) 캠프를 운영하고 있습니다. 사회적 상호작용 기술 향상과 일상생활 적응 능력 증진을 위한 전문적인 작업치료 프로그램으로, 참여 아동들의 사회성 발달에 긍정적인 변화를 가져오고 있습니다.',
    category: '지부사업',
    date: '2025-01-15',
    author: 'KAOT 서울지부',
    views: 45,
    tags: ['SST캠프', '사회기술훈련', '아동청소년', '작업치료프로그램']
  },
  {
    id: 3,
    title: '마음으로 On - 성동구 지역사회 기반 방문 작업치료',
    content: '서울지부가 성동구 지역사회에서 "마음으로 On" 프로그램을 통해 방문 작업치료 서비스를 제공하고 있습니다. 지역사회 기반 방문 작업치료사와 함께 실천하고 싶은 작업치료사들을 모집하여, 지역 주민들의 삶의 질 향상과 건강한 지역사회 조성에 기여하고 있습니다.',
    category: '지부사업',
    date: '2025-01-10',
    author: 'KAOT 서울지부',
    views: 38,
    tags: ['마음으로On', '방문작업치료', '성동구', '지역사회', 'ICF']
  },
  {
    id: 4,
    title: '임상기술 마스터 클래스 - 상지재활의 이론과 실제',
    content: '2025년 6월 14일 여의도 이룸센터에서 "임상기술 마스터 클래스 - 상지재활의 이론과 실제" 보수교육이 성공적으로 진행되었습니다. 총 50명의 작업치료사가 참석하여 실습 위주의 교육을 통해 상지재활에 대한 전문 지식과 실무 기술을 향상시켰습니다.',
    category: '교육',
    date: '2025-06-14',
    author: 'KAOT 서울지부',
    views: 67,
    tags: ['보수교육', '상지재활', '마스터클래스', '실습', '여의도이룸센터']
  }
]

// 뉴스 데이터 읽기
async function loadNewsData(): Promise<NewsItem[]> {
  try {
    if (!existsSync(NEWS_FILE)) {
      // 파일이 없으면 기본 데이터로 생성
      const dataDir = path.dirname(NEWS_FILE)
      if (!existsSync(dataDir)) {
        await mkdir(dataDir, { recursive: true })
      }
      await writeFile(NEWS_FILE, JSON.stringify(defaultNewsData, null, 2))
      return defaultNewsData
    }
    
    const fileContent = await readFile(NEWS_FILE, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error('뉴스 데이터 로드 중 오류:', error)
    return defaultNewsData
  }
}

// 뉴스 데이터 저장
async function saveNewsData(data: NewsItem[]): Promise<void> {
  try {
    const dataDir = path.dirname(NEWS_FILE)
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true })
    }
    await writeFile(NEWS_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('뉴스 데이터 저장 중 오류:', error)
    throw error
  }
}

export async function GET() {
  try {
    const newsData = await loadNewsData()
    return NextResponse.json({ success: true, data: newsData })
  } catch (error) {
    console.error('뉴스 데이터 조회 중 오류:', error)
    return NextResponse.json({ 
      success: false, 
      error: '뉴스 데이터를 불러오는 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, category, date, author, tags } = body
    
    const newsData = await loadNewsData()
    const newId = Math.max(...newsData.map(item => item.id)) + 1
    const newNews: NewsItem = {
      id: newId,
      title,
      content,
      category,
      date,
      author,
      views: 0,
      tags: tags || []
    }
    
    newsData.push(newNews)
    await saveNewsData(newsData)
    
    console.log('새 뉴스 추가:', newNews)
    
    return NextResponse.json({ 
      success: true, 
      message: '지부소식이 성공적으로 추가되었습니다.',
      data: newNews
    })
  } catch (error) {
    console.error('뉴스 추가 중 오류:', error)
    return NextResponse.json({ 
      success: false, 
      error: '지부소식 추가 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, content, category, date, author, tags } = body
    
    const newsData = await loadNewsData()
    const index = newsData.findIndex(item => item.id === id)
    if (index === -1) {
      return NextResponse.json({ 
        success: false, 
        error: '해당 지부소식을 찾을 수 없습니다.' 
      }, { status: 404 })
    }
    
    const views = newsData[index].views
    newsData[index] = {
      id,
      title,
      content,
      category,
      date,
      author,
      views,
      tags: tags || []
    }
    
    await saveNewsData(newsData)
    
    console.log('뉴스 수정:', newsData[index])
    
    return NextResponse.json({ 
      success: true, 
      message: '지부소식이 성공적으로 수정되었습니다.',
      data: newsData[index]
    })
  } catch (error) {
    console.error('뉴스 수정 중 오류:', error)
    return NextResponse.json({ 
      success: false, 
      error: '지부소식 수정 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '0')
    
    const newsData = await loadNewsData()
    const index = newsData.findIndex(item => item.id === id)
    if (index === -1) {
      return NextResponse.json({ 
        success: false, 
        error: '해당 지부소식을 찾을 수 없습니다.' 
      }, { status: 404 })
    }
    
    const deletedNews = newsData.splice(index, 1)[0]
    await saveNewsData(newsData)
    
    console.log('뉴스 삭제:', deletedNews)
    
    return NextResponse.json({ 
      success: true, 
      message: '지부소식이 성공적으로 삭제되었습니다.',
      data: deletedNews
    })
  } catch (error) {
    console.error('뉴스 삭제 중 오류:', error)
    return NextResponse.json({ 
      success: false, 
      error: '지부소식 삭제 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
} 