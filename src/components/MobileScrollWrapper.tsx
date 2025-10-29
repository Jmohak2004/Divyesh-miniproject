import { motion, useScroll, useTransform } from "motion/react";
import { ReactNode, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

interface MobileScrollWrapperProps {
  children: ReactNode;
  showScrollToTop?: boolean;
}

export function MobileScrollWrapper({ 
  children, 
  showScrollToTop = true 
}: MobileScrollWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress for button visibility
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0, 0.1], [20, 0]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={ref} className="relative">
      {/* Scroll indicator for mobile */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-green-500 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Scroll to top button - appears when scrolling down */}
      {showScrollToTop && (
        <motion.div
          style={{ 
            opacity: buttonOpacity,
            y: buttonY
          }}
          className="fixed bottom-24 right-6 z-40 md:hidden pointer-events-auto"
        >
          <Button
            onClick={scrollToTop}
            className="rounded-full w-12 h-12 shadow-lg bg-primary hover:bg-primary/90"
            size="sm"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}

      {/* Bottom safe area for mobile devices */}
      <div className="h-safe-area-inset-bottom md:hidden" />
    </div>
  );
}