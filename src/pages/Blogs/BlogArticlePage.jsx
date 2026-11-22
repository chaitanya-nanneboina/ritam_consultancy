import React, { useEffect, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BLOG_ARTICLES } from '../../data/blogArticlesData';
import ArticleMarkdownRenderer, { extractTocFromMarkdown } from '../../components/article/ArticleMarkdownRenderer';
import TableOfContents from '../../components/article/TableOfContents';

/**
 * BlogArticlePage - Editorial Long-Form Reading Experience
 *
 * Implements a clean, premium, SEO-friendly two-column layout:
 * - Left side: Static, sticky Table of Contents that tracks scroll position.
 * - Right side: Single continuous reading column with complete unabridged article content.
 * - Fully responsive: Collapsible dropdown on mobile.
 * - Minimal, publication-style visual aesthetic with comfortable reading width and generous whitespace.
 */
export default function BlogArticlePage() {
  const { slug } = useParams();
  const articleIndex = BLOG_ARTICLES.findIndex((a) => a.slug === slug);
  const article = articleIndex !== -1 ? BLOG_ARTICLES[articleIndex] : null;

  // Navigation between the 3 articles
  const prevArticle = articleIndex > 0 ? BLOG_ARTICLES[articleIndex - 1] : null;
  const nextArticle =
    articleIndex < BLOG_ARTICLES.length - 1 ? BLOG_ARTICLES[articleIndex + 1] : null;

  // Extract Table of Contents items from the markdown content
  const toc = useMemo(() => {
    if (!article || !article.contentMarkdown) return [];
    return extractTocFromMarkdown(article.contentMarkdown);
  }, [article]);

  // Update dynamic SEO Metadata
  useEffect(() => {
    if (article) {
      document.title = article.seoTitle || article.title;

      const setMeta = (selector, attr, attrVal, content) => {
        let el = document.querySelector(selector);
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute(attr, attrVal);
          document.head.appendChild(el);
        }
        el.setAttribute('content', content);
      };

      setMeta('meta[name="description"]', 'name', 'description', article.metaDescription);
      setMeta(
        'meta[name="keywords"]',
        'name',
        'keywords',
        article.keywords ||
          `${article.category}, engineering admissions 2027, B.Tech guidance, Ritam Consultancy, ${article.title}`
      );
      setMeta('meta[name="author"]', 'name', 'author', 'Ritam Consultancy Advisory Team');
      setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow');

      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = article.canonicalUrl;

      // Open Graph
      setMeta('meta[property="og:title"]', 'property', 'og:title', article.seoTitle);
      setMeta('meta[property="og:description"]', 'property', 'og:description', article.metaDescription);
      setMeta('meta[property="og:url"]', 'property', 'og:url', article.canonicalUrl);
      setMeta('meta[property="og:type"]', 'property', 'og:type', 'article');
      setMeta('meta[property="og:image"]', 'property', 'og:image', `https://www.ritamconsultancy.com${article.image}`);

      // Twitter Card
      setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
      setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', article.seoTitle);
      setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', article.metaDescription);
      setMeta('meta[name="twitter:url"]', 'name', 'twitter:url', article.canonicalUrl);
      setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', `https://www.ritamconsultancy.com${article.image}`);

      // JSON-LD Structured Data Schema (BlogPosting)
      let schemaScript = document.getElementById('ritam-page-schema');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'ritam-page-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.seoTitle || article.title,
        name: article.title,
        description: article.metaDescription,
        keywords: article.keywords,
        articleSection: article.category,
        image: `https://www.ritamconsultancy.com${article.image}`,
        datePublished: '2026-11-22T00:00:00+05:30',
        dateModified: '2026-11-22T00:00:00+05:30',
        inLanguage: 'en-IN',
        author: {
          '@type': 'Organization',
          name: 'Ritam Consultancy Advisory Team',
          url: 'https://www.ritamconsultancy.com',
        },
        publisher: {
          '@type': 'EducationalOrganization',
          name: 'Ritam Consultancy',
          url: 'https://www.ritamconsultancy.com',
          logo: 'https://www.ritamconsultancy.com/assets/images/logo/ritam-logo.webp',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': article.canonicalUrl,
        },
      });
    }

    // Scroll to top on slug change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article, slug]);

  if (!article) {
    return <Navigate to="/blogs" replace />;
  }

  const handleTalkToExpert = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-talk-to-expert'));
  };

  return (
    <div className="ritam-editorial-article-page" style={styles.pageWrapper}>
      {/* Editorial Stylesheet */}
      <style>{`
        /* -------------------------------------------------------------
           1. HERO BANNER: Editorial Backdrop with Smooth Gradient
           ------------------------------------------------------------- */
        .article-hero-banner {
          position: relative;
          background-color: #012419 !important;
          width: 100%;
          min-height: 440px;
          display: flex;
          align-items: center;
          overflow: hidden;
          box-sizing: border-box;
          padding: 56px 0 62px;
        }
        .article-hero-bg-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }
        .article-hero-bg-img {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: right 20% center;
          display: block;
        }
        .article-hero-gradient-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            #012419 0%,
            #012419 30%,
            rgba(1, 36, 25, 0.97) 44%,
            rgba(2, 45, 33, 0.88) 58%,
            rgba(3, 62, 45, 0.65) 74%,
            rgba(4, 78, 56, 0.36) 88%,
            rgba(4, 90, 65, 0.16) 100%
          );
        }
        .article-hero-gradient-overlay::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 70px;
          background: linear-gradient(to top, rgba(1, 36, 25, 0.55) 0%, transparent 100%);
          pointer-events: none;
        }
        .article-hero-container {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 0 36px;
          position: relative;
          z-index: 2;
          box-sizing: border-box;
        }
        .article-hero-content-wrap {
          max-width: 820px;
          box-sizing: border-box;
        }
        .article-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          font-weight: 600;
          color: #A3D8CD;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .article-breadcrumb-link {
          color: #A3D8CD;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .article-breadcrumb-link:hover {
          color: #F96815;
          text-decoration: underline;
        }
        .article-breadcrumb-sep {
          color: rgba(163, 216, 205, 0.5);
        }
        .article-breadcrumb-current {
          color: #FFFFFF;
          font-weight: 700;
        }

        /* -------------------------------------------------------------
           2. TWO-COLUMN EDITORIAL READING LAYOUT
           ------------------------------------------------------------- */
        .editorial-reading-container {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 60px 36px 90px;
          display: grid;
          grid-template-columns: 290px minmax(0, 1fr);
          gap: 60px;
          align-items: flex-start;
          box-sizing: border-box;
          background-color: #FFFFFF;
          position: relative;
        }

        /* -------------------------------------------------------------
           3. DESKTOP STICKY TABLE OF CONTENTS
           ------------------------------------------------------------- */
        .editorial-toc-sidebar {
          width: 100%;
          box-sizing: border-box;
          position: sticky;
          top: 90px;
          align-self: flex-start;
          z-index: 10;
        }
        .editorial-toc-sticky-container {
          max-height: calc(100vh - 110px);
          overflow-y: auto;
          padding: 14px 18px 24px 0;
          border-right: 1.5px solid #EDF2F7;
          box-sizing: border-box;
          scrollbar-width: thin;
          scrollbar-color: #CBD5E1 transparent;
        }
        .editorial-toc-sticky-container::-webkit-scrollbar {
          width: 4px;
        }
        .editorial-toc-sticky-container::-webkit-scrollbar-thumb {
          background-color: #CBD5E1;
          border-radius: 4px;
        }
        .editorial-toc-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 800;
          color: #044439;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          padding-bottom: 14px;
          margin-bottom: 12px;
          border-bottom: 1px solid #EDF2F7;
        }
        .editorial-toc-header-icon {
          font-size: 15px;
        }
        .editorial-toc-nav {
          width: 100%;
        }
        .editorial-toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .editorial-toc-item {
          margin: 0;
        }
        .editorial-toc-item.is-subheading {
          padding-left: 14px;
        }
        .editorial-toc-link {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 8px 12px;
          font-size: 13.5px;
          line-height: 1.45;
          color: #4A5568;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          border-left: 3.5px solid transparent;
          position: relative;
        }
        .editorial-toc-link:hover {
          color: #044439;
          background-color: #F8FAFC;
        }
        .editorial-toc-link.is-active {
          color: #044439;
          font-weight: 700;
          background-color: #EBF8F5;
          border-left-color: #F96815;
          padding-left: 14px;
          box-shadow: 0 1px 4px rgba(4, 68, 57, 0.05);
        }
        .editorial-toc-bullet {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #CBD5E1;
          margin-top: 7px;
          flex-shrink: 0;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .editorial-toc-link.is-active .editorial-toc-bullet {
          background-color: #F96815;
          transform: scale(1.6);
        }
        .editorial-toc-item.is-subheading .editorial-toc-link {
          font-size: 12.5px;
          color: #718096;
        }
        .editorial-toc-item.is-subheading .editorial-toc-link.is-active {
          color: #044439;
        }

        /* -------------------------------------------------------------
           4. MOBILE COLLAPSIBLE TABLE OF CONTENTS
           ------------------------------------------------------------- */
        .editorial-toc-mobile-bar {
          display: none;
          width: 100%;
          position: sticky;
          top: 76px;
          z-index: 40;
          background: #FFFFFF;
          border-bottom: 1.5px solid #E2E8F0;
          margin-bottom: 28px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }
        .editorial-toc-mobile-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: #F8FAFC;
          border: none;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
        }
        .editorial-toc-mobile-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #2D3748;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: 12px;
        }
        .editorial-toc-mobile-title strong {
          color: #044439;
          font-weight: 700;
        }
        .editorial-toc-mobile-chevron {
          font-size: 14px;
          color: #718096;
          transition: transform 0.2s ease;
        }
        .editorial-toc-mobile-chevron.is-open {
          transform: rotate(180deg);
        }
        .editorial-toc-mobile-dropdown {
          background: #FFFFFF;
          border-top: 1px solid #EDF2F7;
          max-height: 50vh;
          overflow-y: auto;
          padding: 12px 14px;
        }
        .editorial-toc-mobile-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .editorial-toc-mobile-link {
          display: block;
          padding: 8px 12px;
          font-size: 13.5px;
          line-height: 1.4;
          color: #4A5568;
          text-decoration: none;
          border-radius: 6px;
        }
        .editorial-toc-mobile-link.is-subheading {
          padding-left: 22px;
          font-size: 12.5px;
          color: #718096;
        }
        .editorial-toc-mobile-link.is-active {
          color: #044439;
          background-color: #F0FDF4;
          font-weight: 700;
          border-left: 3px solid #F96815;
        }

        /* -------------------------------------------------------------
           5. SINGLE CONTINUOUS EDITORIAL READING COLUMN
           ------------------------------------------------------------- */
        .editorial-main-content {
          max-width: 840px;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }
        .editorial-content-stream {
          width: 100%;
          color: #2D3748;
          font-size: 17px;
          line-height: 1.82;
        }
        .editorial-h2 {
          font-size: clamp(23px, 2.5vw, 29px);
          font-weight: 800;
          color: #044439;
          margin-top: 48px;
          margin-bottom: 18px;
          line-height: 1.32;
          letter-spacing: -0.4px;
          scroll-margin-top: 110px;
        }
        .editorial-h3 {
          font-size: clamp(18px, 1.8vw, 21px);
          font-weight: 700;
          color: #1A202C;
          margin-top: 36px;
          margin-bottom: 14px;
          line-height: 1.38;
          scroll-margin-top: 110px;
        }
        .editorial-paragraph {
          font-size: 17px;
          line-height: 1.82;
          color: #374151;
          margin: 0 0 22px 0;
        }
        .editorial-callout-text {
          background-color: #F0FDF4;
          border-left: 3.5px solid #044439;
          padding: 14px 18px;
          border-radius: 0 10px 10px 0;
          margin: 20px 0 26px;
          color: #064E3B;
          font-size: 16px;
        }
        .editorial-list {
          margin: 0 0 24px 0;
          padding-left: 26px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .editorial-list-item {
          font-size: 16.5px;
          line-height: 1.75;
          color: #374151;
        }
        .editorial-link {
          color: #044439;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s ease;
        }
        .editorial-link:hover {
          color: #F96815;
        }
        .editorial-code {
          background-color: #EDF2F7;
          color: #C53030;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 14px;
          font-family: monospace;
        }
        .editorial-pre {
          background-color: #1A202C;
          color: #E2E8F0;
          padding: 18px;
          border-radius: 10px;
          overflow-x: auto;
          margin: 24px 0;
        }
        .editorial-divider {
          border: none;
          height: 1px;
          background: #E2E8F0;
          margin: 48px 0;
        }

        /* Comparison Table Styling */
        .editorial-table-wrapper {
          width: 100%;
          overflow-x: auto;
          margin: 32px 0;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          background: #FFFFFF;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }
        .editorial-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 15px;
          text-align: left;
        }
        .editorial-table th {
          background-color: #F8FAFC;
          color: #044439;
          font-weight: 700;
          padding: 14px 18px;
          border-bottom: 2px solid #E2E8F0;
        }
        .editorial-table td {
          padding: 14px 18px;
          border-bottom: 1px solid #EDF2F7;
          color: #374151;
          line-height: 1.6;
        }
        .editorial-table tr:last-child td {
          border-bottom: none;
        }

        /* -------------------------------------------------------------
           6. EDITORIAL FOOTER & ARTICLE-TO-ARTICLE NAVIGATION
           ------------------------------------------------------------- */
        .editorial-nav-section {
          margin-top: 54px;
          padding-top: 36px;
          border-top: 1.5px solid #EDF2F7;
        }
        .editorial-nav-header {
          font-size: 13px;
          font-weight: 800;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-bottom: 18px;
        }
        .editorial-nav-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .editorial-nav-card {
          display: flex;
          flex-direction: column;
          padding: 22px 24px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .editorial-nav-card:hover {
          background: #FFFFFF;
          border-color: #044439;
          box-shadow: 0 8px 24px rgba(4, 68, 57, 0.08);
          transform: translateY(-2px);
        }
        .editorial-nav-label {
          font-size: 12px;
          font-weight: 700;
          color: #F96815;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }
        .editorial-nav-title {
          font-size: 15.5px;
          font-weight: 700;
          color: #044439;
          line-height: 1.45;
          margin: 0;
        }
        .editorial-all-blogs-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 24px;
          font-size: 14px;
          font-weight: 700;
          color: #044439;
          text-decoration: none;
        }
        .editorial-all-blogs-link:hover {
          color: #F96815;
        }

        /* Guidance Banner */
        .editorial-guidance-box {
          margin-top: 48px;
          padding: 32px 36px;
          background-color: #012419;
          background-image: linear-gradient(135deg, #012419 0%, #034435 60%, #045844 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .editorial-guidance-text {
          max-width: 520px;
        }
        .editorial-guidance-title {
          font-size: 19px;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 6px 0;
        }
        .editorial-guidance-desc {
          font-size: 14px;
          color: #E2ECE9;
          margin: 0;
          line-height: 1.5;
        }
        .editorial-guidance-btn {
          background-color: #F96815;
          color: #FFFFFF;
          border: none;
          padding: 13px 26px;
          border-radius: 10px;
          font-size: 14.5px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(249, 104, 21, 0.35);
          transition: all 0.2s ease;
        }
        .editorial-guidance-btn:hover {
          background-color: #E05608;
          transform: translateY(-1px);
        }

        /* -------------------------------------------------------------
           7. RESPONSIVE BREAKPOINTS
           ------------------------------------------------------------- */
        @media (max-width: 1024px) {
          .editorial-reading-container {
            grid-template-columns: 240px minmax(0, 1fr);
            gap: 40px;
            padding: 44px 24px 70px;
          }
        }
        @media (max-width: 900px) {
          .editorial-reading-container {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 28px 18px 60px;
          }
          .editorial-toc-sidebar {
            display: none;
          }
          .editorial-toc-mobile-bar {
            display: block;
          }
          .editorial-nav-grid {
            grid-template-columns: 1fr;
          }
          .editorial-guidance-box {
            padding: 24px 20px;
            flex-direction: column;
            align-items: flex-start;
          }
          .editorial-guidance-btn {
            width: 100%;
            text-align: center;
          }
        }
        @media (max-width: 768px) {
          .article-hero-banner {
            min-height: auto;
            padding: 38px 0 44px;
          }
          .article-hero-container {
            padding: 0 20px;
          }
          .article-hero-bg-img {
            object-position: center;
          }
          .article-hero-gradient-overlay {
            background: linear-gradient(
              180deg,
              rgba(1, 36, 25, 0.96) 0%,
              rgba(1, 36, 25, 0.92) 50%,
              rgba(2, 45, 33, 0.85) 80%,
              rgba(4, 68, 57, 0.72) 100%
            ),
            linear-gradient(
              90deg,
              rgba(1, 36, 25, 0.96) 0%,
              rgba(1, 36, 25, 0.80) 100%
            );
          }
          .editorial-paragraph {
            font-size: 16px;
            line-height: 1.78;
          }
        }
      `}</style>

      {/* 1. Consistent Editorial Hero Banner with Topic Background & Smooth Gradient */}
      <section className="article-hero-banner">
        <div className="article-hero-bg-wrapper" aria-hidden="true">
          <img
            src={article.heroBgImage || article.image}
            alt=""
            className="article-hero-bg-img"
            loading="eager"
            fetchPriority="high"
            onError={(e) => {
              if (article.fallbackImg && e.currentTarget.src !== article.fallbackImg) {
                e.currentTarget.src = article.fallbackImg;
              }
            }}
          />
          <div className="article-hero-gradient-overlay" />
        </div>

        <div className="article-hero-container">
          <div className="article-hero-content-wrap">
            {/* Breadcrumb Navigation */}
            <nav className="article-breadcrumbs" aria-label="Breadcrumbs">
              <Link to="/" className="article-breadcrumb-link">
                Home
              </Link>
              <span className="article-breadcrumb-sep">&gt;</span>
              <Link to="/blogs" className="article-breadcrumb-link">
                Blogs
              </Link>
              <span className="article-breadcrumb-sep">&gt;</span>
              <span className="article-breadcrumb-current">{article.breadcrumbLabel}</span>
            </nav>

            {/* Pill Badge */}
            <div style={styles.pillBadge}>
              <span style={styles.pillDot}>•</span>
              <span>{article.category.toUpperCase()}</span>
            </div>

            {/* Headline */}
            <h1 style={styles.heroTitle}>{article.title}</h1>

            {/* Lead Excerpt */}
            <p style={styles.heroLead}>{article.excerpt}</p>

            {/* Meta Bar */}
            <div style={styles.metaRow}>
              <span style={styles.metaItem}>📅 {article.date}</span>
              <span style={styles.metaDivider}>•</span>
              <span style={styles.metaItem}>⏱️ {article.readTime}</span>
              <span style={styles.metaDivider}>•</span>
              <span style={styles.metaItem}>🎓 Ritam Consultancy Advisory Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Editorial Two-Column Reading Canvas */}
      <div className="editorial-reading-container">
        {/* Left Column: Sticky Table of Contents (collapsible dropdown on mobile) */}
        <TableOfContents toc={toc} />

        {/* Right Column: Complete Unabridged Continuous Article Body */}
        <main className="editorial-main-content">
          <ArticleMarkdownRenderer markdown={article.contentMarkdown} />

          {/* Guidance Banner */}
          <div className="editorial-guidance-box">
            <div className="editorial-guidance-text">
              <h3 className="editorial-guidance-title">Need Personalized Admission Guidance?</h3>
              <p className="editorial-guidance-desc">
                Ritam Consultancy provides 100% transparent, zero-commission guidance for B.Tech
                admissions across India. Talk directly with senior advisors.
              </p>
            </div>
            <button
              type="button"
              onClick={handleTalkToExpert}
              className="editorial-guidance-btn hover-lift"
            >
              Talk to Our Expert – Free
            </button>
          </div>

          {/* Navigation to Move Between the Three Articles */}
          <nav className="editorial-nav-section" aria-label="Article Navigation">
            <div className="editorial-nav-header">Continue Reading Our Admission Guides</div>
            <div className="editorial-nav-grid">
              {prevArticle ? (
                <Link to={`/blogs/${prevArticle.slug}`} className="editorial-nav-card">
                  <span className="editorial-nav-label">← Previous Guide</span>
                  <h4 className="editorial-nav-title">{prevArticle.title}</h4>
                </Link>
              ) : (
                <Link
                  to={`/blogs/${BLOG_ARTICLES[BLOG_ARTICLES.length - 1].slug}`}
                  className="editorial-nav-card"
                >
                  <span className="editorial-nav-label">← Previous Guide</span>
                  <h4 className="editorial-nav-title">
                    {BLOG_ARTICLES[BLOG_ARTICLES.length - 1].title}
                  </h4>
                </Link>
              )}

              {nextArticle ? (
                <Link to={`/blogs/${nextArticle.slug}`} className="editorial-nav-card">
                  <span className="editorial-nav-label">Next Guide →</span>
                  <h4 className="editorial-nav-title">{nextArticle.title}</h4>
                </Link>
              ) : (
                <Link to={`/blogs/${BLOG_ARTICLES[0].slug}`} className="editorial-nav-card">
                  <span className="editorial-nav-label">Next Guide →</span>
                  <h4 className="editorial-nav-title">{BLOG_ARTICLES[0].title}</h4>
                </Link>
              )}
            </div>

            <div>
              <Link to="/blogs" className="editorial-all-blogs-link">
                <span>← Back to All Guides &amp; Insights</span>
              </Link>
            </div>
          </nav>
        </main>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    backgroundColor: '#FFFFFF',
    minHeight: '80vh',
    width: '100%',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  pillBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    padding: '6px 14px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: '0.6px',
    marginBottom: '16px',
  },
  pillDot: {
    color: '#A3D8CD',
    fontSize: '14px',
  },
  heroTitle: {
    fontSize: 'clamp(28px, 3.6vw, 42px)',
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: '1.25',
    letterSpacing: '-0.8px',
    margin: '0 0 16px 0',
    maxWidth: '960px',
  },
  heroLead: {
    fontSize: '16.5px',
    lineHeight: '1.65',
    color: '#E2ECE9',
    fontWeight: '500',
    maxWidth: '820px',
    margin: '0 0 22px 0',
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '13.5px',
    color: '#A3D8CD',
    fontWeight: '500',
    flexWrap: 'wrap',
  },
  metaItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
  metaDivider: {
    color: 'rgba(163, 216, 205, 0.4)',
  },
};
