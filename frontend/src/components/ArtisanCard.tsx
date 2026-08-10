import React from 'react';
import { BadgeCheck, MapPin, Briefcase, Star } from 'lucide-react';
import { Artisan } from '../data/mockArtisanData';
import { StarRating } from './StarRating';

interface ArtisanCardProps {
  artisan: Artisan;
  onViewProfile: (artisanId: string) => void;
  onHire: (artisanId: string) => void;
}

/**
 * Compact artisan profile card for use in job listings and browse views.
 */
export const ArtisanCard: React.FC<ArtisanCardProps> = ({ artisan, onViewProfile, onHire }) => {
  const successRate = artisan.totalJobs > 0
    ? Math.round((artisan.completedJobs / artisan.totalJobs) * 100)
    : 0;

  return (
    <article className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-300 transition group" aria-label={`Artisan: ${artisan.name}`}>
      {/* Avatar */}
      <div
        className="h-32 flex items-center justify-center text-4xl font-bold text-white group-hover:scale-105 transition"
        style={{ background: artisan.avatarColor }}
        aria-hidden="true"
      >
        {artisan.avatarInitials}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name and Badge */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-bold text-gray-900 text-sm">{artisan.name}</h3>
            {artisan.isVerified && (
              <div className="flex items-center gap-1 mt-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded w-fit">
                <BadgeCheck size={12} />
                Verified
              </div>
            )}
          </div>
        </div>

        {/* Location */}
        <p className="text-xs text-gray-600 flex items-center gap-1 mb-3">
          <MapPin size={12} />
          {artisan.location}
        </p>

        {/* Specializations */}
        <div className="flex flex-wrap gap-1 mb-3">
          {artisan.specializations.slice(0, 2).map((spec) => (
            <span key={spec} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {spec}
            </span>
          ))}
          {artisan.specializations.length > 2 && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              +{artisan.specializations.length - 2}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs mb-4 pb-4 border-t border-gray-200">
          <div className="flex items-center gap-1">
            <div className="flex">
              <StarRating rating={artisan.averageRating} size={12} />
            </div>
            <span className="font-bold text-gray-900">{artisan.averageRating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Briefcase size={12} />
            {artisan.completedJobs}
          </div>
          <div className="text-right">
            <p className="font-bold text-blue-600">{successRate}%</p>
            <p className="text-gray-600">success</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            className="flex-1 px-3 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition text-sm"
            onClick={() => onViewProfile(artisan.id)}
            aria-label={`View ${artisan.name}'s profile`}
          >
            Profile
          </button>
          <button
            className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-bold hover:from-blue-700 hover:to-blue-600 transition text-sm"
            onClick={() => onHire(artisan.id)}
            aria-label={`Hire ${artisan.name}`}
          >
            Hire
          </button>
        </div>
      </div>
    </article>
  );
};

export default ArtisanCard;
