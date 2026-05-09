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

  return (
    <div className="min-h-screen bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 card-solid p-8 border-slate-600/50 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-cyan-500/10"></div>
          <div className="relative">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              🏪 Welcome to Jumla TZ Pro
            </h2>
            <p className="text-slate-400">
              Discover amazing products from trusted sellers. Browse, search, and connect instantly.
            </p>
          </div>
        </div>

        {/* Quick Services */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { icon: "🚀", label: "Boost", color: "from-green-500" },
            { icon: "🛍", label: "Orders", color: "from-blue-500" },
            { icon: "🚚", label: "Delivery", color: "from-orange-500" },
            { icon: "💳", label: "Payments", color: "from-purple-500" },
          ].map((service, idx) => (
            <button
              key={idx}
              className="group p-4 card-glass hover:border-blue-500/50 transition-smooth hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className={`text-2xl mb-2 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <p className="text-xs font-medium text-slate-300">{service.label}</p>
            </button>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="grid md:grid-cols-3 gap-3 mb-8">
          {/* Search */}
          <div className="md:col-span-2 relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
              🔍
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-styled pl-12 group-focus-within:border-blue-500 group-focus-within:ring-2 group-focus-within:ring-blue-500/20"
            />
          </div>

          {/* Category Filter */}
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
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm text-slate-400">
            <span className="font-semibold text-slate-200">{filteredProducts.length}</span>{" "}
            products found
          </div>
          {filteredProducts.length > 0 && (
            <div className="text-xs px-3 py-1 badge-primary">
              Sorted by newest
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="card-solid p-12 text-center border-slate-600/50">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-lg font-semibold text-slate-300 mb-2">
              No products found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or category filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isPremium={isPremium}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
