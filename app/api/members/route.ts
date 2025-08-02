import { NextRequest, NextResponse } from 'next/server'
import { googleAppsScriptService } from '@/app/utils/google-apps-script'

export async function GET(request: NextRequest) {
  try {
    // Google Apps Script에서 회원 목록 가져오기
    const result = await googleAppsScriptService.getMembers()
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.data || []
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error || '회원 데이터를 불러오는데 실패했습니다.'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('회원 목록 조회 중 오류:', error)
    return NextResponse.json({
      success: false,
      error: '회원 목록 조회 중 오류가 발생했습니다.'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Google Apps Script에 새 회원 추가
    const result = await googleAppsScriptService.addMember(body)
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message || '회원이 성공적으로 추가되었습니다.'
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error || '회원 추가 중 오류가 발생했습니다.'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('회원 추가 중 오류:', error)
    return NextResponse.json({
      success: false,
      error: '회원 추가 중 오류가 발생했습니다.'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Google Apps Script에서 회원 정보 수정
    const result = await googleAppsScriptService.updateMember(body)
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message || '회원 정보가 성공적으로 수정되었습니다.'
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error || '회원 정보 수정 중 오류가 발생했습니다.'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('회원 정보 수정 중 오류:', error)
    return NextResponse.json({
      success: false,
      error: '회원 정보 수정 중 오류가 발생했습니다.'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: '회원 ID가 필요합니다.'
      }, { status: 400 })
    }
    
    // Google Apps Script에서 회원 삭제
    const result = await googleAppsScriptService.deleteMember(id)
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message || '회원이 성공적으로 삭제되었습니다.'
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error || '회원 삭제 중 오류가 발생했습니다.'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('회원 삭제 중 오류:', error)
    return NextResponse.json({
      success: false,
      error: '회원 삭제 중 오류가 발생했습니다.'
    }, { status: 500 })
  }
} 