import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Play, ExternalLink, Calendar, Eye, ThumbsUp, MessageCircle } from 'lucide-react'

export default function YouTubePage() {
  const videoCategories = [
    { name: '전체', active: true },
    { name: '교육 영상', active: false },
    { name: '지부 활동', active: false },
    { name: '임상 사례', active: false },
    { name: '세미나', active: false },
    { name: '인터뷰', active: false }
  ]

  const videos = [
    {
      id: 1,
      title: '작업치료의 기본 원리와 실제 적용',
      description: '작업치료의 핵심 개념과 임상에서의 실제 적용 방법을 소개합니다. 이 영상에서는 작업치료의 기본 원리부터 실제 임상에서 어떻게 적용하는지까지 자세히 다룹니다.',
      videoId: 'dQw4w9WgXcQ',
      duration: '15:32',
      views: '2,450',
      likes: '156',
      comments: '23',
      date: '2024-01-10',
      category: '교육 영상',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    },
    {
      id: 2,
      title: '소아 작업치료 기법 실습',
      description: '아동을 대상으로 한 작업치료 기법과 실습 방법을 다룹니다. 실제 임상에서 사용할 수 있는 다양한 기법들을 소개합니다.',
      videoId: 'dQw4w9WgXcQ',
      duration: '22:15',
      views: '1,890',
      likes: '134',
      comments: '18',
      date: '2024-01-08',
      category: '교육 영상',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    },
    {
      id: 3,
      title: '뇌졸중 환자 재활 치료 사례',
      description: '뇌졸중 환자의 재활 치료 과정과 성공 사례를 공유합니다. 실제 임상 사례를 통해 치료 과정을 자세히 살펴봅니다.',
      videoId: 'dQw4w9WgXcQ',
      duration: '18:45',
      views: '3,120',
      likes: '245',
      comments: '31',
      date: '2024-01-05',
      category: '임상 사례',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    },
    {
      id: 4,
      title: '2024년 서울지부 정기총회 하이라이트',
      description: '2024년 서울지부 정기총회의 주요 내용과 하이라이트를 담은 영상입니다.',
      videoId: 'dQw4w9WgXcQ',
      duration: '12:30',
      views: '1,567',
      likes: '89',
      comments: '12',
      date: '2024-01-03',
      category: '지부 활동',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    },
    {
      id: 5,
      title: '작업치료사 인터뷰 - 전문성 향상의 길',
      description: '경력 20년의 작업치료사와의 인터뷰를 통해 전문성 향상의 비결을 들어봅니다.',
      videoId: 'dQw4w9WgXcQ',
      duration: '25:18',
      views: '2,890',
      likes: '198',
      comments: '45',
      date: '2023-12-28',
      category: '인터뷰',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    },
    {
      id: 6,
      title: '작업치료 세미나 - 최신 연구 동향',
      description: '작업치료 분야의 최신 연구 동향과 향후 발전 방향에 대한 세미나 영상입니다.',
      videoId: 'dQw4w9WgXcQ',
      duration: '45:22',
      views: '1,234',
      likes: '67',
      comments: '8',
      date: '2023-12-25',
      category: '세미나',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    }
  ]

  return (
    <main>
      <Navigation />
      
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">교육 영상</h1>
          <p className="text-xl text-kaot-green-100">작업치료 관련 교육 영상과 지부 활동 영상을 확인하세요</p>
        </div>
      </section>

      {/* Video Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {videoCategories.map((category) => (
              <button
                key={category.name}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  category.active
                    ? 'bg-kaot-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-16 bg-kaot-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="card">
                {/* Video Thumbnail */}
                <div className="relative mb-4">
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute top-2 left-2 bg-kaot-green-600 text-white text-xs px-2 py-1 rounded">
                    {video.category}
                  </div>
                </div>
                
                {/* Video Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{video.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span>{video.comments}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{video.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="btn-primary">
              더 많은 영상 보기
            </button>
          </div>
        </div>
      </section>

      {/* YouTube Channel Info */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">서울지부 유튜브 채널</h2>
          <p className="text-lg text-gray-600 mb-8">
            서울지부의 공식 유튜브 채널에서 작업치료 관련 교육 영상, 지부 활동 소식, 
            임상 사례 등을 확인하실 수 있습니다. 정기적으로 업로드되는 영상들을 통해 
            전문성을 향상시키고 최신 정보를 얻어보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.youtube.com/@kaotseoul"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center"
            >
              <Play className="h-5 w-5 mr-2" />
              유튜브 채널 구독하기
            </a>
            <a
              href="https://www.instagram.com/kaot.seoul"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              인스타그램 팔로우
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 