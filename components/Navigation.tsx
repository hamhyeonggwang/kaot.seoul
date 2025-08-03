'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, Instagram, Play, LogIn, User, Settings, LogOut } from 'lucide-react'
import { auth } from '@/app/utils/auth'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // 클라이언트 사이드에서 로그인 상태 확인
    const checkAuthStatus = () => {
      const loggedIn = auth.isLoggedIn()
      const currentUser = auth.getUser()
      
      setIsLoggedIn(loggedIn)
      setUser(currentUser)
    }

    checkAuthStatus()
    
    // 로그인 상태 변경 감지를 위한 이벤트 리스너
    window.addEventListener('storage', checkAuthStatus)
    return () => window.removeEventListener('storage', checkAuthStatus)
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      auth.logout()
      setIsLoggedIn(false)
      setUser(null)
      setIsUserMenuOpen(false)
      router.push('/')
    } catch (error) {
      console.error('로그아웃 중 오류:', error)
    }
  }

  const menuItems = [
    { name: '홈', href: '/' },
    { name: '지부소식', href: '/news' },
    { name: '커뮤니티', href: '/community' },
    { name: '협력기관', href: '/partners' },
    { name: '정보마당', href: '/info' },
    ...(isLoggedIn ? [] : [{ name: '회원가입', href: '/join' }]),
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

          {/* Social Links & Login & Mobile menu button */}
          <div className="flex items-center space-x-4">
            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="https://www.youtube.com/@kaot-ot-ati"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-kaot-green-600 transition-colors duration-200"
              >
                <Play className="h-5 w-5" />
                <span className="ml-1 text-sm font-medium">YouTube</span>
              </a>
              <a
                href="https://www.instagram.com/kaot.seoul"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-kaot-green-600 transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
                <span className="ml-1 text-sm font-medium">@kaot.seoul</span>
              </a>
              <a
                href="https://www.band.us/band/82793225/invite"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-kaot-green-600 transition-colors duration-200"
              >
                <span className="text-lg mr-1">🎵</span>
                <span className="ml-1 text-sm font-medium">Band</span>
              </a>
            </div>

            {/* Login/User Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {isLoggedIn ? (
                <>
                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(!isUserMenuOpen)
                      }}
                      className="flex items-center text-gray-700 hover:text-kaot-green-600 transition-colors duration-200"
                    >
                      <User className="h-5 w-5" />
                      <span className="ml-1 text-sm font-medium">{user?.name || '회원'}</span>
                    </button>
                    
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-200">
                          {user?.email}
                        </div>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center">
                            <LogOut className="h-4 w-4 mr-2" />
                            로그아웃
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Member Login */}
                  <Link
                    href="/login"
                    className="flex items-center text-gray-700 hover:text-kaot-green-600 transition-colors duration-200"
                  >
                    <User className="h-5 w-5" />
                    <span className="ml-1 text-sm font-medium">로그인</span>
                  </Link>
                  
                  {/* Member Registration */}
                  <Link
                    href="/join"
                    className="flex items-center bg-kaot-green-600 text-white px-3 py-2 rounded-md hover:bg-kaot-green-700 transition-colors duration-200"
                  >
                    <LogIn className="h-5 w-5" />
                    <span className="ml-1 text-sm font-medium">회원가입</span>
                  </Link>
                </>
              )}


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
            {/* Social Links in Mobile Menu */}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <a
                href="https://www.youtube.com/@kaot-ot-ati"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-kaot-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  <span>YouTube</span>
                </div>
              </a>
              <a
                href="https://www.instagram.com/kaot.seoul"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-kaot-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Instagram className="h-5 w-5 mr-2" />
                  <span>@kaot.seoul</span>
                </div>
              </a>
              <a
                href="https://www.band.us/band/82793225/invite"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-kaot-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-2">🎵</span>
                  <span>Band</span>
                </div>
              </a>
              
              {/* Login/User in Mobile Menu */}
              {isLoggedIn ? (
                <>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="px-3 py-2 text-xs text-gray-500">
                      {user?.email}
                    </div>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="text-gray-700 hover:text-kaot-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left"
                    >
                      <div className="flex items-center">
                        <LogOut className="h-5 w-5 mr-2" />
                        <span>로그아웃</span>
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-kaot-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      <span>로그인</span>
                    </div>
                  </Link>
                  <Link
                    href="/join"
                    className="text-gray-700 hover:text-kaot-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <LogIn className="h-5 w-5 mr-2" />
                      <span>회원가입</span>
                    </div>
                  </Link>
                </>
              )}
              

            </div>
          </div>
        </div>
      )}
    </nav>
  )
} 