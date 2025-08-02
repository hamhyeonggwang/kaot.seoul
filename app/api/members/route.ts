import { NextRequest, NextResponse } from 'next/server'

// Google Apps Script Web App URL (실제 배포 후 URL로 변경 필요)
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'

export async function GET(request: NextRequest) {
  try {
    // Google Apps Script에서 회원 데이터 가져오기
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL + '?action=getMembers')
    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Google Apps Script로 회원 데이터 전송
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'addMember',
        data: body
      })
    })
    
    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add member' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Google Apps Script로 회원 데이터 업데이트
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'updateMember',
        data: body
      })
    })
    
    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    // Google Apps Script로 회원 데이터 삭제
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'deleteMember',
        id: id
      })
    })
    
    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 })
  }
} 