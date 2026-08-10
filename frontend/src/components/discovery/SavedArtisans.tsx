import React from 'react';
import { Heart, Clock, MapPin, Star, Eye, Trash2 } from 'lucide-react';
import { Artisan, mockArtisans } from '../../data/mockArtisanData';

interface SavedArtisansProps {
  favoriteIds: string[];
  recentlyViewedIds: string[];
  onSelectArtisan: (artisan: Artisan) => void;
  onRemoveFavorite: (artisanId: string) => void;
  onRemoveRecent: (artisanId: string) => void;
  tab: 'favorites' | 'recent';
  onTabChange: (tab: 'favorites' | 'recent') => void;
}

export const SavedArtisans: React.FC<SavedArtisansProps> = ({
  favoriteIds,
  recentlyViewedIds,
  onSelectArtisan,
  onRemoveFavorite,
  onRemoveRecent,
  tab,
  onTabChange
}) => {
  const favorites = mockArtisans.filter(a => favoriteIds.includes(a.id));
  const recentlyViewed = mockArtisans.filter(a => recentlyViewedIds.includes(a.id));

  const displayArtisans = tab === 'favorites' ? favorites : recentlyViewed;

  const handleRemove = (artisanId: string) => {
    if (tab === 'favorites') {
      onRemoveFavorite(artisanId);
    } else {
      onRemoveRecent(artisanId);
    }
  };

  return (
    <div className="saved-artisans-container">
      {/* Tab Navigation */}
      <div className="saved-artisans-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === 'favorites'}
          onClick={() => onTabChange('favorites')}
          className={`saved-tab ${tab === 'favorites' ? 'active' : ''}`}
        >
          <Heart size={16} fill={tab === 'favorites' ? 'currentColor' : 'none'} />
          Saved Artisans
          <span className="tab-badge">{favorites.length}</span>
        </button>
        <button
          role="tab"
          aria-selected={tab === 'recent'}
          onClick={() => onTabChange('recent')}
          className={`saved-tab ${tab === 'recent' ? 'active' : ''}`}
        >
          <Clock size={16} />
          Recently Viewed
          <span className="tab-badge">{recentlyViewed.length}</span>
        </button>
      </div>

      {/* Content */}
      <div className="saved-artisans-content">
        {displayArtisans.length === 0 ? (
          <div className="empty-state">
            {tab === 'favorites' ? (
              <>
                <Heart size={40} />
                <h3>No Saved Artisans</h3>
                <p>Start saving your favorite artisans to find them quickly later</p>
              </>
            ) : (
              <>
                <Eye size={40} />
                <h3>No Recently Viewed</h3>
                <p>Artisan profiles you visit will appear here</p>
              </>
            )}
          </div>
        ) : (
          <div className="saved-artisans-grid">
            {displayArtisans.map((artisan) => (
              <div key={artisan.id} className="saved-artisan-card">
                <div className="card-header">
                  <div
                    className="card-avatar"
                    style={{ background: artisan.avatarColor }}
                  >
                    {artisan.profilePictureUrl ? (
                      <img src={artisan.profilePictureUrl} alt={artisan.name} />
                    ) : (
                      artisan.avatarInitials
                    )}
                  </div>
                  <button
                    onClick={() => handleRemove(artisan.id)}
                    className="icon-button remove-button"
                    aria-label={`Remove ${artisan.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="card-content">
                  <h4>{artisan.name}</h4>
                  {artisan.isVerified && (
                    <span className="verified-badge-micro">✓ Verified</span>
                  )}

                  <div className="card-location">
                    <MapPin size={13} />
                    <span>{artisan.location}</span>
                  </div>

                  <div className="card-specialties">
                    {artisan.specializations.slice(0, 2).map((spec) => (
                      <span key={spec} className="trade-tag trade-tag-xs">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="card-stats">
                    <div className="stat">
                      <Star size={13} fill="currentColor" />
                      <span>{artisan.averageRating.toFixed(1)}</span>
                    </div>
                    <div className="stat">
                      <span>{artisan.completedJobs} completed</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectArtisan(artisan)}
                    className="card-view-button"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedArtisans;
