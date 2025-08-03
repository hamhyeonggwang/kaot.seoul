import { promises as fs } from 'fs'
import path from 'path'

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

// 데이터 파일 경로
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'users.json')

// 초기 사용자 데이터
const initialUsersData: User[] = [
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

// 데이터 파일 읽기
async function loadUsersData(): Promise<User[]> {
  try {
    // data 디렉토리가 없으면 생성
    const dataDir = path.dirname(DATA_FILE_PATH)
    await fs.mkdir(dataDir, { recursive: true })
    
    // 파일이 존재하면 읽기
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    // 파일이 없거나 읽기 실패 시 초기 데이터 반환
    console.log('사용자 데이터 파일을 찾을 수 없습니다. 초기 데이터를 사용합니다.')
    return initialUsersData
  }
}

// 데이터 파일 저장
async function saveUsersData(users: User[]): Promise<void> {
  try {
    const dataDir = path.dirname(DATA_FILE_PATH)
    await fs.mkdir(dataDir, { recursive: true })
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('사용자 데이터 저장 중 오류:', error)
  }
}

// 사용자 데이터 관리 함수들
export const authDataUtils = {
  // 사용자 추가
  addUser: async (user: Omit<User, 'id'>) => {
    const users = await loadUsersData()
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
    const newUser = { ...user, id: newId }
    users.push(newUser)
    await saveUsersData(users)
    return newUser
  },

  // 사용자 찾기 (이메일로)
  findUserByEmail: async (email: string) => {
    const users = await loadUsersData()
    return users.find(user => user.email === email)
  },

  // 사용자 찾기 (ID로)
  findUserById: async (id: number) => {
    const users = await loadUsersData()
    return users.find(user => user.id === id)
  },

  // 사용자 업데이트
  updateUser: async (id: number, updates: Partial<User>) => {
    const users = await loadUsersData()
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates }
      await saveUsersData(users)
      return users[userIndex]
    }
    return null
  },

  // 사용자 삭제
  deleteUser: async (id: number) => {
    const users = await loadUsersData()
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex !== -1) {
      users.splice(userIndex, 1)
      await saveUsersData(users)
      return true
    }
    return false
  },

  // 모든 사용자 가져오기
  getAllUsers: async () => {
    return await loadUsersData()
  }
} 