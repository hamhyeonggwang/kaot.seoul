import { NextRequest, NextResponse } from 'next/server'

// 실제로는 데이터베이스에서 관리해야 하지만, 여기서는 메모리 기반으로 구현
let postsData = [
  {
    id: 1,
    title: '소아 작업치료 기법 공유',
    content: '최근 소아 작업치료에서 효과적인 기법들을 공유하고 싶습니다. 특히 감각통합 기법과 놀이치료를 결합한 방법에 대해 토론해보면 좋을 것 같습니다.',
    author: '김작업',
    authorId: 1,
    category: '기술공유',
    createdAt: '2025-01-20T10:30:00Z',
    updatedAt: '2025-01-20T10:30:00Z',
    views: 45,
    likes: 12,
    comments: [
      {
        id: 1,
        postId: 1,
        author: '이치료',
        authorId: 2,
        content: '정말 유용한 정보네요! 저도 비슷한 경험이 있어서 공감합니다.',
        createdAt: '2025-01-20T11:15:00Z'
      },
      {
        id: 2,
        postId: 1,
        author: '박재활',
        authorId: 3,
        content: '감각통합 기법에 대해 더 자세히 설명해주실 수 있나요?',
        createdAt: '2025-01-20T14:20:00Z'
      }
    ]
  },
  {
    id: 2,
    title: '2025년 서울지부 정기모임 안내',
    content: '2025년 2월 15일 오후 2시에 서울지부 정기모임이 예정되어 있습니다. 장소는 서울대학교병원 강당이며, 많은 회원분들의 참여를 기다립니다.',
    author: '서울지부장',
    authorId: 0,
    category: '공지사항',
    createdAt: '2025-01-19T09:00:00Z',
    updatedAt: '2025-01-19T09:00:00Z',
    views: 89,
    likes: 23,
    comments: [
      {
        id: 3,
        postId: 2,
        author: '김작업',
        authorId: 1,
        content: '참석하겠습니다!',
        createdAt: '2025-01-19T10:30:00Z'
      }
    ]
  },
  {
    id: 3,
    title: '뇌졸중 환자 재활 치료 사례',
    content: '최근 치료한 뇌졸중 환자의 재활 과정과 성과를 공유합니다. 상지 기능 회복을 위한 작업치료 프로그램의 효과에 대해 논의해보고 싶습니다.',
    author: '이치료',
    authorId: 2,
    category: '사례공유',
    createdAt: '2025-01-18T16:45:00Z',
    updatedAt: '2025-01-18T16:45:00Z',
    views: 67,
    likes: 18,
    comments: []
  }
]

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    data: postsData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, author, authorId, category } = body
    
    const newId = Math.max(...postsData.map(item => item.id)) + 1
    const now = new Date().toISOString()
    
    const newPost = {
      id: newId,
      title,
      content,
      author,
      authorId,
      category,
      createdAt: now,
      updatedAt: now,
      views: 0,
      likes: 0,
      comments: []
    }
    
    postsData.push(newPost)
    
    return NextResponse.json({ 
      success: true, 
      message: '게시글이 성공적으로 작성되었습니다.',
      data: newPost
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: '게시글 작성 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, content, category } = body
    
    const index = postsData.findIndex(item => item.id === id)
    if (index === -1) {
      return NextResponse.json({ 
        success: false, 
        error: '해당 게시글을 찾을 수 없습니다.' 
      }, { status: 404 })
    }
    
    postsData[index] = {
      ...postsData[index],
      title,
      content,
      category,
      updatedAt: new Date().toISOString()
    }
    
    return NextResponse.json({ 
      success: true, 
      message: '게시글이 성공적으로 수정되었습니다.',
      data: postsData[index]
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: '게시글 수정 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '0')
    
    const index = postsData.findIndex(item => item.id === id)
    if (index === -1) {
      return NextResponse.json({ 
        success: false, 
        error: '해당 게시글을 찾을 수 없습니다.' 
      }, { status: 404 })
    }
    
    const deletedPost = postsData.splice(index, 1)[0]
    
    return NextResponse.json({ 
      success: true, 
      message: '게시글이 성공적으로 삭제되었습니다.',
      data: deletedPost
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: '게시글 삭제 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
} 