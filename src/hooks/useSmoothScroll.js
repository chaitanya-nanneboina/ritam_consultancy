import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * High-performance smooth scrolling engine combining Lenis and GSAP ScrollTrigger
 * - Perfectly synchronizes Lenis's smooth wheel/touch scrolling with GSAP ScrollTrigger
 * - Smoothly handles route changes and hash anchor navigation (#resources, etc.)
 * - Bypasses smooth scroll when prefers-reduced-motion is enabled
 */
export function useSmoothScroll() {
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize Lenis instance
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.01 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 1.5,
      infinite: false,
    });
    lenisRef.current = lenis;
    if (typeof window !== 'undefined') {
      window.__lenis = lenis;
    }

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP's ticker with Lenis's requestAnimationFrame cycle
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== 'undefined' && window.__lenis === lenis) {
        window.__lenis = null;
      }
    };
  }, []);

  // Handle smooth route changes and hash navigation
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (!location.hash) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      const anchorId = location.hash.replace('#', '');
      const targetEl = document.getElementById(anchorId);
      if (targetEl) {
        setTimeout(() => {
          lenis.scrollTo(targetEl, { offset: -90 });
        }, 100);
      }
    }

    // Refresh ScrollTrigger after page content renders
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return lenisRef;
}
