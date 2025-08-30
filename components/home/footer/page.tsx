import { Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">TextVision</span>
        </div>
        <p className="text-gray-400">
          © 2025 TextVision. All rights reserved. Built with ❤️ for better OCR
          experiences.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
