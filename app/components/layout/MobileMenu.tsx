interface MobileMenuProps {
  isOpen: boolean;
  onScrollToSection: (sectionId: string) => void;
}

export function MobileMenu({ isOpen, onScrollToSection }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t bg-white/95 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-4">
          <button
            type="button"
            onClick={() => onScrollToSection("connecting-flights")}
            className="text-gray-600 hover:text-blue-600 transition-colors py-2 text-left"
          >
            Projects
          </button>
          <button
            type="button"
            onClick={() => onScrollToSection("briefing-room")}
            className="text-gray-600 hover:text-blue-600 transition-colors py-2 text-left"
          >
            Articles
          </button>
          <button
            type="button"
            onClick={() => onScrollToSection("trophy-case")}
            className="text-gray-600 hover:text-blue-600 transition-colors py-2 text-left"
          >
            Awards
          </button>
          <button
            type="button"
            onClick={() => onScrollToSection("flight-log")}
            className="text-gray-600 hover:text-blue-600 transition-colors py-2 text-left"
          >
            Experience
          </button>
          <button
            type="button"
            onClick={() => onScrollToSection("contact")}
            className="text-gray-600 hover:text-blue-600 transition-colors py-2 text-left"
          >
            Contact
          </button>
        </div>
      </nav>
    </div>
  );
}
