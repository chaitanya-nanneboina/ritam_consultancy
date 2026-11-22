import React from 'react';
import aboutHeroImg from '/assets/images/about/about-resources-hero.webp';

/**
 * AboutUsSection Component
 * Strictly adheres to the latest design reference (aboutusfreshdesign.pdf)
 * 
 * Section Structure:
 * 1. Hero Section:
 *    - Full-width dark forest-green background gradient (linear-gradient(105deg, #09372F 0%, #0C483D 50%, #0E4D41 100%))
 *    - Left: Small "About Us" pill badge with mint indicator dot, 2-line heading "About Ritam Consultancy" ("Ritam" in #F96815),
 *            and short description below it.
 *    - Right: 3D education illustration (Ritam logo chalkboard, books, graduation cap, globe, plant)
 *             inside the organic curved mint shape with thin curved orange outline (#F96815).
 *             (NO college building photo).
 * 2. Our Story Section:
 *    - Clean white background (#FFFFFF)
 *    - Heading: "Our Story" ("Our" in #044439, "Story" in #F96815)
 *    - Exactly the 3 paragraphs from reference with orange and bold highlights:
 *      - established in 2020 (orange bold)
 *      - 6+ years and thousands of students (bold)
 *      - 0% commission (orange bold)
 *    - Two metric cards side by side: "Established in 2020" and "Happy Students 1,000+"
 * 3. Two-Column Contact Section:
 *    - Left: Google Maps card with rounded corners (28px), subtle light-green border (2.5px solid #86EFAC),
 *            Ritam Consultancy overlay card (4.8 stars, 120 reviews, View larger map link),
 *            center red location pin + label badge, bottom thumbnail + Google logo, and zoom controls.
 *    - Right: "Get in Touch" ("Get in" in #044439, "Touch" in #F96815), description,
 *            Call Us (+91 76719 80580), and Email Us (admissions@ritamconsultancy.com & ritamconsultancy77@gmail.com).
 */
