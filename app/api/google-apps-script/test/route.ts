import { NextRequest, NextResponse } from 'next/server'
import { googleAppsScriptService } from '@/app/utils/google-apps-script'

export async function GET(request: NextRequest) {
  try {
    // Google Apps Script 연결 테스트
    const result = await googleAppsScriptService.testConnection()
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Google Apps Script 연결이 성공했습니다.',
        data: result.data
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Google Apps Script 연결에 실패했습니다.',
        error: result.error
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Google Apps Script 테스트 중 오류:', error)
    return NextResponse.json({
      success: false,
      message: 'Google Apps Script 테스트 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { status: 500 })
  }
} 