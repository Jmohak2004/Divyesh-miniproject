# Mobile Design Patterns - BizConnect

This document outlines all the mobile design patterns and composition rules implemented in the BizConnect application.

## Composition Patterns

### Wrapper (Layout Template)
The application uses a consistent wrapper that encloses all components:
- **Main Wrapper**: `<div className="min-h-screen pb-20 md:pb-0">` provides consistent layout
- **Container**: `container mx-auto px-4 sm:px-6 lg:px-8` for content spacing
- **Responsive Padding**: Bottom padding on mobile for fixed navigation

### Scroll Patterns

#### 1. Vertical Scrolling
- **Component**: `ScrollProgress.tsx`
- **Implementation**: Smooth vertical scrolling with progress indicator
- **Usage**: Shows user's scroll position with animated bar at top of viewport
- **Behavior**: Single-axis scrolling (vertical only) as per best practices

#### 2. Scroll to Top
- **Component**: `FloatingActionButton.tsx`
- **Implementation**: Fixed action button appears after 400px scroll
- **Usage**: Quick navigation back to top of page

### Annunciator Row

**Component**: `AnnunciatorRow.tsx`

Displays hardware/software status at the top of mobile pages:
- **Time**: Current time display
- **Connection Status**: WiFi/network connectivity indicator
- **Signal Strength**: Network signal visualization
- **Notifications**: Bell icon with unread count badge
- **Battery**: Battery status indicator
- **Visibility**: Mobile only (hidden on desktop with `md:hidden`)

### Notifications

**Component**: `NotificationCenter.tsx`

Interactive notification system:
- **Visual Feedback**: Badge with unread count
- **Sheet Interface**: Slide-in panel on mobile
- **Notification Types**: Success, Info, Warning, Update
- **Actions**: Mark as read, delete, mark all as read
- **Real-time Updates**: Animated badges and indicators

### Titles

**Component**: `MobileTitleBar.tsx`

Consistent title implementation:
- **Sticky Positioning**: Remains visible while scrolling
- **Back Navigation**: Optional back button
- **Subtitle Support**: Secondary information display
- **Actions Menu**: Dropdown for contextual actions
- **Truncation**: Text overflow handling

### Revealable Menu

**Component**: `MobileDrawer.tsx`

Bottom drawer menu system:
- **Gesture Support**: Swipe to open/close
- **Navigation Items**: Hierarchical menu structure
- **Quick Actions**: Frequently used features
- **User Profile**: Avatar and account info
- **Animated Entry**: Staggered item animations

### Fixed Menu

**Component**: `BottomNavigation.tsx`

Always-visible navigation docked to bottom:
- **5 Primary Actions**: Home, Search, Add, Notifications, Profile
- **Active State**: Visual indication of current section
- **Icons + Labels**: Combined for clarity
- **Smooth Transitions**: Animated tab switching
- **Safe Area**: Accounts for device notches/home indicators

### Home & Idle Screens

#### Interstitial Screen
**Component**: `InterstitialScreen.tsx`

Loading state during app startup:
- **Progress Bar**: Visual loading indicator
- **Animated Logo**: Brand animation
- **Loading Messages**: Context-aware status text
- **Smooth Transitions**: Fade in/out animations

#### Idle Screen
**Component**: `IdleScreen.tsx`

Security/power-saving state:
- **Clock Display**: Large time and date
- **Auto-activation**: After 30 seconds of inactivity (configurable)
- **Unlock Gesture**: Tap or swipe to continue
- **Events Reset**: Mouse, keyboard, touch, scroll reset timer

### Floating Action Button (FAB)

**Component**: `FloatingActionButton.tsx`

Mobile-first quick action button:
- **Expandable Menu**: Multiple action buttons
- **Primary Actions**: Scroll to top, call, email, contact
- **Positioning**: Fixed bottom-right
- **Animations**: Spring-based physics
- **Context-aware**: Shows/hides based on scroll position

## List Patterns

