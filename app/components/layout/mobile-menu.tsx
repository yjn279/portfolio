import { Link } from "react-router";

interface MobileMenuProps {
  isOpen: boolean;
}

export function MobileMenu({ isOpen }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t bg-white/95 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-4">
          <Link
            to="/projects"
            className="text-gray-600 hover:text-blue-600 transition-colors py-2 text-left"
          >
            Projects
          </Link>
          <Link
            to="/articles"
            className="text-gray-600 hover:text-blue-600 transition-colors py-2 text-left"
          >
            Articles
          </Link>
          <Link
            to="/profile"
            className="text-gray-600 hover:text-blue-600 transition-colors py-2 text-left"
          >
            Profile
          </Link>
        </div>
      </nav>
    </div>
  );
}
