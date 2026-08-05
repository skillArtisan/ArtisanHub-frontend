import React, { useState, useEffect } from 'react';
import { Search, MapPin, Bell, User, ShoppingCart, ChevronDown, ChevronRight, ChevronLeft, Star, Heart, Zap, Droplets, Hammer, Wrench } from 'lucide-react';

export const Home: React.FC = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);

  // Banner carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { name: 'Electricians', icon: Zap, color: 'from-yellow-400 to-yellow-600' },
    { name: 'Plumbers', icon: Droplets, color: 'from-cyan-400 to-cyan-600' },
    { name: 'Carpenters', icon: Hammer, color: 'from-orange-400 to-orange-600' },
    { name: 'Mechanics', icon: Wrench, color: 'from-slate-400 to-slate-600' },
  ];

  const featuredArtisans = [
    { id: 1, name: 'John Smith', service: 'Professional Electrician', price: '$50/hr', rating: 4.9, reviews: 287, image: '🔧' },
    { id: 2, name: 'Maria Garcia', service: 'Expert Plumber', price: '$45/hr', rating: 4.8, reviews: 156, image: '🔧' },
    { id: 3, name: 'David Wilson', service: 'Master Carpenter', price: '$60/hr', rating: 4.9, reviews: 342, image: '🔧' },
    { id: 4, name: 'Sarah Chen', service: 'Certified Mechanic', price: '$55/hr', rating: 4.7, reviews: 198, image: '🔧' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* TOP HEADER */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-gray-700">
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-600">Hi! Sign in or register</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-600">Daily Deals</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-600">Help & Contact</a>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-600">Ship to</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-600">Sell</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-600">Watchlist</a>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded flex items-center justify-center text-white font-bold text-lg">
                AH
              </div>
              <span className="font-bold text-2xl text-gray-900 hidden sm:inline">ArtisanHub</span>
            </div>

            {/* Main Search */}
            <div className="flex-1 flex gap-2 items-center max-w-2xl">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search services or artisans"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-600 focus:ring-0"
                />
              </div>
              <select className="px-3 py-2.5 border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-600 text-sm font-medium">
                <option>All</option>
                <option>Electrician</option>
                <option>Plumber</option>
                <option>Carpenter</option>
              </select>
              <button className="px-8 py-2.5 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition whitespace-nowrap">
                Search
              </button>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4 ml-4">
              <button className="text-gray-600 hover:text-blue-600 relative hidden sm:block">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="text-gray-600 hover:text-blue-600 hidden sm:block">
                <User size={20} />
              </button>
              <button className="text-gray-600 hover:text-blue-600 hidden sm:block">
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>

          {/* Category Bar */}
          <div className="flex gap-6 overflow-x-auto pb-2 text-sm font-medium text-gray-700 border-t border-gray-200 pt-2">
            <button className="hover:text-blue-600 flex items-center gap-1 whitespace-nowrap">
              Categories <ChevronDown size={16} />
            </button>
            <a href="#" className="hover:text-blue-600 whitespace-nowrap">Become an Artisan</a>
            <a href="#" className="hover:text-blue-600 whitespace-nowrap">Daily Deals</a>
            <a href="#" className="hover:text-blue-600 whitespace-nowrap">Reviews</a>
            <a href="#" className="hover:text-blue-600 whitespace-nowrap">Help & Contact</a>
          </div>
        </div>
      </header>

      {/* PROMOTIONAL BANNER */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg overflow-hidden h-48 md:h-64 group">
          {/* Banners */}
          <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-2">Find Trusted Artisans</h2>
              <p className="text-lg md:text-xl mb-6 text-blue-100">Get up to 50% off your first service</p>
              <button className="px-6 py-2.5 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition">
                Shop now
              </button>
            </div>
          </div>

          {/* Navigation arrows */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition opacity-0 group-hover:opacity-100">
            <ChevronLeft size={20} className="text-gray-900" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition opacity-0 group-hover:opacity-100">
            <ChevronRight size={20} className="text-gray-900" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition ${
                  i === currentBannerIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORY GRID */}
      <div className="max-w-7xl mx-auto px-4 py-8 border-b border-gray-200">
        <h3 className="text-lg font-bold mb-4">Shop by Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-lg transition text-center group"
              >
                <div className={`bg-gradient-to-br ${cat.color} w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center text-white text-xl group-hover:scale-110 transition`}>
                  <Icon size={24} />
                </div>
                <p className="font-medium text-sm">{cat.name}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* FEATURED ARTISANS */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-lg font-bold mb-4">Featured Professionals</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {featuredArtisans.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition group"
            >
              {/* Image placeholder */}
              <div className="h-40 bg-gradient-to-br from-blue-200 to-blue-100 flex items-center justify-center text-4xl relative overflow-hidden">
                {artisan.image}
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                  ✓ Verified
                </span>
                <button className="absolute top-2 left-2 bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition">
                  <Heart size={16} className="text-gray-600" />
                </button>
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="text-sm text-gray-600">{artisan.service}</p>
                <h4 className="font-bold text-gray-900 text-sm mb-2">{artisan.name}</h4>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold text-gray-900">{artisan.rating}</span>
                  <span className="text-xs text-gray-600">({artisan.reviews})</span>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="font-bold text-blue-600">{artisan.price}</span>
                  <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded font-bold hover:bg-blue-700 transition">
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY CHOOSE SECTION */}
      <div className="bg-gray-50 border-y border-gray-200 py-8 my-8">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-lg font-bold mb-6">Why Choose ArtisanHub?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Verified Professionals', desc: 'All vetted and trusted' },
              { title: 'Secure Payments', desc: 'Protected transactions' },
              { title: 'Fast Booking', desc: 'Book in minutes' },
              { title: '24/7 Support', desc: 'Always here to help' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap size={20} className="text-blue-600" />
                </div>
                <p className="font-bold text-sm">{item.title}</p>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-8 my-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">50K+</div>
              <p className="text-blue-100">Verified Artisans</p>
            </div>
            <div>
              <div className="text-3xl font-bold">500K+</div>
              <p className="text-blue-100">Jobs Completed</p>
            </div>
            <div>
              <div className="text-3xl font-bold">250K+</div>
              <p className="text-blue-100">Happy Customers</p>
            </div>
            <div>
              <div className="text-3xl font-bold">150+</div>
              <p className="text-blue-100">Cities Served</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-3">For Customers</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Find Artisans</a></li>
                <li><a href="#" className="hover:text-white">How it Works</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">For Artisans</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Join Us</a></li>
                <li><a href="#" className="hover:text-white">How to Earn</a></li>
                <li><a href="#" className="hover:text-white">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Help</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Newsletter</h4>
              <p className="text-xs mb-3">Subscribe for updates</p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded bg-gray-800 text-white text-sm placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 ArtisanHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