**Component**: `ListPatterns.tsx`

### 1. Vertical List
- Standard scrollable list
- Chevron indicators for navigation
- Hover states and animations

### 2. Infinite List
- Load more functionality
- Virtualization support
- Progressive loading indicator

### 3. Thumbnail List
- Image + text combination
- Truncated text handling
- Touch-optimized spacing

### 4. Grid Pattern
- Responsive columns (2, 3, or 4)
- Equal-height items
- Staggered animations

## Scroll Behavior

**Component**: `MobileScrollWrapper.tsx`

- **Smooth Scrolling**: CSS and JS smooth scroll
- **Progress Indicator**: Gradient color bar
- **Scroll to Top**: Context-aware button
- **Safe Area**: Bottom spacing for device UI

## Mobile-Specific Features

### Touch Interactions
- **Tap Targets**: Minimum 44x44px touch areas
- **Swipe Gestures**: Drawer and sheet components
- **Pull to Refresh**: (Ready for implementation)
- **Long Press**: Context menus

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Performance Optimizations
- **Lazy Loading**: Images and components
- **Animation Performance**: GPU-accelerated transforms
- **Debounced Scrolling**: Efficient scroll listeners
- **Conditional Rendering**: Mobile-specific components

## Accessibility

### ARIA Labels
- All interactive elements have labels
- Screen reader support

### Keyboard Navigation
- Tab order management
- Focus indicators

### Color Contrast
- WCAG AA compliant
- Dark mode support

## Implementation Guidelines

### Using Mobile Patterns

1. **Scroll Progress**
   ```tsx
   import { ScrollProgress } from "./components/ScrollProgress";
   <ScrollProgress />
   ```

2. **Annunciator Row**
   ```tsx
   import { AnnunciatorRow } from "./components/AnnunciatorRow";
   <AnnunciatorRow />
   ```

3. **Bottom Navigation**
   ```tsx
   import { BottomNavigation } from "./components/BottomNavigation";
   <BottomNavigation />
   ```

4. **Floating Action Button**
   ```tsx
   import { FloatingActionButton } from "./components/FloatingActionButton";
   <FloatingActionButton />
   ```

5. **Loading Screen**
   ```tsx
   import { InterstitialScreen } from "./components/InterstitialScreen";
   <InterstitialScreen 
     isLoading={loading} 
     progress={progress}
     message="Loading..."
   />
   ```

### Best Practices

1. **Always use single-axis scrolling** - Vertical only on main content
2. **Provide clear navigation** - Multiple ways to navigate (header, bottom nav, FAB)
3. **Show system status** - Connection, time, notifications
4. **Optimize for touch** - Appropriate spacing and target sizes
5. **Smooth animations** - 60fps transitions using Motion
6. **Handle idle states** - Power saving and security
7. **Progressive disclosure** - Don't overwhelm with options
8. **Consistent patterns** - Same interactions across app

## Mobile Composition Hierarchy

```
<App>
  <InterstitialScreen /> (Loading overlay)
  <IdleScreen /> (Security overlay)
  
  <div className="min-h-screen pb-20">
    <AnnunciatorRow /> (Status bar - mobile only)
    <ScrollProgress /> (Scroll indicator)
    <Header /> (Sticky navigation)
    
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <PricingSection />
    </main>
    
    <Footer />
    <FloatingActionButton /> (Fixed - mobile)
    <BottomNavigation /> (Fixed - mobile only)
  </div>
  
  <Toaster /> (Notifications overlay)
</App>
```

## Testing Mobile Patterns

### Responsive Testing
- Chrome DevTools device mode
- Real device testing (iOS/Android)
- Various screen sizes and orientations

### Performance Testing
- Lighthouse mobile score
- FPS monitoring during animations
- Network throttling tests

### Accessibility Testing
- Screen reader compatibility
- Keyboard-only navigation
- Color contrast validation

---

**Last Updated**: September 30, 2025
**Version**: 1.0.0