import React from 'react';
import { HOME_PAGE_DATA } from '../../../../data/homeData';

export default function ZeroCommission() {
  const { badge, heading, subtext, trustBadges, shieldImage } = HOME_PAGE_DATA.zeroCommission;

  return (
    <section className="zero-commission-section" style={styles.section}>
      <style>{`
        @media (max-width: 992px) {
          .zero-commission-container {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
            text-align: center !important;
          }
          .zero-commission-right {
            align-items: center !important;
            text-align: center !important;
          }
          .zero-commission-subtext {
            margin: 0 auto !important;
          }
          .zero-trust-row {
            justify-content: center !important;
          }
        }
        @media (max-width: 640px) {
          .zero-commission-section {
            padding: 50px 16px !important;
          }
          .zero-shield-img {
            max-width: 200px !important;
          }
          .zero-commission-heading {
            font-size: clamp(23px, 6.5vw, 32px) !important;
            line-height: 1.25 !important;
          }
          .zero-commission-subtext {
            font-size: 14px !important;
            line-height: 1.6 !important;
          }
          .zero-trust-row {
            flex-direction: column !important;
            width: 100% !important;
            max-width: 320px !important;
            margin: 0 auto !important;
            gap: 10px !important;
          }
          .zero-trust-pill {
            width: 100% !important;
            justify-content: center !important;
            padding: 10px 16px !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
      <div style={styles.container} className="zero-commission-container">
        {/* Left Side: 3D Shield Graphic from user folder */}
        <div style={styles.leftCol} className="reveal-on-scroll is-visible">
          <div style={styles.shieldWrapper}>
            <img
              src={shieldImage}
              alt="0% Commission Guarantee"
              style={styles.shieldImg}
              className="hover-scale zero-shield-img"
            />
          </div>
        </div>

        {/* Right Side: Copy & Trust Pills */}
        <div style={styles.rightCol} className="zero-commission-right reveal-on-scroll is-visible delay-1">
          <div style={styles.pillBadge}>
            <span style={styles.pillIcon}>🌿</span>
            <span style={styles.pillText}>{badge}</span>
          </div>

          <h2 style={styles.heading} className="zero-commission-heading">
            {heading.prefix}
            <span style={styles.highlight}>{heading.highlight}</span>
          </h2>

          <p style={styles.subtext} className="zero-commission-subtext">{subtext}</p>

          {/* 3 Trust Badges Row */}
          <div style={styles.trustBadgesRow} className="zero-trust-row">
            {trustBadges.map((item) => (
              <div key={item.id} style={styles.trustPill} className="hover-lift zero-trust-pill">
                <span style={styles.trustIcon}>
                  {item.icon === 'gift' && '🎁'}
                  {item.icon === 'shield-check' && '🛡️'}
                  {item.icon === 'heart-handshake' && '🤝'}
                </span>
                <span style={styles.trustLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '85px 24px',
    backgroundColor: '#FAF8F5', /* Distinct warm cream separation */
    borderTop: '1px solid #EFEAE3',
    borderBottom: '1px solid #EFEAE3',
  },
  container: {
    maxWidth: '1240px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'minmax(280px, 0.9fr) minmax(320px, 1.2fr)',
    gap: '50px',
    alignItems: 'center',
  },
  leftCol: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shieldWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shieldImg: {
    width: '100%',
    maxWidth: '310px',
    height: 'auto',
    filter: 'drop-shadow(0 16px 32px rgba(4, 68, 57, 0.22))',
    animation: 'floatGentle 5s ease-in-out infinite',
  },
  rightCol: {
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
  highlight: {
    color: '#F96815',
  },
  subtext: {
    fontSize: '16px',
    color: '#4B5563',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    lineHeight: '1.65',
    maxWidth: '520px',
  },
  trustBadgesRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '12px',
  },
  trustPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E7EB',
    padding: '11px 20px',
    borderRadius: '9999px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    cursor: 'default',
  },
  trustIcon: {
    fontSize: '15px',
  },
  trustLabel: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#374151',
  },
};
