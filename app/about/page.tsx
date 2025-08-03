

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">지부소개</h1>
          <p className="text-xl text-kaot-green-100">대한작업치료사협회 서울지부를 소개합니다</p>
        </div>
      </section>

      {/* 임시 비공개 메시지 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">준비 중입니다</h2>
            <p className="text-lg text-gray-600 mb-4">
              지부소개 페이지는 현재 정보를 정리하여 준비 중입니다.
            </p>
            <p className="text-gray-600">
              곧 더 자세한 정보와 함께 공개될 예정입니다.
            </p>
          </div>
        </div>
      </section>


    </>
  )
} 