import React, { useState, useEffect, useCallback } from "react";
import HowRoomhyWorks from "../../components/HowRoomhyWorks";

// Custom hook for navigation history
function useNavigationHistory() {
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    // Initialize with current path on mount
    const currentPath = window.location.pathname;
    setHistory([currentPath]);
    setCurrentIndex(0);
  }, []);

  const push = useCallback((path) => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, currentIndex + 1);
      const updated = [...newHistory, path];
      setCurrentIndex(updated.length - 1);
      return updated;
    });
  }, [currentIndex]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      const path = history[newIndex];
      window.location.href = path;
      return path;
    }
    return null;
  }, [history, currentIndex]);

  const goNext = useCallback(() => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      const path = history[newIndex];
      window.location.href = path;
      return path;
    }
    return null;
  }, [history, currentIndex]);

  const canGoBack = currentIndex > 0;
  const canGoNext = currentIndex < history.length - 1;

  return { push, goBack, goNext, canGoBack, canGoNext, currentPath: history[currentIndex] };
}

// Sample properties data for the listing module
const sampleProperties = [
  {
    id: 1,
    name: "Sunrise PG",
    city: "Kota",
    area: "Central Kota",
    type: "PG",
    price: 6500,
    rating: 4.8,
    image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600",
    verified: true,
  },
  {
    id: 2,
    name: "Elite Hostel",
    city: "Indore",
    area: "Scheme No 54",
    type: "Hostel",
    price: 5200,
    rating: 4.6,
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600",
    verified: true,
  },
  {
    id: 3,
    name: "Urban Co-Space",
    city: "Jaipur",
    area: "Malviya Nagar",
    type: "Co-living",
    price: 8900,
    rating: 4.9,
    image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600",
    verified: true,
  },
  {
    id: 4,
    name: "Campus View PG",
    city: "Delhi",
    area: "Dwarka",
    type: "PG",
    price: 7800,
    rating: 4.7,
    image: "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=600",
    verified: true,
  },
  {
    id: 5,
    name: "Modern Apartment",
    city: "Mumbai",
    area: "Andheri",
    type: "Apartment",
    price: 15000,
    rating: 4.5,
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
    verified: true,
  },
  {
    id: 6,
    name: "Budget Hostel",
    city: "Bhopal",
    area: "MP Nagar",
    type: "Hostel",
    price: 4500,
    rating: 4.3,
    image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600",
    verified: true,
  },
];

