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
    <div className="group card-glass overflow-hidden border border-slate-700/40 hover:border-cyan-400/40 transition-smooth shadow-sm hover:shadow-xl">
      <div className="relative h-44 overflow-hidden bg-slate-950">
        <Image
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          fill
          unoptimized
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <span className="rounded-full bg-slate-950/80 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-300">
            {product.category}
          </span>
          {isPremium && <span className="badge-success">⭐ Premium</span>}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/95 to-transparent" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h4 className="font-semibold text-base text-white line-clamp-2">
              {product.name}
            </h4>
            <p className="text-xs text-slate-400 mt-1">📍 {product.location || "Unknown location"}</p>
          </div>
          <div className="text-right">
            <p className="text-base font-bold text-cyan-300">
              TZS {product.price.toLocaleString()}
            </p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mt-1">
              {product.likes || 0} likes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() =>
              window.open(
                `https://www.google.com/maps/search/${encodeURIComponent(product.location || "")}?t=k`
              )
            }
            className="rounded-xl bg-slate-900/90 px-2 py-2 text-xs font-semibold text-slate-200 transition-smooth hover:bg-slate-800"
          >
            🗺️ Map
          </button>

          <button
            onClick={() => window.open(`https://wa.me/${product.phone}`)}
            className="rounded-xl bg-green-600/90 px-2 py-2 text-xs font-semibold text-white transition-smooth hover:bg-green-500"
          >
            💬 Chat
          </button>

          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`rounded-xl px-2 py-2 text-xs font-semibold transition-smooth disabled:opacity-60 ${
              isLiked
                ? "bg-red-600 text-white"
                : "bg-pink-600/90 text-white hover:bg-pink-500"
            }`}
          >
            ❤️ {product.likes || 0}
          </button>
        </div>
      </div>
    </div>
  );
}
