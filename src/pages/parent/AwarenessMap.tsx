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

const filters = ["All", "Hospitals", "Schools", "Police"];

const createIcon = (color: string, emoji: string) =>
  L.divIcon({
    html: `<div style="background:${color};width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4)">${emoji}</div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

const youIcon = L.divIcon({
  html: `<div style="background:#3b82f6;width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 0 0 4px rgba(59,130,246,0.3),0 2px 8px rgba(0,0,0,0.4)"></div>`,
  className: "",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const LocationSetter = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => { map.setView(position, 14); }, [position]);
  return null;
};

interface Place {
  id: number;
  lat: number;
  lon: number;
  tags: { name?: string; amenity?: string };
  type: string;
  emoji: string;
  color: string;
  dist: string;
}

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d < 1 ? `${(d * 1000).toFixed(0)}m` : `${d.toFixed(1)}km`;
};

const AwarenessMap = () => {
  const [filter, setFilter] = useState("All");
  const [userPos, setUserPos] = useState<[number, number]>([30.901, 75.8573]);
  const [locationName, setLocationName] = useState("Detecting location...");
  const [locating, setLocating] = useState(true);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);

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

  // Fetch real nearby places from Overpass API
  useEffect(() => {
    if (locating) return;
    const fetchPlaces = async () => {
      setLoadingPlaces(true);
      const [lat, lon] = userPos;
      const radius = 3000;
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:${radius},${lat},${lon});
          node["amenity"="clinic"](around:${radius},${lat},${lon});
          node["amenity"="school"](around:${radius},${lat},${lon});
          node["amenity"="police"](around:${radius},${lat},${lon});
        );
        out body;
      `;
      try {
        const res = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: query,
        });
        const data = await res.json();
        const mapped: Place[] = data.elements
          .filter((el: any) => el.lat && el.lon)
          .slice(0, 20)
          .map((el: any) => {
            const amenity = el.tags?.amenity;
            let emoji = "📍";
            let color = "#6b7280";
            let type = "Other";
            if (amenity === "hospital" || amenity === "clinic") {
              emoji = "🏥"; color = "#3b82f6"; type = "Hospitals";
            } else if (amenity === "school") {
              emoji = "🏫"; color = "#8b5cf6"; type = "Schools";
            } else if (amenity === "police") {
              emoji = "🚔"; color = "#f59e0b"; type = "Police";
            }
            return {
              id: el.id,
              lat: el.lat,
              lon: el.lon,
              tags: el.tags,
              type,
              emoji,
              color,
              dist: getDistance(lat, lon, el.lat, el.lon),
            };
          });
        setPlaces(mapped);
      } catch (e) {
        console.error("Overpass API error", e);
      } finally {
        setLoadingPlaces(false);
      }
    };
    fetchPlaces();
  }, [locating, userPos]);

  const filteredPlaces = places.filter(
    (p) => filter === "All" || p.type === filter
  );

  const openRoute = (lat: number, lon: number) => {
    window.open(`https://maps.google.com/?daddr=${lat},${lon}`, "_blank");
  };

  return (
    <div className="app-container min-h-screen pb-24">
      <div className="px-6 py-5">
        <BackButton to="/parent/home" />
        <div className="flex items-center gap-2 mt-4 mb-4">
          <h1 className="text-xl font-bold">Safety Map 🗺️</h1>
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              locating ? "bg-yellow-400" : "bg-green-400"
            } animate-pulse`}
          />
          <span className="text-xs text-muted-foreground">{locationName}</span>
        </div>

        {/* Map */}
        <div
          className="rounded-2xl overflow-hidden border border-border mb-4"
          style={{ height: "320px" }}
        >
          <MapContainer
            center={userPos}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
            zoomControl={true}
            attributionControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationSetter position={userPos} />

            {/* User */}
            <Marker position={userPos} icon={youIcon}>
              <Popup>📍 You are here</Popup>
            </Marker>

            {/* Danger zone */}
            <Circle
              center={[userPos[0] + 0.012, userPos[1] - 0.015]}
              radius={400}
              pathOptions={{ color: "#ef4444", fillColor: "#ef4444", fillOpacity: 0.2 }}
            />
            <Marker
              position={[userPos[0] + 0.012, userPos[1] - 0.015]}
              icon={createIcon("#ef4444", "⚠️")}
            >
              <Popup>🔴 Flood Zone — Active Warning</Popup>
            </Marker>

            {/* Real places from Overpass */}
            {filteredPlaces.map((p) => (
              <Marker
                key={p.id}
                position={[p.lat, p.lon]}
                icon={createIcon(p.color, p.emoji)}
              >
                <Popup>
                  <strong>{p.tags.name || p.type}</strong>
                  <br />
                  {p.emoji} {p.dist} away
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
          <span>🔴 Danger</span>
          <span>🔵 You</span>
          <span>🏥 Hospital</span>
          <span>🏫 School</span>
          <span>🚔 Police</span>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Nearby List */}
        <h2 className="font-semibold mb-3">
          Nearby Places {loadingPlaces && "⏳"}
          {!loadingPlaces && `(${filteredPlaces.length} found)`}
        </h2>

        {loadingPlaces && (
          <div className="text-center text-sm text-muted-foreground py-6">
            Loading real nearby locations...
          </div>
        )}

        <div className="space-y-3 mb-6">
          {filteredPlaces.slice(0, 8).map((p) => (
            <div
              key={p.id}
              className="bg-card card-glow p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{p.emoji}</span>
                <div>
                  <p className="text-sm font-medium">
                    {p.tags.name || p.type}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {p.dist} away
                  </p>
                </div>
              </div>
              <button
                onClick={() => openRoute(p.lat, p.lon)}
                className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-lg"
              >
                Get Route
              </button>
            </div>
          ))}

          {!loadingPlaces && filteredPlaces.length === 0 && (
            <div className="text-center text-sm text-muted-foreground py-6">
              No places found nearby. Try a different filter.
            </div>
          )}
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
