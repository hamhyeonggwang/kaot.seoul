import Link from 'next/link'
import { Play, ExternalLink, Calendar, Eye, ThumbsUp, MessageCircle, FileText, BookOpen, Download, Info } from 'lucide-react'

export default function InfoPage() {
  const categories = [
    { name: '전체', active: true },
    { name: '교육 영상', active: false },
    { name: '자료실', active: false },
    { name: '공지사항', active: false },
    { name: '정책자료', active: false },
    { name: '연구자료', active: false }
  ]

  const contentItems = [
    {
      id: 1,
      title: '작업치료의 기본 원리와 실제 적용',
      description: '작업치료의 핵심 개념과 임상에서의 실제 적용 방법을 소개합니다.',
      type: 'video',
      videoId: 'dQw4w9WgXcQ',
      duration: '15:32',
      views: '2,450',
      date: '2024-01-10',
      category: '교육 영상'
    },
    {
      id: 2,
      title: '작업치료사 자격증 갱신 정책자료',
      description: '작업치료사 자격증 갱신을 위한 상세한 정책자료와 절차를 안내합니다.',
      type: 'document',
      fileSize: '2.3MB',
      downloads: '1,234',
      date: '2024-01-08',
      category: '정책자료'
    },
    {
      id: 3,
      title: '2024년 작업치료 연구 동향 보고서',
      description: '2024년 작업치료 분야의 최신 연구 동향과 향후 발전 방향을 분석한 보고서입니다.',
      type: 'document',
      fileSize: '5.7MB',
      downloads: '890',
      date: '2024-01-05',
      category: '연구자료'
    },
    {
      id: 4,
      title: '소아 작업치료 기법 실습',
      description: '아동을 대상으로 한 작업치료 기법과 실습 방법을 다룹니다.',
      type: 'video',
      videoId: 'dQw4w9WgXcQ',
      duration: '22:15',
      views: '1,890',
      date: '2024-01-03',
      category: '교육 영상'
    },
    {
      id: 5,
      title: '작업치료 관련 법규 및 제도',
      description: '작업치료 관련 법규, 제도, 정책 변화에 대한 최신 정보를 제공합니다.',
      type: 'document',
      fileSize: '1.8MB',
      downloads: '567',
      date: '2023-12-28',
      category: '자료실'
    },
    {
      id: 6,
      title: '뇌졸중 환자 재활 치료 사례',
      description: '뇌졸중 환자의 재활 치료 과정과 성공 사례를 공유합니다.',
      type: 'video',
      videoId: 'dQw4w9WgXcQ',
      duration: '18:45',
      views: '3,120',
      date: '2023-12-25',
      category: '교육 영상'
    }
  ]

  const quickLinks = [
    {
      title: '면허 관리',
      description: '작업치료사 면허신고 및 관리',
      icon: <FileText className="h-8 w-8" />,
      href: 'https://kaot.org/help/return.jsp#a',
      external: true
    },
    {
      title: '교육 프로그램',
      description: '정기 교육 프로그램 및 세미나 정보',
      icon: <BookOpen className="h-8 w-8" />,
      href: 'https://kaot.org/offline/offline_list.jsp',
      external: true
    },
    {
      title: '연구자료',
      description: '작업치료 관련 연구 논문 및 자료',
      icon: <Info className="h-8 w-8" />,
      href: 'https://kaot.org/board/index.jsp?code=treatise',
      external: true
    },
    {
      title: '정책자료',
      description: '작업치료 관련 정책 및 가이드라인',
      icon: <Download className="h-8 w-8" />,
      href: 'https://kaot.org/board/index.jsp?code=policy',
      external: true
    }
  ]

  return (
    <>
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">정보마당</h1>
          <p className="text-xl text-kaot-green-100">작업치료 관련 교육 자료와 정보를 한곳에서 확인하세요</p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">빠른 링크</h2>
            <p className="text-lg text-gray-600">자주 찾는 정보들을 빠르게 확인하세요</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              link.external ? (
                <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                  <div className="card text-center hover:shadow-xl transition-shadow duration-200">
                    <div className="bg-kaot-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-kaot-green-600">
                      {link.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{link.title}</h3>
                    <p className="text-gray-600">{link.description}</p>
                  </div>
                </a>
              ) : (
                <Link key={index} href={link.href}>
                  <div className="card text-center hover:shadow-xl transition-shadow duration-200">
                    <div className="bg-kaot-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-kaot-green-600">
                      {link.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{link.title}</h3>
                    <p className="text-gray-600">{link.description}</p>
                  </div>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Content Categories */}
      <section className="py-8 bg-kaot-green-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  category.active
                    ? 'bg-kaot-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-16 bg-kaot-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contentItems.map((item) => (
              <div key={item.id} className="card">
                {/* Content Thumbnail */}
                <div className="relative mb-4">
                  {item.type === 'video' ? (
                    <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed/${item.videoId}`}
                        title={item.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-kaot-green-600 text-white text-xs px-2 py-1 rounded">
                    {item.type === 'video' ? item.duration : item.fileSize}
                  </div>
                  <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    {item.category}
                  </div>
                </div>
                
                {/* Content Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      {item.type === 'video' ? (
                        <>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>{item.views} 조회수</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center">
                            <Download className="h-4 w-4 mr-1" />
                            <span>{item.downloads} 다운로드</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="btn-primary">
              더 많은 자료 보기
            </button>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">정보마당 이용 안내</h2>
          <p className="text-lg text-gray-600 mb-8">
            정보마당에서는 작업치료 관련 교육 영상, 연구 자료, 가이드라인 등 다양한 정보를 제공합니다. 
            회원이 되시면 더 많은 자료에 접근할 수 있으며, 정기적으로 업데이트되는 최신 정보를 받아보실 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join" className="btn-primary inline-flex items-center">
              회원가입
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
            <a
              href="https://www.youtube.com/@kaotseoul"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center"
            >
              <Play className="h-5 w-5 mr-2" />
              유튜브 채널
            </a>
          </div>
        </div>
      </section>
    </>
  )
} 