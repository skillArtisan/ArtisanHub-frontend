import React from 'react';
import {
  BriefcaseBusiness,
  UsersRound,
  CircleDollarSign,
  Gavel,
  Home,
  Settings,
  HelpCircle,
  LogOut,
  X
} from 'lucide-react';
import { useBreakpoint } from '../hooks/useBreakpoint';

type UserRole = 'Customer' | 'Artisan' | 'Mediator';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  userRole?: UserRole;
  activeItem?: string;
  onNavigate?: (item: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    roles: ['Customer', 'Artisan', 'Mediator']
  },
  {
    id: 'jobs',
    label: 'Jobs',
    icon: BriefcaseBusiness,
    roles: ['Customer', 'Artisan', 'Mediator']
  },
  {
    id: 'artisans',
    label: 'Artisans',
    icon: UsersRound,
    roles: ['Customer', 'Mediator']
  },
  {
    id: 'settlements',
    label: 'Settlements',
    icon: CircleDollarSign,
    roles: ['Customer', 'Artisan', 'Mediator']
  },
  {
    id: 'disputes',
    label: 'Disputes',
    icon: Gavel,
    roles: ['Customer', 'Artisan', 'Mediator']
  }
];

const bottomItems: NavItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    roles: ['Customer', 'Artisan', 'Mediator']
  },
  {
    id: 'help',
    label: 'Help',
    icon: HelpCircle,
    roles: ['Customer', 'Artisan', 'Mediator']
  }
];

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  onClose,
  userRole = 'Customer',
  activeItem = 'dashboard',
  onNavigate
}) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';

  const filteredNavItems = navigationItems.filter(item =>
    item.roles.includes(userRole)
  );

  const filteredBottomItems = bottomItems.filter(item =>
    item.roles.includes(userRole)
  );

  const handleItemClick = (itemId: string) => {
    onNavigate?.(itemId);
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <>
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black/50 z-30" onClick={onClose} />
      )}
      <aside className={`${
        isMobile 
          ? `fixed left-0 top-0 h-full w-64 z-40 transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}` 
          : 'w-64'
      } bg-white border-r border-gray-200 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                AH
              </div>
              {!isMobile && (
                <div>
                  <h2 className="font-bold text-gray-900 text-sm">ArtisanHub</h2>
                  <p className="text-xs text-gray-600">{userRole} Portal</p>
                </div>
              )}
            </div>
            {isMobile && (
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600"
                onClick={onClose}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1" aria-label="Main navigation">
          {/* Main Items */}
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handleItemClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={18} />
                {!isMobile && <span className="text-sm">{item.label}</span>}
              </button>
            );
          })}

          {/* Divider */}
          <div className="my-2 h-px bg-gray-200" />

          {/* Bottom Items */}
          {filteredBottomItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
                onClick={() => handleItemClick(item.id)}
              >
                <Icon size={18} />
                {!isMobile && <span className="text-sm">{item.label}</span>}
              </button>
            );
          })}

          {/* Logout */}
          <button
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-red-600 hover:bg-red-50 transition"
            onClick={() => handleItemClick('logout')}
          >
            <LogOut size={18} />
            {!isMobile && <span className="text-sm">Logout</span>}
          </button>
        </nav>

        {/* Footer - Desktop only */}
        {!isMobile && (
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              <span className="text-xs font-bold text-blue-900">{userRole}</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};