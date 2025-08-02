import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    // 실제 데이터에서 통계 계산
    const [newsResponse, membersResponse, analyticsResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/news`),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/members`),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/analytics`)
    ])

    const newsResult = await newsResponse.json()
    const membersResult = await membersResponse.json()
    const analyticsResult = await analyticsResponse.json()

    if (!newsResult.success || !membersResult.success || !analyticsResult.success) {
      throw new Error('데이터 로드 실패')
    }

    const newsData = newsResult.data
    const membersData = membersResult.data
    const analyticsData = analyticsResult.data

    // 현재 날짜 기준 계산
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    // 회원 통계 계산
    const totalMembers = membersData.length
    const activeMembers = membersData.filter(member => member.status === 'active').length
    const newMembersThisMonth = membersData.filter(member => {
      const joinDate = new Date(member.joinDate)
      return joinDate.getMonth() === currentMonth && joinDate.getFullYear() === currentYear
    }).length

    // 회원 유형별 통계
    const membershipTypes = membersData.reduce((acc, member) => {
      acc[member.membershipType] = (acc[member.membershipType] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // 전문분야별 통계
    const specialties = membersData.reduce((acc, member) => {
      acc[member.specialty] = (acc[member.specialty] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // 뉴스 통계 계산
    const totalNews = newsData.length
    const newsThisMonth = newsData.filter(news => {
      const newsDate = new Date(news.date)
      return newsDate.getMonth() === currentMonth && newsDate.getFullYear() === currentYear
    }).length

    // 조회수 통계 (실제로는 데이터베이스에서 집계해야 함)
    const totalViews = newsData.reduce((sum, news) => sum + (news.views || 0), 0)
    const viewsThisMonth = newsData.filter(news => {
      const newsDate = new Date(news.date)
      return newsDate.getMonth() === currentMonth && newsDate.getFullYear() === currentYear
    }).reduce((sum, news) => sum + (news.views || 0), 0)

    // 월별 통계 (최근 6개월)
    const monthlyStats: Record<string, { members: number; news: number; views: number }> = {}
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - i, 1)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      
      const monthMembers = membersData.filter(member => {
        const joinDate = new Date(member.joinDate)
        return joinDate.getMonth() === date.getMonth() && joinDate.getFullYear() === date.getFullYear()
      }).length

      const monthNews = newsData.filter(news => {
        const newsDate = new Date(news.date)
        return newsDate.getMonth() === date.getMonth() && newsDate.getFullYear() === date.getFullYear()
      }).length

      const monthViews = newsData.filter(news => {
        const newsDate = new Date(news.date)
        return newsDate.getMonth() === date.getMonth() && newsDate.getFullYear() === date.getFullYear()
      }).reduce((sum, news) => sum + (news.views || 0), 0)

      monthlyStats[monthKey] = {
        members: monthMembers,
        news: monthNews,
        views: monthViews
      }
    }

    // 최근 활동 (실제 데이터 기반)
    const recentActivity = []
    
    // 최근 회원 가입
    const recentMembers = membersData
      .sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
      .slice(0, 2)
    
    recentMembers.forEach(member => {
      recentActivity.push({
        type: 'member_join',
        message: `새 회원 가입: ${member.name}`,
        date: member.joinDate,
        time: '12:00'
      })
    })

    // 최근 뉴스 등록
    const recentNews = newsData
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 2)
    
    recentNews.forEach(news => {
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