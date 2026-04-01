import React from 'react';
import WebsiteNavbar from '../components/WebsiteNavbar';
import WebsiteFooter from '../components/WebsiteFooter';

export default function OurPropertyPage() {
  const properties = [
    {
      name: 'Sunrise PG',
      location: 'Kota, Rajasthan',
      price: '₹6,500',
      rating: 4.8,
      type: 'PG',
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Elite Hostel',
      location: 'Indore, MP',
      price: '₹5,200',
      rating: 4.6,
      type: 'Hostel',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Urban Co-Space',
      location: 'Jaipur, Rajasthan',
      price: '₹8,900',
      rating: 4.9,
      type: 'Co-living',
      image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Campus View PG',
      location: 'Delhi NCR',
      price: '₹7,800',
      rating: 4.7,
      type: 'PG',
      image: 'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Modern Apartment',
      location: 'Mumbai, Maharashtra',
      price: '₹15,000',
      rating: 4.5,
      type: 'Apartment',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Budget Hostel',
      location: 'Bhopal, MP',
      price: '₹4,500',
      rating: 4.3,
      type: 'Hostel',
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <WebsiteNavbar />

      <main className="min-h-screen">
        <div className="relative h-[400px] bg-gradient-to-br from-teal-600 via-blue-600 to-cyan-500">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Properties</h1>
            <p className="text-xl text-white/90">Find your perfect stay from our verified listings</p>
          </div>
        </div>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>All Cities</option>
                <option>Kota</option>
                <option>Indore</option>
                <option>Jaipur</option>
                <option>Delhi</option>
              </select>
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>All Types</option>
                <option>PG</option>
                <option>Hostel</option>
                <option>Co-living</option>
                <option>Apartment</option>
              </select>
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Any Budget</option>
                <option>Under ₹5,000</option>
                <option>₹5,000 - ₹10,000</option>
                <option>₹10,000 - ₹20,000</option>
                <option>Above ₹20,000</option>
              </select>
              <button className="bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-all">
                Apply Filters
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div key={property.name} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                    {property.verified && (
                      <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                        <span className="text-xs font-semibold text-green-600">✓ Verified</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {property.type}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{property.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-teal-500">{property.price}<span className="text-sm text-gray-600">/mo</span></span>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold text-gray-700">{property.rating}</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-semibold transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <WebsiteFooter />
    </div>
  );
}
