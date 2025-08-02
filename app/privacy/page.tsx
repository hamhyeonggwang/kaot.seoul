

export default function PrivacyPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">개인정보처리방침</h1>
          <p className="text-xl text-kaot-green-100">개인정보 보호에 대한 우리의 약속</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">개인정보처리방침</h2>
            
            <p className="text-gray-600 mb-6">
              대한작업치료사협회 서울지부(이하 "서울지부")는 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">1. 개인정보의 처리 목적</h3>
            <p className="text-gray-600 mb-6">
              서울지부는 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>회원 관리 및 서비스 제공</li>
              <li>지부 활동 및 교육 프로그램 운영</li>
              <li>뉴스레터 및 공지사항 발송</li>
              <li>커뮤니티 서비스 제공</li>
              <li>통계 및 연구 목적</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">2. 개인정보의 처리 및 보유기간</h3>
            <p className="text-gray-600 mb-6">
              서울지부는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>회원정보: 회원 탈퇴 시까지</li>
              <li>교육 참가자 정보: 교육 완료 후 3년</li>
              <li>커뮤니티 게시글: 게시글 삭제 시까지</li>
              <li>문의사항: 문의 처리 완료 후 1년</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">3. 개인정보의 제3자 제공</h3>
            <p className="text-gray-600 mb-6">
              서울지부는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">4. 개인정보처리의 위탁</h3>
            <p className="text-gray-600 mb-6">
              서울지부는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>웹사이트 호스팅 서비스</li>
              <li>이메일 발송 서비스</li>
              <li>결제 처리 서비스 (교육비 등)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">5. 정보주체의 권리·의무 및 그 행사방법</h3>
            <p className="text-gray-600 mb-6">
              이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>개인정보 열람요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제요구</li>
              <li>처리정지 요구</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">6. 처리하는 개인정보의 항목</h3>
            <p className="text-gray-600 mb-6">
              서울지부는 다음의 개인정보 항목을 처리하고 있습니다.
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>회원정보: 이름, 이메일, 전화번호, 면허번호, 근무지, 전문분야</li>
              <li>교육신청정보: 이름, 이메일, 전화번호, 소속기관</li>
              <li>커뮤니티정보: 작성자 정보, 게시글 내용</li>
              <li>자동수집정보: IP주소, 쿠키, 접속 로그, 방문 일시</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">7. 개인정보의 파기</h3>
            <p className="text-gray-600 mb-6">
              서울지부는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">8. 개인정보의 안전성 확보 조치</h3>
            <p className="text-gray-600 mb-6">
              서울지부는 개인정보보호법 제29조에 따라 다음과 같은 안전성 확보 조치를 취하고 있습니다.
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>개인정보의 암호화</li>
              <li>해킹 등에 대비한 기술적 대책</li>
              <li>개인정보에 대한 접근 제한</li>
              <li>개인정보를 취급하는 직원의 최소화 및 교육</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">9. 개인정보 보호책임자</h3>
            <p className="text-gray-600 mb-6">
              서울지부는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700"><strong>개인정보 보호책임자</strong></p>
              <p className="text-gray-600">성명: 서울지부장</p>
              <p className="text-gray-600">연락처: kaot.seoul@gmail.com</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">10. 개인정보 처리방침 변경</h3>
            <p className="text-gray-600 mb-6">
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700"><strong>시행일자</strong>: 2025년 1월 20일</p>
              <p className="text-gray-700"><strong>최종 수정일자</strong>: 2025년 1월 20일</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 