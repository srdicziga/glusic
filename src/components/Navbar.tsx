import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useLanguage, SITE_TRANSLATIONS, Language } from '../i18n';

export function GlusicLogo({
  className = 'h-9 sm:h-11 md:h-12 lg:h-[52px] w-auto object-contain',
}: {
  className?: string;
}) {
  return (
    <img
      src="/assets/aistudio/b84c9676-0207-4fae-a3e9-c55ef39e9874_8a9907f0.webp"
      alt="Glušič logotip"
      className={className}
      draggable={false}
    />
  );
}

export function GlobeIcon({ className = 'w-[22px] h-[22px]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9.5" />
      <ellipse cx="12" cy="12" rx="4.3" ry="9.5" />
      <path d="M3.2 8.5h17.6" />
      <path d="M3.2 15.5h17.6" />
      <path d="M12 2.5v19" />
    </svg>
  );
}

export default function Navbar() {
  const { language, setLanguage, t, scrollToSection } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'o-nas', label: t.nav.about, href: '#o-nas' },
    { id: 'storitve', label: t.nav.services, href: '#storitve' },
    { id: 'kontakt', label: t.nav.contact, href: '#kontakt' },
  ];

  return (
    <header
      className="absolute inset-x-0 top-0 z-30 w-full select-none backdrop-blur-md"
      style={{
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.42) 0%, rgba(235, 245, 254, 0.26) 75%, rgba(230, 242, 253, 0.10) 100%)',
      }}
    >
      <div className="mx-auto max-w-[1340px] px-4 sm:px-8 lg:px-14">
        {/* Main One-Row Navigation Bar */}
        <div className="flex h-[76px] sm:h-[88px] lg:h-[96px] items-center justify-between gap-4 sm:gap-8 border-b border-[#13203B]/10">
          {/* Zone 1: Brand Wordmark / Logo */}
          <a
            href="#domov"
            onClick={(e) => {
              scrollToSection('domov', e);
            }}
            className="group flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2274B8] rounded"
            aria-label={`Glušič ${t.nav.home}`}
          >
            <GlusicLogo className="h-9 sm:h-11 md:h-12 lg:h-[52px] max-w-[160px] sm:max-w-[200px] lg:max-w-[230px] w-auto object-contain transition-transform duration-150 group-hover:scale-[1.01]" />
          </a>

          {/* Zone 2 & 3 grouped on the right as in the reference image */}
          <div className="hidden md:flex items-center">
            {/* Navigation Links */}
            <nav aria-label="Glavna navigacija" className="flex items-center gap-5 lg:gap-7">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    scrollToSection(item.id, e);
                  }}
                  className="py-1.5 text-[16px] font-medium tracking-[-0.01em] text-[#13203B] hover:text-[#1D6FB3] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Subtle Vertical Hairline Divider */}
            <div
              className="mx-7 lg:mx-8 h-[28px] w-[1px] bg-[#d0ddec]"
              aria-hidden="true"
            />

            {/* Facebook Shortcut & Language Selector */}
            <div className="flex items-center gap-3.5">
              <a
                href="https://www.facebook.com/profile.php?id=100048681625087"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Glušič Facebook stran"
                className="flex items-center justify-center p-1.5 text-[#0f192e] hover:text-[#2274B8] transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2274B8] rounded"
              >
                <svg className="w-[19px] h-[19px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V6.65c0-1.05.29-1.73 1.76-1.73Z" />
                </svg>
              </a>

              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setLangMenuOpen((prev) => !prev)}
                  aria-expanded={langMenuOpen}
                  aria-haspopup="listbox"
                  aria-label={`${t.nav.selectLanguage} (${language})`}
                  className="flex items-center gap-1.5 py-1.5 px-1 text-[#0f192e] hover:text-[#2274B8] transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2274B8] rounded whitespace-nowrap shrink-0"
                >
                  <GlobeIcon className="w-[23px] h-[23px]" />
                  <ChevronDown
                    className={`w-[16px] h-[16px] stroke-[1.4] transition-transform duration-150 ${
                      langMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Language Dropdown Menu */}
                {langMenuOpen && (
                  <div
                    role="listbox"
                    aria-label={t.nav.selectLanguage}
                    className="absolute right-0 mt-2 w-40 rounded-lg border border-[#d5e1ee] bg-white/95 backdrop-blur-md py-1.5 shadow-lg z-50"
                  >
                    {(['SL', 'EN', 'DE'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        role="option"
                        aria-selected={language === lang}
                        onClick={() => {
                          setLanguage(lang);
                          setLangMenuOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-3.5 py-2 text-left text-sm transition-colors cursor-pointer ${
                          language === lang
                            ? 'bg-[#eff6ff] font-semibold text-[#2274B8]'
                            : 'font-medium text-[#13203B] hover:bg-slate-50'
                        }`}
                      >
                        <span>{SITE_TRANSLATIONS[lang].langLabel}</span>
                        <span className="text-xs text-slate-400">{lang}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://www.facebook.com/profile.php?id=100048681625087"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Glušič Facebook stran"
              className="p-2 text-[#13203B] hover:text-[#2274B8] transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V6.65c0-1.05.29-1.73 1.76-1.73Z" />
              </svg>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={t.nav.openMenu}
              aria-expanded={mobileMenuOpen}
              className="p-2 text-[#13203B] hover:text-[#2274B8] focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#d5e1ee] bg-white/95 backdrop-blur-sm py-4 px-2 space-y-2">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    scrollToSection(item.id, e);
                  }}
                  className="px-3 py-2.5 text-[16px] font-medium text-[#13203B] hover:text-[#2274B8] transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between px-3">
              <span className="text-xs font-medium text-slate-500">{t.nav.selectLanguage}</span>
              <div className="flex items-center gap-1.5">
                {(['SL', 'EN', 'DE'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                      language === lang
                        ? 'bg-[#2274B8] text-white'
                        : 'text-[#13203B] hover:bg-slate-100'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
