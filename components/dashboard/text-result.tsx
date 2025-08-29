'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Download } from 'lucide-react'
import { toast } from 'sonner'

interface TextResultProps {
  extractedText: string
  confidence: number
  onTextChange: (text: string) => void
}

export function TextResult({ extractedText, confidence, onTextChange }: TextResultProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText)
    toast.success('Text copied to clipboard!')
  }

  const downloadText = () => {
    const element = document.createElement('a')
    const file = new Blob([extractedText], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `extracted-text-${Date.now()}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('Text file downloaded!')
  }

  if (!extractedText) return null

  return (
    <Card className="bg-green-50 border-green-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-green-800">Extracted Text</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {confidence}% Confidence
            </Badge>
            <Button size="sm" onClick={copyToClipboard}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button size="sm" onClick={downloadText}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Textarea
          value={extractedText}
          onChange={(e) => onTextChange(e.target.value)}
          className="min-h-[200px] bg-white border-green-200 focus:border-green-400 focus:ring-green-200"
          placeholder="Extracted text will appear here..."
        />
      </CardContent>
    </Card>
  )
}