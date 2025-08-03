// 공통 사용자 데이터 관리
export interface User {
  id: number
  email: string
  password: string
  name: string
  phone: string
  licenseNumber: string
  workplace: string
  specialty: string
  membershipType: string
  joinDate: string
  status: 'active' | 'inactive'
  emailVerified: boolean
  createdAt: string
  lastLogin?: string
  role?: 'member' | 'admin'
}

// 초기 사용자 데이터
export let usersData: User[] = [
  {
    id: 1,
    email: 'kim@example.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/5QqKqKq', // hashed_password123
    name: '김작업',
    phone: '010-1234-5678',
    licenseNumber: 'OT-2024-001',
    workplace: '서울대학교병원',
    specialty: '소아작업치료',
    membershipType: '정회원',
    joinDate: '2024-01-15',
    status: 'active',
    emailVerified: true,
    createdAt: '2024-01-15T10:00:00Z',
    lastLogin: '2025-01-20T10:30:00Z',
    role: 'member'
  },
  {
    id: 2,
    email: 'lee@example.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/5QqKqKq', // hashed_password456
    name: '이치료',
    phone: '010-2345-6789',
    licenseNumber: 'OT-2024-002',
    workplace: '삼성서울병원',
    specialty: '성인재활',
    membershipType: '정회원',
    joinDate: '2024-02-20',
    status: 'active',
    emailVerified: true,
    createdAt: '2024-02-20T14:30:00Z',
    lastLogin: '2025-01-19T16:45:00Z',
    role: 'member'
  },
  {
    id: 3,
    email: 'admin@kaot-seoul.or.kr',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/5QqKqKq', // hashed_admin123
    name: '관리자',
    phone: '010-0000-0000',
    licenseNumber: 'OT-ADMIN-001',
    workplace: '대한작업치료사협회 서울지부',
    specialty: '관리',
    membershipType: '관리자',
    joinDate: '2024-01-01',
    status: 'active',
    emailVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2025-01-20T10:30:00Z',
    role: 'admin'
  }
]

// 사용자 데이터 관리 함수들
export const authDataUtils = {
  // 사용자 추가
  addUser: (user: Omit<User, 'id'>) => {
    const newId = Math.max(...usersData.map(u => u.id)) + 1
    const newUser = { ...user, id: newId }
    usersData.push(newUser)
    return newUser
  },

  // 사용자 찾기 (이메일로)
  findUserByEmail: (email: string) => {
    return usersData.find(user => user.email === email)
  },

  // 사용자 찾기 (ID로)
  findUserById: (id: number) => {
    return usersData.find(user => user.id === id)
  },

  // 사용자 업데이트
  updateUser: (id: number, updates: Partial<User>) => {
    const userIndex = usersData.findIndex(user => user.id === id)
    if (userIndex !== -1) {
      usersData[userIndex] = { ...usersData[userIndex], ...updates }
      return usersData[userIndex]
    }
    return null
  },

  // 사용자 삭제
  deleteUser: (id: number) => {
    const userIndex = usersData.findIndex(user => user.id === id)
    if (userIndex !== -1) {
      usersData.splice(userIndex, 1)
      return true
    }
    return false
  },

  // 모든 사용자 가져오기
  getAllUsers: () => {
    return usersData
  }
} 