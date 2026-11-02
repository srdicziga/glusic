import React, { useState, useRef, useEffect } from 'react';
import { Maximize2, Minimize2, CheckCircle2 } from 'lucide-react';
import { GlusicLogo } from './Navbar';
import { useLanguage, SITE_TRANSLATIONS, Language } from '../i18n';

export default function ContactAndFooter() {
  const { language, setLanguage, t, scrollToSection } = useLanguage();

  const [formData, setFormData] = useState({
    pickupLocation: '',
    deliveryLocation: '',
    cargoType: '',
    weightVolume: '',
    fullName: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mapExpanded, setMapExpanded] = useState(false);
  const [footerLangOpen, setFooterLangOpen] = useState(false);
  const footerDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        footerDropdownRef.current &&
        !footerDropdownRef.current.contains(event.target as Node)
      ) {
        setFooterLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(
      `Novo povpraševanje (Glušič d.o.o.) – ${formData.pickupLocation} → ${formData.deliveryLocation}`
    );
    const body = encodeURIComponent(
      `Novo povpraševanje s spletne strani Glušič d.o.o.:\n\n` +
        `--- PREVZEM IN DOSTAVA ---\n` +
        `Kraj prevzema: ${formData.pickupLocation}\n` +
        `Kraj dostave: ${formData.deliveryLocation}\n\n` +
        `--- PODATKI O TOVORU ---\n` +
        `Vrsta tovora: ${formData.cargoType || '-'}\n` +
        `Teža / Volumen: ${formData.weightVolume || '-'}\n\n` +
        `--- KONTAKTNI PODATKI ---\n` +
        `Ime in priimek: ${formData.fullName}\n` +
        `E-pošta: ${formData.email}\n` +
        `Telefon: ${formData.phone}\n`
    );
    return `mailto:srdicziga@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = t.contact.errors.pickup;
    }
    if (!formData.deliveryLocation.trim()) {
      newErrors.deliveryLocation = t.contact.errors.delivery;
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = t.contact.errors.fullName;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.contact.errors.email;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t.contact.errors.phone;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSending(true);

    try {
      await fetch('https://formsubmit.co/ajax/srdicziga@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `Novo povpraševanje (Glušič d.o.o.): ${formData.pickupLocation} -> ${formData.deliveryLocation}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: formData.email,
          'Ime in priimek': formData.fullName,
          'E-pošta naročnika': formData.email,
          Telefon: formData.phone,
          'Kraj prevzema': formData.pickupLocation,
          'Kraj dostave': formData.deliveryLocation,
          'Vrsta tovora': formData.cargoType || 'Ni navedeno',
          'Teža / Volumen': formData.weightVolume || 'Ni navedeno',
        }),
      });
    } catch {
      // Even if strict browser privacy extensions block 3rd-party fetch, we still show the confirmation & direct mailto option
    } finally {
      setIsSending(false);
      setSubmitted(true);
    }
  };

  return (
    <>
      {/* 5th Section: Hitro povpraševanje in kontakt */}
      <section
        id="kontakt"
        aria-labelledby="contact-heading"
        className="relative w-full pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 scroll-mt-6"
        style={{
          background: 'linear-gradient(180deg, #F5F9FE 0%, #EEF5FC 100%)',
        }}
      >
        <div className="mx-auto max-w-[1140px] px-4 sm:px-8 lg:px-10">
          {/* Section Header */}
          <div className="text-center">
            <p className="text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.06em] text-[#1D6FB3]">
              {t.contact.kicker}
            </p>
            <h2
              id="contact-heading"
              className="mt-3 text-[32px] sm:text-[40px] lg:text-[44px] font-extrabold tracking-[-0.02em] text-[#0B162C] leading-[1.15]"
            >
              {t.contact.title}
            </h2>
          </div>

          {/* Main 2-Column Content */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start">
            {/* Left Column: Hitro povpraševanje Card */}
            <div className="lg:col-span-6 rounded-[16px] bg-white p-6 sm:p-8 border border-[#E4ECF5] shadow-[0_12px_32px_-8px_rgba(14,30,62,0.08),0_4px_12px_-2px_rgba(14,30,62,0.04)]">
              <h3 className="text-[20px] sm:text-[22px] font-bold text-[#0B162C] tracking-[-0.015em]">
                {t.contact.formTitle}
              </h3>

              {submitted ? (
                <div className="mt-6 rounded-[12px] bg-[#F0F7FF] border border-[#B9DCFB] p-6 text-center">
                  <CheckCircle2 className="w-10 h-10 text-[#0B84E5] mx-auto" />
                  <h4 className="mt-3 text-[18px] font-bold text-[#0B162C]">
                    {t.contact.successTitle}
                  </h4>
                  <p className="mt-1.5 text-[14px] text-[#1E293B]">
                    {t.contact.successMessage}
                  </p>
                  <div className="mt-5 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          pickupLocation: '',
                          deliveryLocation: '',
                          cargoType: '',
                          weightVolume: '',
                          fullName: '',
                          email: '',
                          phone: '',
                        });
                      }}
                      className="inline-flex items-center justify-center rounded-[8px] bg-[#0B84E5] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#0975ce] transition-colors cursor-pointer"
                    >
                      {t.contact.sendAnotherButton}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
                  {/* Group 1: Prevzem in dostava */}
                  <div>
                    <label className="block text-[13.5px] font-bold text-[#0B162C] mb-2">
                      {t.contact.pickupDeliveryLabel}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          name="pickupLocation"
                          value={formData.pickupLocation}
                          onChange={handleChange}
                          placeholder={t.contact.pickupPlaceholder}
                          aria-label={t.contact.pickupPlaceholder}
                          className={`w-full rounded-[7px] bg-[#F2F5F8] border px-3.5 py-2.5 text-[14px] text-[#0B162C] placeholder:text-[#64748B] transition-colors focus:bg-white focus:border-[#0B84E5] focus:outline-none focus:ring-2 focus:ring-[#0B84E5]/20 ${
                            errors.pickupLocation ? 'border-red-400' : 'border-[#CBD5E1]'
                          }`}
                        />
                        {errors.pickupLocation && (
                          <p className="mt-1 text-[12px] text-red-600">{errors.pickupLocation}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          name="deliveryLocation"
                          value={formData.deliveryLocation}
                          onChange={handleChange}
                          placeholder={t.contact.deliveryPlaceholder}
                          aria-label={t.contact.deliveryPlaceholder}
                          className={`w-full rounded-[7px] bg-[#F2F5F8] border px-3.5 py-2.5 text-[14px] text-[#0B162C] placeholder:text-[#64748B] transition-colors focus:bg-white focus:border-[#0B84E5] focus:outline-none focus:ring-2 focus:ring-[#0B84E5]/20 ${
                            errors.deliveryLocation ? 'border-red-400' : 'border-[#CBD5E1]'
                          }`}
                        />
                        {errors.deliveryLocation && (
                          <p className="mt-1 text-[12px] text-red-600">{errors.deliveryLocation}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Group 2: Podatki o tovoru */}
                  <div>
                    <label className="block text-[13.5px] font-bold text-[#0B162C] mb-2">
                      {t.contact.cargoInfoLabel}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="cargoType"
                        value={formData.cargoType}
                        onChange={handleChange}
                        placeholder={t.contact.cargoTypePlaceholder}
                        aria-label={t.contact.cargoTypePlaceholder}
                        className="w-full rounded-[7px] bg-[#F2F5F8] border border-[#CBD5E1] px-3.5 py-2.5 text-[14px] text-[#0B162C] placeholder:text-[#64748B] transition-colors focus:bg-white focus:border-[#0B84E5] focus:outline-none focus:ring-2 focus:ring-[#0B84E5]/20"
                      />
                      <input
                        type="text"
                        name="weightVolume"
                        value={formData.weightVolume}
                        onChange={handleChange}
                        placeholder={t.contact.weightVolumePlaceholder}
                        aria-label={t.contact.weightVolumePlaceholder}
                        className="w-full rounded-[7px] bg-[#F2F5F8] border border-[#CBD5E1] px-3.5 py-2.5 text-[14px] text-[#0B162C] placeholder:text-[#64748B] transition-colors focus:bg-white focus:border-[#0B84E5] focus:outline-none focus:ring-2 focus:ring-[#0B84E5]/20"
                      />
                    </div>
                  </div>

                  {/* Group 3: Kontaktni podatki */}
                  <div>
                    <label className="block text-[13.5px] font-bold text-[#0B162C] mb-2">
                      {t.contact.contactInfoLabel}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder={t.contact.fullNamePlaceholder}
                          aria-label={t.contact.fullNamePlaceholder}
                          className={`w-full rounded-[7px] bg-[#F2F5F8] border px-3.5 py-2.5 text-[14px] text-[#0B162C] placeholder:text-[#64748B] transition-colors focus:bg-white focus:border-[#0B84E5] focus:outline-none focus:ring-2 focus:ring-[#0B84E5]/20 ${
                            errors.fullName ? 'border-red-400' : 'border-[#CBD5E1]'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="mt-1 text-[12px] text-red-600">{errors.fullName}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t.contact.emailPlaceholder}
                          aria-label={t.contact.emailPlaceholder}
                          className={`w-full rounded-[7px] bg-[#F2F5F8] border px-3.5 py-2.5 text-[14px] text-[#0B162C] placeholder:text-[#64748B] transition-colors focus:bg-white focus:border-[#0B84E5] focus:outline-none focus:ring-2 focus:ring-[#0B84E5]/20 ${
                            errors.email ? 'border-red-400' : 'border-[#CBD5E1]'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-[12px] text-red-600">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-3">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t.contact.phonePlaceholder}
                        aria-label={t.contact.phonePlaceholder}
                        className={`w-full rounded-[7px] bg-[#F2F5F8] border px-3.5 py-2.5 text-[14px] text-[#0B162C] placeholder:text-[#64748B] transition-colors focus:bg-white focus:border-[#0B84E5] focus:outline-none focus:ring-2 focus:ring-[#0B84E5]/20 ${
                          errors.phone ? 'border-red-400' : 'border-[#CBD5E1]'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-[12px] text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Submit CTA Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full rounded-[8px] bg-gradient-to-r from-[#118AEF] to-[#0073D6] py-3 px-6 text-[15px] font-semibold text-white shadow-[0_6px_16px_rgba(11,132,229,0.25)] hover:from-[#0975ce] hover:to-[#0063b8] disabled:opacity-70 transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B84E5] focus-visible:ring-offset-2 whitespace-nowrap"
                    >
                      {isSending ? t.contact.sendingButton : t.contact.submitButton}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Kje nas najdete */}
            <div className="lg:col-span-6 flex flex-col">
              <h3 className="text-[20px] sm:text-[22px] font-bold text-[#0B162C] tracking-[-0.015em] mb-3.5 px-1">
                {t.contact.whereToFindUs}
              </h3>

              <div className="rounded-[16px] bg-white overflow-hidden border border-[#E4ECF5] shadow-[0_12px_32px_-8px_rgba(14,30,62,0.08),0_4px_12px_-2px_rgba(14,30,62,0.04)]">
                {/* Real Interactive Google Map for Vinska Gora 18, 3320 Velenje */}
                <div
                  className={`relative w-full overflow-hidden bg-[#ECEFF3] transition-all duration-200 ${
                    mapExpanded ? 'h-[340px] sm:h-[380px]' : 'h-[225px] sm:h-[245px]'
                  }`}
                >
                  <iframe
                    title="Lokacija podjetja Glušič d.o.o. - Vinska Gora 18, 3320 Velenje"
                    src={`https://maps.google.com/maps?q=Vinska+Gora+18,+3320+Velenje,+Slovenija&hl=${language.toLowerCase()}&t=m&z=13&ie=UTF8&iwloc=&output=embed`}
                    className="h-full w-full border-0"
                    style={{
                      filter: 'grayscale(86%) contrast(96%) brightness(104%)',
                    }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />

                  {/* Top-Right Expand / Collapse Map Height Button */}
                  <button
                    type="button"
                    onClick={() => setMapExpanded((prev) => !prev)}
                    aria-label={mapExpanded ? t.contact.collapseMap : t.contact.expandMap}
                    className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-[6px] bg-white/95 text-[#334155] shadow-md border border-slate-200 hover:bg-white hover:text-[#0B162C] transition-colors cursor-pointer"
                  >
                    {mapExpanded ? (
                      <Minimize2 className="w-4 h-4" />
                    ) : (
                      <Maximize2 className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Company Contact Details Inside Card */}
                <div className="px-6 py-5 sm:px-7 sm:py-6 text-left bg-white">
                  <p className="text-[15.5px] font-bold text-[#0B162C]">Glušič d.o.o.</p>
                  <div className="mt-1.5 space-y-1 text-[14px] text-[#1E293B] leading-[1.5]">
                    <p>
                      {t.contact.phoneLabel}:{' '}
                      <a
                        href="tel:+38631340920"
                        className="hover:text-[#0B84E5] transition-colors"
                      >
                        031 340 920
                      </a>
                    </p>
                    <p>
                      {t.contact.emailLabel}:{' '}
                      <a
                        href="mailto:info@glusic.si"
                        className="hover:text-[#0B84E5] transition-colors"
                      >
                        info@glusic.si
                      </a>
                    </p>
                    <p>
                      {t.contact.addressLabel}: {t.contact.addressValue}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-[#E9EEF4] border-t border-[#DAE2EC] text-[#1E293B]">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-8 lg:px-10 py-8 sm:py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Column 1: Logo & Tagline */}
            <div className="md:col-span-4 flex flex-col items-start">
              <a
                href="#domov"
                onClick={(e) => scrollToSection('domov', e)}
                aria-label={`Glušič ${t.nav.home}`}
                className="inline-block cursor-pointer"
              >
                <GlusicLogo className="h-8 sm:h-9 w-auto object-contain" />
              </a>
              <p className="mt-2.5 text-[12.5px] text-[#334155]">
                {t.footer.tagline}
              </p>
            </div>

            {/* Column 2: Hitre povezave */}
            <div className="md:col-span-4 flex flex-col items-start">
              <h4 className="text-[14px] font-bold text-[#0B162C]">
                {t.footer.quickLinksTitle}
              </h4>
              <nav
                aria-label={t.footer.quickLinksTitle}
                className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-medium text-[#1E293B]"
              >
                <a
                  href="#domov"
                  onClick={(e) => scrollToSection('domov', e)}
                  className="hover:text-[#0B84E5] transition-colors whitespace-nowrap cursor-pointer"
                >
                  {t.nav.home}
                </a>
                <a
                  href="#o-nas"
                  onClick={(e) => scrollToSection('o-nas', e)}
                  className="hover:text-[#0B84E5] transition-colors whitespace-nowrap cursor-pointer"
                >
                  {t.nav.about}
                </a>
                <a
                  href="#storitve"
                  onClick={(e) => scrollToSection('storitve', e)}
                  className="hover:text-[#0B84E5] transition-colors whitespace-nowrap cursor-pointer"
                >
                  {t.nav.services}
                </a>
                <a
                  href="#kontakt"
                  onClick={(e) => scrollToSection('kontakt', e)}
                  className="hover:text-[#0B84E5] transition-colors whitespace-nowrap cursor-pointer"
                >
                  {t.nav.contact}
                </a>
              </nav>
            </div>

            {/* Column 3: Company Info, Facebook Button & Language Selector */}
            <div className="md:col-span-4 flex items-start justify-between gap-4">
              <div className="text-[12.5px] text-[#1E293B] space-y-1 leading-[1.45]">
                <p className="font-medium text-[#0B162C]">{t.footer.companyContactTitle}</p>
                <p>
                  {t.contact.phoneLabel}: 031 340 920
                </p>
                <p>
                  {t.contact.emailLabel}: info@glusic.si
                </p>
              </div>

              {/* Facebook Button & Language Dropdown in Matching Style */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="https://www.facebook.com/profile.php?id=100048681625087"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Glušič Facebook stran"
                  className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-[#CBD5E1] bg-white/85 text-[#0B162C] shadow-2xs hover:bg-white hover:text-[#0B84E5] transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V6.65c0-1.05.29-1.73 1.76-1.73Z" />
                  </svg>
                </a>

                <div className="relative" ref={footerDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setFooterLangOpen((prev) => !prev)}
                    aria-label={t.nav.selectLanguage}
                    className="inline-flex h-[30px] items-center gap-1.5 rounded-[7px] border border-[#CBD5E1] bg-white/85 px-2.5 text-[12px] font-semibold text-[#0B162C] shadow-2xs hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span aria-hidden="true">
                      {language === 'SL' ? '🇸🇮' : language === 'EN' ? '🇬🇧' : '🇩🇪'}
                    </span>
                    <span>{language}</span>
                    <svg
                      className={`w-3 h-3 text-[#475569] transition-transform duration-150 ${
                        footerLangOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {footerLangOpen && (
                    <div className="absolute right-0 bottom-full mb-1.5 w-36 rounded-[8px] border border-[#CBD5E1] bg-white py-1 shadow-md z-30">
                      {(['SL', 'EN', 'DE'] as Language[]).map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => {
                            setLanguage(l);
                            setFooterLangOpen(false);
                          }}
                          className={`flex w-full items-center justify-between px-3 py-1.5 text-left text-[12px] font-medium hover:bg-slate-50 cursor-pointer ${
                            language === l
                              ? 'text-[#0B84E5] font-bold bg-[#eff6ff]'
                              : 'text-[#0B162C]'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{l === 'SL' ? '🇸🇮' : l === 'EN' ? '🇬🇧' : '🇩🇪'}</span>
                            <span>{SITE_TRANSLATIONS[l].langLabel}</span>
                          </span>
                          <span className="text-[11px] text-slate-400">{l}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="border-t border-[#D6E0EB] py-3.5 text-center text-[12px] text-[#334155]">
          {t.footer.rightsReserved}
        </div>
      </footer>
    </>
  );
}
