import React, { useState, useEffect, useRef } from 'react';
import { HOME_PAGE_DATA } from '../../../../data/homeData';

export default function WhyChooseUs() {
  const { badge, heading, subtext, features } = HOME_PAGE_DATA.whyChooseUs;

  const [headerRevealed, setHeaderRevealed] = useState(false);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  // 1. One-Time Scroll-Triggered Text Animation (Mobile Only, triggers only once per page visit)
  useEffect(() => {
    if (headerRevealed) return;
    const el = headerRef.current;
    if (!el) return;

    // If desktop or reduced-motion, reveal immediately without animation delay
    if (window.innerWidth > 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHeaderRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHeaderRevealed(true);
          observer.disconnect(); // Never replay on scroll up/down
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [headerRevealed]);

  // 2. Card Entrance Animation (One-Time per card as it enters the viewport on mobile)
  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards || cards.length === 0) return;

    if (window.innerWidth > 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cards.forEach((c) => c && c.classList.add('wc-card-revealed'));
      return;
    }

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('wc-card-revealed');
            cardObserver.unobserve(entry.target); // Trigger only once per page visit
          }
        });
      },
      { threshold: 0.12 }
    );

    cards.forEach((card) => {
      if (card) cardObserver.observe(card);
    });

    return () => cardObserver.disconnect();
  }, []);

  // 3. Falling & Overlapping Scroll-Triggered Card Stacking Engine (Exclusively Mobile)
  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards || cards.length === 0) return;

    let ticking = false;

    const updateMobileCardStacking = () => {
      ticking = false;

      // On desktop (> 768px) or prefers-reduced-motion: clear inline styles completely
      if (window.innerWidth > 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        cards.forEach((card) => {
          if (card) {
            card.style.transform = '';
            card.style.filter = '';
          }
        });
        return;
      }

      const isSmallMobile = window.innerWidth <= 480;
      const baseTop = isSmallMobile ? 68 : 76;
      const stepOffset = isSmallMobile ? 16 : 18;
      const travelDist = 160; // scroll travel distance across which cards smoothly stack

      // Read current bounding box for each card
      const rects = cards.map((c) => (c ? c.getBoundingClientRect() : null));

      // Calculate the overlap progress of each subsequent card over earlier cards
      const progress = [0, 0, 0]; // progress of card 1, 2, 3 stacking onto previous cards
      for (let j = 1; j <= 3; j++) {
        if (rects[j]) {
          const stickyThreshold = baseTop + j * stepOffset;
          const diff = rects[j].top - stickyThreshold;
          progress[j - 1] = Math.max(0, Math.min(1, (travelDist - diff) / travelDist));
        }
      }

      // Overlap factor for each card
      // Card 0 is overlapped by cards 1, 2, and 3
      const overlap0 = progress[0] + progress[1] + progress[2];
      // Card 1 is overlapped by cards 2 and 3
      const overlap1 = progress[1] + progress[2];
      // Card 2 is overlapped by card 3
      const overlap2 = progress[2];
      // Card 3 is top of stack
      const overlap3 = 0;

      const overlaps = [overlap0, overlap1, overlap2, overlap3];

      cards.forEach((card, i) => {
        if (!card) return;
        const ov = overlaps[i];
        // Scale decreases smoothly from 1.0 down to ~0.87 for bottom cards
        const targetScale = Math.max(0.86, 1 - ov * 0.045);
        // Subtle brightness and shadow depth
        const targetBrightness = Math.max(0.90, 1 - ov * 0.03);
        // Subtle downward pin compression
        const targetTranslateY = ov * 3;

        card.style.transform = `scale(${targetScale.toFixed(3)}) translateY(${targetTranslateY.toFixed(1)}px)`;
        card.style.filter = ov > 0.02 ? `brightness(${targetBrightness.toFixed(2)})` : 'none';
      });
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateMobileCardStacking);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateMobileCardStacking();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="why-choose-us" className="why-choose-us why-choose-section" style={styles.section}>
      <style>{`
        /* ==========================================================================
           Mobile-Exclusive Scroll-Triggered Card & Text Animations
           Applies only to screens <= 768px; Desktop (> 768px) is 100% unchanged
           ========================================================================== */
        @media (max-width: 768px) {
          .why-choose-section {
            padding: 56px 18px 72px !important;
            overflow: visible !important;
          }
          .why-choose-container {
            gap: 36px !important;
            overflow: visible !important;
          }
          .why-choose-header {
            gap: 12px !important;
          }
          .why-choose-heading {
            font-size: clamp(23px, 6.2vw, 32px) !important;
            letter-spacing: -0.5px !important;
            line-height: 1.25 !important;
          }
          .why-choose-curl-wrapper {
            margin-left: 4px !important;
          }
          .why-choose-subtext {
            font-size: 14px !important;
            line-height: 1.6 !important;
          }

          /* --- Text Elements Initial State (Hidden prior to scroll-trigger) --- */
          .why-choose-header:not(.wc-header-revealed) .why-choose-pill-anim {
            opacity: 0;
            transform: translateY(18px);
          }
          .why-choose-header:not(.wc-header-revealed) .why-choose-heading-anim {
            opacity: 0;
            transform: translateY(22px);
          }
          .why-choose-header:not(.wc-header-revealed) .why-choose-subtext-anim {
            opacity: 0;
            transform: translateY(18px);
          }
          .why-choose-header:not(.wc-header-revealed) .why-choose-curl-path {
            stroke-dashoffset: 260;
          }

          /* --- Text Elements Revealed State (Triggers once per page visit) --- */
          .wc-header-revealed .why-choose-pill-anim {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .wc-header-revealed .why-choose-heading-anim {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.6s ease-out 0.1s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
          }
          .wc-header-revealed .why-choose-subtext-anim {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.6s ease-out 0.22s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.22s;
          }
          .why-choose-curl-path {
            stroke-dasharray: 260;
            stroke-dashoffset: 0;
            transition: stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.32s;
          }

          /* --- Stacking Cards Container --- */
          .why-choose-cards-grid {
            display: flex !important;
            flex-direction: column !important;
            position: relative !important;
            gap: 0 !important;
            width: 100% !important;
            overflow: visible !important;
            perspective: 1200px;
          }

          /* --- Individual Falling & Overlapping Stacking Card --- */
          .why-choose-card {
            position: sticky !important;
            width: 100% !important;
            margin-bottom: 44px !important;
            background-color: #FFFFFF !important;
            border: 1.5px solid #EAECF0 !important;
            border-top: 1.5px solid rgba(255, 255, 255, 0.9) !important;
            border-radius: 20px !important;
            padding: 26px 20px !important;
            box-shadow: 0 -4px 16px rgba(4, 68, 57, 0.05), 0 16px 36px -4px rgba(4, 68, 57, 0.13), 0 2px 6px rgba(0, 0, 0, 0.04) !important;
            transform-origin: center top !important;
            will-change: transform, filter, box-shadow !important;
            transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), filter 0.22s ease, box-shadow 0.22s ease !important;
            box-sizing: border-box !important;
          }

          /* Card Entrance Animation (triggers once as card rises into view) */
          .why-choose-card-inner {
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .wc-card-revealed .why-choose-card-inner {
            opacity: 1;
            transform: translateY(0);
          }

          /* Sequential sticky positions with top clearance under sticky navbar */
          .why-choose-card-0 {
            top: 76px !important;
            z-index: 10 !important;
          }
          .why-choose-card-1 {
            top: 94px !important;
            z-index: 11 !important;
          }
          .why-choose-card-2 {
            top: 112px !important;
            z-index: 12 !important;
          }
          .why-choose-card-3 {
            top: 130px !important;
            z-index: 13 !important;
            margin-bottom: 0 !important;
          }
        }

        /* --- Smaller Mobile Breakpoint (<= 480px) --- */
        @media (max-width: 480px) {
          .why-choose-section {
            padding: 48px 14px 62px !important;
          }
          .why-choose-card {
            padding: 22px 18px !important;
            border-radius: 18px !important;
            margin-bottom: 38px !important;
          }
          .why-choose-card-0 {
            top: 68px !important;
          }
          .why-choose-card-1 {
            top: 84px !important;
          }
          .why-choose-card-2 {
            top: 100px !important;
          }
          .why-choose-card-3 {
            top: 116px !important;
          }
        }

        /* --- Desktop & Tablet (> 768px): 100% Original Unchanged Layout --- */
        @media (min-width: 769px) {
          .why-choose-pill-anim,
          .why-choose-heading-anim,
          .why-choose-subtext-anim,
          .why-choose-card-inner {
            opacity: 1 !important;
            transform: none !important;
          }
          .why-choose-curl-path {
            stroke-dashoffset: 0 !important;
          }
          .why-choose-card {
            position: relative !important;
            top: auto !important;
            transform: none !important;
            filter: none !important;
          }
        }

        /* --- Accessibility: Respect reduced motion --- */
        @media (prefers-reduced-motion: reduce) {
          .why-choose-pill-anim,
          .why-choose-heading-anim,
          .why-choose-subtext-anim,
          .why-choose-card-inner,
          .why-choose-card {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            transition: none !important;
            animation: none !important;
          }
          .why-choose-curl-path {
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>
      <div style={styles.container} className="why-choose-container">
        {/* Header with one-time scroll entrance */}
        <div
          ref={headerRef}
          style={styles.header}
          className={`why-choose-header ${headerRevealed ? 'wc-header-revealed' : ''} reveal-on-scroll is-visible`}
        >
          <div style={styles.pillBadge} className="why-choose-pill-anim">
            <span style={styles.pillIcon}>🌿</span>
            <span style={styles.pillText}>{badge}</span>
          </div>

          <h2 style={styles.heading} className="why-choose-heading why-choose-heading-anim">
            {heading.prefix}
            <span style={styles.curlWrapper} className="why-choose-curl-wrapper">
              <span style={styles.highlight}>{heading.highlight}</span>
              <svg style={styles.curlSvg} viewBox="0 0 260 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 8C65 2 190 2 256 8"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="why-choose-curl-path"
                />
              </svg>
            </span>
          </h2>

          <p style={styles.subtext} className="why-choose-subtext why-choose-subtext-anim">{subtext}</p>
        </div>

        {/* 4 Feature Cards Grid (Desktop Grid / Mobile Falling & Overlapping Stacking Cards) */}
        <div style={styles.cardsGrid} className="why-choose-cards-grid">
          {features.map((feat, idx) => (
            <div
              key={feat.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              style={styles.card}
              className={`why-choose-card why-choose-card-${idx} hover-lift reveal-on-scroll is-visible delay-${idx + 1}`}
            >
              <div className="why-choose-card-inner">
                {/* Icon Container with specific pastel badge color */}
                <div
                  style={{
                    ...styles.iconContainer,
                    backgroundColor:
                      feat.badgeColor === 'peach'
                        ? '#FEF0E6'
                        : feat.badgeColor === 'orange'
                        ? '#FFF4ED'
                        : feat.badgeColor === 'mint'
                        ? '#E6F8F3'
                        : '#E8F5F1',
                    color:
                      feat.badgeColor === 'peach' || feat.badgeColor === 'orange'
                        ? '#F96815'
                        : '#044439',
                  }}
                >
                  {feat.icon === 'cap' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  )}
                  {feat.icon === 'rupee' && (
                    <span style={{ fontSize: '20px', fontWeight: '800' }}>₹</span>
                  )}
                  {feat.icon === 'headset' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                    </svg>
                  )}
                  {feat.icon === 'users' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  )}
                </div>

                {/* Title & Description */}
                <h3 style={styles.cardTitle}>{feat.title}</h3>
                <p style={styles.cardDescription}>{feat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '85px 24px 90px',
    background: 'radial-gradient(circle at 0% 35%, rgba(249, 104, 21, 0.08) 0%, rgba(254, 245, 240, 0.65) 28%, transparent 60%), radial-gradient(circle at 100% 38%, rgba(4, 120, 87, 0.08) 0%, rgba(238, 251, 244, 0.65) 28%, transparent 60%), #FFFFFF',
    borderTop: '1px solid #EAECF0',
    borderBottom: '1px solid #EAECF0',
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    maxWidth: '1240px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '46px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '14px',
    maxWidth: '680px',
  },
  pillBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#E8F5F1',
    border: '1px solid #A3D8CD',
    padding: '6px 16px',
    borderRadius: '9999px',
  },
  pillIcon: {
    fontSize: '13px',
  },
  pillText: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#044439',
  },
  heading: {
    fontSize: 'clamp(28px, 3.8vw, 42px)',
    fontWeight: '800',
    color: '#111827',
    lineHeight: '1.2',
    letterSpacing: '-0.9px',
  },
  curlWrapper: {
    position: 'relative',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    marginLeft: '6px',
  },
  curlSvg: {
    position: 'absolute',
    left: '0',
    bottom: '-8px',
    width: '100%',
    height: '10px',
    overflow: 'visible',
    pointerEvents: 'none',
  },
  highlight: {
    color: '#F96815',
  },
  subtext: {
    fontSize: '15px',
    color: '#4B5563',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    lineHeight: '1.65',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px',
    width: '100%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #EAECF0',
    borderRadius: '18px',
    padding: '32px 26px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '14px',
    boxShadow: '0 4px 14px rgba(4, 68, 57, 0.03)',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    position: 'relative',
  },
  iconContainer: {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4px',
  },
  cardTitle: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#111827',
    lineHeight: '1.35',
  },
  cardDescription: {
    fontSize: '14px',
    color: '#4B5563',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    lineHeight: '1.6',
  },
};
