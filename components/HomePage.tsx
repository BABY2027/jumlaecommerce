"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CATEGORIES } from "@/lib/constants";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  phone: string;
  location: string;
  image: string;
  likes: number;
  category: string;
  time: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);

  useEffect(() => {
    setIsPremium(localStorage.getItem("premium") === "true");

    const unsubscribe = onSnapshot(collection(db, "products"), (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Product[];
      setProducts(data);
    });

    return () => unsubscribe();
  }, []);

  const filteredProducts = products
    .sort((a, b) => b.time - a.time)
    .filter((p) => {
      const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
      const matchCat = !category || p.category === category;
      return matchSearch && matchCat;
    });

  const categoryChips = [\"All\", ...CATEGORIES.slice(0, 7)];\n  const [searchFocus, setSearchFocus] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
        <section className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="card-solid overflow-hidden border border-slate-800/70 p-8 relative">
            <div className="absolute -top-10 -right-10 h-44 w-44 rounded-full bg-cyan-500/15 blur-3xl"></div>
            <div className="absolute -bottom-10 left-8 h-36 w-36 rounded-full bg-fuchsia-500/10 blur-3xl"></div>
            <div className="relative space-y-6">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Commercial marketplace</p>
                  <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                    Sell smarter with professional listings.
                  </h1>
                </div>
                <div className="rounded-3xl bg-slate-900/90 px-5 py-3 text-sm text-cyan-200">
                  {isPremium ? "Premium enabled" : "Free seller account"}
                </div>
              </div>

              <p className="max-w-3xl text-slate-400 leading-7">
                Build trust with buyers using polished ads, fast checkout shortcuts, and secure communication through WhatsApp. Jump into the market with speed and reliability.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900/90 border border-slate-700/50 p-5">
                  <p className="text-sm text-slate-400">Active listings</p>
                  <p className="text-4xl font-bold text-white">{filteredProducts.length}</p>
                </div>
                <div className="rounded-3xl bg-slate-900/90 border border-slate-700/50 p-5">
                  <p className="text-sm text-slate-400">Popular category</p>
                  <p className="text-4xl font-bold text-cyan-300">Electronics</p>
                </div>
                <div className="rounded-3xl bg-slate-900/90 border border-slate-700/50 p-5">
                  <p className="text-sm text-slate-400">Business grade</p>
                  <p className="text-4xl font-bold text-emerald-300">Secure</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-glass border border-slate-800/70 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Business benefits</h3>
            <div className="space-y-4">
              {[
                { title: "High visibility", detail: "Premium listings get more buyer attention." },
                { title: "Quick contact", detail: "Instant WhatsApp chats save time." },
                { title: "Reliable payments", detail: "Store payment details and update securely." },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl bg-slate-900/85 border border-slate-700/50 p-4">
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-slate-400 mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-[1.8fr_1fr]">
          <div className="card-glass border border-slate-800/70 p-6">
            <div className={`relative transition-all duration-300 ${
              searchFocus ? "ring-2 ring-cyan-500/50 rounded-2xl" : ""
            }`}>
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 text-lg">
                🔍
              </div>
              <input
                type="text"
                placeholder="Search products, categories or sellers"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
                className="input-styled pl-14 focus:ring-0 focus:border-cyan-400"
              />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-styled"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("");
                }}
                className="btn-secondary"
              >
                Reset filters
              </button>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400 mb-4">
                Quick filters
              </h4>
              <div className="flex flex-wrap gap-3">
                {categoryChips.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat === "All" ? "" : cat)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      category === cat || (cat === "All" && !category)
                        ? "bg-cyan-500/20 text-cyan-200"
                        : "bg-slate-900/80 text-slate-300 hover:bg-slate-800/95"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card-solid border border-slate-800/70 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Sales dashboard</h3>
            <div className="space-y-4">
              {[
                { label: "Orders today", value: "—" },
                { label: "Conversions", value: "—" },
                { label: "Response time", value: "Fast" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-3xl bg-slate-900/90 p-4 border border-slate-700/50">
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Secure checkout", description: "Protect buyer data across every transaction.", icon: "🔒" },
            { title: "Faster listings", description: "Publish new products in seconds.", icon: "⚡" },
            { title: "Business growth", description: "Reach buyers across Tanzania.", icon: "📈" },
          ].map((item) => (
            <div key={item.title} className="card-glass border border-slate-800/70 p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/90 text-2xl">{item.icon}</div>
              <h4 className="font-semibold text-white mb-2">{item.title}</h4>
              <p className="text-sm text-slate-400">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">
                <span className="font-semibold text-white">{filteredProducts.length}</span> products listed
              </p>
            </div>
            {filteredProducts.length > 0 && (
              <div className="badge-primary inline-flex">Newest first</div>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="card-solid p-12 text-center border-slate-700/50">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg font-semibold text-slate-300 mb-2">No products available</h3>
              <p className="text-slate-500">Use the + button to add your first item and start selling.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product, idx) => (
                <div key={product.id} style={{ animationDelay: `${idx * 50}ms` }} className="animate-scale-in">
                  <ProductCard product={product} isPremium={isPremium} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

