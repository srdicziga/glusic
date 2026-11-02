import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function BackToTopButton() {
  const { language, scrollToSection } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 220);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const label =
    language === 'SL'
      ? 'Na vrh strani'
      : language === 'DE'
      ? 'Nach oben'
      : 'Back to top';

  return (
    <button
      type="button"
      onClick={(e) => scrollToSection('domov', e)}
      aria-label={label}
      title={label}
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm border border-[#C6DFFA] text-[#1D6FB3] shadow-[0_6px_20px_rgba(14,30,62,0.14)] hover:bg-[#0B84E5] hover:border-[#0B84E5] hover:text-white transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B84E5] ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[2.4]" />
    </button>
  );
}
