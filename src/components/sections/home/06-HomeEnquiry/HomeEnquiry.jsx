import React from 'react';
import { HOME_PAGE_DATA } from '../../../../data/homeData';
import EnquiryForm from '../../../forms/EnquiryForm/EnquiryForm';

export default function HomeEnquiry() {
  const { rightContent } = HOME_PAGE_DATA.enquirySection;

  return (
    <section id="enquiry-form-section" className="home-enquiry-section home-enquiry-root" style={styles.section}>
      <style>{`
        @media (max-width: 992px) {
          .home-enquiry-container {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .home-enquiry-form-col {
            order: 2 !important;
            width: 100% !important;
          }
          .home-enquiry-content-col {
            order: 1 !important;
            align-items: center !important;
            text-align: center !important;
          }
          .home-enquiry-subtext {
            margin: 0 auto !important;
          }
        }
        @media (max-width: 640px) {
          .home-enquiry-root {
            padding: 50px 16px 60px !important;
          }
          .home-enquiry-heading {
            font-size: clamp(23px, 6.5vw, 32px) !important;
            line-height: 1.25 !important;
          }
          .home-enquiry-subtext {
            font-size: 14px !important;
            line-height: 1.6 !important;
          }
        }
      `}</style>
      <div style={styles.container} className="home-enquiry-container">
        {/* Left Column: The Single Enquiry Form */}
        <div style={styles.formCol} className="home-enquiry-form-col reveal-on-scroll is-visible">
          <EnquiryForm />
        </div>

        {/* Right Column: Expert Guidance Value Prop */}
        <div style={styles.contentCol} className="home-enquiry-content-col reveal-on-scroll is-visible delay-1">
          <div style={styles.pillBadge}>
            <span style={styles.pillIcon}>🎓</span>
            <span style={styles.pillText}>{rightContent.badge}</span>
          </div>

          <h2 style={styles.heading} className="home-enquiry-heading">{rightContent.heading}</h2>

          <p style={styles.subtext} className="home-enquiry-subtext">{rightContent.subtext}</p>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '95px 24px',
    background: 'linear-gradient(180deg, #F8FAFA 0%, #EFF6F4 100%)',
    borderTop: '1px solid #E5ECE9',
  },
  container: {
    maxWidth: '1240px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'minmax(320px, 1.15fr) minmax(300px, 0.95fr)',
    gap: '56px',
    alignItems: 'center',
  },
  formCol: {
    display: 'flex',
    justifyContent: 'center',
  },
  contentCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '20px',
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
    fontSize: 'clamp(28px, 4vw, 42px)',
    fontWeight: '800',
    color: '#111827',
    lineHeight: '1.2',
    letterSpacing: '-0.8px',
  },
  subtext: {
    fontSize: '16px',
    color: '#4B5563',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    lineHeight: '1.65',
    maxWidth: '460px',
  },
};
