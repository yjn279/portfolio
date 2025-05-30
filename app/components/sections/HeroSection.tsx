import { ChevronDown, Clock } from "lucide-react";
import { Link } from "react-router";

export function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Clock className="h-4 w-4" />
          Now Boarding - Ready for New Opportunities
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome aboard
          <br />
          <span className="text-blue-600">
            Flight{" "}
            <Link
              to="/profile"
              className="underline hover:text-blue-700 transition-colors"
            >
              YJN279
            </Link>
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Hello world. Welcome on board flight YJN279. The captain in command of
          this website is NAKAMURA Yuji and my co-pilot is{" "}
          <span className="line-through">GitHub</span> Cursor. We are now ready
          for departure. Please let me know if you need any assistance, and I
          hope that you enjoy the flight with me 😉
        </p>

        {/* Scroll Down Animation */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-600">Scroll down to explore</p>
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>
    </section>
  );
}
