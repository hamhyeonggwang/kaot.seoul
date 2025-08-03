import Link from 'next/link'
import { FileText, BookOpen, Download, Info } from 'lucide-react'

export default function InfoPage() {

  const quickLinks = [
    {
      title: '면허 관리',
      description: '작업치료사 면허신고 및 관리',
      icon: <FileText className="h-8 w-8" />,
      href: 'https://kaot.org/help/return.jsp#a',
      external: true
    },
    {
      title: '교육 프로그램',
      description: '정기 교육 프로그램 및 세미나 정보',
      icon: <BookOpen className="h-8 w-8" />,
      href: 'https://kaot.org/offline/offline_list.jsp',
      external: true
    },
    {
      title: '연구자료',
      description: '작업치료 관련 연구 논문 및 자료',
      icon: <Info className="h-8 w-8" />,
      href: 'https://kaot.org/board/index.jsp?code=treatise',
      external: true
    },
    {
      title: '정책자료',
      description: '작업치료 관련 정책 및 가이드라인',
      icon: <Download className="h-8 w-8" />,
      href: 'https://kaot.org/board/index.jsp?code=policy',
      external: true
    }
  ]

  return (
    <>
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">정보마당</h1>
          <p className="text-xl text-kaot-green-100">작업치료 관련 교육 자료와 정보를 한곳에서 확인하세요</p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">빠른 링크</h2>
            <p className="text-lg text-gray-600">자주 찾는 정보들을 빠르게 확인하세요</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              link.external ? (
                <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                  <div className="card text-center hover:shadow-xl transition-shadow duration-200">
                    <div className="bg-kaot-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-kaot-green-600">
                      {link.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{link.title}</h3>
                    <p className="text-gray-600">{link.description}</p>
                  </div>
                </a>
              ) : (
                <Link key={index} href={link.href}>
                  <div className="card text-center hover:shadow-xl transition-shadow duration-200">
                    <div className="bg-kaot-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-kaot-green-600">
                      {link.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{link.title}</h3>
                    <p className="text-gray-600">{link.description}</p>
                  </div>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>
    </>
  )
} 