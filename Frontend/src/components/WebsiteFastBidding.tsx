import { useState } from "react";
import { ArrowLeft, Zap, Loader, Inbox, Hash, Send, Info, Shield, Check, Home } from 'lucide-react';

const mockCities = [
  { _id: "kota", name: "Kota, Rajasthan" },
  { _id: "indore", name: "Indore, Madhya Pradesh" },
  { _id: "jaipur", name: "Jaipur, Rajasthan" },
  { _id: "delhi", name: "Delhi" },
  { _id: "mumbai", name: "Mumbai, Maharashtra" }
];

const mockAreas = {
  kota: [
    { _id: "east", name: "East Kota" },
    { _id: "west", name: "West Kota" },
    { _id: "central", name: "Central Kota" },
    { _id: "vijaynagar", name: "Vijay Nagar" }
  ],
  indore: [
    { _id: "vijay", name: "Vijay Nagar" },
    { _id: "palasia", name: "Palasia" },
    { _id: "mg", name: "MG Road" },
    { _id: "geeta", name: "Geeta Bhawan" }
  ],
  jaipur: [
    { _id: "malviya", name: "Malviya Nagar" },
    { _id: "vaishali", name: "Vaishali Nagar" },
    { _id: "mansarovar", name: "Mansarovar" }
  ],
  delhi: [
    { _id: "campus", name: "North Campus" },
    { _id: "south", name: "South Delhi" },
    { _id: "east", name: "East Delhi" },
    { _id: "west", name: "West Delhi" }
  ],
  mumbai: [
    { _id: "andheri", name: "Andheri" },
    { _id: "bandra", name: "Bandra" },
    { _id: "powai", name: "Powai" }
  ]
};

const mockProperties = {
  east: [
    { _id: "prop1", property_name: "Sunshine PG", monthlyRent: 6500, gender: "Male", propertyType: "PG", locality: "East Kota" },
    { _id: "prop2", property_name: "Elite Hostel", monthlyRent: 5500, gender: "Female", propertyType: "Hostel", locality: "East Kota" },
    { _id: "prop3", property_name: "Co-Living Space", monthlyRent: 8500, gender: "Co-Ed", propertyType: "Co-living", locality: "East Kota" }
  ],
  west: [
    { _id: "prop4", property_name: "Comfort Stay", monthlyRent: 7000, gender: "Male", propertyType: "PG", locality: "West Kota" },
    { _id: "prop5", property_name: "Girls Hostel", monthlyRent: 6000, gender: "Female", propertyType: "Hostel", locality: "West Kota" }
  ],
  central: [
    { _id: "prop6", property_name: "Central PG", monthlyRent: 7500, gender: "Male", propertyType: "PG", locality: "Central Kota" },
    { _id: "prop7", property_name: "Urban Living", monthlyRent: 9000, gender: "Co-Ed", propertyType: "Apartment", locality: "Central Kota" }
  ],
  vijaynagar: [
    { _id: "prop8", property_name: "Vijay PG", monthlyRent: 6800, gender: "Male", propertyType: "PG", locality: "Vijay Nagar" },
    { _id: "prop9", property_name: "Elite Stay", monthlyRent: 7200, gender: "Female", propertyType: "PG", locality: "Vijay Nagar" }
  ],
  vijay: [
    { _id: "prop10", property_name: "Indore Heights", monthlyRent: 8000, gender: "Co-Ed", propertyType: "Co-living", locality: "Vijay Nagar" },
    { _id: "prop11", property_name: "Student Hub", monthlyRent: 6500, gender: "Male", propertyType: "PG", locality: "Vijay Nagar" }
  ],
  palasia: [
    { _id: "prop12", property_name: "Palasia Prime", monthlyRent: 9000, gender: "Female", propertyType: "PG", locality: "Palasia" },
    { _id: "prop13", property_name: "Luxury Stay", monthlyRent: 12000, gender: "Co-Ed", propertyType: "Apartment", locality: "Palasia" }
  ],
  mg: [
    { _id: "prop14", property_name: "MG Road PG", monthlyRent: 7500, gender: "Male", propertyType: "PG", locality: "MG Road" },
    { _id: "prop15", property_name: "Central Living", monthlyRent: 8500, gender: "Co-Ed", propertyType: "Co-living", locality: "MG Road" }
  ],
  geeta: [
    { _id: "prop16", property_name: "Geeta Bhawan Hostel", monthlyRent: 5500, gender: "Female", propertyType: "Hostel", locality: "Geeta Bhawan" }
  ],
  malviya: [
    { _id: "prop17", property_name: "Malviya Heights", monthlyRent: 10000, gender: "Co-Ed", propertyType: "Apartment", locality: "Malviya Nagar" },
    { _id: "prop18", property_name: "Student Paradise", monthlyRent: 8000, gender: "Male", propertyType: "PG", locality: "Malviya Nagar" }
  ],
  vaishali: [
    { _id: "prop19", property_name: "Vaishali Living", monthlyRent: 9500, gender: "Female", propertyType: "PG", locality: "Vaishali Nagar" }
  ],
  mansarovar: [
    { _id: "prop20", property_name: "Mansarovar Plaza", monthlyRent: 11000, gender: "Co-Ed", propertyType: "Apartment", locality: "Mansarovar" }
  ],
  campus: [
    { _id: "prop21", property_name: "North Campus PG", monthlyRent: 12000, gender: "Male", propertyType: "PG", locality: "North Campus" },
    { _id: "prop22", property_name: "Campus Heights", monthlyRent: 15000, gender: "Co-Ed", propertyType: "Apartment", locality: "North Campus" }
  ],
  south: [
    { _id: "prop23", property_name: "South Delhi Luxury", monthlyRent: 18000, gender: "Female", propertyType: "Apartment", locality: "South Delhi" }
  ],
  east: [
    { _id: "prop24", property_name: "East Delhi Living", monthlyRent: 10000, gender: "Male", propertyType: "PG", locality: "East Delhi" }
  ],
  west: [
    { _id: "prop25", property_name: "West Delhi Stay", monthlyRent: 9000, gender: "Co-Ed", propertyType: "Co-living", locality: "West Delhi" }
  ],
  andheri: [
    { _id: "prop26", property_name: "Andheri Central", monthlyRent: 20000, gender: "Co-Ed", propertyType: "Apartment", locality: "Andheri" }
  ],
  bandra: [
    { _id: "prop27", property_name: "Bandra Heights", monthlyRent: 25000, gender: "Female", propertyType: "Apartment", locality: "Bandra" }
  ],
  powai: [
    { _id: "prop28", property_name: "Powai Tech Hub", monthlyRent: 18000, gender: "Male", propertyType: "PG", locality: "Powai" }
  ]
};

