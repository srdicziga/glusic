/* ==========================================================================
   ZAČETEK DODANE KODE (JS + SVG):
   Asimetrična vijugasta cesta v ozadju (prične se pod Hero sekcijo),
   začetno in končno parkirišče ter premikajoči se MAN tovornjak
   ========================================================================== */

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface PageDimensions {
  width: number;
  height: number;
  heroHeight: number;
}

interface RoadGeometry {
  pathData: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

/**
 * Zgradi asimetrično vijugasto pot (<path d="...">) z zelo zaobljenimi ovinki,
 * ki se začne POD Hero sekcijo na levi strani (na začetnem parkirišču)
 * in konča na končnem parkirišču tik pred nogo strani (Footer).
 */
function buildAsymmetricRoadGeometry(
  width: number,
  height: number,
  heroHeight: number
): RoadGeometry {
  const isMobile = width < 640;

  // Začetek na LEVI strani, tik POD Hero sekcijo (z odmikom za parkirni boks)
  const startX = isMobile
    ? Math.max(60, Math.round(width * 0.22))
    : Math.max(130, Math.round(width * 0.15));
  const startY = heroHeight + (isMobile ? 95 : 115);

  // Konec na desno-sredinski strani tik pred Footerjem
  const endX = isMobile
    ? Math.min(width - 60, Math.round(width * 0.68))
    : Math.min(width - 150, Math.round(width * 0.72));
  const endY = Math.max(startY + 700, height - 245);

  const straightExit = 44; // Ravni izvoz iz začetnega parkirišča
  const straightEntry = 52; // Ravni uvoz v končno parkirišče

  const curveStartY = startY + straightExit;
  const curveEndY = endY - straightEntry;
  const spanY = Math.max(400, curveEndY - curveStartY);

  // Široko zaobljeni asimetrični ovinki z velikim radijem
  const waypoints = [
    { x: startX, y: curveStartY },
    {
      // 1. Dolg, mehak zavoj v desno ("Zakaj izbrati nas")
      x: Math.round(width * (isMobile ? 0.78 : 0.76)),
      y: Math.round(curveStartY + spanY * 0.28),
    },
    {
      // 2. Zaobljen asimetrični zavoj proti levi-sredini ("Storitve in vozni park")
      x: Math.round(width * (isMobile ? 0.22 : 0.24)),
      y: Math.round(curveStartY + spanY * 0.57),
    },
    {
      // 3. Širok lok v desno ("Kontakt")
      x: Math.round(width * (isMobile ? 0.80 : 0.82)),
      y: Math.round(curveStartY + spanY * 0.82),
    },
    {
      // 4. Mehak, zaobljen uvoz v končno parkirišče
      x: endX,
      y: curveEndY,
    },
  ];

  // Začnemo z ravnim odsekom iz začetnega parkirišča
  let d = `M ${startX} ${startY} L ${startX} ${curveStartY}`;

  // Zgradimo zelo zaobljene kubične Bézierjeve loke z dolgimi navpičnimi ročicami (0.58 * dy)
  for (let i = 0; i < waypoints.length - 1; i++) {
    const curr = waypoints[i];
    const next = waypoints[i + 1];
    const dy = next.y - curr.y;
    const handle = dy * 0.58;
    const ctrlY1 = curr.y + handle;
    const ctrlY2 = next.y - handle;
    d += ` C ${curr.x} ${ctrlY1.toFixed(1)}, ${next.x} ${ctrlY2.toFixed(1)}, ${next.x} ${next.y}`;
  }

  // Zaključimo z ravnim uvozom v končno parkirišče
  d += ` L ${endX} ${endY}`;

  return {
    pathData: d,
    startX,
    startY,
    endX,
    endY,
  };
}

export default function ScrollingRoadBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const roadPathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const truckGroupRef = useRef<SVGGElement>(null);
  const trailerGroupRef = useRef<SVGGElement>(null);

