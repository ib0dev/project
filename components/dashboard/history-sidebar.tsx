'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { OcrResult } from '@/types'

interface HistorySidebarProps {
  history: OcrResult[]
  onDeleteResult: (id: string) => void
  onViewResult: (text: string, confidence: number) => void
}

export function HistorySidebar({ history, onDeleteResult, onViewResult }: HistorySidebarProps) {
  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <span>Recent Extractions</span>
        </CardTitle>
        <CardDescription>
          Your last 10 text extractions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {history.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No extractions yet. Upload an image to get started!
          </p>
        ) : (
          history.map((result) => (
            <Card key={result.id} className="bg-gray-50 border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900 truncate">
                      {result.original_filename}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(result.created_at), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onDeleteResult(result.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-600 line-clamp-3">
                  {result.extracted_text.substring(0, 100)}...
                </p>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="outline" className="text-xs">
                    {result.confidence}% confidence
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onViewResult(result.extracted_text, result.confidence)}
                    className="text-xs"
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  )
}