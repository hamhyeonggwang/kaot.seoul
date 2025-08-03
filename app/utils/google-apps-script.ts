// Google Apps Script 연동 유틸리티

interface GoogleAppsScriptResponse {
  success: boolean
  data?: any
  error?: string
  message?: string
}

interface MemberData {
  id?: number
  name: string
  email: string
  phone: string
  licenseNumber: string
  workplace: string
  specialty: string
  joinDate?: string
  status?: string
  membershipType?: string
  lastLogin?: string
}

class GoogleAppsScriptService {
  private baseUrl: string

  constructor() {
    // Google Apps Script URL (리다이렉트된 URL 사용)
    this.baseUrl = process.env.GOOGLE_APPS_SCRIPT_URL || 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLiNcpuZYUOw13j2In-BIEEnPqGwovD1S1wYbpbUW6dENv6t8W6prSwYsh-816Y2V4tpLI40r5WeMRF3r2Y6Yck6L1mEZL97v85LsZEV1TCu19hAfigLqPfFxtuEqZeP1oG6JX0sSar1FAfiCz1FPXIVEoxFEwpj9xq_0uqzq_N4bPxWTbZxM2YaAM5IaHKK_RD9N93JBhPLfuwZqifW_BgGO-Pmpey7eNwAZjTYhpk7dJubSgWMzYPHWHPEttH_XiwQ9Z5yfxxSJ75UQLmQbBSqZxzWVHOim0EXzU-C&lib=MS_ECmU0b9JFqbab9LLdiqXsWRa1bfi1s'
  }

  // 회원 목록 조회
  async getMembers(): Promise<GoogleAppsScriptResponse> {
    try {
      const response = await fetch(`${this.baseUrl}?action=getMembers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Google Apps Script getMembers 오류:', error)
      return {
        success: false,
        error: '회원 데이터를 불러오는 중 오류가 발생했습니다.'
      }
    }
  }

  // 새 회원 추가
  async addMember(memberData: MemberData): Promise<GoogleAppsScriptResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'addMember',
          data: memberData
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Google Apps Script addMember 오류:', error)
      return {
        success: false,
        error: '회원 추가 중 오류가 발생했습니다.'
      }
    }
  }

  // 회원 정보 수정
  async updateMember(memberData: MemberData): Promise<GoogleAppsScriptResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'updateMember',
          data: memberData
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Google Apps Script updateMember 오류:', error)
      return {
        success: false,
        error: '회원 정보 수정 중 오류가 발생했습니다.'
      }
    }
  }

  // 회원 삭제
  async deleteMember(id: number): Promise<GoogleAppsScriptResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'deleteMember',
          id: id
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Google Apps Script deleteMember 오류:', error)
      return {
        success: false,
        error: '회원 삭제 중 오류가 발생했습니다.'
      }
    }
  }

  // 연결 테스트
  async testConnection(): Promise<GoogleAppsScriptResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Google Apps Script 연결 테스트 오류:', error)
      return {
        success: false,
        error: 'Google Apps Script 연결에 실패했습니다.'
      }
    }
  }
}

// 싱글톤 인스턴스 생성
export const googleAppsScriptService = new GoogleAppsScriptService()

// 타입 내보내기
export type { GoogleAppsScriptResponse, MemberData } 