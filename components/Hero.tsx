import Link from 'next/link'
import { ArrowRight, Users, Calendar, MessageCircle, FolderOpen, FileText, Users2, Award } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-kaot-green-50 to-kaot-green-100 py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-kaot-green-600">서울</span>에서 만나는
              <br />
              <span className="text-kaot-green-700">작업치료의 미래</span>
            </h1>
            
            {/* Slogan */}
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              "함께 성장하는 서울 작업치료사들의 따뜻한 공간"
            </p>
            
            {/* Description */}
            <p className="text-lg text-gray-600 mb-12 max-w-2xl">
              대한작업치료사협회 서울지부는 서울 지역 작업치료사들의 전문성 향상과 
              협력 네트워크 구축을 통해 더 나은 치료 서비스를 제공하기 위해 노력합니다.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/join" className="btn-primary inline-flex items-center">
                회원가입
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/news" className="btn-secondary inline-flex items-center">
                지부소식 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Content - Folder Icons */}
          <div className="relative">
            {/* Main Folder */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <FolderOpen className="h-8 w-8 text-kaot-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">지부소식</h3>
              </div>
              <p className="text-gray-600 mb-4">정기적인 지부 활동과 최신 소식을 확인하세요</p>
              <div className="flex items-center text-sm text-gray-500">
                <FileText className="h-4 w-4 mr-1" />
                <span>24개의 새로운 게시글</span>
              </div>
            </div>

            {/* Community Folder */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 mb-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300 ml-8">
              <div className="flex items-center mb-4">
                <Users2 className="h-8 w-8 text-kaot-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">커뮤니티</h3>
              </div>
              <p className="text-gray-600 mb-4">회원들과 소통하고 정보를 공유하는 공간</p>
              <div className="flex items-center text-sm text-gray-500">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span>1,200+ 활성 회원</span>
              </div>
            </div>

            {/* Partners Folder */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300 ml-4">
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-kaot-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">협력기관</h3>
              </div>
              <p className="text-gray-600 mb-4">다양한 협력기관과의 네트워크</p>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                <span>50+ 협력 기관</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="h-8 w-8 text-kaot-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
            <p className="text-gray-600">서울지부 회원</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Calendar className="h-8 w-8 text-kaot-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">24</h3>
            <p className="text-gray-600">연간 교육 프로그램</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MessageCircle className="h-8 w-8 text-kaot-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
            <p className="text-gray-600">협력 기관</p>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-kaot-green-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-kaot-green-300 rounded-full opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-kaot-green-100 rounded-full opacity-30"></div>
      
      {/* Floating Icons */}
      <div className="absolute top-20 right-20 opacity-10">
        <FolderOpen className="h-12 w-12 text-kaot-green-400" />
      </div>
      <div className="absolute bottom-40 left-20 opacity-10">
        <FileText className="h-10 w-10 text-kaot-green-400" />
      </div>
    </section>
  )
} 