import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Smartphone, 
  Layout, 
  List, 
  Image as ImageIcon,
  Repeat,
  Bell,
  Menu as MenuIcon,
  Lock,
  Loader,
  DollarSign,
  RefreshCw,
  BarChart3,
  ShoppingBag,
  CreditCard,
  Calendar as CalendarIcon,
  Sparkles
} from "lucide-react";
import { VerticalList, InfiniteList, ThumbnailList, Grid, FisheyeList } from "./ListPatterns";
import { FilmStrip, SwipeableCarousel } from "./CarouselPatterns";
import { MobileTitleBar } from "./MobileTitleBar";
import { PullToRefresh } from "./PullToRefresh";
import { MobileAdvertising } from "./MobileAdvertising";
import { LockScreen } from "./LockScreen";
import { InterstitialScreen } from "./InterstitialScreen";
import { OnboardingScreen } from "./OnboardingScreen";
import { StatsScreen } from "./StatsScreen";
import { CatalogScreen } from "./CatalogScreen";
import { CheckoutScreen } from "./CheckoutScreen";
import { CalendarScreen } from "./CalendarScreen";
import { toast } from "sonner@2.0.3";

export function MobilePatternsDemo() {
  const [showLockScreen, setShowLockScreen] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [interstitialProgress, setInterstitialProgress] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'demo' | 'stats' | 'catalog' | 'checkout' | 'calendar'>('demo');

  // Sample data for lists
  const sampleItems = Array.from({ length: 10 }, (_, i) => ({
    id: `item-${i + 1}`,
    content: (
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Business Item {i + 1}</h4>
          <p className="text-sm text-muted-foreground">Description for item {i + 1}</p>
        </div>
        <Badge variant="secondary">Active</Badge>
      </div>
    ),
    onClick: () => toast.success(`Selected Item ${i + 1}`)
  }));

  const thumbnailItems = Array.from({ length: 8 }, (_, i) => ({
    id: `thumb-${i + 1}`,
    title: `Partner ${i + 1}`,
    subtitle: "Technology Solutions",
    image: `https://api.dicebear.com/7.x/shapes/svg?seed=${i}`,
    onClick: () => toast.info(`Viewing Partner ${i + 1}`)
  }));

  const carouselItems = Array.from({ length: 6 }, (_, i) => ({
    id: `carousel-${i + 1}`,
    content: (
      <Card>
        <CardHeader>
          <CardTitle>Feature {i + 1}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Explore our powerful business connection feature {i + 1}
          </p>
        </CardContent>
      </Card>
    )
  }));

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success("Content refreshed!");
  };

  const handleLoadInterstitial = () => {
    setShowInterstitial(true);
    setInterstitialProgress(0);
    
    const interval = setInterval(() => {
      setInterstitialProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowInterstitial(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Screen routing
  if (showOnboarding) {
    return <OnboardingScreen onComplete={() => setShowOnboarding(false)} />;
  }

  if (currentScreen === 'stats') {
    return (
      <div className="min-h-screen">
        <Button
          variant="ghost"
          onClick={() => setCurrentScreen('demo')}
          className="m-4"
        >
          ← Back to Demo
        </Button>
        <StatsScreen />
      </div>
    );
  }

  if (currentScreen === 'catalog') {
    return (
      <div className="min-h-screen">
        <Button
          variant="ghost"
          onClick={() => setCurrentScreen('demo')}
          className="m-4"
        >
          ← Back to Demo
        </Button>
        <CatalogScreen />
      </div>
    );
  }

  if (currentScreen === 'checkout') {
    return (
      <div className="min-h-screen">
        <Button
          variant="ghost"
          onClick={() => setCurrentScreen('demo')}
          className="m-4"
        >
          ← Back to Demo
        </Button>
        <CheckoutScreen />
      </div>
    );
  }

  if (currentScreen === 'calendar') {
    return (
      <div className="min-h-screen">
        <Button
          variant="ghost"
          onClick={() => setCurrentScreen('demo')}
          className="m-4"
        >
          ← Back to Demo
        </Button>
        <CalendarScreen />
      </div>
    );
  }

  return (
    <>
      {showLockScreen && (
        <LockScreen 
          onUnlock={() => setShowLockScreen(false)}
          requirePassword={true}
        />
      )}

      <InterstitialScreen
        isLoading={showInterstitial}
        progress={interstitialProgress}
        message="Loading mobile patterns demo..."
      />

      <div className="min-h-screen bg-background">
        <MobileTitleBar
          title="Mobile Design Patterns"
          subtitle="All patterns in action"
          onBack={() => window.history.back()}
        />

        <div className="container mx-auto p-4 space-y-8 pb-24">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4 py-8"
          >
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
              <Smartphone className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Mobile Design Patterns</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive showcase of all mobile UI/UX patterns including composition rules, 
              scroll behaviors, lists, carousels, notifications, and more.
            </p>
          </motion.div>

          {/* Mobile Screens Overview - NEW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default" className="bg-gradient-to-r from-blue-500 to-purple-500">
                    NEW
                  </Badge>
                  <Badge variant="secondary">All 10 Screens</Badge>
                </div>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  Complete Mobile UI Screen Collection
                </CardTitle>
                <CardDescription>
                  View all 10 essential mobile screens in one place - Splash, Onboarding, Home, Menu, Login, Profile, Stats, Catalog, Checkout, and Calendar screens with full mobile optimization.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Loader className="h-4 w-4 text-primary" />
                    <span>Splash</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span>Onboarding</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MenuIcon className="h-4 w-4 text-primary" />
                    <span>Menu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    <span>Stats</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-primary" />
                    <span>Catalog</span>
                  </div>
                </div>
                <Button 
                  onClick={() => window.location.hash = 'mobile-screens'} 
                  className="w-full"
                  size="lg"
                >
                  <Smartphone className="mr-2 h-5 w-5" />
                  Explore All Mobile Screens
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pattern Categories */}
          <Tabs defaultValue="lists" className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 gap-2 h-auto p-2">
              <TabsTrigger value="lists" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                Lists
              </TabsTrigger>
              <TabsTrigger value="carousels" className="flex items-center gap-2">
                <Repeat className="h-4 w-4" />
                Carousels
              </TabsTrigger>
              <TabsTrigger value="composition" className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Composition
              </TabsTrigger>
              <TabsTrigger value="screens" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Screens
              </TabsTrigger>
              <TabsTrigger value="ui-patterns" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                UI Screens
              </TabsTrigger>
            </TabsList>

            {/* Lists Tab */}
            <TabsContent value="lists" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vertical List</CardTitle>
                  <CardDescription>
                    Standard vertical scrolling list pattern with tap interactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <VerticalList items={sampleItems.slice(0, 5)} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Thumbnail List</CardTitle>
                  <CardDescription>
                    List items with thumbnail images and metadata
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ThumbnailList items={thumbnailItems.slice(0, 4)} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Grid Pattern</CardTitle>
                  <CardDescription>
                    Responsive grid layout for visual content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Grid items={thumbnailItems} columns={2} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fisheye List</CardTitle>
                  <CardDescription>
                    Interactive list with focus effect on active items
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FisheyeList items={sampleItems.slice(0, 6)} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Carousels Tab */}
            <TabsContent value="carousels" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Film Strip</CardTitle>
                  <CardDescription>
                    Horizontal scrollable container with snap points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FilmStrip items={carouselItems} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Swipeable Carousel</CardTitle>
                  <CardDescription>
                    Touch-friendly carousel with drag interactions and auto-play
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SwipeableCarousel items={carouselItems.slice(0, 4)} autoPlay={true} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Composition Tab */}
            <TabsContent value="composition" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pull to Refresh</CardTitle>
                  <CardDescription>
                    Swipe down to refresh content - try it below!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PullToRefresh onRefresh={handleRefresh}>
                    <div className="bg-muted rounded-lg p-8 text-center">
                      <RefreshCw className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Pull down from the top of the screen to refresh
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Last updated: {new Date().toLocaleTimeString()}
                      </p>
                    </div>
                  </PullToRefresh>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mobile Advertising (MMA-Compliant)</CardTitle>
                  <CardDescription>
                    Non-intrusive advertising that follows Mobile Marketing Association guidelines
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <MobileAdvertising
                    title="Partner with Premium Businesses"
                    description="Unlock exclusive features with BizConnect Pro"
                    ctaText="Learn More"
                    position="inline"
                    dismissible={true}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Title Bar</CardTitle>
                  <CardDescription>
                    Sticky mobile title bar with navigation - see top of page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-4 text-center text-muted-foreground">
                    Check the title bar at the top of this page with back navigation
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Screens Tab */}
            <TabsContent value="screens" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lock Screen</CardTitle>
                  <CardDescription>
                    Security screen with PIN protection (Demo PIN: 1234)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setShowLockScreen(true)} className="w-full">
                    <Lock className="mr-2 h-4 w-4" />
                    Show Lock Screen
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Interstitial Screen</CardTitle>
                  <CardDescription>
                    Loading screen shown during app startup or transitions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleLoadInterstitial} className="w-full">
                    <Loader className="mr-2 h-4 w-4" />
                    Show Loading Screen
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All Other Patterns</CardTitle>
                  <CardDescription>
                    Additional patterns active throughout the app
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <Bell className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Notification Center</h4>
                        <p className="text-xs text-muted-foreground">
                          See bell icon in header
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <MenuIcon className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Revealable Menu</h4>
                        <p className="text-xs text-muted-foreground">
                          Mobile drawer in header
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <Layout className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Bottom Navigation</h4>
                        <p className="text-xs text-muted-foreground">
                          Fixed menu on mobile
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <Smartphone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Idle Screen</h4>
                        <p className="text-xs text-muted-foreground">
                          Auto-locks after 30s
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* UI Patterns Tab - NEW */}
            <TabsContent value="ui-patterns" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Onboarding Screen</CardTitle>
                  <CardDescription>
                    Multi-step introduction with swipeable slides showing app benefits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setShowOnboarding(true)} className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Show Onboarding
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Stats & Analytics Screen</CardTitle>
                  <CardDescription>
                    Mobile-optimized dashboard with charts, graphs, and key metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setCurrentScreen('stats')} className="w-full" variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Stats Screen
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Catalog Screen</CardTitle>
                  <CardDescription>
                    E-commerce style browsing with high-res images and filtering
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setCurrentScreen('catalog')} className="w-full" variant="outline">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    View Catalog Screen
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Checkout Screen</CardTitle>
                  <CardDescription>
                    Secure payment flow with form validation and progress tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setCurrentScreen('checkout')} className="w-full" variant="outline">
                    <CreditCard className="mr-2 h-4 w-4" />
                    View Checkout Screen
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Calendar Screen</CardTitle>
                  <CardDescription>
                    Event scheduling with month/week/day views and event management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setCurrentScreen('calendar')} className="w-full" variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    View Calendar Screen
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Pattern Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Complete Pattern Implementation</CardTitle>
              <CardDescription>
                All mobile design patterns following composition and cultural reading norms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  "Scroll with Progress",
                  "Annunciator Row",
                  "Notifications",
                  "Titles & Labels",
                  "Revealable Menu",
                  "Fixed Menu",
                  "Home Screen",
                  "Idle Screen",
                  "Lock Screen",
                  "Interstitial Screen",
                  "Splash/Onboarding",
                  "Stats Screen",
                  "Catalog Screen",
                  "Checkout Screen",
                  "Calendar Screen",
                  "MMA Advertising",
                  "Vertical List",
                  "Infinite List",
                  "Thumbnail List",
                  "Grid Pattern",
                  "Film Strip",
                  "Carousel",
                  "Fisheye List",
                  "FAB",
                  "Pull to Refresh",
                  "Bottom Navigation",
                  "Mobile Drawer"
                ].map((pattern) => (
                  <div key={pattern} className="flex items-center gap-2 p-2 bg-muted rounded">
                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                    <span className="text-sm">{pattern}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}