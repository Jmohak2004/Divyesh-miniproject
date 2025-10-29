import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface MobileAdvertisingProps {
  title: string;
  description: string;
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  position?: 'top' | 'bottom' | 'inline';
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function MobileAdvertising({
  title,
  description,
  imageUrl,
  ctaText = "Learn More",
  ctaLink,
  position = 'inline',
  dismissible = true,
  onDismiss
}: MobileAdvertisingProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const handleClick = () => {
    if (ctaLink) {
      window.open(ctaLink, '_blank', 'noopener,noreferrer');
    }
  };

  const positionClasses = {
    top: 'fixed top-16 left-0 right-0 z-40',
    bottom: 'fixed bottom-20 left-0 right-0 z-40 md:bottom-0',
    inline: 'relative'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: position === 'top' ? -100 : position === 'bottom' ? 100 : 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position === 'top' ? -100 : position === 'bottom' ? 100 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`${positionClasses[position]} md:hidden`}
        >
          <Card className="mx-4 my-2 overflow-hidden border-l-4 border-l-primary relative">
            {/* Advertisement label */}
            <div className="absolute top-2 right-2 bg-muted/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-muted-foreground">
              Ad
            </div>

            {dismissible && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="absolute top-2 left-2 h-6 w-6 p-0 z-10"
              >
                <X className="h-4 w-4" />
              </Button>
            )}

            <div className="flex items-center p-4 pt-10">
              {imageUrl && (
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 mr-4 bg-muted">
                  <img 
                    src={imageUrl} 
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h4 className="font-medium mb-1 truncate">{title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {description}
                </p>
                <Button
                  size="sm"
                  onClick={handleClick}
                  className="w-full sm:w-auto"
                >
                  {ctaText}
                </Button>
              </div>
            </div>

            {/* Swipe to dismiss hint */}
            {dismissible && (
              <motion.div
                className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-muted-foreground/20 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              />
            )}
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Banner ad variant
export function BannerAd({
  title,
  ctaText = "Learn More",
  ctaLink,
  backgroundColor = "bg-primary",
  onDismiss
}: {
  title: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: string;
  onDismiss?: () => void;
}) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={`${backgroundColor} text-primary-foreground md:hidden`}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex-1 mr-2">
              <p className="text-sm font-medium">{title}</p>
            </div>
            <div className="flex items-center space-x-2">
              {ctaLink && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => window.open(ctaLink, '_blank')}
                  className="text-xs"
                >
                  {ctaText}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="h-6 w-6 p-0 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}