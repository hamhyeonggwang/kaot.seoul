'use client'

import { useState } from 'react'

import { ArrowLeft, Copy, Check, ExternalLink, Database, Settings, Code, Upload, TestTube } from 'lucide-react'
import Link from 'next/link'

export default function GoogleAppsScriptSetupPage() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null)

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(step)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  const setupSteps = [
    {
      id: 1,
      title: 'Google Sheets 생성',
      description: '회원 데이터를 저장할 Google Sheets를 생성합니다.',
      steps: [
        'Google Sheets에 접속하여 새 스프레드시트 생성',
        '스프레드시트 이름을 "KAOT 서울지부 회원명단"으로 변경',
        'URL에서 스프레드시트 ID 복사 (예: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms)'
      ],
      code: null
    },
    {
      id: 2,
      title: 'Google Apps Script 설정',
      description: 'Google Apps Script 프로젝트를 생성하고 코드를 설정합니다.',
      steps: [
        'Google Apps Script에 접속',
        '새 프로젝트 생성',
        '프로젝트 이름을 "KAOT Seoul Member Management"로 변경',
        '아래 코드를 복사하여 붙여넣기'
      ],
      code: `// Google Apps Script for KAOT Seoul Member Management
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'
const SHEET_NAME = '회원명단'

function doGet(e) {
  const action = e && e.parameter ? e.parameter.action : null
  
  if (action === 'getMembers') {
    return getMembers()
  }
  
  return ContentService.createTextOutput(JSON.stringify({ 
    message: 'KAOT Seoul Member Management API',
    status: 'running',
    action: action 
  })).setMimeType(ContentService.MimeType.JSON)
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const action = data.action
    
    switch (action) {
      case 'addMember':
        return addMember(data.data)
      case 'updateMember':
        return updateMember(data.data)
      case 'deleteMember':
        return deleteMember(data.id)
      default:
        return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid action' }))
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: 'Invalid request format: ' + error.toString() 
    })).setMimeType(ContentService.MimeType.JSON)
  }
}

function getMembers() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME)
    const data = sheet.getDataRange().getValues()
    
    const headers = data[0]
    const rows = data.slice(1)
    
    const members = rows.map((row, index) => {
      const member = {}
      headers.forEach((header, i) => {
        member[header] = row[i]
      })
      member.id = index + 1
      return member
    })
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      data: members
    })).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON)
  }
}

function addMember(memberData) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME)
    
    // 필드 매핑
    const mappedData = {
      'ID': '', // 자동 생성
      '이름': memberData.name || '',
      '이메일': memberData.email || '',
      '면허번호': memberData.licenseNumber || '',
      '근무기관': memberData.workplace || '',
      '관심분야': memberData.specialty || '',
      '회원유형': memberData.membershipType || '준회원',
      '가입일': new Date().toISOString().split('T')[0],
      '상태': '대기'
    }
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const rowData = headers.map(header => mappedData[header] || '')
    
    sheet.appendRow(rowData)
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: '회원이 성공적으로 추가되었습니다.'
    })).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON)
  }
}

function updateMember(memberData) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME)
    const data = sheet.getDataRange().getValues()
    const headers = data[0]
    
    // ID로 행 찾기
    const rowIndex = data.findIndex(row => row[0] == memberData.ID)
    if (rowIndex === -1) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: '회원을 찾을 수 없습니다.'
      })).setMimeType(ContentService.MimeType.JSON)
    }
    
    // 필드 매핑
    const mappedData = {
      'ID': memberData.ID || '',
      '이름': memberData.name || '',
      '이메일': memberData.email || '',
      '면허번호': memberData.licenseNumber || '',
      '근무기관': memberData.workplace || '',
      '관심분야': memberData.specialty || '',
      '회원유형': memberData.membershipType || '준회원',
      '가입일': memberData.joinDate || '',
      '상태': memberData.status || '대기'
    }
    
    const rowData = headers.map(header => mappedData[header] || '')
    sheet.getRange(rowIndex + 1, 1, 1, headers.length).setValues([rowData])
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: '회원 정보가 성공적으로 업데이트되었습니다.'
    })).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON)
  }
}

function deleteMember(memberId) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME)
    const data = sheet.getDataRange().getValues()
    
    const rowIndex = data.findIndex(row => row[0] == memberId)
    if (rowIndex === -1) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: '회원을 찾을 수 없습니다.'
      })).setMimeType(ContentService.MimeType.JSON)
    }
    
    sheet.deleteRow(rowIndex + 1)
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: '회원이 성공적으로 삭제되었습니다.'
    })).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON)
  }
}`
    },
    {
      id: 3,
      title: '스프레드시트 ID 설정',
      description: '코드에서 스프레드시트 ID를 실제 ID로 변경합니다.',
      steps: [
        '코드 상단의 SPREADSHEET_ID 변수를 실제 스프레드시트 ID로 변경',
        '저장 후 실행 권한 허용'
      ],
      code: `const SPREADSHEET_ID = 'YOUR_ACTUAL_SPREADSHEET_ID_HERE'`
    },
    {
      id: 4,
      title: 'Web App 배포',
      description: 'Google Apps Script를 Web App으로 배포합니다.',
      steps: [
        '"배포" → "새 배포" 클릭',
        '"유형 선택" → "웹 앱" 선택',
        '설정: 실행할 사용자 "나", 액세스 권한 "모든 사용자"',
        '"배포" 클릭',
        'Web App URL 복사'
      ],
      code: null
    },
    {
      id: 5,
      title: '환경 변수 설정',
      description: '웹사이트에 Google Apps Script URL을 설정합니다.',
      steps: [
        '.env.local 파일 생성 (프로젝트 루트에)',
        'GOOGLE_APPS_SCRIPT_URL 변수 추가',
        '값을 Web App URL로 설정'
      ],
      code: `GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
    },
    {
      id: 6,
      title: '연결 테스트',
      description: 'Google Apps Script 연결을 테스트합니다.',
      steps: [
        '관리자 대시보드에서 연결 상태 확인',
        '회원 추가/수정/삭제 테스트',
        'Google Sheets에서 데이터 확인'
      ],
      code: null
    }
  ]

  return (
    <>
      
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/admin/dashboard" className="inline-flex items-center text-kaot-green-100 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            대시보드로 돌아가기
          </Link>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-white bg-opacity-20">
              <Database className="h-8 w-8 text-white" />
            </div>
            <div className="ml-4">
              <h1 className="text-4xl font-bold text-white">Google Apps Script 설정</h1>
              <p className="text-xl text-kaot-green-100">실제 데이터베이스 연동을 위한 설정 가이드</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Settings className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-blue-900">설정 개요</h2>
          </div>
          <p className="text-blue-800">
            Google Apps Script를 사용하여 Google Sheets를 데이터베이스로 활용할 수 있습니다. 
            이 설정을 완료하면 회원 관리, 데이터 저장 등이 실제 데이터베이스에서 이루어집니다.
          </p>
        </div>

        {/* Setup Steps */}
        <div className="space-y-8">
          {setupSteps.map((step) => (
            <div key={step.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-kaot-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  {step.id}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-4">{step.description}</p>
              
              <div className="space-y-3 mb-4">
                {step.steps.map((subStep, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-kaot-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700">{subStep}</p>
                  </div>
                ))}
              </div>
              
              {step.code && (
                <div className="relative">
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                  <button
                    onClick={() => copyToClipboard(step.code!, step.id)}
                    className="absolute top-2 right-2 p-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    {copiedStep === step.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">추가 리소스</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://script.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-kaot-green-300 hover:bg-kaot-green-50 transition-colors"
            >
              <Code className="h-6 w-6 text-kaot-green-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Google Apps Script</p>
                <p className="text-sm text-gray-600">공식 개발자 콘솔</p>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
            </a>
            
            <a
              href="https://developers.google.com/apps-script"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-kaot-green-300 hover:bg-kaot-green-50 transition-colors"
            >
              <Upload className="h-6 w-6 text-kaot-green-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">개발자 문서</p>
                <p className="text-sm text-gray-600">Google Apps Script 가이드</p>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
            </a>
          </div>
        </div>

        {/* Test Connection */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <div className="flex items-center mb-4">
            <TestTube className="h-6 w-6 text-kaot-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">연결 테스트</h3>
          </div>
          <p className="text-gray-600 mb-4">
            설정이 완료되면 관리자 대시보드에서 Google Apps Script 연결 상태를 확인할 수 있습니다.
          </p>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center px-4 py-2 bg-kaot-green-600 text-white rounded-lg hover:bg-kaot-green-700 transition-colors"
          >
            대시보드에서 확인하기
          </Link>
        </div>
      </div>

    </>
  )
} 