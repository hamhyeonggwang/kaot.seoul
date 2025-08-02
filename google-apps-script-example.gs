// Google Apps Script for KAOT Seoul Member Management
// 이 코드를 Google Apps Script 편집기에 복사하여 사용하세요

// 스프레드시트 ID (실제 스프레드시트 ID로 변경 필요)
const SPREADSHEET_ID = '16nIkXJOW8T-9LEX_xHc6BxJAo8pIjb45ZDFNYrzK6d4'
const SHEET_NAME = '회원명단'

// Google Drive 폴더 ID (실제 폴더 ID로 변경 필요)
const DRIVE_FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID'

function doGet(e) {
  // GET 요청 처리 (회원 목록 조회, 파일 목록 조회)
  const action = e && e.parameter ? e.parameter.action : null
  
  if (action === 'getMembers') {
    return getMembers()
  }
  
  if (action === 'getFiles') {
    return getFiles()
  }
  
  // 기본 응답 (테스트용)
  return ContentService.createTextOutput(JSON.stringify({ 
    message: 'KAOT Seoul Member Management API',
    status: 'running',
    action: action 
  })).setMimeType(ContentService.MimeType.JSON)
}

function doPost(e) {
  // POST 요청 처리 (회원 추가/수정/삭제, 파일 업로드)
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
      case 'uploadFile':
        return uploadFile(data.fileData, data.fileName)
      case 'deleteFile':
        return deleteFile(data.fileId)
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
    
    // 헤더 제거
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
    
    // 현재 시간 추가
    memberData['가입일'] = new Date().toISOString().split('T')[0]
    memberData['상태'] = '대기'
    
    // 헤더 가져오기
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    
    // 데이터 배열 생성
    const rowData = headers.map(header => memberData[header] || '')
    
    // 새 행 추가
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
    const rowIndex = data.findIndex((row, index) => index > 0 && row[0] == memberData.id)
    
    if (rowIndex === -1) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: '회원을 찾을 수 없습니다.'
      })).setMimeType(ContentService.MimeType.JSON)
    }
    
    // 데이터 업데이트
    const rowData = headers.map(header => memberData[header] || '')
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

function deleteMember(id) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME)
    const data = sheet.getDataRange().getValues()
    
    // ID로 행 찾기
    const rowIndex = data.findIndex((row, index) => index > 0 && row[0] == id)
    
    if (rowIndex === -1) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: '회원을 찾을 수 없습니다.'
      })).setMimeType(ContentService.MimeType.JSON)
    }
    
    // 행 삭제
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
}

// 스프레드시트 초기 설정 함수
function setupSpreadsheet() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME)
  
  // 헤더 설정
  const headers = [
    'ID',
    '이름',
    '자격번호',
    '이메일',
    '전화번호',
    '주소',
    '근무기관',
    '직책',
    '경력',
    '관심분야',
    '가입일',
    '상태',
    '메모'
  ]
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
  
  // 헤더 스타일 설정
  sheet.getRange(1, 1, 1, headers.length).setBackground('#4285f4').setFontColor('white').setFontWeight('bold')
  
  // 열 너비 자동 조정
  sheet.autoResizeColumns(1, headers.length)
}

// 백업 함수
function backupData() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME)
  const data = sheet.getDataRange().getValues()
  
  const backupSheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('백업_' + new Date().toISOString().split('T')[0])
  if (backupSheet) {
    backupSheet.clear()
  }
  
  const newBackupSheet = SpreadsheetApp.openById(SPREADSHEET_ID).insertSheet('백업_' + new Date().toISOString().split('T')[0])
  newBackupSheet.getRange(1, 1, data.length, data[0].length).setValues(data)
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: '데이터가 성공적으로 백업되었습니다.'
  })).setMimeType(ContentService.MimeType.JSON)
}

// 파일 업로드 함수
function uploadFile(fileData, fileName) {
  try {
    // Base64 디코딩
    const blob = Utilities.newBlob(Utilities.base64Decode(fileData), 'application/octet-stream', fileName)
    
    // Google Drive에 파일 업로드
    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID)
    const file = folder.createFile(blob)
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: '파일이 성공적으로 업로드되었습니다.',
      data: {
        id: file.getId(),
        name: file.getName(),
        size: file.getSize(),
        url: file.getUrl(),
        webContentLink: file.getDownloadUrl()
      }
    })).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON)
  }
}

// 파일 삭제 함수
function deleteFile(fileId) {
  try {
    const file = DriveApp.getFileById(fileId)
    file.setTrashed(true)
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: '파일이 성공적으로 삭제되었습니다.'
    })).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON)
  }
}

// 파일 목록 조회 함수
function getFiles() {
  try {
    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID)
    const files = folder.getFiles()
    const fileList = []
    
    while (files.hasNext()) {
      const file = files.next()
      fileList.push({
        id: file.getId(),
        name: file.getName(),
        size: file.getSize(),
        url: file.getUrl(),
        webContentLink: file.getDownloadUrl(),
        createdTime: file.getDateCreated().toISOString(),
        modifiedTime: file.getLastUpdated().toISOString()
      })
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      data: fileList
    })).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON)
  }
} 