export default function WebsiteIndex() {
  const { push, goBack, goNext, canGoBack, canGoNext } = useNavigationHistory();
  
  // State for property listing filters
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedArea, setSelectedArea] = useState("All");
  
  // Get unique cities and areas
  const cities = ["All", ...Array.from(new Set(sampleProperties.map(p => p.city)))];
  const areas = ["All", ...Array.from(new Set(sampleProperties.map(p => p.area)))];
  const types = ["All", "PG", "Hostel", "Co-living", "Apartment"];
  
  // Filter properties
  const filteredProperties = sampleProperties.filter(property => {
    const matchCity = selectedCity === "All" || property.city === selectedCity;
    const matchType = selectedType === "All" || property.type === selectedType;
    const matchArea = selectedArea === "All" || property.area === selectedArea;
    return matchCity && matchType && matchArea;
  });

  useEffect(() => {
    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <div className="html-page">
      <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex h-20 items-center justify-between">
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <button 
                  onClick={goBack}
                  disabled={!canGoBack}
                  className={`p-2 rounded-md transition-colors ${canGoBack ? 'hover:bg-gray-100 text-gray-600' : 'text-gray-300 cursor-not-allowed'}`}
                  title="Go Back"
                >
                  <i data-lucide="chevron-left" className="w-5 h-5"></i>
                </button>
                <button 
                  onClick={goNext}
                  disabled={!canGoNext}
                  className={`p-2 rounded-md transition-colors ${canGoNext ? 'hover:bg-gray-100 text-gray-600' : 'text-gray-300 cursor-not-allowed'}`}
                  title="Go Forward"
                >
                  <i data-lucide="chevron-right" className="w-5 h-5"></i>
                </button>
              </div>
              <a href="#" className="flex-shrink-0">
                <img src="https://res.cloudinary.com/dpwgvcibj/image/upload/v1768990260/roomhy/website/logoroomhy.png" alt="Roomhy Logo" className="h-10 w-25" />
              </a>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Desktop Navigation with Properties and FAQ */}
              <nav className="hidden lg:flex items-center space-x-6">
                <a href="#properties" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Properties</a>
                <a href="#faq" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">FAQ</a>
                <a href="/website/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</a>
                <a href="/website/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</a>
              </nav>

              <a href="/website/list" className="flex-shrink-0 flex items-center justify-center px-3 sm:px-4 py-2 rounded-md text-sm font-semibold transition-colors w-10 h-10 sm:w-auto sm:h-auto sm:px-4">
                <span className="text-3xl font-bold">+</span>
              </a>
              
              <button id="menu-toggle" className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                <i data-lucide="menu" className="w-7 h-7 text-gray-800"></i>
              </button>
            </div>

          </div>
        </div>
      </header>

      <section className="relative py-20 md:py-28 text-white">
        <div id="hero-image-wrapper" className="absolute inset-0 w-full h-full overflow-hidden">
          <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop" alt="Hero background 1" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out animate-kenburns opacity-100" />
          <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" alt="Hero background 2" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out animate-kenburns opacity-0" />
          <img src="https://images.unsplash.com/photo-1494203484021-3c454daf695d?q=80&w=2070&auto=format&fit=crop" alt="Hero background 3" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out animate-kenburns opacity-0" />
          <div className="absolute inset-0 w-full h-full bg-black/60"></div> 
        </div>

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h1 className="text-1l md:text-4xl font-bold text-shadow mb-6" style={{ color: "#fffcf2" }}>
            SEARCH.CONNECT.SUCCEED
          </h1>
          <div className="relative w-full max-w-2xl mx-auto">
            <input type="text" id="hero-search-input" placeholder="Search for 'PG near me' or 'Hostel in Kota'" className="w-full p-4 pl-5 pr-14 rounded-md bg-white text-gray-900 border-transparent focus:ring-4 focus:ring-cyan-300/50 focus:outline-none placeholder-gray-500 shadow-lg" />
            <button type="submit" id="hero-search-btn" className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
              <i data-lucide="search" className="w-5 h-5 text-white"></i>
            </button>
          </div>
        </div>
      </section>

      <div id="menu-overlay" className="fixed inset-0 bg-black/50 z-40 hidden"></div>
      
      <div id="mobile-menu" className="fixed top-0 right-0 w-80 h-full bg-white z-50 shadow-xl transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col">
        <div className="flex justify-end p-4 flex-shrink-0">
          <button id="menu-close" className="p-2">
            <i data-lucide="x" className="w-6 h-6 text-gray-700"></i>
          </button>
        </div>

        <div id="menu-logged-in" className="hidden">
          <div className="flex justify-between items-center px-6 py-2">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <i data-lucide="user" className="w-6 h-6 text-white"></i>
              </div>
              <div>
                <span className="text-lg font-semibold text-gray-800" id="welcomeUserName">Hi,welcome</span>
                <p className="text-xs text-gray-500" id="userIdDisplay"></p>
              </div>
            </div>
            <a href="/website/profile" className="text-sm font-medium text-blue-600 hover:underline">Profile</a>
          </div>

          <div className="px-6 py-4">
            <div className="border border-blue-200 rounded-md p-4 relative overflow-hidden">
              <p className="font-semibold text-gray-800 mb-3 relative z-10">Looking to Sell/Rent your Property?</p>
              <a href="/website/list" className="block text-center w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-4 rounded-md text-sm transition-colors relative z-10">
                Post Property for Free
              </a>
            </div>
          </div>

          <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
            <a href="#properties" className="flex items-center space-x-4 p-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="building" className="w-5 h-5 text-green-600"></i>
              </div>
              <span>Properties</span>
            </a>
            <a href="#faq" className="flex items-center space-x-4 p-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="help-circle" className="w-5 h-5 text-yellow-600"></i>
              </div>
              <span>FAQ</span>
            </a>
            <a href="/website/ourproperty" className="flex items-center space-x-4 p-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="home" className="w-5 h-5 text-blue-600"></i>
              </div>
              <span>Our Properties</span>
            </a>
            <a href="/website/fav" className="flex items-center space-x-4 p-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="heart" className="w-5 h-5 text-red-600"></i>
              </div>
              <span>Favorites</span>
            </a>
            <a href="/website/mystays" className="flex items-center space-x-4 p-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="building" className="w-5 h-5 text-purple-600"></i>
              </div>
              <span>My Stays</span>
            </a>
            <a href="/website/about" className="flex items-center space-x-4 p-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="info" className="w-5 h-5 text-yellow-600"></i>
              </div>
              <span>About Us</span>
            </a>
            <a href="/website/contact" className="flex items-center space-x-4 p-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="phone" className="w-5 h-5 text-cyan-600"></i>
              </div>
              <span>Contact Us</span>
            </a>
            <a href="/website/websitechat" className="flex items-center space-x-4 p-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="message-circle" className="w-5 h-5 text-green-600"></i>
              </div>
              <span>Chat</span>
            </a>
          </nav>
          
          <div className="p-4 border-t flex-shrink-0">
            <button onClick={function(event) { try { return Function('event', "globalLogout()").call(event.currentTarget, event); } catch (err) { console.error(err); } }} className="w-full flex items-center space-x-4 p-3 rounded-md text-red-600 hover:bg-red-50">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="log-out" className="w-5 h-5 text-gray-600"></i>
              </div>
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div id="menu-logged-out" className="flex flex-col h-full">
          <div className="flex-grow p-4 space-y-1 overflow-y-auto">
            <a href="#properties" className="flex items-center space-x-4 p-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="building" className="w-5 h-5 text-green-600"></i>
              </div>
              <span>Properties</span>
            </a>
            <a href="#faq" className="flex items-center space-x-4 p-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="help-circle" className="w-5 h-5 text-yellow-600"></i>
              </div>
              <span>FAQ</span>
            </a>
            <a href="/website/about" className="flex items-center space-x-4 p-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="info" className="w-5 h-5 text-yellow-600"></i>
              </div>
              <span>About Us</span>
            </a>
            <a href="/website/contact" className="flex items-center space-x-4 p-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="phone" className="w-5 h-5 text-cyan-600"></i>
              </div>
              <span>Contact Us</span>
            </a>
          </div>
          
          <div className="p-4 space-y-3 border-t flex-shrink-0">
            <a href="/website/signup" className="block w-full text-center bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              <i data-lucide="log-in" className="w-4 h-4 inline mr-2"></i>
              Login
            </a>
            <a href="/website/signup" className="block w-full text-center border-2 border-blue-600 text-blue-600 font-medium py-2 px-4 rounded-md hover:bg-blue-50 transition-colors">
              <i data-lucide="user-plus" className="w-4 h-4 inline mr-2"></i>
              Sign Up
            </a>
          </div>
        </div>
      </div>

      {/* Properties Section with Filtering */}
      <section id="properties" className="container mx-auto px-4 sm:px-6 py-12">
        <div className="light-card rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Property Listings</h2>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select 
                value={selectedType} 
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type === "All" ? "Room Type" : type}</option>
                ))}
              </select>
              
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city === "All" ? "City" : city}</option>
                ))}
              </select>
              
              <select 
                value={selectedArea} 
                onChange={(e) => setSelectedArea(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {areas.map(area => (
                  <option key={area} value={area}>{area === "All" ? "Area" : area}</option>
                ))}
              </select>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-4">
            {filteredProperties.length} properties found
          </p>
          
          {/* Properties Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <a 
                key={property.id} 
                href={`/website/ourproperty?id=${property.id}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {property.verified && (
                    <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center space-x-1 shadow-lg">
                      <i data-lucide="badge-check" className="w-4 h-4 text-blue-600"></i>
                      <span className="text-xs font-bold text-gray-800">Verified</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <span className="text-white text-sm font-medium">{property.type}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{property.name}</h3>
                    <div className="flex items-center space-x-1">
                      <i data-lucide="star" className="w-4 h-4 fill-yellow-400 text-yellow-400"></i>
                      <span className="text-sm font-medium text-gray-700">{property.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-2 flex items-center">
                    <i data-lucide="map-pin" className="w-4 h-4 mr-1"></i>
                    {property.area}, {property.city}
                  </p>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-lg font-bold text-blue-600">₹{property.price.toLocaleString()}<span className="text-sm text-gray-500 font-normal">/month</span></span>
                    <span className="text-blue-600 text-sm font-medium group-hover:underline">View Details →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <i data-lucide="search-x" className="w-12 h-12 text-gray-300 mx-auto mb-4"></i>
              <p className="text-gray-500">No properties found matching your filters.</p>
              <button 
                onClick={() => {setSelectedType("All"); setSelectedCity("All"); setSelectedArea("All");}}
                className="mt-4 text-blue-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <a href="/website/ourproperty" className="inline-flex items-center text-blue-600 font-semibold hover:underline">
              View All Properties
              <i data-lucide="arrow-right" className="w-4 h-4 ml-2"></i>
            </a>
          </div>
        </div>
      </section>

      <section id="top-cities-categories" className="container mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="bg-white py-4 shadow-lg rounded-2xl city-filter-container overflow-hidden"> 
          <h2 className="sr-only">Top Cities</h2>
          <div id="cities-category-slider" className="flex gap-4 md:gap-8 pb-2 scroll-smooth px-4 horizontal-slider overflow-x-auto">
          </div>
        </div>
      </section>
      
      <main className="container mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-16">
        <section id="offerings" className="light-card rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Our offering</h2>
          <div className="relative -m-2">
            <button id="offer-prev" className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 text-gray-700 sm:block">
              <i data-lucide="chevron-left" className="w-6 h-6"></i>
            </button>
            
            <div id="offerings-slider" className="flex gap-5 overflow-x-auto pb-2 pt-2 -mx-4 px-4 snap-x snap-mandatory scroll-smooth horizontal-slider" style={{ paddingLeft: "100px" }}>
              <a href="/website/ourproperty?type=hostel" className="group block flex-shrink-0 snap-start w-102 md:w-164 lg:w-172 offering-card-item">
                <div className="relative rounded-xl shadow-md hover:shadow-lg overflow-hidden h-40 sm:h-44 cursor-pointer offering-card transition-shadow duration-300">
                  <img src="https://res.cloudinary.com/dpwgvcibj/image/upload/v1768990227/roomhy/website/angels-hostel-taipei-taiwan-9.jpg" className="w-550px h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Hostel" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white text-center text-sm sm:text-base font-bold leading-tight">Hostel</h3>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white text-center text-sm sm:text-base font-bold leading-tight mb-2">Hostel</h3>
                      <p className="text-white/90 text-center text-xs sm:text-sm leading-relaxed">Affordable shared spaces with all essentials covered.</p>
                    </div>
                  </div>
                  <div className="hidden sm:block absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                    <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <i data-lucide="chevron-right" className="w-3 h-3 text-white"></i>
                    </div>
                  </div>
                </div>
              </a>

              <a href="/website/ourproperty?type=pg" className="group block flex-shrink-0 snap-start w-102 md:w-164 lg:w-172 offering-card-item">
                <div className="relative rounded-xl shadow-md hover:shadow-lg overflow-hidden h-40 sm:h-44 cursor-pointer offering-card transition-shadow duration-300">
                  <img src="https://res.cloudinary.com/dpwgvcibj/image/upload/v1768990226/roomhy/website/401230348.jpg" className="w-550px h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="PG" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white text-center text-sm sm:text-base font-bold leading-tight">PG</h3>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white text-center text-sm sm:text-base font-bold leading-tight mb-2">PG</h3>
                      <p className="text-white/90 text-center text-xs sm:text-sm leading-relaxed">Comfortable living with meals and best locations.</p>
                    </div>
                  </div>
                  <div className="hidden sm:block absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                    <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <i data-lucide="chevron-right" className="w-3 h-3 text-white"></i>
                    </div>
                  </div>
                </div>
              </a>

              <a href="/website/ourproperty?type=apartment" className="group block flex-shrink-0 snap-start w-102 md:w-164 lg:w-172 offering-card-item">
                <div className="relative rounded-xl shadow-md hover:shadow-lg overflow-hidden h-40 sm:h-44 cursor-pointer offering-card transition-shadow duration-300">
                  <img src="https://res.cloudinary.com/dpwgvcibj/image/upload/v1768990264/roomhy/website/pg.jpg" className="w-550px h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Apartment" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white text-center text-sm sm:text-base font-bold leading-tight">Apartment</h3>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white text-center text-sm sm:text-base font-bold leading-tight mb-2">Apartment</h3>
                      <p className="text-white/90 text-center text-xs sm:text-sm leading-relaxed">Private living spaces with complete independence.</p>
                    </div>
                  </div>
                  <div className="hidden sm:block absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                    <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <i data-lucide="chevron-right" className="w-3 h-3 text-white"></i>
                    </div>
                  </div>
                </div>
              </a>

              <a href="/website/list" className="group block flex-shrink-0 snap-start w-full md:w-64 lg:w-72 offering-card-item">
                <div className="relative rounded-xl shadow-md hover:shadow-lg overflow-hidden h-40 sm:h-44 cursor-pointer offering-card transition-shadow duration-300">
                  <img src="https://res.cloudinary.com/dpwgvcibj/image/upload/v1768990266/roomhy/website/post.png" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="List Your Property" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white text-center text-sm sm:text-base font-bold leading-tight">List Your Property</h3>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-700/90 via-blue-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white text-center text-sm sm:text-base font-bold leading-tight mb-2">List Your Property</h3>
                      <p className="text-white/90 text-center text-xs sm:text-sm leading-relaxed">Reach thousands of verified tenants instantly.</p>
                    </div>
                  </div>
                  <div className="hidden sm:block absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                    <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <i data-lucide="chevron-right" className="w-3 h-3 text-white"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            
            <button id="offer-next" className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 text-gray-700 sm:block">
              <i data-lucide="chevron-right" className="w-6 h-6"></i>
            </button>
          </div>
        </section>    

        <HowRoomhyWorks />

        {/* FAQ Section */}
        <section id="faq" className="scroll-mt-20 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 lg:sticky lg:top-24">
                  Frequently Asked Questions?
                </h2>
                <p className="text-lg text-gray-500 hidden lg:block">Everything you need to know about finding your perfect home with Roomhy.</p>
              </div>
              
              <div className="lg:col-span-8 space-y-2">
                <div className="faq-item bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="faq-question flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                    <span className="font-medium text-gray-900">What is Roomhy and how does it work?</span>
                    <i data-lucide="chevron-down" className="chevron w-5 h-5 text-gray-500 transition-transform"></i>
                  </div>
                  <div className="faq-answer px-4 pb-4 hidden">
                    <p className="text-gray-600">Roomhy is a student accommodation platform that connects students directly with verified property owners. You search, shortlist, and book properties like PG, hostels, and apartments without paying any brokerage fees. Our bidding feature also allows you to secure the best possible rental price.</p>
                  </div>
                </div>
                
                <div className="faq-item bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="faq-question flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                    <span className="font-medium text-gray-900">Is Roomhy completely broker-free?</span>
                    <i data-lucide="chevron-down" className="chevron w-5 h-5 text-gray-500 transition-transform"></i>
                  </div>
                  <div className="faq-answer px-4 pb-4 hidden">
                    <p className="text-gray-600">Yes, absolutely. Our core promise is zero brokerage. We eliminate the middleman, ensuring you only pay the rent and a small, refundable security deposit directly to the property owner. This saves students thousands in commission fees.</p>
                  </div>
                </div>
                
                <div className="faq-item bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="faq-question flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                    <span className="font-medium text-gray-900">How do I place a bid on a property?</span>
                    <i data-lucide="chevron-down" className="chevron w-5 h-5 text-gray-500 transition-transform"></i>
                  </div>
                  <div className="faq-answer px-4 pb-4 hidden">
                    <p className="text-gray-600">When viewing a property, you can see the owner's expected price. You can then submit a 'bid' or offer that you are willing to pay. The owner can accept, reject, or counter your offer. This live bidding process helps you secure a better deal than fixed-price listings.</p>
                  </div>
                </div>
                
                <div className="faq-item bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="faq-question flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                    <span className="font-medium text-gray-900">What types of properties are listed on Roomhy?</span>
                    <i data-lucide="chevron-down" className="chevron w-5 h-5 text-gray-500 transition-transform"></i>
                  </div>
                  <div className="faq-answer px-4 pb-4 hidden">
                    <p className="text-gray-600">We offer a wide range of properties tailored for students, including: fully furnished Hostels (shared rooms, budget-friendly), PGs (Paying Guest accommodation with meals and services), and Apartments (private flats for independent living or sharing with friends).</p>
                  </div>
                </div>
                
                <div className="faq-item bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="faq-question flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                    <span className="font-medium text-gray-900">Can I view room availability in real-time?</span>
                    <i data-lucide="chevron-down" className="chevron w-5 h-5 text-gray-500 transition-transform"></i>
                  </div>
                  <div className="faq-answer px-4 pb-4 hidden">
                    <p className="text-gray-600">Yes, property owners are encouraged to keep their listings updated in real-time. You can filter properties based on immediate availability and expected move-in dates to ensure you only view options that suit your schedule.</p>
                  </div>
                </div>
                
                <div className="faq-item bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="faq-question flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                    <span className="font-medium text-gray-900">Do I have to pay to use Roomhy as a student?</span>
                    <i data-lucide="chevron-down" className="chevron w-5 h-5 text-gray-500 transition-transform"></i>
                  </div>
                  <div className="faq-answer px-4 pb-4 hidden">
                    <p className="text-gray-600">Searching, browsing, and contacting property owners through Roomhy is entirely free for students. Our revenue comes from value-added services offered to property owners, keeping the platform free and zero-brokerage for tenants.</p>
                  </div>
                </div>
                
                <div className="faq-item bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="faq-question flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                    <span className="font-medium text-gray-900">How is Roomhy different from regular rental websites?</span>
                    <i data-lucide="chevron-down" className="chevron w-5 h-5 text-gray-500 transition-transform"></i>
                  </div>
                  <div className="faq-answer px-4 pb-4 hidden">
                    <p className="text-gray-600">We are focused purely on student needs, ensuring all properties are near major educational hubs. We offer a unique bidding system, guarantee zero brokerage, and verify every listing to save you time and money compared to traditional, generalized rental sites.</p>
                  </div>
                </div>
                
                <div className="faq-item bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="faq-question flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                    <span className="font-medium text-gray-900">Is it safe to book a property on Roomhy?</span>
                    <i data-lucide="chevron-down" className="chevron w-5 h-5 text-gray-500 transition-transform"></i>
                  </div>
                  <div className="faq-answer px-4 pb-4 hidden">
                    <p className="text-gray-600">We prioritize your safety. Every property owner and listing is thoroughly verified by our team. The booking process is secure, and you only finalize the full payment after confirming the property details with the owner.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="why-roomhy" className="scroll-mt-20 light-card rounded-2xl p-6 md:p-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="text-left lg:order-2">
              <div className="animate-slide-in text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">Why Roomhy?</h2>
              </div>
              <div className="hidden lg:block animate-slide-in text-left mt-8">
                <p className="text-gray-600 mb-6 text-lg">Roomhy was built by students, for students. We experienced the chaos of finding a reliable place to live and knew there had to be a better way.</p>
                <p className="text-gray-600">We're more than a platform; we're your first friend in a new city, dedicated to helping you find a space where you can thrive.</p>
              </div>
            </div>
            <div className="w-full max-w-3xl mx-auto grid grid-cols-2 grid-rows-2 gap-4 mt-8 lg:mt-0 animate-slide-in lg:order-1" style={{ animationDelay: "0.2s" }}>
              <div className="row-span-2 col-span-1">
                <img src="https://res.cloudinary.com/dpwgvcibj/image/upload/v1768990242/roomhy/website/hostel1.png.jpg" className="h-full w-full object-cover rounded-2xl shadow-lg" alt="Modern student accommodation building" />
              </div>
              <div className="col-span-1">
                <img src="https://res.cloudinary.com/dpwgvcibj/image/upload/v1768990244/roomhy/website/hostel2.jpg" className="h-full w-full object-cover rounded-2xl shadow-lg" alt="Student common room with yellow chairs" />
              </div>
              <div className="col-span-1">
                <img src="https://res.cloudinary.com/dpwgvcibj/image/upload/v1768990245/roomhy/website/hostel3.jpg" className="h-full w-full object-cover rounded-2xl shadow-lg" alt="Bright and modern student room hallway" />
              </div>
            </div>
            <div className="lg:hidden animate-slide-in text-left mt-8">
              <p className="text-gray-600 mb-6 text-lg">Roomhy was built by students, for students. We experienced the chaos of finding a reliable place to live and knew there had to be a better way.</p>
              <p className="text-gray-600">We're more than a platform; we're your first friend in a new city, dedicated to helping you find a space where you can thrive.</p>
            </div>
          </div>
        </section>

        <section id="contact-us" className="scroll-mt-20 py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="connect-section max-w-5xl mx-auto rounded-3xl shadow-2xl relative grid lg:grid-cols-2">
              <div className="relative p-10 md:p-16 flex flex-col justify-center">
                <div className="wave-bg">
                  <svg className="wave-svg" viewBox="0 0 500 500" preserveAspectRatio="none">
                    <path d="M0,200 C150,350 350,50 500,200 L500,0 L0,0 Z" style={{ fill: "#f5f5f5" }}></path>
                    <path d="M0,250 C120,400 380,100 500,250 L500,0 L0,0 Z" style={{ fill: "#eeeeee", opacity: "0.5" }}></path>
                  </svg>
                </div>
                <div className="contact-content text-center lg:text-left">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                    Connect with Roomhy
                  </h2>
                  <p className="text-lg text-gray-600 max-w-sm mx-auto lg:mx-0">
                    Drop your concern, query or feedback and we will get back to you in no time.
                  </p>
                </div>
              </div>

              <div className="p-8 md:p-16 bg-white contact-content rounded-r-3xl">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input type="text" id="contact-name" name="contactName" className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" placeholder="Name" />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
                    <input type="tel" id="contact-phone" name="phone" className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" placeholder="Phone Number" />
                  </div>
                  <div>
                    <label htmlFor="contact-query" className="block text-sm font-semibold text-gray-700 mb-2">Query</label>
                    <textarea id="contact-query" name="query" rows="4" className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 resize-none" placeholder="Query/Concern"></textarea>
                  </div>
                  <div className="pt-4">
                    <button type="submit" className="w-full text-white font-bold py-3 rounded-md text-lg transition-all duration-300 send-button-gradient hover:opacity-90 shadow-lg hover:shadow-xl">
                      Send message
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-500 pt-2">
                    ** You'd hear from us in the next 24 hours, but if you don't, reach out at 
                    <a href="mailto:hello@roomhy.com" className="text-purple-600 font-medium hover:underline">hello@roomhy.com</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating BidNow Button - Sticky at bottom */}
      <a 
        href="/website/fast-bidding" 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition-all flex items-center gap-2 shadow-xl hover:scale-110 border-2 border-white"
        style={{ position: 'fixed', bottom: '24px' }}
      >
        <i data-lucide="zap" className="w-6 h-6"></i>
        <span>BidNow</span>
      </a>

      <button id="websiteChatBtn" className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110" aria-label="Open chat">
        <i data-lucide="message-circle" className="w-8 h-8"></i>
      </button>
      <div id="websiteChatModal" className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-md shadow-xl border border-gray-200 hidden flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <span className="font-bold text-gray-700">Chat with Owner</span>
          <button id="closeWebsiteChat" className="text-gray-400 hover:text-gray-700" title="Close chat"><i data-lucide="x" className="w-5 h-5"></i></button>
        </div>
        <div id="websiteChatMessages" className="flex-1 p-3 overflow-y-auto max-h-64 text-sm"></div>
        <div className="flex items-center border-t p-2">
          <input id="websiteChatInput" type="text" className="flex-1 border rounded px-2 py-1 mr-2" placeholder="Type a message..." />
          <button id="websiteChatSend" className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Send</button>
        </div>
      </div>
      
      <footer className="footer container mx-auto px-4 sm:px-6 mt-16">
        <div className="footer-main">
          <div className="footer-logo">
            <img src="https://placehold.co/180x40/0f172a/ffffff?text=Roomhy+Logo" alt="Roomhy Logo" />
            <p className="mt-4">Discover Your Next Home, Together. Zero Brokerage, Student-First Approach.</p>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><a href="/website/about">About Us</a></li>
              <li><a href="#featured">Featured Stays</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="/website/contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Top Cities</h4>
            <ul>
              <li><a href="/website/ourproperty?city=kota">Kota</a></li>
              <li><a href="/website/ourproperty?city=sikar">Sikar</a></li>
              <li><a href="/website/ourproperty?city=indore">Indore</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Support & Legal</h4>
            <div className="space-y-2">
              <p><i className="fas fa-phone"></i> +91 99830 05030</p>
              <p><i className="fas fa-envelope"></i> hello@roomhy.com</p>
            </div>
            <ul className="mt-4 space-y-1 text-sm">
              <li><a href="/website/terms">Terms & Conditions</a></li>
              <li><a href="/website/privacy">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className="footer-social lg:col-span-1">
            <a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" title="X"><i className="fab fa-x-twitter"></i></a>
            <a href="#" title="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        <div className="footer-bottom">
          <p> 2025 <strong>Roomhy</strong>. All Rights Reserved. Made for students, with love.</p>
        </div>
      </footer>
    </div>
  );
}
