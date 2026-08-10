import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, Zap, Filter, ChevronDown, BadgeCheck } from 'lucide-react';
import { mockArtisanData } from '../data/mockArtisanData';

type SortOption = 'rating' | 'jobs' | 'response';

interface Filters {
  searchQuery: string;
  categories: string[];
  location: string;
  minRating: number;
  priceRange: [number, number];
  verified: boolean;
  sortBy: SortOption;
}

const TRADE_CATEGORIES = [
  { id: 'plumber', name: 'Plumber', icon: '🔧' },
  { id: 'electrician', name: 'Electrician', icon: '⚡' },
  { id: 'carpenter', name: 'Carpenter', icon: '🪛' },
  { id: 'painter', name: 'Painter', icon: '🎨' },
  { id: 'mechanic', name: 'Mechanic', icon: '🔩' },
  { id: 'welder', name: 'Welder', icon: '🔥' },
  { id: 'tailor', name: 'Tailor', icon: '✂️' },
  { id: 'cleaner', name: 'Cleaner', icon: '🧹' },
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

export const Artisans: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    searchQuery: '',
    categories: [],
    location: '',
    minRating: 0,
    priceRange: [0, 200000],
    verified: false,
    sortBy: 'rating',
  });

  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter and sort artisans
  const filteredArtisans = useMemo(() => {
    let result = mockArtisanData;

    // Search query
    if (filters.searchQuery) {
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          a.specializations.some((s) =>
            s.toLowerCase().includes(filters.searchQuery.toLowerCase())
          )
      );
    }

    // Categories
    if (filters.categories.length > 0) {
      result = result.filter((a) =>
        filters.categories.some((cat) =>
          a.specializations.some((s) => s.toLowerCase().includes(cat.toLowerCase()))
        )
      );
    }

    // Location
    if (filters.location) {
      result = result.filter((a) => a.location === filters.location);
    }

    // Rating
    if (filters.minRating > 0) {
      result = result.filter((a) => a.averageRating >= filters.minRating);
    }

    // Verified
    if (filters.verified) {
      result = result.filter((a) => a.isVerified);
    }

    // Sort
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

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      categories: [],
      location: '',
      minRating: 0,
      priceRange: [0, 200000],
      verified: false,
      sortBy: 'rating',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover Artisans</h1>
          
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
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition flex items-center gap-2"
            >
              <Filter size={18} />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className={`${filtersOpen ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
            <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm p-6 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-xs text-blue-600 font-bold hover:text-blue-700"
                >
                  Clear
                </button>
              </div>

              {/* Location */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, location: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-0 transition text-sm"
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
              <div className="mb-6 pb-6 border-b border-gray-200">
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
                    className="w-full"
                  />
                  <span className="text-sm font-bold text-gray-900 min-w-max">
                    {filters.minRating > 0 ? `${filters.minRating}+` : 'All'}
                  </span>
                </div>
              </div>

              {/* Verified */}
              <div className="mb-6 pb-6 border-b border-gray-200">
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
                    Verified Artisans Only
                  </span>
                </label>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
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
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-0 transition text-sm"
                >
                  <option value="rating">Highest Rating</option>
                  <option value="jobs">Most Jobs Completed</option>
                  <option value="response">Fastest Response</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Categories Quick Filter */}
            <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm p-6 mb-6">
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-4">
                Browse by Trade
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TRADE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`p-4 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
                      filters.categories.includes(cat.id)
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <span className="text-3xl">{cat.icon}</span>
                    <span className="text-xs font-bold text-gray-900 text-center">
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div>
              <p className="text-sm text-gray-600 font-medium mb-4">
                {filteredArtisans.length} artisan{filteredArtisans.length !== 1 ? 's' : ''} found
              </p>

              {filteredArtisans.length === 0 ? (
                <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm p-12 text-center">
                  <p className="text-gray-600 mb-2">No artisans found matching your criteria</p>
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 font-bold hover:text-blue-700"
                  >
                    Clear filters and try again
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredArtisans.map((artisan) => (
                    <div
                      key={artisan.id}
                      className="bg-white rounded-xl border-2 border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition overflow-hidden group"
                    >
                      {/* Header */}
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-900">{artisan.name}</h3>
                              {artisan.isVerified && (
                                <BadgeCheck className="text-green-600" size={16} />
                              )}
                            </div>
                            <p className="text-xs text-gray-600">
                              {artisan.specializations.join(', ')}
                            </p>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
                          <MapPin size={14} />
                          {artisan.location}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < Math.round(artisan.averageRating)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }
                              />
                            ))}
                          </div>
                          <span className="text-sm font-bold text-gray-900">
                            {artisan.averageRating.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="p-4 space-y-2 mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Jobs Completed</span>
                          <span className="font-bold text-gray-900">
                            ✓ {artisan.completedJobs}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 flex items-center gap-1">
                            <Zap size={14} className="text-blue-600" />
                            Response Time
                          </span>
                          <span className="font-bold text-gray-900">
                            ~{artisan.responseTime}
                          </span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="px-4 pb-4 border-t border-gray-200">
                        <button className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-bold hover:from-blue-700 hover:to-blue-600 transition text-sm">
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artisans;
