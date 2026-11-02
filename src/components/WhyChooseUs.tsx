import React from 'react';
import { useLanguage } from '../i18n';

function ReliabilityShieldIcon() {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[68px] h-[68px]"
      aria-hidden="true"
    >
      {/* Rounded Square Outer Accent */}
      <rect
        x="10"
        y="10"
        width="52"
        height="52"
        rx="13"
        fill="#F4F9FE"
        stroke="#B3D4F2"
        strokeWidth="2.2"
      />
      {/* Shield Body */}
      <path
        d="M36 18.5L50.5 24V35.2C50.5 45.2 44.1 52.8 36 56C27.9 52.8 21.5 45.2 21.5 35.2V24L36 18.5Z"
        fill="#E2F0FB"
        stroke="#73AED9"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Checkmark inside Shield */}
      <path
        d="M30 36.8L34.2 41L42.5 32.5"
        stroke="#73AED9"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ResponsivenessTruckIcon() {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[68px] h-[68px]"
      aria-hidden="true"
    >
      {/* Rounded Square Outer Accent */}
      <rect
        x="10"
        y="10"
        width="52"
        height="52"
        rx="13"
        fill="#F4F9FE"
        stroke="#B3D4F2"
        strokeWidth="2.2"
      />
      {/* Speed / Motion Lines */}
      <path
        d="M16.5 29H24.5"
        stroke="#73AED9"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M14.5 35H24.5"
        stroke="#73AED9"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M17.5 41H24.5"
        stroke="#73AED9"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Cargo Box */}
      <path
        d="M25 25.5H43.5V45H25V25.5Z"
        fill="#E2F0FB"
        stroke="#73AED9"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Truck Cab */}
      <path
        d="M43.5 31.5H50.8L55.5 38.2V45H43.5V31.5Z"
        fill="#E2F0FB"
        stroke="#73AED9"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cab Window */}
      <path
        d="M46.8 34.8H50.2L52.6 38.5H46.8V34.8Z"
        fill="#FFFFFF"
        stroke="#73AED9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wheels */}
      <circle
        cx="32"
        cy="46.5"
        r="4.2"
        fill="#FFFFFF"
        stroke="#73AED9"
        strokeWidth="2.5"
      />
      <circle
        cx="49.5"
        cy="46.5"
        r="4.2"
        fill="#FFFFFF"
        stroke="#73AED9"
        strokeWidth="2.5"
      />
    </svg>
  );
}

