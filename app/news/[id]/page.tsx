'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Calendar, User, Tag, ArrowLeft, Eye, ThumbsUp, MessageSquare } from 'lucide-react'

export default function NewsDetailPage() {
  const params = useParams()
  const newsId = params.id

  // 실제로는 API에서 데이터를 가져와야 하지만, 여기서는 정적 데이터 사용
  const newsData = [
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
      content: '2025년 6월 14일 여의도 이루센터에서 "임상기술 마스터 클래스 - 상지재활의 이론과 실제" 보수교육이 성공적으로 진행되었습니다. 총 50명의 작업치료사가 참석하여 실습 위주의 교육을 통해 상지재활에 대한 전문 지식과 실무 기술을 향상시켰습니다.',
      category: '교육',
      date: '2025-06-14',
      author: 'KAOT 서울지부',
      views: 67,
      tags: ['보수교육', '상지재활', '마스터클래스', '실습', '여의도이루센터']
    }
  ]

  const news = newsData.find(item => item.id === parseInt(newsId as string))

  if (!news) {
    return (
      <div className="min-h-screen bg-kaot-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">게시물을 찾을 수 없습니다</h1>
            <Link href="/news" className="text-kaot-green-600 hover:text-kaot-green-700 font-medium">
              지부소식 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-kaot-green-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-kaot-green-600 to-kaot-green-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/news" className="inline-flex items-center text-kaot-green-100 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            지부소식 목록으로
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">{news.title}</h1>
          <div className="flex items-center text-kaot-green-100">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="mr-4">{news.date}</span>
            <User className="h-4 w-4 mr-2" />
            <span>{news.author}</span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-lg shadow-lg p-8">
          {/* Category Badge */}
          <div className="mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              news.category === '공지사항' ? 'bg-red-100 text-red-700' :
              news.category === '지부사업' ? 'bg-yellow-100 text-yellow-700' :
              news.category === '교육' ? 'bg-blue-100 text-blue-700' :
              news.category === '통계' ? 'bg-green-100 text-green-700' :
              news.category === '정책' ? 'bg-purple-100 text-purple-700' :
              news.category === '국제협력' ? 'bg-orange-100 text-orange-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {news.category}
            </span>
          </div>

          {/* Content */}
          <div className="prose max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              {news.content}
            </p>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-3">태그</h3>
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Meta Info */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  조회수 {news.views}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/news" className="text-kaot-green-600 hover:text-kaot-green-700 font-medium">
                  목록으로 돌아가기
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
} 