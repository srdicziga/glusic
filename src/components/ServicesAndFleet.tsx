import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  badge: string;
  title: string;
  multilineTitle?: [string, string];
  description: string;
  image: string;
  objectPosition: string;
  alt: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'spremstvo',
    badge: '01 / Spremstvo',
    title: 'Spremstvo',
    description:
      'Varno in strokovno spremstvo za vse vrste izrednih prevozov s prepoznavnimi vozili in izkušeno ekipo.',
    image: '/assets/aistudio/service_card_1.jpg',
    objectPosition: 'object-[center_72%]',
    alt: 'Spremstvo izrednih prevozov Glušič',
  },
  {
    id: 'izredni-prevoz',
    badge: '02 / Izredni',
    title: 'Izredni prevoz',
    description:
      'Zanesljiva izvedba najzahtevnejših prevozov izrednih in predimenzioniranih tovorov z načrtovanjem poti.',
    image: '/assets/aistudio/service_card_2.jpg',
    objectPosition: 'object-[center_76%]',
    alt: 'Izredni prevoz avtobusa s tovornim vozilom Glušič',
  },
  {
    id: 'kontejnerski-prevozi',
    badge: '03 / Kontejnerski',
    title: 'Kontejnerski prevozi',
    description:
      'Hitri in varni prevozi vseh vrst ladijskih in industrijskih kontejnerjev z ustrezno opremo.',
    image: '/assets/aistudio/service_card_3.jpg',
    objectPosition: 'object-[center_66%]',
    alt: 'Kontejnerski prevozi MAN Glušič',
  },
  {
    id: 'specialni-prevozi',
    badge: '04 / Specialni',
    title: 'Specialni prevozi',
    description:
      'Prevoz specifičnih tovorov in težke industrijske opreme z visoko stopnjo strokovnosti in prilagodljivosti.',
    image: '/assets/aistudio/service_card_4.jpg',
    objectPosition: 'object-[center_72%]',
    alt: 'Specialni prevozi težke industrijske opreme Glušič',
  },
  {
    id: 'prevozi-gradbene-mehanizacije',
    badge: '05 / Mehanizacija',
    title: 'Prevozi gradbene mehanizacije',
    multilineTitle: ['Prevozi gradbene', 'mehanizacije'],
    description:
      'Zanesljivi prevozi gradbenih strojev, bagrov in ostale težke mehanizacije na lokacijo.',
    image: '/assets/aistudio/service_card_5.jpg',
    objectPosition: 'object-[center_74%]',
    alt: 'Prevozi gradbene mehanizacije in bagrov Glušič',
  },
];

