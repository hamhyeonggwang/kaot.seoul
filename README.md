# 대한작업치료사협회 서울지부 홈페이지

대한작업치료사협회 서울지부의 공식 홈페이지입니다.

## 🚀 배포 가이드

### 1. Vercel 배포 (추천)

1. **Vercel 계정 생성**
   - [vercel.com](https://vercel.com)에서 GitHub 계정으로 가입

2. **GitHub에 코드 업로드**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/kaot-seoul.git
   git push -u origin main
   ```

3. **Vercel에서 프로젝트 연결**
   - Vercel 대시보드에서 "New Project" 클릭
   - GitHub 저장소 선택
   - 자동 배포 설정

### 2. Netlify 배포

1. **Netlify 계정 생성**
   - [netlify.com](https://netlify.com)에서 가입

2. **배포 설정**
   - "New site from Git" 선택
   - GitHub 저장소 연결
   - Build command: `npm run build`
   - Publish directory: `.next`

### 3. 도메인 연결

1. **도메인 구매** (가비아, 후이즈 등)
2. **DNS 설정**
   - A 레코드: Vercel/Netlify IP 주소
   - CNAME: `www` → `your-domain.com`

## 📋 기능 목록

### ✅ 완료된 기능
- [x] 반응형 디자인
- [x] 네비게이션 메뉴
- [x] 홈페이지 Hero 섹션
- [x] 지부소식 페이지
- [x] 커뮤니티 페이지
- [x] 협력기관 페이지
- [x] 정보마당 페이지
- [x] 회원가입 페이지
- [x] 일반 회원 로그인
- [x] 관리자 대시보드
- [x] YouTube 영상 임베드
- [x] Instagram 링크 연동

### 🔄 개발 중인 기능
- [x] Google Apps Script 연동 ✅
- [x] 실제 데이터베이스 연동 ✅
- [x] 회원 관리 시스템 ✅
- [ ] 게시판 CRUD 기능
- [ ] 댓글 시스템
- [ ] 파일 업로드 기능

## 🛠 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: Pretendard (한국어 최적화)
- **Deployment**: Vercel/Netlify

## 📁 프로젝트 구조

```
kaot.seoul/
├── app/                    # Next.js App Router
│   ├── admin/             # 관리자 페이지
│   ├── community/         # 커뮤니티
│   ├── info/              # 정보마당
│   ├── join/              # 회원가입
│   ├── login/             # 로그인
│   ├── news/              # 지부소식
│   ├── partners/          # 협력기관
│   └── api/               # API 라우트
├── components/            # 재사용 컴포넌트
├── public/               # 정적 파일
└── styles/               # 글로벌 스타일
```

## 🚀 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 🔧 환경 변수

`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# Google Apps Script URL (필수 - 실제 데이터베이스 연동용)
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# 관리자 계정 (실제 운영 시 변경 필요)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin

# 기타 설정
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Google Apps Script 설정
Google Apps Script 연동을 위해서는 다음 단계를 따라주세요:

1. **Google Sheets 생성**: 회원 데이터 저장용 스프레드시트 생성
2. **Google Apps Script 설정**: `GOOGLE_APPS_SCRIPT_SETUP.md` 참조
3. **Web App 배포**: Google Apps Script를 Web App으로 배포
4. **환경 변수 설정**: Web App URL을 `GOOGLE_APPS_SCRIPT_URL`에 설정

자세한 설정 방법은 [Google Apps Script 설정 가이드](./GOOGLE_APPS_SCRIPT_SETUP.md)를 참조하세요.

## 📞 문의

- **개발 문의**: 개발자 연락처
- **콘텐츠 문의**: 서울지부 담당자

## 📄 라이선스

© 2024 대한작업치료사협회 서울지부. All rights reserved. 