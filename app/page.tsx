import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import MemberStats from '@/components/MemberStats'
import Link from 'next/link'
import { Calendar, Users, MessageCircle, BookOpen, Award, Heart, Instagram, Play, ExternalLink, Users2, Newspaper } from 'lucide-react'

export default function Home() {
  const recentNews = [
    {
      id: 1,
      title: '2024년 서울지부 정기총회 개최 안내',
      date: '2024-01-15',
      category: '공지사항',
      excerpt: '2024년 서울지부 정기총회가 2월 15일(목) 오후 2시에 개최됩니다...'
    },
    {
      id: 2,
      title: '작업치료 전문가 교육 프로그램 신청 안내',
      date: '2024-01-10',
      category: '교육',
      excerpt: '2024년 상반기 작업치료 전문가 교육 프로그램 신청을 받고 있습니다...'
    },
    {
      id: 3,
      title: '서울지부 회원 대상 무료 건강검진 실시',
      date: '2024-01-05',
      category: '복지',
      excerpt: '서울지부 회원을 대상으로 한 무료 건강검진이 3월에 실시됩니다...'
    }
  ]

  const features = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: '정기 교육 프로그램',
      description: '연중 다양한 주제의 전문 교육 프로그램을 제공합니다.'
    },
    {
      icon: <Users2 className="h-8 w-8" />,
      title: '전문가 네트워킹',
      description: '서울 지역 작업치료사들과의 소통과 협력 기회를 통해 전문성을 향상시킬 수 있습니다.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: '자조모임 지원',
      description: '지부 회원 간 자조모임을 통해 경험을 공유하고 서로를 지원합니다.'
    },
    {
      icon: <Newspaper className="h-8 w-8" />,
      title: '뉴스레터 발송',
      description: '서울지역 작업치료 이슈 관련 뉴스레터를 정기적으로 발송합니다.'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: '자격 인증 지원',
      description: '회원들의 전문성 향상을 위한 자격 인증을 지원합니다.'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: '복지 혜택',
      description: '회원들을 위한 다양한 복지 혜택을 제공합니다.'
    }
  ]

  const youtubeVideos = [
    {
      id: 1,
      title: '작업치료의 기본 원리와 실제 적용',
      description: '작업치료의 핵심 개념과 임상에서의 실제 적용 방법을 소개합니다.',
      videoId: 'dQw4w9WgXcQ', // 예시 비디오 ID
      duration: '15:32',
      views: '2,450',
      date: '2024-01-10'
    },
    {
      id: 2,
      title: '소아 작업치료 기법 실습',
      description: '아동을 대상으로 한 작업치료 기법과 실습 방법을 다룹니다.',
      videoId: 'dQw4w9WgXcQ', // 예시 비디오 ID
      duration: '22:15',
      views: '1,890',
      date: '2024-01-08'
    },
    {
      id: 3,
      title: '뇌졸중 환자 재활 치료 사례',
      description: '뇌졸중 환자의 재활 치료 과정과 성공 사례를 공유합니다.',
      videoId: 'dQw4w9WgXcQ', // 예시 비디오 ID
      duration: '18:45',
      views: '3,120',
      date: '2024-01-05'
    }
  ]

  return (
    <main>
      <Navigation />
      <Hero />
      <MemberStats />
      
      {/* Recent News Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">최신 소식</h2>
            <p className="text-lg text-gray-600">서울지부의 최신 활동과 소식을 확인하세요</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {recentNews.map((news) => (
              <div key={news.id} className="card">
                <div className="flex items-center mb-3">
                  <span className="bg-kaot-green-100 text-kaot-green-700 text-xs font-medium px-2 py-1 rounded">
                    {news.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-auto">{news.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{news.title}</h3>
                <p className="text-gray-600 mb-4">{news.excerpt}</p>
                <Link href={`/news/${news.id}`} className="text-kaot-green-600 hover:text-kaot-green-700 font-medium">
                  자세히 보기 →
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/news" className="btn-primary">
              모든 소식 보기
            </Link>
          </div>
        </div>
      </section>

      {/* YouTube Videos Section */}
      <section className="py-16 bg-kaot-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">교육 영상</h2>
            <p className="text-lg text-gray-600">작업치료 관련 교육 영상과 지부 활동 영상을 확인하세요</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {youtubeVideos.map((video) => (
              <div key={video.id} className="card">
                {/* Video Thumbnail */}
                <div className="relative mb-4">
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                
                {/* Video Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
                  <p className="text-gray-600 mb-3">{video.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Play className="h-4 w-4 mr-1" />
                      <span>{video.views} 조회수</span>
                    </div>
                    <span>{video.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <a
              href="https://www.youtube.com/@kaotseoul"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center"
            >
              더 많은 영상 보기
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">서울지부 혜택</h2>
            <p className="text-lg text-gray-600">회원이 되시면 다양한 혜택을 받으실 수 있습니다</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="bg-kaot-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-kaot-green-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-kaot-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">지금 바로 회원가입하세요</h2>
          <p className="text-xl text-kaot-green-100 mb-8">
            서울지부와 함께 작업치료의 미래를 만들어가세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/join" className="bg-white text-kaot-green-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              회원가입
            </Link>
            <Link href="/community" className="border-2 border-white text-white hover:bg-white hover:text-kaot-green-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              커뮤니티 둘러보기
            </Link>
          </div>
          
          {/* Social Media Links */}
          <div className="flex justify-center items-center space-x-6">
            <a
              href="https://www.instagram.com/kaot.seoul"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white hover:text-kaot-green-200 transition-colors duration-200"
            >
              <Instagram className="h-6 w-6 mr-2" />
              <span className="font-medium">@kaot.seoul</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 