export default function AboutUsSection() {
  const googleMapsUrl = 'https://maps.app.goo.gl/z2KDhjNfTMerpFaj9';

  return (
    <div id="about-us" className="about-us-page-wrapper" style={styles.wrapper}>
      {/* Responsive Stylesheet */}
      <style>{`
        /* Hero Section */
        .about-hero-section {
          background-color: #012419 !important;
          background-image: linear-gradient(105deg, #012419 0%, #023A2A 25%, #035B41 55%, #047A59 100%) !important;
          width: 100%;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          padding: 0;
        }
        .about-hero-container {
          max-width: 1240px;
          width: 100%;
          margin: 0 auto;
          padding: 0 36px;
          display: grid;
          grid-template-columns: minmax(320px, 1.15fr) minmax(320px, 0.85fr);
          gap: 40px;
          align-items: center;
          box-sizing: border-box;
          position: relative;
          z-index: 2;
          min-height: 480px;
          height: 480px;
        }
        .about-hero-text {
          max-width: 540px;
          padding: 60px 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          z-index: 2;
          box-sizing: border-box;
        }
        .about-hero-img-col {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          height: 100%;
        }
        .about-curved-frame {
          position: relative;
          background: #E8F6F1;
          border: 3.5px solid #F96815;
          border-radius: 46% 54% 56% 44% / 48% 52% 48% 52%;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 440px;
          box-shadow: 0 20px 48px rgba(4, 68, 57, 0.28);
          overflow: hidden;
        }
        .about-illustration-img {
          width: 100%;
          height: auto;
          max-height: 320px;
          object-fit: contain;
          display: block;
        }

        /* Our Story Section */
        .about-story-section {
          background-color: #FFFFFF;
          width: 100%;
          padding: 68px 0 54px;
        }
        .about-story-container {
          max-width: 1240px;
          width: 100%;
          margin: 0 auto;
          padding: 0 36px;
          box-sizing: border-box;
        }
        .about-story-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 24px;
        }
        .about-story-body {
          max-width: 920px;
        }
        .about-metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(180px, 220px));
          gap: 20px;
          margin-top: 32px;
          width: 100%;
        }

        /* Lower Contact & Google Maps Section */
        .about-contact-section {
          background-color: #FFFFFF;
          width: 100%;
          padding: 40px 0 90px;
        }
        .about-contact-container {
          max-width: 1240px;
          width: 100%;
          margin: 0 auto;
          padding: 0 36px;
          display: grid;
          grid-template-columns: minmax(320px, 1.15fr) minmax(320px, 0.85fr);
          gap: 52px;
          align-items: center;
          box-sizing: border-box;
        }

        /* Mockup Map Card */
        .about-map-card-outer {
          background: #FFFFFF;
          border: 2.5px solid #86EFAC;
          border-radius: 28px;
          padding: 10px;
          box-shadow: 0 14px 40px rgba(4, 68, 57, 0.09);
          box-sizing: border-box;
          width: 100%;
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .about-map-card-outer:hover {
          box-shadow: 0 20px 48px rgba(4, 68, 57, 0.14);
        }
        .about-map-inner {
          position: relative;
          width: 100%;
          height: 420px;
          border-radius: 20px;
          overflow: hidden;
          background-color: #E5E7EB;
        }
        .about-map-iframe {
          border: 0;
          width: 100%;
          height: 100%;
          display: block;
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .about-hero-section {
            min-height: auto !important;
            height: auto !important;
            padding: 0 !important;
          }
          .about-hero-container {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            padding: 44px 24px !important;
            height: auto !important;
            min-height: auto !important;
          }
          .about-hero-text {
            max-width: 100% !important;
            padding: 0 !important;
            align-items: center !important;
            text-align: center !important;
          }
          .about-hero-img-col {
            width: 100% !important;
            justify-content: center !important;
            align-items: center !important;
            height: auto !important;
          }
          .about-story-container {
            padding: 0 24px !important;
          }
          .about-contact-container {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            padding: 0 24px !important;
          }
          .about-map-card-outer {
            max-width: 100% !important;
          }
        }

        @media (max-width: 640px) {
          .about-hero-section {
            padding: 0 !important;
          }
          .about-hero-container {
            padding: 38px 16px 42px !important;
            gap: 24px !important;
          }
          .about-hero-text {
            align-items: center !important;
            text-align: center !important;
          }
          .about-curved-frame {
            max-width: 280px !important;
            padding: 10px !important;
          }
          .about-story-section {
            padding: 40px 0 32px !important;
          }
          .about-story-container {
            padding: 0 16px !important;
          }
          .about-metrics-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .about-contact-section {
            padding: 36px 0 50px !important;
          }
          .about-contact-container {
            padding: 0 16px !important;
            gap: 32px !important;
          }
          .about-map-inner {
            height: 280px !important;
          }
        }
      `}</style>

      {/* =========================================================================
          1. HERO SECTION: Full-Width Dark Forest-Green Gradient
          ========================================================================= */}
      <section className="about-hero-section">
        <div className="about-hero-container">
          {/* Left Column: Pill Badge, Two-Line Heading, Short Description */}
          <div className="about-hero-text reveal-on-scroll is-visible">
            {/* Small About Us Pill Badge */}
            <div style={styles.pillBadge}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <span>About Us</span>
            </div>

            {/* Main Two-Line Heading: About Ritam in White & Orange, Consultancy in White */}
            <h1 style={styles.heroHeading} className="nav-text-stretch anim-words">
              About <span style={styles.orangeHighlight} className="anim-letters">Ritam</span> <br />
              Consultancy
            </h1>

            {/* Short Description below heading */}
            <p style={styles.heroDescription}>
              Your trusted guide for B.Tech admissions, career planning, and the right engineering college across India.
            </p>
          </div>

          {/* Right Column: 3D Education Illustration in Curved Soft Mint Frame with Orange Border */}
          <div className="about-hero-img-col reveal-on-scroll is-visible">
            <div className="about-curved-frame">
              <img
                src={aboutHeroImg}
                alt="Ritam Consultancy Education Guidance and Career Planning Illustration"
                className="about-illustration-img"
                loading="eager"
                fetchPriority="high"
                width="520"
                height="420"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. OUR STORY SECTION: Clean White Background with 3 Exact Paragraphs & Metrics
          ========================================================================= */}
      <section className="about-story-section">
        <div className="about-story-container">
          <div className="about-story-header">
            <h2 style={styles.storyHeading} className="anim-words">
              Our <span style={styles.orangeHighlight} className="anim-letters">Story</span>
            </h2>
          </div>

          <div className="about-story-body">
            {/* Paragraph 1: established in 2020 (orange bold) */}
            <p style={styles.storyParagraph}>
              Ritam Consultancy is an educational consultancy established in{' '}
              <strong style={styles.orangeBold}>2020</strong> with a simple goal: to make the
              engineering admission process easier, clearer, and stress-free for every student.
            </p>

            {/* Paragraph 2: 6+ years and thousands of students (bold) */}
            <p style={styles.storyParagraph}>
              Over the past <strong>6+ years</strong>, we've guided{' '}
              <strong>thousands of students</strong> across India in choosing the right engineering
              colleges, understanding the admission process, and planning their careers with
              confidence.
            </p>

            {/* Paragraph 3: 0% commission (orange bold) */}
            <p style={styles.storyParagraph}>
              We believe in a transparent and student-first approach. Our guidance is completely
              free for students, with <strong style={styles.orangeBold}>0% commission</strong> from
              students' side. We work only with trusted college partners to help you get the best
              options based on your profile, interests, and career goals.
            </p>

            {/* Two Compact Metric Cards side by side */}
            <div className="about-metrics-grid">
              {/* Metric Card 1: Established in 2020 */}
              <div style={styles.metricCard} className="hover-lift">
                <div style={styles.metricIconBox}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#044439" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div style={styles.metricTextBox}>
                  <span style={styles.metricLabel}>Established in</span>
                  <span style={styles.metricValue}>2020</span>
                </div>
              </div>

              {/* Metric Card 2: Happy Students 1,000+ */}
              <div style={styles.metricCard} className="hover-lift">
                <div style={styles.metricIconBox}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#044439" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <div style={styles.metricTextBox}>
                  <span style={styles.metricLabel}>Happy Students</span>
                  <span style={styles.metricValue}>1,000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. LOWER SECTION: GOOGLE MAPS CARD & GET IN TOUCH (Two-Column Layout)
          ========================================================================= */}
      <section className="about-contact-section">
        <div className="about-contact-container">
          {/* Left Column: Clean Interactive Google Map without Overlays */}
          <div className="about-map-card-outer">
            <div className="about-map-inner">
              <iframe
                title="Ritam Consultancy Hyderabad Office Location"
                src="https://maps.google.com/maps?q=137%2FB%2C+Opp.+to+Sri+Amogha+Junior+College%2C+BK+Guda%2C+Balkampet%2C+Hyderabad%2C+Telangana+500038&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="about-map-iframe"
                style={{
                  border: 0,
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  borderRadius: '18px',
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: 'Get in Touch' Contact Information */}
          <div style={styles.touchRightCol} className="reveal-on-scroll is-visible">
            <div style={styles.touchHeader}>
              <h2 style={styles.touchTitle} className="anim-words">
                Get in <span style={styles.orangeHighlight} className="anim-letters">Touch</span>
              </h2>
              <p style={styles.touchSubtitle}>
                Have questions? We're here to help you with college admissions and guidance.
              </p>
            </div>

            <div style={styles.contactItemsGroup}>
              {/* Call Us Item */}
              <div style={styles.contactRowItem}>
                <div style={styles.contactCircleIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#044439" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div style={styles.contactDetails}>
                  <span style={styles.contactLabel}>Call Us</span>
                  <a href="tel:+917671980580" style={styles.contactValueBig}>
                    +91 76719 80580
                  </a>
                </div>
              </div>

              {/* Email Us Item with both specified emails */}
              <div style={styles.contactRowItem}>
                <div style={styles.contactCircleIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#044439" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div style={styles.contactDetails}>
                  <span style={styles.contactLabel}>Email Us</span>
                  <a href="mailto:admissions@ritamconsultancy.com" style={styles.contactEmail}>
                    admissions@ritamconsultancy.com
                  </a>
                  <a href="mailto:ritamconsultancy77@gmail.com" style={styles.contactEmail}>
                    ritamconsultancy77@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: '#FFFFFF',
    position: 'relative',
    width: '100%',
    overflowX: 'clip',
  },
  pillBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    padding: '6px 14px',
    borderRadius: '9999px',
    fontSize: '11.5px',
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    marginBottom: '20px',
  },
  pillDot: {
    color: '#A3D8CD',
    fontSize: '14px',
  },
  heroHeading: {
    fontSize: 'clamp(30px, 3.5vw, 42px)',
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: '1.22',
    letterSpacing: '-0.6px',
    margin: '0 0 16px',
    overflowWrap: 'break-word',
    wordBreak: 'normal',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  heroDescription: {
    fontSize: '15.5px',
    lineHeight: '1.65',
    color: '#E2ECE9',
    fontWeight: '500',
    maxWidth: '520px',
    margin: 0,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  orangeHighlight: {
    color: '#F96815',
  },
  orangeBold: {
    color: '#F96815',
    fontWeight: '700',
  },

  /* Our Story Styles */
  storyHeading: {
    fontSize: 'clamp(30px, 3.6vw, 40px)',
    fontWeight: '800',
    color: '#044439',
    lineHeight: '1.2',
    letterSpacing: '-0.8px',
    margin: '0 0 12px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  storyAccentBar: {
    width: '52px',
    height: '3.5px',
    backgroundColor: '#044439',
    borderRadius: '2px',
    marginBottom: '24px',
  },
  storyParagraph: {
    fontSize: '16px',
    lineHeight: '1.75',
    color: '#4B5563',
    fontWeight: '500',
    maxWidth: '820px',
    margin: '0 0 18px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  metricCard: {
    backgroundColor: '#F4FBF8',
    border: '1.5px solid #C7EED8',
    borderRadius: '16px',
    padding: '12px 18px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    boxShadow: '0 4px 12px rgba(4, 68, 57, 0.04)',
    boxSizing: 'border-box',
  },
  metricIconBox: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    backgroundColor: '#D9F3EA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  metricTextBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  metricLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#6B7280',
    lineHeight: '1.2',
  },
  metricValue: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#044439',
    lineHeight: '1.2',
    letterSpacing: '-0.4px',
  },

  /* Contact Right Column */
  touchRightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  touchHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  touchTitle: {
    fontSize: 'clamp(28px, 3.4vw, 36px)',
    fontWeight: '800',
    color: '#044439',
    lineHeight: '1.2',
    letterSpacing: '-0.6px',
    margin: 0,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  touchSubtitle: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#4B5563',
    fontWeight: '500',
    margin: 0,
  },
  contactItemsGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    marginTop: '8px',
  },
  contactRowItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
  },
  contactCircleIcon: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    backgroundColor: '#D1FAE5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(4, 68, 57, 0.06)',
  },
  contactDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  contactLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#6B7280',
    lineHeight: '1.2',
  },
  contactValueBig: {
    fontSize: '17px',
    fontWeight: '800',
    color: '#111827',
    textDecoration: 'none',
    letterSpacing: '-0.3px',
  },
  contactEmail: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#044439',
    textDecoration: 'none',
    wordBreak: 'break-all',
  },
};
