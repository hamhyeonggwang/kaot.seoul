'use client'

import Link from 'next/link'
import { Instagram, Play, MessageCircle, ExternalLink, Users, Calendar, Heart, Star } from 'lucide-react'

export default function CommunityPage() {
  const socialPlatforms = [
    {
      id: 1,
      name: 'Instagram',
      description: '서울지부의 일상과 활동을 사진으로 확인하세요',
      icon: <Instagram className="h-8 w-8" />,
      url: 'https://www.instagram.com/kaot.seoul',
      color: 'bg-gradient-to-r from-pink-500 to-purple-600',
      features: ['일상 사진', '활동 소식', '회원 소통'],
      followers: '1,200+',
      posts: '500+'
    },
    {
      id: 2,
      name: 'YouTube',
      description: '작업치료 관련 교육 영상과 지부 활동 영상을 시청하세요',
      icon: <Play className="h-8 w-8" />,
      url: 'https://www.youtube.com/@kaotseoul',
      color: 'bg-gradient-to-r from-red-500 to-red-700',
      features: ['교육 영상', '세미나 하이라이트', '전문가 인터뷰'],
      followers: '2,500+',
      posts: '100+'
    },
    {
      id: 3,
      name: 'Band',
      description: '회원 전용 커뮤니티에서 실시간 소통과 정보 공유를 하세요',
      icon: <MessageCircle className="h-8 w-8" />,
      url: 'https://www.band.us/band/82793225/invite',
      color: 'bg-gradient-to-r from-green-500 to-green-700',
      features: ['실시간 채팅', '정보 공유', '회원 전용'],
      followers: '800+',
      posts: '1,000+'
    }
  ]

  const communityStats = [
    {
      icon: <Users className="h-6 w-6" />,
      label: '총 회원 수',
      value: '500+'
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      label: '월간 활동',
      value: '50+'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      label: '상호작용',
      value: '1,200+'
    },
    {
      icon: <Star className="h-6 w-6" />,
      label: '만족도',
      value: '98%'
    }
  ]

  return (
    <>
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">커뮤니티</h1>
          <p className="text-xl text-kaot-green-100">서울지부 회원들과 소통하고 정보를 공유하세요</p>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-kaot-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-kaot-green-600">
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Platforms */}
      <section className="py-16 bg-kaot-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">소셜 미디어 커뮤니티</h2>
            <p className="text-lg text-gray-600">다양한 플랫폼에서 서울지부 회원들과 소통하세요</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {socialPlatforms.map((platform) => (
              <div key={platform.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Platform Header */}
                <div className={`${platform.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-white bg-opacity-20 rounded-lg p-2 mr-3">
                        {platform.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{platform.name}</h3>
                        <p className="text-sm opacity-90">{platform.followers} 팔로워</p>
                      </div>
                    </div>
                    <ExternalLink className="h-5 w-5 opacity-80" />
                  </div>
                  <p className="text-sm opacity-90">{platform.description}</p>
                </div>
                
                {/* Platform Features */}
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">주요 기능</h4>
                    <ul className="space-y-1">
                      {platform.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-kaot-green-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>게시물 {platform.posts}</span>
                    <span>활성 커뮤니티</span>
                  </div>
                  
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-kaot-green-600 hover:bg-kaot-green-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    {platform.name} 바로가기
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">커뮤니티 가이드라인</h2>
            <p className="text-lg text-gray-600">건강한 소통을 위한 커뮤니티 규칙을 지켜주세요</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-kaot-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ 권장사항</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 서로를 존중하는 마음으로 소통하기</li>
                <li>• 전문적인 정보와 경험 공유하기</li>
                <li>• 건설적인 토론과 의견 교환하기</li>
                <li>• 지부 활동에 적극적으로 참여하기</li>
              </ul>
            </div>
            
            <div className="bg-red-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">❌ 금지사항</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 타인을 비방하거나 모욕하는 언행</li>
                <li>• 상업적 광고나 홍보성 게시물</li>
                <li>• 개인정보 유출 및 사생활 침해</li>
                <li>• 관련 없는 주제의 게시물</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-kaot-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">커뮤니티 관련 문의</h2>
          <p className="text-xl text-kaot-green-100 mb-8">
            커뮤니티 이용에 관한 문의사항이 있으시면 언제든 연락주세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:community@kaot.seoul" 
              className="bg-white text-kaot-green-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              이메일 문의
            </a>
            <Link 
              href="/info" 
              className="border-2 border-white text-white hover:bg-white hover:text-kaot-green-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              지부 안내
            </Link>
          </div>
        </div>
      </section>
    </>
  )
} 