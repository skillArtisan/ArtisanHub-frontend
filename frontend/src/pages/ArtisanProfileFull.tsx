import React, { useState } from 'react';
import {
  Star,
  MapPin,
  Clock,
  CheckCircle,
  BadgeCheck,
  Phone,
  Mail,
  Share2,
  Heart,
  MessageCircle,
  Award,
  TrendingUp,
  DollarSign,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { mockArtisanData } from '../data/mockArtisanData';

interface ArtisanProfileFullProps {
  artisanId?: string;
}

export const ArtisanProfileFull: React.FC<ArtisanProfileFullProps> = ({
  artisanId = '1',
}) => {
  const artisan = mockArtisanData.find((a) => a.id === artisanId) || mockArtisanData[0];
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'portfolio' | 'availability'>(
    'about'
  );
  const [isSaved, setIsSaved] = useState(false);

  // Calculate reputation metrics
  const successRate = artisan.totalJobs > 0
    ? Math.round((artisan.completedJobs / artisan.totalJobs) * 100)
    : 0;

  const ratingBreakdown = [
    { stars: 5, percentage: 65 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 10 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ];

  const reviews = [
    {
      id: 1,
      author: 'John Doe',
      rating: 5,
      date: '2 weeks ago',
      text: 'Excellent work! Very professional and attentive to detail. Highly recommended!',
      helpful: 23,
    },
    {
      id: 2,
      author: 'Sarah Johnson',
      rating: 5,
      date: '1 month ago',
      text: 'Fast response time and quality workmanship. Will definitely hire again.',
      helpful: 18,
    },
    {
      id: 3,
      author: 'Mike Chen',
      rating: 4,
      date: '6 weeks ago',
      text: 'Good work, arrived on time. Minor issue but resolved quickly.',
      helpful: 12,
    },
  ];

  const portfolio = [
    { id: 1, title: 'Kitchen Renovation', category: 'Plumbing' },
    { id: 2, title: 'Bathroom Installation', category: 'Plumbing' },
    { id: 3, title: 'Pipe Repair', category: 'Plumbing' },
    { id: 4, title: 'Water System Setup', category: 'Plumbing' },
    { id: 5, title: 'Maintenance Work', category: 'Plumbing' },
    { id: 6, title: 'Emergency Fix', category: 'Plumbing' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-2">
            ← Back to Marketplace
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2.5 rounded-lg border-2 transition ${
                isSaved
                  ? 'bg-red-50 border-red-300 text-red-600'
                  : 'border-gray-300 text-gray-600 hover:border-blue-300'
              }`}
            >
              <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
            <button className="p-2.5 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-blue-300 transition">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-32" />

          <div className="px-8 pb-8">
            {/* Profile Header */}
            <div className="flex gap-8 -mt-16 mb-8">
              {/* Avatar */}
              <div
                className="w-40 h-40 rounded-2xl flex items-center justify-center text-6xl font-bold text-white border-4 border-white shadow-lg flex-shrink-0"
                style={{ background: artisan.avatarColor }}
              >
                {artisan.avatarInitials}
              </div>

              {/* Main Info */}
              <div className="flex-1 pt-8">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-gray-900">{artisan.name}</h1>
                  {artisan.isVerified && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-green-100 border border-green-300 rounded-full">
                      <BadgeCheck className="text-green-600" size={18} />
                      <span className="text-sm font-bold text-green-700">Verified</span>
                    </div>
                  )}
                </div>

                <p className="text-xl text-gray-600 mb-4">
                  {artisan.specializations.join(' • ')}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-5 gap-4">
                  <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-200">
                    <p className="text-2xl font-bold text-blue-600">
                      {artisan.averageRating.toFixed(1)}
                    </p>
                    <div className="flex justify-center gap-0.5 mt-1">
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
                    <p className="text-xs text-gray-600 mt-1">Rating</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
                    <p className="text-2xl font-bold text-green-600">{successRate}%</p>
                    <p className="text-xs text-gray-600 mt-2">Success Rate</p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-200">
                    <p className="text-2xl font-bold text-purple-600">
                      {artisan.completedJobs}
                    </p>
                    <p className="text-xs text-gray-600 mt-2">Jobs Done</p>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-3 text-center border border-orange-200">
                    <p className="text-2xl font-bold text-orange-600">
                      ~{artisan.responseTime}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Response</p>
                  </div>

                  <div className="bg-indigo-50 rounded-lg p-3 text-center border border-indigo-200">
                    <p className="text-2xl font-bold text-indigo-600">
                      ₦{Math.round(Math.random() * 50000 + 10000)}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Starting Price</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-4 gap-4 py-6 border-y border-gray-200">
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-600" size={20} />
                <div>
                  <p className="text-xs text-gray-600">Location</p>
                  <p className="font-bold text-gray-900">{artisan.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Award className="text-blue-600" size={20} />
                <div>
                  <p className="text-xs text-gray-600">Experience</p>
                  <p className="font-bold text-gray-900">{artisan.yearsExperience}+ Years</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <TrendingUp className="text-blue-600" size={20} />
                <div>
                  <p className="text-xs text-gray-600">Total Reviews</p>
                  <p className="font-bold text-gray-900">{artisan.totalReviews}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="text-blue-600" size={20} />
                <div>
                  <p className="text-xs text-gray-600">Availability</p>
                  <p className="font-bold text-gray-900">Available</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mt-6">
              <button className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-bold hover:from-blue-700 hover:to-blue-600 transition shadow-lg hover:shadow-xl text-lg">
                Hire Artisan
              </button>
              <button className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition">
                Message
              </button>
              <button className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition">
                Call
              </button>
            </div>
          </div>
        </div>

        {/* Reputation System Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Rating Breakdown */}
          <div className="col-span-1 bg-white rounded-xl border-2 border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="text-yellow-400 fill-yellow-400" size={20} />
              Rating Breakdown
            </h3>

            <div className="space-y-3">
              {ratingBreakdown.map((item) => (
                <div key={item.stars}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < item.stars
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-yellow-300 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reputation Score */}
          <div className="col-span-1 bg-white rounded-xl border-2 border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="text-blue-600" size={20} />
              Reputation Score
            </h3>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <p className="text-xs text-blue-600 font-bold mb-1">Overall Score</p>
                <p className="text-4xl font-bold text-blue-600">
                  {Math.round(artisan.averageRating * 20)}
                </p>
                <p className="text-xs text-blue-700 mt-2">Top {Math.floor(Math.random() * 10) + 1}% of artisans</p>
              </div>

              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <p className="text-xs font-bold text-green-700 flex items-center gap-2">
                  <CheckCircle size={14} />
                  Consistently Excellent
                </p>
              </div>
            </div>
          </div>

          {/* Response Metrics */}
          <div className="col-span-1 bg-white rounded-xl border-2 border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="text-orange-600" size={20} />
              Response Metrics
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">Avg Response</p>
                  <p className="text-sm font-bold text-orange-600">{artisan.responseTime}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">Reliability</p>
                  <p className="text-sm font-bold text-green-600">{successRate}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${successRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 flex overflow-x-auto">
            {[
              { id: 'about' as const, label: 'About', icon: '👤' },
              { id: 'reviews' as const, label: 'Reviews', icon: '⭐' },
              { id: 'portfolio' as const, label: 'Portfolio', icon: '🖼️' },
              { id: 'availability' as const, label: 'Availability', icon: '📅' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 font-bold border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600 bg-blue-50'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Bio</h3>
                  <p className="text-gray-600 leading-relaxed">
                    I'm an experienced {artisan.specializations[0]} with {artisan.yearsExperience}+ years
                    of expertise in delivering high-quality work. I pride myself on professional service,
                    attention to detail, and customer satisfaction. My work is guided by quality standards
                    and a commitment to excellence in every project.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {artisan.specializations.map((spec) => (
                      <span
                        key={spec}
                        className="px-4 py-2 bg-blue-100 border border-blue-300 rounded-full text-sm font-bold text-blue-700"
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
                    <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Sat: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="pb-6 border-b border-gray-200 last:border-0"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-gray-900">{review.author}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < review.rating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">{review.date}</span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition">
                        <MessageCircle size={18} />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-3">{review.text}</p>
                    <button className="text-sm text-blue-600 font-bold hover:text-blue-700">
                      👍 Helpful ({review.helpful})
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div className="grid grid-cols-3 gap-6">
                {portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="group cursor-pointer overflow-hidden rounded-lg"
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-100 rounded-lg flex items-center justify-center text-5xl font-bold text-blue-600 group-hover:shadow-lg transition">
                      📷
                    </div>
                    <div className="mt-3">
                      <p className="font-bold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Availability Tab */}
            {activeTab === 'availability' && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                  <p className="text-green-700 font-bold flex items-center gap-2">
                    <CheckCircle size={20} />
                    Currently Available for New Projects
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Weekly Schedule</h3>
                  <div className="space-y-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
                      (day) => (
                        <div key={day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <span className="font-medium text-gray-900">{day}</span>
                          <span className="text-sm text-gray-600">9:00 AM - 6:00 PM</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Typical Response Time</h3>
                  <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
                    <p className="text-blue-700 font-bold">~{artisan.responseTime}</p>
                    <p className="text-sm text-blue-600 mt-1">Usually responds within {artisan.responseTime}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
              <p className="text-blue-100">
                {artisan.name} is ready to help with your project. Hire now and get started!
              </p>
            </div>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition text-lg shadow-lg">
              Hire {artisan.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfileFull;
