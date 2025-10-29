import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Smartphone,
  Zap,
  GraduationCap,
  Home,
  Menu,
  LogIn,
  User,
  BarChart3,
  ShoppingBag,
  CreditCard,
  Calendar,
  ChevronRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";

interface MobileScreen {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  route: string;
  status: "implemented" | "integrated";
  color: string;
  importance: "critical" | "high" | "medium";
}

export function MobileScreensDemo() {
  const screens: MobileScreen[] = [
    {
      id: "splash",
      name: "Splash Screen",
      description: "Loading screen with progress indicator and branding",
      icon: Zap,
      route: "#home",
      status: "integrated",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      importance: "critical"
    },
    {
      id: "onboarding",
      name: "Onboarding Screen",
      description: "Interactive tutorial for new users with swipe navigation",
      icon: GraduationCap,
      route: "#reset-onboarding",
      status: "integrated",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      importance: "high"
    },
    {
      id: "home",
      name: "Home Screen",
      description: "Main landing page with key features and navigation",
      icon: Home,
      route: "#home",
      status: "integrated",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      importance: "critical"
    },
    {
      id: "menu",
      name: "Menu Screen",
      description: "Navigation drawer with all app sections and settings",
      icon: Menu,
      route: "#home",
      status: "integrated",
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      importance: "critical"
    },
    {
      id: "login",
      name: "Login Screen",
      description: "Secure authentication with email and social login",
      icon: LogIn,
      route: "#home",
      status: "integrated",
      color: "bg-gradient-to-br from-red-500 to-red-600",
      importance: "critical"
    },
    {
      id: "profile",
      name: "Profile Screen",
      description: "User information, settings, and account management",
      icon: User,
      route: "#profile",
      status: "implemented",
      color: "bg-gradient-to-br from-pink-500 to-pink-600",
      importance: "high"
    },
    {
      id: "stats",
      name: "Stats Screen",
      description: "Dashboard analytics with charts and performance metrics",
      icon: BarChart3,
      route: "#stats",
      status: "implemented",
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      importance: "high"
    },
    {
      id: "catalog",
      name: "Catalog Screen",
      description: "Vendor browsing with search, filters, and favorites",
      icon: ShoppingBag,
      route: "#catalog",
      status: "implemented",
      color: "bg-gradient-to-br from-teal-500 to-teal-600",
      importance: "high"
    },
    {
      id: "checkout",
      name: "Checkout Screen",
      description: "Secure multi-step payment process with validation",
      icon: CreditCard,
      route: "#checkout",
      status: "implemented",
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      importance: "medium"
    },
    {
      id: "calendar",
      name: "Calendar Screen",
      description: "Event scheduling and appointment management",
      icon: Calendar,
      route: "#calendar",
      status: "implemented",
      color: "bg-gradient-to-br from-cyan-500 to-cyan-600",
      importance: "medium"
    }
  ];

  const handleScreenNavigation = (screen: MobileScreen) => {
    if (screen.id === "onboarding") {
      // Clear onboarding flag and reload
      localStorage.removeItem('bizconnect_onboarding_complete');
      window.location.reload();
    } else if (screen.id === "login") {
      // Trigger login modal (simulated with toast for demo)
      window.location.hash = 'home';
      setTimeout(() => {
        // This would open the auth modal
        alert("Login modal would open here. Click 'Sign In' or 'Sign Up' in the header to test.");
      }, 100);
    } else if (screen.id === "menu") {
      window.location.hash = 'home';
      setTimeout(() => {
        alert("Menu/Drawer can be accessed via the hamburger menu icon in the header or the bottom navigation on mobile.");
      }, 100);
    } else {
      window.location.hash = screen.route.replace('#', '');
    }
  };

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case "critical":
        return <Badge variant="destructive" className="text-xs">Critical</Badge>;
      case "high":
        return <Badge variant="default" className="text-xs">High</Badge>;
      case "medium":
        return <Badge variant="secondary" className="text-xs">Medium</Badge>;
      default:
        return null;
    }
  };

  const implementedCount = screens.filter(s => s.status === "implemented").length;
  const integratedCount = screens.filter(s => s.status === "integrated").length;

  return (
    <div className="min-h-screen bg-muted/30 pb-24 md:pb-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">Complete Mobile UI System</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl mb-4">
              Mobile UI Screen Patterns
            </h1>
            <p className="text-primary-foreground/80 mb-6 text-lg">
              All 10 essential mobile screens implemented with best practices, accessibility, and mobile-first design
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-6 flex-wrap">
              <div className="text-center">
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-300" />
                  <span className="text-3xl font-bold">{screens.length}</span>
                </div>
                <p className="text-sm text-primary-foreground/70">Total Screens</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 justify-center">
                  <Smartphone className="h-5 w-5 text-blue-300" />
                  <span className="text-3xl font-bold">{integratedCount}</span>
                </div>
                <p className="text-sm text-primary-foreground/70">Integrated</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 justify-center">
                  <Zap className="h-5 w-5 text-yellow-300" />
                  <span className="text-3xl font-bold">{implementedCount}</span>
                </div>
                <p className="text-sm text-primary-foreground/70">Ready to View</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* Screen Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {screens.map((screen, index) => {
            const Icon = screen.icon;
            return (
              <motion.div
                key={screen.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all group">
                  {/* Color header */}
                  <div className={`${screen.color} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative z-10 flex items-start justify-between">
                      <div className="bg-white/20 backdrop-blur p-3 rounded-lg">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex flex-col gap-2">
                        {getImportanceBadge(screen.importance)}
                        <Badge 
                          variant={screen.status === "integrated" ? "default" : "secondary"}
                          className={screen.status === "integrated" ? "bg-green-500 hover:bg-green-600 border-0" : ""}
                        >
                          {screen.status === "integrated" ? "✓ Live" : "Ready"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {screen.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {screen.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <Button
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      variant="outline"
                      onClick={() => handleScreenNavigation(screen)}
                    >
                      View Screen
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Implementation Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Mobile-First Implementation</CardTitle>
              <CardDescription>
                All screens follow modern mobile design patterns and best practices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Features
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                    <li>• Touch-optimized interactions (44px+ targets)</li>
                    <li>• Responsive layouts for all screen sizes</li>
                    <li>• Smooth animations with Motion</li>
                    <li>• Loading states and progress indicators</li>
                    <li>• Form validation and error handling</li>
                    <li>• Accessible keyboard navigation</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    Mobile Optimizations
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                    <li>• Safe area insets for notched devices</li>
                    <li>• Scroll performance optimization</li>
                    <li>• Bottom navigation for easy reach</li>
                    <li>• Pull-to-refresh functionality</li>
                    <li>• Floating action buttons</li>
                    <li>• Offline-ready architecture</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 mb-8"
        >
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Smartphone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium mb-2">How to Navigate</p>
                  <p className="text-sm text-muted-foreground">
                    Click "View Screen" on any card above to navigate to that screen. 
                    Use the bottom navigation bar on mobile or the header menu to switch between sections.
                    The onboarding screen will show automatically on first visit (or click "View Screen" to see it again).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
