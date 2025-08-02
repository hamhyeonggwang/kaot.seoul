'use client'

import { useState, useEffect } from 'react'

import FileUpload from '@/components/FileUpload'
import { Upload, File, Image, FileText, Download, Trash2, Search, Filter, Calendar, User, LogOut, X } from 'lucide-react'
import { UploadedFile } from '@/app/utils/file-upload'
import { useRouter } from 'next/navigation'

export default function FilesPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showUpload, setShowUpload] = useState(false)
  const router = useRouter()

  // 인증 체크
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession')
    if (!adminSession) {
      router.push('/admin/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminSession')
    localStorage.removeItem('adminUser')
    router.push('/admin/login')
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/upload')
      const result = await response.json()
      if (result.success) {
        setFiles(result.data.files)
      }
    } catch (error) {
      console.error('파일 목록 로드 중 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUploadSuccess = (file: UploadedFile) => {
    setFiles(prev => [file, ...prev])
    setShowUpload(false)
  }

  const handleUploadError = (error: string) => {
    console.error('파일 업로드 오류:', error)
  }

  const handleDeleteFile = async (fileId: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/upload/${fileId}`, {
          method: 'DELETE',
        })
        
        const result = await response.json()
        if (result.success) {
          setFiles(prev => prev.filter(file => file.id !== fileId))
          alert('파일이 성공적으로 삭제되었습니다.')
        } else {
          alert('파일 삭제 중 오류가 발생했습니다.')
        }
      } catch (error) {
        console.error('파일 삭제 중 오류:', error)
        alert('파일 삭제 중 오류가 발생했습니다.')
      }
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (category: string) => {
    switch (category) {
      case 'image':
        return <Image className="h-5 w-5" />
      case 'document':
        return <FileText className="h-5 w-5" />
      default:
        return <File className="h-5 w-5" />
    }
  }

  const getFileTypeColor = (category: string) => {
    switch (category) {
      case 'image':
        return 'text-blue-600 bg-blue-100'
      case 'document':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.originalName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || file.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <>
      
      {/* Header */}
      <section className="bg-kaot-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">파일 관리</h1>
              <p className="text-xl text-kaot-green-100">업로드된 파일 관리</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-kaot-green-600 rounded-lg hover:bg-gray-100 flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              로그아웃
            </button>
          </div>
        </div>
      </section>

      {/* Admin Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center space-x-4">
          <a href="/admin/dashboard" className="px-4 py-2 bg-white text-kaot-green-600 border border-kaot-green-600 rounded-lg font-medium hover:bg-kaot-green-50">
            대시보드
          </a>
          <a href="/admin/members" className="px-4 py-2 bg-white text-kaot-green-600 border border-kaot-green-600 rounded-lg font-medium hover:bg-kaot-green-50">
            회원 관리
          </a>
          <a href="/admin/files" className="px-4 py-2 bg-kaot-green-600 text-white rounded-lg font-medium">
            파일 관리
          </a>
          <a href="/admin" className="px-4 py-2 bg-white text-kaot-green-600 border border-kaot-green-600 rounded-lg font-medium hover:bg-kaot-green-50">
            지부소식 관리
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upload Section */}
        {showUpload && (
          <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">파일 업로드</h2>
              <button
                onClick={() => setShowUpload(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <FileUpload
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
              multiple={true}
              maxSize={10}
            />
          </div>
        )}

        {/* Controls */}
        <div className="mb-6 bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="파일명으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaot-green-500 focus:border-kaot-green-500"
                >
                  <option value="all">전체</option>
                  <option value="image">이미지</option>
                  <option value="document">문서</option>
                  <option value="other">기타</option>
                </select>
              </div>
            </div>

            {/* Upload Button */}
            <button
              onClick={() => setShowUpload(true)}
              className="px-4 py-2 bg-kaot-green-600 text-white rounded-lg hover:bg-kaot-green-700 flex items-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              파일 업로드
            </button>
          </div>
        </div>

        {/* Files List */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">파일 목록 ({filteredFiles.length}개)</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="text-gray-500">파일 목록을 불러오는 중...</div>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="p-8 text-center">
              <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">업로드된 파일이 없습니다.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">파일</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">크기</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">업로드자</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">업로드일</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredFiles.map((file) => (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full ${getFileTypeColor(file.category)}`}>
                            {getFileIcon(file.category)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{file.originalName}</div>
                            <div className="text-sm text-gray-500">{file.fileName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatFileSize(file.fileSize)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {file.uploadedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(file.uploadedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-kaot-green-600 hover:text-kaot-green-900"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                          <button
                            onClick={() => handleDeleteFile(file.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

    </>
  )
} 