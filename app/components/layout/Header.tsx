import { Button } from "@/components/ui/button";
import { Menu, Plane, X } from "lucide-react";
import { Link } from "react-router";

interface HeaderProps {
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  showBackButton?: boolean;
  title?: string;
  subtitle?: string;
}

export function Header({
  isMobileMenuOpen,
  onToggleMobileMenu,
  showBackButton = false,
  title = "Flight YJN279",
  subtitle = "Web Engineer Portfolio",
}: HeaderProps) {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-600">{subtitle}</p>
            </div>
          </Link>

          {showBackButton ? (
            <Link to="/">
              <Button variant="outline" size="sm">
                Back to Home
              </Button>
            </Link>
          ) : (
            <>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <a
                  href="#connecting-flights"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Projects
                </a>
                <a
                  href="#briefing-room"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Articles
                </a>
                <a
                  href="#flight-log"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Experience
                </a>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Contact
                </a>
              </nav>

              {/* Mobile Menu Button */}
              <button
                type="button"
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={onToggleMobileMenu}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-600" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600" />
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