export default function WebsiteFastBidding() {
  const [selectedIds, setSelectedIds] = useState<any[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successCount, setSuccessCount] = useState(0);

  const [form, setForm] = useState({
    fullName: "",
    gmail: "",
    gender: "",
    city: "",
    area: "",
    minPrice: "",
    maxPrice: ""
  });

  const handleFormChange = (event: any) => {
    const { id, value } = event.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const toggleProperty = (propertyId: any) => {
    setSelectedIds((prev) => {
      if (prev.includes(propertyId)) return prev.filter((id) => id !== propertyId);
      return [...prev, propertyId];
    });
  };

  const validateForm = () => {
    if (!form.fullName.trim()) return false;
    if (!form.gmail.trim() || !form.gmail.includes("@")) return false;
    if (!form.gender) return false;
    if (!form.city || !form.area) return false;
    if (!form.minPrice || !form.maxPrice) return false;
    if (parseInt(form.minPrice, 10) > parseInt(form.maxPrice, 10)) return false;
    return true;
  };

  const submitBids = async (event: any) => {
    event.preventDefault();
    if (!validateForm()) {
      alert("Please fill in all required fields correctly");
      return;
    }

    if (selectedIds.length === 0) {
      alert("Please select at least one property to bid on");
      return;
    }

    setShowSuccessModal(true);
    setSuccessCount(selectedIds.length);

    // Simulate API call
    setTimeout(() => {
      console.log("Bids submitted for properties:", selectedIds);
    }, 1000);
  };

  // Get current areas based on selected city
  const currentAreas = mockAreas[form.city as keyof typeof mockAreas] || [];
  
  // Get current properties based on selected area
  const currentProperties = mockProperties[form.area as keyof typeof mockProperties] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/website/index" className="font-bold text-xl bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
            <Zap className="w-6 h-6 text-teal-600" />
            Roomhy Fast Bidding
          </a>
          <a href="/website/index" className="text-gray-600 hover:text-teal-600 inline-flex items-center text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Quick Bidding Form</h1>
                <p className="text-gray-600 mt-1">Fill in your details to find matching properties and send bids to multiple owners</p>
              </div>
            </div>
            <span className="text-sm font-bold text-teal-600 bg-gradient-to-r from-teal-50 to-blue-50 px-4 py-2 rounded-full border border-teal-200">Step 1 of 1</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 mb-8 border border-gray-100">
          <form onSubmit={submitBids}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3">Full Name *</label>
                <input 
                  type="text" 
                  id="fullName" 
                  value={form.fullName} 
                  onChange={handleFormChange} 
                  placeholder="Enter your full name" 
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3">Email Address *</label>
                <input 
                  type="email" 
                  id="gmail" 
                  value={form.gmail} 
                  onChange={handleFormChange} 
                  placeholder="your.email@example.com" 
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" 
                  required 
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-800 mb-3">Gender *</label>
              <select 
                id="gender" 
                className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-gray-50 hover:bg-white" 
                required 
                value={form.gender} 
                onChange={handleFormChange}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">This helps us show matching properties</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3">Select City *</label>
                <select 
                  id="city" 
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-gray-50 hover:bg-white" 
                  required 
                  value={form.city} 
                  onChange={handleFormChange}
                >
                  <option value="">Select a city</option>
                  {mockCities.map((city: any) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-2">Choose from available cities</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3">Select Area *</label>
                <select 
                  id="area" 
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-gray-50 hover:bg-white" 
                  required 
                  value={form.area} 
                  onChange={handleFormChange}
                >
                  <option value="">{form.city ? "Select an area" : "First select a city"}</option>
                  {currentAreas.map((area: any) => (
                    <option key={area._id} value={area._id}>
                      {area.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-2">Choose from available areas</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3">Minimum Price Range (₹) *</label>
                <input 
                  type="number" 
                  id="minPrice" 
                  value={form.minPrice} 
                  onChange={handleFormChange} 
                  placeholder="Min price" 
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" 
                  min="1000" 
                  step="500" 
                  required 
                />
                <p className="text-xs text-gray-500 mt-2">Minimum expected rent</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3">Maximum Price Range (₹) *</label>
                <input 
                  type="number" 
                  id="maxPrice" 
                  value={form.maxPrice} 
                  onChange={handleFormChange} 
                  placeholder="Max price" 
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" 
                  min="1000" 
                  step="500" 
                  required 
                />
                <p className="text-xs text-gray-500 mt-2">Maximum expected rent</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Properties Found in Your Area</h3>
              </div>
              {currentProperties.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Inbox className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No properties found. Try adjusting your filters.</p>
                </div>
              )}
              <div className="space-y-3">
                {currentProperties.map((prop: any) => {
                  const propertyId = prop._id;
                  const propertyName = prop.property_name;
                  const rent = prop.monthlyRent;
                  const gender = prop.gender;
                  const propertyType = prop.propertyType;
                  const isSelected = selectedIds.includes(propertyId);
                  return (
                    <div 
                      key={propertyId} 
                      className={`border rounded-xl p-4 cursor-pointer transition-all ${
                        isSelected 
                          ? "border-teal-500 bg-teal-50 shadow-lg" 
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`} 
                      onClick={() => toggleProperty(propertyId)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg">{propertyName}</h4>
                          <p className="text-sm text-gray-600 mt-1 flex items-center">
                            <Hash className="w-3 h-3 mr-1" />
                            Property #{propertyId}
                          </p>
                          <div className="flex gap-4 mt-3 text-sm">
                            <span className="font-bold text-teal-600">₹{rent}/month</span>
                            <span className="text-gray-600">{gender}</span>
                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                              {propertyType}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                            checked={isSelected}
                            onChange={() => toggleProperty(propertyId)}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 flex gap-3">
              <button 
                type="reset" 
                onClick={() => setForm({ fullName: "", gmail: "", gender: "", city: "", area: "", minPrice: "", maxPrice: "" })} 
                className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-200 transition-all"
              >
                Clear Form
              </button>
              <button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Bids to All Matching Properties
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-1">How It Works</h4>
                <p className="text-sm text-blue-800">Your bid will be sent to all property owners matching your criteria. Owners will review and can accept or counter your bid.</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-green-900 mb-1">Secure & Safe</h4>
                <p className="text-sm text-green-800">Your phone number will only be shared after the owner accepts your bid. No direct contact until agreement.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm">© 2025 Roomhy. Your trusted student accommodation platform.</p>
        </div>
      </footer>

      <div className={`fixed inset-0 bg-black/50 items-center justify-center z-50 p-4 ${showSuccessModal ? "flex" : "hidden"}`}>
        <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bid Sent Successfully!</h2>
            <p className="text-gray-600 text-sm">Your bid has been sent to all matching property owners.</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600"><strong>Bids sent to:</strong> <span className="text-teal-600 font-bold">{successCount}</span> properties</p>
            <p className="text-sm text-gray-600 mt-2">Property owners will review your bid and respond within 24 hours.</p>
          </div>
          <button 
            onClick={() => setShowSuccessModal(false)} 
            className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
