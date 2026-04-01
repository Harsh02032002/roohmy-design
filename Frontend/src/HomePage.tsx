import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, BadgeCheck, TrendingUp } from 'lucide-react';
import HowRoomhyWorks from './components/HowRoomhyWorks';
import WhyRoomhy from './components/WhyRoomhy';
import FindYourHome from './components/FindYourHome';
import WhyStudentsChooseUs from './components/WhyStudentsChooseUs';
import WebsiteNavbar from './components/WebsiteNavbar';
import WebsiteFooter from './components/WebsiteFooter';

export default function HomePage() {
  const cities = [
    { name: 'Kota', properties: '2,500+', image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Indore', properties: '1,800+', image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Jaipur', properties: '3,200+', image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Delhi', properties: '5,000+', image: 'https://images.pexels.com/photos/789380/pexels-photo-789380.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Bhopal', properties: '1,200+', image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Nagpur', properties: '980+', image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Jodhpur', properties: '850+', image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Mumbai', properties: '4,500+', image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

  const offerings = [
    {
      title: 'PG',
      category: 'PG',
      description: 'Comfortable paying guest accommodations with all amenities',
      image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'Hostel',
      category: 'Hostel',
      description: 'Affordable hostel living for students and working professionals',
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'Co-living',
      category: 'Co-living',
      description: 'Modern co-living spaces with community and facilities',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'Apartment/Flats',
      category: 'Apartment',
      description: 'Private apartments for individuals and small groups',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
  ];

  const featuredProperties = [
    {
      name: 'Sunrise PG',
      location: 'Kota, Rajasthan',
      price: '₹6,500',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Elite Hostel',
      location: 'Indore, MP',
      price: '₹5,200',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Urban Co-Space',
      location: 'Jaipur, Rajasthan',
      price: '₹8,900',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Campus View PG',
      location: 'Delhi NCR',
      price: '₹7,800',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
  ];

  const liveBiddingProperties = [
    {
      name: 'Sunrise PG',
      location: 'Kota',
      price: '₹6,500',
      currentBid: '₹6,200',
      timeLeft: '2h 15m',
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Elite Hostel',
      location: 'Indore',
      price: '₹5,200',
      currentBid: '₹5,100',
      timeLeft: '45m',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Urban Co-Space',
      location: 'Jaipur',
      price: '₹8,900',
      currentBid: '₹8,500',
      timeLeft: '1h 30m',
      image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      girlsOnly: true
    },
  ];

  // Hero image slideshow state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494203484021-3c454daf695d?q=80&w=2070&auto=format&fit=crop'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <WebsiteNavbar />

      <main className="min-h-screen">
        {/* Hero Section - Enhanced with Slideshow */}
        <div className="relative h-[380px] bg-gradient-to-br from-teal-600 via-blue-600 to-cyan-500 overflow-hidden">
          {/* Background Images with Fade Effect */}
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            </div>
          ))}

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-start pt-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight text-center">
              Find Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Student Stay</span>
            </h1>

            <p className="text-lg md:text-xl text-white/95 mb-6 max-w-4xl mx-auto leading-relaxed text-center">
              Search verified PGs, hostels & co-living spaces across 50+ Indian cities with real-time bidding
            </p>

            <div className="max-w-4xl mx-auto w-full">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-4 flex flex-col md:flex-row gap-2">
                <div className="relative">
                  <select className="appearance-none bg-teal-50 text-gray-700 px-4 py-4 pr-10 rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer min-w-[120px]">
                    <option value="PG">PG</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Co-living">Co-living</option>
                    <option value="Apartment">Apartment</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 flex items-center px-5 py-4 bg-gray-50 rounded-2xl">
                  <Search className="w-6 h-6 text-gray-400 mr-4" />
                  <input
                    type="text"
                    placeholder="Search for PG, Hostel, or City..."
                    className="flex-1 bg-transparent outline-none text-gray-700 text-lg placeholder-gray-400"
                  />
                </div>
                <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:scale-105">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* What We Offer - Enhanced */}
        <section id="explore" className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Choose from a variety of accommodation types tailored for students</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {offerings.map((offering) => {
                let linkPath = '/';
                if (offering.category === 'PG') linkPath = '/pg';
                else if (offering.category === 'Hostel') linkPath = '/hostel';
                else if (offering.category === 'Co-living') linkPath = '/coliving';
                else if (offering.category === 'Apartment') linkPath = '/apartment';
                return (
                  <Link
                    key={offering.title}
                    to={linkPath}
                    className="group text-left bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-teal-500 block border border-gray-100 hover:border-teal-200 transform hover:-translate-y-1"
                  >
                    <div className="h-52 overflow-hidden">
                      <img
                        src={offering.image}
                        alt={offering.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-7">
                      <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">{offering.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{offering.description}</p>
                      <span className="inline-flex items-center text-teal-600 font-semibold text-sm group-hover:text-teal-700 transition-colors">
                        View {offering.category}
                        <TrendingUp className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trending Stays - Enhanced */}
        <section className="py-8 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Trending Stays This Week</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Most popular properties among students right now</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProperties.map((property) => (
                <div key={property.name} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 hover:border-teal-200 transform hover:-translate-y-1">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {property.verified && (
                      <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-2 flex items-center space-x-2 shadow-lg">
                        <BadgeCheck className="w-4 h-4 text-teal-600" />
                        <span className="text-xs font-bold text-gray-800">Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">{property.name}</h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">{property.location}</span>
                    </div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-2xl font-bold text-teal-600">{property.price}<span className="text-sm text-gray-500 font-normal">/month</span></span>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-gray-700">{property.rating}</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                      Bid Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety First - NEW SECTION */}
        <section className="py-8 bg-gradient-to-br from-teal-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">🛡️ Safety First - Because Your Peace Matters</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Your safety is our top priority with comprehensive security measures</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-teal-200 transform hover:-translate-y-1 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-4">Verified Properties</h3>
                <p className="text-gray-600 leading-relaxed">All properties are verified and background checked</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-teal-200 transform hover:-translate-y-1 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-4">Secure Payments</h3>
                <p className="text-gray-600 leading-relaxed">Safe and secure online payment gateway</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-teal-200 transform hover:-translate-y-1 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-4">24/7 Support</h3>
                <p className="text-gray-600 leading-relaxed">Round the clock customer support</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-teal-200 transform hover:-translate-y-1 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-4">Quality Assurance</h3>
                <p className="text-gray-600 leading-relaxed">Regular quality checks and maintenance</p>
              </div>
            </div>
          </div>
        </section>

        <WhyRoomhy />

        <FindYourHome />

        <WhyStudentsChooseUs />

        <HowRoomhyWorks />

        {/* Trusted by Students - Testimonials Section */}
        <section className="py-8 bg-gradient-to-br from-teal-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by 10,000+ Students</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">See what students say about their experience with Roomhy</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100">
                <h3 className="text-3xl md:text-4xl font-bold text-teal-600">50K+</h3>
                <p className="text-gray-500 mt-2">Happy Students</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100">
                <h3 className="text-3xl md:text-4xl font-bold text-blue-600">10K+</h3>
                <p className="text-gray-500 mt-2">Verified Properties</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100">
                <h3 className="text-3xl md:text-4xl font-bold text-cyan-600">200+</h3>
                <p className="text-gray-500 mt-2">Cities Served</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100">
                <h3 className="text-3xl md:text-4xl font-bold text-orange-500">100%</h3>
                <p className="text-gray-500 mt-2">Brokerage Free</p>
              </div>
            </div>

            {/* Testimonial Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    R
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900">Rahul Sharma</h4>
                    <p className="text-sm text-gray-500">Kota, Rajasthan</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">"Roomhy made my search for a PG in Kota so easy! No brokerage, verified properties, and the bidding feature helped me get a great deal. Highly recommended!"</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    P
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900">Priya Patel</h4>
                    <p className="text-sm text-gray-500">Indore, MP</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">"Found a perfect hostel near my college in just 2 days! The direct chat with owners feature is amazing. Saved me so much time and money. Thank you Roomhy!"</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    A
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900">Amit Kumar</h4>
                    <p className="text-sm text-gray-500">Jaipur, Rajasthan</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">"Best platform for students! The bidding system is genius - I got my apartment at ₹2000 less than the asking price. Zero brokerage and verified listings. 10/10!"</p>
              </div>
            </div>
          </div>
        </section>

      </main>

        <WebsiteFooter />

      {/* Floating BidNow Button - Follows on scroll */}
      <a 
        href="/website/fast-bidding" 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition-all flex items-center gap-2 shadow-xl hover:scale-110 border-2 border-white"
        style={{ position: 'fixed', bottom: '24px' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>BidNow</span>
      </a>
    </div>
  );
}
