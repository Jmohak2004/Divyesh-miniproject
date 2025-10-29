import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";
import { Progress } from "./ui/progress";

interface InterstitialScreenProps {
  isLoading: boolean;
  progress?: number;
  message?: string;
}

export function InterstitialScreen({ 
  isLoading, 
  progress = 0, 
  message = "Loading BizConnect..." 
}: InterstitialScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="w-full max-w-md px-8 space-y-8">
            {/* Logo and Brand */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center space-y-4"
            >
              <motion.h1 
                className="text-4xl font-bold text-primary"
                animate={{ 
                  opacity: [1, 0.7, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                BizConnect
              </motion.h1>
              <p className="text-muted-foreground">
                Connecting businesses worldwide
              </p>
            </motion.div>

            {/* Loading Spinner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center"
            >
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-2"
            >
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-center text-muted-foreground">
                {message}
              </p>
            </motion.div>

            {/* Loading Dots Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex justify-center space-x-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-primary rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}