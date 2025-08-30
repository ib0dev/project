'use client'

import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { HistorySidebar } from '@/components/dashboard/history-sidebar'
import { TextResult } from '@/components/dashboard/text-result'
import { UploadArea } from '@/components/dashboard/upload-area'
import { useAuth } from '@/contexts/auth-context'
import { supabase } from '@/lib/supabase'
import { OcrApiResponse, OcrResult } from '@/types'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Dashboard() {
  const { user } = useAuth()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [extracting, setExtracting] = useState(false)
  const [extractedText, setExtractedText] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [history, setHistory] = useState<OcrResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin')
      return
    }
    loadHistory()
  }, [user, router])

  const loadHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('ocr_results')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) throw error
      setHistory(data || [])
    } catch (error: any) {
      console.error('Error loading history:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file)
    setExtractedText('')
    setConfidence(0)
    setError('')
  }

  const extractText = async () => {
    if (!selectedFile || !user) return

    setExtracting(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('apikey', process.env.NEXT_PUBLIC_OCR_SPACE_API_KEY || 'K82827632388957')
      formData.append('language', 'eng')
      formData.append('isOverlayRequired', 'false')
      formData.append('detectOrientation', 'false')
      formData.append('isTable', 'false')
      formData.append('scale', 'true')

      const response = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        body: formData,
      })

      const result: OcrApiResponse = await response.json()

      if (result.IsErroredOnProcessing) {
        throw new Error(result.ErrorMessage || 'OCR processing failed')
      }

      const text = result.ParsedResults[0]?.ParsedText || ''
      const conf = result.ParsedResults[0]?.TextOverlay?.HasOverlay ? 95 : 85

      setExtractedText(text)
      setConfidence(conf)

      // Save to database
      const { error } = await supabase
        .from('ocr_results')
        .insert({
          user_id: user.id,
          original_filename: selectedFile.name,
          extracted_text: text,
          confidence: conf,
        })

      if (error) throw error

      toast.success('Text extracted successfully!')
      loadHistory() // Refresh history

    } catch (error: any) {
      console.error('Error:', error)
      setError(error.message || 'Failed to extract text from image')
      toast.error('Failed to extract text')
    } finally {
      setExtracting(false)
    }
  }

  const deleteResult = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ocr_results')
        .delete()
        .eq('id', id)

      if (error) throw error

      setHistory(history.filter(item => item.id !== id))
      toast.success('Result deleted successfully!')
    } catch (error: any) {
      console.error('Error:', error)
      toast.error('Failed to delete result')
    }
  }

  const handleViewResult = (text: string, conf: number) => {
    setExtractedText(text)
    setConfidence(conf)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            <UploadArea
              onFileSelect={handleFileSelect}
              onExtractText={extractText}
              selectedFile={selectedFile}
              extracting={extracting}
              error={error}
            />
            <TextResult
              extractedText={extractedText}
              confidence={confidence}
              onTextChange={setExtractedText}
            />
          </div>

          {/* History Sidebar */}
          <div className="space-y-6">
            <HistorySidebar
              history={history}
              onDeleteResult={deleteResult}
              onViewResult={handleViewResult}
            />
          </div>
        </div>
      </div>
    </div>
  )
}