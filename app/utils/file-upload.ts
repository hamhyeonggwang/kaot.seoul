// 파일 업로드 유틸리티

export interface UploadedFile {
  id: string
  originalName: string
  fileName: string
  fileSize: number
  mimeType: string
  url: string
  uploadedAt: string
  uploadedBy: string
  category: 'image' | 'document' | 'other'
}

export interface FileUploadResponse {
  success: boolean
  data?: UploadedFile
  error?: string
}

class FileUploadService {
  private uploadDir = 'public/uploads'
  private maxFileSize = 10 * 1024 * 1024 // 10MB
  private allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  private allowedDocumentTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain'
  ]

  // 파일 타입 검증
  validateFileType(file: File): { valid: boolean; category: 'image' | 'document' | 'other'; error?: string } {
    if (this.allowedImageTypes.includes(file.type)) {
      return { valid: true, category: 'image' }
    }
    
    if (this.allowedDocumentTypes.includes(file.type)) {
      return { valid: true, category: 'document' }
    }
    
    return { 
      valid: false, 
      category: 'other', 
      error: '지원하지 않는 파일 형식입니다.' 
    }
  }

  // 파일 크기 검증
  validateFileSize(file: File): { valid: boolean; error?: string } {
    if (file.size > this.maxFileSize) {
      return { 
        valid: false, 
        error: `파일 크기는 ${this.maxFileSize / (1024 * 1024)}MB 이하여야 합니다.` 
      }
    }
    return { valid: true }
  }

  // 파일명 생성 (중복 방지)
  generateFileName(originalName: string): string {
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = originalName.split('.').pop()
    return `${timestamp}_${randomString}.${extension}`
  }

  // 파일 URL 생성
  generateFileUrl(fileName: string): string {
    return `/uploads/${fileName}`
  }

  // 파일 정보 생성
  createFileInfo(
    originalName: string, 
    fileName: string, 
    fileSize: number, 
    mimeType: string, 
    category: 'image' | 'document' | 'other',
    uploadedBy: string
  ): UploadedFile {
    return {
      id: Date.now().toString(),
      originalName,
      fileName,
      fileSize,
      mimeType,
      url: this.generateFileUrl(fileName),
      uploadedAt: new Date().toISOString(),
      uploadedBy,
      category
    }
  }

  // 파일 확장자로 카테고리 추정
  getCategoryFromExtension(filename: string): 'image' | 'document' | 'other' {
    const extension = filename.toLowerCase().split('.').pop()
    
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
    const documentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt']
    
    if (imageExtensions.includes(extension || '')) {
      return 'image'
    }
    
    if (documentExtensions.includes(extension || '')) {
      return 'document'
    }
    
    return 'other'
  }
}

export const fileUploadService = new FileUploadService() 