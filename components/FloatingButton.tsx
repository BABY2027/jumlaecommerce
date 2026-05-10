"use client";

import { useState } from "react";

interface FloatingButtonProps {
  onClick: () => void;
}

export default function FloatingButton({ onClick }: FloatingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-4">
      {isHovered && (
        <div className="flex flex-col gap-3 animate-slide-in">
          <button className="flex items-center gap-2 rounded-full bg-slate-900/95 border border-slate-700 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm hover:bg-slate-800 transition-smooth">
            📸 Photo
          </button>
          <button className="flex items-center gap-2 rounded-full bg-slate-900/95 border border-slate-700 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm hover:bg-slate-800 transition-smooth">
            📝 Draft
          </button>
        </div>
      )}
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-3xl font-bold text-white shadow-2xl shadow-cyan-500/30 transition-all duration-300 hover:from-blue-700 hover:to-cyan-700 hover:scale-110 hover:shadow-cyan-500/50 active:scale-95"
      >
        ➕
      </button>
    </div>
  );
}
