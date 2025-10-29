import { motion } from "motion/react";
import { Lock, Unlock } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface LockScreenProps {
  onUnlock: () => void;
  requirePassword?: boolean;
  backgroundImage?: string;
}

export function LockScreen({ 
  onUnlock, 
  requirePassword = false,
  backgroundImage 
}: LockScreenProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    if (requirePassword) {
      // Demo password is "1234"
      if (password === "1234") {
        onUnlock();
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    } else {
      onUnlock();
    }
  };

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
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-primary/90 to-primary text-primary-foreground"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay for better text readability */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/50" />
      )}

      <div className="relative z-10 text-center space-y-8 p-6">
        {/* Time Display */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-7xl font-light mb-2">{formatTime(currentTime)}</h1>
          <p className="text-xl opacity-90">{formatDate(currentTime)}</p>
        </motion.div>

        {/* Lock Icon */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-6">
            <Lock className="h-12 w-12" />
          </div>
        </motion.div>

        {/* Unlock Interface */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 max-w-sm mx-auto"
        >
          {requirePassword ? (
            <>
              <Input
                type="password"
                placeholder="Enter PIN (1234)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 text-center text-lg ${
                  error ? 'border-red-500 animate-shake' : ''
                }`}
                autoFocus
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-300 text-sm"
                >
                  Incorrect PIN. Try again.
                </motion.p>
              )}
              <Button
                onClick={handleUnlock}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                <Unlock className="mr-2 h-5 w-5" />
                Unlock
              </Button>
            </>
          ) : (
            <>
              <p className="text-white/80 mb-4">Swipe up or tap to unlock</p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleUnlock}
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  <Unlock className="mr-2 h-5 w-5" />
                  Unlock
                </Button>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* App Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold opacity-80">BizConnect</h2>
        </motion.div>
      </div>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
        className="absolute bottom-8 left-0 right-0 text-center"
      >
        <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
          <p className="text-sm opacity-75">Tap to unlock</p>
        </div>
      </motion.div>
    </motion.div>
  );
}