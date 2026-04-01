import React, { useState } from 'react';
import { X, MapPin, Star, BadgeCheck, Zap } from 'lucide-react';
import { API_URL } from '../../services/api';

const offerings = [
  {
    title: 'PG',
    type: 'PG',
    description: 'Comfortable paying guest accommodations with meals & amenities',
    image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600',
    overlay: 'Homely • Safe • Affordable',
  },
  {
    title: 'Hostel',
    type: 'Hostel',
    description: 'Affordable hostel living for students and working professionals',
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600',
    overlay: 'Budget-Friendly • Community Living',
  },
  {
    title: 'Co-living',
    type: 'Co-living',
    description: 'Modern co-living spaces with community vibes & full amenities',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
    overlay: 'Co-living for Professionals',
  },
  {
    title: 'Apartment / Flat',
    type: 'Apartment',
    description: 'Private apartments for individuals and small groups',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
    overlay: 'Managed Apartments • Privacy First',
  },
];

const whyPoints = [
  {
    icon: '🚫',
    title: 'Zero Brokerage Always',
    description: 'Connect directly with verified property owners. No middlemen, no extra charges.',
  },
  {
    icon: '💸',
    title: 'Only Pay What You Bid',
    description: 'No fixed pricing. Set your budget, place a live bid — the owner picks the best offer.',
  },
  {
    icon: '🏠',
    title: 'Rooms That Match Your Vibe',
    description: 'Solo PG, shared space, or budget hostel near college — Roomhy has it all.',
  },
  {
    icon: '✅',
    title: 'Verified Properties Only',
    description: 'Every listing is verified by our team. No fake photos, no hidden charges.',
  },
  {
    icon: '🕐',
    title: '24/7 Support',
    description: 'From booking to move-out, our dedicated support team is always here to help.',
  },
  {
    icon: '🔒',
    title: 'Secure Payment',
    description: 'Your money is safe until you move in. Secure gateway, zero risk.',
  },
  {
    icon: '💡',
    title: 'Fully Furnished',
    description: 'Move in with just your suitcase. Essential furniture and amenities included.',
  },
  {
    icon: '📅',
    title: 'Flexible Booking',
    description: 'Book for any duration — short term or long term. Cancel anytime with refund.',
  },
  {
    icon: '👥',
    title: 'Student Community',
    description: 'Join thousands of students. Make friends, share experiences, grow together.',
  },
];

interface Property {
  _id: string;
  propertyInfo?: {
    propertyName?: string;
    ownerName?: string;
    city?: string;
    area?: string;
    address?: string;
    propertyType?: string;
    monthlyRent?: number;
    photos?: string[];
    rating?: number;
    gender?: string;
  };
  monthlyRent?: number;
  photos?: string[];
  isLiveOnWebsite?: boolean;
}

export default function WhatWeOffer() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = async (type: string) => {
    setSelectedType(type);
    setLoading(true);
    setError(null);
    setProperties([]);
    try {
      const res = await fetch(`${API_URL}/api/approved-properties/public/approved`);
      if (!res.ok) throw new Error('Failed to fetch properties');
      const data = await res.json();
      const allProps: Property[] = data.properties || data || [];
      const filtered = allProps.filter((p) => {
        const pType = p.propertyInfo?.propertyType || '';
        return pType.toLowerCase().includes(type.toLowerCase());
      });
      setProperties(filtered);
    } catch (err: any) {
      setError('Could not load properties. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedType(null);
    setProperties([]);
    setError(null);
  };

  return (
    <>
      {/* ── WHAT WE OFFER ── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1 rounded-full mb-3">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Find the perfect type of stay for your needs. Click any category to explore live verified properties.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((item) => (
              <button
                key={item.type}
                onClick={() => openModal(item.type)}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 cursor-pointer text-left focus:outline-none"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-xl mb-1">{item.title}</h3>
                    <p className="text-white/0 group-hover:text-white/90 text-sm transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      {item.overlay}
                    </p>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <p className="text-gray-500 text-sm">{item.description}</p>
                  <span className="inline-block mt-3 text-blue-600 font-semibold text-sm group-hover:underline">
                    Explore →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY STUDENTS LOVE ROOMHY (merged) ── */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-1 rounded-full mb-3">
              Why Roomhy?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Students Love Roomhy
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Built by students, for students. Here's why thousands trust us every day.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyPoints.map((point, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="text-3xl mb-3">{point.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{point.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl px-8 py-5 shadow-lg">
              <p className="text-white text-lg font-semibold">
                🎓 Join 50,000+ happy students across India
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROPERTY MODAL ── */}
      {selectedType && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedType} Properties</h3>
                <p className="text-sm text-gray-500 mt-0.5">Verified listings near you</p>
              </div>
              <button
                onClick={closeModal}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 p-6">
              {loading && (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-gray-500">Loading properties...</p>
                </div>
              )}

              {error && (
                <div className="text-center py-16">
                  <p className="text-red-500 font-medium">{error}</p>
                  <button
                    onClick={() => openModal(selectedType)}
                    className="mt-4 text-blue-600 underline text-sm"
                  >
                    Try again
                  </button>
                </div>
              )}

              {!loading && !error && properties.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">🏠</div>
                  <p className="text-gray-600 font-semibold text-lg">No {selectedType} properties available right now.</p>
                  <p className="text-gray-400 text-sm mt-2">Check back soon — new listings are added daily!</p>
                </div>
              )}

              {!loading && !error && properties.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {properties.map((property) => {
                    const info = property.propertyInfo || {};
                    const photos = info.photos || property.photos || [];
                    const image = photos[0] || 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400';
                    const rent = info.monthlyRent || property.monthlyRent;
                    return (
                      <div
                        key={property._id}
                        className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
                      >
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={image}
                            alt={info.propertyName || 'Property'}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                            {info.propertyType || selectedType}
                          </div>
                          <div className="absolute top-3 right-3 bg-white text-green-600 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                            <BadgeCheck className="w-3 h-3" /> Verified
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-gray-900 mb-1">
                            {info.propertyName || 'Roomhy Property'}
                          </h4>
                          {(info.area || info.city) && (
                            <p className="text-gray-500 text-xs flex items-center gap-1 mb-3">
                              <MapPin className="w-3 h-3" />
                              {[info.area, info.city].filter(Boolean).join(', ')}
                            </p>
                          )}
                          <div className="flex items-center justify-between">
                            {rent ? (
                              <span className="text-blue-600 font-bold text-lg">
                                ₹{Number(rent).toLocaleString()}
                                <span className="text-xs text-gray-400 font-normal">/mo</span>
                              </span>
                            ) : (
                              <span className="text-gray-400 text-sm">Price on request</span>
                            )}
                            {info.rating && (
                              <span className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                {info.rating}
                              </span>
                            )}
                          </div>
                          <a
                            href="/website/our-property"
                            className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors"
                          >
                            <Zap className="w-4 h-4" /> View Details
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
