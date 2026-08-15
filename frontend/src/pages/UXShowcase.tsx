import React, { useState } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { EmptyState, EmptyJobs, EmptyArtisans, EmptySearchResults } from '../components/EmptyState';
import { useToast } from '../components/ToastContext';
import { 
  Skeleton, 
  CardSkeleton, 
  ArtisanCardSkeleton, 
  TableSkeleton,
  ProfileSkeleton 
} from '../components/Skeleton';
import { useDarkMode } from '../hooks/useDarkMode';
import { ThemeToggle } from '../components/ThemeToggle';
import { Users } from 'lucide-react';

/**
 * UX Showcase Page
 * 
 * This page demonstrates all the UX improvements:
 * - Loading skeletons
 * - Error messages (with different severity levels)
 * - Toast notifications (success, error, warning, info)
 * - Empty state components
 * - Dark mode toggle
 * - Responsive components
 * 
 * This is for demonstration purposes and can be removed in production.
 */
export const UXShowcase: React.FC = () => {
  const { addToast } = useToast();
  const { theme, toggleTheme } = useDarkMode();
  const [showSkeletons, setShowSkeletons] = useState(false);

  const handleShowToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
      success: { title: 'Success!', message: 'Your action was completed successfully.' },
      error: { title: 'Error', message: 'Something went wrong. Please try again.' },
      warning: { title: 'Warning', message: 'This action requires your attention.' },
      info: { title: 'Info', message: 'Here is some useful information for you.' }
    };

    addToast({
      type,
      ...messages[type],
      duration: 5000
    });
  };

  return (
    <div className="ux-showcase">
      <div className="showcase-header">
        <div>
          <h1>UX Components Showcase</h1>
          <p>Demonstrating all the enhanced UX features</p>
        </div>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      <div className="showcase-content">
        {/* Toast Notifications */}
        <section className="showcase-section">
          <h2>Toast Notifications</h2>
          <p className="showcase-description">
            Click buttons below to see different types of toast notifications
          </p>
          <div className="showcase-actions">
            <button className="primary-action" onClick={() => handleShowToast('success')}>
              Show Success Toast
            </button>
            <button className="ghost-action" onClick={() => handleShowToast('error')}>
              Show Error Toast
            </button>
            <button className="ghost-action" onClick={() => handleShowToast('warning')}>
              Show Warning Toast
            </button>
            <button className="ghost-action" onClick={() => handleShowToast('info')}>
              Show Info Toast
            </button>
          </div>
        </section>

        {/* Error Messages */}
        <section className="showcase-section">
          <h2>Error Messages</h2>
          <p className="showcase-description">
            Different severity levels for error messaging
          </p>
          <div className="showcase-grid">
            <ErrorMessage
              severity="error"
              title="Connection Error"
              message="Unable to connect to the server. Please check your internet connection."
              onRetry={() => console.log('Retry clicked')}
            />
            <ErrorMessage
              severity="warning"
              title="Payment Pending"
              message="Your payment is still processing. This may take a few minutes."
              details={[
                'Transaction ID: #12345',
                'Expected completion: 2-5 minutes'
              ]}
            />
            <ErrorMessage
              severity="info"
              message="This feature requires authentication. Please log in to continue."
            />
          </div>
        </section>

        {/* Empty States */}
        <section className="showcase-section">
          <h2>Empty States</h2>
          <p className="showcase-description">
            Friendly empty state components for various scenarios
          </p>
          <div className="showcase-grid">
            <div className="card">
              <EmptyJobs onCreate={() => console.log('Create job')} />
            </div>
            <div className="card">
              <EmptyArtisans />
            </div>
            <div className="card">
              <EmptySearchResults onClear={() => console.log('Clear search')} />
            </div>
            <div className="card">
              <EmptyState
                icon={Users}
                title="Custom Empty State"
                description="You can create custom empty states with any icon and message"
                action={{
                  label: 'Get Started',
                  onClick: () => console.log('Action clicked')
                }}
              />
            </div>
          </div>
        </section>

        {/* Loading Skeletons */}
        <section className="showcase-section">
          <h2>Loading Skeletons</h2>
          <p className="showcase-description">
            Skeleton loaders for better perceived performance
          </p>
          <button 
            className="ghost-action" 
            onClick={() => setShowSkeletons(!showSkeletons)}
          >
            {showSkeletons ? 'Hide' : 'Show'} Skeletons
          </button>
          
          {showSkeletons && (
            <div className="showcase-grid">
              <CardSkeleton />
              <ArtisanCardSkeleton />
              <div className="card">
                <TableSkeleton rows={3} />
              </div>
              <div className="card">
                <Skeleton width="100%" height="200px" />
                <Skeleton width="80%" height="20px" style={{ marginTop: '1rem' }} />
                <Skeleton width="60%" height="20px" style={{ marginTop: '0.5rem' }} />
              </div>
            </div>
          )}
        </section>

        {/* Dark Mode */}
        <section className="showcase-section">
          <h2>Dark Mode</h2>
          <p className="showcase-description">
            Theme toggle supports light, dark, and system preferences
          </p>
          <div className="theme-demo">
            <p>Current theme: <strong>{theme}</strong></p>
            <p>Toggle the theme using the button in the header</p>
          </div>
        </section>

        {/* Responsive Design */}
        <section className="showcase-section">
          <h2>Responsive Design</h2>
          <p className="showcase-description">
            All components are optimized for mobile, tablet, and desktop
          </p>
          <div className="responsive-demo">
            <ul>
              <li>✓ Touch-friendly buttons (48px minimum)</li>
              <li>✓ Flexible layouts that adapt to screen size</li>
              <li>✓ Optimized typography for readability</li>
              <li>✓ Reduced motion support for accessibility</li>
              <li>✓ High contrast mode support</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};
