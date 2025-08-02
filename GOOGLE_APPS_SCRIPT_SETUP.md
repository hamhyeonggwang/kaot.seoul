# Google Apps Script 설정 가이드

## 1. Google Sheets 생성

1. [Google Sheets](https://sheets.google.com)에 접속
2. 새 스프레드시트 생성
3. 스프레드시트 이름을 "KAOT 서울지부 회원명단"으로 변경
4. 스프레드시트 ID 복사 (URL에서 확인)

## 2. Google Apps Script 설정

1. [Google Apps Script](https://script.google.com)에 접속
2. 새 프로젝트 생성
3. 프로젝트 이름을 "KAOT Seoul Member Management"로 변경
4. `google-apps-script-example.gs` 파일의 내용을 복사하여 붙여넣기

## 3. 스프레드시트 ID 설정

```javascript
// 이 부분을 실제 스프레드시트 ID로 변경
const SPREADSHEET_ID = 'YOUR_ACTUAL_SPREADSHEET_ID'
```

## 4. 스프레드시트 초기 설정

1. Apps Script 편집기에서 `setupSpreadsheet()` 함수 실행
2. 권한 요청 시 "고급" → "안전하지 않은 앱으로 이동" 클릭
3. "허용" 클릭

## 5. Web App 배포

1. "배포" → "새 배포" 클릭
2. "유형 선택" → "웹 앱" 선택
3. 설정:
   - **실행할 사용자**: "나"
   - **액세스 권한**: "모든 사용자"
4. "배포" 클릭
5. Web App URL 복사

## 6. 환경 변수 설정

### Vercel에서 설정
1. Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
2. 변수 추가:
   - **이름**: `GOOGLE_APPS_SCRIPT_URL`
   - **값**: Web App URL

### 로컬에서 설정
`.env.local` 파일 생성:
```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## 7. 테스트

1. 회원가입 폼에서 테스트 데이터 입력
2. 제출 후 Google Sheets에서 데이터 확인
3. 관리자 대시보드에서 회원 목록 확인

## 8. 보안 설정

### CORS 설정 (필요시)
```javascript
// Apps Script에 추가
function doOptions(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
  
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers)
}
```

## 9. 백업 설정

### 자동 백업
```javascript
// 매일 자동 백업 (선택사항)
function createDailyBackup() {
  backupData()
}
```

## 10. 문제 해결

### 일반적인 오류
1. **권한 오류**: Apps Script에서 스프레드시트 권한 확인
2. **CORS 오류**: Web App URL이 올바른지 확인
3. **데이터 오류**: 스프레드시트 헤더가 올바른지 확인

### 로그 확인
1. Apps Script → "실행" → "실행 로그" 확인
2. 브라우저 개발자 도구 → Network 탭 확인

## 11. 추가 기능

### 이메일 알림
```javascript
// 새 회원 가입 시 이메일 알림
function sendNewMemberNotification(memberData) {
  const email = "admin@kaot-seoul.or.kr"
  const subject = "새 회원 가입 신청"
  const body = `
    새로운 회원 가입 신청이 있습니다.
    
    이름: ${memberData.name}
    이메일: ${memberData.email}
    전화번호: ${memberData.phone}
    
    관리자 페이지에서 승인해주세요.
  `
  
  MailApp.sendEmail(email, subject, body)
}
```

### 승인 시스템
```javascript
// 회원 승인 함수
function approveMember(memberId) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME)
  const data = sheet.getDataRange().getValues()
  
  // ID로 회원 찾기
  const rowIndex = data.findIndex((row, index) => index > 0 && row[0] == memberId)
  
  if (rowIndex !== -1) {
    // 상태를 '승인'으로 변경
    sheet.getRange(rowIndex + 1, 12).setValue('승인')
    
    // 승인 이메일 발송
    const memberEmail = data[rowIndex][3] // 이메일 열
    const memberName = data[rowIndex][1] // 이름 열
    
    MailApp.sendEmail(memberEmail, "회원 승인 완료", 
      `${memberName}님의 회원 가입이 승인되었습니다.`)
  }
}
``` 