import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";

const SOSScreen = () => (
  <div className="app-container min-h-screen pb-24">
    <div className="gradient-sos min-h-screen">
      <div className="px-6 py-5">
        <BackButton to="/parent/home" />
        <div className="flex items-center gap-2 mt-4 mb-8">
          <h1 className="text-xl font-bold">Emergency Help 🚨</h1>
          <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
        </div>

        {/* SOS Button */}
        <div className="flex justify-center mb-4">
          <button className="w-36 h-36 rounded-full bg-destructive/30 border-4 border-destructive flex items-center justify-center text-3xl font-black text-destructive animate-pulse-red hover:scale-105 transition-transform">
            SOS
          </button>
        </div>
        <p className="text-center text-sm text-muted-foreground mb-8">Hold for Emergency</p>

        {/* Action Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="bg-destructive/20 border border-destructive/30 rounded-2xl p-4 text-center hover:bg-destructive/30 transition">
            <span className="text-2xl block mb-1">🆘</span>
            <p className="text-sm font-bold text-destructive">I NEED HELP</p>
          </button>
          <button className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 text-center hover:bg-green-500/30 transition">
            <span className="text-2xl block mb-1">🤝</span>
            <p className="text-sm font-bold text-green-400">I CAN HELP</p>
          </button>
        </div>

        {/* Help Type */}
        <p className="text-sm font-semibold mb-3">What kind of help do you need?</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {["🍱 Food", "💧 Water", "🏠 Shelter", "🏥 Medical", "📦 Other"].map((t) => (
            <button key={t} className="bg-secondary text-sm px-3 py-1.5 rounded-full hover:bg-secondary/80 transition">{t}</button>
          ))}
        </div>

        {/* Location */}
        <div className="bg-card card-glow p-4 mb-6">
          <p className="text-xs text-muted-foreground mb-1">📍 Your Location</p>
          <p className="text-sm font-medium">Ludhiana, Punjab (Auto-detected)</p>
        </div>

        {/* Helpers */}
        <h2 className="font-semibold mb-3">Nearby Available Helpers</h2>
        <div className="space-y-2 mb-6">
          {[
            { name: "Volunteer Raj", dist: "0.3km" },
            { name: "Dr. Priya", dist: "0.8km" },
          ].map((h) => (
            <div key={h.name} className="bg-card card-glow p-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{h.name}</p>
                <p className="text-xs text-muted-foreground">{h.dist} • Available 🟢</p>
              </div>
              <button className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-lg">Contact</button>
            </div>
          ))}
        </div>

        {/* Emergency Contacts */}
        <h2 className="font-semibold mb-3">Emergency Contacts</h2>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {[
            { label: "🚔 Police", num: "100" },
            { label: "🚑 Ambulance", num: "108" },
            { label: "🔥 Fire", num: "101" },
            { label: "📞 NDMA", num: "1078" },
          ].map((c) => (
            <a key={c.num} href={`tel:${c.num}`} className="bg-card card-glow p-3 text-center">
              <p className="text-sm">{c.label}</p>
              <p className="text-primary font-bold">{c.num}</p>
            </a>
          ))}
        </div>

        {/* Offline */}
        <div className="flex gap-2 mb-4">
          {["Bluetooth", "SMS", "LoRaWAN"].map((m) => (
            <span key={m} className="bg-secondary text-xs px-3 py-1.5 rounded-full text-muted-foreground">{m}</span>
          ))}
        </div>

        <button className="w-full bg-secondary text-foreground font-semibold py-3 rounded-xl hover:bg-secondary/80 transition">
          📄 Download Offline Guide
        </button>
      </div>
    </div>
    <BottomNav type="parent" />
  </div>
);

export default SOSScreen;
