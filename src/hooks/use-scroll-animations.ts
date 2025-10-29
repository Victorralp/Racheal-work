import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsapUtils, cleanupGSAP } from '@/lib/animation-utils';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate sections on scroll
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;

        gsap.fromTo(section, 
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // Apply utility-based animations
      gsapUtils.scrollReveal('.text-reveal');
      gsapUtils.scrollReveal('.stagger-reveal');
      gsapUtils.parallax('.parallax-element');
      gsapUtils.float('.float-element');

      // Stagger animation for cards
      gsap.utils.toArray<HTMLElement>('.stagger-item').forEach((item, index) => {
        gsap.fromTo(item,
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

    }, containerRef);

    return cleanupGSAP(ctx);
  }, []);

  const addSectionRef = (ref: HTMLDivElement | null, index: number) => {
    sectionRefs.current[index] = ref;
  };

  return { addSectionRef, containerRef };
};