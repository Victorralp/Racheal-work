import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAnimationConfig } from './use-animation-config';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const useGSAPScrollTrigger = () => {
  const { shouldAnimate, isLowPerformance } = useAnimationConfig();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldAnimate || isLowPerformance || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax scrolling for background elements
      gsap.utils.toArray<HTMLElement>('.parallax-element').forEach((element) => {
        gsap.to(element, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });

      // Staggered reveal animations for cards
      gsap.utils.toArray<HTMLElement>('.stagger-reveal').forEach((element, index) => {
        gsap.fromTo(element, 
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // Text reveal animations
      gsap.utils.toArray<HTMLElement>('.text-reveal').forEach((element) => {
        gsap.fromTo(element,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // Counter animations for numbers
      gsap.utils.toArray<HTMLElement>('.counter-animate').forEach((element) => {
        const endValue = parseInt(element.textContent || '0');
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

      // Floating elements animation
      gsap.utils.toArray<HTMLElement>('.float-element').forEach((element) => {
        gsap.to(element, {
          y: -20,
          duration: 3,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      // Scale on scroll for hero elements
      gsap.utils.toArray<HTMLElement>('.scale-on-scroll').forEach((element) => {
        gsap.to(element, {
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [shouldAnimate, isLowPerformance]);

  return containerRef;
};