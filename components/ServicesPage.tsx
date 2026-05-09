"use client";

import { useState } from "react";

export default function ServicesPage() {
  const services = [
    {
      id: "boost",
      icon: "🚀",
      title: "Boost Product",
      description: "Increase visibility and reach more buyers",
      color: "from-emerald-500 to-teal-500",
      action: "Request Boost",
    },
    {
      id: "orders",
      icon: "🛍",
      title: "Manage Orders",
      description: "Track and manage all your orders",
      color: "from-blue-500 to-cyan-500",
      action: "Coming soon",
    },
    {
      id: "delivery",
      icon: "🚚",
      title: "Fast Delivery",
      description: "Reliable shipping to your location",
      color: "from-orange-500 to-amber-500",
      action: "Coming soon",
    },
    {
      id: "payments",
      icon: "💳",
      title: "Secure Payments",
      description: "Multiple payment methods available",
      color: "from-purple-500 to-pink-500",
      action: "Coming soon",
    },
  ];

  const handleBoost = () => {
    window.open("https://wa.me/255628569677?text=BOOST REQUEST");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="card-solid p-8 border-slate-600/50 mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            ⚙ Premium Services
          </h2>
          <p className="text-slate-400">
            Enhance your selling experience with our premium features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group card-glass hover:border-blue-500/50 border-slate-600/50 overflow-hidden transition-smooth cursor-pointer hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="relative h-40 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 transition-smooth`}></div>
                <div className="text-6xl group-hover:scale-125 transition-transform duration-500">
                  {service.icon}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg text-white mb-1">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  {service.description}
                </p>

                {service.id === "boost" ? (
                  <button
                    onClick={handleBoost}
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-sm transition-smooth"
                  >
                    {service.action}
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-2 rounded-lg bg-slate-700/50 text-slate-400 font-medium text-sm cursor-not-allowed"
                  >
                    {service.action}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
