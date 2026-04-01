import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Menu, X, Zap, Home, Building, PlusCircle, Phone } from 'lucide-react';

export default function WebsiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { to: '/website/ourproperty', label: 'Our Properties', icon: <Building className="w-4 h-4" /> },
    { to: '/website/list-property', label: 'List Your Property', icon: <PlusCircle className="w-4 h-4" /> },
    { to: '/website/contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> },
  ];

  const isActive = (to: string) =>
    to === '/'
      ? location.pathname === '/' || location.pathname === '/website/index'
      : location.pathname === to;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">ROOMHY<span className="text-blue-600">.com</span></h1>
              <p className="text-xs text-gray-500">Discover Your Next Home</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.to)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side - Bid Now CTA */}
          <div className="flex items-center gap-3">
            <Link
              to="/website/fast-bidding"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-sm whitespace-nowrap"
            >
              <Zap className="w-4 h-4" />
              Bid Now
            </Link>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 pb-4 pt-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.to) ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <Link
              to="/website/fast-bidding"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 mx-4 mt-2 justify-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold transition-all"
            >
              <Zap className="w-4 h-4" />
              Bid Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