function ProfessionalismIcon() {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[68px] h-[68px]"
      aria-hidden="true"
    >
      {/* Rounded Square Outer Accent */}
      <rect
        x="10"
        y="10"
        width="52"
        height="52"
        rx="13"
        fill="#F4F9FE"
        stroke="#B3D4F2"
        strokeWidth="2.2"
      />
      {/* Head */}
      <circle
        cx="36"
        cy="26.5"
        r="7.5"
        fill="#E2F0FB"
        stroke="#73AED9"
        strokeWidth="2.6"
      />
      {/* Shoulders & Suit Jacket */}
      <path
        d="M21.5 52.5V48.5C21.5 41.8 26.8 37.5 36 37.5C45.2 37.5 50.5 41.8 50.5 48.5V52.5"
        fill="#E2F0FB"
        stroke="#73AED9"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Collar / Tie V-Neck */}
      <path
        d="M31.5 38L36 44L40.5 38"
        stroke="#73AED9"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tie */}
      <path
        d="M36 44L33.8 50.5L36 53.5L38.2 50.5L36 44Z"
        fill="#FFFFFF"
        stroke="#73AED9"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CargoCareIcon() {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[68px] h-[68px]"
      aria-hidden="true"
    >
      {/* Rounded Square Outer Accent */}
      <rect
        x="10"
        y="10"
        width="52"
        height="52"
        rx="13"
        fill="#F4F9FE"
        stroke="#B3D4F2"
        strokeWidth="2.2"
      />
      {/* 3D Isometric Cargo Box */}
      <path
        d="M36 18.5L46.5 24V35L36 40.5L25.5 35V24L36 18.5Z"
        fill="#E2F0FB"
        stroke="#73AED9"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Box Inner Edges */}
      <path
        d="M25.5 24L36 29.5L46.5 24"
        stroke="#73AED9"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 29.5V40.5"
        stroke="#73AED9"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left Caring Hand */}
      <path
        d="M18.5 35.5V45.5C18.5 47.8 20.2 49.8 22.5 50.5L31.5 53.2V48.5L24.8 44.5C23.5 43.8 23 42.2 23.5 40.8L21.5 35.5C20.2 34.5 18.5 34.8 18.5 35.5Z"
        fill="#E2F0FB"
        stroke="#73AED9"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Caring Hand */}
      <path
        d="M53.5 35.5V45.5C53.5 47.8 51.8 49.8 49.5 50.5L40.5 53.2V48.5L47.2 44.5C48.5 43.8 49 42.2 48.5 40.8L50.5 35.5C51.8 34.5 53.5 34.8 53.5 35.5Z"
        fill="#E2F0FB"
        stroke="#73AED9"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const features = [
    {
      id: 'zanesljivost',
      title: t.whyChooseUs.features.reliabilityTitle,
      description: t.whyChooseUs.features.reliabilityDesc,
      Icon: ReliabilityShieldIcon,
    },
    {
      id: 'odzivnost',
      title: t.whyChooseUs.features.responsivenessTitle,
      description: t.whyChooseUs.features.responsivenessDesc,
      Icon: ResponsivenessTruckIcon,
    },
    {
      id: 'profesionalnost',
      title: t.whyChooseUs.features.professionalismTitle,
      description: t.whyChooseUs.features.professionalismDesc,
      Icon: ProfessionalismIcon,
    },
    {
      id: 'skrb-za-tovor',
      title: t.whyChooseUs.features.cargoCareTitle,
      description: t.whyChooseUs.features.cargoCareDesc,
      Icon: CargoCareIcon,
    },
  ];

  const stats = [
    {
      id: 'experience',
      value: '10+',
      label: t.whyChooseUs.stats.experience,
    },
    {
      id: 'accuracy',
      value: '100 %',
      label: t.whyChooseUs.stats.accuracy,
    },
    {
      id: 'clients',
      value: '1000+',
      label: t.whyChooseUs.stats.clients,
    },
  ];

  return (
    <section
      id="o-nas"
      aria-labelledby="why-choose-us-heading"
      className="relative w-full py-20 sm:py-24 lg:py-28 scroll-mt-6"
      style={{
        background: 'linear-gradient(180deg, #F6FAFF 0%, #EDF5FC 100%)',
      }}
    >
      <div className="mx-auto max-w-[1120px] px-4 sm:px-8 lg:px-10">
        {/* Section Header & Editorial Story */}
        <div className="text-center">
          <p className="text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.06em] text-[#1D6FB3]">
            {t.whyChooseUs.kicker}
          </p>
          <h2
            id="why-choose-us-heading"
            className="mt-3 text-[32px] sm:text-[40px] lg:text-[44px] font-extrabold tracking-[-0.02em] text-[#0B162C] leading-[1.15]"
          >
            {t.whyChooseUs.title}
          </h2>

          {/* Editorial Text Block */}
          <div className="mx-auto mt-6 sm:mt-7 max-w-[780px] text-center">
            <p className="text-[16.5px] sm:text-[18px] font-medium text-[#13223E] leading-[1.65] [text-wrap:balance]">
              {t.whyChooseUs.introParagraph1}
            </p>

            <p className="mt-4 text-[15.5px] sm:text-[16.5px] font-normal text-[#2B374B] leading-[1.68] [text-wrap:pretty]">
              {t.whyChooseUs.introParagraph2}
            </p>
          </div>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="mt-11 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {features.map(({ id, title, description, Icon }) => (
            <div
              key={id}
              className="flex flex-col items-center text-center rounded-[16px] bg-white px-6 py-9 sm:px-6 sm:py-10 shadow-[0_12px_32px_-8px_rgba(14,30,62,0.07),0_4px_12px_-2px_rgba(14,30,62,0.03)] border border-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              {/* Duotone Icon */}
              <div className="flex items-center justify-center">
                <Icon />
              </div>

              {/* Heading */}
              <h3 className="mt-5 text-[19px] sm:text-[20px] font-bold text-[#0B162C] leading-[1.28] tracking-[-0.01em]">
                {title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-[14.5px] sm:text-[15px] font-normal text-[#253146] leading-[1.6] max-w-[240px]">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Statistics Module Below Feature Cards */}
        <div className="mt-6 sm:mt-8 rounded-[16px] bg-white border border-[#E4ECF5] shadow-[0_12px_32px_-8px_rgba(14,30,62,0.08),0_4px_12px_-2px_rgba(14,30,62,0.03)] px-6 py-6 sm:py-7">
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className={`relative flex flex-col items-center justify-center text-center py-4 sm:py-1.5 ${
                  index !== 0
                    ? 'border-t border-[#E8EEF4] sm:border-t-0 sm:border-l sm:border-[#E6ECF2]'
                    : ''
                }`}
              >
                <span className="text-[32px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#0B162C] leading-[1.1] tracking-[-0.02em] tabular-nums">
                  {stat.value}
                </span>
                <span className="mt-1.5 text-[15px] sm:text-[16px] font-normal text-[#6E7683]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
