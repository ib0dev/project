'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  Zap, 
  Shield, 
  Clock, 
  Star,
  ArrowRight,
  Image as ImageIcon,
  FileText,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <Link href="/">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TextVision
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <Link href="/dashboard">
                  <Button>
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button>Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-8 bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
              ✨ Powered by Advanced OCR Technology
            </Badge>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-gray-900">Extract Text from</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Any Image
              </span>
            </h1>
            <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform images into editable text instantly. Perfect for documents, screenshots, 
              handwritten notes, and more. Get accurate results with our AI-powered OCR technology.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg" className="text-lg px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200">
                    Open Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Link href="/auth/signup">
                  <Button size="lg" className="text-lg px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200">
                    Start Converting Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
              <div className="flex items-center space-x-2 text-gray-600">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-medium">Free to get started</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TextVision?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of text extraction with features designed for accuracy, speed, and ease of use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get your text extracted in seconds. Our optimized OCR engine processes images at incredible speed without compromising accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Highly Accurate</h3>
                <p className="text-gray-600 leading-relaxed">
                  Advanced AI algorithms ensure maximum accuracy for all types of images, from printed documents to handwritten notes.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Upload</h3>
                <p className="text-gray-600 leading-relaxed">
                  Simple drag-and-drop interface supports all major image formats. Upload from your device or paste directly.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">History Saved</h3>
                <p className="text-gray-600 leading-relaxed">
                  Access all your previous conversions anytime. Your extraction history is securely stored and easily searchable.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Multiple Formats</h3>
                <p className="text-gray-600 leading-relaxed">
                  Support for JPG, PNG, GIF, PDF, and more. Handle any image format with consistent, reliable results.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Export Options</h3>
                <p className="text-gray-600 leading-relaxed">
                  Copy to clipboard, download as text file, or export to various formats. Get your text exactly how you need it.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Extract Text from Your Images?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of users who trust TextVision for their OCR needs. 
            Start converting images to text today.
          </p>
          {user ? (
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TextVision</span>
          </div>
          <p className="text-gray-400">
            © 2025 TextVision. All rights reserved. Built with ❤️ for better OCR experiences.
          </p>
        </div>
      </footer>
    </div>
  )
}