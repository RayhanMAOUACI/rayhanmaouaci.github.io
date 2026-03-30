import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sections = [
    { id: 'profil', label: 'Profil' },
    { id: 'competences', label: 'Compétences' },
    { id: 'stages', label: 'Expériences' },
    { id: 'projets', label: 'Projets' },
    { id: 'mindset', label: 'Mindset' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-blue-900 shadow-lg backdrop-blur-sm bg-opacity-95">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-white font-bold text-sm">
            RM
          </div>
          <span className="font-bold text-white text-lg">Rayhan</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavigate(section.id)}
              className={`text-sm font-medium transition-colors smooth-transition ${
                activeSection === section.id
                  ? 'text-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {section.label}
            </button>
          ))}

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Plus
              <ChevronDown
                size={16}
                className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-blue-900 rounded-lg shadow-lg py-2 section-enter">
                <button
                  onClick={() => handleNavigate('rayhai')}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    activeSection === 'rayhai'
                      ? 'bg-blue-900 text-blue-400'
                      : 'text-gray-400 hover:bg-blue-900 hover:text-blue-400'
                  }`}
                >
                  💬 RayhAI Assistant
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-400 hover:text-white transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-card border-t border-blue-900 section-enter">
          <div className="container py-4 flex flex-col gap-3">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavigate(section.id)}
                className={`text-left text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'text-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {section.label}
              </button>
            ))}
            <button
              onClick={() => handleNavigate('rayhai')}
              className={`text-left text-sm font-medium transition-colors ${
                activeSection === 'rayhai'
                  ? 'text-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              💬 RayhAI Assistant
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
