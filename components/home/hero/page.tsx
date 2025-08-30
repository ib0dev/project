import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const { user } = useAuth();
  return (
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
            Transform images into editable text instantly. Perfect for
            documents, screenshots, handwritten notes, and more. Get accurate
            results with our AI-powered OCR technology.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="text-lg px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
                >
                  Open Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="text-lg px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
                >
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
  );
};

export default Hero;
