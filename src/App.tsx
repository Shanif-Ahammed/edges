import { useState, useEffect, useRef } from 'react';
import './index.css';

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [cursorPosition, setCursorPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isHovering, setIsHovering] = useState(false);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const updateCursorPosition = () => {
      setCursorPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.15,
        y: prev.y + (mousePosition.y - prev.y) * 0.15
      }));
      requestRef.current = requestAnimationFrame(updateCursorPosition);
    };

    requestRef.current = requestAnimationFrame(updateCursorPosition);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mousePosition]);

  return (
    <div
      className="app-container"
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`
      } as React.CSSProperties}
    >
      {/* The animated custom cursor */}
      <div
        className={`custom-cursor ${isHovering ? 'scale-up' : ''}`}
        style={{
          transform: `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0)`
        }}
      />

      {/* Background that follows mouse */}
      <div className="radial-background"></div>

      <main className="content">
        <h1
          className="title"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          Edges
        </h1>
        <h4
          className="title"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          Catering
        </h4>
        <p className="subtitle">
          Reveal the unseen.Coming Soon.
        </p>
        <button
          className="action-btn"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          Explore
        </button>
      </main>
    </div>
  );
}