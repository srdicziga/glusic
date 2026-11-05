/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanguageProvider } from './i18n';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import ServicesAndFleetModern from './components/ServicesAndFleetModern';
import ContactAndFooter from './components/ContactAndFooter';
import BackToTopButton from './components/BackToTopButton';
/* === ZAČETEK DODANE KODE: Uvoz komponente za vijugasto cesto in premikajoči se tovornjak === */
import ScrollingRoadBackground from './components/ScrollingRoadBackground';
/* === KONEC DODANE KODE === */

export default function App() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen w-full bg-[#eaf3fc]">
        <Navbar />
        <main className="relative">
          {/* === ZAČETEK DODANE KODE: Vijugasta SVG cesta v ozadju s premikajočim se tovornjakom === */}
          <ScrollingRoadBackground />
          {/* === KONEC DODANE KODE === */}
          <Hero />
          <WhyChooseUs />
          <ServicesAndFleetModern />
          <ContactAndFooter />
        </main>
        <BackToTopButton />
      </div>
    </LanguageProvider>
  );
}









