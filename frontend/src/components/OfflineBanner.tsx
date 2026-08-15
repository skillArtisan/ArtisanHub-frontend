import React from 'react';
import { WifiOff, Wifi } from 'lucide-react';

interface OfflineBannerProps {
  isOnline: boolean;
  wasOffline: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOnline, wasOffline }) => {
  if (isOnline && !wasOffline) {
    return null;
  }

  return (
    <div className={`offline-banner ${isOnline ? 'offline-banner--reconnected' : 'offline-banner--offline'}`}>
      <div className="offline-banner__content">
        {isOnline ? (
          <>
            <Wifi size={20} />
            <span>You're back online!</span>
          </>
        ) : (
          <>
            <WifiOff size={20} />
            <span>No internet connection. Some features may be unavailable.</span>
          </>
        )}
      </div>
    </div>
  );
};
