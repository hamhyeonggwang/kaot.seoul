# Google Apps Script 설정 가이드

대한작업치료사협회 서울지부 홈페이지의 Google Apps Script 연동을 위한 상세 설정 가이드입니다.

## 📋 목차

1. [Google Sheets 설정](#1-google-sheets-설정)
2. [Google Apps Script 설정](#2-google-apps-script-설정)
3. [Web App 배포](#3-web-app-배포)
4. [환경 변수 설정](#4-환경-변수-설정)
5. [연결 테스트](#5-연결-테스트)
6. [문제 해결](#6-문제-해결)

## 1. Google Sheets 설정

### 1.1 스프레드시트 생성
1. [Google Sheets](https://sheets.google.com)에 접속
2. 새 스프레드시트 생성
3. 스프레드시트 이름을 "KAOT 서울지부 회원명단"으로 변경

### 1.2 스프레드시트 ID 확인
1. 스프레드시트 URL에서 ID 복사
   - URL 형식: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - 예시: `https://docs.google.com/spreadsheets/d/16nIkXJOW8T-9LEX_xHc6BxJAo8pIjb45ZDFNYrzK6d4/edit`
   - ID: `16nIkXJOW8T-9LEX_xHc6BxJAo8pIjb45ZDFNYrzK6d4`

### 1.3 시트 설정
1. 첫 번째 시트 이름을 "회원명단"으로 변경
2. 헤더 행 설정:
   ```
   ID | 이름 | 자격번호 | 이메일 | 전화번호 | 주소 | 근무기관 | 직책 | 경력 | 관심분야 | 가입일 | 상태 | 메모
   ```

## 2. Google Apps Script 설정

### 2.1 프로젝트 생성
1. [Google Apps Script](https://script.google.com)에 접속
2. "새 프로젝트" 클릭
3. 프로젝트 이름을 "KAOT Seoul Member Management"로 변경

### 2.2 코드 작성
1. `Code.gs` 파일에 다음 코드 복사:

```javascript
// Google Apps Script for KAOT Seoul Member Management
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE' // 실제 스프레드시트 ID로 변경
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
    
    memberData['가입일'] = new Date().toISOString().split('T')[0]
    memberData['상태'] = '대기'
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const rowData = headers.map(header => memberData[header] || '')
    
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
    
    const rowIndex = data.findIndex((row, index) => index > 0 && row[0] == memberData.id)
    
    if (rowIndex === -1) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: '회원을 찾을 수 없습니다.'
      })).setMimeType(ContentService.MimeType.JSON)
    }
    
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
    
    const rowIndex = data.findIndex((row, index) => index > 0 && row[0] == id)
    
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
}
```

### 2.3 스프레드시트 ID 설정
1. 코드 상단의 `SPREADSHEET_ID` 변수를 실제 스프레드시트 ID로 변경
2. 저장 (Ctrl+S)

### 2.4 권한 설정
1. "실행" → "함수 실행" → "doGet" 선택
2. 권한 요청 창에서 "권한 검토" 클릭
3. "고급" → "안전하지 않은 페이지로 이동" 클릭
4. "허용" 클릭

## 3. Web App 배포

### 3.1 배포 설정
1. "배포" → "새 배포" 클릭
2. "유형 선택" → "웹 앱" 선택
3. 설정:
   - **설명**: "KAOT Seoul Member Management API"
   - **실행할 사용자**: "나"
   - **액세스 권한**: "모든 사용자"
4. "배포" 클릭

### 3.2 Web App URL 확인
1. 배포 완료 후 Web App URL 복사
2. URL 형식: `https://script.google.com/macros/s/SCRIPT_ID/exec`

## 4. 환경 변수 설정

### 4.1 .env.local 파일 생성
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용 추가:

```env
# Google Apps Script URL
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# 관리자 계정
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin

# 기타 설정
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4.2 URL 업데이트
`YOUR_SCRIPT_ID`를 실제 Web App URL의 스크립트 ID로 변경

## 5. 연결 테스트

### 5.1 개발 서버 실행
```bash
npm run dev
```

### 5.2 관리자 페이지 접속
1. `http://localhost:3000/admin/login` 접속
2. 관리자 계정으로 로그인
3. 대시보드에서 Google Apps Script 연결 상태 확인

### 5.3 회원 관리 테스트
1. 회원 관리 페이지 접속
2. 회원 추가/수정/삭제 테스트
3. Google Sheets에서 데이터 확인

## 6. 문제 해결

### 6.1 일반적인 오류

#### CORS 오류
- Google Apps Script에서 CORS 헤더 설정 필요
- `doGet` 함수에 다음 추가:
```javascript
return ContentService.createTextOutput(JSON.stringify(data))
  .setMimeType(ContentService.MimeType.JSON)
  .setHeader('Access-Control-Allow-Origin', '*')
```

#### 권한 오류
- Google Apps Script 실행 권한 확인
- 스프레드시트 공유 설정 확인
- Web App 배포 설정 재확인

#### 연결 실패
- 환경 변수 URL 확인
- Web App URL 유효성 검사
- 네트워크 연결 상태 확인

### 6.2 디버깅 방법

#### Google Apps Script 로그 확인
1. Google Apps Script 편집기에서 "실행" → "실행 로그" 확인
2. 오류 메시지 및 실행 흐름 분석

#### 브라우저 개발자 도구
1. F12 키로 개발자 도구 열기
2. Network 탭에서 API 요청/응답 확인
3. Console 탭에서 JavaScript 오류 확인

#### 서버 로그 확인
```bash
# 개발 서버 로그 확인
npm run dev

# 프로덕션 로그 확인 (Vercel 등)
vercel logs
```

### 6.3 성능 최적화

#### 캐싱 설정
- Google Apps Script에서 캐시 활용
- 클라이언트 측 캐싱 구현

#### 배치 처리
- 대량 데이터 처리 시 배치 API 사용
- 페이지네이션 구현

## 📞 지원

문제가 발생하면 다음을 확인하세요:

1. **Google Apps Script 설정**: 권한, 배포 설정
2. **환경 변수**: URL, 계정 정보
3. **네트워크**: 인터넷 연결, 방화벽 설정
4. **브라우저**: 캐시 삭제, 새 시크릿 창에서 테스트

## 🔄 업데이트

이 가이드는 지속적으로 업데이트됩니다. 최신 버전은 프로젝트 저장소에서 확인하세요. 