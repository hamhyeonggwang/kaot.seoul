import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileUploadService, UploadedFile } from '@/app/utils/file-upload'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const uploadedBy = formData.get('uploadedBy') as string || 'anonymous'

    if (!file) {
      return NextResponse.json({
        success: false,
        error: '파일이 선택되지 않았습니다.'
      }, { status: 400 })
    }

    // 파일 타입 검증
    const typeValidation = fileUploadService.validateFileType(file)
    if (!typeValidation.valid) {
      return NextResponse.json({
        success: false,
        error: typeValidation.error
      }, { status: 400 })
    }

    // 파일 크기 검증
    const sizeValidation = fileUploadService.validateFileSize(file)
    if (!sizeValidation.valid) {
      return NextResponse.json({
        success: false,
        error: sizeValidation.error
      }, { status: 400 })
    }

    // 업로드 디렉토리 생성
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // 파일명 생성
    const originalName = file.name
    const fileName = fileUploadService.generateFileName(originalName)
    const filePath = path.join(uploadDir, fileName)

    // 파일 저장
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // 파일 정보 생성
    const fileInfo = fileUploadService.createFileInfo(
      originalName,
      fileName,
      file.size,
      file.type,
      typeValidation.category,
      uploadedBy
    )

    return NextResponse.json({
      success: true,
      message: '파일이 성공적으로 업로드되었습니다.',
      data: fileInfo
    })

  } catch (error) {
    console.error('파일 업로드 중 오류:', error)
    return NextResponse.json({
      success: false,
      error: '파일 업로드 중 오류가 발생했습니다.'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // 실제로는 데이터베이스에서 파일 목록을 가져와야 하지만,
    // 여기서는 메모리 기반으로 구현
    const uploadedFiles: UploadedFile[] = [
      {
        id: '1',
        originalName: 'sample-image.jpg',
        fileName: '1703123456789_abc123.jpg',
        fileSize: 1024000,
        mimeType: 'image/jpeg',
        url: '/uploads/1703123456789_abc123.jpg',
        uploadedAt: '2024-01-15T10:30:00Z',
        uploadedBy: 'admin',
        category: 'image'
      },
      {
        id: '2',
        originalName: 'document.pdf',
        fileName: '1703123456790_def456.pdf',
        fileSize: 2048000,
        mimeType: 'application/pdf',
        url: '/uploads/1703123456790_def456.pdf',
        uploadedAt: '2024-01-15T11:00:00Z',
        uploadedBy: 'user1',
        category: 'document'
      }
    ]

    let filteredFiles = uploadedFiles

    // 카테고리 필터링
    if (category) {
      filteredFiles = filteredFiles.filter(file => file.category === category)
    }

    // 페이지네이션
    const paginatedFiles = filteredFiles.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      data: {
        files: paginatedFiles,
        total: filteredFiles.length,
        limit,
        offset
      }
    })

  } catch (error) {
    console.error('파일 목록 조회 중 오류:', error)
    return NextResponse.json({
      success: false,
      error: '파일 목록 조회 중 오류가 발생했습니다.'
    }, { status: 500 })
  }
} 