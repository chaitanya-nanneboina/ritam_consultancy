import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits text into words and letters safely without breaking React DOM structure
 */
function prepareTextSplitting() {
  if (typeof document === 'undefined') return;

  // 1. Standalone Letter-by-Letter elements (.anim-letters)
  const letterNodes = document.querySelectorAll('.anim-letters');
  letterNodes.forEach((node) => {
    if (node.dataset.animSplit === 'done') return;
    node.dataset.animSplit = 'done';
    const text = node.textContent;
    node.innerHTML = '';
    text.split('').forEach((ch) => {
      if (ch === ' ') {
        const space = document.createElement('span');
        space.innerHTML = '&nbsp;';
        space.style.display = 'inline-block';
        node.appendChild(space);
      } else {
        const span = document.createElement('span');
        span.className = 'gsap-letter';
        span.style.display = 'inline-block';
        span.style.willChange = 'transform, opacity';
        span.textContent = ch;
        node.appendChild(span);
      }
    });
  });

  // 2. Word-by-Word containers (.anim-words)
  const wordContainers = document.querySelectorAll('.anim-words');
  wordContainers.forEach((container) => {
    if (container.dataset.animSplit === 'done') return;
    container.dataset.animSplit = 'done';

    const walk = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (!text.trim()) return node;

        const words = text.split(/(\s+)/);
        const fragment = document.createDocumentFragment();

        words.forEach((w) => {
          if (!w) return;
          if (/^\s+$/.test(w)) {
            fragment.appendChild(document.createTextNode(w));
          } else {
            const wrap = document.createElement('span');
            wrap.className = 'gsap-word-wrap';
            wrap.style.display = 'inline-block';
            wrap.style.overflow = 'hidden';
            wrap.style.verticalAlign = 'bottom';
            wrap.style.marginRight = '0.04em';

            const inner = document.createElement('span');
            inner.className = 'gsap-word';
            inner.style.display = 'inline-block';
            inner.style.willChange = 'transform, opacity';
            inner.textContent = w;

            wrap.appendChild(inner);
            fragment.appendChild(wrap);
          }
        });
        return fragment;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // If element is already letter-split, don't walk inside it
        if (node.classList.contains('anim-letters')) {
          return null;
        }
        const children = Array.from(node.childNodes);
        children.forEach((child) => {
          const replacement = walk(child);
          if (replacement && replacement !== child) {
            node.replaceChild(replacement, child);
          }
        });
        return null;
      }
      return null;
    };

    const topChildren = Array.from(container.childNodes);
    topChildren.forEach((child) => {
      const replacement = walk(child);
      if (replacement && replacement !== child) {
        container.replaceChild(replacement, child);
      }
    });
  });
}

/**
 * GSAP ScrollTrigger-powered reveal animation hook
 * - Smooth, non-bouncy word-by-word text animation for headings (.anim-words)
 * - Smooth, non-bouncy letter-by-letter text animation for highlights/badges (.anim-letters)
 * - Step-by-step scroll trigger for Guidance Process steps (.guidance-step-item)
 * - Staggered card animation for card containers (.anim-cards-container)
 * - Synchronized two-column sections without lag
 * - Strictly triggers once per page visit (once: true)
 * - Respects prefers-reduced-motion
 */
