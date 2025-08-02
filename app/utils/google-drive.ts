// Google Drive 연동 유틸리티

export interface GoogleDriveFile {
  id: string
  name: string
  mimeType: string
  size: number
  webViewLink: string
  webContentLink: string
  createdTime: string
  modifiedTime: string
  parents: string[]
}

export interface GoogleDriveResponse {
  success: boolean
  data?: any
  error?: string
}

class GoogleDriveService {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.GOOGLE_DRIVE_API_URL || ''
  }

  // 파일 업로드
  async uploadFile(file: File, folderId?: string): Promise<GoogleDriveResponse> {
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (folderId) {
        formData.append('folderId', folderId)
      }

      const response = await fetch(`${this.baseUrl}/upload`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Google Drive 업로드 오류:', error)
      return {
        success: false,
        error: 'Google Drive 업로드 중 오류가 발생했습니다.'
      }
    }
  }

  // 파일 목록 조회
  async getFiles(folderId?: string): Promise<GoogleDriveResponse> {
    try {
      const params = new URLSearchParams()
      if (folderId) {
        params.append('folderId', folderId)
      }

      const response = await fetch(`${this.baseUrl}/files?${params.toString()}`, {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Google Drive 파일 목록 조회 오류:', error)
      return {
        success: false,
        error: 'Google Drive 파일 목록 조회 중 오류가 발생했습니다.'
      }
    }
  }

  // 파일 삭제
  async deleteFile(fileId: string): Promise<GoogleDriveResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/files/${fileId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Google Drive 파일 삭제 오류:', error)
      return {
        success: false,
        error: 'Google Drive 파일 삭제 중 오류가 발생했습니다.'
      }
    }
  }

  // 폴더 생성
  async createFolder(name: string, parentFolderId?: string): Promise<GoogleDriveResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/folders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          parentFolderId
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Google Drive 폴더 생성 오류:', error)
      return {
        success: false,
        error: 'Google Drive 폴더 생성 중 오류가 발생했습니다.'
      }
    }
  }

  // 연결 테스트
  async testConnection(): Promise<GoogleDriveResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/test`, {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Google Drive 연결 테스트 오류:', error)
      return {
        success: false,
        error: 'Google Drive 연결에 실패했습니다.'
      }
    }
  }
}

export const googleDriveService = new GoogleDriveService() 