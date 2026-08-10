import React from 'react';
import { Menu, User, Bell, Search } from 'lucide-react';
import { useBreakpoint } from '../hooks/useBreakpoint';

interface HeaderProps {
  onMenuClick?: () => void;
  userRole?: 'Customer' | 'Artisan' | 'Mediator';
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  userRole = 'Customer',
  userName = 'John Doe'
}) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="max-w-full px-4 py-3 flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {isMobile && (
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600"
              onClick={onMenuClick}
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              AH
            </div>
            {!isMobile && (
              <div>
                <h1 className="font-bold text-gray-900 text-sm">ArtisanHub</h1>
                <p className="text-xs text-gray-600">Trusted Escrow Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Search - Desktop only */}
        {!isMobile && (
          <div className="flex-1 max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search jobs, artisans..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 bg-gray-50 text-sm"
            />
          </div>
        )}

        {/* Right */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition text-gray-600" aria-label="Notifications">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full" />
          </button>

          <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">{userName}</p>
              <p className="text-xs text-gray-600">{userRole}</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-400 rounded-full flex items-center justify-center text-white">
              <User size={16} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};