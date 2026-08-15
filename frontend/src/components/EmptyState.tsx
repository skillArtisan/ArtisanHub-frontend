import React from 'react';
import { LucideIcon, Inbox, Search, FileX, Users, Briefcase, AlertCircle } from 'lucide-react';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'search' | 'error';
}

const defaultIcons = {
  default: Inbox,
  search: Search,
  error: AlertCircle
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  variant = 'default'
}) => {
  const Icon = icon || defaultIcons[variant];

  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <Icon size={48} />
      </div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__description">{description}</p>
      {action && (
        <button className="primary-action" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
};

export const EmptyJobs: React.FC<{ onCreate?: () => void }> = ({ onCreate }) => (
  <EmptyState
    icon={Briefcase}
    title="No jobs yet"
    description="Create your first job to get started with ArtisanHub"
    action={onCreate ? { label: 'Create Job', onClick: onCreate } : undefined}
  />
);

export const EmptyArtisans: React.FC = () => (
  <EmptyState
    icon={Users}
    title="No artisans found"
    description="Try adjusting your search filters or check back later"
    variant="search"
  />
);

export const EmptySearchResults: React.FC<{ onClear?: () => void }> = ({ onClear }) => (
  <EmptyState
    icon={Search}
    title="No results found"
    description="We couldn't find anything matching your search. Try different keywords."
    action={onClear ? { label: 'Clear Search', onClick: onClear } : undefined}
    variant="search"
  />
);

export const EmptyActivity: React.FC = () => (
  <EmptyState
    icon={Inbox}
    title="No recent activity"
    description="Your activity feed will appear here once you start creating jobs"
  />
);

export const EmptyBookings: React.FC = () => (
  <EmptyState
    icon={FileX}
    title="No bookings yet"
    description="Your booking history will appear here once you book an artisan"
  />
);
