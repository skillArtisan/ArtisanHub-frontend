import React, { useState } from 'react';
import { Search, MapPin, Star, Zap, Filter, BadgeCheck, X } from 'lucide-react';
import { mockArtisanData } from '../../data/mockArtisanData';

interface ArtisanMarketplaceProps {
  onSelectArtisan?: (artisanId: string) => void;
  isModal?: boolean;
  onClose?: () => void;
}

type SortOption = 'rating' | 'jobs' | 'response';

interface Filters {
  searchQuery: string;
  categories: string[];
  location: string;
  minRating: number;
  verified: boolean;
  sortBy: SortOption;
}

const TRADE_CATEGORIES = [
  { id: 'Electrician', name: 'Electrician', icon: '⚡' },
  { id: 'Plumber', name: 'Plumber', icon: '🔧' },
  { id: 'Carpenter', name: 'Carpenter', icon: '🪛' },
  { id: 'Painter', name: 'Painter', icon: '🎨' },
  { id: 'Mechanic', name: 'Mechanic', icon: '🔩' },
  { id: 'Welder', name: 'Welder', icon: '🔥' },
  { id: 'Tailor', name: 'Tailor', icon: '✂️' },
  { id: 'Cleaner', name: 'Cleaner', icon: '🧹' },
];

const LOCATIONS = [
  'Lagos',
  'Abuja',
  'Kano',
  'Port Harcourt',
  'Ibadan',
  'Benin City',
  'Katsina',
  'Enugu',
];

export const ArtisanMarketplace: React.FC<ArtisanMarketplaceProps> = ({
  onSelectArtisan,
  isModal = false,
  onClose,
}) => {
  const [filters, setFilters] = useState<Filters>({
    searchQuery: '',
    categories: [],
    location: '',
    minRating: 0,
    verified: false,
    sortBy: 'rating',
  });

  const [showFilters, setShowFilters] = useState(!isModal);

  // Filter and sort artisans
  const filteredArtisans = React.useMemo(() => {
    let result = mockArtisanData;

    if (filters.searchQuery) {
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          a.specializations.some((s) =>
            s.toLowerCase().includes(filters.searchQuery.toLowerCase())
          )
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((a) =>
        filters.categories.some((cat) => a.specializations.includes(cat))
      );
    }

    if (filters.location) {
      result = result.filter((a) => a.location === filters.location);
    }

    if (filters.minRating > 0) {
      result = result.filter((a) => a.averageRating >= filters.minRating);
    }

    if (filters.verified) {
      result = result.filter((a) => a.isVerified);
    }

    switch (filters.sortBy) {
      case 'rating':
        result.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 'jobs':
        result.sort((a, b) => b.completedJobs - a.completedJobs);
        break;
      case 'response':
        result.sort((a, b) => {
          const aMin = parseInt(a.responseTime);
          const bMin = parseInt(b.responseTime);
          return aMin - bMin;
        });
        break;
    }

    return result;
  }, [filters]);

  const toggleCategory = (categoryId: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((c) => c !== categoryId)
        : [...prev.categories, categoryId],
    }));
  };

  const content = (
    <>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            {isModal ? 'Find an Artisan' : 'Discover Artisans'}
          </h1>
          {isModal && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or skill..."
              value={filters.searchQuery}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
              }
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-0 transition"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition flex items-center gap-2"
          >
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`p-4 lg:p-6 flex gap-6 ${isModal ? 'max-h-96 overflow-y-auto' : ''}`}>
        {/* Filters Sidebar - Show on desktop or when toggled */}
        {showFilters && (
          <div className="w-full lg:w-64 lg:min-w-64">
            <div className="bg-gray-50 rounded-lg p-4 space-y-6">
              {/* Location */}
              <div className="pb-4 border-b border-gray-200">
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, location: e.target.value }))
                  }
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-0 transition text-sm"
                >
                  <option value="">All Locations</option>
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div className="pb-4 border-b border-gray-200">
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Minimum Rating
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={filters.minRating}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        minRating: parseFloat(e.target.value),
                      }))
                    }
                    className="flex-1"
                  />
                  <span className="text-sm font-bold text-gray-900 min-w-fit">
                    {filters.minRating > 0 ? `${filters.minRating}+` : 'All'}
                  </span>
                </div>
              </div>

              {/* Verified */}
              <div className="pb-4 border-b border-gray-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, verified: e.target.checked }))
                    }
                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Verified Only
                  </span>
                </label>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as SortOption,
                    }))
                  }
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-0 transition text-sm"
                >
                  <option value="rating">Highest Rating</option>
                  <option value="jobs">Most Jobs</option>
                  <option value="response">Fastest Response</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex-1">
          {/* Categories */}
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">
              Browse by Trade
            </p>
            <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
              {TRADE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`p-2 rounded-lg border-2 transition text-center ${
                    filters.categories.includes(cat.id)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <p className="text-xs font-bold text-gray-900 truncate">{cat.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Artisan Grid */}
          <p className="text-sm text-gray-600 font-medium mb-4">
            {filteredArtisans.length} found
          </p>

          {filteredArtisans.length === 0 ? (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-600">No artisans match your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredArtisans.slice(0, isModal ? 6 : undefined).map((artisan) => (
                <div
                  key={artisan.id}
                  className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition overflow-hidden"
                >
                  <div className="p-4">
                    {/* Name & Verified */}
                    <div className="flex items-start gap-2 mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{artisan.name}</h3>
                        <p className="text-xs text-gray-600">
                          {artisan.specializations[0]}
                        </p>
                      </div>
                      {artisan.isVerified && (
                        <BadgeCheck className="text-green-600" size={16} />
                      )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                      <MapPin size={12} />
                      {artisan.location}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={
                              i < Math.round(artisan.averageRating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-900">
                        {artisan.averageRating}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="space-y-1 text-xs text-gray-600 mb-3">
                      <div className="flex justify-between">
                        <span>✓ {artisan.completedJobs} jobs</span>
                        <span className="flex items-center gap-1">
                          <Zap size={10} className="text-blue-600" />
                          {artisan.responseTime}
                        </span>
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => onSelectArtisan?.(artisan.id)}
                      className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-bold hover:from-blue-700 hover:to-blue-600 transition text-sm"
                    >
                      {isModal ? 'Select' : 'View Profile'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );

  if (isModal) {
    return (
      <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden max-w-4xl max-h-screen flex flex-col">
        {content}
      </div>
    );
  }

  return <div className="min-h-screen bg-gray-50">{content}</div>;
};

export default ArtisanMarketplace;
