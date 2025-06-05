import { ChevronDown, Clock } from "lucide-react";
import { Link } from "react-router";

export function HeroSection() {
  return (
    <section className="px-4 pt-16 pb-8 bg-gradient-to-b from-sky-50 to-white">
      <div className="container mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
          <Clock className="h-4 w-4" />
          Now Boarding - Ready to Join Your Crew
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
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
        <blockquote className="text-lg text-muted-foreground max-w-2xl mx-auto border-l-2 italic text-balance">
          Hello world. Welcome on board flight YJN279. The captain in command of
          this website is NAKAMURA Yuji and my co-pilot is{" "}
          <span className="line-through">GitHub</span> Cursor. We are now ready
          for departure. I hope that you enjoy the flight with me <span className="not-italic">😉</span>
        </blockquote>
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground">Scroll down to take off</p>
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>
    </section>
  );
}
