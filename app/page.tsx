"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Tabs from "@/components/Tabs";
import HomePage from "@/components/HomePage";
import ShopPage from "@/components/ShopPage";
import ServicesPage from "@/components/ServicesPage";
import WalletPage from "@/components/WalletPage";
import NufaikaPage from "@/components/NufaikaPage";
import PostModal from "@/components/PostModal";
import FloatingButton from "@/components/FloatingButton";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main className="min-h-screen bg-slate-950">
      <Header />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <div className="pb-20">
        {activeTab === "home" && <HomePage key={refreshKey} />}
        {activeTab === "shop" && <ShopPage />}
        {activeTab === "services" && <ServicesPage />}
        {activeTab === "wallet" && <WalletPage />}
        {activeTab === "nufaika" && <NufaikaPage />}
      </div>

      {/* Floating Button */}
      <FloatingButton onClick={() => setIsPostModalOpen(true)} />

      {/* Post Modal */}
      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onPostSuccess={() => setRefreshKey((k) => k + 1)}
      />
    </main>
  );
}
