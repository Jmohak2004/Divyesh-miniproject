import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, Menu as MenuIcon, Phone, Mail, MessageSquare, Smartphone } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ContactForm } from "./ContactForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export function FloatingActionButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother scroll detection
      requestAnimationFrame(() => {
        setShowScrollTop(window.scrollY > 400);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsExpanded(false);
  };

  const fabActions = [
    { 
      icon: ArrowUp, 
      label: "Scroll to top", 
      onClick: scrollToTop,
      color: "bg-primary hover:bg-primary/90"
    },
    { 
      icon: Smartphone, 
      label: "Mobile Patterns", 
      onClick: () => {
        window.location.hash = 'patterns';
        setIsExpanded(false);
      },
      color: "bg-purple-500 hover:bg-purple-600"
    },
    { 
      icon: Phone, 
      label: "Call us", 
      onClick: () => window.open('tel:+1234567890'),
      color: "bg-blue-500 hover:bg-blue-600"
    },
    { 
      icon: Mail, 
      label: "Email us", 
      onClick: () => window.open('mailto:contact@bizconnect.com'),
      color: "bg-green-500 hover:bg-green-600"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {/* Expanded Action Buttons */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {fabActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
              >
                <Button
                  onClick={action.onClick}
                  className={`${action.color} text-white shadow-lg w-12 h-12 rounded-full p-0`}
                  title={action.label}
                >
                  <action.icon className="h-5 w-5" />
                </Button>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg w-14 h-14 rounded-full p-0 transition-transform hover:scale-110"
              title="Quick actions"
            >
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <MenuIcon className="h-6 w-6" />
              </motion.div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Contact Sheet */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-3"
            >
              <Button
                className="bg-green-500 hover:bg-green-600 text-white shadow-lg w-12 h-12 rounded-full p-0"
                title="Contact us"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh]">
            <SheetHeader>
              <SheetTitle>Contact Us</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <ContactForm />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}