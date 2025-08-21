"use client";
import { Mail, MapPin, Phone, Globe, ChevronDown } from "lucide-react";
import { useState, ReactNode, JSX } from "react";

interface OpenSections {
  [key: string]: boolean;
}

interface FooterSectionProps {
  title: string;
  icon: string;
  children: ReactNode;
  sectionKey: string;
}

export default function FinalFooter(): JSX.Element {
  const [openSections, setOpenSections] = useState<OpenSections>({});

  const toggleSection = (section: string): void => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const FooterSection = ({
    title,
    icon,
    children,
    sectionKey,
  }: FooterSectionProps): JSX.Element => {
    const isOpen: boolean = openSections[sectionKey];

    return (
      <div className="border-b border-gray-200 dark:border-gray-700 md:border-none">
        {/* Mobile: Clickable header */}
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full py-4 md:cursor-default md:pointer-events-none"
          type="button"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{icon}</span>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform md:hidden ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Content - collapsible on mobile, always visible on desktop */}
        <div
          className={`
          md:block md:mt-2 overflow-hidden transition-all duration-200
          ${isOpen ? "block pb-4" : "hidden md:block"}
        `}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-12">
        {/* Brand Section - Always visible */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🌟</span>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SixtySeconds
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-2xl">
            Making language learning magical for children aged 3-12 through
            interactive games and stories.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8">
          {/* Contact Section */}
          <FooterSection title="Contact" icon="📞" sectionKey="contact">
            <div className="space-y-3">
              <a
                href="mailto:hello@kidslingo.mn"
                className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
              >
                <Mail className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                <span className="text-sm">hello@kidslingo.mn</span>
              </a>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm">+976 9999 1234</span>
              </div>

              <a
                href="https://kidslingo.mn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
              >
                <Globe className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                <span className="text-sm">kidslingo.mn</span>
              </a>
            </div>
          </FooterSection>

          {/* Location Section */}
          <FooterSection title="Location" icon="📍" sectionKey="location">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <div className="text-gray-600 dark:text-gray-300">
                  <p className="text-sm">Peace Avenue 17/1</p>
                  <p className="text-sm">Ulaanbaatar 14200, Mongolia 🇲🇳</p>
                </div>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400 ml-7">
                <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p>Supporting 5+ languages</p>
              </div>
            </div>
          </FooterSection>

          {/* Links Section */}
          <FooterSection title="Resources" icon="📋" sectionKey="resources">
            <div className="space-y-3">
              <a
                href="#privacy"
                className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#support"
                className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Support Center
              </a>
              <a
                href="#about"
                className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About Us
              </a>
            </div>
          </FooterSection>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
              © 2025 SixtySeconds. Made with ❤️ in Pinecone 2025-2K
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
