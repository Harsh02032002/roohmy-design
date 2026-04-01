import React from 'react';

const whyPoints = [
  {
    title: "Zero Brokerage Always",
    description: "Tired of paying brokers just to see a room? With Roomhy, you connect directly with verified property owners. No middlemen, no extra charges.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Only Pay What You Bid",
    description: "No fixed pricing. No pressure. Set your own budget and place a live bid - the owner picks the best offer.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Rooms That Match Your Vibe & Budget",
    description: "Whether you want a solo PG, a shared space with friends, or a budget hostel near college - Roomhy has it all.",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Verified Properties Only",
    description: "Every listing is verified by our team. No fake photos, no hidden charges. What you see is what you get.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "24/7 Support",
    description: "From booking to move-out, our dedicated support team is always here to help you with any queries.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Secure Payment",
    description: "Pay booking amount securely through our platform. Your money is safe until you move in.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
  },
];

export default function WhyRoomhy() {
  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Roomhy?
          </h2>
          <p className="text-gray-600 mt-2 text-lg max-w-2xl mx-auto">
            Built by students, for students. Here's why thousands trust us.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {whyPoints.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 border border-gray-100"
            >
              <div className="relative mb-4">
                <img
                  src={point.image}
                  alt={point.title}
                  className="rounded-lg h-40 w-full object-cover"
                />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-4 border-white">
                  {index + 1}
                </div>
              </div>

              <h3 className="font-bold text-lg text-gray-900 text-center">
                {point.title}
              </h3>

              <p className="text-gray-500 mt-2 text-sm leading-relaxed text-center">
                {point.description}
              </p>
            </div>
          ))}

        </div>

        <div className="mt-12 text-center">
          <div className="bg-teal-500 rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-white text-lg font-semibold">
              Join 50,000+ students who found their perfect home with Roomhy
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
