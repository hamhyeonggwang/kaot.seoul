import Link from 'next/link'
import { Mail, Phone, MapPin, ExternalLink, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-kaot-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div className="ml-3">
                <h3 className="text-xl font-bold">대한작업치료사협회</h3>
                <p className="text-sm text-gray-300">서울지부</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              서울 지역 작업치료사들의 전문성 향상과 협력 네트워크 구축을 통해 
              더 나은 치료 서비스를 제공하기 위해 노력합니다.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span>서울특별시 강남구 테헤란로 123</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                <span>02-1234-5678</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span>seoul@kaot.or.kr</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Instagram className="h-4 w-4 mr-2" />
                <a 
                  href="https://www.instagram.com/kaot.seoul" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-kaot-green-400 transition-colors"
                >
                  @kaot.seoul
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">바로가기</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/news" className="text-gray-300 hover:text-kaot-green-400 transition-colors">
                  지부소식
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-300 hover:text-kaot-green-400 transition-colors">
                  커뮤니티
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-300 hover:text-kaot-green-400 transition-colors">
                  협력기관
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-gray-300 hover:text-kaot-green-400 transition-colors">
                  회원가입
                </Link>
              </li>
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">협력기관</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.kaot.or.kr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-kaot-green-400 transition-colors flex items-center"
                >
                  대한작업치료사협회
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.mohw.go.kr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-kaot-green-400 transition-colors flex items-center"
                >
                  보건복지부
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.seoul.go.kr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-kaot-green-400 transition-colors flex items-center"
                >
                  서울특별시청
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 대한작업치료사협회 서울지부. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-kaot-green-400 text-sm transition-colors">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-kaot-green-400 text-sm transition-colors">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 