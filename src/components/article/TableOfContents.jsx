import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function TableOfContents({ toc = [] }) {
  const [activeId, setActiveId] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const stickyContainerRef = useRef(null);
  const isUserClickingRef = useRef(false);

  // Dynamic real-time scroll tracker
  const updateActiveHeading = useCallback(() => {
    if (!toc || toc.length === 0) return;
    if (isUserClickingRef.current) return; // Prevent jitter during click scroll animation

    const threshold = 135; // Pixels from viewport top (clears sticky header)
    const scrollY = window.scrollY || window.pageYOffset || 0;

    // Bottom of page detection (activates the final section/FAQ)
    const isAtBottom =
      window.innerHeight + scrollY >= document.documentElement.scrollHeight - 100;
    if (isAtBottom) {
      setActiveId(toc[toc.length - 1].id);
      return;
    }

    // Top of page before first heading
    const firstEl = document.getElementById(toc[0].id);
    if (firstEl) {
      const firstRect = firstEl.getBoundingClientRect();
      if (firstRect.top > threshold + 120) {
        setActiveId(toc[0].id);
        return;
      }
    }

    // Check each heading down the document
    let currentId = toc[0].id;
    for (let i = 0; i < toc.length; i++) {
      const el = document.getElementById(toc[i].id);
      if (el) {
        const top = el.getBoundingClientRect().top;
        if (top <= threshold) {
          currentId = toc[i].id;
        } else {
          // Headings are ordered down the page; stop once a heading is below the threshold
          break;
        }
      }
    }

    setActiveId((prev) => (prev !== currentId ? currentId : prev));
  }, [toc]);

  // Attach dynamic scroll tracking to both Lenis and native window scroll
  useEffect(() => {
    if (!toc || toc.length === 0) return;

    // Run initial check
    updateActiveHeading();

    window.addEventListener('scroll', updateActiveHeading, { passive: true });
    window.addEventListener('resize', updateActiveHeading, { passive: true });

    let lenisUnsub = null;
    if (typeof window !== 'undefined' && window.__lenisInstance) {
      lenisUnsub = window.__lenisInstance.on('scroll', updateActiveHeading);
    }

    // Polling backup to catch smooth transitions
    const interval = setInterval(updateActiveHeading, 300);

    return () => {
      window.removeEventListener('scroll', updateActiveHeading);
      window.removeEventListener('resize', updateActiveHeading);
      if (typeof lenisUnsub === 'function') lenisUnsub();
      clearInterval(interval);
    };
  }, [toc, updateActiveHeading]);

  // Keep the active item visible in the sticky Table of Contents sidebar
  useEffect(() => {
    if (!activeId || !stickyContainerRef.current) return;
    const activeLink = stickyContainerRef.current.querySelector(
      `.editorial-toc-link[data-toc-id="${activeId}"]`
    );
    if (activeLink) {
      const container = stickyContainerRef.current;
      const linkRect = activeLink.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // If active link is scrolled out of view in the sidebar, smoothly bring it in
      if (linkRect.top < containerRect.top + 20 || linkRect.bottom > containerRect.bottom - 20) {
        activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [activeId]);

  // Smooth scroll handler when a Table of Contents link is clicked
  const scrollToHeading = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      isUserClickingRef.current = true;
      setActiveId(id);
      setIsMobileOpen(false);

      if (window.__lenisInstance) {
        window.__lenisInstance.scrollTo(el, {
          offset: -100,
          duration: 1.1,
          onComplete: () => {
            isUserClickingRef.current = false;
            updateActiveHeading();
          },
        });
      } else {
        const yOffset = -100;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setTimeout(() => {
          isUserClickingRef.current = false;
          updateActiveHeading();
        }, 600);
      }
    }
  };

  const activeItem = toc.find((item) => item.id === activeId) || toc[0];

  return (
    <>
      {/* 1. Mobile Collapsible Dropdown Bar */}
      <div className="editorial-toc-mobile-bar">
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="editorial-toc-mobile-toggle"
          aria-expanded={isMobileOpen}
          aria-label="Toggle Table of Contents"
        >
          <div className="editorial-toc-mobile-label">
            <span className="editorial-toc-mobile-icon">📑</span>
            <span className="editorial-toc-mobile-title">
              Section: <strong>{activeItem ? activeItem.text : 'Jump to section'}</strong>
            </span>
          </div>
          <span className={`editorial-toc-mobile-chevron ${isMobileOpen ? 'is-open' : ''}`}>▾</span>
        </button>

        {isMobileOpen && (
          <nav className="editorial-toc-mobile-dropdown">
            <div className="editorial-toc-mobile-list">
              {toc.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToHeading(e, item.id)}
                    className={`editorial-toc-mobile-link ${
                      item.level === 3 ? 'is-subheading' : ''
                    } ${isActive ? 'is-active' : ''}`}
                  >
                    {item.text}
                  </a>
                );
              })}
            </div>
          </nav>
        )}
      </div>

      {/* 2. Desktop Sticky Table of Contents Sidebar */}
      <aside className="editorial-toc-sidebar" aria-label="Table of Contents">
        <div ref={stickyContainerRef} className="editorial-toc-sticky-container">
          <div className="editorial-toc-header">
            <span className="editorial-toc-header-icon">📑</span>
            <span className="editorial-toc-header-text">Table of Contents</span>
          </div>

          <nav className="editorial-toc-nav">
            <ul className="editorial-toc-list">
              {toc.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li
                    key={item.id}
                    className={`editorial-toc-item ${item.level === 3 ? 'is-subheading' : ''}`}
                  >
                    <a
                      href={`#${item.id}`}
                      data-toc-id={item.id}
                      onClick={(e) => scrollToHeading(e, item.id)}
                      className={`editorial-toc-link ${isActive ? 'is-active' : ''}`}
                    >
                      <span className="editorial-toc-bullet" />
                      <span className="editorial-toc-text">{item.text}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
