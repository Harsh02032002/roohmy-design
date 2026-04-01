import { useState, useMemo } from 'react';
import { Search, Star, Building2, MapPin, Users, ArrowLeft, Shield, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const pgList = [
  {
    name: 'Sunrise PG',
    city: 'Kota',
    area: 'Central Kota',
    price: 6500,
    rating: 4.8,
    gender: 'Co-ed',
    vacancies: 12,
    perks: ['AC rooms', 'Housekeeping', 'Community hall'],
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600',
    verified: true,
  },
  {
    name: 'Campus View PG',
    city: 'Delhi',
    area: 'Dwarka Sector 8',
    price: 7800,
    rating: 4.7,
    gender: 'Boys',
    vacancies: 10,
    perks: ['Free Wi-Fi', 'Soccer ground', 'House doctor'],
    image: 'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=600',
    verified: true,
  },
  {
    name: 'Cozy Stay PG',
    city: 'Bangalore',
    area: 'HSR Layout',
    price: 8500,
    rating: 4.9,
    gender: 'Girls',
    vacancies: 6,
    perks: ['Study room', 'Healthy meals', 'Security'],
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
    verified: true,
    girlsOnly: true,
  },
  {
    name: 'Student Haven PG',
    city: 'Pune',
    area: 'Hinjewadi',
    price: 7200,
    rating: 4.6,
    gender: 'Co-ed',
    vacancies: 8,
    perks: ['Laundry', 'Wi-Fi', 'Hot water'],
    image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600',
    verified: true,
  },
];

export default function PGPage() {
  const [cityFilter, setCityFilter] = useState('All');
  const [areaFilter, setAreaFilter] = useState('All');
  const [budgetFilter, setBudgetFilter] = useState('any');
  const [budgetValue, setBudgetValue] = useState('');
  const [budgetValue2, setBudgetValue2] = useState('');

  const cityOptions = useMemo(() => ['All', ...Array.from(new Set(pgList.map((pg) => pg.city)))], []);
  const areaOptions = useMemo(() => ['All', ...Array.from(new Set(pgList.map((pg) => pg.area)))], []);

  const budgetFilterOptions = [
    { value: 'any', label: 'Any' },
    { value: 'lt', label: 'Less than' },
    { value: 'gt', label: 'More than' },
    { value: 'eq', label: 'Exactly' },
    { value: 'between', label: 'Between' },
  ];

  const filteredPGs = useMemo(() => {
    return pgList.filter((pg) => {
      const passesCity = cityFilter === 'All' || pg.city === cityFilter;
      const passesArea = areaFilter === 'All' || pg.area === areaFilter;
      
      if (!budgetValue && budgetFilter !== 'between') {
        return passesCity && passesArea;
      }
      
      const value = Number(budgetValue);
      const value2 = Number(budgetValue2);
      
      if (budgetFilter === 'lt') {
        return passesCity && passesArea && pg.price < value;
      }
      if (budgetFilter === 'gt') {
        return passesCity && passesArea && pg.price > value;
      }
      if (budgetFilter === 'eq') {
        return passesCity && passesArea && pg.price === value;
      }
      if (budgetFilter === 'between') {
        return passesCity && passesArea && pg.price >= value && pg.price <= value2;
      }
      return passesCity && passesArea;
    });
  }, [cityFilter, areaFilter, budgetFilter, budgetValue, budgetValue2]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-teal-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ROOMHY<span className="text-teal-500">.com</span></h1>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-teal-500 transition-colors font-medium">Home</Link>
              <span className="text-teal-500 font-semibold">PG</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Header - Enhanced */}
      <div className="bg-gradient-to-br from-teal-600 via-blue-600 to-cyan-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center text-white/90 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-white mb-4">PG Accommodations</h1>
          <p className="text-xl text-white/90 max-w-3xl">Find comfortable paying guest accommodations with all amenities and real-time bidding</p>
        </div>
      </div>

      {/* Filters - Enhanced */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Filter PGs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">City</label>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none focus:border-teal-500 transition-all"
              >
                {cityOptions.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Area</label>
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none focus:border-teal-500 transition-all"
              >
                {areaOptions.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Budget</label>
              <select
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none focus:border-teal-500 transition-all"
              >
                {budgetFilterOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            {budgetFilter !== 'any' && budgetFilter !== 'between' && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Amount</label>
                <input
                  type="number"
                  value={budgetValue}
                  onChange={(e) => setBudgetValue(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none focus:border-teal-500 transition-all"
                />
              </div>
            )}
            {budgetFilter === 'between' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Min</label>
                  <input
                    type="number"
                    value={budgetValue}
                    onChange={(e) => setBudgetValue(e.target.value)}
                    placeholder="Min"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none focus:border-teal-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Max</label>
                  <input
                    type="number"
                    value={budgetValue2}
                    onChange={(e) => setBudgetValue2(e.target.value)}
                    placeholder="Max"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none focus:border-teal-500 transition-all"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* PG Grid - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {filteredPGs.map((pg) => (
            <div key={pg.name} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 hover:border-teal-200 transform hover:-translate-y-1">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={pg.image}
                  alt={pg.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {pg.girlsOnly && (
                  <div className="absolute top-3 left-3 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Girls Only
                  </div>
                )}
                {pg.verified && (
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-2 flex items-center space-x-2 shadow-lg">
                    <BadgeCheck className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-bold text-gray-800">Verified</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">{pg.name}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{pg.area}, {pg.city}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-teal-600">₹{pg.price}<span className="text-sm text-gray-500 font-normal">/month</span></span>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-700">{pg.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-5">
                  <span className="font-medium">{pg.gender}</span>
                  <span className="font-medium">Vacancies: {pg.vacancies}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {pg.perks.slice(0, 2).map((perk, index) => (
                    <span key={index} className="bg-teal-50 text-teal-700 px-2 py-1 rounded-lg text-xs font-medium">
                      {perk}
                    </span>
                  ))}
                  {pg.perks.length > 2 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium">
                      +{pg.perks.length - 2} more
                    </span>
                  )}
                </div>
                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  Bid Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer - Enhanced */}
      <footer className="bg-gradient-to-br from-teal-600 via-blue-600 to-cyan-500 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/90 text-sm">&copy; 2024 RoomHy.com. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