export function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isMobile =
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px)').matches;

    // Split text into spans for GSAP
    prepareTextSplitting();

    const triggers = [];

    if (prefersReducedMotion) {
      document.querySelectorAll(
        '.gsap-word, .gsap-letter, .anim-card, .explore-location-card, .guidance-step-item, .state-destination-card, .state-card-img, .state-card-title, .state-card-cities, .state-card-arrow, .reveal-on-scroll'
      ).forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.clipPath = 'none';
        el.classList.add('is-visible');
      });
      return;
    }

    // 1. Smooth Word-by-Word Animations (.anim-words) - Clean, Silk-Smooth & Non-Bouncy
    const wordContainers = document.querySelectorAll('.anim-words');
    wordContainers.forEach((container) => {
      const words = container.querySelectorAll('.gsap-word');
      if (words.length === 0) return;

      gsap.set(words, { y: isMobile ? 20 : 16, opacity: 0 });

      const anim = gsap.to(words, {
        y: 0,
        opacity: 1,
        duration: isMobile ? 0.95 : 0.8,
        delay: isMobile ? 0.12 : 0.08,
        ease: 'power3.out',
        stagger: isMobile ? 0.05 : 0.04,
        scrollTrigger: {
          trigger: container,
          start: isMobile ? 'top 74%' : 'top 82%',
          once: true,
          onComplete: () => {
            gsap.set(words, { clearProps: 'transform,willChange' });
          },
        },
      });
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    // 2. Smooth Letter-by-Letter Animations (.anim-letters) - Clean, Silk-Smooth & Non-Bouncy
    const letterContainers = document.querySelectorAll('.anim-letters');
    letterContainers.forEach((container) => {
      const letters = container.querySelectorAll('.gsap-letter');
      if (letters.length === 0) return;

      gsap.set(letters, { y: isMobile ? 12 : 10, opacity: 0 });

      const anim = gsap.to(letters, {
        y: 0,
        opacity: 1,
        duration: isMobile ? 0.8 : 0.65,
        delay: isMobile ? 0.18 : 0.12,
        ease: 'power3.out',
        stagger: isMobile ? 0.03 : 0.025,
        scrollTrigger: {
          trigger: container,
          start: isMobile ? 'top 74%' : 'top 82%',
          once: true,
          onComplete: () => {
            gsap.set(letters, { clearProps: 'transform,willChange' });
          },
        },
      });
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    // 3. Guidance Process 4-Step Cards: Trigger ONE card after another when scrolling
    const stepItems = document.querySelectorAll('.guidance-step-item');
    stepItems.forEach((stepEl) => {
      gsap.set(stepEl, { opacity: 0, y: isMobile ? 26 : 28 });

      const anim = gsap.to(stepEl, {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.9 : 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stepEl,
          start: isMobile ? 'top 75%' : 'top 82%',
          once: true,
          onComplete: () => {
            gsap.set(stepEl, { clearProps: 'transform,willChange' });
          },
        },
      });
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    // 4. Mobile-Only Horizontal Slide Reveal Animation for "Explore B.Tech Colleges Across India"
    if (isMobile) {
      const locationCards = document.querySelectorAll(
        '#explore-colleges-section .explore-location-card'
      );
      locationCards.forEach((card, index) => {
        gsap.set(card, { x: 60, opacity: 0 });

        const anim = gsap.to(card, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: (index % 2) * 0.08,
          scrollTrigger: {
            trigger: card,
            start: 'top 86%',
            once: true,
            onComplete: () => {
              gsap.set(card, { clearProps: 'transform,willChange' });
            },
          },
        });
        if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
      });
    }

    // 5. Mobile-Only Image Mask Reveal + Text Stagger Animation for "Explore by State" Cards
    if (isMobile) {
      const stateCards = document.querySelectorAll(
        '.explore-colleges-section .state-destination-card, #explore-colleges .state-destination-card'
      );
      stateCards.forEach((card) => {
        const img = card.querySelector('.state-card-img');
        const title = card.querySelector('.state-card-title');
        const cities = card.querySelector('.state-card-cities');
        const arrow = card.querySelector('.state-card-arrow');

        if (!img) return;

        // Set initial states
        gsap.set(card, { opacity: 1, y: 0 });
        gsap.set(img, { clipPath: 'inset(100% 0% 0% 0%)', willChange: 'clip-path' });
        if (title) gsap.set(title, { opacity: 0, y: 16 });
        if (cities) gsap.set(cities, { opacity: 0, y: 12 });
        if (arrow) gsap.set(arrow, { opacity: 0, scale: 0.75 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
            onComplete: () => {
              gsap.set(img, { clearProps: 'willChange' });
              if (title) gsap.set(title, { clearProps: 'transform' });
              if (cities) gsap.set(cities, { clearProps: 'transform' });
              if (arrow) gsap.set(arrow, { clearProps: 'transform' });
            },
          },
        });

        // 1. Image reveal: reveal image smoothly from bottom to top using clip-path (0.9s, power3.out)
        tl.to(
          img,
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.9,
            ease: 'power3.out',
          },
          0
        );

        // 2. State name: Fade in and slide upward slightly after image reveal begins (0.5s)
        if (title) {
          tl.to(
            title,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power3.out',
            },
            0.28
          );
        }

        // 3. City description: Fade in with ~0.12s stagger after state name (0.5s)
        if (cities) {
          tl.to(
            cities,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power3.out',
            },
            0.40
          );
        }

        // 4. Arrow button: Fade in last with subtle scale transition (0.5s)
        if (arrow) {
          tl.to(
            arrow,
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: 'power3.out',
            },
            0.52
          );
        }

        if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
      });
    }

    // 6. Staggered Card Animations (.anim-cards-container -> .anim-card)
    const cardContainers = document.querySelectorAll('.anim-cards-container');
    cardContainers.forEach((container) => {
      // On mobile, skip the Explore B.Tech Colleges location cards container so it doesn't conflict with horizontal slide
      if (isMobile && container.closest('#explore-colleges-section')) {
        return;
      }
      // On mobile, skip the Explore by State cards container so it uses the dedicated mask reveal + text stagger animation
      if (isMobile && (container.closest('.explore-colleges-section') || container.closest('#explore-colleges'))) {
        return;
      }

      const cards = container.querySelectorAll('.anim-card');
      if (cards.length === 0) return;

      gsap.set(cards, { opacity: 0, y: isMobile ? 24 : 28 });

      const anim = gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.85 : 0.7,
        delay: isMobile ? 0.1 : 0.08,
        ease: 'power3.out',
        stagger: isMobile ? 0.08 : 0.09,
        scrollTrigger: {
          trigger: container,
          start: isMobile ? 'top 75%' : 'top 82%',
          once: true,
          onComplete: () => {
            gsap.set(cards, { clearProps: 'transform,willChange' });
          },
        },
      });
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    // 7. General Synchronized Section Columns & Reveal Elements (.reveal-on-scroll)
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => {
      // Avoid duplicate triggers for cards and guidance steps
      if (
        el.classList.contains('anim-card') ||
        el.classList.contains('guidance-step-item') ||
        el.closest('.anim-cards-container')
      ) {
        return;
      }

      gsap.set(el, { opacity: 0, y: isMobile ? 18 : 22 });

      const anim = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.9 : 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: isMobile ? 'top 76%' : 'top 84%',
          once: true,
          onEnter: () => el.classList.add('is-visible'),
          onComplete: () => {
            el.classList.add('is-visible');
            gsap.set(el, { clearProps: 'transform,willChange' });
          },
        },
      });
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    // Refresh ScrollTrigger after DOM adjustments across multiple layout passes
    const refreshTimer1 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    const refreshTimer2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);

    const refreshTimer3 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 900);

    return () => {
      clearTimeout(refreshTimer1);
      clearTimeout(refreshTimer2);
      clearTimeout(refreshTimer3);
      triggers.forEach((st) => st.kill());
    };
  }, []);
}
