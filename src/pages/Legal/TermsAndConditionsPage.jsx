import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TERMS_AND_CONDITIONS_DATA } from '../../data/legalPoliciesData';

export default function TermsAndConditionsPage() {
  const data = TERMS_AND_CONDITIONS_DATA;
  const [activeSection, setActiveSection] = useState(data.sections[0].id);

  useEffect(() => {
    // Dynamic SEO Metadata updates
    document.title = 'Terms & Conditions | Ritam Consultancy — User & Client Agreement';

    const setMeta = (selector, attr, attrVal, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', 'description', 'Official Terms and Conditions of Ritam Consultancy governing website access, admission guidance services, student responsibilities, and legal understandings.');
    setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://www.ritamconsultancy.com/terms-and-conditions';

    // Scroll to top on page load
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Scroll-spy for Table of Contents
    const handleScroll = () => {
      const scrollY = window.scrollY;
      data.sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop - 140;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sec.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.sections]);

  const scrollToSection = (id, e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 100;
      const top = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="ritam-legal-page" style={styles.pageWrapper}>
      <style>{`
        .legal-hero-banner {
          background-color: #012419 !important;
          background-image: linear-gradient(105deg, #012419 0%, #023A2A 25%, #035B41 55%, #047A59 100%) !important;
          width: 100%;
          padding: 60px 24px 50px !important;
          color: #FFFFFF;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }
        .legal-hero-inner {
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .legal-layout-grid {
          max-width: 1240px;
          margin: 0 auto;
          padding: 45px 24px 80px;
          display: grid;
          grid-template-columns: 290px 1fr;
          gap: 40px;
          align-items: flex-start;
          box-sizing: border-box;
        }
        .legal-toc-sticky {
          position: sticky;
          top: 105px;
          background: #FFFFFF;
          border-radius: 16px;
          padding: 22px 18px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          border: 1px solid #E5E7EB;
          max-height: calc(100vh - 130px);
          overflow-y: auto;
        }
        .legal-toc-item {
          display: block;
          padding: 8px 10px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: #4B5563;
          text-decoration: none;
          transition: all 0.2s ease;
          line-height: 1.35;
          margin-bottom: 2px;
        }
        .legal-toc-item:hover {
          color: #044439;
          background-color: #F0FDF4;
        }
        .legal-toc-item.active {
          color: #044439;
          background-color: #E8F5F1;
          font-weight: 700;
          border-left: 3px solid #044439;
        }
        .legal-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .legal-document-paper {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 20px;
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.04);
          padding: 48px 56px;
          box-sizing: border-box;
        }
        .legal-section-block {
          padding-top: 34px;
          margin-top: 34px;
          border-top: 1px solid #F3F4F6;
        }
        .legal-section-block:first-of-type {
          padding-top: 0;
          margin-top: 0;
          border-top: none;
        }
        .legal-section-title {
          font-size: 20px;
          font-weight: 800;
          color: #044439;
          margin: 0 0 14px 0;
          scroll-margin-top: 110px;
          line-height: 1.35;
        }
        .legal-paragraph {
          font-size: 15.5px;
          line-height: 1.8;
          color: #374151;
          margin: 0 0 14px 0;
        }
        @media (max-width: 900px) {
          .legal-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            padding: 30px 16px 60px !important;
          }
          .legal-toc-sticky {
            display: none !important;
          }
          .legal-document-paper {
            padding: 28px 20px !important;
            border-radius: 16px !important;
          }
          .legal-hero-banner {
            padding: 45px 18px 40px !important;
          }
        }
      `}</style>

      {/* Hero Banner with Brand Gradient */}
      <section className="legal-hero-banner">
        <div className="legal-hero-inner">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={styles.breadcrumb}>
            <Link to="/" style={styles.breadLink}>Home</Link>
            <span style={styles.breadDivider}>/</span>
            <span style={styles.breadCurrent}>Terms &amp; Conditions</span>
          </nav>

          {/* Badge */}
          <div style={styles.badgeWrapper}>
            <span style={styles.badgePill}>
              <span style={styles.badgeDot} />
              {data.badge}
            </span>
          </div>

          {/* Heading */}
          <h1 style={styles.heading}>
            Terms &amp; <span style={{ color: '#F96815' }}>Conditions</span>
          </h1>

          <p style={styles.heroSubtext}>
            Clear and transparent guidelines establishing the mutual understanding between Ritam Consultancy and clients regarding services, responsibilities, and professional ethics.
          </p>

          {/* Document Meta Information Bar & Policy Switcher */}
          <div style={styles.metaBar}>
            <div style={styles.metaTagsGroup}>
              <span style={styles.metaTag}>
                <strong>Last Updated:</strong> {data.lastUpdated}
              </span>
              <span style={styles.metaDivider}>•</span>
              <span style={styles.metaTag}>
                <strong>Effective Date:</strong> {data.effectiveDate}
              </span>
              <span style={styles.metaDivider}>•</span>
              <span style={styles.metaTag}>
                <strong>Jurisdiction:</strong> India
              </span>
            </div>

            {/* Switch to Privacy */}
            <div style={styles.policySwitchGroup}>
              <span style={styles.switchLabel}>Related Document:</span>
              <Link to="/privacy-policy" className="legal-tab-btn" style={styles.switchBtn}>
                <span>Privacy Policy</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Layout Grid */}
      <main className="legal-layout-grid">
        {/* Sticky Desktop Table of Contents */}
        <aside className="legal-toc-sticky" aria-label="Table of contents">
          <div style={styles.tocHeader}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#044439', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Quick Navigation
            </span>
            <span style={{ fontSize: '11.5px', color: '#6B7280' }}>13 Sections</span>
          </div>

          <div style={styles.tocList}>
            {data.sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={(e) => scrollToSection(sec.id, e)}
                className={`legal-toc-item ${activeSection === sec.id ? 'active' : ''}`}
              >
                <span style={{ color: activeSection === sec.id ? '#044439' : '#9CA3AF', marginRight: '6px', fontSize: '12px', fontWeight: '700' }}>
                  {sec.number}.
                </span>
                {sec.title}
              </a>
            ))}
          </div>

          {/* Quick Counselor Support Callout */}
          <div style={styles.tocSupportCard}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#111827', display: 'block', marginBottom: '4px' }}>
              Need Clarification?
            </span>
            <p style={{ fontSize: '11px', color: '#4B5563', margin: '0 0 8px', lineHeight: 1.4 }}>
              Speak directly with an authorized counselor.
            </p>
            <a href="tel:+917671980580" style={styles.tocPhoneLink}>
              📞 +91 76719 80580
            </a>
          </div>
        </aside>

        {/* Entire Terms & Conditions in ONE Continuous Clean Document Paper */}
        <article className="legal-document-paper">
          {/* Document Title & Intro */}
          <header style={styles.docHeader}>
            <div style={styles.docMetaTag}>Official Client Agreement</div>
            <h2 style={styles.docMainTitle}>Ritam Consultancy Terms &amp; Conditions</h2>
            <p style={styles.docUpdatedLine}>Last Updated: {data.lastUpdated}</p>
          </header>

          <div style={styles.introBlock}>
            {data.intro.map((p, idx) => (
              <p key={idx} className="legal-paragraph" style={{ fontSize: '16px', color: '#1F2937' }}>
                {p}
              </p>
            ))}
          </div>

          <hr style={styles.docDivider} />

          {/* All 13 Sections - Flowing Continuously in One Document */}
          <div style={styles.sectionsFlow}>
            {data.sections.map((section) => (
              <section key={section.id} id={section.id} className="legal-section-block">
                <h3 className="legal-section-title">
                  {section.number}. {section.title}
                </h3>

                <div style={styles.sectionTextContainer}>
                  {section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="legal-paragraph">
                      {para}
                    </p>
                  ))}

                  {/* Optional Advisory Box if present */}
                  {section.callout && (
                    <div style={styles.inlineCallout}>
                      <strong style={styles.calloutTitle}>{section.callout.title}</strong>
                      <p style={styles.calloutBody}>{section.callout.text}</p>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>

          {/* Concluding Section within Document */}
          <footer style={styles.docFooter}>
            <h3 style={styles.footerHeading}>Questions About Terms of Engagement?</h3>
            <p className="legal-paragraph" style={{ marginBottom: '16px' }}>
              For inquiries regarding service agreements, admissions documentation, or our code of conduct, contact our office directly:
            </p>

            <div style={styles.footerContactGrid}>
              <div>
                <span style={styles.contactLabel}>Email Helpline:</span>
                <a href="mailto:admissions@ritamconsultancy.com" style={styles.contactLink}>
                  admissions@ritamconsultancy.com
                </a>
              </div>
              <div>
                <span style={styles.contactLabel}>Direct Telephone:</span>
                <a href="tel:+917671980580" style={styles.contactLink}>
                  +91 76719 80580
                </a>
              </div>
              <div>
                <span style={styles.contactLabel}>Head Office:</span>
                <span style={styles.contactAddress}>
                  Opp. to Sri Amogha Junior College, BK Guda, Balkampet, Hyderabad – 500038
                </span>
              </div>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}

const styles = {
  pageWrapper: {
    backgroundColor: '#F9FAFB',
    minHeight: '100vh',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13.5px',
    marginBottom: '16px',
    color: '#D1FAE5',
  },
  breadLink: {
    color: '#A7F3D0',
    textDecoration: 'none',
    fontWeight: '500',
  },
  breadDivider: {
    color: '#6EE7B7',
    opacity: 0.6,
  },
  breadCurrent: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  badgeWrapper: {
    marginBottom: '14px',
  },
  badgePill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    color: '#E8F5F1',
    padding: '6px 14px',
    borderRadius: '9999px',
    fontSize: '12.5px',
    fontWeight: '600',
  },
  badgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#10B981',
  },
  heading: {
    fontSize: 'clamp(28px, 4vw, 44px)',
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 1.15,
    margin: '0 0 14px',
    letterSpacing: '-0.02em',
  },
  heroSubtext: {
    fontSize: 'clamp(14px, 1.8vw, 16px)',
    color: '#D1FAE5',
    lineHeight: 1.6,
    maxWidth: '820px',
    margin: '0 0 24px',
  },
  metaBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
    paddingTop: '16px',
    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
  },
  metaTagsGroup: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    fontSize: '13px',
    color: '#E8F5F1',
  },
  metaTag: {
    opacity: 0.95,
  },
  metaDivider: {
    opacity: 0.4,
  },
  policySwitchGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  switchLabel: {
    fontSize: '12.5px',
    color: '#A7F3D0',
    fontWeight: '500',
  },
  switchBtn: {
    backgroundColor: '#FFFFFF',
    color: '#044439',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  },
  tocHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '12px',
    borderBottom: '1px solid #E5E7EB',
    marginBottom: '12px',
  },
  tocList: {
    display: 'flex',
    flexDirection: 'column',
  },
  tocSupportCard: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#E8F5F1',
    borderRadius: '10px',
    border: '1px solid #C6EADF',
  },
  tocPhoneLink: {
    display: 'inline-block',
    fontSize: '12px',
    fontWeight: '700',
    color: '#044439',
    textDecoration: 'none',
  },
  docHeader: {
    marginBottom: '24px',
  },
  docMetaTag: {
    fontSize: '12px',
    fontWeight: '800',
    color: '#044439',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '6px',
  },
  docMainTitle: {
    fontSize: 'clamp(22px, 2.5vw, 28px)',
    fontWeight: '800',
    color: '#111827',
    margin: '0 0 6px 0',
    lineHeight: 1.25,
  },
  docUpdatedLine: {
    fontSize: '13.5px',
    color: '#6B7280',
    margin: 0,
    fontWeight: '500',
  },
  introBlock: {
    marginBottom: '24px',
  },
  docDivider: {
    border: 'none',
    borderTop: '1.5px solid #E5E7EB',
    margin: '28px 0 32px 0',
  },
  sectionsFlow: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionTextContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  inlineCallout: {
    backgroundColor: '#EFF6FF',
    borderLeft: '4px solid #3B82F6',
    padding: '14px 18px',
    borderRadius: '0 10px 10px 0',
    margin: '8px 0 14px 0',
  },
  calloutTitle: {
    display: 'block',
    fontSize: '14px',
    color: '#1E40AF',
    marginBottom: '4px',
  },
  calloutBody: {
    fontSize: '13.5px',
    color: '#1E3A8A',
    lineHeight: 1.55,
    margin: 0,
  },
  docFooter: {
    marginTop: '48px',
    paddingTop: '32px',
    borderTop: '2px dashed #E5E7EB',
  },
  footerHeading: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#044439',
    margin: '0 0 10px 0',
  },
  footerContactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
    backgroundColor: '#F9FAFB',
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
    padding: '20px',
    marginTop: '12px',
  },
  contactLabel: {
    display: 'block',
    fontSize: '11.5px',
    color: '#6B7280',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '4px',
  },
  contactLink: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#044439',
    textDecoration: 'none',
  },
  contactAddress: {
    fontSize: '13.5px',
    color: '#374151',
    lineHeight: 1.45,
    display: 'block',
  },
};
