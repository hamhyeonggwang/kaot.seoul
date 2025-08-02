import Link from 'next/link'
import { FileText, AlertTriangle, CheckCircle, ExternalLink, Info } from 'lucide-react'

export default function LicensePage() {
  return (
    <>
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">자격증 갱신</h1>
          <p className="text-xl text-kaot-green-100">작업치료사 면허신고 및 자격증 갱신 안내</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">면허신고</h2>
            
            {/* General Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">일반 안내</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-3">
                <li>
                  작업치료사는 취업 유무와 관계없이, 처음 면허를 받은 후 또는 최초 면허신고 후 매3년마다 보건복지부에 면허신고를 해야 합니다. (하단 [면허신고센터]에 접속하여 신고)
                </li>
                <li>
                  면허신고를 하지 않으면 면허 효력이 정지될 수 있습니다.
                </li>
                <li>
                  면허 효력이 정지 되었더라도 신고 즉시 면허정지가 해소됩니다.
                </li>
              </ul>
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                면허신고 요건
              </h3>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <ul className="list-disc pl-6 text-gray-700 space-y-3">
                  <li>
                    신고 직전년도까지 매년 보수교육을 이수했거나 / 면제 또는 유예 승인을 받은 내역이 있어야 합니다. (한해라도 누락되면 신고가 불가합니다.)
                  </li>
                  <li>
                    신고 직전 3년 동안 받은 보수교육에 <strong className="text-blue-600">필수과목(총 2시간)</strong>이 반드시 포함되어 있어야 합니다.
                  </li>
                </ul>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Info className="h-5 w-5 text-blue-600 mr-2" />
                주의사항 및 예외
              </h3>
              <div className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-blue-600 font-medium">* 주의할 점</p>
                  <p className="text-gray-700">필수과목을 매년 이수하는 것이 아니라, 3년 동안 총 2시간만 이수하면 됩니다.</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <p className="text-blue-600 font-medium">* 예외</p>
                  <p className="text-gray-700">만약 신고 직전 3년 동안 모두 보수교육 면제(또는 유예) 대상이었다면, 필수과목(2시간)도 면제(또는 유예)됩니다.</p>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-800 font-semibold mb-2">중요 안내</h4>
                  <p className="text-red-700">
                    자세한 사항은 대한작업치료사협회 홈페이지를 확인하시기 바랍니다. 
                    면허신고 관련 구체적인 절차, 요건, 예외사항 등은 협회에서 제공하는 최신 정보를 참고하세요.
                  </p>
                </div>
              </div>
            </div>

            {/* External Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://www.kaot.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-kaot-green-50 rounded-lg hover:bg-kaot-green-100 transition-colors duration-200"
              >
                <ExternalLink className="h-5 w-5 text-kaot-green-600 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">대한작업치료사협회 홈페이지</h4>
                  <p className="text-sm text-gray-600">자세한 면허신고 정보 확인</p>
                </div>
              </a>
              
              <a
                href="https://www.kaot.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
              >
                <FileText className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">면허신고센터</h4>
                  <p className="text-sm text-gray-600">온라인 면허신고 접속</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Related Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">관련 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/info" className="flex items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <FileText className="h-5 w-5 text-gray-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">정보마당</h4>
                <p className="text-sm text-gray-600">다른 유용한 자료들</p>
              </div>
            </Link>
            
            <Link href="/community" className="flex items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <FileText className="h-5 w-5 text-gray-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">커뮤니티</h4>
                <p className="text-sm text-gray-600">다른 회원들과 정보 공유</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
} 