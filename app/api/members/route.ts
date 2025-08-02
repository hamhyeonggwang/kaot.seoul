import { NextRequest, NextResponse } from 'next/server'

// 실제로는 데이터베이스에서 관리해야 하지만, 여기서는 메모리 기반으로 구현
let membersData = [
  {
    id: 1,
    name: '김작업',
    email: 'kim@example.com',
    phone: '010-1234-5678',
    licenseNumber: 'OT-2024-001',
    joinDate: '2024-01-15',
    status: 'active',
    membershipType: '정회원',
    workplace: '서울대학교병원',
    specialty: '소아작업치료',
    lastLogin: '2025-01-20'
  },
  {
    id: 2,
    name: '이치료',
    email: 'lee@example.com',
    phone: '010-2345-6789',
    licenseNumber: 'OT-2024-002',
    joinDate: '2024-02-20',
    status: 'active',
    membershipType: '정회원',
    workplace: '삼성서울병원',
    specialty: '성인재활',
    lastLogin: '2025-01-19'
  },
  {
    id: 3,
    name: '박재활',
    email: 'park@example.com',
    phone: '010-3456-7890',
    licenseNumber: 'OT-2024-003',
    joinDate: '2024-03-10',
    status: 'inactive',
    membershipType: '준회원',
    workplace: '고려대학교병원',
    specialty: '정신건강',
    lastLogin: '2024-12-15'
  }
]

export async function GET() {
  return NextResponse.json({ success: true, data: membersData })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, licenseNumber, workplace, specialty } = body
    
    const newId = Math.max(...membersData.map(item => item.id)) + 1
    const newMember = {
      id: newId,
      name,
      email,
      phone,
      licenseNumber,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      membershipType: '준회원',
      workplace,
      specialty,
      lastLogin: new Date().toISOString().split('T')[0]
    }
    
    membersData.push(newMember)
    
    return NextResponse.json({ 
      success: true, 
      message: '회원이 성공적으로 추가되었습니다.',
      data: newMember
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: '회원 추가 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, email, phone, licenseNumber, status, membershipType, workplace, specialty } = body
    
    const index = membersData.findIndex(item => item.id === id)
    if (index === -1) {
      return NextResponse.json({ 
        success: false, 
        error: '해당 회원을 찾을 수 없습니다.' 
      }, { status: 404 })
    }
    
    const originalMember = membersData[index]
    membersData[index] = {
      ...originalMember,
      name,
      email,
      phone,
      licenseNumber,
      status,
      membershipType,
      workplace,
      specialty
    }
    
    return NextResponse.json({ 
      success: true, 
      message: '회원 정보가 성공적으로 수정되었습니다.',
      data: membersData[index]
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: '회원 정보 수정 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '0')
    
    const index = membersData.findIndex(item => item.id === id)
    if (index === -1) {
      return NextResponse.json({ 
        success: false, 
        error: '해당 회원을 찾을 수 없습니다.' 
      }, { status: 404 })
    }
    
    const deletedMember = membersData.splice(index, 1)[0]
    
    return NextResponse.json({ 
      success: true, 
      message: '회원이 성공적으로 삭제되었습니다.',
      data: deletedMember
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: '회원 삭제 중 오류가 발생했습니다.' 
    }, { status: 500 })
  }
} 