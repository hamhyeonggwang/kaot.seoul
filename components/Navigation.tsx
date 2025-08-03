'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, Mail } from 'lucide-react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const menuItems = [
    { name: '홈', href: '/' },
    { name: '지부소식', href: '/news' },
    { name: '커뮤니티', href: '/community' },
    { name: '협력기관', href: '/partners' },
    { name: '정보마당', href: '/info' },
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-kaot-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">대한작업치료사협회</h1>
                <p className="text-sm text-kaot-green-600">서울지부</p>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-kaot-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Subscription Button & Mobile menu button */}
          <div className="flex items-center space-x-4">
            {/* Newsletter Subscription Button */}
            <div className="hidden md:block">
              <button
                onClick={() => {
                  // 뉴스레터 구독 모달 또는 페이지로 이동
                  router.push('/newsletter')
                }}
                className="flex items-center bg-kaot-green-600 text-white px-4 py-2 rounded-md hover:bg-kaot-green-700 transition-colors duration-200"
              >
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">뉴스레터 구독</span>
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-kaot-green-600 focus:outline-none focus:text-kaot-green-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-kaot-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Newsletter Subscription in Mobile Menu */}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <button
                onClick={() => {
                  router.push('/newsletter')
                  setIsMenuOpen(false)
                }}
                className="text-gray-700 hover:text-kaot-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left"
              >
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>뉴스레터 구독</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
} 