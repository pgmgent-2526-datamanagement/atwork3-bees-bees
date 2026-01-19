'use client';

import { useState, useEffect } from 'react';

export default function ScrollCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Show only in hero section
      const heroHeight = window.innerHeight * 0.75;
      setIsVisible(e.clientY < heroHeight && e.clientY > 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="scroll-cursor"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
      }}
    >
      <span className="scroll-cursor__text">Scroll</span>
    </div>
  );
}
