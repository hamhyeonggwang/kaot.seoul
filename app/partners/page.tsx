import Link from 'next/link'
import { ExternalLink, Building, Globe, Phone, Mail } from 'lucide-react'

export default function PartnersPage() {
  const partners = [
    {
      id: 1,
      name: '대한작업치료사협회',
      description: '전국 작업치료사들의 대표 조직',
      website: 'http://kaot.org',
      phone: '02-3672-0616',
      email: 'kaotoffice@kaot.org',
      category: '전국협회',
      logo: 'KAOT'
    }
  ]

  const categories = ['전체', '전국협회']

  return (
    <>
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">협력기관</h1>
          <p className="text-xl text-kaot-green-100">서울지부와 협력하는 기관을 소개합니다</p>
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
            <p className="text-lg text-gray-600">서울지부는 대한작업치료사협회와 협력하여 더 나은 서비스를 제공합니다</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Building className="h-8 w-8 text-kaot-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">전국협회 협력</h3>
              <p className="text-gray-600">대한작업치료사협회와 협력하여 전국 작업치료사들의 권익 보호와 전문성 향상을 지원합니다.</p>
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
    </>
  )
} 