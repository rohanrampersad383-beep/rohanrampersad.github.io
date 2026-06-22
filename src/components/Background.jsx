import { lazy, Suspense, useState } from 'react';

const FloatingLines = lazy(() => import('./reactbits/FloatingLines/FloatingLines'));

export default function Background() {
  const [canUseWebGL] = useState(() => {
    if (typeof document === 'undefined') return false;
    if (typeof window.matchMedia === 'function') {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
      if (window.matchMedia('(max-width: 760px)').matches) return false;
    }
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return Boolean(context);
  });

  return (
    <div className="site-background" aria-hidden="true">
      {canUseWebGL ? (
        <div className="floating-lines-layer">
          <Suspense fallback={<div className="floating-lines-fallback" />}>
            <FloatingLines
              linesGradient={['#06b6d4', '#ec4899', '#f43f5e']}
              enabledWaves={['top', 'middle', 'bottom']}
              lineCount={[5, 5, 5]}
              lineDistance={[100, 100, 100]}
              animationSpeed={2.9}
              interactive
              bendRadius={20}
              bendStrength={2}
              mouseDamping={0.06}
              parallax
              parallaxStrength={0.12}
              mixBlendMode="screen"
            />
          </Suspense>
        </div>
      ) : (
        <div className="floating-lines-fallback" />
      )}
      <div className="background-grid" />
      <div className="depth-grid" />
      <div className="background-noise" />
      <div className="background-vignette" />
    </div>
  );
}
