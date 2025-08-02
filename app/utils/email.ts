import nodemailer from 'nodemailer'

// 이메일 인증 토큰 저장소 (실제로는 Redis나 DB 사용)
const emailVerificationTokens = new Map<string, { email: string; token: string; expires: Date }>()

export const emailUtils = {
  // 이메일 전송기 생성
  createTransporter: () => {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
      }
    })
  },

  // 인증 토큰 생성
  generateVerificationToken: (): string => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  },

  // 인증 토큰 저장
  saveVerificationToken: (email: string, token: string): void => {
    const expires = new Date()
    expires.setHours(expires.getHours() + 24) // 24시간 유효
    
    emailVerificationTokens.set(token, {
      email,
      token,
      expires
    })
  },

  // 인증 토큰 검증
  verifyToken: (token: string): { isValid: boolean; email?: string } => {
    const tokenData = emailVerificationTokens.get(token)
    
    if (!tokenData) {
      return { isValid: false }
    }
    
    if (new Date() > tokenData.expires) {
      emailVerificationTokens.delete(token)
      return { isValid: false }
    }
    
    return { isValid: true, email: tokenData.email }
  },

  // 인증 토큰 삭제
  removeToken: (token: string): void => {
    emailVerificationTokens.delete(token)
  },

  // 이메일 인증 메일 발송
  sendVerificationEmail: async (email: string, name: string, token: string): Promise<boolean> => {
    try {
      const transporter = emailUtils.createTransporter()
      
      const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/verify-email?token=${token}`
      
      const mailOptions = {
        from: process.env.EMAIL_USER || 'noreply@kaot.seoul',
        to: email,
        subject: '[대한작업치료사협회 서울지부] 이메일 인증',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">대한작업치료사협회 서울지부</h2>
            <p>안녕하세요, ${name}님!</p>
            <p>서울지부 회원가입을 완료하기 위해 이메일 인증을 진행해주세요.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                이메일 인증하기
              </a>
            </div>
            <p>위 버튼을 클릭하시면 이메일 인증이 완료됩니다.</p>
            <p>이 링크는 24시간 동안 유효합니다.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280;">
              이 이메일을 요청하지 않으셨다면 무시하셔도 됩니다.
            </p>
          </div>
        `
      }
      
      await transporter.sendMail(mailOptions)
      return true
    } catch (error) {
      console.error('이메일 발송 중 오류:', error)
      return false
    }
  },

  // 비밀번호 재설정 메일 발송
  sendPasswordResetEmail: async (email: string, name: string, token: string): Promise<boolean> => {
    try {
      const transporter = emailUtils.createTransporter()
      
      const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/reset-password?token=${token}`
      
      const mailOptions = {
        from: process.env.EMAIL_USER || 'noreply@kaot.seoul',
        to: email,
        subject: '[대한작업치료사협회 서울지부] 비밀번호 재설정',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">대한작업치료사협회 서울지부</h2>
            <p>안녕하세요, ${name}님!</p>
            <p>비밀번호 재설정을 요청하셨습니다.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                비밀번호 재설정하기
              </a>
            </div>
            <p>위 버튼을 클릭하시면 새로운 비밀번호를 설정할 수 있습니다.</p>
            <p>이 링크는 1시간 동안 유효합니다.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280;">
              비밀번호 재설정을 요청하지 않으셨다면 이 이메일을 무시하세요.
            </p>
          </div>
        `
      }
      
      await transporter.sendMail(mailOptions)
      return true
    } catch (error) {
      console.error('이메일 발송 중 오류:', error)
      return false
    }
  }
} 