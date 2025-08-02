export interface User {
  id: number
  email: string
  name: string
  phone: string
  licenseNumber: string
  workplace: string
  specialty: string
  membershipType: string
  joinDate: string
  emailVerified: boolean
  lastLogin: string
}

export const auth = {
  // 로그인 상태 확인
  isLoggedIn: (): boolean => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('isLoggedIn') === 'true'
  },

  // 사용자 정보 가져오기
  getUser: (): User | null => {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  // 로그인
  login: (userData: User): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('isLoggedIn', 'true')
  },

  // 로그아웃
  logout: (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
  },

  // 세션 만료 확인 (24시간)
  isSessionExpired: (): boolean => {
    if (typeof window === 'undefined') return true
    const user = auth.getUser()
    if (!user) return true
    
    const lastLogin = new Date(user.lastLogin)
    const now = new Date()
    const hoursDiff = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60)
    
    return hoursDiff > 24
  }
} 