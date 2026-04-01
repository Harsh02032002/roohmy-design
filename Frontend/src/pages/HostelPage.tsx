import { useState, useMemo } from 'react';
import { Star, Building2, MapPin, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const hostelList = [
  {
    name: 'Elite Hostel',
    city: 'Indore',
    area: 'Scheme No 54',
    price: 5200,
    rating: 4.6,
    gender: 'Girls',
    vacancies: 8,
    perks: ['Gym', '24x7 security', 'Mess included'],
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
    verified: true,
  },
  {
    name: 'Hostel 360',
    city: 'Nagpur',
    area: 'Sitabuldi',
    price: 4700,
    rating: 4.4,
    gender: 'Boys',
    vacancies: 6,
    perks: ['Library', 'Career support', 'Mess + Wi-Fi'],
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=600',
    verified: true,
  },
  {
    name: 'Boys Hostel',
    city: 'Kota',
    area: 'Rawatbhata Road',
    price: 4500,
    rating: 4.5,
    gender: 'Boys',
    vacancies: 15,
    perks: ['Study room', 'Mess', 'Wi-Fi'],
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600',
    verified: true,
  },
  {
    name: 'Girls Safety Hostel',
    city: 'Jaipur',
    area: 'Malviya Nagar',
    price: 5800,
    rating: 4.7,
    gender: 'Girls',
    vacancies: 5,
    perks: ['Security guard', 'CCTV', 'Healthy food'],
    image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600',
    verified: true,
  },
];

export default function HostelPage() {
  const [cityFilter, setCityFilter] = useState('All');
  const [areaFilter, setAreaFilter] = useState('All');
  const [budgetFilter, setBudgetFilter] = useState('any');
  const [budgetValue, setBudgetValue] = useState('');
  const [budgetValue2, setBudgetValue2] = useState('');

  const cityOptions = useMemo(() => ['All', ...Array.from(new Set(hostelList.map((h) => h.city)))], []);
  const areaOptions = useMemo(() => ['All', ...Array.from(new Set(hostelList.map((h) => h.area)))], []);

  const budgetFilterOptions = [
    { value: 'any', label: 'Any' },
    { value: 'lt', label: 'Less than' },
    { value: 'gt', label: 'More than' },
    { value: 'eq', label: 'Exactly' },
    { value: 'between', label: 'Between' },
  ];

  const filteredHostels = useMemo(() => {
    return hostelList.filter((h) => {
      const passesCity = cityFilter === 'All' || h.city === cityFilter;
      const passesArea = areaFilter === 'All' || h.area === areaFilter;
      
      if (!budgetValue && budgetFilter !== 'between') {
        return passesCity && passesArea;
      }
      
      const value = Number(budgetValue);
      const value2 = Number(budgetValue2);
      
      if (budgetFilter === 'lt') {
        return passesCity && passesArea && h.price < value;
      }
      if (budgetFilter === 'gt') {
        return passesCity && passesArea && h.price > value;
      }
      if (budgetFilter === 'eq') {
        return passesCity && passesArea && h.price === value;
      }
      if (budgetFilter === 'between') {
        return passesCity && passesArea && h.price >= value && h.price <= value2;
      }
      return passesCity && passesArea;
    });
  }, [cityFilter, areaFilter, budgetFilter, budgetValue, budgetValue2]);

  return (
    <div className="min-h-screen bg-white">
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
              <span className="text-teal-500 font-semibold">Hostel</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-gradient-to-br from-teal-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center text-gray-600 hover:text-teal-500 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Hostel Accommodations</h1>
          <p className="text-gray-600">Affordable hostel living for students and working professionals</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <label className="space-y-1 text-sm text-gray-600">
            City
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              {cityOptions.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-sm text-gray-600">
            Area
            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              {areaOptions.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-sm text-gray-600">
            Budget
            <select
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              {budgetFilterOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          {budgetFilter !== 'any' && budgetFilter !== 'between' && (
            <label className="space-y-1 text-sm text-gray-600">
              Amount
              <input
                type="number"
                value={budgetValue}
                onChange={(e) => setBudgetValue(e.target.value)}
                placeholder="Enter amount"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </label>
          )}
          {budgetFilter === 'between' && (
            <>
              <label className="space-y-1 text-sm text-gray-600">
                Min
                <input
                  type="number"
                  value={budgetValue}
                  onChange={(e) => setBudgetValue(e.target.value)}
                  placeholder="Min"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </label>
              <label className="space-y-1 text-sm text-gray-600">
                Max
                <input
                  type="number"
                  value={budgetValue2}
                  onChange={(e) => setBudgetValue2(e.target.value)}
                  placeholder="Max"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </label>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredHostels.map((hostel) => (
            <div key={hostel.name} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={hostel.image}
                  alt={hostel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {hostel.verified && (
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                    <span className="text-xs font-semibold text-gray-700">Verified</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{hostel.name}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{hostel.area}, {hostel.city}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-teal-500">₹{hostel.price}<span className="text-sm text-gray-600">/month</span></span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-700">{hostel.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{hostel.gender}</span>
                  <span>Vacancies: {hostel.vacancies}</span>
                </div>
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-semibold transition-all">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 RoomHy.com. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
