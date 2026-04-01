import React from "react";
import { useHtmlPage } from "../../utils/htmlPage";

export default function WebsiteIndex() {
  useHtmlPage({
    title: "Roomhy - Find Your Student Home",
    bodyClass: "text-gray-800",
    htmlAttrs: {
      "lang": "en",
      "class": "scroll-smooth"
    },
    metas: [
      {
        "charset": "UTF-8"
      },
      {
        "name": "viewport",
        "content": "width=device-width, initial-scale=1.0"
      },
      {
        "name": "referrer",
        "content": "no-referrer-when-downgrade"
      }
    ],
    bases: [],
    links: [
      {
        "rel": "preconnect",
        "href": "https://fonts.googleapis.com"
      },
      {
        "rel": "preconnect",
        "href": "https://fonts.gstatic.com",
        "crossorigin": true
      },
      {
        "href": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
        "rel": "stylesheet"
      },
      {
        "rel": "stylesheet",
        "href": "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
        "crossorigin": "anonymous",
        "referrerpolicy": "no-referrer"
      },
      {
        "rel": "stylesheet",
        "href": "/website/assets/css/index.css"
      }
    ],
    styles: [],
    scripts: [
      {
        "src": "https://cdn.tailwindcss.com"
      },
      {
        "src": "https://unpkg.com/lucide@latest"
      }
    ],
    inlineScripts: []
  });

  const howItWorksSteps = [
    {
      number: 1,
      emoji: "🏠",
      title: "Place Your Bid",
      description: "Browse available properties and place your bid based on your budget. Compete with other tenants to secure the best space."
    },
    {
      number: 2,
      emoji: "✅",
      title: "Owner Accepts",
      description: "Property owners review all bids and select the most suitable tenant — not just based on price, but also profile and preferences."
    },
    {
      number: 3,
      emoji: "💬",
      title: "Chat & Confirm",
      description: "Once selected, connect instantly with the owner through in-app chat to discuss details, clarify doubts, and finalize terms."
    },
    {
      number: 4,
      emoji: "💳",
      title: "Pay ₹500 to Book",
      description: "Secure your booking by paying a small ₹500 token amount. Fully refundable if the property doesn't meet your expectations or explore similar nearby options."
    },
    {
      number: 5,
      emoji: "🏡",
      title: "Visit the Property",
      description: "Schedule a visit and check the property in person to ensure everything matches your expectations."
    },
    {
      number: 6,
      emoji: "🔑",
      title: "Move In",
      description: "Complete the remaining formalities, make the final payment, and move into your new home with confidence."
    }
  ];

  return (
    <div className="html-page">
      <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <a href="#" className="flex-shrink-0">
                <img src="https://res.cloudinary.com/dpwgvcibj/image/upload/v1768990260/roomhy/website/logoroomhy.png" alt="Roomhy Logo" className="h-10 w-25" />
              </a>
            </div>
            <div className="flex items-center gap-3 sm:gap-6">
              <nav className="hidden lg:flex items-center space-x-6">
                <a href="/website/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About Us</a>
                <a href="#faq" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">FAQ</a>
                <a href="/website/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</a>
              </nav>
              <div className="relative">
                <a href="/website/fast-bidding" id="fastBiddingBtn" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-semibold hover:shadow-lg transition-all flex items-center gap-1">
                  <i data-lucide="zap" className="w-4 h-4"></i> <span className="hidden sm:inline">Fast Bidding</span>
                </a>
                <div id="fastBiddingPopup" className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-56 bg-white rounded-xl shadow-2xl border border-blue-100 p-4 opacity-0 invisible transition-all duration-300 z-50 pointer-events-none">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-blue-100 rounded-sm transform rotate-45"></div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <i data-lucide="zap" className="w-6 h-6 text-blue-600"></i>
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">Fast Bidding</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">Find and bid property based on your budget</p>
                    <p className="text-blue-600 text-xs font-semibold mt-3">Click to explore →</p>
                  </div>
                </div>
              </div>
              <a href="/website/list" className="flex-shrink-0 flex items-center justify-center px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-colors w-10 h-10 sm:w-auto sm:h-auto sm:px-4">
                <span className="text-3xl font-bold">+</span>
              </a>
              <button id="menu-toggle" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <i data-lucide="menu" className="w-7 h-7 text-gray-800"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-20 md:py-28 text-white">
        <div id="hero-image-wrapper" className="absolute inset-0 w-full h-full overflow-hidden">
          <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto:format&fit=crop" alt="Hero background 1" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out animate-kenburns opacity-100" />
          <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto:format&fit=crop" alt="Hero background 2" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out animate-kenburns opacity-0" />
          <img src="https://images.unsplash.com/photo-1494203484021-3c454daf695d?q=80&w=2070&auto:format&fit=crop" alt="Hero background 3" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out animate-kenburns opacity-0" />
          <div className="absolute inset-0 w-full h-full bg-black/60"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-shadow mb-6" style={{ color: "#fffcf2" }}>
            SEARCH.CONNECT.SUCCEED
          </h1>
          <div className="relative w-full max-w-2xl mx-auto">
            <input type="text" id="hero-search-input" placeholder="Search for 'PG near me' or 'Hostel in Kota'" className="w-full p-4 pl-5 pr-14 rounded-lg bg-white text-gray-900 border-transparent focus:ring-4 focus:ring-cyan-300/50 focus:outline-none placeholder-gray-500 shadow-lg" />
            <button type="submit" id="hero-search-btn" className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
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
            <div className="border border-blue-200 rounded-lg p-4 relative overflow-hidden">
              <p className="font-semibold text-gray-800 mb-3 relative z-10">Looking to Sell/Rent your Property?</p>
              <a href="/website/list" className="block text-center w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-4 rounded-lg text-sm transition-colors relative z-10">
                Post Property for Free
              </a>
            </div>
          </div>
          <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
            <a href="/website/ourproperty" className="flex items-center space-x-4 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="home" className="w-5 h-5 text-blue-600"></i>
              </div>
              <span>Our Properties</span>
            </a>
            <a href="/website/fav" className="flex items-center space-x-4 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="heart" className="w-5 h-5 text-red-600"></i>
              </div>
              <span>Favorites</span>
            </a>
            <a href="/website/mystays" className="flex items-center space-x-4 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="building" className="w-5 h-5 text-purple-600"></i>
              </div>
              <span>My Stays</span>
            </a>
            <a href="/website/about" className="flex items-center space-x-4 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="info" className="w-5 h-5 text-yellow-600"></i>
              </div>
              <span>About Us</span>
            </a>
            <a href="/website/contact" className="flex items-center space-x-4 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="phone" className="w-5 h-5 text-cyan-600"></i>
              </div>
              <span>Contact Us</span>
            </a>
            <a href="/website/websitechat" className="flex items-center space-x-4 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="message-circle" className="w-5 h-5 text-green-600"></i>
              </div>
              <span>Chat</span>
            </a>
          </nav>
          <div className="p-4 border-t flex-shrink-0">
            <button onClick={function(event) { try { return Function('event', "globalLogout()").call(event.currentTarget, event); } catch (err) { console.error(err); } }} className="w-full flex items-center space-x-4 p-3 rounded-lg text-red-600 hover:bg-red-50">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="log-out" className="w-5 h-5 text-gray-600"></i>
              </div>
              <span>Logout</span>
            </button>
          </div>
        </div>
        <div id="menu-logged-out" className="flex flex-col h-full">
          <div className="flex-grow p-4 space-y-1 overflow-y-auto">
            <a href="/website/about" className="flex items-center space-x-4 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="info" className="w-5 h-5 text-yellow-600"></i>
              </div>
              <span>About Us</span>
            </a>
            <a href="/website/contact" className="flex items-center space-x-4 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                <i data-lucide="phone" className="w-5 h-5 text-cyan-600"></i>
              </div>
              <span>Contact Us</span>
            </a>
          </div>
          <div className="p-4 space-y-3 border-t flex-shrink-0">
            <a href="/website/signup" className="block w-full text-center bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              <i data-lucide="log-in" className="w-4 h-4 inline mr-2"></i>
              Login
            </a>
            <a href="/website/signup" className="block w-full text-center border-2 border-blue-600 text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
              <i data-lucide="user-plus" className="w-4 h-4 inline mr-2"></i>
              Sign Up
            </a>
          </div>
        </div>
      </div>

      <section id="top-cities-categories" className="container mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="bg-white py-4 shadow-lg rounded-2xl city-filter-container overflow-hidden">
          <h2 className="sr-only">Top Cities</h2>
          <div id="cities-category-slider" className="flex gap-4 md:gap-8 pb-2 scroll-smooth px-4 horizontal-slider overflow-x-auto">
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-16">
        <section id="offerings" className="light-card rounded-2xl p-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">What are you looking for?</h2>
          <div className="relative -m-2">
            <button id="offer-prev" className="hidden absolute -left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 text-gray-700 sm:block"><i data-lucide="chevron-left" className="w-6 h-6"></i></button>
            <div id="offer-slider" className="flex gap-6 overflow-x-auto pb-2 pt-2 -mx-4 px-4 snap-x snap-mandatory scroll-smooth horizontal-slider lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:p-0 lg:m-0">
              <a href="/website/ourproperty?type=pg" className="group block flex-shrink-0 snap-start w-102 md:w-164 lg:w-172 offering-card-item">
                <div className="relative rounded-xl shadow-md hover:shadow-lg overflow-hidden h-40 sm:h-44 cursor-pointer offering-card transition-shadow duration-300">
                  <img src="https://res.cloudinary.com/dpwgvcibj/image/upload/v1768990262/roomhy/website/pg1.jpg" className="w-550px h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="PG" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white text-center text-sm sm:text-base font-bold leading-tight">PG</h3>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white text-center text-sm sm:text-base font-bold leading-tight mb-2">PG</h3>
                      <p className="text-white/90 text-center text-xs sm:text-sm leading-relaxed">Shared rooms with food and amenities included.</p>
                    </div>
                  </div>
                  <div className="hidden sm:block absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                    <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <i data-lucide="chevron-right" className="w-3 h-3 text-white"></i>
                    </div>
                  </div>
                </div>
              </a>
              <a href="/website/ourproperty?type=hostel" className="group block flex-shrink-0 snap-start w-102 md:w-164 lg:w-172 offering-card-item">
                <div className="relative rounded-xl shadow-md hover:shadow-lg overflow-hidden h-40 sm:h-44 cursor-pointer offering-card transition-shadow duration-300">
                  <img src="https://res.cloudinary.com/dpwgvcibj/image/upload/v1768990258/roomhy/website/hostel.jpg" className="w-550px h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Hostel" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white text-center text-sm sm:text-base font-bold leading-tight">Hostel</h3>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white text-center text-sm sm:text-base font-bold leading-tight mb-2">Hostel</h3>
                      <p className="text-white/90 text-center text-xs sm:text-sm leading-relaxed">Budget-friendly shared accommodations.</p>
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
                  <img src="https://res.cloudinary.com/dpwgvcibj/image/upload/v1768990264/roomhy/website/pg.jpg" className="w-550px h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Hostel" />
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
            <button id="offer-next" className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 text-gray-700 sm:block"><i data-lucide="chevron-right" className="w-6 h-6"></i></button>
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

        <section id="top-spaces" className="light-card rounded-2xl p-6">
          <h2 id="top-spaces-title" className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Top Spaces in Indore</h2>
          <div className="relative -m-2">
            <button id="spaces-prev" className="hidden -left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 text-gray-700 sm:block lg:hidden"><i data-lucide="chevron-left" className="w-6 h-6"></i></button>
            <div id="spaces-slider" className="flex gap-6 overflow-x-auto pb-2 pt-2 -mx-4 px-4 snap-x snap-mandatory scroll-smooth horizontal-slider lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:p-0 lg:m-0">
            </div>
            <button id="spaces-next" className="hidden absolute -right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 text-gray-700 sm:block lg:hidden"><i data-lucide="chevron-right" className="w-6 h-6"></i></button>
          </div>
        </section>

        <section id="how-it-works" className="relative overflow-hidden py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
                <span className="bg-clip-text text-transparent animate-gradient-flow" style={{ backgroundImage: "linear-gradient(to right, #06b6d4, #3b82f6, #06b6d4)" }}>Find Your Home, Simply.</span>
              </h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-16">Roomhy's 6-step process ensures you get the best space, price, and experience.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {howItWorksSteps.map((step) => (
                <div key={step.number} className="step-card-3d bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <span className="text-white text-xl font-bold">{step.number}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{step.emoji}</span>
                        <h3 className="text-xl font-bold text-gray-900 leading-snug">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="top-spaces-kota" className="light-card rounded-2xl p-6">
          <h2 id="top-spaces-title-kota" className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Top Spaces in Kota</h2>
          <div className="relative -m-2">
            <button id="spaces-prev-kota" className="hidden absolute -left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 text-gray-700 sm:block lg:hidden"><i data-lucide="chevron-left" className="w-6 h-6"></i></button>
            <div id="spaces-slider-kota" className="flex gap-6 overflow-x-auto pb-2 pt-2 -mx-4 px-4 snap-x snap-mandatory scroll-smooth horizontal-slider lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:p-0 lg:m-0">
            </div>
            <button id="spaces-next-kota" className="hidden absolute -right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 text-gray-700 sm:block lg:hidden"><i data-lucide="chevron-right" className="w-6 h-6"></i></button>
          </div>
        </section>

        <section id="why-choose-us">
          <div className="text-center"><h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">Why Students Choose Us</h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="light-card p-6 rounded-xl flex items-start space-x-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30"><i data-lucide="wallet" className="w-6 h-6"></i></div>
              <div><h3 className="text-lg font-semibold text-gray-900">Zero Brokerage</h3><p className="text-gray-500 mt-1">Save your money for what matters. We connect you directly with property owners, with no hidden fees.</p></div>
            </div>
            <div className="light-card p-6 rounded-xl flex items-start space-x-4">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30"><i data-lucide="sofa" className="w-6 h-6"></i></div>
              <div><h3 className="text-lg font-semibold text-gray-900">Fully Furnished</h3><p className="text-gray-500 mt-1">Move in with just your suitcase. Our properties come with all the essential furniture and amenities.</p></div>
            </div>
            <div className="light-card p-6 rounded-xl flex items-start space-x-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30"><i data-lucide="heart-handshake" className="w-6 h-6"></i></div>
              <div><h3 className="text-lg font-semibold text-gray-900">24/7 Support</h3><p className="text-gray-500 mt-1">From booking to move-out, our dedicated support team is always here to help you.</p></div>
            </div>
          </div>
        </section>

        <section id="guarantee">
          <div className="light-card rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><h3 className="text-3xl md:text-4xl font-bold text-cyan-600">50K+</h3><p className="text-gray-500 mt-2">Happy Students</p></div>
            <div><h3 className="text-3xl md:text-4xl font-bold text-blue-600">10K+</h3><p className="text-gray-500 mt-2">Verified Properties</p></div>
            <div><h3 className="text-3xl md:text-4xl font-bold text-sky-600">200+</h3><p className="text-gray-500 mt-2">Cities Served</p></div>
            <div><h3 className="text-3xl md:text-4xl font-bold text-teal-600">100%</h3><p className="text-gray-500 mt-2">Brokerage Free</p></div>
          </div>
        </section>

        <section id="rent-smarter" className="light-card rounded-2xl p-6 md:p-8 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-slide-in">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Rent Smarter. Live Better. <br className="hidden lg:block" /> <span className="text-blue-600">With Roomhy</span></h2>
              <div className="space-y-8 mt-10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-blue-100 text-blue-600 p-3 rounded-lg shadow-sm">
                    <i data-lucide="badge-percent" className="w-6 h-6"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Zero Brokerage Always</h3>
                    <p className="text-gray-500 leading-relaxed">Tired of paying brokers just to see a room? With Roomhy, you connect directly with verified property owners. No middlemen, no extra charges — just a clean, commission-free experience.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-green-100 text-green-600 p-3 rounded-lg shadow-sm">
                    <i data-lucide="gavel" className="w-6 h-6"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Only Pay What You Bid</h3>
                    <p className="text-gray-500 leading-relaxed">No fixed pricing. No pressure. Set your own budget and place a live bid — the owner picks the best offer. It's fast, fair, and puts you in control from the start.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-purple-100 text-purple-600 p-3 rounded-lg shadow-sm">
                    <i data-lucide="user-check" className="w-6 h-6"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Rooms That Match Your Vibe & Budget</h3>
                    <p className="text-gray-500 leading-relaxed">Whether you want a solo PG, a shared space with friends, or a budget hostel near college — Roomhy has it all. Search by location, amenities, and real-time availability to find your perfect stay.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-slide-in" style={{ animationDelay: "0.2s" }}>
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto:format&fit=crop" alt="Happy students" className="w-full h-full object-cover rounded-2xl shadow-lg" style={{ maxHeight: "500px" }} />
            </div>
          </div>
        </section>

        <section id="register-property" className="cta-section rounded-2xl text-white p-12 text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Have a Property to Rent Out?</h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">Join our network of trusted property owners and reach thousands of students looking for a home. Listing is free and easy!</p>
          <a href="/website/signuprole" className="glow-button text-white px-8 py-3 rounded-lg font-semibold text-lg" style={{ background: "linear-gradient(90deg, #06b6d4, #3b82f6)", boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.39)" }}>Register Now</a>
        </section>

        <section id="testimonials" className="overflow-hidden py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Trusted by 10,000+ Students</h2>
          </div>
          <div className="testimonial-carousel testimonial-row-1 mb-8">
            <div className="testimonial-track">
              <div className="testimonial-track-inner" id="testimonial-track-1">
              </div>
            </div>
          </div>
          <div className="testimonial-carousel testimonial-row-2">
            <div className="testimonial-track">
              <div className="testimonial-track-inner" id="testimonial-track-2">
              </div>
            </div>
          </div>
        </section>

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
                <div className="faq-item">
                  <div className="faq-question">
                    <span>What is Roomhy and how does it work?</span>
                    <i data-lucide="chevron-down" className="chevron w-6 h-6"></i>
                  </div>
                  <div className="faq-answer">
                    <p>Roomhy is a student accommodation platform that connects students directly with verified property owners. You search, shortlist, and book properties like PG, hostels, and apartments without paying any brokerage fees. Our bidding feature also allows you to secure the best possible rental price.</p>
                  </div>
                </div>
                <div className="faq-item">
                  <div className="faq-question">
                    <span>Is Roomhy completely broker-free?</span>
                    <i data-lucide="chevron-down" className="chevron w-6 h-6"></i>
                  </div>
                  <div className="faq-answer">
                    <p>Yes, absolutely. Our core promise is zero brokerage. We eliminate the middleman, ensuring you only pay the rent and a small, refundable security deposit directly to the property owner. This saves students thousands in commission fees.</p>
                  </div>
                </div>
                <div className="faq-item">
                  <div className="faq-question">
                    <span>How do I place a bid on a property?</span>
                    <i data-lucide="chevron-down" className="chevron w-6 h-6"></i>
                  </div>
                  <div className="faq-answer">
                    <p>When viewing a property, you can see the owner's expected price. You can then submit a 'bid' or offer that you are willing to pay. The owner can accept, reject, or counter your offer. This live bidding process helps you secure a better deal than fixed-price listings.</p>
                  </div>
                </div>
                <div className="faq-item">
                  <div className="faq-question">
                    <span>What types of properties are listed on Roomhy?</span>
                    <i data-lucide="chevron-down" className="chevron w-6 h-6"></i>
                  </div>
                  <div className="faq-answer">
                    <p>We offer a wide range of properties tailored for students, including: fully furnished Hostels (shared rooms, budget-friendly), PGs (Paying Guest accommodation with meals and services), and Apartments (private flats for independent living or sharing with friends).</p>
                  </div>
                </div>
                <div className="faq-item">
                  <div className="faq-question">
                    <span>Can I view room availability in real-time?</span>
                    <i data-lucide="chevron-down" className="chevron w-6 h-6"></i>
                  </div>
                  <div className="faq-answer">
                    <p>Yes, property owners are encouraged to keep their listings updated in real-time. You can filter properties based on immediate availability and expected move-in dates to ensure you only view options that suit your schedule.</p>
                  </div>
                </div>
                <div className="faq-item">
                  <div className="faq-question">
                    <span>Do I have to pay to use Roomhy as a student?</span>
                    <i data-lucide="chevron-down" className="chevron w-6 h-6"></i>
                  </div>
                  <div className="faq-answer">
                    <p>Searching, browsing, and contacting property owners through Roomhy is entirely free for students. Our revenue comes from value-added services offered to property owners, keeping the platform free and zero-brokerage for tenants.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="website-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="https://res.cloudinary.com/dpwgvcibj/image/upload/v1768990260/roomhy/website/logoroomhy.png" alt="Roomhy Logo" />
                <span>Roomhy</span>
              </div>
              <p className="footer-description">
                India's fastest-growing student accommodation platform. Find your perfect home away from home with verified properties, zero brokerage, and 24/7 support.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link" title="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" title="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.281-.073-1.689-.073-4.849 0-3.259.014-3.668.072-4.948.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" title="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-section">
              <h3>Company</h3>
              <div className="footer-links">
                <a href="/website/about" className="footer-link">About Us</a>
                <a href="/website/contact" className="footer-link">Contact Us</a>
                <a href="#" className="footer-link">Careers</a>
                <a href="#" className="footer-link">Press & Media</a>
                <a href="#" className="footer-link">Blog</a>
              </div>
            </div>
            <div className="footer-section">
              <h3>Services</h3>
              <div className="footer-links">
                <a href="/website/ourproperty?type=pg" className="footer-link">Find PG</a>
                <a href="/website/ourproperty?type=hostel" className="footer-link">Find Hostel</a>
                <a href="/website/ourproperty?type=apartment" className="footer-link">Find Apartment</a>
                <a href="/website/list" className="footer-link">List Your Property</a>
                <a href="#" className="footer-link">Property Management</a>
              </div>
            </div>
            <div className="footer-section">
              <h3>Support</h3>
              <div className="footer-links">
                <a href="#" className="footer-link">Help Center</a>
                <a href="#" className="footer-link">Safety Guidelines</a>
                <a href="/website/terms" className="footer-link">Terms & Conditions</a>
                <a href="/website/privacy" className="footer-link">Privacy Policy</a>
                <a href="/website/cancellation" className="footer-link">Refund Policy</a>
              </div>
            </div>
            <div className="footer-section">
              <h3>Cities We Serve</h3>
              <div className="footer-links">
                <a href="/website/ourproperty?city=delhi" className="footer-link">Delhi</a>
                <a href="/website/ourproperty?city=mumbai" className="footer-link">Mumbai</a>
                <a href="/website/ourproperty?city=bangalore" className="footer-link">Bangalore</a>
                <a href="/website/ourproperty?city=pune" className="footer-link">Pune</a>
                <a href="/website/ourproperty?city=hyderabad" className="footer-link">Hyderabad</a>
                <a href="/website/ourproperty" className="footer-link">View All Cities</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="footer-copyright">
                © 2025 Roomhy. All Rights Reserved.
              </div>
              <div className="footer-bottom-links">
                <a href="/website/terms" className="footer-bottom-link">Terms & Conditions</a>
                <a href="/website/privacy" className="footer-bottom-link">Privacy Policy</a>
                <a href="/website/cancellation" className="footer-bottom-link">Cancellation Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
