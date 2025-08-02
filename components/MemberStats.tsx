'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const memberData = [
  { name: '평생회원', value: 511, color: '#10B981' },
  { name: '정회원', value: 591, color: '#3B82F6' },
  { name: '준회원', value: 1794, color: '#F59E0B' },
  { name: '인증회원', value: 534, color: '#EF4444' }
]

const totalMembers = memberData.reduce((sum, item) => sum + item.value, 0)
const totalOTs = 22511
const seoulMembers = 3430
const otherMembers = totalOTs - seoulMembers

// 전체 현황 데이터
const overallData = [
  { name: '서울지부', value: seoulMembers, color: '#059669' },
  { name: '기타지부', value: otherMembers, color: '#E5E7EB' }
]

export default function MemberStats() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">서울지부 회원 현황</h2>
          <p className="text-lg text-gray-600">2025년 2월 기준 서울지부 회원 현황</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          {/* 연결선 */}
          <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-0.5 bg-dashed border-2 border-kaot-green-300 z-10"></div>
          
          {/* 전체 현황 파이 차트 */}
          <div className="space-y-8 relative z-20">
            <div className="bg-gradient-to-r from-kaot-green-50 to-kaot-green-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">전체 현황</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-kaot-green-600">{totalOTs.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">전체 작업치료사</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-kaot-green-600">{seoulMembers.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">서울지부 회원</div>
                </div>
              </div>
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-kaot-green-700">
                  {((seoulMembers / totalOTs) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">서울지부 회원 비율</div>
              </div>
              
              {/* 전체 현황 파이 차트 */}
              <div className="h-48 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={overallData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {overallData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value}명`, name]}
                      labelStyle={{ color: '#374151' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 서울지부 상세 현황 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">서울지부 회원 유형별 현황</h3>
              <div className="space-y-3">
                {memberData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-3" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{item.value.toLocaleString()}명</div>
                      <div className="text-sm text-gray-500">
                        {((item.value / totalMembers) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 서울지부 상세 파이 차트 */}
          <div className="h-96 relative z-20">
            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-kaot-green-200 h-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">서울지부 상세 분석</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={memberData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {memberData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value}명`, name]}
                      labelStyle={{ color: '#374151' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
          </div>
        </div>

        {/* 출처 정보 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            *자료출처 : 대한작업치료사협회 홈페이지 회원정보(
            <a 
              href="http://kaot.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-kaot-green-600 hover:text-kaot-green-700 underline"
            >
              http://kaot.org
            </a>
            ) 기준, 회원정보에 직장소재지가 입력되지 않은 회원은 지부가 미표기 됨
          </p>
        </div>
      </div>
    </section>
  )
} 