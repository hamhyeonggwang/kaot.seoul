'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Users, Newspaper, Eye, TrendingUp, Calendar, Activity, UserPlus, FileText, BarChart3, LogOut, User, Globe } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useRouter } from 'next/navigation'

interface Stats {
  totalMembers: number
  activeMembers: number
  newMembersThisMonth: number
  totalNews: number
  newsThisMonth: number
  totalViews: number
  viewsThisMonth: number
  totalVisitors: number
  todayVisitors: number
  thisWeekVisitors: number
  thisMonthVisitors: number
  membershipTypes: Record<string, number>
  specialties: Record<string, number>
  recentActivity: Array<{
    type: string
    message: string
    date: string
    time: string
  }>
  monthlyStats: Record<string, { members: number; news: number; views: number }>
  pageViews: Record<string, number>
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // 인증 체크
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession')
    if (!adminSession) {
      router.push('/admin/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminSession')
    localStorage.removeItem('adminUser')
    router.push('/admin/login')
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      const result = await response.json()
      if (result.success) {
        setStats(result.data)
        console.log('통계 데이터 로드됨:', result.data)
      }
    } catch (error) {
      console.error('통계 데이터 로드 중 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'member_join':
        return <UserPlus className="h-4 w-4 text-green-500" />
      case 'news_post':
        return <FileText className="h-4 w-4 text-blue-500" />
      case 'member_update':
        return <User className="h-4 w-4 text-yellow-500" />
      case 'news_view':
        return <Eye className="h-4 w-4 text-purple-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const membershipData = stats ? Object.entries(stats.membershipTypes).map(([name, value]) => ({
    name,
    value
  })) : []
  
  console.log('membershipData:', membershipData)

  const specialtyData = stats ? Object.entries(stats.specialties).map(([name, value]) => ({
    name,
    value
  })) : []

  const monthlyData = stats ? Object.entries(stats.monthlyStats).map(([month, data]) => ({
    month,
    members: data.members,
    news: data.news,
    views: data.views
  })) : []

  const COLORS = ['#3d9a5f', '#8dd1a8', '#bce5cc', '#dcf2e3', '#f0f9f4']

  if (loading) {
    return (
      <main>
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-500">대시보드를 불러오는 중...</div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <Navigation />
      
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">관리자 대시보드</h1>
              <p className="text-xl text-kaot-green-100">서울지부 현황 및 통계</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-kaot-green-600 rounded-lg hover:bg-gray-100 flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              로그아웃
            </button>
          </div>
        </div>
      </section>

      {/* Admin Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center space-x-4">
          <a href="/admin/dashboard" className="px-4 py-2 bg-kaot-green-600 text-white rounded-lg font-medium">
            대시보드
          </a>
          <a href="/admin/members" className="px-4 py-2 bg-white text-kaot-green-600 border border-kaot-green-600 rounded-lg font-medium hover:bg-kaot-green-50">
            회원 관리
          </a>
          <a href="/admin" className="px-4 py-2 bg-white text-kaot-green-600 border border-kaot-green-600 rounded-lg font-medium hover:bg-kaot-green-50">
            지부소식 관리
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {stats && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-kaot-green-100">
                    <Users className="h-6 w-6 text-kaot-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">총 회원 수</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalMembers}</p>
                    <p className="text-sm text-green-600">+{stats.newMembersThisMonth} 이번 달</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100">
                    <Newspaper className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">총 지부소식</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalNews}</p>
                    <p className="text-sm text-blue-600">+{stats.newsThisMonth} 이번 달</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">총 조회수</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
                    <p className="text-sm text-purple-600">+{stats.viewsThisMonth} 이번 달</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-orange-100">
                    <Globe className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">총 방문자</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalVisitors}</p>
                    <p className="text-sm text-orange-600">+{stats.todayVisitors} 오늘</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100">
                    <TrendingUp className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">활성 회원</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeMembers}</p>
                    <p className="text-sm text-yellow-600">{Math.round((stats.activeMembers / stats.totalMembers) * 100)}% 비율</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Monthly Trends */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">월별 트렌드</h3>
                {monthlyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="members" stroke="#3d9a5f" strokeWidth={2} />
                      <Line type="monotone" dataKey="news" stroke="#8dd1a8" strokeWidth={2} />
                      <Line type="monotone" dataKey="views" stroke="#bce5cc" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    데이터를 불러오는 중...
                  </div>
                )}
              </div>

              {/* Membership Types */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">회원 유형 분포</h3>
                {membershipData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={membershipData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {membershipData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    데이터를 불러오는 중...
                  </div>
                )}
              </div>
            </div>

            {/* Page Views */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">페이지별 방문자 수</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(stats.pageViews).map(([page, views]) => (
                  <div key={page} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {page === '/' ? '홈페이지' : 
                       page === '/news' ? '지부소식' :
                       page === '/community' ? '커뮤니티' :
                       page === '/join' ? '회원가입' :
                       page === '/info' ? '지부안내' :
                       page === '/partners' ? '협력기관' :
                       page === '/youtube' ? '유튜브' : page}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{views}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 활동</h3>
              <div className="space-y-4">
                {stats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.date} {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  )
} 