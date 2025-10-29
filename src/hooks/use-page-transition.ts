import { useEffect } from 'react';
import { gsap } from 'gsap';

export const usePageTransition = () => {
  useEffect(() => {
    // Page enter animation
    const tl = gsap.timeline();
    
    tl.fromTo('main', 
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      }
    );

    return () => {
      // Page exit animation
      gsap.to('main', {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power3.in",
      });
    };
  }, []);
};