export default function ServicesAndFleet() {
  const [activeBentoId, setActiveBentoId] = useState<string>('specialni-prevozi');

  const topRowServices = SERVICES.slice(0, 3);
  const bottomRowServices = SERVICES.slice(3, 5);

  return (
    <section
      id="storitve"
      aria-labelledby="services-fleet-heading"
      className="relative w-full py-20 sm:py-24 lg:py-28"
      style={{
        background: 'linear-gradient(180deg, #EDF5FC 0%, #F5F8FC 40%, #F0F5FA 100%)',
      }}
    >
      {/* Anchor target for Vozni park nav link */}
      <div id="vozni-park" className="absolute -top-12" aria-hidden="true" />

      <div className="mx-auto max-w-[1380px] px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto">
          <p className="text-[13.5px] sm:text-[15px] font-medium uppercase tracking-[0.04em] text-[#4E6785]">
            NAŠE STORITVE IN VOZNI PARK
          </p>
          <h2
            id="services-fleet-heading"
            className="mt-2.5 text-[30px] sm:text-[38px] lg:text-[44px] font-extrabold tracking-[-0.02em] text-[#0B162C] leading-[1.18]"
          >
            <span className="block">Celovite logistične rešitve</span>
            <span className="block">in sodoben vozni park</span>
          </h2>
        </div>

        {/* Module 1: 5 Vertical Cards in a Row */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 xl:gap-6 items-stretch">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="group flex flex-col overflow-hidden rounded-[18px] bg-white border border-slate-200/60 shadow-[0_14px_34px_-10px_rgba(14,30,62,0.09),0_4px_14px_-4px_rgba(14,30,62,0.04)] transition-transform duration-200 hover:-translate-y-1"
            >
              {/* Card Image */}
              <div className="relative w-full aspect-[450/547] overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                  draggable={false}
                />
              </div>

              {/* Card Text Content */}
              <div className="flex flex-1 flex-col items-center text-center px-4 xl:px-5 pt-6 pb-7">
                <h3 className="text-[19px] xl:text-[20px] font-bold text-[#0B162C] leading-[1.24] tracking-[-0.015em]">
                  {service.title}
                </h3>
                <p className="mt-3 text-[13.5px] xl:text-[14px] font-normal text-[#1E293B] leading-[1.46]">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Module 2: Asymmetric Bento Grid (3 Top + 2 Bottom) */}
        <div className="mt-16 sm:mt-20 space-y-4 sm:space-y-5">
          {/* Top Row: 3 Equal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {topRowServices.map((service) => {
              const isSelected = activeBentoId === service.id;
              return (
                <article
                  key={`bento-${service.id}`}
                  onMouseEnter={() => setActiveBentoId(service.id)}
                  onClick={() => setActiveBentoId(service.id)}
                  className={`group relative h-[240px] sm:h-[255px] lg:h-[270px] overflow-hidden rounded-[16px] cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'ring-2 ring-[#1D74C6] shadow-[0_14px_32px_-8px_rgba(29,116,198,0.22)]'
                      : 'ring-1 ring-black/5 shadow-[0_10px_26px_-8px_rgba(14,30,62,0.12)]'
                  }`}
                >
                  {/* Background Photo */}
                  <img
                    src={service.image}
                    alt={service.alt}
                    className={`h-full w-full object-cover ${service.objectPosition} transition-transform duration-300 group-hover:scale-[1.03] select-none`}
                    loading="lazy"
                    draggable={false}
                  />

                  {/* Dark Bottom Contrast Scrim */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(10,18,34,0.02) 0%, rgba(10,18,34,0.22) 38%, rgba(8,14,26,0.82) 78%, rgba(6,11,22,0.94) 100%)',
                    }}
                  />

                  {/* Top-Left Numbered Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-1 text-[12px] sm:text-[12.5px] font-semibold text-[#13203B] shadow-sm">
                      {service.badge}
                    </span>
                  </div>

                  {/* Top-Right Arrow Indicator when active/hovered */}
                  <div
                    className={`absolute top-4 right-4 z-10 transition-opacity duration-150 ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4 text-[#1673C8] stroke-[2.4]" />
                  </div>

                  {/* Bottom-Left Overlay Content */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                    <h3 className="inline-flex items-center gap-1.5 text-[21px] sm:text-[23px] font-bold text-white leading-[1.2] tracking-[-0.01em]">
                      <span>{service.title}</span>
                      {isSelected && (
                        <ArrowUpRight className="w-4 h-4 text-[#2884DC] stroke-[2.5] shrink-0" />
                      )}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] sm:text-[13.5px] font-normal text-white/90 leading-[1.45] max-w-[380px]">
                      {service.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom Row: 2 Asymmetric Cards (5 cols + 7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
            {bottomRowServices.map((service, index) => {
              const isSelected = activeBentoId === service.id;
              const colSpanClass =
                index === 0 ? 'lg:col-span-5' : 'lg:col-span-7';

              return (
                <article
                  key={`bento-${service.id}`}
                  onMouseEnter={() => setActiveBentoId(service.id)}
                  onClick={() => setActiveBentoId(service.id)}
                  className={`${colSpanClass} group relative h-[245px] sm:h-[265px] lg:h-[280px] overflow-hidden rounded-[16px] cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'ring-2 ring-[#1D74C6] shadow-[0_14px_32px_-8px_rgba(29,116,198,0.22)]'
                      : 'ring-1 ring-black/5 shadow-[0_10px_26px_-8px_rgba(14,30,62,0.12)]'
                  }`}
                >
                  {/* Background Photo */}
                  <img
                    src={service.image}
                    alt={service.alt}
                    className={`h-full w-full object-cover ${service.objectPosition} transition-transform duration-300 group-hover:scale-[1.03] select-none`}
                    loading="lazy"
                    draggable={false}
                  />

                  {/* Dark Bottom/Left Contrast Scrim */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        index === 1
                          ? 'linear-gradient(90deg, rgba(6,11,22,0.88) 0%, rgba(8,14,26,0.58) 42%, rgba(10,18,34,0.12) 75%, rgba(10,18,34,0.04) 100%), linear-gradient(180deg, rgba(10,18,34,0.02) 0%, rgba(10,18,34,0.25) 45%, rgba(6,11,22,0.88) 100%)'
                          : 'linear-gradient(180deg, rgba(10,18,34,0.02) 0%, rgba(10,18,34,0.22) 38%, rgba(8,14,26,0.84) 78%, rgba(6,11,22,0.95) 100%)',
                    }}
                  />

                  {/* Top-Left Numbered Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-1 text-[12px] sm:text-[12.5px] font-semibold text-[#13203B] shadow-sm">
                      {service.badge}
                    </span>
                  </div>

                  {/* Top-Right Arrow Indicator when active/hovered */}
                  <div
                    className={`absolute top-4 right-4 z-10 transition-opacity duration-150 ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4 text-[#1673C8] stroke-[2.4]" />
                  </div>

                  {/* Bottom-Left Overlay Content */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                    {service.multilineTitle ? (
                      <h3 className="text-[21px] sm:text-[23px] font-bold text-white leading-[1.18] tracking-[-0.01em]">
                        <span className="block">{service.multilineTitle[0]}</span>
                        <span className="inline-flex items-center gap-1.5">
                          <span>{service.multilineTitle[1]}</span>
                          {isSelected && (
                            <ArrowUpRight className="w-4 h-4 text-[#2884DC] stroke-[2.5] shrink-0" />
                          )}
                        </span>
                      </h3>
                    ) : (
                      <h3 className="inline-flex items-center gap-1.5 text-[21px] sm:text-[23px] font-bold text-white leading-[1.2] tracking-[-0.01em]">
                        <span>{service.title}</span>
                        {isSelected && (
                          <ArrowUpRight className="w-4 h-4 text-[#2884DC] stroke-[2.5] shrink-0" />
                        )}
                      </h3>
                    )}
                    <p
                      className={`mt-1.5 text-[12.5px] sm:text-[13.5px] font-normal text-white/90 leading-[1.45] ${
                        index === 1 ? 'max-w-[260px] sm:max-w-[300px]' : 'max-w-[400px]'
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
