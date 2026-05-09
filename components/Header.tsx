"use client";

import { useState } from "react";
import { PASS } from "@/lib/constants";

export default function Header() {
  const [showPremiumPrompt, setShowPremiumPrompt] = useState(false);

  const handlePremium = () => {
    const password = prompt("Enter Premium Password");
    if (password === PASS) {
      localStorage.setItem("premium", "true");
      alert("🎉 Premium Activated!");
      window.location.reload();
    } else {
      alert("❌ Wrong password");
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-emerald-500/10 pointer-events-none"></div>

      <div className="relative flex justify-between items-center px-4 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🛒</div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Jumla TZ Pro
            </h1>
            <p className="text-xs text-slate-400">Premium E-Commerce</p>
          </div>
        </div>

        <button
          onClick={handlePremium}
          className="relative group px-6 py-2 rounded-lg font-semibold text-sm transition-smooth overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg opacity-0 group-hover:opacity-100 transition-smooth"></div>
          <div className="relative bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-2 rounded-lg group-hover:from-amber-500 group-hover:to-orange-500 transition-smooth">
            ⭐ Premium
          </div>
        </button>
      </div>
    </header>
  );
}
