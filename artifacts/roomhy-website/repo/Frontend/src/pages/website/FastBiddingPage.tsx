import React, { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Zap, ChevronDown, CheckCircle, X, ArrowLeft } from 'lucide-react';
import WebsiteNavbar from '../../components/website/WebsiteNavbar';
import WebsiteFooter from '../../components/website/WebsiteFooter';
import { API_URL } from '../../services/api';

const defaultCities = [
  { _id: 'kota', name: 'Kota, Rajasthan' },
  { _id: 'indore', name: 'Indore, Madhya Pradesh' },
  { _id: 'jaipur', name: 'Jaipur, Rajasthan' },
  { _id: 'delhi', name: 'Delhi' },
  { _id: 'pune', name: 'Pune, Maharashtra' },
];

interface City { _id: string; name: string; }
interface Area { _id: string; name: string; city?: any; }
interface Property {
  _id?: string;
  visitId?: string;
  propertyId?: string;
  property_name?: string;
  title?: string;
  locality?: string;
  monthlyRent?: number;
  rent?: number;
  propertyType?: string;
  property_type?: string;
  gender?: string;
  photos?: string[];
  professionalPhotos?: string[];
  isLiveOnWebsite?: boolean;
  status?: string;
  propertyInfo?: {
    name?: string;
    area?: string;
    rent?: number;
    monthlyRent?: number;
    propertyType?: string;
    gender?: string;
  };
  generatedCredentials?: { loginId?: string };
  ownerLoginId?: string;
  createdBy?: string;
  owner?: string;
  propertyOwnerId?: string;
}

