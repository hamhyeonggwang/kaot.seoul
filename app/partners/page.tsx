import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ExternalLink, Building, Globe, Phone, Mail } from 'lucide-react'

export default function PartnersPage() {
  const partners = [
    {
      id: 1,
      name: '대한작업치료사협회',
      description: '전국 작업치료사들의 대표 조직',
      website: 'https://www.kaot.or.kr',
      phone: '02-1234-5678',
      email: 'info@kaot.or.kr',
      category: '전국협회',
      logo: 'KAOT'
    },
    {
      id: 2,
      name: '보건복지부',
      description: '국가 보건의료 정책 수립 및 관리',
      website: 'https://www.mohw.go.kr',
      phone: '02-2023-7000',
      email: 'webmaster@mohw.go.kr',
      category: '정부기관',
      logo: 'MOHW'
    },
    {
      id: 3,
      name: '서울특별시청',
      description: '서울시 보건의료 정책 및 서비스',
      website: 'https://www.seoul.go.kr',
      phone: '02-120',
      email: 'webmaster@seoul.go.kr',
      category: '지방정부',
      logo: 'SEOUL'
    },
    {
      id: 4,
      name: '서울대학교병원',
      description: '국내 최고 수준의 의료 서비스 제공',
      website: 'https://www.snuh.org',
      phone: '02-2072-0505',
      email: 'webmaster@snuh.org',
      category: '의료기관',
      logo: 'SNUH'
    },
    {
      id: 5,
      name: '연세대학교병원',
      description: '최신 의료기술과 치료 서비스 제공',
      website: 'https://www.yuhs.or.kr',
      phone: '02-2228-5800',
      email: 'webmaster@yuhs.or.kr',
      category: '의료기관',
      logo: 'YUHS'
    },
    {
      id: 6,
      name: '고려대학교병원',
      description: '고품질 의료 서비스와 연구 활동',
      website: 'https://www.kumc.or.kr',
      phone: '02-2626-1114',
      email: 'webmaster@kumc.or.kr',
      category: '의료기관',
      logo: 'KUMC'
    },
    {
      id: 7,
      name: '서울아산병원',
      description: '최첨단 의료기술과 환자 중심 치료',
      website: 'https://www.amc.seoul.kr',
      phone: '02-3010-5000',
      email: 'webmaster@amc.seoul.kr',
      category: '의료기관',
      logo: 'AMC'
    },
    {
      id: 8,
      name: '삼성서울병원',
      description: '세계적 수준의 의료 서비스 제공',
      website: 'https://www.samsunghospital.com',
      phone: '02-3410-2114',
      email: 'webmaster@samsunghospital.com',
      category: '의료기관',
      logo: 'SSH'
    },
    {
      id: 9,
      name: '서울대학교 작업치료학과',
      description: '작업치료 전문가 양성 및 연구',
      website: 'https://ot.snu.ac.kr',
      phone: '02-880-1234',
      email: 'ot@snu.ac.kr',
      category: '교육기관',
      logo: 'SNU'
    },
    {
      id: 10,
      name: '연세대학교 작업치료학과',
      description: '작업치료 교육 및 연구 활동',
      website: 'https://ot.yonsei.ac.kr',
      phone: '02-2123-5678',
      email: 'ot@yonsei.ac.kr',
      category: '교육기관',
      logo: 'YONSEI'
    },
    {
      id: 11,
      name: '고려대학교 작업치료학과',
      description: '작업치료 전문가 교육',
      website: 'https://ot.korea.ac.kr',
      phone: '02-3290-1234',
      email: 'ot@korea.ac.kr',
      category: '교육기관',
      logo: 'KOREA'
    },
    {
      id: 12,
      name: '한국보건의료연구원',
      description: '보건의료 정책 연구 및 개발',
      website: 'https://www.nhimc.or.kr',
      phone: '02-2188-7000',
      email: 'webmaster@nhimc.or.kr',
      category: '연구기관',
      logo: 'NHIMC'
    }
  ]

  const categories = ['전체', '전국협회', '정부기관', '지방정부', '의료기관', '교육기관', '연구기관']

  return (
    <main>
      <Navigation />
      
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">협력기관</h1>
          <p className="text-xl text-kaot-green-100">서울지부와 협력하는 다양한 기관들을 소개합니다</p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-lg bg-kaot-green-100 text-kaot-green-700 hover:bg-kaot-green-200 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <div key={partner.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-kaot-green-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <span className="text-kaot-green-700 font-bold text-sm">{partner.logo}</span>
                  </div>
                  <span className="bg-kaot-green-50 text-kaot-green-700 text-xs font-medium px-2 py-1 rounded">
                    {partner.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{partner.name}</h3>
                <p className="text-gray-600 mb-4">{partner.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{partner.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{partner.email}</span>
                  </div>
                </div>
                
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-kaot-green-600 hover:text-kaot-green-700 font-medium"
                >
                  웹사이트 방문
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Info */}
      <section className="py-16 bg-kaot-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">협력 관계</h2>
            <p className="text-lg text-gray-600">서울지부는 다양한 기관과 협력하여 더 나은 서비스를 제공합니다</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Building className="h-8 w-8 text-kaot-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">의료기관 협력</h3>
              <p className="text-gray-600">서울 지역 주요 병원들과 협력하여 최고 수준의 치료 서비스를 제공합니다.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Globe className="h-8 w-8 text-kaot-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">교육기관 협력</h3>
              <p className="text-gray-600">대학과 연구기관과 협력하여 전문성 향상과 연구 활동을 지원합니다.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Phone className="h-8 w-8 text-kaot-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">정부기관 협력</h3>
              <p className="text-gray-600">정부 및 지방자치단체와 협력하여 보건의료 정책에 기여합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-kaot-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">협력 문의</h2>
          <p className="text-xl text-kaot-green-100 mb-8">
            서울지부와의 협력에 관심이 있으신 기관은 언제든 연락주세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:02-1234-5678" className="bg-white text-kaot-green-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              전화 문의
            </a>
            <a href="mailto:seoul@kaot.or.kr" className="border-2 border-white text-white hover:bg-white hover:text-kaot-green-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              이메일 문의
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 