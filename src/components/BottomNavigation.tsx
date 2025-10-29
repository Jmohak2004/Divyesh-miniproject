import { motion } from "motion/react";
import { Home, Search, PlusCircle, Bell, User } from "lucide-react";
import { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}

export function BottomNavigation() {
  const [activeTab, setActiveTab] = useState('home');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems: NavItem[] = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home,
      onClick: () => {
        setActiveTab('home');
        window.location.hash = '';
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      }
    },
    { 
      id: 'search', 
      label: 'Search', 
      icon: Search,
      onClick: () => {
        setActiveTab('search');
        scrollToSection('features');
      }
    },
    { 
      id: 'add', 
      label: 'Add', 
      icon: PlusCircle,
      onClick: () => {
        setActiveTab('add');
        window.location.hash = 'dashboard';
      }
    },
    { 
      id: 'notifications', 
      label: 'Updates', 
      icon: Bell,
      onClick: () => {
        setActiveTab('notifications');
        scrollToSection('success-stories');
      }
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: User,
      onClick: () => {
        setActiveTab('profile');
        window.location.hash = 'profile';
      }
    }
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t md:hidden"
    >
      <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
        {navItems.map((item, index) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <motion.button
              key={item.id}
              onClick={item.onClick}
              className="flex flex-col items-center justify-center flex-1 py-2 relative"
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.div
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative"
              >
                <Icon 
                  className={`h-6 w-6 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`} 
                />
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
              
              <motion.span
                animate={{ 
                  color: isActive ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                  scale: isActive ? 1 : 0.9
                }}
                className="text-xs mt-1"
              >
                {item.label}
              </motion.span>

              {/* Ripple effect on tap */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-primary/10 rounded-lg"
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}