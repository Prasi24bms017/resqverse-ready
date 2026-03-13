import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";

// Fix Leaflet default icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const filters = ["All", "Hospitals", "Shelters", "Water", "Police"];

// Custom colored icons
const createIcon = (color: string, emoji: string) =>
  L.divIcon({
    html: `<div style="background:${color};width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4)">${emoji}</div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

const youIcon = L.divIcon({
  html: `<div style="background:#3b82f6;width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 0 0 4px rgba(59,130,246,0.3),0 2px 8px rgba(0,0,0,0.4);animation:pulse 2s infinite"></div>`,
  className: "",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Component to set map view to user location
const LocationSetter = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => { map.setView(position, 14); }, [position]);
  return null;
};

const AwarenessMap = () => {
  const [filter, setFilter] = useState("All");
  const [userPos, setUserPos] = useState<[number, number]>([30.9010, 75.8573]); // Default: Ludhiana
  const [locationName, setLocationName] = useState("Detecting location...");
  const [locating, setLocating] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPos([pos.coords.latitude, pos.coords.longitude]);
          setLocationName("Your Location (Live)");
          setLocating(false);
        },
        () => {
          setLocationName("Ludhiana, Punjab");
          setLocating(false);
        }
      );
    } else {
      setLocationName("Ludhiana, Punjab");
      setLocating(false);
    }
  }, []);

  // Nearby locations relative to user position
  const nearbyLocations = [
    { emoji: "🏥", name: "Civil Hospital", dist: "1.2km", info: "Open 24/7", offset: [0.008, 0.01] as [number, number] },
    { emoji: "🏫", name: "School Shelter", dist: "0.8km", info: "Capacity 500", offset: [-0.005, 0.007] as [number, number] },
    { emoji: "💧", name: "Water Point", dist: "0.5km", info: "Active", offset: [0.003, -0.006] as [number, number] },
  ];

  return (
    <div className="app-container min-h-screen pb-24">
      <div className="px-6 py-5">
        <BackButton to="/parent/home" />
        <div className="flex items-center gap-2 mt-4 mb-4">
          <h1 className="text-xl font-bold">Safety Map 🗺️</h1>
          <span className={`w-2.5 h-2.5 rounded-full ${locating ? "bg-yellow-400" : "bg-green-400"} animate-pulse`} />
          <span className="text-xs text-muted-foreground">{locationName}</span>
        </div>

        {/* Real Leaflet Map */}
        <div className="rounded-2xl overflow-hidden border border-border mb-4" style={{ height: "300px" }}>
          <MapContainer
            center={userPos}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
            zoomControl={true}
            attributionControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationSetter position={userPos} />

            {/* User location */}
            <Marker position={userPos} icon={youIcon}>
              <Popup>📍 You are here</Popup>
            </Marker>

            {/* Danger zone circle */}
            <Circle
              center={[userPos[0] + 0.012, userPos[1] - 0.015]}
              radius={400}
              pathOptions={{ color: "#ef4444", fillColor: "#ef4444", fillOpacity: 0.2 }}
            />
            <Marker position={[userPos[0] + 0.012, userPos[1] - 0.015]} icon={createIcon("#ef4444", "⚠️")}>
              <Popup>🔴 Flood Zone — Active Warning</Popup>
            </Marker>

            {/* Safe shelter */}
            <Circle
              center={[userPos[0] - 0.008, userPos[1] + 0.012]}
              radius={300}
              pathOptions={{ color: "#22c55e", fillColor: "#22c55e", fillOpacity: 0.2 }}
            />
            <Marker position={[userPos[0] - 0.008, userPos[1] + 0.012]} icon={createIcon("#22c55e", "✅")}>
              <Popup>🟢 Safe Shelter — Capacity 500</Popup>
            </Marker>

            {/* Nearby locations */}
            {nearbyLocations.map((loc) => (
              <Marker
                key={loc.name}
                position={[userPos[0] + loc.offset[0], userPos[1] + loc.offset[1]]}
                icon={createIcon(
                  loc.emoji === "🏥" ? "#3b82f6" : loc.emoji === "🏫" ? "#8b5cf6" : "#06b6d4",
                  loc.emoji
                )}
              >
                <Popup>{loc.name} — {loc.dist} — {loc.info}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
          <span>🔴 Danger</span><span>🟢 Safe</span><span>🔵 You</span><span>🟣 Shelter</span><span>🩵 Water</span>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Nearby Locations */}
        <h2 className="font-semibold mb-3">Nearby Safe Locations</h2>
        <div className="space-y-3 mb-6">
          {nearbyLocations.map((l) => (
            <div key={l.name} className="bg-card card-glow p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">{l.emoji}</span>
                <div>
                  <p className="text-sm font-medium">{l.name}</p>
                  <p className="text-xs text-muted-foreground">{l.dist} • {l.info}</p>
                </div>
              </div>
              <button className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-lg">
                Get Route
              </button>
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