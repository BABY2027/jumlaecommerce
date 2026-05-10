"use client";

import { useState, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CATEGORIES } from "@/lib/constants";
import { isValidPhone, isValidPrice, sanitizeText } from "@/lib/utils";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostSuccess: () => void;
}

export default function PostModal({
  isOpen,
  onClose,
  onPostSuccess,
}: PostModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (file: File) => {
    if (!file) return;

    setIsLoading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "jumlatanzania");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/diaughs0m/image/upload",
        {
          method: "POST",
          body: form,
        }
      );

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      if (!data.secure_url) {
        throw new Error("Invalid upload response");
      }

      setImageURL(data.secure_url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Image upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePost = async () => {
    const cleanName = sanitizeText(name);
    const cleanLocation = sanitizeText(location);
    const cleanPhone = phone.replace(/\D/g, "");

    if (!cleanName || !isValidPrice(price) || !cleanLocation) {
      alert("Please enter a valid product name, price, and location.");
      return;
    }

    if (!isValidPhone(cleanPhone)) {
      alert("Please enter a valid phone number in the format 2557XXXXXXXX.");
      return;
    }

    if (!imageURL) {
      alert("Upload image kwanza");
      return;
    }

    setIsLoading(true);

    try {
      await addDoc(collection(db, "products"), {
        name: cleanName,
        price: parseFloat(price),
        phone: cleanPhone,
        location: cleanLocation,
        category,
        image: imageURL,
        likes: 0,
        time: Date.now(),
      });

      setName("");
      setPrice("");
      setPhone("");
      setLocation("");
      setCategory("Electronics");
      setImageFile(null);
      setImageURL("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      alert("✅ Product posted successfully");
      onClose();
      onPostSuccess();
    } catch (error) {
      console.error("Post error:", error);
      alert("❌ Error posting. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="card-solid max-w-sm w-full max-h-screen overflow-y-auto p-6 border-slate-600/50 animate-slide-up">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
            📸 Post Your Product
          </h3>
          <p className="text-sm text-slate-400">Share your item with buyers</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Product Name
            </label>
            <input
              type="text"
              placeholder="e.g., iPhone 14 Pro"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-styled"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Price (TZS)
              </label>
              <input
                type="number"
                placeholder="50000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input-styled"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                WhatsApp
              </label>
              <input
                type="text"
                placeholder="255..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-styled"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="e.g., Dar es Salaam"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-styled"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-styled"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Product Image
            </label>
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImageFile(file);
                    handleImageChange(file);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="input-styled cursor-pointer flex items-center justify-center border-2 border-dashed border-slate-600 hover:border-blue-500/50">
                <span className="text-sm text-slate-400">
                  {imageURL ? "✓ Image uploaded" : "Click to upload image"}
                </span>
              </div>
            </div>
            {imageURL && (
              <div className="mt-2 text-xs text-green-400 font-medium">
                ✅ Image ready to post
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid gap-3 sm:grid-cols-[1.4fr_0.8fr]">
          <button
            onClick={handlePost}
            disabled={isLoading}
            className="btn-primary group"
          >
            {isLoading ? (
              <span className="inline-block animate-spin">⏳</span>
            ) : (
              "📤 Post Product"
            )}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
