"use client";

import { useState, useEffect } from "react";

export default function WalletPage() {
  const [mpesa, setMpesa] = useState("");
  const [airtel, setAirtel] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("paymentDetails");
    if (saved) {
      const { mpesa: savedMpesa, airtel: savedAirtel } = JSON.parse(saved);
      setMpesa(savedMpesa || "");
      setAirtel(savedAirtel || "");
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      "paymentDetails",
      JSON.stringify({ mpesa, airtel })
    );
    alert("✅ Payment details saved!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="card-solid p-8 border-slate-600/50 mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            💰 My Wallet
          </h2>
          <p className="text-slate-400">Manage your balance and payment methods</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Balance Card */}
          <div className="card-solid border-slate-600/50 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-cyan-500/10"></div>
            <div className="relative">
              <p className="text-slate-400 text-sm font-medium mb-2">Current Balance</p>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                0 TZS
              </h3>
              <p className="text-xs text-slate-500 mt-3">
                Last updated: Just now
              </p>
            </div>
          </div>

          {/* Transactions */}
          <div className="card-solid border-slate-600/50 p-8">
            <p className="text-slate-400 text-sm font-medium mb-4">Recent Activity</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📤</span>
                  <div>
                    <p className="text-sm font-medium">No transactions</p>
                    <p className="text-xs text-slate-500">Start posting to earn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="card-solid border-slate-600/50 p-6 mb-6">
          <h4 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
            <span>💳</span> Payment Methods
          </h4>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                M-Pesa Number
              </label>
              <input
                type="text"
                placeholder="255712345678"
                value={mpesa}
                onChange={(e) => setMpesa(e.target.value)}
                className="input-styled"
              />
              <p className="text-xs text-slate-500 mt-2">
                Format: 255XXXXXXXXX (without +)
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Airtel Money
              </label>
              <input
                type="text"
                placeholder="255712345678"
                value={airtel}
                onChange={(e) => setAirtel(e.target.value)}
                className="input-styled"
              />
              <p className="text-xs text-slate-500 mt-2">
                Format: 255XXXXXXXXX (without +)
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="btn-primary w-full"
          >
            💾 Save Payment Methods
          </button>
        </div>

        {/* Promotions */}
        <div className="card-glass border-slate-600/50 p-6">
          <h4 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
            <span>🎁</span> Available Offers
          </h4>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-lg">
              <p className="text-sm font-medium text-emerald-300">New Seller Bonus</p>
              <p className="text-xs text-slate-400 mt-1">Post 5 items and get 10,000 TZS credit</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg">
              <p className="text-sm font-medium text-amber-300">Referral Program</p>
              <p className="text-xs text-slate-400 mt-1">Invite friends and earn 5,000 TZS each</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
