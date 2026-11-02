import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'SL' | 'EN' | 'DE';

export interface SiteTranslations {
  langLabel: string;
  nav: {
    home: string;
    about: string;
    services: string;
    fleet: string;
    contact: string;
    openMenu: string;
    selectLanguage: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    imageAlt: string;
  };
  whyChooseUs: {
    kicker: string;
    title: string;
    introParagraph1: string;
    introParagraph2: string;
    features: {
      reliabilityTitle: string;
      reliabilityDesc: string;
      responsivenessTitle: string;
      responsivenessDesc: string;
      professionalismTitle: string;
      professionalismDesc: string;
      cargoCareTitle: string;
      cargoCareDesc: string;
    };
    stats: {
      experience: string;
      accuracy: string;
      clients: string;
    };
  };
  servicesAndFleet: {
    kicker: string;
    title: string;
    items: {
      escort: {
        shortTag: string;
        title: string;
        description: string;
      };
      exceptional: {
        shortTag: string;
        title: string;
        description: string;
      };
      containers: {
        shortTag: string;
        title: string;
        description: string;
      };
      special: {
        shortTag: string;
        title: string;
        description: string;
      };
      machinery: {
        shortTag: string;
        title: string;
        description: string;
      };
    };
  };
  contact: {
    kicker: string;
    title: string;
    formTitle: string;
    pickupDeliveryLabel: string;
    pickupPlaceholder: string;
    deliveryPlaceholder: string;
    cargoInfoLabel: string;
    cargoTypePlaceholder: string;
    weightVolumePlaceholder: string;
    contactInfoLabel: string;
    fullNamePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    submitButton: string;
    sendingButton: string;
    successTitle: string;
    successMessage: string;
    activationNote: string;
    directMailtoLabel: string;
    sendAnotherButton: string;
    errors: {
      pickup: string;
      delivery: string;
      fullName: string;
      email: string;
      phone: string;
    };
    whereToFindUs: string;
    expandMap: string;
    collapseMap: string;
    phoneLabel: string;
    emailLabel: string;
    addressLabel: string;
    addressValue: string;
  };
  footer: {
    tagline: string;
    quickLinksTitle: string;
    companyContactTitle: string;
    rightsReserved: string;
  };
}

