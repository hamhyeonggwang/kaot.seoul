import { NextRequest, NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fileId = params.id

    // 실제로는 데이터베이스에서 파일 정보를 가져와야 하지만,
    // 여기서는 메모리 기반으로 구현
    const uploadedFiles = [
      {
        id: '1',
        fileName: '1703123456789_abc123.jpg',
        originalName: 'sample-image.jpg'
      },
      {
        id: '2',
        fileName: '1703123456790_def456.pdf',
        originalName: 'document.pdf'
      }
    ]

    const file = uploadedFiles.find(f => f.id === fileId)
    if (!file) {
      return NextResponse.json({
        success: false,
        error: '파일을 찾을 수 없습니다.'
      }, { status: 404 })
    }

    // 실제 파일 삭제
    const filePath = path.join(process.cwd(), 'public', 'uploads', file.fileName)
    if (existsSync(filePath)) {
      await unlink(filePath)
    }

    return NextResponse.json({
      success: true,
      message: '파일이 성공적으로 삭제되었습니다.'
    })

  } catch (error) {
    console.error('파일 삭제 중 오류:', error)
    return NextResponse.json({
      success: false,
      error: '파일 삭제 중 오류가 발생했습니다.'
    }, { status: 500 })
  }
} 