import { motion, useMotionValue, useTransform } from "motion/react";
import { ReactNode, useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
  threshold?: number;
}

export function PullToRefresh({ 
  onRefresh, 
  children, 
  threshold = 80 
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const y = useMotionValue(0);
  const rotate = useTransform(y, [0, threshold], [0, 360]);
  const opacity = useTransform(y, [0, threshold], [0, 1]);

  const handleDragStart = () => {
    if (window.scrollY === 0) {
      setIsPulling(true);
    }
  };

  const handleDragEnd = async (event: any, info: any) => {
    setIsPulling(false);
    
    if (info.offset.y > threshold && window.scrollY === 0) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
    
    y.set(0);
  };

  return (
    <div className="relative">
      {/* Pull indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex justify-center items-center h-16 pointer-events-none z-10"
        style={{ opacity }}
      >
        <motion.div
          className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg"
          style={{ rotate }}
        >
          <RefreshCw 
            className={`h-6 w-6 ${isRefreshing ? 'animate-spin' : ''}`} 
          />
        </motion.div>
      </motion.div>

      {/* Main content */}
      <motion.div
        drag={isPulling ? "y" : false}
        dragConstraints={{ top: 0, bottom: threshold }}
        dragElastic={0.5}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ y }}
      >
        {children}
      </motion.div>
    </div>
  );
}