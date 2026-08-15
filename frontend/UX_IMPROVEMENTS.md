# UX Improvements Documentation

This document outlines all the user experience enhancements implemented in ArtisanHub frontend.

## Table of Contents

1. [Loading Skeletons](#loading-skeletons)
2. [Error Messages](#error-messages)
3. [Toast Notifications](#toast-notifications)
4. [Empty State Components](#empty-state-components)
5. [404 Not Found Page](#404-not-found-page)
6. [Offline Detection](#offline-detection)
7. [Dark Mode](#dark-mode)
8. [Responsive Improvements](#responsive-improvements)

---

## Loading Skeletons

### Overview
Loading skeletons provide visual placeholders while content is being fetched, improving perceived performance.

### Components
Located in `src/components/Skeleton.tsx`:

- **Skeleton**: Base skeleton component with customizable width/height
- **MetricPanelSkeleton**: For dashboard metric cards
- **JobRowSkeleton**: For job list items
- **CardSkeleton**: Generic card skeleton
- **ArtisanCardSkeleton**: For artisan profile cards
- **TableSkeleton**: For data tables
- **ProfileSkeleton**: For full profile pages

### Usage Example

```tsx
import { CardSkeleton, TableSkeleton } from './components/Skeleton';

function MyComponent({ loading, data }) {
  if (loading) {
    return <CardSkeleton />;
  }
  return <div>{/* Render data */}</div>;
}
```

### Best Practices
- Show skeletons immediately while data loads
- Match skeleton structure to actual content layout
- Use appropriate skeleton variant for content type
- Animate skeletons with shimmer effect (already implemented)

---

## Error Messages

### Overview
Structured error messages with different severity levels for better user communication.

### Component
Located in `src/components/ErrorMessage.tsx`

### Features
- Three severity levels: `error`, `warning`, `info`
- Optional title and details list
- Retry and dismiss actions
- Inline error variant for forms

### Usage Example

```tsx
import { ErrorMessage } from './components/ErrorMessage';

<ErrorMessage
  severity="error"
  title="Connection Failed"
  message="Unable to reach the server. Please try again."
  details={[
    'Check your internet connection',
    'Verify server status'
  ]}
  onRetry={handleRetry}
  onDismiss={handleDismiss}
/>
```

### Severity Levels

- **error**: Critical issues requiring immediate attention (red)
- **warning**: Important notices that need user awareness (yellow)
- **info**: Helpful information or tips (blue)

---

## Toast Notifications

### Overview
Non-intrusive notification system for displaying temporary messages.

### Component
Located in `src/components/ToastContext.tsx`

### Features
- Four types: `success`, `error`, `warning`, `info`
- Customizable duration
- Optional title
- Optional retry action
- Six positioning options
- Auto-dismiss with countdown
- Accessible (ARIA live regions)

### Usage Example

```tsx
import { useToast } from './components/ToastContext';

function MyComponent() {
  const { addToast } = useToast();

  const handleAction = async () => {
    try {
      await performAction();
      addToast({
        type: 'success',
        title: 'Success!',
        message: 'Action completed successfully',
        duration: 3000
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error',
        message: error.message,
        onRetry: handleAction
      });
    }
  };
}
```

### Positioning Options
- `top-right` (default)
- `top-left`
- `top-center`
- `bottom-right`
- `bottom-left`
- `bottom-center`

---

## Empty State Components

### Overview
Friendly empty state components for various scenarios when no data is available.

### Components
Located in `src/components/EmptyState.tsx`:

- **EmptyState**: Generic empty state with customizable icon, title, description
- **EmptyJobs**: For job listings
- **EmptyArtisans**: For artisan search results
- **EmptySearchResults**: For search with no results
- **EmptyActivity**: For activity feeds
- **EmptyBookings**: For booking history

### Usage Example

```tsx
import { EmptyJobs, EmptyState } from './components/EmptyState';

function JobsList({ jobs, onCreateJob }) {
  if (jobs.length === 0) {
    return <EmptyJobs onCreate={onCreateJob} />;
  }
  return <div>{/* Render jobs */}</div>;
}
```

### Custom Empty States

```tsx
import { Users } from 'lucide-react';

<EmptyState
  icon={Users}
  title="No team members"
  description="Invite your first team member to get started"
  action={{
    label: 'Invite Member',
    onClick: handleInvite
  }}
  variant="default"
/>
```

---

## 404 Not Found Page

### Overview
User-friendly 404 error page with helpful navigation and suggestions.

### Component
Located in `src/pages/NotFound.tsx`

### Features
- Large, clear 404 display
- Helpful error message
- Navigation buttons (Home, Go Back)
- Troubleshooting suggestions
- Responsive design

### Usage
Automatically displayed when user navigates to non-existent route:

```tsx
// In App.tsx
<Route path="*" element={<NotFound />} />
```

---

## Offline Detection

### Overview
Detect and notify users when they lose internet connectivity.

### Components
- **Hook**: `src/hooks/useOfflineDetection.ts`
- **Banner**: `src/components/OfflineBanner.tsx`

### Features
- Real-time connectivity monitoring
- Automatic reconnection detection
- Non-intrusive banner notification
- Auto-hide when reconnected

### Usage Example

```tsx
import { useOfflineDetection } from './hooks/useOfflineDetection';
import { OfflineBanner } from './components/OfflineBanner';

function App() {
  const { isOnline, wasOffline } = useOfflineDetection();

  return (
    <>
      <OfflineBanner isOnline={isOnline} wasOffline={wasOffline} />
      {/* Rest of app */}
    </>
  );
}
```

### Handling Offline State

```tsx
function MyComponent() {
  const { isOnline } = useOfflineDetection();

  const handleSubmit = () => {
    if (!isOnline) {
      addToast({
        type: 'warning',
        message: 'You are offline. Changes will sync when reconnected.'
      });
      return;
    }
    // Proceed with submission
  };
}
```

---

## Dark Mode

### Overview
Complete dark mode implementation with system preference detection.

### Components
- **Hook**: `src/hooks/useDarkMode.ts`
- **Toggle**: `src/components/ThemeToggle.tsx`

### Features
- Three modes: `light`, `dark`, `system`
- Respects system preferences
- Persistent user choice (localStorage)
- Smooth transitions
- Comprehensive color palette

### Usage Example

```tsx
import { useDarkMode } from './hooks/useDarkMode';
import { ThemeToggle } from './components/ThemeToggle';

function Header() {
  const { theme, isDark, toggleTheme, setThemeMode } = useDarkMode();

  return (
    <header>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      {/* Or set specific theme */}
      <button onClick={() => setThemeMode('dark')}>
        Force Dark Mode
      </button>
    </header>
  );
}
```

### Theme Cycle
- Light → Dark → System → Light (continues)

### Color Variables
The theme system updates CSS custom properties:

```css
/* Light mode (default) */
--paper: #F8FAFC;
--ink: #0F172A;
--muted: #64748B;

/* Dark mode */
--paper: #0F172A;
--ink: #F8FAFC;
--muted: #94A3B8;
```

---

## Responsive Improvements

### Overview
Comprehensive responsive design ensuring great experience across all devices.

### Breakpoints

```css
/* Mobile */
@media (max-width: 420px) { /* Small phones */ }
@media (max-width: 640px) { /* Phones */ }

/* Tablet */
@media (max-width: 767px) { /* Small tablets */ }
@media (max-width: 1023px) { /* Tablets */ }

/* Desktop */
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large desktop */ }
```

### Touch Optimization

```css
/* Touch-friendly targets (48px minimum) */
@media (hover: none) and (pointer: coarse) {
  .primary-action,
  .ghost-action,
  .rail-button {
    min-height: 48px;
    min-width: 48px;
  }
}
```

### Accessibility Features

1. **Reduced Motion Support**
```css
@media (prefers-reduced-motion: reduce) {
  /* Disable animations */
  .skeleton,
  .spinner,
  .toast {
    animation: none !important;
  }
}
```

2. **High Contrast Mode**
```css
@media (prefers-contrast: high) {
  /* Increase border widths */
  .error-message,
  .toast {
    border-width: 3px;
  }
}
```

3. **Focus Indicators**
All interactive elements have visible focus states for keyboard navigation.

4. **ARIA Labels**
All components use proper ARIA attributes for screen readers.

### Mobile Optimizations

- Stacked layouts on small screens
- Full-width buttons
- Larger touch targets
- Simplified navigation
- Optimized typography
- Reduced spacing where appropriate

### Desktop Optimizations

- Multi-column layouts
- Hover effects
- Sidebar navigation
- More compact spacing
- Advanced filtering options

---

## Testing the Improvements

### Development Showcase
A comprehensive showcase page is available for testing all UX improvements:

```tsx
// Import in your routes
import { UXShowcase } from './pages/UXShowcase';

// Add route
<Route path="/ux-showcase" element={<UXShowcase />} />
```

Visit `/ux-showcase` to see all components in action.

### Manual Testing Checklist

- [ ] Loading skeletons appear during data fetch
- [ ] Error messages display correctly for all severity levels
- [ ] Toast notifications appear and auto-dismiss
- [ ] Empty states show when no data available
- [ ] 404 page displays for invalid routes
- [ ] Offline banner appears when disconnected
- [ ] Dark mode toggles smoothly
- [ ] All components responsive on mobile
- [ ] Touch targets are 48px minimum
- [ ] Keyboard navigation works
- [ ] Screen reader announces changes
- [ ] Reduced motion respected
- [ ] High contrast mode works

### Browser Testing

Test in:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

### Accessibility Testing

1. Test with keyboard only (Tab, Enter, Escape)
2. Test with screen reader (NVDA, JAWS, VoiceOver)
3. Verify color contrast ratios (WCAG AA minimum)
4. Check focus indicators visibility
5. Verify ARIA labels are descriptive

---

## Performance Considerations

### Loading Skeletons
- Lightweight CSS animations
- No JavaScript required
- Minimal DOM elements

### Toast Notifications
- Automatic cleanup after dismiss
- Limited to reasonable number (prevent memory leaks)
- Efficient re-renders with React.memo

### Dark Mode
- Single class toggle on root element
- CSS custom properties for instant switching
- localStorage for persistence

### Offline Detection
- Native browser events (no polling)
- Minimal event listeners
- Cleanup on unmount

---

## Future Enhancements

Potential improvements for consideration:

1. **Toast Queue Management**: Limit concurrent toasts
2. **Skeleton Customization**: Theme-specific skeletons
3. **Error Boundary Integration**: Better error handling
4. **Analytics Integration**: Track UX metrics
5. **Progressive Web App**: Offline functionality
6. **Animation Preferences**: User-controlled animations
7. **Accessibility Audit**: Regular WCAG compliance checks

---

## Resources

- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inclusive Components](https://inclusive-components.design/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [React Accessibility](https://react.dev/learn/accessibility)

---

## Support

For questions or issues related to these UX improvements, please contact the development team or create an issue in the project repository.
