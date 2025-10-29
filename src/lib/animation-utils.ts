import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation presets for consistent timing and easing
export const animationPresets = {
  // Fade in from bottom
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "power3.out" }
  },
  
  // Fade in from left
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "power3.out" }
  },
  
  // Fade in from right
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "power3.out" }
  },
  
  // Scale in
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "back.out(1.7)" }
  },
  
  // Stagger children animation
  staggerContainer: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  },
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "power2.out" }
  }
};

// GSAP animation utilities
export const gsapUtils = {
  // Create a timeline for complex animations
  createTimeline: (options?: gsap.TimelineVars) => {
    return gsap.timeline(options);
  },
  
  // Animate elements on scroll
  scrollReveal: (selector: string, options?: ScrollTrigger.StaticVars) => {
    gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
      gsap.fromTo(element,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse",
            ...options
          }
        }
      );
    });
  },
  
  // Parallax effect
  parallax: (selector: string, yPercent: number = -50) => {
    gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
      gsap.to(element, {
        yPercent,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });
  },
  
  // Counter animation
  counter: (selector: string, endValue: number) => {
    gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
      gsap.fromTo(element,
        { textContent: 0 },
        {
          textContent: endValue,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });
  },
  
  // Floating animation
  float: (selector: string, y: number = -20, duration: number = 3) => {
    gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
      gsap.to(element, {
        y,
        duration,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
  }
};

// Performance optimization utilities
export const performanceUtils = {
  // Check if device supports advanced animations
  supportsAdvancedAnimations: () => {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
           !window.matchMedia('(max-width: 768px)').matches;
  },
  
  // Throttle function for scroll events
  throttle: <T extends (...args: unknown[]) => void>(func: T, limit: number) => {
    let inThrottle: boolean;
    return function(this: unknown, ...args: Parameters<T>) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // Debounce function for resize events
  debounce: <T extends (...args: unknown[]) => void>(func: T, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return function(this: unknown, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }
};

// Cleanup utility for GSAP contexts
export const cleanupGSAP = (ctx: gsap.Context) => {
  return () => {
    ctx.revert();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
};