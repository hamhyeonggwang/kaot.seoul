'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import MemberStats from '@/components/MemberStats'
import Link from 'next/link'
import { Calendar, Users, MessageCircle, BookOpen, Award, Heart, Instagram, Play, ExternalLink, Users2, Newspaper, ArrowRight, Mail } from 'lucide-react'

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

export default function Home() {
  const [recentNews, setRecentNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentNews()
    // 방문자 수 추적
    trackVisitor()
  }, [])

  const trackVisitor = async () => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: '/',
          timestamp: new Date().toISOString()
        })
      })
    } catch (error) {
      console.error('방문자 추적 중 오류:', error)
    }
  }

  const fetchRecentNews = async () => {
    try {
      const response = await fetch('/api/news')
      const result = await response.json()
      if (result.success) {
        // 최신 3개만 가져오기
        const sortedNews = result.data.sort((a: NewsItem, b: NewsItem) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        setRecentNews(sortedNews.slice(0, 3))
      }
    } catch (error) {
      console.error('뉴스 데이터 로드 중 오류:', error)
    } finally {
      setLoading(false)
    }
  }



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
    <>
      <Hero />
      <MemberStats />
      
      {/* Recent News Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">최신 소식</h2>
            <p className="text-lg text-gray-600">서울지부의 최신 활동과 소식을 확인하세요</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="text-gray-500">최신 소식을 불러오는 중...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {recentNews.map((news) => (
                <div key={news.id} className="card bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-kaot-green-100 text-kaot-green-700 text-xs font-medium px-2 py-1 rounded">
                        {news.category}
                      </span>
                      <span className="text-gray-500 text-sm">{news.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{news.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{news.content}</p>
                    
                    {/* Additional Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <span className="mr-4">👁️ {news.views} 조회</span>
                        <span>👤 {news.author}</span>
                      </div>
                      {news.tags && news.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {news.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <Link href={`/news/${news.id}`} className="inline-flex items-center text-kaot-green-600 hover:text-kaot-green-700 font-medium transition-colors duration-200">
                      자세히 보기
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center">
            <Link href="/news" className="inline-flex items-center bg-kaot-green-600 hover:bg-kaot-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              모든 소식 보기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Videos Section */}
      <section className="py-16 bg-kaot-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">관련 영상</h2>
            <p className="text-lg text-gray-600">작업치료 관련 유용한 영상들을 확인하세요</p>
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
              href="/youtube"
              className="btn-primary inline-flex items-center"
            >
              더 많은 영상 보기
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
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

          {/* Member Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="text-lg font-semibold text-white mb-2">전문 교육</h3>
              <p className="text-kaot-green-100">정기적인 세미나 및 워크샵 참여</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className="text-2xl mb-2">🤝</div>
              <h3 className="text-lg font-semibold text-white mb-2">네트워크</h3>
              <p className="text-kaot-green-100">전문가들과의 정보 공유 및 협력</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="text-lg font-semibold text-white mb-2">자료실</h3>
              <p className="text-kaot-green-100">최신 연구 자료 및 치료 기법</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/join" className="bg-white text-kaot-green-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-lg">
              회원가입
            </Link>
            <Link href="/community" className="border-2 border-white text-white hover:bg-white hover:text-kaot-green-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              커뮤니티 둘러보기
            </Link>
            <Link href="/info" className="border-2 border-white text-white hover:bg-white hover:text-kaot-green-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              지부 안내
            </Link>
          </div>
          
          {/* Social Media Links */}
          <div className="border-t border-kaot-green-500 pt-8">
            <p className="text-kaot-green-100 mb-4">소셜 미디어에서도 서울지부를 만나보세요</p>
            <div className="flex justify-center items-center space-x-6">
              <a
                href="https://www.youtube.com/@kaotseoul"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-kaot-green-200 transition-colors duration-200 bg-white bg-opacity-10 rounded-lg px-4 py-2 hover:bg-opacity-20"
              >
                <Play className="h-5 w-5 mr-2" />
                <span className="font-medium">YouTube</span>
              </a>
              <a
                href="https://www.instagram.com/kaot.seoul"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-kaot-green-200 transition-colors duration-200 bg-white bg-opacity-10 rounded-lg px-4 py-2 hover:bg-opacity-20"
              >
                <Instagram className="h-5 w-5 mr-2" />
                <span className="font-medium">@kaot.seoul</span>
              </a>
              <a
                href="https://www.band.us/band/82793225/invite"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-kaot-green-200 transition-colors duration-200 bg-white bg-opacity-10 rounded-lg px-4 py-2 hover:bg-opacity-20"
              >
                <span className="text-xl mr-2">🎵</span>
                <span className="font-medium">Band</span>
              </a>
              <a
                href="mailto:contact@kaot.seoul"
                className="flex items-center text-white hover:text-kaot-green-200 transition-colors duration-200 bg-white bg-opacity-10 rounded-lg px-4 py-2 hover:bg-opacity-20"
              >
                <Mail className="h-5 w-5 mr-2" />
                <span className="font-medium">문의하기</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 