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
                <Link
                  to="/projects"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Projects
                </Link>
                <Link
                  to="/articles"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Articles
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Profile
                </Link>
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg z-50 p-6">
            <nav className="space-y-4 mt-16">
              <Link
                to="/projects"
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => onToggleMobileMenu()}
              >
                Projects
              </Link>
              <Link
                to="/articles"
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => onToggleMobileMenu()}
              >
                Articles
              </Link>
              <Link
                to="/profile"
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => onToggleMobileMenu()}
              >
                Profile
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
