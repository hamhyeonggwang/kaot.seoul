'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, User, Tag, ArrowRight, Search, Filter } from 'lucide-react'

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['전체', '공지사항', '지부사업', '교육', '통계', '정책', '국제협력']

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
      content: '2025년 6월 14일 여의도 이룸센터에서 "임상기술 마스터 클래스 - 상지재활의 이론과 실제" 보수교육이 성공적으로 진행되었습니다. 총 50명의 작업치료사가 참석하여 실습 위주의 교육을 통해 상지재활에 대한 전문 지식과 실무 기술을 향상시켰습니다.',
      category: '교육',
      date: '2025-06-14',
      author: 'KAOT 서울지부',
      views: 67,
      tags: ['보수교육', '상지재활', '마스터클래스', '실습', '여의도이룸센터']
    }
  ]

  const filteredNews = newsData.filter(news => {
    const matchesCategory = selectedCategory === '전체' || news.category === selectedCategory
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-kaot-green-600 to-kaot-green-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">지부소식</h1>
          <p className="text-xl text-kaot-green-100">서울지부의 최신 소식과 활동을 확인하세요</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="뉴스 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-kaot-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <article key={news.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {news.date}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {news.title}
                </h3>

                {/* Content */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {news.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {news.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {news.author}
                  </div>
                  <div>
                    조회수 {news.views}
                  </div>
                </div>

                {/* Read More Button */}
                <div className="mt-4">
                  <Link href={`/news/${news.id}`} className="flex items-center text-kaot-green-600 hover:text-kaot-green-700 font-medium transition-colors cursor-pointer">
                    자세히 보기
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">검색 결과가 없습니다.</div>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('전체')
              }}
              className="text-kaot-green-600 hover:text-kaot-green-700 font-medium"
            >
              검색 조건 초기화
            </button>
          </div>
        )}
      </div>
    </>
  )
} 