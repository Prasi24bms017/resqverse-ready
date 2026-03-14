import { useNavigate } from "react-router-dom";

const MapTab = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-5">
      <h2 className="text-xl font-black mb-1">🗺️ Safety Map</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Find hospitals, shelters and safe zones near you
      </p>

      {/* Open Map Button */}
      <button
        onClick={() => navigate("/parent/map")}
        className="w-full bg-gradient-to-br from-green-900/40 to-teal-900/40 border border-green-500/30 rounded-2xl p-6 text-center hover:scale-[1.02] transition-transform mb-5"
      >
        <p className="text-6xl mb-3">🗺️</p>
        <p className="font-bold text-white text-lg">Open Live Safety Map</p>
        <p className="text-xs text-white/60 mt-1">Real GPS • Hospitals • Police • Shelters</p>
        <div className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-xl text-sm font-semibold inline-block">
          Open Map →
        </div>
      </button>

      {/* What you'll find */}
      <h3 className="font-semibold mb-3">What you'll find on the map</h3>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { emoji: "🏥", label: "Hospitals", desc: "Nearest medical help" },
          { emoji: "🚔", label: "Police", desc: "Law enforcement nearby" },
          { emoji: "🏫", label: "Schools", desc: "Safe shelter points" },
          { emoji: "⚠️", label: "Danger Zones", desc: "Active hazard areas" },
        ].map((item) => (
          <div key={item.label} className="bg-card card-glow p-3 rounded-2xl">
            <p className="text-2xl mb-1">{item.emoji}</p>
            <p className="text-sm font-semibold">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Active Alerts */}
      <h3 className="font-semibold mb-3">🔴 Active Alerts</h3>
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

      {/* Teacher Section */}
      <button
        onClick={() => navigate("/teacher/login")}
        className="w-full bg-card card-glow p-4 flex items-center gap-3 rounded-2xl hover:bg-secondary transition"
      >
        <span className="text-2xl">👨‍🏫</span>
        <div className="text-left">
          <p className="font-semibold text-sm">Teacher — Report School Hazard</p>
          <p className="text-xs text-muted-foreground">Login to report hazards near your school</p>
        </div>
        <span className="ml-auto text-muted-foreground">→</span>
      </button>
    </div>
  );
};

export default MapTab;