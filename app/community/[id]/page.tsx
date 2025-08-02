'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, Eye, Heart, User, Calendar, Edit, Trash2, Send } from 'lucide-react'

interface Post {
  id: number
  title: string
  content: string
  author: string
  authorId: number
  category: string
  createdAt: string
  updatedAt: string
  views: number
  likes: number
  comments: Array<{
    id: number
    postId: number
    author: string
    authorId: number
    content: string
    createdAt: string
  }>
}

interface Comment {
  id: number
  postId: number
  author: string
  authorId: number
  content: string
  createdAt: string
}

export default function PostDetailPage() {
  const params = useParams()
  const router = useRouter()
  const postId = parseInt(params.id as string)
  
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [postId])

  const fetchPost = async () => {
    try {
      const response = await fetch('/api/community')
      const result = await response.json()
      if (result.success) {
        const foundPost = result.data.find((p: Post) => p.id === postId)
        if (foundPost) {
          setPost(foundPost)
          // 조회수 증가
          await fetch(`/api/community/${postId}/view`, { method: 'POST' })
        } else {
          alert('게시글을 찾을 수 없습니다.')
          router.push('/community')
        }
      }
    } catch (error) {
      console.error('게시글 로드 중 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/community/comments?postId=${postId}`)
      const result = await response.json()
      if (result.success) {
        setComments(result.data)
      }
    } catch (error) {
      console.error('댓글 로드 중 오류:', error)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newComment.trim()) {
      alert('댓글 내용을 입력해주세요.')
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch('/api/community/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          content: newComment.trim(),
          author: '김작업', // 실제로는 로그인된 사용자 정보 사용
          authorId: 1 // 실제로는 로그인된 사용자 ID 사용
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setNewComment('')
        await fetchComments() // 댓글 목록 새로고침
      } else {
        alert('댓글 작성 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('댓글 작성 중 오류:', error)
      alert('댓글 작성 중 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '공지사항':
        return 'bg-red-100 text-red-700'
      case '기술공유':
        return 'bg-blue-100 text-blue-700'
      case '사례공유':
        return 'bg-green-100 text-green-700'
      case '질문답변':
        return 'bg-yellow-100 text-yellow-700'
      case '일반토론':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  if (loading) {
    return (
      <main>
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-500">게시글을 불러오는 중...</div>
        </div>
      </main>
    )
  }

  if (!post) {
    return (
      <main>
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-500">게시글을 찾을 수 없습니다.</div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/community"
            className="inline-flex items-center text-kaot-green-600 hover:text-kaot-green-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            목록으로 돌아가기
          </Link>
        </div>

        {/* Post Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {/* Post Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(post.category)}`}>
                {post.category}
              </span>
              <span className="text-sm text-gray-500">
                {formatDate(post.createdAt)}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>{post.views}</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-1" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span>{comments.length}</span>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {post.content}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">댓글 ({comments.length}개)</h3>

          {/* Comment Form */}
          <div className="mb-8">
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">댓글 작성</label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                  placeholder="댓글을 입력하세요"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-kaot-green-600 text-white rounded-lg hover:bg-kaot-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {submitting ? '작성 중...' : '댓글 작성'}
                </button>
              </div>
            </form>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-kaot-green-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-kaot-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">{comment.author}</span>
                      <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}

            {comments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
} 