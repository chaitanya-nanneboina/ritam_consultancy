import React from 'react';

/**
 * ResourcesSection Component
 * Accurately reproduces the exact layout, 3-column desktop grid, typography,
 * organic hero illustration with orange curve, and working View/Download PDF buttons
 * from `reosucespage.pdf`.
 */
export default function ResourcesSection() {
  const resourceGuides = [
    {
      id: 'res-marks-money',
      image: '/assets/images/resources/resource-marks-money.webp',
      alt: 'Intermediate Marks Can Save You Money',
      title: 'Your Intermediate Marks Can Save You Money!',
      description: 'Understand B.Tech fee concessions, scholarships and eligibility criteria.',
      format: 'PDF',
      pages: '18 Pages',
      pdfUrl: '/docs/ritam_guide.pdf',
      fileName: 'ritam_guide.pdf',
    },
    {
      id: 'res-branches-future',
      image: '/assets/images/resources/resource-branches-future.webp',
      alt: 'Which B.Tech Branch Will Shape Your Future',
      title: 'Which B.Tech Branch Will Shape Your Future?',
      description: 'Explore the best engineering branches, career opportunities and future scope.',
      format: 'PDF',
      pages: '19 Pages',
      pdfUrl: '/docs/ritam_branchguide.pdf',
      fileName: 'ritam_branchguide.pdf',
    },
    {
      id: 'res-deemed-vs-private',
      image: '/assets/images/resources/resource-deemed-vs-private.webp',
      alt: 'Deemed vs Private Universities Which Is Better',
      title: 'Deemed vs Private Universities: Which Is Better?',
      description: 'Understand the differences, advantages, fees and which type suits your goals.',
      format: 'PDF',
      pages: '18 Pages',
      pdfUrl: '/docs/ritam_universityguide.pdf',
      fileName: 'ritam_universityguide.pdf',
    },
    {
      id: 'res-admission-mistakes',
      image: '/assets/images/resources/resource-admission-mistakes.webp',
      alt: 'Dont Make These B.Tech Admission Mistakes',
      title: 'Dont Make These B.Tech Admission Mistakes !',
      description: 'Understand the differences, advantages, fees and which type suits your goals.',
      format: 'PDF',
      pages: '18 Pages',
      pdfUrl: '/docs/ritam_admissionguide.pdf',
      fileName: 'ritam_admissionguide.pdf',
    },
  ];

  const handleDownloadPdf = async (e, pdfUrl, fileName) => {
    e.preventDefault();
    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }, 10000);
    } catch (err) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = fileName;
      link.target = '_self';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
      }, 5000);
    }
  };

  return (
    <div className="ritam-resources-wrapper" style={styles.wrapper}>
      {/* Responsive Styles matching PDF layout */}
      <style>{`
        .resources-hero-banner {
          background-color: #012419 !important;
          background-image: linear-gradient(105deg, #012419 0%, #023A2A 25%, #035B41 55%, #047A59 100%) !important;
          width: 100%;
          overflow: hidden;
          position: relative;
          box-sizing: border-box;
          padding: 0 !important;
          min-height: 480px;
          height: 480px;
        }
        .resources-hero-container {
          max-width: 1240px;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(320px, 1.15fr) minmax(320px, 0.85fr);
          gap: 40px;
          align-items: center;
          padding: 0 36px;
          box-sizing: border-box;
          position: relative;
          z-index: 2;
          min-height: 480px;
          height: 480px;
        }
        .resources-hero-text {
          max-width: 540px;
          padding: 60px 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          box-sizing: border-box;
          z-index: 2;
        }
        .resources-hero-illus-col {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          height: 100%;
          width: 100%;
          z-index: 2;
          box-sizing: border-box;
        }
        .resources-organic-frame {
          position: relative;
          width: 100%;
          max-width: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .resources-hero-img {
          width: 100%;
          height: auto;
          max-height: 380px;
          object-fit: contain;
          display: block;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.25));
        }
        .resources-content-container {
          max-width: 1240px;
          width: 100%;
          margin: 0 auto;
          padding: 60px 36px 90px;
          box-sizing: border-box;
        }
        .resources-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        @media (min-width: 641px) {
          .nowrap-desktop {
            white-space: nowrap !important;
          }
        }
        @media (max-width: 1024px) {
          .resources-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 992px) {
          .resources-hero-banner {
            min-height: auto !important;
            height: auto !important;
            padding: 0 !important;
          }
          .resources-hero-container {
            grid-template-columns: 1fr !important;
            padding: 44px 24px !important;
            text-align: center !important;
            gap: 28px !important;
            min-height: auto !important;
            height: auto !important;
          }
          .resources-hero-text {
            max-width: 100% !important;
            padding: 0 !important;
            align-items: center !important;
            text-align: center !important;
          }
          .resources-hero-illus-col {
            width: 100% !important;
            justify-content: center !important;
            align-items: center !important;
            height: auto !important;
          }
          .resources-hero-img {
            max-width: 400px !important;
            max-height: 280px !important;
            margin: 0 auto !important;
          }
          .resources-content-container {
            padding: 45px 24px 70px !important;
          }
        }
        @media (max-width: 640px) {
          .resources-hero-container {
            padding: 38px 16px 42px !important;
            gap: 24px !important;
          }
          .resources-hero-img {
            max-width: 320px !important;
            max-height: 220px !important;
          }
          .resources-content-container {
            padding: 36px 16px 60px !important;
          }
          .resources-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>

      {/* 1. Deep Forest Green Hero Banner matching reosucespage.pdf */}
      <section className="resources-hero-banner">
        <div className="resources-hero-container">
          <div className="resources-hero-text reveal-on-scroll is-visible">
            {/* Pill Badge */}
            <div style={styles.pillBadge}>
              <span style={styles.pillDot}>•</span>
              <span>Resource Hub</span>
            </div>

            <h1 style={styles.heroHeading} className="nav-text-stretch anim-words">
              Helpful Resources for <br />
              <span className="nowrap-desktop">
                <span style={styles.orangeHighlight} className="anim-letters">Your B.Tech Journey</span>
              </span>
            </h1>

            <p style={styles.heroSubtitle} className="nav-subtext-reveal">
              Download practical guides, checklists and planners to make smarter
              engineering college decisions.
            </p>
          </div>

          <div className="resources-hero-illus-col reveal-on-scroll is-visible">
            <div className="resources-organic-frame">
              <img
                src="/assets/images/resources/resources-student-bulb.png"
                alt="Helpful Resources for Engineering Admissions"
                className="resources-hero-img"
                loading="eager"
                fetchPriority="high"
                width="480"
                height="380"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Download Free Resources Section */}
      <section style={styles.contentSection}>
        <div className="resources-content-container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle} className="anim-words">
              Download Free <span style={styles.orangeHighlight} className="anim-letters">Resources</span>
            </h2>
            <p style={styles.sectionSubtitle}>
              Handpicked guides, checklists and planners to help you choose and join the right
              engineering college.
            </p>
          </div>

          {/* 3. 3-Column Cards Grid matching reosucespage.pdf */}
          <div className="resources-cards-grid anim-cards-container">
            {resourceGuides.map((guide) => (
              <div key={guide.id} style={styles.resourceCard} className="hover-lift anim-card">
                {/* Card Top Rounded Image */}
                <div style={styles.cardImageContainer}>
                  <img
                    src={guide.image}
                    alt={guide.alt}
                    style={styles.cardImage}
                    loading="lazy"
                    width="400"
                    height="210"
                  />
                </div>

                {/* Card Details */}
                <div style={styles.cardBody}>
                  <h3 style={styles.cardTitle}>{guide.title}</h3>
                  <p style={styles.cardDescription}>{guide.description}</p>

                  {/* Metadata Row: 📄 PDF • 18 Pages */}
                  <div style={styles.metaRow}>
                    <span style={styles.docIcon} aria-hidden="true">📄</span>
                    <span style={styles.metaText}>{guide.format}</span>
                    <span style={styles.metaDot}>•</span>
                    <span style={styles.metaText}>{guide.pages}</span>
                  </div>

                  {/* Action Button: Download PDF (Full Width matching Figma reference) */}
                  <div style={styles.btnRow}>
                    <a
                      href={guide.pdfUrl}
                      download={guide.fileName}
                      onClick={(e) => handleDownloadPdf(e, guide.pdfUrl, guide.fileName)}
                      style={styles.downloadBtn}
                      className="hover-lift"
                      aria-label={`Download ${guide.title} PDF`}
                    >
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    minHeight: '80vh',
  },
  pillBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    color: '#FFFFFF',
    padding: '6px 14px',
    borderRadius: '9999px',
    fontSize: '11.5px',
    fontWeight: '700',
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    marginBottom: '20px',
  },
  pillDot: {
    color: '#A3D8CD',
    fontSize: '14px',
    lineHeight: 1,
  },
  heroHeading: {
    fontSize: 'clamp(30px, 3.5vw, 42px)',
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: '1.22',
    letterSpacing: '-0.6px',
    margin: '0 0 16px 0',
  },
  orangeHighlight: {
    color: '#F96815',
  },
  heroSubtitle: {
    fontSize: '15.5px',
    color: '#E2ECE9',
    lineHeight: '1.65',
    maxWidth: '520px',
    margin: 0,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  organicBackdropSvg: {
    position: 'absolute',
    top: '-5%',
    left: '-5%',
    width: '110%',
    height: '110%',
    zIndex: 1,
    pointerEvents: 'none',
  },
  contentSection: {
    backgroundColor: '#FFFFFF',
    padding: '20px 0 60px',
    width: '100%',
  },
  sectionHeader: {
    textAlign: 'left',
    marginBottom: '36px',
  },
  sectionTitle: {
    fontSize: 'clamp(28px, 3.2vw, 36px)',
    fontWeight: '800',
    color: '#111827',
    letterSpacing: '-0.5px',
    margin: '0 0 8px 0',
  },
  sectionSubtitle: {
    fontSize: '15px',
    color: '#6B7280',
    lineHeight: '1.5',
    margin: 0,
  },
  resourceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '18px',
    border: '1px solid #E5E7EB',
    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: '16px',
    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  cardImageContainer: {
    width: '100%',
    height: '200px',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  cardBody: {
    padding: '16px 4px 4px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#111827',
    lineHeight: '1.35',
    margin: '0 0 8px 0',
    minHeight: '48px',
  },
  cardDescription: {
    fontSize: '13.5px',
    color: '#6B7280',
    lineHeight: '1.5',
    margin: '0 0 14px 0',
    flexGrow: 1,
  },
  metaRow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#F3F4F6',
    padding: '4px 10px',
    borderRadius: '6px',
    width: 'fit-content',
    fontSize: '12px',
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: '16px',
  },
  docIcon: {
    fontSize: '12px',
  },
  metaText: {
    fontSize: '12px',
  },
  metaDot: {
    color: '#9CA3AF',
  },
  btnRow: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  downloadBtn: {
    width: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#044439',
    color: '#FFFFFF',
    border: 'none',
    padding: '11px 16px',
    borderRadius: '8px',
    fontSize: '13.5px',
    fontWeight: '700',
    textDecoration: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(4, 68, 57, 0.16)',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
  },
};
