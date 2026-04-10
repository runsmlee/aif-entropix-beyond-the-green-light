import { useCallback } from 'react';

interface HeaderProps {
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

const NAV_ITEMS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Metrics', href: '#metrics' },
] as const;

export function Header({ mobileMenuOpen, onToggleMobileMenu }: HeaderProps) {
  const handleNavClick = useCallback(() => {
    onToggleMobileMenu();
  }, [onToggleMobileMenu]);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2" aria-label="Entropix home">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center" aria-hidden="true">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-lg font-semibold text-neutral-900">Entropix</span>
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-neutral-600 hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#cta"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Get Started
            </a>
          </nav>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
            onClick={onToggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden py-4 border-t border-neutral-100"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-primary hover:bg-neutral-50 rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#cta"
                onClick={handleNavClick}
                className="mt-2 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
              >
                Get Started
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
