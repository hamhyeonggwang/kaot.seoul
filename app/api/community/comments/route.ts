import { NextRequest, NextResponse } from 'next/server'

// 실제로는 데이터베이스에서 관리해야 하지만, 여기서는 메모리 기반으로 구현
let commentsData = [
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
  },
  {
    id: 3,
    postId: 2,
    author: '김작업',
    authorId: 1,
    content: '참석하겠습니다!',
    createdAt: '2025-01-19T10:30:00Z'
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const postId = parseInt(searchParams.get('postId') || '0')
  
  const comments = commentsData.filter(comment => comment.postId === postId)
  
  return NextResponse.json({ 
    success: true, 
    data: comments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { postId, author, authorId, content } = body
    
    const newId = Math.max(...commentsData.map(item => item.id)) + 1
    const now = new Date().toISOString()
    
    const newComment = {
      id: newId,
      postId,
      author,
      authorId,
      content,
      createdAt: now
    }
    
    commentsData.push(newComment)
    
    return NextResponse.json({ 
      success: true, 
      message: '댓글이 성공적으로 작성되었습니다.',
      data: newComment
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: '댓글 작성 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, content } = body
    
    const index = commentsData.findIndex(item => item.id === id)
    if (index === -1) {
      return NextResponse.json({ 
        success: false, 
        error: '해당 댓글을 찾을 수 없습니다.' 
      }, { status: 404 })
    }
    
    commentsData[index] = {
      ...commentsData[index],
      content
    }
    
    return NextResponse.json({ 
      success: true, 
      message: '댓글이 성공적으로 수정되었습니다.',
      data: commentsData[index]
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: '댓글 수정 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '0')
    
    const index = commentsData.findIndex(item => item.id === id)
    if (index === -1) {
      return NextResponse.json({ 
        success: false, 
        error: '해당 댓글을 찾을 수 없습니다.' 
      }, { status: 404 })
    }
    
    const deletedComment = commentsData.splice(index, 1)[0]
    
    return NextResponse.json({ 
      success: true, 
      message: '댓글이 성공적으로 삭제되었습니다.',
      data: deletedComment
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: '댓글 삭제 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
} 