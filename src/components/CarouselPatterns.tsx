import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { ReactNode, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

// Film Strip Pattern - Horizontal scrollable container
interface FilmStripProps {
  items: Array<{
    id: string;
    content: ReactNode;
  }>;
  itemWidth?: number;
  gap?: number;
}

export function FilmStrip({ items, itemWidth = 280, gap = 16 }: FilmStripProps) {
  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 overflow-y-hidden">
      <div className="flex space-x-4 pb-4 cursor-grab active:cursor-grabbing">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            style={{ width: itemWidth, minWidth: itemWidth }}
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            {item.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Swipeable Carousel Pattern
interface SwipeableCarouselProps {
  items: Array<{
    id: string;
    content: ReactNode;
  }>;
  autoPlay?: boolean;
  interval?: number;
}

export function SwipeableCarousel({ 
  items, 
  autoPlay = false,
  interval = 5000 
}: SwipeableCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(velocity) > 500 || Math.abs(offset) > 100) {
      if (offset > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (offset < 0 && currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="relative overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex"
      >
        {items.map((item) => (
          <div key={item.id} className="w-full flex-shrink-0">
            {item.content}
          </div>
        ))}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
        <Button
          variant="outline"
          size="sm"
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="pointer-events-auto rounded-full bg-background/80 backdrop-blur-sm"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextSlide}
          disabled={currentIndex === items.length - 1}
          className="pointer-events-auto rounded-full bg-background/80 backdrop-blur-sm"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {items.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-primary'
                : 'w-2 bg-muted-foreground/30'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}

// Fisheye List Pattern - Items scale on focus
interface FisheyeListProps {
  items: Array<{
    id: string;
    icon: ReactNode;
    label: string;
    onClick?: () => void;
  }>;
}

export function FisheyeList({ items }: FisheyeListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex items-end justify-center space-x-2 py-4">
      {items.map((item, index) => {
        const distance = hoveredIndex !== null ? Math.abs(index - hoveredIndex) : 3;
        const scale = Math.max(1, 1.5 - distance * 0.2);

        return (
          <motion.button
            key={item.id}
            onClick={item.onClick}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{ scale }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center p-2 rounded-lg hover:bg-accent"
          >
            <div className="w-12 h-12 flex items-center justify-center">
              {item.icon}
            </div>
            <motion.span
              animate={{ 
                fontSize: hoveredIndex === index ? '14px' : '12px',
                opacity: hoveredIndex === index ? 1 : 0.7
              }}
              className="text-xs mt-1 text-center"
            >
              {item.label}
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}

// Parallax Scroll Pattern
interface ParallaxScrollProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxScroll({ 
  children, 
  speed = 0.5,
  className = "" 
}: ParallaxScrollProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother scroll updates
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className={className}
      style={{
        y: scrollY * speed
      }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}