export default function FastBiddingPage() {
  const [searchParams] = useSearchParams();
  const prefilledProperty = searchParams.get('property') || '';
  const prefilledCity = searchParams.get('city') || '';
  const prefilledArea = searchParams.get('area') || '';
  const prefilledRent = searchParams.get('rent') || '';

  const [citiesData, setCitiesData] = useState<City[]>([]);
  const [areasData, setAreasData] = useState<Area[]>([]);
  const [propertiesData, setPropertiesData] = useState<Property[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    gmail: '',
    gender: '',
    city: '',
    area: '',
    minPrice: prefilledRent ? String(Math.max(0, parseInt(prefilledRent) - 2000)) : '',
    maxPrice: prefilledRent || '',
  });

  // Load cities
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/api/locations/cities`);
        if (res.ok) {
          const data = await res.json();
          const cities: City[] = data.data || data || [];
          if (cities.length > 0) { setCitiesData(cities); return; }
        }
      } catch {}
      setCitiesData(defaultCities);
    };
    load();
  }, []);

  // Load areas when city changes
  useEffect(() => {
    if (!form.city) { setAreasData([]); return; }
    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/api/locations/areas`);
        if (res.ok) {
          const data = await res.json();
          const all: Area[] = data.data || [];
          const filtered = all.filter(
            (a) => a.city?._id === form.city || a.city === form.city
          );
          if (filtered.length > 0) { setAreasData(filtered); return; }
        }
      } catch {}
      setAreasData([]);
    };
    load();
  }, [form.city]);

  // Load properties when area changes
  useEffect(() => {
    if (!form.area) { setPropertiesData([]); return; }
    const load = async () => {
      setLoadingProperties(true);
      try {
        const res = await fetch(`${API_URL}/api/approved-properties/public/approved`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        let props: Property[] = Array.isArray(data) ? data : (data?.properties || []);
        props = props.filter(
          (p) => p.isLiveOnWebsite === true || p.status === 'live' || p.status === 'approved'
        );

        const selectedArea = areasData.find((a) => a._id === form.area);
        const areaName = selectedArea?.name?.toLowerCase().trim() || '';

        const filtered = props.filter((p) => {
          const info = p.propertyInfo || {};
          const propArea = (p.locality || info.area || '').toLowerCase().trim();
          if (areaName && propArea && !propArea.includes(areaName) && !areaName.includes(propArea)) return false;
          if (form.gender) {
            const pg = (p.gender || info.gender || '').toLowerCase();
            if (pg && !pg.includes('co-ed') && !pg.includes(form.gender) && !form.gender.includes(pg)) return false;
          }
          const min = parseInt(form.minPrice || '0', 10);
          const max = parseInt(form.maxPrice || '0', 10);
          const rent = parseInt(String(p.monthlyRent || p.rent || info.rent || info.monthlyRent || 0), 10);
          if (min && rent && rent < min) return false;
          if (max && max !== 50000 && rent && rent > max) return false;
          return true;
        });

        setPropertiesData(filtered);
      } catch {
        setPropertiesData([]);
      } finally {
        setLoadingProperties(false);
      }
    };
    load();
  }, [form.area, form.gender, form.minPrice, form.maxPrice, areasData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setForm((p) => ({ ...p, [id]: value }));
  };

  const toggleProperty = (id: string) => {
    setSelectedIds((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  };

  const validate = () => {
    if (!form.fullName.trim()) return false;
    if (!form.gmail.trim() || !form.gmail.includes('@')) return false;
    if (!form.gender) return false;
    if (!form.city || !form.area) return false;
    if (!form.minPrice || !form.maxPrice) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) { alert('Please fill in all required fields correctly.'); return; }
    if (selectedIds.length === 0) { alert('Please select at least one property to bid on.'); return; }

    const selectedCity = citiesData.find((c) => c._id === form.city);
    const selectedArea = areasData.find((a) => a._id === form.area);

    for (const propId of selectedIds) {
      try {
        const property = propertiesData.find(
          (p) => p._id === propId || p.visitId === propId || p.propertyId === propId
        );
        if (!property) continue;
        const ownerId =
          property.generatedCredentials?.loginId ||
          property.ownerLoginId ||
          property.createdBy ||
          property.owner ||
          property.propertyOwnerId;

        const bidData = {
          property_id: propId,
          property_name: property.property_name || property.propertyInfo?.name || 'Property',
          area: property.locality || property.propertyInfo?.area || '',
          property_type: property.propertyType || property.property_type || property.propertyInfo?.propertyType || 'Property',
          rent_amount: parseInt(String(property.monthlyRent || property.rent || property.propertyInfo?.rent || 0), 10),
          user_id: '',
          owner_id: ownerId || '',
          name: form.fullName,
          email: form.gmail,
          phone: '',
          request_type: 'bid',
          bid_min: parseInt(form.minPrice, 10),
          bid_max: parseInt(form.maxPrice, 10),
          filter_criteria: {
            gender: form.gender,
            city: selectedCity?.name || '',
            area: selectedArea?.name || '',
            min_price: parseInt(form.minPrice, 10),
            max_price: parseInt(form.maxPrice, 10),
          },
          message: `Looking for property with rent ₹${form.minPrice}–₹${form.maxPrice}, Gender: ${form.gender}`,
        };

        await fetch(`${API_URL}/api/booking/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bidData),
        });
      } catch {}
    }

    setShowSuccess(true);
    setSelectedIds([]);
    setForm((f) => ({ ...f, minPrice: '', maxPrice: '' }));
  };

  const getPropertyDisplay = (p: Property) => {
    const info = p.propertyInfo || {};
    const id = p._id || p.visitId || p.propertyId || '';
    const name = p.property_name || info.name || 'Property';
    const area = p.locality || info.area || '';
    const rent = p.monthlyRent || p.rent || info.rent || info.monthlyRent || 0;
    const photos = (p.professionalPhotos?.length ? p.professionalPhotos : p.photos) || [];
    const img = photos[0] || 'https://images.unsplash.com/photo-1567016432779-1fee749a1532?w=400&auto=format';
    return { id, name, area, rent, img };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <WebsiteNavbar />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fast Bidding</h1>
              <p className="text-gray-500 text-sm">Bid on multiple properties at once. Save time, get the best deal.</p>
            </div>
          </div>
        </div>

        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-6 flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-green-800 text-lg">Bids Submitted!</h3>
              <p className="text-green-700 text-sm mt-1">
                Your bids have been sent to property owners. They'll contact you soon.
              </p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="ml-auto text-green-600 hover:text-green-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {prefilledProperty && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3">
            <Zap className="w-5 h-5 text-blue-600" />
            <p className="text-blue-700 text-sm">
              Bidding for: <span className="font-semibold">{prefilledProperty}</span>
              {prefilledCity && ` · ${prefilledCity}`}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 pb-4 border-b border-gray-100">Your Details</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                id="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gmail *</label>
              <input
                id="gmail"
                type="email"
                value={form.gmail}
                onChange={handleChange}
                placeholder="your@gmail.com"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
            <div className="flex gap-3">
              {[['male', 'Male'], ['female', 'Female'], ['co-ed', 'Co-ed']].map(([v, l]) => (
                <label key={v} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium ${
                  form.gender === v ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-600 hover:border-orange-300'
                }`}>
                  <input type="radio" id="gender" name="gender" value={v} checked={form.gender === v} onChange={handleChange} className="hidden" />
                  {l}
                </label>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <select
                id="city"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              >
                <option value="">Select city</option>
                {citiesData.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area *</label>
              <select
                id="area"
                value={form.area}
                onChange={handleChange}
                required
                disabled={!form.city}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:opacity-50"
              >
                <option value="">Select area</option>
                {areasData.map((a) => (
                  <option key={a._id} value={a._id}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Budget (₹/mo) *</label>
              <input
                id="minPrice"
                type="number"
                value={form.minPrice}
                onChange={handleChange}
                placeholder="e.g. 5000"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Budget (₹/mo) *</label>
              <input
                id="maxPrice"
                type="number"
                value={form.maxPrice}
                onChange={handleChange}
                placeholder="e.g. 10000"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Property Selection */}
          {form.area && (
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                Select Properties to Bid
                {loadingProperties && <span className="ml-2 text-sm text-gray-400 font-normal">Loading...</span>}
              </h3>

              {!loadingProperties && propertiesData.length === 0 && (
                <div className="text-center py-8 bg-gray-50 rounded-xl">
                  <p className="text-gray-500 text-sm">No properties found in this area with your filters.</p>
                </div>
              )}

              {!loadingProperties && propertiesData.length > 0 && (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {propertiesData.map((prop) => {
                    const { id, name, area, rent, img } = getPropertyDisplay(prop);
                    const isSelected = selectedIds.includes(id);
                    return (
                      <label
                        key={id}
                        className={`flex items-center gap-4 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          isSelected ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300 bg-white'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleProperty(id)}
                          className="w-4 h-4 accent-orange-500"
                        />
                        <img src={img} alt={name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">{name}</p>
                          {area && <p className="text-xs text-gray-500">{area}</p>}
                          {rent > 0 && (
                            <p className="text-orange-600 font-bold text-sm">₹{rent.toLocaleString()}/mo</p>
                          )}
                        </div>
                        {isSelected && <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />}
                      </label>
                    );
                  })}
                </div>
              )}
              {selectedIds.length > 0 && (
                <p className="text-sm text-orange-600 font-medium mt-2">
                  {selectedIds.length} property selected
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-md hover:shadow-lg"
          >
            <Zap className="w-5 h-5" />
            Submit Bids
          </button>
        </form>
      </div>

      <WebsiteFooter />
    </div>
  );
}
