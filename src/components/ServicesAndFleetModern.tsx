import React, { useState } from 'react';
import { useLanguage } from '../i18n';

export default function ServicesAndFleetModern() {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string>('specialni-prevozi-v2');

  const services = [
    {
      id: 'spremstvo-v2',
      code: '01',
      shortTag: t.servicesAndFleet.items.escort.shortTag,
      title: t.servicesAndFleet.items.escort.title,
      description: t.servicesAndFleet.items.escort.description,
      image: '/assets/aistudio/service_hd_1.jpg',
      alt: `01 / ${t.servicesAndFleet.items.escort.title}`,
    },
    {
      id: 'izredni-prevoz-v2',
      code: '02',
      shortTag: t.servicesAndFleet.items.exceptional.shortTag,
      title: t.servicesAndFleet.items.exceptional.title,
      description: t.servicesAndFleet.items.exceptional.description,
      image: '/assets/aistudio/service_hd_2.jpg',
      alt: `02 / ${t.servicesAndFleet.items.exceptional.title}`,
    },
    {
      id: 'kontejnerski-prevozi-v2',
      code: '03',
      shortTag: t.servicesAndFleet.items.containers.shortTag,
      title: t.servicesAndFleet.items.containers.title,
      description: t.servicesAndFleet.items.containers.description,
      image: '/assets/aistudio/service_hd_3.jpg',
      alt: `03 / ${t.servicesAndFleet.items.containers.title}`,
    },
    {
      id: 'specialni-prevozi-v2',
      code: '04',
      shortTag: t.servicesAndFleet.items.special.shortTag,
      title: t.servicesAndFleet.items.special.title,
      description: t.servicesAndFleet.items.special.description,
      image: '/assets/aistudio/service_hd_4.jpg',
      alt: `04 / ${t.servicesAndFleet.items.special.title}`,
    },
    {
      id: 'prevozi-gradbene-mehanizacije-v2',
      code: '05',
      shortTag: t.servicesAndFleet.items.machinery.shortTag,
      title: t.servicesAndFleet.items.machinery.title,
      description: t.servicesAndFleet.items.machinery.description,
      image: '/assets/aistudio/service_hd_5.jpg',
      alt: `05 / ${t.servicesAndFleet.items.machinery.title}`,
    },
  ];

  return (
    <section
      id="storitve"
      aria-labelledby="services-fleet-modern-heading"
      className="relative w-full py-20 sm:py-24 lg:py-28 scroll-mt-6"
      style={{
        background: 'linear-gradient(180deg, #EDF5FC 0%, #F5F9FE 100%)',
      }}
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-[980px] mx-auto">
          <p className="text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.06em] text-[#1D6FB3]">
            {t.servicesAndFleet.kicker}
          </p>
          <h2
            id="services-fleet-modern-heading"
            className="mx-auto mt-3 max-w-[680px] text-[28px] sm:text-[36px] lg:text-[42px] xl:text-[44px] font-extrabold tracking-[-0.02em] text-[#0B162C] leading-[1.18] [text-wrap:balance]"
          >
            {t.servicesAndFleet.title}
          </h2>
        </div>

      </div>

      {/* 5 Modules Row Stretched to 90% of the Page Width */}
      <div
        id="vozni-park"
        className="mx-auto mt-12 sm:mt-14 scroll-mt-24 w-[90%] max-w-[90vw]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 xl:gap-7 items-stretch">
          {services.map((service) => {
            return (
              <article
                key={`${service.id}-wide`}
                onClick={() => setSelectedId(`${service.id}-wide`)}
                className="group flex flex-col rounded-[20px] bg-white p-2.5 sm:p-3.5 border border-[#E2ECF6] shadow-[0_14px_34px_-8px_rgba(14,30,62,0.09),0_4px_14px_-3px_rgba(14,30,62,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_42px_-8px_rgba(14,30,62,0.13)] cursor-pointer"
              >
                {/* Framed High-Resolution Inner Image + Real Top-Left Button */}
                <div className="relative w-full aspect-[450/547] overflow-hidden rounded-[14px] bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    draggable={false}
                  />

                  {/* Real Interactive Top-Left Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(`${service.id}-wide`);
                    }}
                    className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-4 py-1.5 text-[13px] font-bold tracking-[-0.01em] text-[#0B162C] shadow-[0_4px_12px_rgba(11,22,44,0.14)] hover:bg-[#1D74B8] hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D74B8]"
                  >
                    <span className="tabular-nums">{service.code}</span>
                    <span className="opacity-60">/</span>
                    <span>{service.shortTag}</span>
                  </button>
                </div>

                {/* Left-Aligned Text Content */}
                <div className="flex flex-1 flex-col text-left px-2.5 xl:px-3 pt-5 pb-4">
                  <h3 className="text-[19px] xl:text-[21px] font-bold text-[#0B162C] leading-[1.24] tracking-[-0.015em]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[14px] xl:text-[15px] font-normal text-[#2B3648] leading-[1.52]">
                    {service.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
