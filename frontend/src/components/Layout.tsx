import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useBreakpoint } from '../hooks/useBreakpoint';

type UserRole = 'Customer' | 'Artisan' | 'Mediator';

interface LayoutProps {
  children: React.ReactNode;
  userRole?: UserRole;
  userName?: string;
  activeNavItem?: string;
  onNavigate?: (item: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  userRole = 'Customer',
  userName = 'John Doe',
  activeNavItem = 'dashboard',
  onNavigate
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet';

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isMobile && (
        <Header
          onMenuClick={handleMenuClick}
          userRole={userRole}
          userName={userName}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Always visible on desktop */}
        {!isMobile && (
          <Sidebar
            isOpen={true}
            onClose={handleCloseSidebar}
            userRole={userRole}
            activeItem={activeNavItem}
            onNavigate={(item) => {
              onNavigate?.(item);
            }}
          />
        )}

        {/* Sidebar - Mobile */}
        {isMobile && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={handleCloseSidebar}
            userRole={userRole}
            activeItem={activeNavItem}
            onNavigate={(item) => {
              onNavigate?.(item);
              setSidebarOpen(false);
            }}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {!isMobile && (
            <Header
              userRole={userRole}
              userName={userName}
            />
          )}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};