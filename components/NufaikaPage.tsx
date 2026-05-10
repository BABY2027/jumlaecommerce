"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { isValidPhone, sanitizeText } from "@/lib/utils";

export default function NufaikaPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const savedPhone = localStorage.getItem("nufaika");
    if (savedPhone) {
      setIsLoggedIn(true);
      setPhone(savedPhone);
      loadUserData(savedPhone);
    }
  }, []);

  const loadUserData = async (phoneNumber: string) => {
    try {
      const q = query(
        collection(db, "users"),
        where("phone", "==", phoneNumber)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setUserData(querySnapshot.docs[0].data());
        setShowDashboard(true);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const handleRegister = async () => {
    const cleanName = sanitizeText(name);
    const cleanPhone = phone.replace(/\D/g, "");

    if (!cleanName || !isValidPhone(cleanPhone)) {
      alert("Please enter a valid name and phone number in the format 2557XXXXXXXX.");
      return;
    }

    try {
      await setDoc(doc(db, "users", cleanPhone), {
        name: cleanName,
        phone: cleanPhone,
        time: Date.now(),
      });

      localStorage.setItem("nufaika", cleanPhone);
      setIsLoggedIn(true);
      setShowDashboard(true);
      loadUserData(cleanPhone);
    } catch (error) {
      console.error("Error registering:", error);
      alert("Error registering. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("nufaika");
    setIsLoggedIn(false);
    setShowDashboard(false);
    setName("");
    setPhone("");
  };

  if (isLoggedIn && showDashboard && userData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
          <div className="card-solid border border-slate-800/70 p-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-emerald-500/10"></div>
            <div className="relative">
              <h3 className="text-4xl font-bold text-white mb-2">
                🎯 Welcome, <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{userData.name}</span>
              </h3>
              <p className="text-slate-400">Your Nufaika seller dashboard</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-glass border border-slate-800/70 p-6 rounded-[28px]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Posts</p>
                  <h4 className="text-3xl font-bold text-white">0</h4>
                </div>
                <span className="text-4xl">📝</span>
              </div>
            </div>

            <div className="card-glass border border-slate-800/70 p-6 rounded-[28px]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Likes</p>
                  <h4 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">0</h4>
                </div>
                <span className="text-4xl">❤️</span>
              </div>
            </div>

            <div className="card-glass border border-slate-800/70 p-6 rounded-[28px]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Member Since</p>
                  <h4 className="text-sm font-semibold text-slate-200 mt-2">{new Date(userData.time).toLocaleDateString()}</h4>
                </div>
                <span className="text-4xl">⭐</span>
              </div>
            </div>
          </div>

          <div className="card-solid border border-slate-800/70 p-6 rounded-[28px]">
            <h4 className="font-bold text-lg text-white mb-4">📦 Your Products</h4>
            <div className="text-center py-12 text-slate-400">
              <p className="text-2xl mb-2">📭</p>
              <p>No products posted yet. Use the + button to create your first listing and grow your store.</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-3xl font-bold transition-all duration-200"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-transparent via-slate-900/30 to-transparent flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="card-solid border-slate-600/50 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-emerald-500/10"></div>

          <div className="relative">
            <h3 className="text-2xl font-bold text-white mb-2">
              📝 Join Nufaika
            </h3>
            <p className="text-slate-400 text-sm mb-8">
              Register or login to start selling
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., John Mwangi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-styled"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="255712345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-styled"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Format: 255XXXXXXXXX (without +)
                </p>
              </div>
            </div>

            <button
              onClick={handleRegister}
              className="btn-primary w-full text-lg"
            >
              ✨ Endelea
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
