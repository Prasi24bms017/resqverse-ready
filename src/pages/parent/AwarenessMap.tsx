import { useState } from "react";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";

const filters = ["All", "Hospitals", "Shelters", "Water", "Police"];

const AwarenessMap = () => {
  const [filter, setFilter] = useState("All");

  return (
    <div className="app-container min-h-screen pb-24">
      <div className="px-6 py-5">
        <BackButton to="/parent/home" />
        <div className="flex items-center gap-2 mt-4 mb-4">
          <h1 className="text-xl font-bold">Safety Map 🗺️</h1>
          <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
        </div>

        {/* Simulated Map */}
        <div className="relative bg-secondary/50 rounded-2xl h-[280px] mb-4 overflow-hidden border border-border">
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }} />
          {/* Markers */}
          <div className="absolute top-12 left-16 flex items-center gap-1">
            <span className="w-8 h-8 bg-red-500/30 border border-red-500 rounded-full flex items-center justify-center text-xs">⚠️</span>
            <span className="text-[9px] bg-card/90 px-1.5 py-0.5 rounded text-red-400">Flood Zone</span>
          </div>
          <div className="absolute top-24 right-12 flex items-center gap-1">
            <span className="w-8 h-8 bg-green-500/30 border border-green-500 rounded-full flex items-center justify-center text-xs">✅</span>
            <span className="text-[9px] bg-card/90 px-1.5 py-0.5 rounded text-green-400">Safe Shelter</span>
          </div>
          <div className="absolute bottom-20 left-24 flex items-center gap-1">
            <span className="w-8 h-8 bg-orange-500/30 border border-orange-500 rounded-full flex items-center justify-center text-xs">⚠️</span>
            <span className="text-[9px] bg-card/90 px-1.5 py-0.5 rounded text-orange-400">Landslide Risk</span>
          </div>
          <div className="absolute bottom-16 right-20">
            <span className="w-4 h-4 bg-blue-400 rounded-full animate-pulse block" />
            <span className="text-[9px] bg-card/90 px-1.5 py-0.5 rounded text-blue-400 mt-1 block">📍 You</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
          <span>🔴 Danger</span><span>🟢 Safe</span><span>🟠 Warning</span><span>🔵 You</span>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-5 overflow-x-auto">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition ${filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Nearby Locations */}
        <h2 className="font-semibold mb-3">Nearby Safe Locations</h2>
        <div className="space-y-3 mb-6">
          {[
            { emoji: "🏥", name: "Civil Hospital", dist: "1.2km", info: "Open 24/7" },
            { emoji: "🏫", name: "School Shelter", dist: "0.8km", info: "Capacity 500" },
            { emoji: "💧", name: "Water Point", dist: "0.5km", info: "Active" },
          ].map((l) => (
            <div key={l.name} className="bg-card card-glow p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">{l.emoji}</span>
                <div>
                  <p className="text-sm font-medium">{l.name}</p>
                  <p className="text-xs text-muted-foreground">{l.dist} • {l.info}</p>
                </div>
              </div>
              <button className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-lg">Get Route</button>
            </div>
          ))}
        </div>

        {/* Active Alerts */}
        <h2 className="font-semibold mb-3">Active Alerts</h2>
        <div className="space-y-2 mb-6">
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-3">
            <p className="text-sm">🔴 IMD: Heavy rainfall — Ludhiana</p>
            <p className="text-xs text-muted-foreground mt-1">1 hr ago</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-3">
            <p className="text-sm">🟡 NDMA: Flood watch — Zone 3</p>
            <p className="text-xs text-muted-foreground mt-1">3 hrs ago</p>
          </div>
        </div>

        <button className="w-full bg-orange-500/20 text-orange-400 font-semibold py-3 rounded-xl hover:bg-orange-500/30 transition">
          🚨 Report Hazard
        </button>
      </div>
      <BottomNav type="parent" />
    </div>
  );
};

export default AwarenessMap;
