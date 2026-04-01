import React from 'react';

const steps = [
  {
    title: "Place Your Budget",
    desc: "Tell us how much you can pay and what kind of room you need.",
    img: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Get Matched Options",
    desc: "We show you the best rooms that match your budget and preferences.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Owners Respond",
    desc: "Hostel and PG owners send you relevant room offers.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Chat & Finalize",
    desc: "Talk directly with owners and clear all your doubts easily.",
    img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Visit Property",
    desc: "Visit and verify the place before making your decision.",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Book & Move In",
    desc: "Confirm your room and move in without any hassle.",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
  },
];

export default function HowRoomhyWorks() {
  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Roomhy Works
          </h2>
          <p className="text-gray-600 mt-2 text-lg max-w-2xl mx-auto">
            Simple steps to find your room without overpaying
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 border border-gray-100"
            >
              <div className="relative mb-4">
                <img
                  src={step.img}
                  alt={step.title}
                  className="rounded-lg h-40 w-full object-cover"
                />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-4 border-white">
                  {index + 1}
                </div>
              </div>

              <h3 className="font-bold text-lg text-gray-900 text-center">
                {step.title}
              </h3>

              <p className="text-gray-500 mt-2 text-sm leading-relaxed text-center">
                {step.desc}
              </p>
            </div>
          ))}

        </div>

        <div className="mt-12 text-center">
          <p className="text-xl font-semibold text-teal-600">
            No searching. No calling. Owners come to you.
          </p>
        </div>

      </div>
    </section>
  );
}
