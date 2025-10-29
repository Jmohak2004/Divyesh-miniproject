import { ReactNode, useEffect, useRef } from "react";

interface SmoothScrollContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * A container component that ensures smooth scrolling behavior
 * for its children with optimized performance
 */
export function SmoothScrollContainer({ 
  children, 
  className = "" 
}: SmoothScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Enable smooth scrolling
    container.style.scrollBehavior = 'smooth';
    
    // Optimize scroll performance
    container.style.webkitOverflowScrolling = 'touch';
    
    // Prevent scroll chaining
    const preventScrollChaining = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;
      
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
    };

    container.addEventListener('wheel', preventScrollChaining, { passive: false });

    return () => {
      container.removeEventListener('wheel', preventScrollChaining);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`overscroll-contain ${className}`}
    >
      {children}
    </div>
  );
}