import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Star,
  Clock,
  Heart,
  ChevronDown,
  X,
  Filter
} from 'lucide-react';
import { Artisan, mockArtisans, TradeSpecialization } from '../../data/mockArtisanData';
import { FormSelect } from '../FormSelect';

const TRADE_TYPES: TradeSpecialization[] = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "Welding",
  "Tiling",
  "Masonry",
  "HVAC",
  "General"
];

const SORT_OPTIONS = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'jobs', label: 'Most Experienced' },
  { value: 'recent', label: 'Recently Joined' },
  { value: 'distance', label: 'Nearest' }
];

interface SearchFilters {
  query: string;
  tradeType: string;
  minRating: number;
  verified: boolean;
  sortBy: string;
}

interface ArtisanSearchProps {
  onSelectArtisan: (artisan: Artisan) => void;
  onToggleFavorite?: (artisanId: string) => void;
  favorites?: string[];
}

export const ArtisanSearch: React.FC<ArtisanSearchProps> = ({
  onSelectArtisan,
  onToggleFavorite,
  favorites = []
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    tradeType: '',
    minRating: 0,
    verified: false,
    sortBy: 'rating'
  });

  const [showFilters, setShowFilters] = useState(false);

  const filteredArtisans = useMemo(() => {
    let results = mockArtisans;

    // Filter by search query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      results = results.filter(a =>
        a.name.toLowerCase().includes(query) ||
        a.location.toLowerCase().includes(query) ||
        a.bio.toLowerCase().includes(query)
      );
    }

    // Filter by trade type
    if (filters.tradeType) {
      results = results.filter(a =>
        a.specializations.includes(filters.tradeType as TradeSpecialization)
      );
    }

    // Filter by minimum rating
    if (filters.minRating > 0) {
      results = results.filter(a => a.averageRating >= filters.minRating);
    }

    // Filter by verified status
    if (filters.verified) {
      results = results.filter(a => a.isVerified);
    }

    // Sort results
    switch (filters.sortBy) {
      case 'rating':
        results.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 'jobs':
        results.sort((a, b) => b.completedJobs - a.completedJobs);
        break;
      case 'recent':
        results.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime());
        break;
      case 'distance':
        // Mock distance sorting - in real app would use geolocation
        results.sort((a, b) => a.location.localeCompare(b.location));
        break;
    }

    return results;
  }, [filters]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      query: '',
      tradeType: '',
      minRating: 0,
      verified: false,
      sortBy: 'rating'
    });
  };

  const hasActiveFilters = filters.query || filters.tradeType || filters.minRating > 0 || filters.verified;

  return (
    <div className="artisan-search-container">
      {/* Search Header */}
      <div className="search-header">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search artisans by name or specialty..."
            value={filters.query}
            onChange={(e) => handleFilterChange('query', e.target.value)}
            className="search-input"
            aria-label="Search artisans"
          />
          {filters.query && (
            <button
              onClick={() => handleFilterChange('query', '')}
              className="ghost-action clear-button"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`secondary-action filter-toggle ${showFilters ? 'active' : ''}`}
          aria-label="Toggle filters"
          aria-expanded={showFilters}
        >
          <Filter size={16} />
          Filters
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filters-grid">
            <FormSelect
              label="Trade Type"
              value={filters.tradeType}
              onChange={(e) => handleFilterChange('tradeType', e.target.value)}
              options={[
                { value: '', label: 'All Trades' },
                ...TRADE_TYPES.map(t => ({ value: t, label: t }))
              ]}
            />

            <FormSelect
              label="Sort By"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              options={SORT_OPTIONS}
            />

            <div className="filter-group">
              <label>Minimum Rating</label>
              <div className="rating-filter">
                {[0, 1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => handleFilterChange('minRating', rating === filters.minRating ? 0 : rating)}
                    className={`rating-option ${rating === filters.minRating ? 'active' : ''}`}
                    aria-pressed={rating === filters.minRating}
                  >
                    {rating === 0 ? 'Any' : `${rating}+ ★`}
                  </button>
                ))}
              </div>
            </div>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.verified}
                onChange={(e) => handleFilterChange('verified', e.target.checked)}
              />
              <span>Verified Only</span>
            </label>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="ghost-action clear-filters-btn"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="search-results-info">
        <p>
          Found <strong>{filteredArtisans.length}</strong> artisan{filteredArtisans.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Results List */}
      <div className="artisan-results-list">
        {filteredArtisans.length === 0 ? (
          <div className="empty-state">
            <Search size={40} />
            <h3>No artisans found</h3>
            <p>Try adjusting your filters or search query</p>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="secondary-action"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          filteredArtisans.map((artisan) => (
            <div
              key={artisan.id}
              className="search-result-card"
            >
              <div className="result-card-left">
                <div
                  className="result-avatar"
                  style={{ background: artisan.avatarColor }}
                >
                  {artisan.profilePictureUrl ? (
                    <img src={artisan.profilePictureUrl} alt={artisan.name} />
                  ) : (
                    artisan.avatarInitials
                  )}
                </div>
              </div>

              <div className="result-card-content">
                <div className="result-name-row">
                  <h3>{artisan.name}</h3>
                  {artisan.isVerified && (
                    <span className="verified-badge-small">✓ Verified</span>
                  )}
                </div>

                <div className="result-location">
                  <MapPin size={14} />
                  <span>{artisan.location}</span>
                </div>

                <div className="result-specialties">
                  {artisan.specializations.slice(0, 3).map((spec) => (
                    <span key={spec} className="trade-tag trade-tag-sm">
                      {spec}
                    </span>
                  ))}
                  {artisan.specializations.length > 3 && (
                    <span className="trade-tag trade-tag-sm">
                      +{artisan.specializations.length - 3}
                    </span>
                  )}
                </div>

                <div className="result-stats">
                  <div className="stat">
                    <Star size={14} fill="currentColor" />
                    <span>{artisan.averageRating.toFixed(1)}</span>
                  </div>
                  <div className="stat">
                    <Clock size={14} />
                    <span>{artisan.completedJobs} jobs</span>
                  </div>
                </div>
              </div>

              <div className="result-card-right">
                <button
                  onClick={() => onToggleFavorite?.(artisan.id)}
                  className={`icon-button favorite-button ${favorites.includes(artisan.id) ? 'active' : ''}`}
                  aria-label={favorites.includes(artisan.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart size={18} fill={favorites.includes(artisan.id) ? 'currentColor' : 'none'} />
                </button>

                <button
                  onClick={() => onSelectArtisan(artisan)}
                  className="primary-action-small"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArtisanSearch;