  const [dimensions, setDimensions] = useState<PageDimensions>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: 3200,
    heroHeight: 800,
  });

  // Posodobi položaj tovornjaka in tangento zavoja glede na drsenje (scroll)
  const updateTruckOnScroll = useCallback(() => {
    const pathEl = roadPathRef.current;
    const truckEl = truckGroupRef.current;
    if (!pathEl || !truckEl) return;

    const totalLength = pathEl.getTotalLength();
    if (!totalLength || !Number.isFinite(totalLength)) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const viewportH = window.innerHeight || 800;

    // Začetno parkirišče je pod Hero sekcijo; tovornjak začne vožnjo, ko uporabnik
    // podrsa proti koncu Hero sekcije, in prispe na ciljno parkirišče na dnu strani.
    const startY =
      dimensions.heroHeight + (dimensions.width < 640 ? 95 : 115);
    const scrollStart = Math.max(0, startY - viewportH * 0.75);
    const maxScroll = Math.max(
      scrollStart + 1,
      document.documentElement.scrollHeight - viewportH
    );

    const driveProgress = Math.min(
      1,
      Math.max(0, (scrollTop - scrollStart) / (maxScroll - scrollStart))
    );

    // Trenutna prevožena razdalja po SVG cesti
    const currentLength = driveProgress * totalLength;

    // 1. Točka na cesti za kabino tovornjaka: getPointAtLength()
    const point = pathEl.getPointAtLength(currentLength);

    // 2. Izračun tangente (smeri ceste) za samodejno obračanje kabine naprej
    let angleDeg = 90;
    if (driveProgress > 0.002 && driveProgress < 0.998) {
      const delta = 6;
      const pBefore = pathEl.getPointAtLength(Math.max(0, currentLength - delta));
      const pAfter = pathEl.getPointAtLength(
        Math.min(totalLength, currentLength + delta)
      );
      const angleRad = Math.atan2(pAfter.y - pBefore.y, pAfter.x - pBefore.x);
      angleDeg = angleRad * (180 / Math.PI);
    }

    truckEl.setAttribute(
      'transform',
      `translate(${point.x.toFixed(2)}, ${point.y.toFixed(2)}) rotate(${angleDeg.toFixed(2)})`
    );

    // 3. Naravno zgibanje prikolice v ovinkih (med parkiranjem poravnano na 0°)
    if (trailerGroupRef.current) {
      let clampedTurn = 0;
      if (driveProgress > 0.005 && driveProgress < 0.995) {
        const delta = 6;
        const trailerSampleDist = Math.max(0, currentLength - 38);
        const tBefore = pathEl.getPointAtLength(
          Math.max(0, trailerSampleDist - delta)
        );
        const tAfter = pathEl.getPointAtLength(
          Math.min(totalLength, trailerSampleDist + delta)
        );
        const trailerAngleDeg =
          Math.atan2(tAfter.y - tBefore.y, tAfter.x - tBefore.x) *
          (180 / Math.PI);

        let relativeTurn = trailerAngleDeg - angleDeg;
        while (relativeTurn > 180) relativeTurn -= 360;
        while (relativeTurn < -180) relativeTurn += 360;
        clampedTurn = Math.max(-24, Math.min(24, relativeTurn * 0.75));
      }

      trailerGroupRef.current.setAttribute(
        'transform',
        `rotate(${clampedTurn.toFixed(2)}, -10, 0)`
      );
    }

    // 4. Posodobitev prevožene modre sledi za tovornjakom
    if (progressPathRef.current) {
      progressPathRef.current.style.strokeDasharray = `${totalLength}`;
      progressPathRef.current.style.strokeDashoffset = `${Math.max(
        0,
        totalLength - currentLength
      )}`;
    }
  }, [dimensions.heroHeight, dimensions.width]);

  // Spremljanje velikosti glavnega vsebnika (<main>) in višine Hero sekcije (#domov)
  useEffect(() => {
    const container = containerRef.current;
    const parentEl = container?.parentElement;
    if (!parentEl) return;

    const measure = () => {
      const rect = parentEl.getBoundingClientRect();
      const w = Math.max(320, Math.round(rect.width || window.innerWidth));
      const h = Math.max(
        1200,
        Math.round(parentEl.scrollHeight || rect.height)
      );
      const heroEl = document.getElementById('domov');
      const heroH = heroEl ? Math.round(heroEl.offsetHeight) : 760;

      setDimensions((prev) =>
        prev.width === w && prev.height === h && prev.heroHeight === heroH
          ? prev
          : { width: w, height: h, heroHeight: heroH }
      );
    };

    measure();

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });
    resizeObserver.observe(parentEl);
    window.addEventListener('resize', measure, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Posodobi pozicijo tovornjaka ob spremembi dimenzij in ob vsakem drsenju (scrollu)
  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        updateTruckOnScroll();
        rafId = null;
      });
    };

    updateTruckOnScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [dimensions, updateTruckOnScroll]);

  const { pathData, startX, startY, endX, endY } = buildAsymmetricRoadGeometry(
    dimensions.width,
    dimensions.height,
    dimensions.heroHeight
  );
  const isMobile = dimensions.width < 640;
  const roadScale = isMobile ? 0.78 : 1;

  return (
    <div
      ref={containerRef}
      className="scrolling-road-overlay"
      aria-hidden="true"
    >
      <svg
        className="scrolling-road-svg"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMin slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient za asfaltno površino ceste */}
          <linearGradient id="glusicRoadSurface" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#CEE2F6" stopOpacity="0.85" />
            <stop offset="15%" stopColor="#CBE0F5" stopOpacity="0.88" />
            <stop offset="85%" stopColor="#C8DDF3" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#CEE2F6" stopOpacity="0.85" />
          </linearGradient>

          {/* Gradient za aktivno prevoženo pot */}
          <linearGradient id="glusicRoadProgress" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B84E5" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0B84E5" stopOpacity="0.72" />
          </linearGradient>

          {/* Svetlobni snop žarometov spredaj pred kabino */}
          <linearGradient id="truckHeadlightBeam" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#FFFBEB" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Zunanji rob / bankina ceste */}
        <path
          d={pathData}
          stroke="#BDD4EC"
          strokeWidth={isMobile ? 44 : 60}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />

        {/* 2. Glavno asimetrično cestišče - referenčni <path> za getPointAtLength() */}
        <path
          ref={roadPathRef}
          d={pathData}
          stroke="url(#glusicRoadSurface)"
          strokeWidth={isMobile ? 36 : 50}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 3. Sredinska črtkana cestna črta */}
        <path
          d={pathData}
          stroke="#FFFFFF"
          strokeWidth={isMobile ? 2.5 : 3.5}
          strokeDasharray="18 16"
          strokeLinecap="round"
          opacity="0.92"
        />

        {/* 4. Prevožena sled tovornjaka */}
        <path
          ref={progressPathRef}
          d={pathData}
          stroke="url(#glusicRoadProgress)"
          strokeWidth={isMobile ? 4 : 5}
          strokeLinecap="round"
        />

        {/* =================================================================
            5. ZAČETNO PARKIRIŠČE NA LEVI STRANI (POD HERO SEKCIJO)
           ================================================================= */}
        <g transform={`translate(${startX}, ${startY}) scale(${roadScale})`}>
          {/* Asfaltna ploščad parkirišča */}
          <rect
            x="-34"
            y="-90"
            width="68"
            height="128"
            rx="10"
            fill="#C7DCF2"
            stroke="#94B8DB"
            strokeWidth="2"
          />

          {/* Črte parkirnega boksa za tovornjak */}
          <rect
            x="-24"
            y="-82"
            width="48"
            height="112"
            rx="6"
            fill="#DCEBFA"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeDasharray="8 5"
          />

          {/* Oznaka P na parkirnem mestu */}
          <text
            x="0"
            y="18"
            textAnchor="middle"
            fill="#1D6FB3"
            fontSize="13"
            fontWeight="800"
            opacity="0.55"
          >
            P
          </text>
        </g>

        {/* =================================================================
            6. KONČNO PARKIRIŠČE NA KONCU POTI
           ================================================================= */}
        <g transform={`translate(${endX}, ${endY}) scale(${roadScale})`}>
          {/* Asfaltna ploščad končnega parkirišča */}
          <rect
            x="-34"
            y="-90"
            width="68"
            height="128"
            rx="10"
            fill="#C7DCF2"
            stroke="#94B8DB"
            strokeWidth="2"
          />

          {/* Črte parkirnega boksa za tovornjak */}
          <rect
            x="-24"
            y="-82"
            width="48"
            height="112"
            rx="6"
            fill="#DCEBFA"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeDasharray="8 5"
          />

          {/* Oznaka P v končnem boksu */}
          <text
            x="0"
            y="22"
            textAnchor="middle"
            fill="#1D6FB3"
            fontSize="13"
            fontWeight="800"
            opacity="0.55"
          >
            P
          </text>
        </g>

        {/* =================================================================
            7. PREMIKAJOČI SE BELI MAN TOVORNJAK (v stilu Hero sekcije)
            Kabina gleda v smeri +X (0°), tako da jo transform rotate(angle)
            vedno natančno usmeri naprej po tangenti zavoja ceste.
           ================================================================= */}
        <g ref={truckGroupRef} className="scrolling-truck-group">
          <g transform={`scale(${roadScale})`}>
            {/* Zgibna polprikolica za izredne prevoze (zadnji del: x od -74 do -8) */}
            <g ref={trailerGroupRef}>
              {/* Kolesa prikolice (3 osi za težke / izredne prevoze) */}
              <rect x="-66" y="-15.5" width="9" height="4" rx="1.5" fill="#1E293B" />
              <rect x="-54" y="-15.5" width="9" height="4" rx="1.5" fill="#1E293B" />
              <rect x="-42" y="-15.5" width="9" height="4" rx="1.5" fill="#1E293B" />

              <rect x="-66" y="11.5" width="9" height="4" rx="1.5" fill="#1E293B" />
              <rect x="-54" y="11.5" width="9" height="4" rx="1.5" fill="#1E293B" />
              <rect x="-42" y="11.5" width="9" height="4" rx="1.5" fill="#1E293B" />

              {/* Osnovna bela/srebrna konstrukcija prikolice z modrimi Glušič poudarki */}
              <rect
                x="-74"
                y="-13"
                width="64"
                height="26"
                rx="3.5"
                fill="#FFFFFF"
                stroke="#94B8DB"
                strokeWidth="1.5"
              />

              {/* Notranja nakladalna površina s stranskimi modrimi črtami (#0B84E5) */}
              <rect
                x="-71"
                y="-10.5"
                width="58"
                height="21"
                rx="2"
                fill="#F4F9FE"
              />
              <rect x="-71" y="-10.5" width="58" height="3" rx="1" fill="#0B84E5" />
              <rect x="-71" y="7.5" width="58" height="3" rx="1" fill="#0B84E5" />

              {/* Tovor na prikolici */}
              <rect
                x="-64"
                y="-6.5"
                width="42"
                height="13"
                rx="2"
                fill="#0B84E5"
                stroke="#0B162C"
                strokeWidth="1.2"
              />
              <rect
                x="-61.5"
                y="-4.5"
                width="37"
                height="9"
                rx="1"
                fill="#E2F0FB"
              />
              {/* Pritrdilni pasovi (gurtne) čez tovor */}
              <line x1="-54" y1="-6.5" x2="-54" y2="6.5" stroke="#F59E0B" strokeWidth="1.6" />
              <line x1="-43" y1="-6.5" x2="-43" y2="6.5" stroke="#F59E0B" strokeWidth="1.6" />
              <line x1="-32" y1="-6.5" x2="-32" y2="6.5" stroke="#F59E0B" strokeWidth="1.6" />

              {/* Zadnje rdeče luči prikolice */}
              <rect x="-74.5" y="-11" width="2" height="5" rx="0.8" fill="#EF4444" />
              <rect x="-74.5" y="6" width="2" height="5" rx="0.8" fill="#EF4444" />
            </g>

            {/* Sedlo / priklop (fifth-wheel coupling) med vlačilcem in prikolico */}
            <circle cx="-10" cy="0" r="4.5" fill="#334155" />
            <circle cx="-10" cy="0" r="2" fill="#94A3B8" />

            {/* Kolesa pogonske in sprednje osi vlačilca MAN */}
            <rect x="-14" y="-15.5" width="10" height="4" rx="1.5" fill="#0F172A" />
            <rect x="-14" y="11.5" width="10" height="4" rx="1.5" fill="#0F172A" />
            <rect x="8" y="-15" width="9" height="3.5" rx="1.5" fill="#0F172A" />
            <rect x="8" y="11.5" width="9" height="3.5" rx="1.5" fill="#0F172A" />

            {/* Šasija za kabino */}
            <rect
              x="-16"
              y="-9"
              width="16"
              height="18"
              rx="2"
              fill="#1E293B"
            />

            {/* Snopa sprednjih LED žarometov (usmerjena naprej po cesti) */}
            <polygon
              points="24,-10 52,-18 52,-3 24,-6"
              fill="url(#truckHeadlightBeam)"
            />
            <polygon
              points="24,6 52,3 52,18 24,10"
              fill="url(#truckHeadlightBeam)"
            />

            {/* BELA KABINA MAN TGX (sprednji del: x od -2 do +25) */}
            <path
              d="M -2 -13.5 H 18 C 22.5 -13.5 25 -10.5 25 -6.5 V 6.5 C 25 10.5 22.5 13.5 18 13.5 H -2 C -3.5 13.5 -4.5 12.5 -4.5 11 V -11 C -4.5 -12.5 -3.5 -13.5 -2 -13.5 Z"
              fill="#FFFFFF"
              stroke="#6495C7"
              strokeWidth="1.5"
            />

            {/* Aerodinamične modre črte na strehi kabine (v stilu Glušič MAN tovornjaka) */}
            <path d="M 0 -9.5 H 14 L 11 -6.5 H 0 Z" fill="#0B84E5" />
            <path d="M 0 9.5 H 14 L 11 6.5 H 0 Z" fill="#0B84E5" />

            {/* Panoramsko vetrobransko steklo MAN kabine */}
            <path
              d="M 14.5 -11 C 18.5 -10.2 21 -7.5 21 0 C 21 7.5 18.5 10.2 14.5 11 L 12 9.2 C 14.2 6.8 15.2 3.8 15.2 0 C 15.2 -3.8 14.2 -6.8 12 -9.2 Z"
              fill="#0F172A"
            />

            {/* Sprednja črna MAN maska hladilnika s kromirano letvico */}
            <rect x="23" y="-6.5" width="2.2" height="13" rx="1" fill="#0F172A" />
            <line x1="23.8" y1="-4.5" x2="23.8" y2="4.5" stroke="#38BDF8" strokeWidth="1" />

            {/* Sprednja LED žarometa */}
            <rect x="22.8" y="-11.5" width="2.2" height="3.8" rx="0.8" fill="#FEF08A" />
            <rect x="22.8" y="7.7" width="2.2" height="3.8" rx="0.8" fill="#FEF08A" />

            {/* Stranski vzvratni ogledali */}
            <path d="M 16 -13.5 L 18.5 -17.5 H 15.5 L 13.5 -13.5" fill="#0F172A" />
            <path d="M 16 13.5 L 18.5 17.5 H 15.5 L 13.5 13.5" fill="#0F172A" />

            {/* Strešno okno / spojler na kabini */}
            <rect
              x="2"
              y="-5"
              width="7"
              height="10"
              rx="1.5"
              fill="#E2F0FB"
              stroke="#94B8DB"
              strokeWidth="1"
            />

            {/* Dve rumeni/oranžni rotacijski luči na strehi kabine (Izredni prevoz) */}
            <circle cx="8" cy="-8" r="4" fill="#F59E0B" className="truck-beacon-glow" />
            <circle cx="8" cy="-8" r="2.2" fill="#FEF3C7" />

            <circle cx="8" cy="8" r="4" fill="#F59E0B" className="truck-beacon-glow" />
            <circle cx="8" cy="8" r="2.2" fill="#FEF3C7" />
          </g>
        </g>
      </svg>
    </div>
  );
}

/* ==========================================================================
   KONEC DODANE KODE (JS + SVG)
   ========================================================================== */
