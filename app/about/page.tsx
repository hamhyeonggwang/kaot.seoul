import { Users, UserCheck, Calendar, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">지부소개</h1>
          <p className="text-xl text-kaot-green-100">대한작업치료사협회 서울지부를 소개합니다</p>
        </div>
      </section>

      {/* 지회장 인사말 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">지회장 인사말</h2>
            <div className="w-24 h-1 bg-kaot-green-600 mx-auto"></div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-kaot-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-16 w-16 text-kaot-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">지석연 지회장</h3>
              <p className="text-lg text-gray-600">9대 서울지회 지회장</p>
            </div>
            
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-4">
                안녕하세요. 대한작업치료사협회 서울지부 9대 지회장 지석연입니다.
              </p>
              <p className="mb-4">
                서울지부는 수도권 지역의 작업치료사들이 함께 모여 전문성을 향상시키고, 
                작업치료의 발전을 위해 노력하는 조직입니다. 
                우리는 회원들의 전문성 개발과 업계 발전을 위해 다양한 교육 프로그램과 
                네트워킹 기회를 제공하고 있습니다.
              </p>
              <p className="mb-4">
                앞으로도 서울지부는 회원 여러분과 함께 작업치료의 미래를 만들어가며, 
                더 나은 의료 서비스를 제공할 수 있도록 최선을 다하겠습니다.
              </p>
              <p>
                많은 관심과 참여 부탁드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 조직도 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">조직도</h2>
            <div className="w-24 h-1 bg-kaot-green-600 mx-auto"></div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-block bg-kaot-green-600 text-white px-6 py-3 rounded-lg">
                <h3 className="text-xl font-bold">지회장</h3>
                <p className="text-sm">지석연</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="bg-kaot-green-100 p-4 rounded-lg">
                  <Users className="h-8 w-8 text-kaot-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">부지회장</h4>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-kaot-green-100 p-4 rounded-lg">
                  <Users className="h-8 w-8 text-kaot-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">총무</h4>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-kaot-green-100 p-4 rounded-lg">
                  <Users className="h-8 w-8 text-kaot-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">재무</h4>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-kaot-green-100 p-4 rounded-lg">
                  <Users className="h-8 w-8 text-kaot-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">교육</h4>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-kaot-green-100 p-4 rounded-lg">
                  <Users className="h-8 w-8 text-kaot-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">홍보</h4>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <div className="inline-block bg-kaot-green-100 p-4 rounded-lg">
                <Users className="h-8 w-8 text-kaot-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">협력</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 연혁 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">연혁</h2>
            <div className="w-24 h-1 bg-kaot-green-600 mx-auto"></div>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-kaot-green-600 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">2024년</h3>
                <p className="text-gray-600">9대 서울지회 시작</p>
                <p className="text-gray-600">지석연 지회장 취임</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-kaot-green-100 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-kaot-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">2023년</h3>
                <p className="text-gray-600">8대 서울지회 활동</p>
                <p className="text-gray-600">다양한 교육 프로그램 진행</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-kaot-green-100 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-kaot-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">2022년</h3>
                <p className="text-gray-600">7대 서울지회 활동</p>
                <p className="text-gray-600">회원 간 네트워킹 강화</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-kaot-green-100 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-kaot-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">2021년</h3>
                <p className="text-gray-600">6대 서울지회 활동</p>
                <p className="text-gray-600">작업치료 전문성 향상 프로그램 운영</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 