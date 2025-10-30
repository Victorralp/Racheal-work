import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAPScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Add a small delay to ensure DOM is fully loaded
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
      // Progressive reveal animation - only if elements exist
      const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
      if (scrollRevealElements.length > 0) {
        gsap.fromTo(
          '.scroll-reveal',
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.scroll-reveal',
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Parallax effect for background elements
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      if (parallaxElements.length > 0) {
        gsap.to('.parallax-bg', {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: '.parallax-bg',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Data flow animation
      const dataFlowElements = document.querySelectorAll('.data-flow');
      if (dataFlowElements.length > 0) {
        gsap.fromTo(
          '.data-flow',
          {
            x: '-100%',
          },
          {
            x: '100%',
            duration: 3,
            repeat: -1,
            ease: 'none',
          }
        );
      }

      // Staggered card animations
      const analyticsCards = document.querySelectorAll('.analytics-card');
      if (analyticsCards.length > 0) {
        gsap.fromTo(
          '.analytics-card',
          {
            scale: 0.8,
            opacity: 0,
            y: 50,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: '.analytics-card',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Counter animation for metrics
      const counterElements = document.querySelectorAll('.counter');
      if (counterElements.length > 0) {
        gsap.fromTo(
          '.counter',
          {
            innerHTML: 0,
          },
          {
            innerHTML: (index, target) => {
              const endValue = parseInt(target.getAttribute('data-end') || '0');
              return Math.round(endValue);
            },
            duration: 2,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            scrollTrigger: {
              trigger: '.counter',
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Glow effect on hover - using fixed colors to avoid CSS variable parsing issues
      const neonHoverElements = document.querySelectorAll('.neon-hover');
      if (neonHoverElements.length > 0) {
        gsap.set('.neon-hover', {
          boxShadow: '0 0 5px rgba(0, 212, 255, 0.3)',
        });

        gsap.to('.neon-hover', {
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.6)',
          duration: 0.3,
          paused: true,
        });
      }

      }, containerRef);

      return () => ctx.revert();
    }, 100); // 100ms delay

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return containerRef;
};

export const useDataVisualization = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Add a small delay to ensure DOM is fully loaded
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
      // Animate chart bars
      const chartBars = document.querySelectorAll('.chart-bar');
      if (chartBars.length > 0) {
        gsap.fromTo(
          '.chart-bar',
          {
            scaleY: 0,
            transformOrigin: 'bottom',
          },
          {
            scaleY: 1,
            duration: 1.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.chart-bar',
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate chart lines
      const chartLines = document.querySelectorAll('.chart-line');
      if (chartLines.length > 0) {
        gsap.fromTo(
          '.chart-line',
          {
            strokeDasharray: '0 1000',
          },
          {
            strokeDasharray: '1000 0',
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.chart-line',
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      }, chartRef);

      return () => ctx.revert();
    }, 100); // 100ms delay

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return chartRef;
};
