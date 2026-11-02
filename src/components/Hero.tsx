import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function Hero() {
  const { t, scrollToSection } = useLanguage();

  return (
    <section
      id="domov"
      aria-label={t.nav.home}
      className="relative w-full min-h-[100svh] overflow-hidden bg-[#eaf3fc] flex flex-col justify-center"
    >
      {/* Full-Screen Hero Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/aistudio/White_MAN_Truck_by_Warehouse_61d8c733.png"
          alt={t.hero.imageAlt}
          className="h-full w-full object-cover object-[72%_center] sm:object-[68%_center] lg:object-center select-none"
          draggable={false}
        />

        {/* Subtle Top Sky Tint for Navigation Readability */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-28 sm:h-32"
          style={{
            background:
              'linear-gradient(180deg, rgba(240,247,254,0.48) 0%, rgba(235,245,254,0.20) 60%, rgba(235,245,254,0) 100%)',
          }}
        />

        {/* Left-Side Atmospheric Readability Gradient */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-[58%]"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(248,251,255,0.66) 50%, rgba(255,255,255,0) 100%)',
          }}
        />

        {/* Seamless Bottom Transition into "Zakaj izbrati nas" (#F6FAFF) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-36 lg:h-44"
          style={{
            background:
              'linear-gradient(180deg, rgba(246,250,255,0) 0%, rgba(246,250,255,0.58) 52%, #F6FAFF 100%)',
          }}
        />
      </div>

      {/* Main Content Container aligned with Navbar */}
      <div className="relative z-10 mx-auto w-full max-w-[1340px] px-4 sm:px-8 lg:px-14 pt-[108px] sm:pt-[120px] lg:pt-[128px] pb-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[calc(100svh-210px)]">
          {/* Left Column - Slogan, Subtitle & CTA Buttons */}
          <div className="lg:col-span-7 xl:col-span-6 max-w-[600px]">
            <h1 className="text-[34px] sm:text-[46px] lg:text-[54px] xl:text-[58px] font-extrabold text-[#0B162C] leading-[1.11] tracking-[-0.025em] [text-wrap:balance]">
              {t.hero.title}
            </h1>

            <p className="mt-5 sm:mt-6 text-[16px] sm:text-[18px] lg:text-[19px] font-normal text-[#1E2B45] leading-[1.58] max-w-[540px]">
              {t.hero.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <a
                href="#kontakt"
                onClick={(e) => scrollToSection('kontakt', e)}
                className="group inline-flex items-center justify-center gap-2 rounded-[10px] bg-gradient-to-r from-[#0B84E5] to-[#0073D6] px-6 py-3.5 text-[15px] sm:text-[16px] font-medium text-white shadow-[0_6px_18px_rgba(11,132,229,0.26)] hover:from-[#0975ce] hover:to-[#0063b8] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B84E5] focus-visible:ring-offset-2"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowUpRight className="w-[18px] h-[18px] stroke-[2.2] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#storitve"
                onClick={(e) => scrollToSection('storitve', e)}
                className="inline-flex items-center justify-center rounded-[10px] border-[1.5px] border-[#1B7EC8] bg-white/65 backdrop-blur-[2px] px-6 py-3.5 text-[15px] sm:text-[16px] font-medium text-[#126FB5] hover:bg-white hover:border-[#0B84E5] hover:text-[#0B84E5] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B7EC8] focus-visible:ring-offset-2"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Right Column - Space for the MAN truck on the background image */}
          <div className="lg:col-span-5 xl:col-span-6" />
        </div>
      </div>
    </section>
  );
}
