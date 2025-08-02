import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    // 내부 데이터 직접 사용 (외부 API 호출 제거)
    const membersData = [
      {
        id: 1,
        name: '김작업',
        email: 'kim@example.com',
        phone: '010-1234-5678',
        licenseNumber: 'OT-2024-001',
        workplace: '서울대학교병원',
        specialty: '소아작업치료',
        membershipType: '정회원',
        joinDate: '2024-01-15',
        status: 'active'
      },
      {
        id: 2,
        name: '이치료',
        email: 'lee@example.com',
        phone: '010-2345-6789',
        licenseNumber: 'OT-2024-002',
        workplace: '삼성서울병원',
        specialty: '성인재활',
        membershipType: '정회원',
        joinDate: '2024-02-20',
        status: 'active'
      },
      {
        id: 3,
        name: '박재활',
        email: 'park@example.com',
        phone: '010-3456-7890',
        licenseNumber: 'OT-2024-003',
        workplace: '연세대학교병원',
        specialty: '노인재활',
        membershipType: '준회원',
        joinDate: '2024-03-10',
        status: 'active'
      }
    ]

    const newsData = [
      {
        id: 1,
        title: 'KAOT 서울지부 홈페이지 개설 안내',
        content: '대한작업치료사협회 서울지부 홈페이지가 2025년 8월 1일부터 정식 서비스를 시작합니다.',
        date: '2025-08-01',
        views: 150
      },
      {
        id: 2,
        title: 'SST 캠프 - 사회기술훈련 프로그램 운영',
        content: '서울지부에서 아동 및 청소년을 대상으로 한 SST(Social Skills Training) 캠프를 운영하고 있습니다.',
        date: '2025-01-15',
        views: 89
      },
      {
        id: 3,
        title: '마음으로 On - 성동구 지역사회 기반 방문 작업치료',
        content: '서울지부가 성동구 지역사회에서 "마음으로 On" 프로그램을 통해 방문 작업치료 서비스를 제공하고 있습니다.',
        date: '2025-01-10',
        views: 67
      }
    ]

    const analyticsData = {
      totalVisitors: 1250,
      todayVisitors: 45,
      thisWeekVisitors: 234,
      thisMonthVisitors: 892,
      pageViews: {
        '/': 450,
        '/news': 234,
        '/community': 189,
        '/join': 156,
        '/info': 123,
        '/partners': 98,
        '/youtube': 76
      }
    }

    // 현재 날짜 기준 계산
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    // 회원 통계 계산
    const totalMembers = membersData.length
    const activeMembers = membersData.filter((member: any) => member.status === 'active').length
    const newMembersThisMonth = membersData.filter((member: any) => {
      const joinDate = new Date(member.joinDate)
      return joinDate.getMonth() === currentMonth && joinDate.getFullYear() === currentYear
    }).length

    // 회원 유형별 통계
    const membershipTypes = membersData.reduce((acc: any, member: any) => {
      acc[member.membershipType] = (acc[member.membershipType] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // 전문분야별 통계
    const specialties = membersData.reduce((acc: any, member: any) => {
      acc[member.specialty] = (acc[member.specialty] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // 뉴스 통계 계산
    const totalNews = newsData.length
    const newsThisMonth = newsData.filter((news: any) => {
      const newsDate = new Date(news.date)
      return newsDate.getMonth() === currentMonth && newsDate.getFullYear() === currentYear
    }).length

    // 조회수 통계
    const totalViews = newsData.reduce((sum: number, news: any) => sum + (news.views || 0), 0)
    const viewsThisMonth = newsData.filter((news: any) => {
      const newsDate = new Date(news.date)
      return newsDate.getMonth() === currentMonth && newsDate.getFullYear() === currentYear
    }).reduce((sum: number, news: any) => sum + (news.views || 0), 0)

    // 월별 통계 (최근 6개월)
    const monthlyStats: Record<string, { members: number; news: number; views: number }> = {}
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - i, 1)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      
      const monthMembers = membersData.filter((member: any) => {
        const joinDate = new Date(member.joinDate)
        return joinDate.getMonth() === date.getMonth() && joinDate.getFullYear() === date.getFullYear()
      }).length

      const monthNews = newsData.filter((news: any) => {
        const newsDate = new Date(news.date)
        return newsDate.getMonth() === date.getMonth() && newsDate.getFullYear() === date.getFullYear()
      }).length

      const monthViews = newsData.filter((news: any) => {
        const newsDate = new Date(news.date)
        return newsDate.getMonth() === date.getMonth() && newsDate.getFullYear() === date.getFullYear()
      }).reduce((sum: number, news: any) => sum + (news.views || 0), 0)

      monthlyStats[monthKey] = {
        members: monthMembers,
        news: monthNews,
        views: monthViews
      }
    }

    // 최근 활동
    const recentActivity: Array<{ type: string; message: string; date: string; time: string }> = []
    
    // 최근 회원 가입
    const recentMembers = membersData
      .sort((a: any, b: any) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
      .slice(0, 2)
    
    recentMembers.forEach((member: any) => {
      recentActivity.push({
        type: 'member_join',
        message: `새 회원 가입: ${member.name}`,
        date: member.joinDate,
        time: '12:00'
      })
    })

    // 최근 뉴스 등록
    const recentNews = newsData
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 2)
    
    recentNews.forEach((news: any) => {
      recentActivity.push({
        type: 'news_post',
        message: `새 지부소식 등록: ${news.title}`,
        date: news.date,
        time: '12:00'
      })
    })

    // 활동 시간순 정렬
    recentActivity.sort((a, b) => new Date(`${b.date} ${b.time}`).getTime() - new Date(`${a.date} ${a.time}`).getTime())

    const stats = {
      totalMembers,
      activeMembers,
      newMembersThisMonth,
      totalNews,
      newsThisMonth,
      totalViews,
      viewsThisMonth,
      totalVisitors: analyticsData.totalVisitors,
      todayVisitors: analyticsData.todayVisitors,
      thisWeekVisitors: analyticsData.thisWeekVisitors,
      thisMonthVisitors: analyticsData.thisMonthVisitors,
      membershipTypes,
      specialties,
      recentActivity: recentActivity.slice(0, 4), // 최근 4개만
      monthlyStats,
      pageViews: analyticsData.pageViews
    }
    
    return NextResponse.json({ 
      success: true, 
      data: stats 
    })
  } catch (error) {
    console.error('통계 계산 중 오류:', error)
    return NextResponse.json({ 
      success: false, 
      error: '통계 데이터 로드 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
} 