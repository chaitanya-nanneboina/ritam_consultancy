import React from 'react';
import { HOME_PAGE_DATA } from '../../../../data/homeData';

export default function GuidanceProcess() {
  const { badge, heading, subtext, image, steps, ctaButton } = HOME_PAGE_DATA.guidanceProcess;

  const handleTalkToCounsellor = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-talk-to-expert'));
  };

  return (
    <section id="guidance-section" className="guidance-process-section guidance-section-root" style={styles.section}>
      <style>{`
        @media (max-width: 992px) {
          .guidance-container {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .guidance-left-col {
            align-items: center !important;
            text-align: center !important;
          }
          .guidance-subtext {
            margin: 0 auto !important;
          }
          .guidance-photo-card {
            max-width: 480px !important;
            margin: 0 auto !important;
          }
        }
        @media (max-width: 640px) {
          .guidance-section-root {
            padding: 50px 16px 60px !important;
          }
          .guidance-heading {
            font-size: clamp(23px, 6.5vw, 32px) !important;
            line-height: 1.25 !important;
          }
          .guidance-subtext {
            font-size: 14px !important;
            line-height: 1.6 !important;
          }
          .guidance-photo-card {
            border-radius: 16px !important;
          }
          .guidance-photo-tags {
            gap: 6px !important;
            bottom: 10px !important;
            left: 10px !important;
            right: 10px !important;
            flex-wrap: wrap !important;
          }
          .guidance-photo-tag {
            font-size: 11.5px !important;
            padding: 5px 10px !important;
          }
          .guidance-timeline-row {
            gap: 12px !important;
          }
          .guidance-step-circle {
            width: 36px !important;
            height: 36px !important;
            font-size: 14px !important;
            min-width: 36px !important;
          }
          .guidance-track-line {
            left: 17px !important;
          }
          .guidance-step-card {
            padding: 16px 16px !important;
            border-radius: 16px !important;
          }
          .guidance-step-title {
            font-size: 15px !important;
          }
          .guidance-step-desc {
            font-size: 13.5px !important;
            line-height: 1.55 !important;
          }
          .guidance-cta-btn {
            width: 100% !important;
            max-width: 300px !important;
            justify-content: center !important;
          }
          .guidance-bottom-cta {
            align-items: center !important;
            text-align: center !important;
            width: 100% !important;
          }
        }
      `}</style>
      <div style={styles.container} className="guidance-container">
        {/* Left Column: Heading, Subtext, Photo with Floating Tags */}
        <div style={styles.leftCol} className="guidance-left-col reveal-on-scroll is-visible">
          <div style={styles.pillBadge}>
            <span style={styles.pillDot}>•</span>
            <span style={styles.pillText}>{badge}</span>
          </div>

          <h2 style={styles.heading} className="guidance-heading anim-words">
            Because Your
            <br />
            <span style={styles.highlight} className="anim-letters">Future Matters</span> to Us
          </h2>

          <p style={styles.subtext} className="guidance-subtext">{subtext}</p>

          {/* Photo Card with Floating Tags */}
          <div style={styles.photoCard} className="guidance-photo-card">
            <img
              src={image.src}
              alt={image.alt}
              style={styles.counselingImg}
              loading="lazy"
              width="480"
              height="320"
            />
            {/* Overlaid Badges */}
            <div style={styles.photoTagsGroup} className="guidance-photo-tags">
              <div style={styles.photoTag} className="guidance-photo-tag">
                <span style={styles.tagDot}>•</span>
                <span>{image.tags[0]}</span>
              </div>
              <div style={styles.photoTag} className="guidance-photo-tag">
                <span style={styles.tagDot}>•</span>
                <span>{image.tags[1]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 4-Step Process Timeline with Connected Track */}
        <div style={styles.rightCol} className="reveal-on-scroll is-visible">
          <div style={styles.timelineList} className="guidance-timeline-list">
            {/* Continuous vertical timeline connector line */}
            <div style={styles.timelineTrackLine} className="guidance-track-line" aria-hidden="true" />

            {steps.map((st) => (
              <div key={st.number} style={styles.timelineRow} className="timeline-row guidance-timeline-row guidance-step-item">
                {/* Step Number Circle */}
                <div style={styles.stepNumCircle} className="guidance-step-circle">
                  <span>{st.number}</span>
                </div>

                {/* Step Card Box */}
                <div style={styles.stepCard} className="hover-lift guidance-step-card">
                  <h3 style={styles.stepTitle} className="guidance-step-title">{st.title}</h3>
                  <p style={styles.stepDesc} className="guidance-step-desc">{st.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action CTA */}
          <div style={styles.bottomCtaWrapper} className="guidance-bottom-cta">
            <a
              href="#talk-to-expert"
              onClick={handleTalkToCounsellor}
              style={styles.counsellorBtn}
              className="hover-lift guidance-cta-btn"
            >
              <span>{ctaButton.label}</span>
              <span>➔</span>
            </a>
            <span style={styles.counsellorSubtext}>{ctaButton.subtext}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '80px 24px',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  container: {
    maxWidth: '1240px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'minmax(320px, 480px) 1fr',
    gap: '56px',
    alignItems: 'flex-start',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px',
  },
  pillBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#E8F5F1',
    border: '1px solid #A3D8CD',
    padding: '6px 16px',
    borderRadius: '9999px',
    marginBottom: '4px',
  },
  pillDot: {
    color: '#044439',
    fontSize: '14px',
    fontWeight: '800',
    lineHeight: 1,
  },
  pillText: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#044439',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  heading: {
    fontSize: 'clamp(32px, 3.8vw, 44px)',
    fontWeight: '800',
    color: '#111827',
    lineHeight: '1.2',
    letterSpacing: '-0.8px',
    margin: '0 0 4px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
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
    maxWidth: '460px',
    margin: '0 0 12px',
  },
  photoCard: {
    position: 'relative',
    width: '100%',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 12px 32px rgba(4, 68, 57, 0.08)',
    border: '1px solid #EAECF0',
  },
  counselingImg: {
    width: '100%',
    height: '310px',
    objectFit: 'cover',
    display: 'block',
  },
  photoTagsGroup: {
    position: 'absolute',
    bottom: '16px',
    left: '16px',
    right: '16px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  photoTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    padding: '7px 16px',
    borderRadius: '9999px',
    fontSize: '12.5px',
    fontWeight: '700',
    color: '#044439',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(163, 216, 205, 0.4)',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  tagDot: {
    color: '#F96815',
    fontWeight: '800',
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    position: 'relative',
  },
  timelineList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    position: 'relative',
  },
  timelineTrackLine: {
    position: 'absolute',
    left: '21px',
    top: '24px',
    bottom: '24px',
    width: '2px',
    backgroundColor: '#E2ECE9',
    zIndex: 1,
  },
  timelineRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    position: 'relative',
    zIndex: 2,
  },
  stepNumCircle: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    border: '2px solid #044439',
    color: '#044439',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '15px',
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(4, 68, 57, 0.08)',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    zIndex: 2,
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #EAECF0',
    borderRadius: '16px',
    padding: '18px 24px',
    flex: 1,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
    transition: 'all 0.25s ease',
  },
  stepTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 6px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  stepDesc: {
    fontSize: '13.5px',
    color: '#4B5563',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    lineHeight: '1.55',
    margin: 0,
  },
  bottomCtaWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    flexWrap: 'wrap',
    paddingLeft: '4px',
    marginTop: '4px',
  },
  counsellorBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#044439',
    color: '#FFFFFF',
    padding: '13px 28px',
    borderRadius: '9999px',
    fontWeight: '700',
    fontSize: '14.5px',
    textDecoration: 'none',
    boxShadow: '0 6px 16px rgba(4, 68, 57, 0.2)',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    transition: 'all 0.2s ease',
  },
  counsellorSubtext: {
    fontSize: '13.5px',
    color: '#6B7280',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
};
