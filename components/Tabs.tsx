"use client";

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  const tabs = [
    { id: "home", label: "Home" },
    { id: "shop", label: "Shop" },
    { id: "services", label: "Services" },
    { id: "wallet", label: "Wallet" },
    { id: "nufaika", label: "Nufaika" },
  ];

  return (
    <div className="sticky top-[76px] z-40 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl shadow-sm shadow-slate-950/10">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/10"
                    : "bg-slate-900/80 text-slate-300 hover:bg-slate-800/95"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Tap to switch sections
          </span>
        </div>
      </div>
    </div>
  );
}
