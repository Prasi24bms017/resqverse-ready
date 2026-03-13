import { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";

const EmergencyPortal = () => {
  const [location, setLocation] = useState("Detecting location...");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [alertSent, setAlertSent] = useState(false);
  const [drillActive, setDrillActive] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState("");

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

  const handleSendAlert = () => {
    if (!selectedEmergency) {
      alert("Please select an emergency type first!");
      return;
    }
    setAlertSent(true);
    alert(`🚨 School Alert Sent!\n\nType: ${selectedEmergency}\nLocation: ${location}\n\nAll students, parents and emergency services have been notified!`);
    setTimeout(() => setAlertSent(false), 3000);
  };

  const handleStartDrill = () => {
    setDrillActive(true);
    alert("🔔 Drill Started!\n\nAll students have been notified.\nMonitor their responses in Student Reports.");
    setTimeout(() => setDrillActive(false), 3000);
  };

  const emergencyTypes = [
    "🔥 Fire",
    "🌍 Earthquake",
    "🌊 Flood",
    "⚡ Storm",
    "🏥 Medical Emergency",
    "🔒 Lockdown",
  ];

  const emergencyContacts = [
    { label: "🚔 Police", num: "100" },
    { label: "🚑 Ambulance", num: "108" },
    { label: "🔥 Fire Dept", num: "101" },
    { label: "📞 NDMA", num: "1078" },
  ];

  const activeAlerts = [
    { type: "🔴 Flood Warning", area: "Zone 3 — Near School", time: "1 hr ago", level: "HIGH" },
    { type: "🟡 Heavy Rainfall", area: "Ludhiana District", time: "3 hrs ago", level: "MEDIUM" },
  ];

  const drillTypes = [
    { name: "Fire Evacuation Drill", icon: "🔥", duration: "15 min" },
    { name: "Earthquake Drop Drill", icon: "🌍", duration: "10 min" },
    { name: "Flood Evacuation Drill", icon: "🌊", duration: "20 min" },
  ];

  return (
    <div className="app-container min-h-screen pb-24">
      <div className="px-6 py-5">
        <BackButton to="/teacher/dashboard" />

        <div className="flex items-center gap-2 mt-4 mb-6">
          <h1 className="text-xl font-bold">Emergency Portal 🚨</h1>
          <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
        </div>

        {/* Location Card */}
        <div className="bg-card card-glow p-4 mb-5">
          <p className="text-xs text-muted-foreground mb-1">📍 School Location</p>
          <p className="text-sm font-medium">{location}</p>
          {coords && (
            <button
              onClick={openMaps}
              className="text-xs text-primary mt-1"
            >
              View on Google Maps →
            </button>
          )}
        </div>

        {/* Emergency Type Selection */}
        <p className="text-sm font-semibold mb-3">Select Emergency Type</p>
        <div className="grid grid-cols-3 gap-2 mb-5">
          {emergencyTypes.map((e) => (
            <button
              key={e}
              onClick={() => setSelectedEmergency(e)}
              className={`p-3 rounded-xl text-xs font-medium text-center transition ${
                selectedEmergency === e
                  ? "bg-destructive text-white"
                  : "bg-card hover:bg-secondary"
              }`}
            >
              {e}
            </button>
          ))}
        </div>

        {/* Send Alert Button */}
        <button
          onClick={handleSendAlert}
          className={`w-full py-4 rounded-2xl font-bold text-base mb-6 transition-all ${
            alertSent
              ? "bg-yellow-500/50 text-yellow-300"
              : "bg-destructive text-white hover:bg-destructive/80"
          }`}
        >
          {alertSent ? "✅ ALERT SENT!" : "🚨 SEND SCHOOL ALERT"}
        </button>

        {/* Active Alerts */}
        <h2 className="font-semibold mb-3">Active Alerts</h2>
        <div className="space-y-2 mb-6">
          {activeAlerts.map((a, i) => (
            <div
              key={i}
              className={`rounded-2xl p-3 border ${
                a.level === "HIGH"
                  ? "bg-destructive/10 border-destructive/30"
                  : "bg-yellow-500/10 border-yellow-500/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{a.type}</p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    a.level === "HIGH"
                      ? "bg-destructive/20 text-destructive"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {a.level}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{a.area}</p>
              <p className="text-xs text-muted-foreground">{a.time}</p>
            </div>
          ))}
        </div>

        {/* Drill Section */}
        <h2 className="font-semibold mb-3">Start a Drill</h2>
        <div className="space-y-2 mb-5">
          {drillTypes.map((d) => (
            <div
              key={d.name}
              className="bg-card card-glow p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{d.icon}</span>
                <div>
                  <p className="text-sm font-medium">{d.name}</p>
                  <p className="text-xs text-muted-foreground">Duration: {d.duration}</p>
                </div>
              </div>
              <button
                onClick={handleStartDrill}
                className={`text-xs px-3 py-1.5 rounded-lg transition ${
                  drillActive
                    ? "bg-green-500/20 text-green-400"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                {drillActive ? "Running..." : "Start"}
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

        {/* Student Safety Status */}
        <h2 className="font-semibold mb-3">Student Safety Status</h2>
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-green-400">128</p>
            <p className="text-xs text-muted-foreground">Safe ✅</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-yellow-400">8</p>
            <p className="text-xs text-muted-foreground">Unconfirmed 🟡</p>
          </div>
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-destructive">6</p>
            <p className="text-xs text-muted-foreground">Need Help 🆘</p>
          </div>
        </div>

        <button className="w-full bg-secondary text-foreground font-semibold py-3 rounded-xl hover:bg-secondary/80 transition">
          📄 Download Emergency Plan
        </button>
      </div>
      <BottomNav type="teacher" />
    </div>
  );
};

export default EmergencyPortal;
