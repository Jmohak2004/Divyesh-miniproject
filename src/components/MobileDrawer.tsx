import { motion } from "motion/react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "./ui/drawer";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Home, 
  Info, 
  Star, 
  DollarSign, 
  LayoutDashboard,
  Search,
  Building2,
  Phone,
  Settings,
  ChevronRight,
  Smartphone,
  User,
  BarChart3,
  ShoppingBag,
  CreditCard,
  Calendar
} from "lucide-react";
import { AuthModals } from "./AuthModals";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";

interface MobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileDrawer({ open, onOpenChange }: MobileDrawerProps) {
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
    onOpenChange(false);
  };

  const mainMenuItems = [
    { icon: Home, label: "Home", id: "hero", isHome: true },
    { icon: Info, label: "How It Works", id: "how-it-works", isHome: false },
    { icon: Building2, label: "Features", id: "features", isHome: false },
    { icon: Star, label: "Success Stories", id: "success-stories", isHome: false },
    { icon: DollarSign, label: "Pricing", id: "pricing", isHome: false }
  ];

  const quickActions = [
    { icon: Search, label: "Find Vendors", action: () => scrollToSection('features') },
    { icon: LayoutDashboard, label: "Dashboard", action: () => { window.location.hash = 'dashboard'; onOpenChange(false); } },
    { icon: Phone, label: "Contact Support", action: () => scrollToSection('footer') }
  ];

  const mobileScreens = [
    { icon: Smartphone, label: "All Mobile Screens", route: "mobile-screens", badge: "NEW", action: () => { window.location.hash = 'mobile-screens'; onOpenChange(false); } },
    { icon: User, label: "Profile Screen", route: "profile", action: () => { window.location.hash = 'profile'; onOpenChange(false); } },
    { icon: BarChart3, label: "Stats & Analytics", route: "stats", action: () => { window.location.hash = 'stats'; onOpenChange(false); } },
    { icon: ShoppingBag, label: "Vendor Catalog", route: "catalog", action: () => { window.location.hash = 'catalog'; onOpenChange(false); } },
    { icon: CreditCard, label: "Checkout Demo", route: "checkout", action: () => { window.location.hash = 'checkout'; onOpenChange(false); } },
    { icon: Calendar, label: "Calendar & Events", route: "calendar", action: () => { window.location.hash = 'calendar'; onOpenChange(false); } }
  ];

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader className="border-b">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                BC
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <DrawerTitle>BizConnect</DrawerTitle>
              <DrawerDescription>
                Your business connection platform
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className="overflow-y-auto flex-1 px-4 py-6 overscroll-contain">
          {/* Main Navigation */}
          <div className="space-y-2 mb-6">
            <h3 className="px-3 mb-3 text-sm text-muted-foreground uppercase tracking-wider">
              Navigation
            </h3>
            {mainMenuItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  if (item.isHome) {
                    window.location.hash = '';
                    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                    onOpenChange(false);
                  } else {
                    scrollToSection(item.id);
                  }
                }}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </motion.button>
            ))}
          </div>

          <Separator className="my-6" />

          {/* Quick Actions */}
          <div className="space-y-2 mb-6">
            <h3 className="px-3 mb-3 text-sm text-muted-foreground uppercase tracking-wider">
              Quick Actions
            </h3>
            {quickActions.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={item.action}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (mainMenuItems.length + index) * 0.05 }}
              >
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>

          <Separator className="my-6" />

          {/* Mobile UI Screens */}
          <div className="space-y-2 mb-6">
            <h3 className="px-3 mb-3 text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Mobile UI Screens
              <Badge variant="secondary" className="text-xs">Demo</Badge>
            </h3>
            {mobileScreens.map((item, index) => (
              <motion.button
                key={item.route}
                onClick={item.action}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (mainMenuItems.length + quickActions.length + index) * 0.05 }}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <Badge variant="default" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            ))}
          </div>

          <Separator className="my-6" />

          {/* Auth Buttons */}
          <div className="space-y-3 px-3">
            <AuthModals
              signInTrigger={
                <Button variant="outline" className="w-full justify-start">
                  Sign In
                </Button>
              }
              signUpTrigger={
                <Button className="w-full justify-start">
                  Get Started Free
                </Button>
              }
            />
          </div>

          {/* Settings Link */}
          <div className="mt-6 px-3">
            <button className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}