export const SITE_TRANSLATIONS: Record<Language, SiteTranslations> = {
  SL: {
    langLabel: 'Slovenščina',
    nav: {
      home: 'Domov',
      about: 'O nas',
      services: 'Storitve',
      fleet: 'Vozni park',
      contact: 'Kontakt',
      openMenu: 'Odpri meni',
      selectLanguage: 'Izberi jezik',
    },
    hero: {
      title: 'Specialisti za izredne in zahtevne prevoze',
      subtitle:
        'Zanesljiv transport predimenzioniranih tovorov, gradbene mehanizacije in industrijskih konstrukcij – varno, strokovno in točno.',
      ctaPrimary: 'Kontaktirajte nas',
      ctaSecondary: 'Naše storitve',
      imageAlt: 'Tovorno vozilo MAN Prevozništvo Glušič',
    },
    whyChooseUs: {
      kicker: 'O NAS',
      title: 'Zakaj izbrati nas?',
      introParagraph1:
        'Pri prevozništvu Glušič verjamemo, da dober transport pomeni več kot le premik tovora. Pomeni zanesljivost, odzivnost in odgovornost od prevzema do dostave.',
      introParagraph2:
        'Smo transportno podjetje iz Vinske Gore pri Velenju, specializirano za cestni tovorni promet. Od leta 2014 gradimo dolgoročne odnose s poslovnimi partnerji, ki cenijo korekten dogovor, prilagodljivost in zanesljivo izvedbo.',
      features: {
        reliabilityTitle: 'Zanesljivost',
        reliabilityDesc: 'Držimo se dogovorov in prevzemamo odgovornost.',
        responsivenessTitle: 'Odzivnost',
        responsivenessDesc: 'Hitro se odzivamo na vaše potrebe.',
        professionalismTitle: 'Profesionalnost',
        professionalismDesc: 'Vsak prevoz obravnavamo resno in odgovorno.',
        cargoCareTitle: 'Skrb za tovor',
        cargoCareDesc: 'Skrbimo, da vaš tovor varno prispe na cilj.',
      },
      stats: {
        experience: 'let izkušenj',
        accuracy: 'točnost dostav',
        clients: 'zadovoljnih strank',
      },
    },
    servicesAndFleet: {
      kicker: 'NAŠE STORITVE IN VOZNI PARK',
      title: 'Celovite logistične rešitve in sodoben vozni park',
      items: {
        escort: {
          shortTag: 'Spremstvo',
          title: 'Spremstvo',
          description:
            'Varno in strokovno spremstvo za vse vrste izrednih prevozov s prepoznavnimi vozili in izkušeno ekipo.',
        },
        exceptional: {
          shortTag: 'Izredni',
          title: 'Izredni prevoz',
          description:
            'Zanesljiva izvedba najzahtevnejših prevozov izrednih in predimenzioniranih tovorov z načrtovanjem poti.',
        },
        containers: {
          shortTag: 'Kontejnerski',
          title: 'Kontejnerski prevozi',
          description:
            'Hitri in varni prevozi vseh vrst ladijskih in industrijskih kontejnerjev z ustrezno opremo.',
        },
        special: {
          shortTag: 'Specialni',
          title: 'Specialni prevozi',
          description:
            'Prevoz specifičnih tovorov in težke industrijske opreme z visoko stopnjo strokovnosti in prilagodljivosti.',
        },
        machinery: {
          shortTag: 'Mehanizacija',
          title: 'Prevozi gradbene mehanizacije',
          description:
            'Zanesljivi prevozi gradbenih strojev, bagrov in ostale težke mehanizacije na lokacijo.',
        },
      },
    },
    contact: {
      kicker: 'HITRO POVPRAŠEVANJE IN KONTAKT',
      title: 'Stopite v stik z nami',
      formTitle: 'Hitro povpraševanje',
      pickupDeliveryLabel: 'Prevzem in dostava',
      pickupPlaceholder: 'Kraj prevzema',
      deliveryPlaceholder: 'Kraj dostave',
      cargoInfoLabel: 'Podatki o tovoru',
      cargoTypePlaceholder: 'Vrsta tovora',
      weightVolumePlaceholder: 'Teža/Volumen',
      contactInfoLabel: 'Kontaktni podatki',
      fullNamePlaceholder: 'Ime in priimek',
      emailPlaceholder: 'E-pošta',
      phonePlaceholder: 'Telefon',
      submitButton: 'Pošlji povpraševanje',
      sendingButton: 'Pošiljanje povpraševanja ...',
      successTitle: 'Povpraševanje je bilo uspešno poslano',
      successMessage:
        'Hvala za vaše sporočilo. Naša ekipa vas bo kontaktirala v najkrajšem možnem času.',
      activationNote: '',
      directMailtoLabel: '',
      sendAnotherButton: 'Pošlji novo povpraševanje',
      errors: {
        pickup: 'Vnesite kraj prevzema',
        delivery: 'Vnesite kraj dostave',
        fullName: 'Vnesite ime in priimek',
        email: 'Vnesite veljaven e-poštni naslov',
        phone: 'Vnesite telefonsko številko',
      },
      whereToFindUs: 'Kje nas najdete',
      expandMap: 'Povečaj zemljevid',
      collapseMap: 'Zmanjšaj zemljevid',
      phoneLabel: 'Telefon',
      emailLabel: 'E-pošta',
      addressLabel: 'Naslov',
      addressValue: 'Vinska Gora 18, 3320 Velenje, Slovenija',
    },
    footer: {
      tagline:
        'Specialisti za izredne in zahtevne prevoze ter prevoz gradbene mehanizacije.',
      quickLinksTitle: 'Hitre povezave',
      companyContactTitle: 'Glušič d.o.o. / Kontakt',
      rightsReserved: '© 2026 Glušič d.o.o. Vse pravice pridržane.',
    },
  },
  EN: {
    langLabel: 'English',
    nav: {
      home: 'Home',
      about: 'About us',
      services: 'Services',
      fleet: 'Fleet',
      contact: 'Contact',
      openMenu: 'Open menu',
      selectLanguage: 'Select language',
    },
    hero: {
      title: 'Specialists in Exceptional and Demanding Transport',
      subtitle:
        'Reliable transport of oversized cargo, construction machinery, and industrial structures – safe, professional, and on time.',
      ctaPrimary: 'Send Inquiry',
      ctaSecondary: 'Our Services',
      imageAlt: 'MAN Heavy Transport Truck Glušič',
    },
    whyChooseUs: {
      kicker: 'ABOUT US',
      title: 'Why choose us?',
      introParagraph1:
        'At Glušič Transport, we believe great logistics means more than simply moving cargo. It means reliability, responsiveness, and full responsibility from pickup to final delivery.',
      introParagraph2:
        'We are a transport company based in Vinska Gora near Velenje, specializing in road freight transport. Since 2014, we have been building long-term partnerships with businesses that value fair agreements, flexibility, and dependable execution.',
      features: {
        reliabilityTitle: 'Reliability',
        reliabilityDesc: 'We keep our agreements and take full responsibility.',
        responsivenessTitle: 'Responsiveness',
        responsivenessDesc: 'We respond quickly to your needs.',
        professionalismTitle: 'Professionalism',
        professionalismDesc: 'We treat every transport seriously and responsibly.',
        cargoCareTitle: 'Cargo care',
        cargoCareDesc: 'We make sure your cargo arrives safely at its destination.',
      },
      stats: {
        experience: 'years of experience',
        accuracy: 'on-time deliveries',
        clients: 'satisfied clients',
      },
    },
    servicesAndFleet: {
      kicker: 'OUR SERVICES AND FLEET',
      title: 'Comprehensive logistics solutions and a modern fleet',
      items: {
        escort: {
          shortTag: 'Escort',
          title: 'Escort Services',
          description:
            'Safe and professional escort for all types of exceptional transport with marked escort vehicles and an experienced crew.',
        },
        exceptional: {
          shortTag: 'Exceptional',
          title: 'Exceptional Transport',
          description:
            'Reliable execution of the most demanding oversized and heavy cargo transports with complete route planning.',
        },
        containers: {
          shortTag: 'Containers',
          title: 'Container Transport',
          description:
            'Fast and safe transport of all types of maritime and industrial containers with specialized equipment.',
        },
        special: {
          shortTag: 'Special',
          title: 'Special Transport',
          description:
            'Transport of custom cargo and heavy industrial equipment with a high degree of expertise and adaptability.',
        },
        machinery: {
          shortTag: 'Machinery',
          title: 'Construction Machinery',
          description:
            'Dependable transport of construction machines, excavators, and heavy equipment directly to your site.',
        },
      },
    },
    contact: {
      kicker: 'QUICK INQUIRY AND CONTACT',
      title: 'Get in touch with us',
      formTitle: 'Quick Inquiry',
      pickupDeliveryLabel: 'Pickup and delivery',
      pickupPlaceholder: 'Pickup location',
      deliveryPlaceholder: 'Delivery location',
      cargoInfoLabel: 'Cargo details',
      cargoTypePlaceholder: 'Cargo type',
      weightVolumePlaceholder: 'Weight/Volume',
      contactInfoLabel: 'Contact details',
      fullNamePlaceholder: 'Full name',
      emailPlaceholder: 'Email address',
      phonePlaceholder: 'Phone number',
      submitButton: 'Send Inquiry',
      sendingButton: 'Sending inquiry ...',
      successTitle: 'Your inquiry has been sent successfully',
      successMessage:
        'Your inquiry details have been sent to the test email address srdicziga@gmail.com.',
      activationNote:
        'First-time test note: Please check the inbox of srdicziga@gmail.com (including Spam/Promotions) and click "Activate Form" on the first submission so all future inquiries arrive automatically.',
      directMailtoLabel: 'Open in email client',
      sendAnotherButton: 'Send another inquiry',
      errors: {
        pickup: 'Please enter a pickup location',
        delivery: 'Please enter a delivery location',
        fullName: 'Please enter your full name',
        email: 'Please enter a valid email address',
        phone: 'Please enter a phone number',
      },
      whereToFindUs: 'Where to find us',
      expandMap: 'Expand map',
      collapseMap: 'Collapse map',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      addressLabel: 'Address',
      addressValue: 'Vinska Gora 18, 3320 Velenje, Slovenia',
    },
    footer: {
      tagline:
        'Specialists in exceptional and demanding transport and construction machinery logistics.',
      quickLinksTitle: 'Quick Links',
      companyContactTitle: 'Glušič d.o.o. / Contact',
      rightsReserved: '© 2026 Glušič d.o.o. All rights reserved.',
    },
  },
  DE: {
    langLabel: 'Deutsch',
    nav: {
      home: 'Startseite',
      about: 'Über uns',
      services: 'Leistungen',
      fleet: 'Fuhrpark',
      contact: 'Kontakt',
      openMenu: 'Menü öffnen',
      selectLanguage: 'Sprache wählen',
    },
    hero: {
      title: 'Spezialisten für Sonder- und Schwertransporte',
      subtitle:
        'Zuverlässiger Transport von überdimensionalen Gütern, Baumaschinen und Industriekonstruktionen – sicher, fachgerecht und pünktlich.',
      ctaPrimary: 'Kontaktieren Sie uns',
      ctaSecondary: 'Unsere Leistungen',
      imageAlt: 'MAN Schwertransport-LKW Glušič',
    },
    whyChooseUs: {
      kicker: 'ÜBER UNS',
      title: 'Warum uns wählen?',
      introParagraph1:
        'Bei Glušič Transport sind wir überzeugt, dass guter Transport mehr bedeutet als nur die Beförderung von Fracht. Er bedeutet Zuverlässigkeit, Reaktionsschnelligkeit und Verantwortung von der Abholung bis zur Zustellung.',
      introParagraph2:
        'Wir sind ein Transportunternehmen aus Vinska Gora bei Velenje, spezialisiert auf den Straßengüterverkehr. Seit 2014 bauen wir langfristige Beziehungen zu Geschäftspartnern auf, die faire Vereinbarungen, Flexibilität und verlässliche Ausführung schätzen.',
      features: {
        reliabilityTitle: 'Zuverlässigkeit',
        reliabilityDesc: 'Wir halten uns an Vereinbarungen und übernehmen Verantwortung.',
        responsivenessTitle: 'Reaktionsschnelligkeit',
        responsivenessDesc: 'Wir reagieren schnell auf Ihre Bedürfnisse.',
        professionalismTitle: 'Professionalität',
        professionalismDesc: 'Wir behandeln jeden Transport seriös und verantwortungsbewusst.',
        cargoCareTitle: 'Sorgfalt für die Fracht',
        cargoCareDesc: 'Wir sorgen dafür, dass Ihre Fracht sicher ans Ziel gelangt.',
      },
      stats: {
        experience: 'Jahre Erfahrung',
        accuracy: 'Lieferpünktlichkeit',
        clients: 'zufriedene Kunden',
      },
    },
    servicesAndFleet: {
      kicker: 'UNSERE LEISTUNGEN UND FUHRPARK',
      title: 'Ganzheitliche Logistiklösungen und moderner Fuhrpark',
      items: {
        escort: {
          shortTag: 'Begleitung',
          title: 'Transportbegleitung',
          description:
            'Sichere und fachkundige Begleitung für alle Arten von Sondertransporten mit gekennzeichneten Begleitfahrzeugen und erfahrenem Team.',
        },
        exceptional: {
          shortTag: 'Sondertransport',
          title: 'Sondertransporte',
          description:
            'Zuverlässige Durchführung anspruchsvollster Transporte von Sonder- und Großraumgütern inklusive Streckenplanung.',
        },
        containers: {
          shortTag: 'Container',
          title: 'Containertransporte',
          description:
            'Schnelle und sichere Transporte aller Arten von See- und Industriecontainern mit geeigneter Ausrüstung.',
        },
        special: {
          shortTag: 'Spezial',
          title: 'Spezialtransporte',
          description:
            'Transport spezifischer Güter und schwerer Industrieanlagen mit höchster Fachkompetenz und Flexibilität.',
        },
        machinery: {
          shortTag: 'Baumaschinen',
          title: 'Baumaschinentransporte',
          description:
            'Zuverlässige Transporte von Baumaschinen, Baggern und sonstigem schwerem Gerät direkt zum Einsatzort.',
        },
      },
    },
    contact: {
      kicker: 'SCHNELLANFRAGE UND KONTAKT',
      title: 'Kontaktieren Sie uns',
      formTitle: 'Schnellanfrage',
      pickupDeliveryLabel: 'Abholung und Zustellung',
      pickupPlaceholder: 'Abholort',
      deliveryPlaceholder: 'Zustellort',
      cargoInfoLabel: 'Frachtangaben',
      cargoTypePlaceholder: 'Frachtart',
      weightVolumePlaceholder: 'Gewicht/Volumen',
      contactInfoLabel: 'Kontaktdaten',
      fullNamePlaceholder: 'Vor- und Nachname',
      emailPlaceholder: 'E-Mail-Adresse',
      phonePlaceholder: 'Telefonnummer',
      submitButton: 'Anfrage senden',
      sendingButton: 'Anfrage wird gesendet ...',
      successTitle: 'Ihre Anfrage wurde erfolgreich gesendet',
      successMessage:
        'Ihre Anfragedaten wurden an die Test-E-Mail-Adresse srdicziga@gmail.com gesendet.',
      activationNote:
        'Hinweis zum ersten Test: Bitte prüfen Sie das Postfach von srdicziga@gmail.com (auch Spam) und bestätigen Sie beim ersten Mal "Activate Form".',
      directMailtoLabel: 'Im E-Mail-Programm öffnen',
      sendAnotherButton: 'Neue Anfrage senden',
      errors: {
        pickup: 'Bitte geben Sie den Abholort ein',
        delivery: 'Bitte geben Sie den Zustellort ein',
        fullName: 'Bitte geben Sie Ihren Namen ein',
        email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
        phone: 'Bitte geben Sie Ihre Telefonnummer ein',
      },
      whereToFindUs: 'Wo Sie uns finden',
      expandMap: 'Karte vergrößern',
      collapseMap: 'Karte verkleinern',
      phoneLabel: 'Telefon',
      emailLabel: 'E-Mail',
      addressLabel: 'Adresse',
      addressValue: 'Vinska Gora 18, 3320 Velenje, Slowenien',
    },
    footer: {
      tagline:
        'Spezialisten für Sonder- und Schwertransporte sowie den Transport von Baumaschinen.',
      quickLinksTitle: 'Schnelllinks',
      companyContactTitle: 'Glušič d.o.o. / Kontakt',
      rightsReserved: '© 2026 Glušič d.o.o. Alle Rechte vorbehalten.',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: SiteTranslations;
  scrollToSection: (sectionId: string, e?: React.MouseEvent) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('SL');

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  const scrollToSection = (sectionId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!sectionId || sectionId === '#' || sectionId === 'domov') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const cleanId = sectionId.replace(/^#/, '');
    const target = document.getElementById(cleanId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return React.createElement(
    LanguageContext.Provider,
    {
      value: {
        language,
        setLanguage,
        t: SITE_TRANSLATIONS[language],
        scrollToSection,
      },
    },
    children
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
