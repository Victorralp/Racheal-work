import { useIsMobile } from './use-mobile';
import { useEffect, useState } from 'react';

export const useAnimationConfig = () => {
  const isMobile = useIsMobile();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const shouldAnimate = !prefersReducedMotion;
  const isLowPerformance = isMobile || prefersReducedMotion;

  return {
    isMobile,
    prefersReducedMotion,
    shouldAnimate,
    isLowPerformance,
    // Animation durations (shorter on mobile/reduced motion)
    duration: {
      fast: isLowPerformance ? 0.3 : 0.4,
      normal: isLowPerformance ? 0.5 : 0.6,
      slow: isLowPerformance ? 0.7 : 0.8,
    },
    // Easing functions
    ease: {
      smooth: isLowPerformance ? "power2.out" : "power3.out",
      bouncy: isLowPerformance ? "power2.out" : "back.out(1.7)",
    },
  };
};