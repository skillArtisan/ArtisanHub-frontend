import React, { useState, useEffect } from 'react';
import { Search, Bell, User, ShoppingCart, ChevronDown, ChevronRight, ChevronLeft, Star, Heart, MapPin, Clock, Shield, Home as HomeIcon, Send, LogOut, Settings, Zap, Droplets, Hammer, Wrench, Flame, Scissors, Paintbrush, Wind } from 'lucide-react';

export const Home: React.FC = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const bannerMessages = [
    { title: 'Save up to 70% OFF', subtitle: 'on all professional services', icon: '⚡' },
    { title: 'Summer Clearance', subtitle: 'Limited time offers on all categories', icon: '☀️' },
    { title: 'Free First Service', subtitle: 'for new customers', icon: '🎁' },
  ];

  const deals = [
    { title: '₦52,500 OFF', subtitle: 'on orders ₦250,000+', code: 'AHUB52', minOrder: '250K' },
    { title: '₦37,500 OFF', subtitle: 'on orders ₦180,000+', code: 'AHUB37', minOrder: '180K' },
    { title: '₦25,000 OFF', subtitle: 'on orders ₦120,000+', code: 'AHUB25', minOrder: '120K' },
  ];

  const topDeals = [
    { name: 'Electrical Work', emoji: '⚡', price: 'From ₦50/hr', deals: 1250 },
    { name: 'Plumbing Service', emoji: '🔧', price: 'From ₦45/hr', deals: 890 },
    { name: 'Carpentry', emoji: '🪛', price: 'From ₦60/hr', deals: 756 },
    { name: 'Mechanics', emoji: '🔩', price: 'From ₦55/hr', deals: 542 },
  ];

  const categories = [
    { icon: Zap, name: 'Electricians', count: 2847 },
    { icon: Droplets, name: 'Plumbers', count: 1924 },
    { icon: Hammer, name: 'Carpenters', count: 1653 },
    { icon: Wrench, name: 'Mechanics', count: 1456 },
    { icon: Flame, name: 'Welders', count: 892 },
    { icon: Scissors, name: 'Tailors', count: 1234 },
    { icon: Paintbrush, name: 'Painters', count: 1567 },
    { icon: Wind, name: 'Cleaners', count: 2103 },
  ];

  const featuredArtisans = [
    { id: 1, name: 'John Smith', service: 'Professional Electrician', price: 'From ₦50/hr', rating: 4.9, reviews: 287, location: 'Lagos', sold: 1250 },
    { id: 2, name: 'Maria Garcia', service: 'Expert Plumber', price: 'From ₦45/hr', rating: 4.8, reviews: 156, location: 'Abuja', sold: 890 },
    { id: 3, name: 'David Wilson', service: 'Master Carpenter', price: 'From ₦60/hr', rating: 4.9, reviews: 342, location: 'Lagos', sold: 756 },
    { id: 4, name: 'Sarah Chen', service: 'Certified Mechanic', price: 'From ₦55/hr', rating: 4.7, reviews: 198, location: 'Kano', sold: 542 },
    { id: 5, name: 'James Brown', service: 'Professional Painter', price: 'From ₦40/hr', rating: 4.8, reviews: 203, location: 'Lagos', sold: 678 },
    { id: 6, name: 'Grace Okafor', service: 'Expert Welder', price: 'From ₦65/hr', rating: 4.9, reviews: 156, location: 'Port Harcourt', sold: 423 },
    { id: 7, name: 'Michael Lee', service: 'Skilled Electrician', price: 'From ₦52/hr', rating: 4.7, reviews: 198, location: 'Lagos', sold: 934 },
    { id: 8, name: 'Jessica Kim', service: 'Professional Plumber', price: 'From ₦48/hr', rating: 4.8, reviews: 241, location: 'Abuja', sold: 812 },
    { id: 9, name: 'Thomas Anderson', service: 'General Handyman', price: 'From ₦35/hr', rating: 4.6, reviews: 167, location: 'Lagos', sold: 567 },
    { id: 10, name: 'Lisa Wong', service: 'Interior Designer', price: 'From ₦80/hr', rating: 4.9, reviews: 203, location: 'Lagos', sold: 645 },
    { id: 11, name: 'Robert Davis', service: 'Solar Installer', price: 'From ₦100/hr', rating: 4.8, reviews: 189, location: 'Abuja', sold: 456 },
    { id: 12, name: 'Nina Patel', service: 'AC Technician', price: 'From ₦55/hr', rating: 4.7, reviews: 214, location: 'Lagos', sold: 789 },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-gray-700">
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-600 font-medium">Hi! Sign in</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-600">Daily Deals</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-600">Help & Contact</a>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-600">Become an Artisan</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-600">Sell</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-600">My Orders</a>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Logo and Search */}
          <div className="flex items-center justify-between gap-4 mb-3">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded flex items-center justify-center text-white font-bold text-lg">
                AH
              </div>
              <span className="font-bold text-xl text-blue-600 hidden sm:inline">ArtisanHub</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="flex gap-1 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search for services, artisans..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-0 bg-gray-50"
                  />
                </div>
                <button className="px-6 py-2.5 bg-blue-600 text-white font-bold hover:bg-blue-700 transition rounded-sm">
                  Search
                </button>
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4 ml-4">
              <button className="text-gray-600 hover:text-blue-600 relative hidden sm:block">
                <Bell size={20} />
              </button>
              <div className="relative hidden sm:block">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="text-gray-600 hover:text-blue-600">
                  <User size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Category Bar */}
          <div className="flex gap-6 text-sm font-medium text-gray-700 border-t border-gray-200 pt-2 overflow-x-auto">
            <button className="hover:text-blue-600 whitespace-nowrap flex items-center gap-1">
              Categories <ChevronDown size={14} />
            </button>
            <a href="#" className="hover:text-blue-600 whitespace-nowrap">Become an Artisan</a>
            <a href="#" className="hover:text-blue-600 whitespace-nowrap">Daily Deals</a>
            <a href="#" className="hover:text-blue-600 whitespace-nowrap">Best Sellers</a>
            <a href="#" className="hover:text-blue-600 whitespace-nowrap">Help & Contact</a>
          </div>
        </div>
      </header>

      {/* MAIN BANNER WITH DEALS */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main carousel banner */}
          <div className="lg:col-span-3 relative bg-gradient-to-r from-blue-600 to-blue-400 rounded-sm overflow-hidden h-72 group shadow-md">
            <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
              <div>
                <p className="text-sm font-bold text-blue-100 mb-2">Sale Ends: Aug 8, 07:59</p>
                <h2 className="text-5xl font-bold mb-4 leading-tight">{bannerMessages[currentBannerIndex].title}</h2>
                <p className="text-xl text-blue-100 mb-6">{bannerMessages[currentBannerIndex].subtitle}</p>
                <button className="px-8 py-3 bg-white text-blue-600 rounded-sm font-bold hover:bg-gray-100 transition inline-block">
                  Shop now
                </button>
              </div>
            </div>

            {/* Navigation */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-sm hover:bg-white/50 transition opacity-0 group-hover:opacity-100">
              <ChevronLeft size={24} className="text-white" />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-sm hover:bg-white/50 transition opacity-0 group-hover:opacity-100">
              <ChevronRight size={24} className="text-white" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setCurrentBannerIndex(i)}
                  className={`transition-all ${i === currentBannerIndex ? 'bg-white w-8 h-2 rounded-full' : 'bg-white/50 w-2 h-2 rounded-full'}`}
                />
              ))}
            </div>
          </div>

          {/* Side deals */}
          <div className="space-y-4">
            {deals.map((deal, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 rounded-sm p-4 hover:shadow-lg transition cursor-pointer group">
                <p className="text-red-600 font-bold text-lg mb-1">{deal.title}</p>
                <p className="text-gray-700 text-xs mb-2">{deal.subtitle}</p>
                <div className="bg-white rounded-sm px-2 py-1 inline-block border border-blue-200 group-hover:border-blue-400 transition">
                  <span className="font-bold text-blue-600 text-xs">Code: {deal.code}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TOP DEALS SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-6 bg-white">
        <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-blue-600">
          <h3 className="text-lg font-bold text-gray-900">🔥 Today's Best Deals</h3>
          <a href="#" className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1">
            More <ChevronRight size={16} />
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topDeals.map((deal) => (
            <div key={deal.name} className="bg-white border border-gray-200 rounded-sm p-3 hover:shadow-lg transition group cursor-pointer">
              <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-sm flex items-center justify-center text-5xl mb-3 group-hover:scale-105 transition">
                {deal.emoji}
              </div>
              <p className="font-bold text-gray-900 text-sm mb-1">{deal.name}</p>
              <div className="flex items-center gap-1 mb-2">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold">4.8</span>
                <span className="text-xs text-gray-600">({deal.deals})</span>
              </div>
              <p className="text-blue-600 font-bold text-sm">{deal.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY GRID */}
      <div className="max-w-7xl mx-auto px-4 py-6 bg-white border-t border-gray-200">
        <h3 className="text-lg font-bold mb-4">Shop by Category</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-sm hover:border-blue-400 hover:shadow-md transition group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-sm flex items-center justify-center group-hover:scale-110 transition">
                  <Icon size={20} className="text-blue-600" />
                </div>
                <p className="text-xs font-medium text-center text-gray-900">{cat.name}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* FEATURED ARTISANS GRID */}
      <div className="max-w-7xl mx-auto px-4 py-6 bg-white">
        <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-blue-600">
          <h3 className="text-lg font-bold text-gray-900">⭐ Featured Professionals</h3>
          <a href="#" className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1">
            More <ChevronRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {featuredArtisans.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition group cursor-pointer"
            >
              {/* Image area */}
              <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-3xl relative overflow-hidden">
                🧑‍💼
              </div>

              {/* Info */}
              <div className="p-2.5">
                <p className="text-xs text-gray-600 mb-0.5">{artisan.service}</p>
                <h4 className="font-bold text-gray-900 text-xs mb-1">{artisan.name}</h4>

                {/* Rating */}
                <div className="flex items-center gap-0.5 mb-1.5">
                  <Star size={11} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold text-gray-900">{artisan.rating}</span>
                  <span className="text-xs text-gray-600">({artisan.reviews})</span>
                </div>

                {/* Sold */}
                <p className="text-xs text-gray-600 mb-2">{artisan.sold}+ booked</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="font-bold text-blue-600 text-xs">{artisan.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
            {[
              { title: 'For Customers', links: ['Find Artisans', 'How it Works', 'Pricing', 'Safety'] },
              { title: 'For Artisans', links: ['Join Us', 'How to Earn', 'Resources', 'Support'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Help', links: ['Contact Us', 'FAQs', 'Support', 'Reviews'] },
              { title: 'Social', links: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold text-white mb-3 text-sm">{col.title}</h4>
                <ul className="space-y-2 text-xs">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-blue-400 transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-xs">
            <p>&copy; 2024 ArtisanHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
