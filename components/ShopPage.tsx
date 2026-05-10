"use client";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
        <div className="card-solid border border-slate-800/70 p-8 overflow-hidden relative">
          <div className="absolute -top-8 right-6 h-36 w-36 rounded-full bg-cyan-500/15 blur-3xl"></div>
          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-2">📍 Explore Nearby Sellers</h2>
            <p className="text-slate-400 max-w-2xl">
              Discover live seller locations and trusted marketplaces with a polished commercial map experience.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.55fr_0.9fr]">
          <div className="card-glass overflow-hidden border border-slate-800/70 rounded-[28px]">
            <iframe
              width="100%"
              height="620"
              src="https://www.google.com/maps?q=Dar+es+Salaam&output=embed&t=k"
              style={{ borderRadius: "28px", border: "none" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="space-y-5">
            <div className="card-solid border border-slate-800/70 rounded-[28px] p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Market insights</h3>
              <p className="text-slate-400 mb-4">
                See where demand is strongest and plan your next listings with confidence.
              </p>
              <div className="grid gap-4">
                {[
                  { label: "Top city", value: "Dar es Salaam" },
                  { label: "Best category", value: "Electronics" },
                  { label: "Delivery partner", value: "Regional logistics" },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl bg-slate-900/90 border border-slate-700/50 p-4">
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-glass border border-slate-800/70 rounded-[28px] p-6">
              <h3 className="text-xl font-semibold text-white mb-3">How to use</h3>
              <ol className="space-y-3 text-sm text-slate-400 list-decimal list-inside">
                <li>Browse the map to find active seller hotspots.</li>
                <li>Review listings and compare prices instantly.</li>
                <li>Message sellers directly and finalize deals quickly.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

