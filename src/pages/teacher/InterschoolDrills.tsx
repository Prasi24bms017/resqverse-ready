import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";

const upcoming = [
  { name: "Joint Fire Evacuation", type: "🔥 Fire", date: "Mar 18, 2026 — 10:00 AM", schools: 15 },
  { name: "Earthquake Response Drill", type: "🌍 Earthquake", date: "Mar 25, 2026 — 11:30 AM", schools: 10 },
  { name: "Flood Emergency Drill", type: "🌊 Flood", date: "Apr 2, 2026 — 9:00 AM", schools: 8 },
];

const past = [
  { name: "Cyclone Awareness Drill", date: "Feb 20, 2026", result: "Rank #2 — 1,240 pts" },
  { name: "Fire Safety Sprint", date: "Jan 15, 2026", result: "Rank #1 — 1,520 pts" },
];

const InterschoolDrills = () => (
  <div className="app-container min-h-screen pb-24">
    <div className="px-6 py-5">
      <BackButton to="/home" />
      <h1 className="text-xl font-bold mt-4 mb-4">Interschool Drills 🎯</h1>

      <div className="space-y-3 mb-8">
        {upcoming.map((d) => (
          <div key={d.name} className="bg-card card-glow p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">{d.type}</span>
              <h3 className="font-medium text-sm">{d.name}</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-1">📅 {d.date}</p>
            <p className="text-xs text-muted-foreground mb-3">🏫 {d.schools} schools participating</p>
            <button className="bg-primary text-primary-foreground text-xs px-4 py-2 rounded-lg hover:opacity-90 transition">
              Register
            </button>
          </div>
        ))}
      </div>

      <h2 className="font-semibold mb-3">Past Drills</h2>
      <div className="space-y-2 mb-6">
        {past.map((p) => (
          <div key={p.name} className="bg-card card-glow p-4">
            <h3 className="font-medium text-sm">{p.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{p.date} • {p.result}</p>
          </div>
        ))}
      </div>

      <button className="w-full bg-secondary text-foreground font-semibold py-3 rounded-xl hover:bg-secondary/80 transition">
        + Schedule New Drill
      </button>
    </div>
    <BottomNav type="teacher" />
  </div>
);

export default InterschoolDrills;
