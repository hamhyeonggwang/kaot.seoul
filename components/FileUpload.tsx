'use client'

import { useState, useRef } from 'react'
import { Upload, X, File, Image, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { UploadedFile } from '@/app/utils/file-upload'

interface FileUploadProps {
  onUploadSuccess?: (file: UploadedFile) => void
  onUploadError?: (error: string) => void
  multiple?: boolean
  accept?: string
  maxSize?: number // MB
  className?: string
  disabled?: boolean
}

export default function FileUpload({
  onUploadSuccess,
  onUploadError,
  multiple = false,
  accept = 'image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt',
  maxSize = 10,
  className = '',
  disabled = false
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleFiles = async (files: File[]) => {
    if (disabled) return

    setError(null)
    setIsUploading(true)

    try {
      for (const file of files) {
        await uploadFile(file)
      }
    } catch (error) {
      console.error('파일 업로드 중 오류:', error)
      setError('파일 업로드 중 오류가 발생했습니다.')
      onUploadError?.('파일 업로드 중 오류가 발생했습니다.')
    } finally {
      setIsUploading(false)
    }
  }

  const uploadFile = async (file: File) => {
    // 파일 크기 검증
    if (file.size > maxSize * 1024 * 1024) {
      const errorMsg = `파일 크기는 ${maxSize}MB 이하여야 합니다.`
      setError(errorMsg)
      onUploadError?.(errorMsg)
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('uploadedBy', 'user') // 실제로는 로그인된 사용자 정보 사용

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success && result.data) {
        setUploadedFiles(prev => [...prev, result.data])
        onUploadSuccess?.(result.data)
      } else {
        const errorMsg = result.error || '파일 업로드에 실패했습니다.'
        setError(errorMsg)
        onUploadError?.(errorMsg)
      }
    } catch (error) {
      const errorMsg = '파일 업로드 중 오류가 발생했습니다.'
      setError(errorMsg)
      onUploadError?.(errorMsg)
    }
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
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
        return <Image className="h-4 w-4" />
      case 'document':
        return <FileText className="h-4 w-4" />
      default:
        return <File className="h-4 w-4" />
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

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragging 
            ? 'border-kaot-green-400 bg-kaot-green-50' 
            : 'border-gray-300 hover:border-kaot-green-300 hover:bg-gray-50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />
        
        <div className="space-y-4">
          {isUploading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-kaot-green-600" />
            </div>
          ) : (
            <Upload className="h-8 w-8 mx-auto text-gray-400" />
          )}
          
          <div>
            <p className="text-lg font-medium text-gray-900">
              {isUploading ? '업로드 중...' : '파일을 드래그하거나 클릭하여 업로드'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              최대 {maxSize}MB까지 업로드 가능
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">업로드된 파일</h3>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${getFileTypeColor(file.category)}`}>
                    {getFileIcon(file.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.originalName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.fileSize)} • {new Date(file.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-gray-400 hover:text-kaot-green-600 transition-colors"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 