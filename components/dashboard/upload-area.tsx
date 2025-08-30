'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, ImageIcon, Loader2, Upload, XCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

interface UploadAreaProps {
  onFileSelect: (file: File | null) => void // allow null for reset
  onExtractText: () => void
  selectedFile: File | null
  extracting: boolean
  error: string
}

export function UploadArea({ onFileSelect, onExtractText, selectedFile, extracting, error }: UploadAreaProps) {
  const [dragActive, setDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null) // ✅ for image preview
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp']
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, GIF, BMP)')
      return
    }
    
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB')
      return
    }

    onFileSelect(file)
  }

  const handleRemoveFile = () => {
    onFileSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = "" // reset file input
    }
    setPreviewUrl(null)
  }

  // ✅ Handle Ctrl+V paste
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return
      for (let i = 0; i < e.clipboardData.items.length; i++) {
        const item = e.clipboardData.items[i]
        if (item.type.indexOf("image") === 0) {
          const file = item.getAsFile()
          if (file) {
            handleFileSelect(file)

            // Optionally sync with hidden input for consistency
            const dt = new DataTransfer()
            dt.items.add(file)
            if (fileInputRef.current) {
              fileInputRef.current.files = dt.files
            }
          }
        }
      }
    }

    document.addEventListener("paste", handlePaste)
    return () => document.removeEventListener("paste", handlePaste)
  }, [])

  // ✅ Generate & cleanup preview URL
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [selectedFile])

  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center space-x-2">
          <ImageIcon className="w-6 h-6 text-blue-600" />
          <span>Extract Text from Image</span>
        </CardTitle>
        <CardDescription>
          Upload an image and let our AI extract text instantly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
            dragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-700">
              Drop your image here, click to browse, <br />or paste with <kbd className="px-1 py-0.5 bg-gray-200 rounded">Ctrl + V</kbd>
            </p>
            <p className="text-sm text-gray-500">
              Supports JPEG, PNG, GIF, BMP (Max 10MB)
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
            className="hidden"
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Choose Image
          </Button>
        </div>

        {/* Selected File */}
        {selectedFile && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* ✅ Image preview */}
                  {previewUrl && (
                    <img 
                      src={previewUrl} 
                      alt="preview"
                      className="w-16 h-16 object-cover rounded-lg shadow"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    onClick={onExtractText}
                    disabled={extracting}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {extracting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {extracting ? 'Extracting...' : 'Extract Text'}
                  </Button>
                  <Button 
                    onClick={handleRemoveFile}
                    variant="destructive"
                    className="flex items-center space-x-1"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Remove</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
