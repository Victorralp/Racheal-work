import { Suspense, lazy, memo } from 'react';
import { useAnimationConfig } from '@/hooks/use-animation-config';

// Lazy load the 3D component for better performance
const Hero3DBackground = lazy(() => import('./Hero3DBackground').then(module => ({ default: module.Hero3DBackground })));

// Loading fallback component
const LoadingFallback = memo(() => (
  <div className="absolute inset-0 -z-10 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
));

LoadingFallback.displayName = 'LoadingFallback';

// Performance-optimized 3D background wrapper
export const PerformanceOptimized3D = memo(() => {
  const { shouldAnimate, isLowPerformance } = useAnimationConfig();

  // Don't render 3D background on low-performance devices
  if (!shouldAnimate || isLowPerformance) {
    return null;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Hero3DBackground />
    </Suspense>
  );
});

PerformanceOptimized3D.displayName = 'PerformanceOptimized3D';