import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { User, Mail, Phone, MapPin, Calendar, Award, Heart, BookOpen, Users2, Newspaper } from 'lucide-react'

export default function JoinPage() {
  const benefits = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: '정기 교육 프로그램',
      description: '연중 다양한 주제의 전문 교육 프로그램에 무료 또는 할인된 가격으로 참여할 수 있습니다.'
    },
    {
      icon: <Users2 className="h-8 w-8" />,
      title: '전문가 네트워킹',
      description: '서울 지역 작업치료사들과의 소통과 협력 기회를 통해 전문성을 향상시킬 수 있습니다.'
    },
    {
      icon: <User className="h-8 w-8" />,
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
      description: '전문성 향상을 위한 자격 인증 과정을 할인된 가격으로 수강할 수 있습니다.'
    }
  ]

  return (
    <main>
      <Navigation />
      
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">회원가입</h1>
          <p className="text-xl text-kaot-green-100">서울지부와 함께 작업치료의 미래를 만들어가세요</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">회원 혜택</h2>
            <p className="text-lg text-gray-600">서울지부 회원이 되시면 다양한 혜택을 받으실 수 있습니다</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="card text-center">
                <div className="bg-kaot-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-kaot-green-600">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Form */}
      <section className="py-16 bg-kaot-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">회원가입 신청</h2>
              <p className="text-lg text-gray-600">아래 양식을 작성하여 회원가입을 신청해주세요</p>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
                    placeholder="홍길동"
                  />
                </div>
                
                <div>
                  <label htmlFor="license" className="block text-sm font-medium text-gray-700 mb-2">
                    작업치료사 자격번호 *
                  </label>
                  <input
                    type="text"
                    id="license"
                    name="license"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
                    placeholder="12345678"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    전화번호 *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  주소 *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
                  placeholder="서울특별시 강남구 테헤란로 123"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="workplace" className="block text-sm font-medium text-gray-700 mb-2">
                    근무기관
                  </label>
                  <input
                    type="text"
                    id="workplace"
                    name="workplace"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
                    placeholder="서울대학교병원"
                  />
                </div>
                
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                    직책
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
                    placeholder="작업치료사"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  경력 (년)
                </label>
                <select
                  id="experience"
                  name="experience"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
                >
                  <option value="">선택해주세요</option>
                  <option value="0-1">1년 미만</option>
                  <option value="1-3">1-3년</option>
                  <option value="3-5">3-5년</option>
                  <option value="5-10">5-10년</option>
                  <option value="10+">10년 이상</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
                  관심 분야 (복수 선택 가능)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['소아작업치료', '성인작업치료', '정신건강작업치료', '노인작업치료', '재활작업치료', '학교작업치료', '연구', '교육'].map((interest) => (
                    <label key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        name="interests"
                        value={interest}
                        className="mr-2 text-kaot-green-600 focus:ring-kaot-green-500"
                      />
                      <span className="text-sm text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  추가 문의사항
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-transparent"
                  placeholder="추가로 문의하고 싶은 사항이 있으시면 작성해주세요."
                />
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  required
                  className="mt-1 mr-2 text-kaot-green-600 focus:ring-kaot-green-500"
                />
                <label htmlFor="agree" className="text-sm text-gray-700">
                  개인정보 수집 및 이용에 동의합니다. 
                  <a href="/privacy" className="text-kaot-green-600 hover:text-kaot-green-700 ml-1">
                    개인정보처리방침 보기
                  </a>
                </label>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="btn-primary px-8 py-3 text-lg"
                >
                  회원가입 신청
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">문의사항</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 text-kaot-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">전화 문의</h3>
              <p className="text-gray-600">02-1234-5678</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 text-kaot-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">이메일 문의</h3>
              <p className="text-gray-600">seoul@kaot.or.kr</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 text-kaot-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">주소</h3>
              <p className="text-gray-600">서울특별시 강남구<br />테헤란로 123</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 