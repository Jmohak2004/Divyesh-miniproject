import { Button } from "./ui/button";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { AuthModals } from "./AuthModals";
import { NotificationCenter } from "./NotificationCenter";
import { MobileDrawer } from "./MobileDrawer";
import { motion } from "motion/react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    // First, ensure we're on the home view
    if (window.location.hash && window.location.hash !== '#home') {
      window.location.hash = '';
      // Wait for the view to change, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerHeight = 80;
          const elementPosition = element.offsetTop - headerHeight;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    } else {
      // Already on home, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "How It Works", id: "how-it-works" },
    { name: "Features", id: "features" },
    { name: "Success Stories", id: "success-stories" },
    { name: "Pricing", id: "pricing" }
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-200"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0 cursor-pointer" 
              onClick={() => {
                window.location.hash = '';
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h1 className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
                BizConnect
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                  />
                </motion.button>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <NotificationCenter />
              <Button variant="ghost" onClick={() => window.location.hash = 'dashboard'}>
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <AuthModals
                signInTrigger={<Button variant="outline">Sign In</Button>}
                signUpTrigger={<Button>Get Started</Button>}
              />
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center space-x-2">
              <NotificationCenter />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileDrawerOpen(true)}
                className="transition-transform duration-200"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>

        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <MobileDrawer 
        open={isMobileDrawerOpen} 
        onOpenChange={setIsMobileDrawerOpen} 
      />
    </>
  );
}
