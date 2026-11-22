import React from 'react';
import { WhatsAppIcon } from '../../../assets/icons/Icons';
import { getWhatsAppUri } from '../../../utils/formatting';

export default function WhatsAppFloat({
  phone = '7671980580',
  message = 'Hi Ritam Consultancy, I would like guidance for B.Tech Admissions.',
}) {
  const whatsappUrl = getWhatsAppUri(phone, message);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn hover-lift"
      aria-label="Chat with Ritam Counselor on WhatsApp"
      style={styles.container}
    >
      <style>{`
        @media (max-width: 768px) {
          .whatsapp-float-btn {
            bottom: 20px !important;
            right: 20px !important;
            width: 52px !important;
            height: 52px !important;
            padding: 0 !important;
            border-radius: 50% !important;
            background-color: #25D366 !important;
            border: none !important;
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 0 !important;
          }
          .whatsapp-float-circle {
            width: 52px !important;
            height: 52px !important;
            background-color: transparent !important;
            animation: none !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .whatsapp-float-text-col {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .whatsapp-float-btn {
            bottom: 16px !important;
            right: 16px !important;
            width: 50px !important;
            height: 50px !important;
          }
          .whatsapp-float-circle {
            width: 50px !important;
            height: 50px !important;
          }
        }
      `}</style>
      <div style={styles.iconCircle} className="whatsapp-float-circle">
        <WhatsAppIcon size={26} color="#FFFFFF" />
      </div>
      <div style={styles.textCol} className="whatsapp-float-text-col">
        <div style={styles.topRow}>
          <span style={styles.onlineDot} aria-hidden="true" />
          <span style={styles.title} className="whatsapp-float-title">Counselors Active</span>
        </div>
        <span style={styles.subtitle} className="whatsapp-float-subtitle">Chat on WhatsApp</span>
      </div>
    </a>
  );
}

const styles = {
  container: {
    position: 'fixed',
    bottom: '28px',
    right: '28px',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#FFFFFF',
    padding: '8px 20px 8px 8px',
    borderRadius: '9999px',
    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.16)',
    border: '1.5px solid rgba(37, 211, 102, 0.45)',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  iconCircle: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#25D366',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    animation: 'pulseGlow 2.5s infinite',
    flexShrink: 0,
  },
  textCol: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.25,
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  onlineDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10B981',
    display: 'inline-block',
  },
  title: {
    fontSize: '13px',
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: '12px',
    color: '#059669',
    fontWeight: '700',
  },
};

