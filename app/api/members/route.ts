import { NextRequest, NextResponse } from 'next/server'

// Google Apps Script Web App URL
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxi9jLaGa2ZgOJGpSCKCUYJWQq7ekrqvn-9koQPfXQtB78r_0O-rhvgFYyi80GkMGD-pQ/exec'

export async function GET() {
  try {
    const response = await fetch(`${GOOGLE_APPS_SCRIPT_URL}?action=getMembers`)
    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching members:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch members' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in member API:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update member' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Member ID is required' },
        { status: 400 }
      )
    }
    
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
    
    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error deleting member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete member' },
      { status: 500 }
    )
  }
} 