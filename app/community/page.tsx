import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { MessageCircle, Users, Calendar, ThumbsUp, MessageSquare, Eye } from 'lucide-react'

export default function CommunityPage() {
  const forumCategories = [
    {
      id: 1,
      name: '교육정보',
      description: '교육 프로그램과 세미나 정보를 공유하는 공간',
      postCount: 0,
      lastPost: '-'
    },
    {
      id: 2,
      name: '취업정보',
      description: '채용 정보와 경력 개발에 대한 정보를 공유하는 공간',
      postCount: 0,
      lastPost: '-'
    },
    {
      id: 3,
      name: '회원소식',
      description: '회원들의 개인적인 소식과 근황을 공유하는 공간',
      postCount: 0,
      lastPost: '-'
    }
  ]

  const recentPosts = [
    {
      id: 1,
      title: '2024년 작업치료 관련 학회 일정',
      author: '박교육',
      category: '교육정보',
      date: '2024-01-13',
      views: 156,
      likes: 32,
      comments: 15
    },
    {
      id: 2,
      title: '서울 지역 병원 작업치료사 채용 정보',
      author: '정취업',
      category: '취업정보',
      date: '2024-01-11',
      views: 298,
      likes: 45,
      comments: 23
    },
    {
      id: 3,
      title: '회원 소식 공유',
      author: '김회원',
      category: '회원소식',
      date: '2024-01-10',
      views: 89,
      likes: 12,
      comments: 8
    }
  ]

  return (
    <main>
      <Navigation />
      
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">커뮤니티</h1>
          <p className="text-xl text-kaot-green-100">서울지부 회원들과 소통하고 정보를 공유하세요</p>
        </div>
      </section>

      {/* Forum Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">게시판</h2>
            <p className="text-lg text-gray-600">관심 있는 주제별로 토론하고 정보를 공유하세요</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forumCategories.map((category) => (
              <Link key={category.id} href={`/community/forum/${category.id}`}>
                <div className="card hover:shadow-xl transition-shadow duration-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>게시글 {category.postCount}개</span>
                    <span>최근 {category.lastPost}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-kaot-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">최근 게시글</h2>
            <p className="text-lg text-gray-600">최근에 올라온 인기 게시글을 확인하세요</p>
          </div>
          
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-kaot-green-100 text-kaot-green-700 text-xs font-medium px-2 py-1 rounded mr-3">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>작성자: {post.author}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {post.views}
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {post.likes}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {post.comments}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/community/forum" className="btn-primary">
              모든 게시글 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Join Community CTA */}
      <section className="py-16 bg-kaot-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">커뮤니티에 참여하세요</h2>
          <p className="text-xl text-kaot-green-100 mb-8">
            서울지부 회원이 되어 다양한 정보를 공유하고 소통하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join" className="bg-white text-kaot-green-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              회원가입
            </Link>
            <Link href="/community/forum" className="border-2 border-white text-white hover:bg-white hover:text-kaot-green-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              게시판 둘러보기
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 