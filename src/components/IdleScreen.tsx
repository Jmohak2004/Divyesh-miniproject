import { motion, AnimatePresence } from "motion/react";
import { Lock, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

interface IdleScreenProps {
  onUnlock?: () => void;
}

export function IdleScreen({ onUnlock }: IdleScreenProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] bg-gradient-to-br from-primary/90 to-primary flex flex-col items-center justify-center text-primary-foreground"
    >
      {/* Clock Display */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4 mb-12"
      >
        <motion.div
          className="flex items-center justify-center space-x-2 mb-6"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Clock className="h-8 w-8" />
        </motion.div>
        
        <motion.h2 
          className="text-7xl font-bold"
          animate={{ opacity: [1, 0.9, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {formatTime(currentTime)}
        </motion.h2>
        
        <p className="text-xl opacity-90">
          {formatDate(currentTime)}
        </p>
      </motion.div>

      {/* Lock Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.3
        }}
        className="mb-8"
      >
        <div className="w-20 h-20 bg-primary-foreground/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Lock className="h-10 w-10" />
        </div>
      </motion.div>

      {/* Unlock Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={onUnlock}
          variant="outline"
          className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 backdrop-blur-sm px-8 py-6 text-lg"
        >
          <Lock className="mr-2 h-5 w-5" />
          Tap to unlock
        </Button>
      </motion.div>

      {/* Swipe Up Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1 },
          y: { 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="absolute bottom-12 text-center"
      >
        <p className="text-sm opacity-70">
          Swipe up or tap to continue
        </p>
      </motion.div>
    </motion.div>
  );
}