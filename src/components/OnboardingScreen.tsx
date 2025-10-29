import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronRight, Check, Sparkles, Search, Users, TrendingUp, Shield } from "lucide-react";

interface OnboardingSlide {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides: OnboardingSlide[] = [
    {
      id: 0,
      icon: Sparkles,
      title: "Welcome to BizConnect",
      description: "Connect big businesses with small businesses seamlessly. Let's show you how it works.",
      color: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    {
      id: 1,
      icon: Search,
      title: "AI-Powered Discovery",
      description: "Find the perfect vendors using our intelligent matching system. Save time and get better results.",
      color: "bg-gradient-to-br from-purple-500 to-pink-600"
    },
    {
      id: 2,
      icon: Users,
      title: "Verified Partners",
      description: "Access our network of verified small businesses. Every partner is thoroughly vetted for quality.",
      color: "bg-gradient-to-br from-pink-500 to-red-600"
    },
    {
      id: 3,
      icon: TrendingUp,
      title: "Track Your Growth",
      description: "Monitor partnerships, manage projects, and track ROI all in one place with real-time analytics.",
      color: "bg-gradient-to-br from-orange-500 to-yellow-600"
    },
    {
      id: 4,
      icon: Shield,
      title: "Secure & Compliant",
      description: "Your data is protected with enterprise-grade security. We take compliance seriously.",
      color: "bg-gradient-to-br from-green-500 to-teal-600"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background">
      {/* Skip button */}
      <div className="absolute top-6 right-6 z-10 safe-area-inset-top">
        <Button 
          variant="ghost" 
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground"
        >
          Skip
        </Button>
      </div>

      {/* Slide container */}
      <div className="h-full flex flex-col items-center justify-center px-6 pb-24">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                handleNext();
              } else if (swipe > swipeConfidenceThreshold) {
                handlePrev();
              }
            }}
            className="w-full max-w-md text-center"
          >
            {/* Icon with animated background */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-8"
            >
              <div className={`${slides[currentSlide].color} w-32 h-32 rounded-full flex items-center justify-center mx-auto shadow-2xl`}>
                {(() => {
                  const Icon = slides[currentSlide].icon;
                  return <Icon className="w-16 h-16 text-white" />;
                })()}
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4"
            >
              {slides[currentSlide].title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              {slides[currentSlide].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 safe-area-inset-bottom">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((slide, index) => (
            <motion.button
              key={slide.id}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className="relative"
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted-foreground/30'
                }`}
              />
            </motion.button>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-4">
          {currentSlide > 0 && (
            <Button
              variant="outline"
              onClick={handlePrev}
              className="flex-1"
            >
              Previous
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="flex-1"
          >
            {currentSlide === slides.length - 1 ? (
              <>
                Get Started
                <Check className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
