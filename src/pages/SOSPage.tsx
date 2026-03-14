import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SOSPage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("Detecting location...");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [sosActive, setSosActive] = useState(false);
  const [helpType, setHelpType] = useState("");
  const [needHelp, setNeedHelp] = useState(false);
  const [canHelp, setCanHelp] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocation(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)} (Live)`);
        },
        () => setLocation("Location unavailable")
      );
    }
  }, []);

  const openMaps = () => {
    if (coords) window.open(`https://maps.google.com/?q=${coords.lat},${coords.lng}`, "_blank");
  };

  const callNumber = (num: string) => {
    window.location.href = `tel:${num}`;
  };

  const handleSOS = () => {
    setSosActive(true);
    alert("🚨 SOS Alert Sent!\n\nYour location has been shared with nearby volunteers and emergency services.");
    setTimeout(() => setSosActive(false), 3000);
  };

  const emergencyContacts = [
    { label: "🚔 Police", num: "100" },
    { label: "🚑 Ambulance", num: "108" },
    { label: "🔥 Fire", num: "101" },
    { label: "📞 NDMA", num: "1078" },
  ];

  const helpers = [
    { name: "Volunteer Raj", dist: "0.3km", phone: "9876543210" },
    { name: "Dr. Priya", dist: "0.8km", phone: "9876543211" },
  ];

  return (
    <div className="app-container min-h-screen pb-10">
      <div className="bg-red-950/50 min-h-screen">
        <div className="px-6 py-5">

          {/* Header */}
          <div className="flex items-center justify-between mt-4 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="text-white/60 text-sm hover:text-white transition"
            >
              ← Back
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Emergency Help</h1>
              <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${sosActive ? "bg-yellow-400" : "bg-red-400"}`} />
            </div>
            <div className="w-10" />
          </div>

          {/* No login needed banner */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-3 mb-6 text-center">
            <p className="text-xs text-green-400">✅ No login required — Available to everyone</p>
          </div>

          {/* SOS Button */}
          <div className="flex justify-center mb-4">
            <button
              onClick={handleSOS}
              className={`w-40 h-40 rounded-full border-4 flex flex-col items-center justify-center font-black transition-all duration-200 ${
                sosActive
                  ? "bg-yellow-500/50 border-yellow-400 text-yellow-300 scale-95"
                  : "bg-red-600/30 border-red-500 text-red-400 animate-pulse hover:scale-110"
              }`}
            >
              <span className="text-4xl">🚨</span>
              <span className="text-2xl mt-1">{sosActive ? "SENT!" : "SOS"}</span>
            </button>
          </div>
          <p className="text-center text-sm text-white/50 mb-8">
            {sosActive ? "✅ Alert sent!" : "Tap for Emergency"}
          </p>

          {/* Need Help / Can Help */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => { setNeedHelp(true); setCanHelp(false); alert(`🆘 Help Requested!\nType: ${helpType || "General"}\nLocation: ${location}`); }}
              className={`border rounded-2xl p-4 text-center transition ${needHelp ? "bg-red-500/40 border-red-400" : "bg-red-500/20 border-red-500/30"}`}
            >
              <span className="text-2xl block mb-1">🆘</span>
              <p className="text-sm font-bold text-red-400">{needHelp ? "REQUESTED!" : "I NEED HELP"}</p>
            </button>
            <button
              onClick={() => { setCanHelp(true); setNeedHelp(false); alert("🤝 You are marked as Available to Help!"); }}
              className={`border rounded-2xl p-4 text-center transition ${canHelp ? "bg-green-500/40 border-green-400" : "bg-green-500/20 border-green-500/30"}`}
            >
              <span className="text-2xl block mb-1">🤝</span>
              <p className="text-sm font-bold text-green-400">{canHelp ? "AVAILABLE!" : "I CAN HELP"}</p>
            </button>
          </div>

          {/* Help Type */}
          <p className="text-sm font-semibold text-white mb-3">What do you need?</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {["🍱 Food", "💧 Water", "🏠 Shelter", "🏥 Medical", "📦 Other"].map((t) => (
              <button
                key={t}
                onClick={() => setHelpType(t)}
                className={`text-sm px-3 py-1.5 rounded-full transition ${helpType === t ? "bg-primary text-primary-foreground" : "bg-white/10 text-white/70 hover:bg-white/20"}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Location */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
            <p className="text-xs text-white/50 mb-1">📍 Your Location</p>
            <p className="text-sm font-medium text-white">{location}</p>
            {coords && (
              <button onClick={openMaps} className="text-xs text-red-400 mt-1">
                View on Google Maps →
              </button>
            )}
          </div>

          {/* Nearby Helpers */}
          <h2 className="font-semibold text-white mb-3">Nearby Helpers</h2>
          <div className="space-y-2 mb-6">
            {helpers.map((h) => (
              <div key={h.name} className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{h.name}</p>
                  <p className="text-xs text-white/50">{h.dist} • Available 🟢</p>
                </div>
                <button
                  onClick={() => callNumber(h.phone)}
                  className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-lg"
                >
                  Call
                </button>
              </div>
            ))}
          </div>

          {/* Emergency Contacts */}
          <h2 className="font-semibold text-white mb-3">Emergency Numbers</h2>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {emergencyContacts.map((c) => (
              <button
                key={c.num}
                onClick={() => callNumber(c.num)}
                className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center hover:bg-white/10 transition"
              >
                <p className="text-sm text-white">{c.label}</p>
                <p className="text-red-400 font-bold text-lg">{c.num}</p>
              </button>
            ))}
          </div>

          {/* Network Status */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
            <p className="text-xs text-white/50 mb-2">Network Status</p>
            <div className="flex gap-2 flex-wrap">
              {["📡 Bluetooth", "📱 SMS", "📻 LoRaWAN"].map((m) => (
                <span key={m} className="bg-white/10 text-xs px-3 py-1.5 rounded-full text-white/60">{m}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SOSPage;