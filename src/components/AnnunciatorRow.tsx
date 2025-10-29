import { motion } from "motion/react";
import { Wifi, WifiOff, Bell, Battery, BatteryCharging, Signal } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "./ui/badge";

export function AnnunciatorRow() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [notificationCount, setNotificationCount] = useState(3);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between text-xs md:hidden"
    >
      {/* Left side - Time and Status */}
      <div className="flex items-center space-x-3">
        <span className="font-medium">{formatTime(currentTime)}</span>
        
        {/* Connection Status */}
        <motion.div
          initial={false}
          animate={{ scale: isOnline ? 1 : 1.1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center"
        >
          {isOnline ? (
            <Wifi className="h-4 w-4" />
          ) : (
            <WifiOff className="h-4 w-4 text-destructive-foreground" />
          )}
        </motion.div>

        {/* Signal Strength */}
        <Signal className="h-4 w-4" />
      </div>

      {/* Right side - Notifications and Battery */}
      <div className="flex items-center space-x-3">
        {/* Notification Badge */}
        {notificationCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative"
          >
            <Bell className="h-4 w-4" />
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
              className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-3 h-3 flex items-center justify-center text-[8px]"
            >
              {notificationCount}
            </motion.span>
          </motion.div>
        )}

        {/* Battery Indicator */}
        <BatteryCharging className="h-4 w-4" />
      </div>
    </motion.div>
  );
}