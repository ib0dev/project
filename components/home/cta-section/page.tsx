import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
  const { user } = useAuth();
  return (
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
            <Button
              size="lg"
              className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        ) : (
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default CTASection;
