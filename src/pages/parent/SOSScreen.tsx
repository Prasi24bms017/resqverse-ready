import { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";

const SOSScreen = () => {
  const [location, setLocation] = useState("Detecting location...");
  const [helpType, setHelpType] = useState("");
  const [sosActive, setSosActive] = useState(false);
  const [needHelp, setNeedHelp] = useState(false);
  const [canHelp, setCanHelp] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoords({ lat: latitude, lng: longitude });
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)} (Live)`);
        },
        () => setLocation("Ludhiana, Punjab (Default)")
      );
    }
  }, []);

  const openMaps = () => {
    if (coords) {
      window.open(`https://maps.google.com/?q=${coords.lat},${coords.lng}`, "_blank");
    }
  };

  const callNumber = (num: string) => {
    window.location.href = `tel:${num}`;
  };

  const handleSOS = () => {
    setSosActive(true);
    alert("🚨 SOS Alert Sent!\n\nYour location has been shared with nearby volunteers and emergency services.");
    setTimeout(() => setSosActive(false), 3000);
  };

  const handleNeedHelp = () => {
    setNeedHelp(true);
    setCanHelp(false);
    alert(`🆘 Help Request Sent!\n\nType: ${helpType || "General Emergency"}\nLocation: ${location}\n\nNearby volunteers have been notified!`);
  };

  const handleCanHelp = () => {
    setCanHelp(true);
    setNeedHelp(false);
    alert("🤝 You've been marked as Available to Help!\n\nPeople nearby can now see you as a volunteer.");
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
    <div className="app-container min-h-screen pb-24">
      <div className="gradient-sos min-h-screen">
        <div className="px-6 py-5">
          <BackButton to="/parent/home" />

          <div className="flex items-center gap-2 mt-4 mb-8">
            <h1 className="text-xl font-bold">Emergency Help 🚨</h1>
            <span
              className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                sosActive ? "bg-yellow-400" : "bg-red-500"
              }`}
            />
          </div>

          {/* SOS Button */}
          <div className="flex justify-center mb-4">
            <button
              onClick={handleSOS}
              className={`w-36 h-36 rounded-full border-4 flex items-center justify-center text-3xl font-black transition-all duration-200 ${
                sosActive
                  ? "bg-yellow-500/50 border-yellow-400 text-yellow-300 scale-95"
                  : "bg-destructive/30 border-destructive text-destructive animate-pulse hover:scale-110 hover:bg-destructive/50"
              }`}
            >
              {sosActive ? "SENT!" : "SOS"}
            </button>
          </div>
          <p className="text-center text-sm text-muted-foreground mb-8">
            {sosActive ? "✅ Alert sent to emergency services!" : "Tap for Emergency"}
          </p>

          {/* Action Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={handleNeedHelp}
              className={`border rounded-2xl p-4 text-center transition ${
                needHelp
                  ? "bg-destructive/40 border-destructive"
                  : "bg-destructive/20 border-destructive/30 hover:bg-destructive/30"
              }`}
            >
              <span className="text-2xl block mb-1">🆘</span>
              <p className="text-sm font-bold text-destructive">
                {needHelp ? "HELP REQUESTED!" : "I NEED HELP"}
              </p>
            </button>
            <button
              onClick={handleCanHelp}
              className={`border rounded-2xl p-4 text-center transition ${
                canHelp
                  ? "bg-green-500/40 border-green-400"
                  : "bg-green-500/20 border-green-500/30 hover:bg-green-500/30"
              }`}
            >
              <span className="text-2xl block mb-1">🤝</span>
              <p className="text-sm font-bold text-green-400">
                {canHelp ? "MARKED AVAILABLE!" : "I CAN HELP"}
              </p>
            </button>
          </div>

          {/* Help Type */}
          <p className="text-sm font-semibold mb-3">What kind of help do you need?</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {["🍱 Food", "💧 Water", "🏠 Shelter", "🏥 Medical", "📦 Other"].map((t) => (
              <button
                key={t}
                onClick={() => setHelpType(t)}
                className={`text-sm px-3 py-1.5 rounded-full transition ${
                  helpType === t
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Location */}
          <div className="bg-card card-glow p-4 mb-6">
            <p className="text-xs text-muted-foreground mb-1">📍 Your Location</p>
            <p className="text-sm font-medium">{location}</p>
            {coords && (
              <button
                onClick={openMaps}
                className="text-xs text-primary mt-1 block"
              >
                View on Google Maps →
              </button>
            )}
          </div>

          {/* Helpers */}
          <h2 className="font-semibold mb-3">Nearby Available Helpers</h2>
          <div className="space-y-2 mb-6">
            {helpers.map((h) => (
              <div
                key={h.name}
                className="bg-card card-glow p-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium">{h.name}</p>
                  <p className="text-xs text-muted-foreground">{h.dist} • Available 🟢</p>
                </div>
                <button
                  onClick={() => callNumber(h.phone)}
                  className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-lg"
                >
                  Call Now
                </button>
              </div>
            ))}
          </div>

          {/* Emergency Contacts */}
          <h2 className="font-semibold mb-3">Emergency Contacts</h2>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {emergencyContacts.map((c) => (
              <button
                key={c.num}
                onClick={() => callNumber(c.num)}
                className="bg-card card-glow p-3 text-center hover:bg-secondary transition"
              >
                <p className="text-sm">{c.label}</p>
                <p className="text-primary font-bold">{c.num}</p>
              </button>
            ))}
          </div>

          {/* Network Status */}
          <div className="bg-card card-glow p-3 mb-4">
            <p className="text-xs text-muted-foreground mb-2">Network Status</p>
            <div className="flex gap-2 flex-wrap">
              {["📡 Bluetooth", "📱 SMS", "📻 LoRaWAN"].map((m) => (
                <span
                  key={m}
                  className="bg-secondary text-xs px-3 py-1.5 rounded-full text-muted-foreground"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          <button className="w-full bg-secondary text-foreground font-semibold py-3 rounded-xl hover:bg-secondary/80 transition">
            📄 Download Offline Guide
          </button>
        </div>
      </div>
      <BottomNav type="parent" />
    </div>
  );
};

export default SOSScreen;
