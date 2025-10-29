import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Testimonials } from "./components/Testimonials";
import { PricingSection } from "./components/PricingSection";
import { Footer } from "./components/Footer";
import { Dashboard } from "./components/Dashboard";
import { MobilePatternsDemo } from "./components/MobilePatternsDemo";
import { MobileScreensDemo } from "./components/MobileScreensDemo";
import { ProfileScreen } from "./components/ProfileScreen";
import { StatsScreen } from "./components/StatsScreen";
import { CatalogScreen } from "./components/CatalogScreen";
import { CheckoutScreen } from "./components/CheckoutScreen";
import { CalendarScreen } from "./components/CalendarScreen";
import { Toaster } from "./components/ui/sonner";
import { InterstitialScreen } from "./components/InterstitialScreen";
import { AnnunciatorRow } from "./components/AnnunciatorRow";
import { ScrollProgress } from "./components/ScrollProgress";
import { FloatingActionButton } from "./components/FloatingActionButton";
import { IdleScreen } from "./components/IdleScreen";
import { BottomNavigation } from "./components/BottomNavigation";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { useEffect, useState } from "react";

type ViewType = 'home' | 'dashboard' | 'patterns' | 'mobile-screens' | 'profile' | 'stats' | 'catalog' | 'checkout' | 'calendar';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check if user has seen onboarding
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('bizconnect_onboarding_complete');
    if (!hasSeenOnboarding) {
      // Show onboarding after initial loading is complete
      const timer = setTimeout(() => {
        if (!isLoading) {
          setShowOnboarding(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Loading simulation
  useEffect(() => {
    const loadingTimer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingTimer);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(loadingTimer);
  }, []);

  // Idle timeout detection
  useEffect(() => {
    let idleTimeout: NodeJS.Timeout;

    const resetIdleTimer = () => {
      clearTimeout(idleTimeout);
      setIsIdle(false);
      // Set idle after 5 minutes of inactivity (demo: 30 seconds)
      idleTimeout = setTimeout(() => {
        setIsIdle(true);
      }, 30000);
    };

    // Events that reset the idle timer
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer);
    });

    resetIdleTimer();

    return () => {
      clearTimeout(idleTimeout);
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer);
      });
    };
  }, []);

  // Add smooth scrolling behavior and optimize scroll performance
  useEffect(() => {
    // Ensure smooth scrolling is enabled
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.overflowX = 'hidden';
    
    // Optimize scroll performance
    const root = document.documentElement;
    root.style.scrollPaddingTop = '80px'; // Account for fixed header
    
    // Check for hash-based navigation
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      
      switch (hash) {
        case 'dashboard':
          setCurrentView('dashboard');
          break;
        case 'patterns':
          setCurrentView('patterns');
          break;
        case 'mobile-screens':
          setCurrentView('mobile-screens');
          break;
        case 'profile':
          setCurrentView('profile');
          break;
        case 'stats':
          setCurrentView('stats');
          break;
        case 'catalog':
          setCurrentView('catalog');
          break;
        case 'checkout':
          setCurrentView('checkout');
          break;
        case 'calendar':
          setCurrentView('calendar');
          break;
        case '':
        case 'home':
          setCurrentView('home');
          break;
        default:
          setCurrentView('home');
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Check initial hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Prevent scroll restoration on page reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Show onboarding on first visit
  if (showOnboarding) {
    return (
      <OnboardingScreen 
        onComplete={() => {
          setShowOnboarding(false);
          localStorage.setItem('bizconnect_onboarding_complete', 'true');
        }} 
      />
    );
  }

  // Show idle screen
  if (isIdle) {
    return <IdleScreen onUnlock={() => setIsIdle(false)} />;
  }

  // Render the appropriate view based on currentView
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'patterns':
        return <MobilePatternsDemo />;
      case 'mobile-screens':
        return <MobileScreensDemo />;
      case 'profile':
        return <ProfileScreen />;
      case 'stats':
        return <StatsScreen />;
      case 'catalog':
        return <CatalogScreen />;
      case 'checkout':
        return <CheckoutScreen />;
      case 'calendar':
        return <CalendarScreen />;
      case 'home':
      default:
        return (
          <>
            <main className="scroll-smooth">
              <Hero />
              <Features />
              <HowItWorks />
              <Testimonials />
              <PricingSection />
            </main>
            <Footer />
          </>
        );
    }
  };

  const getLoadingMessage = () => {
    switch (currentView) {
      case 'dashboard':
        return "Loading your dashboard...";
      case 'patterns':
        return "Loading mobile patterns...";
      case 'mobile-screens':
        return "Loading mobile screens...";
      case 'profile':
        return "Loading your profile...";
      case 'stats':
        return "Loading analytics...";
      case 'catalog':
        return "Loading vendor catalog...";
      case 'checkout':
        return "Loading checkout...";
      case 'calendar':
        return "Loading calendar...";
      default:
        return "Connecting businesses worldwide...";
    }
  };

  return (
    <>
      <InterstitialScreen 
        isLoading={isLoading} 
        progress={loadingProgress}
        message={getLoadingMessage()}
      />
      <div className="min-h-screen pb-20 md:pb-0 overscroll-contain">
        <AnnunciatorRow />
        <ScrollProgress />
        <Header />
        {renderView()}
        <FloatingActionButton />
        <BottomNavigation />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))'
            }
          }}
        />
      </div>
    </>
  );
}