"use client";

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  const tabs = [
    { id: "home", label: "🏠 Home" },
    { id: "shop", label: "📦 Shop" },
    { id: "services", label: "⚙ Services" },
    { id: "wallet", label: "💰 Wallet" },
    { id: "nufaika", label: "🎯 Nufaika" },
  ];

  return (
    <div className="sticky top-16 z-40 backdrop-blur-md border-b border-slate-700/50 bg-slate-900/80">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth group ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {/* Background */}
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-cyan-600/80 rounded-lg -z-10 blur-md"></div>
              )}
              <div
                className={`absolute inset-0 rounded-lg transition-smooth ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                    : "bg-slate-800/50 group-hover:bg-slate-700/50"
                }`}
                style={{ zIndex: -1 }}
              ></div>

              <span className="relative z-10">{tab.label}</span>

              {/* Underline animation */}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
