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
      title: '2025년 서울특별시 작업치료사회 자조모임 지원 사업 안내',
      content: `안녕하십니까. 대한작업치료사협회 서울지부 입니다.
오늘도 다양한 분야에서 작업치료의 발전을 위해 힘쓰고 계신 협회원 분들을 위한 지원사업으로 "2025년 서울특별시 작업치료사회 자조모임 지원 사업"을 진행하오니 많은 관심과 참여 바랍니다.

□ 사업취지
▷ 대한작업치료사협회 서울지부 소속 작업치료사 중 자발적인 동호회 및 각종 모임을 구성한 경우 지원하여 회원 상호간의 친목도모 및 동료의식을 함양

□ 자조모임(동호회) 모집 : 총 4팀

□ 신청기간 : 5월 12일(월) 14:00 부터 ~ 5월 26일(월) 18:00 까지

□ 신청대상
▷ 구성원 소속지부가 서울지회 소속 작업치료사로서 4명 이상의 자조모임 또는 동호회
※ 자조모임(동호회) (예시) : 친목, 자기개발, 전문성 함양
▷ 1년 이상 지속적, 자발적으로 활동이 가능한 자조모임(동호회)

자조모임
- 연간 총 5회 정기모임 운영
- 각 자조모임(동호회) 내 운영자 1명 필수 구성
- 운영자 1명을 포함하여 총 4명 이상의 구성원
- 구성원의 구성은 2개 이상 기관의 연합 동호회 우선 지원

운영자
- 모임 운영, 준비에 서울지부 담당자와 협의 및 관리
- 매회차 활동 필수 참석(참석이 어려울 경우 대체자 필수)
- 운영계획서, 활동결과보고서 작성 및 제출

□ 신청방법
▷ 지원센터 방문 접수
▷ 이메일 접수(h2g0614@gmail.com 대한작업치료사협회 서울지부 홍보이사 함형광)
▷ 신청서(양식) : 구글링크 https://forms.gle/R1o5Y97jix9bz6Gf8
※ 신청서류 : 신청서(구글링크), 활동계획서(자유양식), 개인정보동의서

□ 자조모임 선정 절차
▷ 1차 서류심사 발표 : 5월 28일(수) 14:00 (개별 연락- 신청 시 작성한 이메일/문자)
▷ 2차 온라인 면접심사 : 5월 29일(목) 20:00
※ 서류심사 합격한 팀에 한해 실시. 면접시간 및 장소 개별 통보
▷ 최종 선정결과 발표 : 면접심사일 익일 개별 연락 및 최종 선정 명단 SNS 게시

□ 자조모임의 기준 및 활동 : 직무 관련 권익실천, 취미 및 봉사 동아리, 독서 및 학습 동아리 등
□ 활동지원금 : 최대 50만원(1년)

□ 지원내용 및 방식
구분 | 지원내용 | 지원방식
자조모임 운영비 | - 사용 가능 항목 : 체험비, 재료비, 입장료, 강사비(비영리단체 회계지침 규정 적용), 식대, 다과비, 교통비 등 | 자조모임 운영계획서에 따라 회차별 지원(10만원 지원)
온라인 모임 지원 | - 온라인 모임을 위한 서울지부 Zoom 계정 이용 | 사전 신청 시, 무료이용

□ 문의사항 : h2g0614@gmail.com 대한작업치료사협회 서울지부 홍보이사 함형광`,
      category: '지부사업',
      date: '2025-05-12',
      author: 'KAOT 서울지부',
      views: 89,
      tags: ['자조모임지원', '동호회지원', '활동지원금', '친목도모', '서울특별시']
    },
    {
      id: 2,
      title: '2025 서울시교육청 긍정적행동지원(PBS) 참여 작업치료사 지원',
      content: `서울시교육청에서 진행하는 긍정적행동지원(Positive Behavior Support, PBS) 사업에 참여하는 작업치료사들을 지원하는 사업입니다.

□ 사업 개요
▷ 서울시교육청 특수교육 현장에서 학생들의 긍정적인 행동 변화를 이끌어내기 위한 전문적인 작업치료 서비스 제공
▷ 교육 현장의 작업치료사 역량 강화를 위한 다양한 지원 프로그램 운영

□ 지원 대상
▷ 서울시교육청 소속 특수학교 및 특수학급에서 근무하는 작업치료사
▷ PBS 사업에 참여하고 있는 작업치료사
▷ 특수교육 현장에서 학생들의 행동 문제 해결에 관심이 있는 작업치료사

□ 지원 내용
▷ PBS 전문 교육 및 워크샵 참여 지원
▷ 특수교육 현장 컨설팅 및 기술 지원
▷ PBS 관련 자료 및 도구 제공
▷ 네트워킹 및 정보 공유 활동 지원

□ 활동 기간
▷ 2025년 2월 ~ 12월 (11개월)

□ 문의사항
▷ 서울지부 교육사업 담당자
▷ 이메일: education@kaot-seoul.or.kr`,
      category: '지부사업',
      date: '2025-02-15',
      author: 'KAOT 서울지부',
      views: 56,
      tags: ['PBS', '긍정적행동지원', '서울시교육청', '특수교육', '작업치료사지원']
    },
    {
      id: 3,
      title: '지역사회 통합돌봄 사업협력 성과보고회',
      content: `2025년 2월 8일 지역사회 통합돌봄 사업협력 성과보고회가 성공적으로 개최되었습니다.

□ 행사 개요
▷ 일시: 2025년 2월 8일 (토) 14:00-17:00
▷ 장소: 서울시청 시민청
▷ 참석자: 통합돌봄 사업 참여 작업치료사, 관련 기관 관계자, 서울지부 관계자 등 총 80명

□ 주요 내용
▷ 지역사회 기반 통합돌봄 서비스에 참여한 작업치료사들과 함께 그간의 성과를 공유
▷ 향후 사업 발전 방향에 대해 논의하는 자리를 마련
▷ 지역사회 내 취약계층의 삶의 질 향상과 건강한 지역사회 조성에 기여한 작업치료사들의 노력을 인정
▷ 지속적인 협력을 위한 방안을 모색

□ 성과 및 결과
▷ 2024년 한 해 동안 총 15개 구에서 120명의 작업치료사가 통합돌봄 사업에 참여
▷ 3,500여 가정에 방문 작업치료 서비스 제공
▷ 지역사회 내 취약계층의 일상생활 활동 향상 및 삶의 질 개선에 기여
▷ 작업치료사의 전문성과 역량 강화를 위한 교육 프로그램 운영

□ 향후 계획
▷ 2025년 통합돌봄 사업 확대 및 참여 작업치료사 지원 강화
▷ 지역사회 기반 작업치료 서비스 모델 개발 및 보급
▷ 관련 기관과의 협력 체계 구축 및 강화

□ 문의사항
▷ 서울지부 사업담당자
▷ 이메일: business@kaot-seoul.or.kr`,
      category: '지부사업',
      date: '2025-02-08',
      author: 'KAOT 서울지부',
      views: 42,
      tags: ['통합돌봄', '성과보고회', '지역사회', '사업협력', '취약계층지원']
    },
    {
      id: 4,
      title: 'KAOT 서울지부 홈페이지 개설 안내',
      content: '대한작업치료사협회 서울지부 홈페이지가 2025년 8월 1일부터 정식 서비스를 시작합니다. 회원 여러분께 더 나은 서비스와 정보를 제공하기 위해 노력하겠습니다. 많은 관심과 이용 부탁드립니다.',
      category: '공지사항',
      date: '2025-08-01',
      author: 'KAOT 서울지부',
      views: 1,
      tags: ['홈페이지개설', '서울지부', '공지사항']
    },
    {
      id: 5,
      title: 'SST 캠프 - 사회기술훈련 프로그램 운영',
      content: '서울지부에서 아동 및 청소년을 대상으로 한 SST(Social Skills Training) 캠프를 운영하고 있습니다. 사회적 상호작용 기술 향상과 일상생활 적응 능력 증진을 위한 전문적인 작업치료 프로그램으로, 참여 아동들의 사회성 발달에 긍정적인 변화를 가져오고 있습니다.',
      category: '지부사업',
      date: '2025-01-15',
      author: 'KAOT 서울지부',
      views: 45,
      tags: ['SST캠프', '사회기술훈련', '아동청소년', '작업치료프로그램']
    },
    {
      id: 6,
      title: '마음으로 On - 성동구 지역사회 기반 방문 작업치료',
      content: '서울지부가 성동구 지역사회에서 "마음으로 On" 프로그램을 통해 방문 작업치료 서비스를 제공하고 있습니다. 지역사회 기반 방문 작업치료사와 함께 실천하고 싶은 작업치료사들을 모집하여, 지역 주민들의 삶의 질 향상과 건강한 지역사회 조성에 기여하고 있습니다.',
      category: '지부사업',
      date: '2025-01-10',
      author: 'KAOT 서울지부',
      views: 38,
      tags: ['마음으로On', '방문작업치료', '성동구', '지역사회', 'ICF']
    },
    {
      id: 7,
      title: '임상기술 마스터 클래스 - 상지재활의 이론과 실제',
      content: '2025년 6월 14일 여의도 이룸센터에서 "임상기술 마스터 클래스 - 상지재활의 이론과 실제" 보수교육이 성공적으로 진행되었습니다. 총 50명의 작업치료사가 참석하여 실습 위주의 교육을 통해 상지재활에 대한 전문 지식과 실무 기술을 향상시켰습니다.',
      category: '교육',
      date: '2025-06-14',
      author: 'KAOT 서울지부',
      views: 67,
      tags: ['보수교육', '상지재활', '마스터클래스', '실습', '여의도이룸센터']
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
            <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {news.content}
            </div>
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