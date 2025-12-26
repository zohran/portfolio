'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const sections = ['about', 'education', 'experience', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for header
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'portfolio', label: 'Portfolio' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border/30 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-2.5 xs:px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex h-12 xs:h-14 sm:h-16 items-center justify-between">
          <Link
            href="/"
            className="text-base xs:text-lg sm:text-xl font-bold text-foreground tracking-tight hover:opacity-80 transition-opacity min-w-[32px]"
          >
            ZR
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-[11px] lg:text-xs xl:text-sm font-medium uppercase tracking-wider transition-colors px-1.5 lg:px-2 py-1 ${
                  activeSection === item.id
                    ? 'text-foreground'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground transition-all"></span>
                )}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-2.5 lg:px-3 xl:px-4 py-1.5 lg:py-2 bg-foreground text-background text-[11px] lg:text-xs xl:text-sm font-medium uppercase tracking-wider hover:bg-foreground/90 transition-colors rounded-md whitespace-nowrap"
            >
              Contact
            </button>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-1.5 xs:gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 xs:p-2 text-foreground/70 hover:text-foreground transition-colors touch-manipulation"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5 xs:w-6 xs:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 xs:w-6 xs:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-3 xs:pb-4 border-t border-border/30 mt-1.5 xs:mt-2 pt-3 xs:pt-4">
            <div className="flex flex-col gap-1.5 xs:gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-2.5 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm font-medium uppercase tracking-wider transition-colors rounded-md touch-manipulation ${
                    activeSection === item.id
                      ? 'text-foreground bg-foreground/10'
                      : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5 active:bg-foreground/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left px-2.5 xs:px-3 py-1.5 xs:py-2 bg-foreground text-background text-xs xs:text-sm font-medium uppercase tracking-wider hover:bg-foreground/90 active:bg-foreground/80 transition-colors rounded-md touch-manipulation"
              >
                Contact
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

