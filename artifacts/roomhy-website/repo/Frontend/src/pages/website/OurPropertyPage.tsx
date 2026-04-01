import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, BadgeCheck, Zap, Search, SlidersHorizontal, X, ChevronDown, Heart } from 'lucide-react';
import WebsiteNavbar from '../../components/website/WebsiteNavbar';
import WebsiteFooter from '../../components/website/WebsiteFooter';
import { API_URL } from '../../services/api';

interface RawProperty {
  _id?: string;
  visitId?: string;
  propertyId?: string;
  property_name?: string;
  title?: string;
  city?: string;
  cityName?: string;
  location?: string;
  locality?: string;
  area?: string;
  rent?: number;
  monthlyRent?: number;
  property_type?: string;
  type?: string;
  gender?: string;
  genderSuitability?: string;
  rating?: number;
  reviewsAvg?: number;
  photos?: string[];
  professionalPhotos?: string[];
  isVerified?: boolean;
  verified?: boolean;
  generatedCredentials?: object;
  status?: string;
  isLiveOnWebsite?: boolean;
  propertyInfo?: {
    name?: string;
    city?: string;
    area?: string;
    rent?: number;
    monthlyRent?: number;
    propertyType?: string;
    property_type?: string;
    gender?: string;
    genderSuitability?: string;
    propertyId?: string;
    _id?: string;
    photos?: string[];
  };
}

interface NormalizedProperty {
  id: string;
  name: string;
  city: string;
  area: string;
  rent: number;
  propertyType: string;
  img: string;
  rating: string;
  isVerified: boolean;
  gender: string;
  raw: RawProperty;
}

const normalizeProperty = (prop: RawProperty): NormalizedProperty => {
  const info = prop.propertyInfo || {};
  const id = prop._id || prop.visitId || prop.propertyId || info.propertyId || info._id || Math.random().toString();
  const name = prop.property_name || info.name || prop.title || 'Property';
  const city = prop.city || info.city || prop.location || prop.cityName || '';
  const area = prop.locality || info.area || prop.area || '';
  const rent = prop.rent || prop.monthlyRent || info.rent || info.monthlyRent || 0;
  const propertyType = prop.property_type || prop.type || info.propertyType || info.property_type || 'PG';
  const photos: string[] = (prop.professionalPhotos && prop.professionalPhotos.length > 0
    ? prop.professionalPhotos
    : prop.photos || info.photos || []) as string[];
  const img = photos[0] || 'https://images.unsplash.com/photo-1567016432779-1fee749a1532?q=80&w=600&auto=format&fit=crop';
  const gender = prop.gender || prop.genderSuitability || info.gender || info.genderSuitability || '';
  return {
    id,
    name,
    city,
    area,
    rent,
    propertyType,
    img,
    rating: String(prop.rating || prop.reviewsAvg || '4.5'),
    isVerified: !!(prop.isVerified || prop.verified || prop.generatedCredentials),
    gender,
    raw: prop,
  };
};

const normalizeGender = (v: string) => {
  const n = String(v || '').toLowerCase();
  if (!n) return '';
  if (n.includes('co-ed') || n.includes('any') || n.includes('all') || n === 'other') return 'co-ed';
  if (n.includes('male') || n.includes('boy') || n === 'm') return 'male';
  if (n.includes('female') || n.includes('girl') || n === 'f') return 'female';
  return n;
};

const genderMatch = (propGender: string, selected: string) => {
  const pg = normalizeGender(propGender);
  const sg = normalizeGender(selected);
  if (!sg || !pg) return true;
  if (pg === 'co-ed' || sg === 'co-ed') return true;
  return pg === sg;
};

