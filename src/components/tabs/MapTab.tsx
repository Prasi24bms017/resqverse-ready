import { useNavigate } from "react-router-dom";

const MapTab = ({ role }: { role: string }) => {
  const navigate = useNavigate();

  if (role === "kids") {
    return (
      <div className="px-6 py-5 text-center mt-16">
        <p className="text-4xl mb-4">🔒</p>
        <p className="font-bold text-lg">Parents Only</p>
        <p className="text-muted-foreground text-sm mt-2">Ask your parent to check the safety map.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-5">
      <h2 className="text-lg font-bold mb-4">🗺️ Safety Map</h2>
      <div
        className="bg-card card-glow rounded-2xl p-6 text-center cursor-pointer hover:bg-secondary transition mb-4"
        onClick={() => navigate("/parent/map")}
      >
        <p className="text-5xl mb-3">🗺️</p>
        <p className="font-bold">Open Safety Map</p>
        <p className="text-xs text-muted-foreground mt-1">Real GPS • Hospitals • Police • Shelters</p>
        <button className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-xl text-sm font-semibold">
          Open Map →
        </button>
      </div>

      {/* Active Alerts */}
      <h3 className="font-semibold mb-3">Active Alerts</h3>
      <div className="space-y-2">
        <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-3">
          <p className="text-sm">🔴 IMD: Heavy rainfall — Ludhiana</p>
          <p className="text-xs text-muted-foreground mt-1">1 hr ago</p>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-3">
          <p className="text-sm">🟡 NDMA: Flood watch — Zone 3</p>
          <p className="text-xs text-muted-foreground mt-1">3 hrs ago</p>
        </div>
      </div>
    </div>
  );
};

export default MapTab;