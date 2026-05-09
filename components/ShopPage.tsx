"use client";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="card-solid p-8 border-slate-600/50 mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            📍 Explore Locations
          </h2>
          <p className="text-slate-400">
            Find sellers near you using our interactive map
          </p>
        </div>

        <div className="card-glass overflow-hidden border-slate-600/50">
          <iframe
            width="100%"
            height="600"
            src="https://www.google.com/maps?q=Dar+es+Salaam&output=embed&t=k"
            style={{ borderRadius: "12px", border: "none" }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
