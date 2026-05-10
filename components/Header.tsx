"use client";

import { PASS } from "@/lib/constants";

export default function Header() {
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
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl shadow-sm shadow-slate-950/20">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 text-2xl shadow-lg shadow-cyan-500/20">
            🛒
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Jumla TZ Pro</h1>
            <p className="text-sm text-slate-400">Commercial ecommerce experience</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-300">Fast listings</span>
          <span className="rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-300">Secure checkout</span>
          <button
            onClick={handlePremium}
            className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:scale-[1.02]"
          >
            ⭐ Premium
          </button>
        </div>
      </div>
    </header>
  );
}
