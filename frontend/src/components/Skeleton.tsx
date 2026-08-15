import React from 'react';

export const Skeleton: React.FC<{ className?: string; width?: string; height?: string }> = ({ 
  className = '', 
  width,
  height 
}) => {
  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;
  
  return <div className={`skeleton ${className}`} style={style}></div>;
};

export const MetricPanelSkeleton: React.FC = () => {
  return (
    <article className="metric-panel">
      <Skeleton className="skeleton-icon" />
      <Skeleton className="skeleton-text skeleton-text-short" />
      <Skeleton className="skeleton-text skeleton-text-large" />
      <Skeleton className="skeleton-text skeleton-text-long" />
    </article>
  );
};

export const JobRowSkeleton: React.FC = () => {
  return (
    <article className="job-row">
      <div className="job-token skeleton"></div>
      <div className="job-main">
        <div>
          <Skeleton className="skeleton-text skeleton-text-short" />
          <Skeleton className="skeleton-text skeleton-text-long" />
        </div>
        <Skeleton className="skeleton-text skeleton-text-short" />
      </div>
      <div className="job-meta">
        <Skeleton className="skeleton-text skeleton-text-short" />
        <Skeleton className="skeleton-pill" />
      </div>
    </article>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="card">
      <Skeleton height="200px" className="skeleton-image" />
      <div style={{ marginTop: '1rem' }}>
        <Skeleton width="60%" height="24px" />
        <Skeleton width="100%" height="16px" style={{ marginTop: '0.5rem' }} />
        <Skeleton width="80%" height="16px" style={{ marginTop: '0.5rem' }} />
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <Skeleton width="80px" height="32px" className="skeleton-pill" />
        <Skeleton width="80px" height="32px" className="skeleton-pill" />
      </div>
    </div>
  );
};

export const ArtisanCardSkeleton: React.FC = () => {
  return (
    <div className="card artisan-card-skeleton">
      <div className="artisan-card-header">
        <Skeleton className="skeleton-avatar" width="64px" height="64px" />
        <div style={{ flex: 1 }}>
          <Skeleton width="70%" height="20px" />
          <Skeleton width="50%" height="16px" style={{ marginTop: '0.5rem' }} />
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Skeleton width="100%" height="16px" />
        <Skeleton width="90%" height="16px" style={{ marginTop: '0.5rem' }} />
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <Skeleton width="60px" height="24px" className="skeleton-pill" />
        <Skeleton width="60px" height="24px" className="skeleton-pill" />
        <Skeleton width="60px" height="24px" className="skeleton-pill" />
      </div>
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="table-skeleton">
      <div className="table-skeleton-header">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} height="20px" width={i === 0 ? '30%' : '20%'} />
        ))}
      </div>
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="table-skeleton-row">
          {[...Array(4)].map((_, colIndex) => (
            <Skeleton key={colIndex} height="16px" width={colIndex === 0 ? '30%' : '20%'} />
          ))}
        </div>
      ))}
    </div>
  );
};

export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="profile-skeleton">
      <div className="profile-header-skeleton">
        <Skeleton className="skeleton-avatar-large" width="120px" height="120px" />
        <div style={{ flex: 1 }}>
          <Skeleton width="40%" height="32px" />
          <Skeleton width="30%" height="20px" style={{ marginTop: '0.5rem' }} />
          <Skeleton width="50%" height="16px" style={{ marginTop: '0.5rem' }} />
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Skeleton width="100%" height="100px" />
      </div>
      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
};
