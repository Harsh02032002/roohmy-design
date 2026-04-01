import React from 'react';
import { Building2, Users } from 'lucide-react';

export default function WebsiteNavbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Building2 className="w-8 h-8 text-teal-500" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ROOMHY<span className="text-teal-500">.com</span></h1>
              <p className="text-xs text-gray-500">Discover Your Next Home</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="/website/index" className="text-gray-700 hover:text-teal-500 transition-colors font-medium">Home</a>
            <a href="/website/ourproperty" className="text-gray-700 hover:text-teal-500 transition-colors font-medium">Properties</a>
            <a href="/website/faq" className="text-gray-700 hover:text-teal-500 transition-colors font-medium">FAQ</a>
            <a href="/website/about" className="text-gray-700 hover:text-teal-500 transition-colors font-medium">About</a>
            <a href="/website/contact" className="text-gray-700 hover:text-teal-500 transition-colors font-medium">Contact</a>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 md:px-4 py-2 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-sm md:text-base whitespace-nowrap">
              BidNow
            </button>
            <button className="text-gray-700 hover:text-teal-500 transition-colors">
              <Users className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
