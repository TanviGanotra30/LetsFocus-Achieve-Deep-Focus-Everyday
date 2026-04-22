import { useEffect, useRef } from 'react';

export default function CursorEffect() {
  const trailContainerRef = useRef(null);
  const lastTimeRef = useRef(Date.now());
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);

  useEffect(() => {
    const createTrail = (x, y) => {
      if (!trailContainerRef.current) return;

      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = x + 'px';
      trail.style.top = y + 'px';
      trail.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
      trail.style.setProperty('--ty', (Math.random() - 0.5) * 100 + 'px');

      trailContainerRef.current.appendChild(trail);

      setTimeout(() => {
        trail.remove();
      }, 1000);
    };

    const createRipple = (x, y) => {
      if (!trailContainerRef.current) return;

      const ripple = document.createElement('div');
      ripple.className = 'cursor-ripple';
      ripple.style.left = x - 10 + 'px';
      ripple.style.top = y - 10 + 'px';

      trailContainerRef.current.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Update CSS variables for cursor position
      document.documentElement.style.setProperty('--cursor-x', x + 'px');
      document.documentElement.style.setProperty('--cursor-y', y + 'px');

      // Create trail with throttling for performance
      const now = Date.now();
      if (now - lastTimeRef.current > 30) {
        // Only create trail every 30ms
        createTrail(x, y);
        lastTimeRef.current = now;
      }

      lastXRef.current = x;
      lastYRef.current = y;
    };

    const handleClick = (e) => {
      createRipple(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      ref={trailContainerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}
