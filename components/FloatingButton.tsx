"use client";

interface FloatingButtonProps {
  onClick: () => void;
}

export default function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white text-3xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-smooth shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-110 active:scale-95 z-40"
    >
      ➕
    </button>
  );
}
