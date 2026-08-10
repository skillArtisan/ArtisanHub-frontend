import React, { useState } from 'react';
import { Star, MapPin, Clock, CheckCircle, BadgeCheck, Phone, Mail, Calendar, Award, Users } from 'lucide-react';
import { mockArtisanData } from '../data/mockArtisanData';

interface ArtisanProfileProps {
  artisanId?: string;
}

export const ArtisanProfile: React.FC<ArtisanProfileProps> = ({ artisanId = '1' }) => {
  const artisan = mockArtisanData.find((a) => a.id === artisanId) || mockArtisanData[0];
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'portfolio'>('about');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <button className="text-blue-600 font-bold hover:text-blue-700 mb-4">
            ← Back
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg p-8 mb-6">
          <div className="flex gap-8 mb-6">
            {/* Avatar */}
            <div
              className="w-32 h-32 rounded-xl flex items-center justify-center text-5xl font-bold text-white flex-shrink-0"
              style={{ background: artisan.avatarColor }}
            >
              {artisan.avatarInitials}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{artisan.name}</h1>
                {artisan.isVerified && (
                  <BadgeCheck className="text-green-600" size={28} />
                )}
              </div>

              <p className="text-lg text-gray-600 mb-4">
                {artisan.specializations.join(' • ')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {artisan.averageRating.toFixed(1)}
                  </p>
                  <div className="flex gap-1 mt-1">
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
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {artisan.completedJobs}
                  </p>
                  <p className="text-sm text-gray-600">Jobs Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {artisan.totalReviews}
                  </p>
                  <p className="text-sm text-gray-600">Reviews</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    ~{artisan.responseTime}
                  </p>
                  <p className="text-sm text-gray-600">Response Time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <MapPin className="text-blue-600" size={20} />
              <div>
                <p className="text-xs text-gray-600">Location</p>
                <p className="font-bold text-gray-900">{artisan.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-blue-600" size={20} />
              <div>
                <p className="text-xs text-gray-600">Response Time</p>
                <p className="font-bold text-gray-900">{artisan.responseTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="text-blue-600" size={20} />
              <div>
                <p className="text-xs text-gray-600">Experience</p>
                <p className="font-bold text-gray-900">{artisan.yearsExperience}+ years</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            <button className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-bold hover:from-blue-700 hover:to-blue-600 transition shadow-md">
              Book Now
            </button>
            <button className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition">
              Save Artisan
            </button>
            <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition">
              Share
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 flex">
            {[
              { id: 'about' as const, label: 'About' },
              { id: 'reviews' as const, label: 'Reviews' },
              { id: 'portfolio' as const, label: 'Portfolio' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 font-bold border-b-2 transition ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600 bg-blue-50'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-600">
                    {artisan.bio ||
                      `I'm an experienced ${artisan.specializations[0]} with ${artisan.yearsExperience}+ years of expertise. 
                    I pride myself on delivering high-quality work with exceptional customer service. 
                    My expertise includes all aspects of ${artisan.specializations[0].toLowerCase()} and related services.`}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {artisan.specializations.map((spec) => (
                      <span
                        key={spec}
                        className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm font-medium text-blue-700"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Service Areas</h3>
                    <p className="text-gray-600">{artisan.location} and surrounding areas</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="pb-4 border-b border-gray-200 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-900">Customer {i}</p>
                        <div className="flex gap-1 mt-1">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              size={14}
                              className="text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-600">
                        {i} week{i > 1 ? 's' : ''} ago
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Excellent work! Very professional and attentive to detail. Highly recommended!
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center text-4xl font-bold text-blue-600 hover:shadow-lg transition cursor-pointer"
                  >
                    {i}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfile;
