import Link from 'next/link'
import { ArrowRight, Users, Calendar, MessageCircle, FolderOpen, FileText, Users2, Award, Star, CheckCircle } from 'lucide-react'

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

            {/* Benefits */}
            <div className="mb-8 space-y-3">
              <div className="flex items-center text-gray-700">
                <CheckCircle className="h-5 w-5 text-kaot-green-600 mr-3" />
                <span>정기적인 전문 교육 및 세미나</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle className="h-5 w-5 text-kaot-green-600 mr-3" />
                <span>전문가 네트워크 및 정보 공유</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle className="h-5 w-5 text-kaot-green-600 mr-3" />
                <span>최신 치료 기법 및 연구 동향</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/join" className="btn-primary inline-flex items-center bg-kaot-green-600 hover:bg-kaot-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                지금 바로 회원가입
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/news" className="btn-secondary inline-flex items-center border-2 border-kaot-green-600 text-kaot-green-600 hover:bg-kaot-green-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
                지부소식 보기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Band Community Link */}
            <div className="flex items-center">
              <a
                href="https://www.band.us/band/82793225/invite"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-kaot-green-600 hover:text-kaot-green-700 transition-colors duration-200"
              >
                <span className="mr-1">🎵</span>
                <span>Band 커뮤니티</span>
              </a>
            </div>
          </div>

          {/* Right Content - Interactive Folders */}
          <div className="relative">
            {/* Main Folder - News */}
            <Link href="/news" className="block">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 mb-6 transform rotate-3 hover:rotate-0 hover:shadow-3xl transition-all duration-300 cursor-pointer group">
                <div className="flex items-center mb-4">
                  <FolderOpen className="h-8 w-8 text-kaot-green-600 mr-3 group-hover:scale-110 transition-transform duration-200" />
                  <h3 className="text-xl font-semibold text-gray-900">지부소식</h3>
                </div>
                <p className="text-gray-600 mb-4">정기적인 지부 활동과 최신 소식을 확인하세요</p>
                <div className="flex items-center text-sm text-gray-500">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>최신 소식 확인</span>
                </div>
                <div className="absolute top-4 right-4 text-kaot-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>

            {/* Community Folder */}
            <Link href="/community" className="block">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 mb-6 transform -rotate-2 hover:rotate-0 hover:shadow-3xl transition-all duration-300 ml-8 cursor-pointer group">
                <div className="flex items-center mb-4">
                  <Users2 className="h-8 w-8 text-kaot-green-600 mr-3 group-hover:scale-110 transition-transform duration-200" />
                  <h3 className="text-xl font-semibold text-gray-900">커뮤니티</h3>
                </div>
                <p className="text-gray-600 mb-4">회원들과 소통하고 정보를 공유하는 공간</p>
                <div className="flex items-center text-sm text-gray-500">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span>회원 소통 공간</span>
                </div>
                <div className="absolute top-4 right-4 text-kaot-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>

            {/* Partners Folder */}
            <Link href="/partners" className="block">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 hover:shadow-3xl transition-all duration-300 ml-4 cursor-pointer group">
                <div className="flex items-center mb-4">
                  <Award className="h-8 w-8 text-kaot-green-600 mr-3 group-hover:scale-110 transition-transform duration-200" />
                  <h3 className="text-xl font-semibold text-gray-900">협력기관</h3>
                </div>
                <p className="text-gray-600 mb-4">다양한 협력기관과의 네트워크</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  <span>협력 기관 정보</span>
                </div>
                <div className="absolute top-4 right-4 text-kaot-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
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