export default function OurPropertyPage() {
  const navigate = useNavigate();
  const [allProperties, setAllProperties] = useState<NormalizedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState<{ _id: string; name: string }[]>([]);
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState({
    cityName: '',
    propertyType: '',
    gender: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [propRes, cityRes] = await Promise.all([
          fetch(`${API_URL}/api/approved-properties/public/approved`),
          fetch(`${API_URL}/api/locations/cities`).catch(() => null),
        ]);
        if (propRes.ok) {
          const data = await propRes.json();
          const raw: RawProperty[] = data.properties || data || [];
          const live = raw.filter(
            (p) => p.isLiveOnWebsite === true || p.status === 'live' || p.status === 'approved'
          );
          setAllProperties(live.map(normalizeProperty));
        }
        if (cityRes && cityRes.ok) {
          const cd = await cityRes.json();
          setCities(cd.data || cd || []);
        }
      } catch {
        setAllProperties([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredProperties = useMemo(() => {
    return allProperties.filter((p) => {
      if (search) {
        const hay = `${p.name} ${p.city} ${p.area} ${p.propertyType}`.toLowerCase();
        if (!hay.includes(search.toLowerCase())) return false;
      }
      if (filters.cityName) {
        const pc = p.city.toLowerCase();
        const fc = filters.cityName.toLowerCase();
        if (!pc.includes(fc) && !fc.includes(pc)) return false;
      }
      if (filters.propertyType) {
        if (!p.propertyType.toLowerCase().includes(filters.propertyType.toLowerCase())) return false;
      }
      if (filters.gender && !genderMatch(p.gender, filters.gender)) return false;
      if (filters.minPrice && p.rent < parseInt(filters.minPrice)) return false;
      if (filters.maxPrice && p.rent > parseInt(filters.maxPrice)) return false;
      return true;
    });
  }, [allProperties, search, filters]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleBidNow = (property: NormalizedProperty) => {
    navigate(`/website/fast-bidding?property=${encodeURIComponent(property.name)}&city=${encodeURIComponent(property.city)}&area=${encodeURIComponent(property.area)}&rent=${property.rent}`);
  };

  const clearFilters = () => {
    setFilters({ cityName: '', propertyType: '', gender: '', minPrice: '', maxPrice: '' });
    setSearch('');
  };

  const hasActiveFilters = search || Object.values(filters).some(Boolean);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" /> Filters
          {hasActiveFilters && (
            <button onClick={clearFilters} className="ml-auto text-xs text-blue-600 hover:underline font-normal">
              Clear All
            </button>
          )}
        </h3>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
        <select
          value={filters.cityName}
          onChange={(e) => setFilters((f) => ({ ...f, cityName: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={c._id} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
        <div className="space-y-2">
          {['', 'PG', 'Hostel', 'Co-living', 'Apartment'].map((t) => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="propertyType"
                value={t}
                checked={filters.propertyType === t}
                onChange={() => setFilters((f) => ({ ...f, propertyType: t }))}
                className="text-blue-600"
              />
              <span className="text-sm text-gray-700">{t || 'All Types'}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
        <div className="space-y-2">
          {[{ v: '', l: 'All' }, { v: 'male', l: 'Boys' }, { v: 'female', l: 'Girls' }, { v: 'co-ed', l: 'Co-ed' }].map((g) => (
            <label key={g.v} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={g.v}
                checked={filters.gender === g.v}
                onChange={() => setFilters((f) => ({ ...f, gender: g.v }))}
                className="text-blue-600"
              />
              <span className="text-sm text-gray-700">{g.l}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Budget (₹/month)</label>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Min price"
            value={filters.minPrice}
            onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max price"
            value={filters.maxPrice}
            onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-2 space-y-1">
          {[['Under ₹5,000', '', '5000'], ['₹5k–₹10k', '5000', '10000'], ['₹10k–₹20k', '10000', '20000'], ['Above ₹20k', '20000', '']].map(([label, min, max]) => (
            <button
              key={label}
              onClick={() => setFilters((f) => ({ ...f, minPrice: min, maxPrice: max }))}
              className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors ${
                filters.minPrice === min && filters.maxPrice === max
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <WebsiteNavbar />

      {/* Hero */}
      <div className="relative h-56 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white mb-2">Our Properties</h1>
          <p className="text-white/80">Verified student-friendly stays across India</p>
        </div>
      </div>

      {/* Search bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-3 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, city, area..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
            />
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && <span className="w-2 h-2 bg-blue-600 rounded-full" />}
          </button>
          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{filteredProperties.length}</span> properties found
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-36 shadow-sm">
              <FilterPanel />
            </div>
          </aside>

          {/* Property Grid */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900">{filteredProperties.length}</span> properties
                {hasActiveFilters && ' · Filtered'}
              </p>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-sm text-blue-600 hover:underline">
                  Clear filters
                </button>
              )}
            </div>

            {loading && (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-52 bg-gray-200" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-8 bg-gray-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && filteredProperties.length === 0 && (
              <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-500 mb-5">Try adjusting your filters or search term</p>
                <button onClick={clearFilters} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  Clear All Filters
                </button>
              </div>
            )}

            {!loading && filteredProperties.length > 0 && (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image with hover effect */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={property.img}
                        alt={property.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-95"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-sm font-medium">
                          {property.propertyType} · {property.city}
                        </p>
                      </div>

                      <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        {property.propertyType}
                      </div>

                      {property.isVerified && (
                        <div className="absolute top-3 right-10 bg-white text-green-600 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <BadgeCheck className="w-3 h-3" /> Verified
                        </div>
                      )}

                      <button
                        onClick={() => toggleFavorite(property.id)}
                        className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            favorites.has(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1 truncate">{property.name}</h3>
                      {(property.area || property.city) && (
                        <p className="text-gray-500 text-xs flex items-center gap-1 mb-3">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          {[property.area, property.city].filter(Boolean).join(', ')}
                        </p>
                      )}

                      <div className="flex items-center justify-between mb-3">
                        {property.rent > 0 ? (
                          <span className="text-blue-600 font-bold text-lg">
                            ₹{property.rent.toLocaleString()}
                            <span className="text-xs text-gray-400 font-normal">/mo</span>
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">Price on request</span>
                        )}
                        <span className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          {property.rating}
                        </span>
                      </div>

                      {property.gender && (
                        <p className="text-xs text-gray-500 mb-3">
                          👤 {property.gender.charAt(0).toUpperCase() + property.gender.slice(1)}
                        </p>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Link
                          to={`/website/ourproperty/${property.id}`}
                          className="flex-1 text-center py-2 border border-blue-600 text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => handleBidNow(property)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          Bid Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              <button onClick={() => setDrawerOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setDrawerOpen(false)}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Show {filteredProperties.length} Properties
            </button>
          </div>
        </div>
      )}

      <WebsiteFooter />
    </div>
  );
}
