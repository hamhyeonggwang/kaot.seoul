import { NextRequest, NextResponse } from 'next/server'
import { googleAppsScriptService } from '@/app/utils/google-apps-script'
import { authDataUtils } from '@/app/utils/auth-data'

export async function GET(request: NextRequest) {
  try {
    // 로컬 파일에서 회원 데이터 가져오기
    const localMembers = await authDataUtils.getAllUsers()
    
    // Google Apps Script에서도 데이터 가져오기 (선택사항)
    let googleMembers = []
    try {
      const googleResult = await googleAppsScriptService.getMembers()
      if (googleResult.success) {
        googleMembers = googleResult.data || []
      }
    } catch (error) {
      console.log('Google Apps Script 데이터 가져오기 실패, 로컬 데이터만 사용')
    }
    
    // 로컬 데이터를 우선으로 사용하고, Google 데이터와 병합
    const combinedMembers = localMembers.map(localMember => {
      const googleMember = googleMembers.find((gm: any) => gm.email === localMember.email)
      return {
        ...localMember,
        // Google Sheets의 추가 정보가 있으면 병합
        ...(googleMember && {
          status: googleMember.status || localMember.status,
          // 기타 Google Sheets의 필드들
        })
      }
    })
    
    return NextResponse.json({
      success: true,
      data: combinedMembers,
      source: 'local_and_google'
    })
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
    
    // 로컬 파일에 새 회원 추가
    const newMember = await authDataUtils.addUser({
      email: body.email,
      password: body.password || 'temp_password', // 임시 비밀번호
      name: body.name,
      phone: body.phone,
      licenseNumber: body.licenseNumber,
      workplace: body.workplace || '',
      specialty: body.specialty || '',
      membershipType: body.membershipType || '준회원',
      joinDate: body.joinDate || new Date().toISOString().split('T')[0],
      status: 'active',
      emailVerified: true,
      createdAt: new Date().toISOString()
    })
    
    // Google Apps Script에도 추가 (선택사항)
    try {
      await googleAppsScriptService.addMember({
        name: body.name,
        email: body.email,
        licenseNumber: body.licenseNumber,
        workplace: body.workplace || '',
        specialty: body.specialty || '',
        membershipType: body.membershipType || '준회원',
        joinDate: body.joinDate || new Date().toISOString().split('T')[0],
        status: '대기'
      })
    } catch (error) {
      console.log('Google Apps Script 추가 실패, 로컬에만 저장됨')
    }
    
    return NextResponse.json({
      success: true,
      message: '회원이 성공적으로 추가되었습니다.',
      data: newMember
    })
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
    
    // 로컬 파일에서 회원 정보 수정
    const updatedMember = await authDataUtils.updateUser(body.id, {
      name: body.name,
      email: body.email,
      phone: body.phone,
      licenseNumber: body.licenseNumber,
      workplace: body.workplace,
      specialty: body.specialty,
      membershipType: body.membershipType,
      status: body.status
    })
    
    if (!updatedMember) {
      return NextResponse.json({
        success: false,
        error: '회원을 찾을 수 없습니다.'
      }, { status: 404 })
    }
    
    // Google Apps Script에도 수정 (선택사항)
    try {
      await googleAppsScriptService.updateMember({
        id: body.id,
        name: body.name,
        email: body.email,
        licenseNumber: body.licenseNumber,
        workplace: body.workplace,
        specialty: body.specialty,
        membershipType: body.membershipType,
        status: body.status
      })
    } catch (error) {
      console.log('Google Apps Script 수정 실패, 로컬에만 수정됨')
    }
    
    return NextResponse.json({
      success: true,
      message: '회원 정보가 성공적으로 수정되었습니다.',
      data: updatedMember
    })
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
    
    // 로컬 파일에서 회원 삭제
    const deleted = await authDataUtils.deleteUser(id)
    
    if (!deleted) {
      return NextResponse.json({
        success: false,
        error: '회원을 찾을 수 없습니다.'
      }, { status: 404 })
    }
    
    // Google Apps Script에서도 삭제 (선택사항)
    try {
      await googleAppsScriptService.deleteMember(id)
    } catch (error) {
      console.log('Google Apps Script 삭제 실패, 로컬에서만 삭제됨')
    }
    
    return NextResponse.json({
      success: true,
      message: '회원이 성공적으로 삭제되었습니다.'
    })
  } catch (error) {
    console.error('회원 삭제 중 오류:', error)
    return NextResponse.json({
      success: false,
      error: '회원 삭제 중 오류가 발생했습니다.'
    }, { status: 500 })
  }
} 