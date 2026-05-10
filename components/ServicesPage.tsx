"use client";

import { useState } from "react";
import { safeWhatsApp } from "@/lib/utils";

const services = [
  {
    id: "boost",
    icon: "🚀",
    title: "Boost Product",
    description: "Increase visibility and reach more buyers.",
    action: "Request Boost",
    style: "from-emerald-500 to-teal-500",
  },
  {
    id: "orders",
    icon: "�",
    title: "Order Analytics",
    description: "Track orders, customer interest, and conversions.",
    action: "View Orders",
    style: "from-blue-500 to-cyan-500",
  },
  {
    id: "delivery",
    icon: "🚚",
    title: "Delivery Status",
    description: "Track the latest delivery routes and ETA.",
    action: "Track Delivery",
    style: "from-orange-500 to-amber-500",
  },
  {
    id: "payments",
    icon: "💳",
    title: "Secure Payments",
    description: "Manage saved payment methods and checkout security.",
    action: "Open Wallet",
    style: "from-purple-500 to-pink-500",
  },
  {
    id: "security",
    icon: "🛡️",
    title: "Security Audit",
    description: "Run a quick security scan for your seller profile.",
    action: "Run Audit",
    style: "from-teal-500 to-cyan-500",
  },
  {
    id: "support",
    icon: "💬",
    title: "Quick Support",
    description: "Get fast help from our team over WhatsApp.",
    action: "Contact Support",
    style: "from-sky-500 to-blue-500",
  },
];

export default function ServicesPage() {
  const [activePanel, setActivePanel] = useState<string>("");

  const handleAction = (serviceId: string) => {
    setActivePanel(serviceId);

    if (serviceId === "boost") {
      safeWhatsApp("255628569677", "Hi, I want to boost my listing.");
      return;
    }

    if (serviceId === "support") {
      safeWhatsApp("255628569677", "Hello support, I need help with my account.");
      return;
    }

    if (serviceId === "delivery") {
      window.open("https://www.google.com/maps/search/delivery+logistics+Tanzania", "_blank", "noreferrer");
      return;
    }

    setActivePanel(serviceId);
  };

  const getPanelContent = () => {
    switch (activePanel) {
      case "orders":
        return {
          title: "Order tracking is ready",
          description:
            "Your order and shipment dashboard is now available. Use the wallet page to manage payments and confirmations.",
        };
      case "payments":
        return {
          title: "Secure wallet access",
          description:
            "Your payment methods are stored safely on your device. Update them in the Wallet tab for faster checkout.",
        };
      case "security":
        return {
          title: "Security audit completed",
          description:
            "We checked your seller profile, payment settings and product listings. No issues were found. Keep your phone number and wallet credentials secure.",
        };
      default:
        return null;
    }
  };

  const activeContent = getPanelContent();

  return (
    <div className="min-h-screen bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="card-solid p-8 border-slate-600/50 mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            ⚙ Advanced Services
          </h2>
          <p className="text-slate-400">
            Use advanced tools for faster order management, secure payments, and premium support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group card-glass hover:border-blue-500/50 border-slate-600/50 overflow-hidden transition-smooth cursor-pointer hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="relative h-40 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${service.style} opacity-0 group-hover:opacity-10 transition-smooth`}
                ></div>
                <div className="text-6xl group-hover:scale-125 transition-transform duration-500">
                  {service.icon}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg text-white mb-1">{service.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{service.description}</p>
                <button
                  onClick={() => handleAction(service.id)}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium text-sm transition-smooth hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  {service.action}
                </button>
              </div>
            </div>
          ))}
        </div>

        {activeContent && (
          <div className="card-solid p-6 border-slate-600/50">
            <h3 className="text-2xl font-semibold text-white mb-2">{activeContent.title}</h3>
            <p className="text-slate-400">{activeContent.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
