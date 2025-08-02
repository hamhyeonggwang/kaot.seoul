import bcrypt from 'bcryptjs'

export const passwordUtils = {
  // 비밀번호 해싱
  hashPassword: async (password: string): Promise<string> => {
    const saltRounds = 12
    return await bcrypt.hash(password, saltRounds)
  },

  // 비밀번호 검증
  verifyPassword: async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword)
  },

  // 비밀번호 강도 검증
  validatePasswordStrength: (password: string): { isValid: boolean; message: string } => {
    const minLength = 8
    const hasLetter = /[A-Za-z]/.test(password)
    const hasNumber = /\d/.test(password)
    
    if (password.length < minLength) {
      return { isValid: false, message: '비밀번호는 8자 이상이어야 합니다.' }
    }
    
    if (!hasLetter || !hasNumber) {
      return { isValid: false, message: '비밀번호는 영문과 숫자를 포함해야 합니다.' }
    }
    
    return { isValid: true, message: '유효한 비밀번호입니다.' }
  }
} 