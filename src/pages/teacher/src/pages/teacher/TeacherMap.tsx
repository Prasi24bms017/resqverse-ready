import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const createIcon = (color: string, emoji: string) =>
  L.divIcon({
    html: `<div style="background:${color};width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4)">${emoji}</div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

const LocationSetter = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => { map.setView(position, 14); }, [position]);
  return null;
};

const TeacherMap = () => {
  const [userPos, setUserPos] = useState<[number, number]>([30.9010, 75.8573]);
  const [locationName, setLocationName] = useState("Detecting location...");

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        setUserPos([pos.coords.latitude, pos.coords.longitude]);
        setLocationName("Live Location");
      },
      () => setLocationName("Ludhiana, Punjab")
    );
  }, []);

  return (
    <div className="app-container min-h-screen pb-24">
      <div className="px-6 py-5">
        <BackButton to="/teacher/dashboard" />
        <div className="flex items-center gap-2 mt-4 mb-4">
          <h1 className="text-xl font-bold">Safety Map 🗺️</h1>
          <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-muted-foreground">{locationName}</span>
        </div>

        <div className="rounded-2xl overflow-hidden border border-border mb-4" style={{ height: "300px" }}>
          <MapContainer center={userPos} zoom={14} style={{ height: "100%", width: "100%" }} attributionControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationSetter position={userPos} />
            <Marker position={userPos} icon={createIcon("#3b82f6", "📍")}>
              <Popup>Your School Location</Popup>
            </Marker>
            <Circle center={[userPos[0] + 0.012, userPos[1] - 0.015]} radius={400}
              pathOptions={{ color: "#ef4444", fillColor: "#ef4444", fillOpacity: 0.2 }} />
            <Marker position={[userPos[0] + 0.012, userPos[1] - 0.015]} icon={createIcon("#ef4444", "⚠️")}>
              <Popup>🔴 Flood Zone — Active Warning</Popup>
            </Marker>
            <Marker position={[userPos[0] - 0.008, userPos[1] + 0.012]} icon={createIcon("#22c55e", "✅")}>
              <Popup>🟢 Safe Shelter — Capacity 500</Popup>
            </Marker>
            <Marker position={[userPos[0] + 0.008, userPos[1] + 0.01]} icon={createIcon("#3b82f6", "🏥")}>
              <Popup>🏥 Civil Hospital — 1.2km</Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
          <span>🔴 Danger</span><span>🟢 Safe</span><span>🔵 School</span><span>🏥 Hospital</span>
        </div>

        <h2 className="font-semibold mb-3">Active Alerts</h2>
        <div className="space-y-2 mb-4">
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-3">
            <p className="text-sm">🔴 IMD: Heavy rainfall — Ludhiana</p>
            <p className="text-xs text-muted-foreground mt-1">1 hr ago</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-3">
            <p className="text-sm">🟡 NDMA: Flood watch — Zone 3</p>
            <p className="text-xs text-muted-foreground mt-1">3 hrs ago</p>
          </div>
        </div>

        <button className="w-full bg-orange-500/20 text-orange-400 font-semibold py-3 rounded-xl">
          🚨 Report School Hazard
        </button>
      </div>
      <BottomNav type="teacher" />
    </div>
  );
};

export default TeacherMap;