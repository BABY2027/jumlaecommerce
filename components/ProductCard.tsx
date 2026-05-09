"use client";

import Image from "next/image";
import { useState } from "react";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

interface ProductCardProps {
  product: Product;
  isPremium: boolean;
}

export default function ProductCard({ product, isPremium }: ProductCardProps) {
  const [isLiking, setIsLiking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    setIsLiking(true);
    try {
      const liked = JSON.parse(localStorage.getItem("liked") || "{}");

      if (liked[product.id]) {
        alert("Umeshapenda hii bidhaa");
        return;
      }

      liked[product.id] = true;
      localStorage.setItem("liked", JSON.stringify(liked));
      setIsLiked(true);

      await updateDoc(doc(db, "products", product.id), {
        likes: increment(1),
      });
    } catch (error) {
      console.error("Error liking product:", error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="group card-glass overflow-hidden hover:border-blue-500/50 transition-smooth hover:shadow-lg hover:shadow-blue-500/20">
      {/* Image Container */}
      <div className="relative w-full h-40 overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900">
        <Image
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-smooth duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>

        {/* Premium Badge */}
        {isPremium && (
          <div className="absolute top-2 right-2 badge-success animate-pulse">
            ⭐ PREMIUM
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold bg-blue-500/90 text-white backdrop-blur-md">
          {product.category.substring(0, 3).toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h4 className="font-semibold text-sm text-white line-clamp-2 mb-1">
          {product.name}
        </h4>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {product.price.toLocaleString()}
          </span>
          <span className="text-xs text-slate-400">TZS</span>
        </div>

        {/* Location */}
        <p className="text-xs text-slate-400 mb-3 line-clamp-1">
          📍 {product.location || "Unknown"}
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {/* Map Button */}
          <button
            onClick={() =>
              window.open(
                `https://www.google.com/maps/search/${encodeURIComponent(product.location || "")}?t=k`
              )
            }
            className="group/btn py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-md text-xs font-semibold transition-smooth hover:shadow-lg hover:shadow-amber-500/30"
          >
            🗺️
          </button>

          {/* WhatsApp Button */}
          <button
            onClick={() => window.open(`https://wa.me/${product.phone}`)}
            className="py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-md text-xs font-semibold transition-smooth hover:shadow-lg hover:shadow-green-500/30"
          >
            💬
          </button>

          {/* Like Button */}
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`py-2 rounded-md text-xs font-semibold transition-smooth hover:shadow-lg disabled:opacity-50 ${
              isLiked
                ? "bg-red-600 text-white"
                : "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 hover:shadow-red-500/30"
            }`}
          >
            ❤️ {product.likes || 0}
          </button>
        </div>
      </div>
    </div>
  );
}
