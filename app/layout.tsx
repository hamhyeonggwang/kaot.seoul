import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '대한작업치료사협회 서울지부',
  description: '대한작업치료사협회 서울지부 공식 홈페이지입니다. 지부 활동 소식과 회원 커뮤니티를 제공합니다.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="bg-kaot-green-50 min-h-screen">
        {children}
      </body>
    </html>
  )
} 