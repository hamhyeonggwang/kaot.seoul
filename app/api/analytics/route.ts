import { NextRequest, NextResponse } from 'next/server'

// 실제로는 데이터베이스에서 관리해야 하지만, 여기서는 메모리 기반으로 구현
let visitorData = {
  totalVisitors: 1247,
  todayVisitors: 23,
  thisWeekVisitors: 156,
  thisMonthVisitors: 489,
  dailyStats: {
    '2025-01-20': 23,
    '2025-01-19': 18,
    '2025-01-18': 25,
    '2025-01-17': 31,
    '2025-01-16': 19,
    '2025-01-15': 22,
    '2025-01-14': 28
  },
  monthlyStats: {
    '2024-08': 234,
    '2024-09': 287,
    '2024-10': 312,
    '2024-11': 298,
    '2024-12': 345,
    '2025-01': 489
  },
  pageViews: {
    '/': 456,
    '/news': 234,
    '/community': 123,
    '/join': 89,
    '/info': 67,
    '/partners': 45,
    '/youtube': 78
  }
}

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    data: visitorData 
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { page, timestamp } = body
    
    // 오늘 날짜
    const today = new Date().toISOString().split('T')[0]
    
    // 총 방문자 수 증가
    visitorData.totalVisitors += 1
    
    // 오늘 방문자 수 증가
    visitorData.todayVisitors += 1
    
    // 일별 통계 업데이트
    if (visitorData.dailyStats[today as keyof typeof visitorData.dailyStats]) {
      visitorData.dailyStats[today as keyof typeof visitorData.dailyStats] += 1
    } else {
      (visitorData.dailyStats as any)[today] = 1
    }
    
    // 페이지별 조회수 증가
    if (page && visitorData.pageViews[page as keyof typeof visitorData.pageViews]) {
      visitorData.pageViews[page as keyof typeof visitorData.pageViews] += 1
    } else if (page) {
      (visitorData.pageViews as any)[page] = 1
    }
    
    // 이번 주, 이번 달 통계 재계산
    const now = new Date()
    const startOfWeek = new Date(now.getTime() - (now.getDay() * 24 * 60 * 60 * 1000))
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    
    let weekVisitors = 0
    let monthVisitors = 0
    
    Object.entries(visitorData.dailyStats).forEach(([date, count]) => {
      const dateObj = new Date(date)
      if (dateObj >= startOfWeek) {
        weekVisitors += count
      }
      if (dateObj >= startOfMonth) {
        monthVisitors += count
      }
    })
    
    visitorData.thisWeekVisitors = weekVisitors
    visitorData.thisMonthVisitors = monthVisitors
    
    return NextResponse.json({ 
      success: true, 
      message: '방문자 수가 기록되었습니다.',
      data: { totalVisitors: visitorData.totalVisitors }
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: '방문자 수 기록 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
} 