import React from 'react';
import { HOME_PAGE_DATA } from '../../../../data/homeData';

export default function HeroSection() {
  const { badge, headline, subheadline, bulletBadges, ctaButtons, image } = HOME_PAGE_DATA.hero;

  const handlePrimaryClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('enquiry-form-section');
    if (el) {
      const navHeight = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleTalkToExpertClick = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-talk-to-expert'));
  };

  return (
    <section className="hero-section" style={styles.section}>
      <style>{`
        @media (min-width: 641px) {
          .hero-nowrap {
            white-space: nowrap !important;
          }
        }
        @media (max-width: 992px) {
          .hero-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 32px !important;
            align-items: center !important;
          }
          .hero-right-col {
            order: 1 !important; /* Visual / Image FIRST on mobile & tablet */
            width: 100% !important;
          }
          .hero-left-col {
            order: 2 !important; /* Matter SECOND on mobile & tablet */
            width: 100% !important;
            align-items: center !important;
            text-align: center !important;
            padding-bottom: 10px !important;
          }
          .hero-left-col p {
            margin: 0 auto !important;
          }
          .hero-badges-grid {
            justify-content: center !important;
          }
          .hero-cta-group {
            justify-content: center !important;
          }
          .hero-visual-container {
            max-width: 440px !important;
            margin: 0 auto !important;
          }
        }
        .hero-shapes-backdrop {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
        }
        /* Mobile Version: Visual / Image FIRST, then text matter */
        @media (max-width: 768px) {
          .hero-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
          }
          .hero-right-col {
            order: 1 !important; /* Image FIRST */
            width: 100% !important;
            padding-bottom: 0 !important;
          }
          .hero-left-col {
            order: 2 !important; /* Matter SECOND */
            width: 100% !important;
            padding-bottom: 0 !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
        @media (max-width: 640px) {
          .hero-section {
            padding: 24px 18px 32px !important;
            overflow-x: clip !important;
          }
          .hero-top-badge-pill {
            padding: 5px 14px !important;
            margin-bottom: 12px !important;
          }
          .hero-top-badge-pill span {
            font-size: 12px !important;
          }
          .hero-headline {
            font-size: clamp(26px, 7vw, 32px) !important;
            line-height: 1.2 !important;
            letter-spacing: -0.6px !important;
            margin: 0 0 10px 0 !important;
          }
          .hero-nowrap {
            white-space: normal !important;
          }
          .hero-subheadline {
            font-size: 14px !important;
            line-height: 1.55 !important;
            max-width: 360px !important;
            margin: 0 auto 18px auto !important;
            color: #4B5563 !important;
          }
          /* 4. Compact 2-column, 2-row trust-point grid replacing individual cards */
          .hero-badges-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px 14px !important;
            width: 100% !important;
            max-width: 350px !important;
            margin: 0 auto 20px auto !important;
            padding: 0 !important;
          }
          .hero-bullet-item {
            background-color: transparent !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: flex-start !important;
            gap: 7px !important;
          }
          .hero-bullet-check-icon {
            width: 18px !important;
            height: 18px !important;
            border-radius: 50% !important;
            background-color: #E8F5F1 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex-shrink: 0 !important;
          }
          .hero-bullet-check-icon svg {
            width: 10px !important;
            height: 10px !important;
          }
          .hero-bullet-text {
            font-size: 12.5px !important;
            font-weight: 600 !important;
            color: #374151 !important;
            line-height: 1.3 !important;
            white-space: nowrap !important;
            text-align: left !important;
          }
          /* 5. CTA Button Optimization */
          .hero-cta-group {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            width: 100% !important;
            max-width: 310px !important;
            margin: 0 auto !important;
            gap: 10px !important;
            position: relative !important;
            z-index: 10 !important;
          }
          .hero-primary-btn {
            width: 100% !important;
            height: 48px !important;
            padding: 0 20px !important;
            font-size: 14.5px !important;
            font-weight: 700 !important;
            border-radius: 9999px !important;
            box-shadow: 0 6px 18px rgba(4, 68, 57, 0.2) !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            box-sizing: border-box !important;
          }
          .hero-secondary-btn {
            width: 100% !important;
            height: 44px !important;
            padding: 0 18px !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            border-radius: 9999px !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }
          /* Image & Backdrop Composition */
          .hero-visual-container {
            max-width: 310px !important;
            margin: 0 auto !important;
          }
          .hero-students-img {
            width: 88% !important;
            height: 96% !important;
            left: 6% !important;
            bottom: 0 !important;
          }
          /* Floating Badges */
          .hero-top-badge {
            top: 4% !important;
            right: 2% !important;
            padding: 5px 10px !important;
            border-radius: 12px !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06) !important;
            border: 1px solid #E5E7EB !important;
            gap: 8px !important;
            transform: none !important;
          }
          .hero-top-badge .trophy-icon-box {
            width: 26px !important;
            height: 26px !important;
            font-size: 13px !important;
            border-radius: 8px !important;
          }
          .hero-top-badge .badge-heading {
            font-size: 11px !important;
            line-height: 1.2 !important;
          }
          .hero-top-badge .badge-subtext {
            font-size: 9.5px !important;
          }
          .hero-bottom-badge {
            bottom: 3% !important;
            left: 2% !important;
            padding: 5px 10px !important;
            border-radius: 12px !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06) !important;
            border: 1px solid #E5E7EB !important;
            gap: 8px !important;
            transform: none !important;
          }
          .hero-bottom-badge .badge-check-circle {
            width: 22px !important;
            height: 22px !important;
          }
          .hero-bottom-badge .badge-check-circle svg {
            width: 10px !important;
            height: 10px !important;
          }
          .hero-bottom-badge .bottom-badge-choice-of {
            font-size: 8px !important;
          }
          .hero-bottom-badge .bottom-badge-number {
            font-size: 13px !important;
            font-weight: 800 !important;
          }
          .hero-bottom-badge .bottom-badge-subtitle {
            font-size: 9px !important;
          }
        }
        @media (max-width: 360px) {
          .hero-badges-grid {
            gap: 8px 6px !important;
          }
          .hero-bullet-text {
            font-size: 11px !important;
          }
          .hero-visual-container {
            max-width: 275px !important;
          }
        }
      `}</style>
      <div style={styles.container} className="hero-container">
        {/* Left Column: Heading, Copy, Badges, CTAs */}
        <div style={styles.leftCol} className="hero-left-col reveal-on-scroll is-visible">
          {/* Top Pill Badge */}
          <div style={styles.topBadge} className="hero-top-badge-pill">
            <span style={styles.badgeIcon}>🎓</span>
            <span style={styles.badgeText}>{badge}</span>
          </div>

          {/* Main Headline strictly in two lines matching home.pdf */}
          <h1 style={styles.headline} className="nav-text-stretch hero-headline">
            <span className="hero-nowrap anim-words" style={{ display: 'inline-block' }}>Explore B.Tech Colleges</span>
            <br />
            <span className="hero-nowrap" style={{ display: 'inline-block' }}>
              <span style={styles.curlWrapper}>
                <span style={styles.highlight} className="anim-letters">in India</span>
                {/* Dribbble Style Hand-drawn Underline Curve SVG */}
                <svg style={styles.curlSvg} viewBox="0 0 260 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9C60 3 180 3 257 9" stroke="#F96815" strokeWidth="3.2" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p style={styles.subheadline} className="nav-subtext-reveal hero-subheadline">{subheadline}</p>

          {/* 4 Feature Badges Grid */}
          <div style={styles.badgesGrid} className="hero-badges-grid">
            {bulletBadges.map((b) => (
              <div key={b.id} style={styles.bulletItem} className="hover-lift hero-bullet-item">
                <div style={styles.bulletCheckIcon} className="hero-bullet-check-icon">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                      stroke="#044439"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span style={styles.bulletText} className="hero-bullet-text">{b.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Action Buttons */}
          <div style={styles.ctaGroup} className="hero-cta-group">
            <a
              href={ctaButtons.primary.href}
              onClick={handlePrimaryClick}
              style={styles.primaryBtn}
              className="hover-lift hero-primary-btn"
            >
              <span>{ctaButtons.primary.label}</span>
              <span style={styles.btnArrow}>➔</span>
            </a>
            <a
              href="#talk-to-expert"
              onClick={handleTalkToExpertClick}
              style={styles.secondaryBtn}
              className="hover-lift hero-secondary-btn"
            >
              {ctaButtons.secondary.label}
            </a>
          </div>
        </div>

        {/* Right Column: Hero Visual with Exact Backdrop Shapes, Scaled Cutout & Badges matching Reference Image 1 */}
        <div style={styles.rightCol} className="hero-right-col reveal-on-scroll is-visible">
          <div style={styles.visualContainer} className="hero-visual-container">
            {/* Unified Cohesive Abstract Backdrop - Premium Layered Curves */}
            <svg
              style={styles.shapesBackdropSvg}
              className="hero-shapes-backdrop"
              viewBox="0 0 580 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Layer 1: Very Light Peach Warmth (#FEF3EB) - Soft glow on the right framing the composition */}
              <path
                d="M 270 500 C 265 330, 310 160, 370 95 C 425 35, 500 50, 530 120 C 560 190, 550 350, 515 500 Z"
                fill="#FEF3EB"
              />

              {/* Layer 2: Soft Sage Green Primary Canvas (#E2F1ED) - Cohesive backdrop unifying both students */}
              <path
                d="M 95 490 C 75 350, 85 200, 130 115 C 170 38, 260 22, 340 35 C 420 48, 485 92, 505 180 C 525 275, 515 390, 490 490 Z"
                fill="#E2F1ED"
              />

              {/* Layer 3: Soft Sage Nested Contour (#C6E7DE) - Subtle organic depth behind right shoulder */}
              <path
                d="M 315 130 C 355 80, 425 82, 460 125 C 490 165, 490 235, 455 275 C 418 312, 350 305, 320 260 C 295 218, 290 160, 315 130 Z"
                fill="#C6E7DE"
                opacity="0.75"
              />

              {/* Layer 4: Deep Forest Green Brand Arch (#044439) - Smooth, sophisticated contrast behind boy & center */}
              <path
                d="M 115 440 C 95 320, 110 180, 160 100 C 195 45, 265 42, 305 92 C 340 135, 350 220, 340 330 C 330 420, 290 470, 220 470 C 160 470, 125 460, 115 440 Z"
                fill="#044439"
              />

              {/* Layer 5: Warm Muted Orange Accent (#F96815) - Balanced, elegant energy on lower-left */}
              <path
                d="M 60 260 C 42 292, 42 342, 68 375 C 95 408, 142 402, 168 370 C 192 338, 186 284, 156 248 C 124 216, 76 226, 60 260 Z"
                fill="#F96815"
                opacity="0.92"
              />
            </svg>

            {/* Top-Right Floating Trophy Card Matching Image 1 Exactly */}
            <div style={styles.floatingBadge} className="hero-top-badge hover-lift">
              <div style={styles.trophyIconBox} className="trophy-icon-box">🏆</div>
              <div style={styles.badgeTextGroup} className="badge-text-group">
                <span style={styles.badgeHeading} className="badge-heading">B.Tech Admissions</span>
                <span style={styles.badgeSubtext} className="badge-subtext">Across India</span>
              </div>
            </div>

            {/* Student Cutout Image Scaled & Positioned per Image 1 */}
            <img
              src={image.src}
              alt={image.alt}
              style={styles.studentsImg}
              className="hero-students-img"
              loading="eager"
              fetchPriority="high"
              width="540"
              height="520"
            />

            {/* Bottom-Left Restored White Badge Matching Image 1 Exactly */}
            <div style={styles.bottomLeftBadge} className="hero-bottom-badge hover-lift">
              <div style={styles.badgeCheckCircle} className="badge-check-circle">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                    stroke="#044439"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div style={styles.bottomBadgeTextCol} className="bottom-badge-text-col">
                <span style={styles.bottomBadgeChoiceOf} className="bottom-badge-choice-of">CHOICE OF</span>
                <span style={styles.bottomBadgeNumber} className="bottom-badge-number">500+</span>
                <span style={styles.bottomBadgeSubtitle} className="bottom-badge-subtitle">Engineering Colleges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '35px 24px 25px',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    maxWidth: '1240px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'minmax(320px, 1.12fr) minmax(320px, 0.88fr)',
    gap: '36px',
    alignItems: 'flex-end',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px',
    paddingBottom: '25px',
  },
  topBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#E8F5F1',
    border: '1px solid #A3D8CD',
    padding: '7px 16px',
    borderRadius: '9999px',
    boxShadow: '0 2px 6px rgba(4, 68, 57, 0.06)',
  },
  badgeIcon: {
    fontSize: '13px',
  },
  badgeText: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#044439',
    letterSpacing: '0.2px',
  },
  headline: {
    fontSize: 'clamp(36px, 4.8vw, 58px)',
    fontWeight: '800',
    lineHeight: '1.15',
    color: '#111827',
    letterSpacing: '-1.6px',
  },
  curlWrapper: {
    position: 'relative',
    display: 'inline-block',
  },
  curlSvg: {
    position: 'absolute',
    bottom: '-10px',
    left: 0,
    width: '100%',
    height: '12px',
    pointerEvents: 'none',
  },
  highlight: {
    color: '#F96815',
  },
  subheadline: {
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#4B5563',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    maxWidth: '530px',
  },
  badgesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(180px, 1fr))',
    gap: '14px 20px',
    margin: '6px 0 10px',
  },
  bulletItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#F9FAFB',
    padding: '8px 14px',
    borderRadius: '12px',
    border: '1px solid #EAECF0',
  },
  bulletCheckIcon: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    backgroundColor: '#E8F5F1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bulletText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
  },
  ctaGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    marginTop: '12px',
  },
  primaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#044439',
    color: '#FFFFFF',
    padding: '15px 32px',
    borderRadius: '9999px',
    fontWeight: '700',
    fontSize: '15px',
    textDecoration: 'none',
    boxShadow: '0 10px 24px rgba(4, 68, 57, 0.25)',
    transition: 'all 0.25s ease',
  },
  btnArrow: {
    fontSize: '14px',
    transition: 'transform 0.2s ease',
  },
  secondaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
    border: '1.5px solid #D1D5DB',
    padding: '14px 28px',
    borderRadius: '9999px',
    fontWeight: '700',
    fontSize: '15px',
    textDecoration: 'none',
    transition: 'all 0.25s ease',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
  },
  rightCol: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'relative',
    height: '100%',
    paddingBottom: '20px',
  },
  visualContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '560px',
    aspectRatio: '580 / 520',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: '0 auto',
    lineHeight: 0,
  },
  shapesBackdropSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    pointerEvents: 'none',
  },
  floatingBadge: {
    position: 'absolute',
    top: '5%',
    right: '4%',
    backgroundColor: '#FFFFFF',
    border: '1px solid rgba(234, 236, 240, 0.9)',
    borderRadius: '16px',
    padding: '8px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.08)',
    zIndex: 5,
    animation: 'floatGentle 4.5s ease-in-out infinite',
  },
  trophyIconBox: {
    width: '32px',
    height: '32px',
    borderRadius: '9px',
    backgroundColor: '#FEF3C7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    flexShrink: 0,
  },
  badgeTextGroup: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.2,
  },
  badgeHeading: {
    fontSize: '12px',
    fontWeight: '800',
    color: '#111827',
    letterSpacing: '-0.2px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  badgeSubtext: {
    fontSize: '10px',
    color: '#6B7280',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  studentsImg: {
    position: 'absolute',
    bottom: 0,
    left: '4.8%',
    width: '90.5%',
    height: '97%',
    objectFit: 'contain',
    objectPosition: 'bottom center',
    zIndex: 3,
    display: 'block',
    verticalAlign: 'bottom',
    margin: 0,
    pointerEvents: 'none',
  },
  bottomLeftBadge: {
    position: 'absolute',
    bottom: '7%',
    left: '2%',
    backgroundColor: '#FFFFFF',
    border: '1px solid #F3F4F6',
    borderRadius: '16px',
    padding: '8px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.08)',
    zIndex: 5,
    animation: 'floatGentle 4s ease-in-out 1s infinite',
  },
  badgeCheckCircle: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#DBF5EC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bottomBadgeTextCol: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.15,
  },
  bottomBadgeChoiceOf: {
    fontSize: '8.5px',
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  bottomBadgeNumber: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#111827',
    lineHeight: '1.1',
    letterSpacing: '-0.3px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  bottomBadgeSubtitle: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#4B5563',
    lineHeight: '1.2',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
};
