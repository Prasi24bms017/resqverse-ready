import { Wifi, WifiOff } from "lucide-react";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";

const EmergencyPortal = () => (
  <div className="app-container min-h-screen pb-24">
    <div className="px-6 py-5">
      <BackButton to="/teacher/dashboard" />
      <div className="flex items-center gap-2 mt-4 mb-6">
        <h1 className="text-xl font-bold">Emergency Portal 🚨</h1>
        <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
      </div>

      {/* SOS Button */}
      <div className="flex justify-center my-8">
        <button className="w-32 h-32 rounded-full bg-destructive/20 border-2 border-destructive flex items-center justify-center text-2xl font-bold text-destructive animate-pulse-red hover:scale-105 transition-transform">
          SOS
        </button>
      </div>

      {/* Network Status */}
      <div className="flex items-center justify-center gap-2 mb-6 text-sm">
        <Wifi size={16} className="text-green-400" />
        <span className="text-green-400">Network Online</span>
      </div>

      {/* Active Emergencies */}
      <div className="mb-6">
        <h2 className="font-semibold mb-3">Active Emergencies in Your Area</h2>
        <div className="space-y-2">
          <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-4">
            <p className="text-sm font-medium">🔴 Heavy Flooding — Sector 22</p>
            <p className="text-xs text-muted-foreground mt-1">Reported 45 min ago • 3 schools affected</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4">
            <p className="text-sm font-medium">🟡 Landslide Warning — NH-44</p>
            <p className="text-xs text-muted-foreground mt-1">IMD Alert • 2 hrs ago</p>
          </div>
        </div>
      </div>

      <button className="w-full bg-destructive/20 text-destructive font-semibold py-3 rounded-xl mb-4 hover:bg-destructive/30 transition">
        Report School Emergency
      </button>

      {/* Emergency Contacts */}
      <div className="mb-6">
        <h2 className="font-semibold mb-3">Emergency Contacts</h2>
        <div className="space-y-2">
          {[
            { label: "District Education Officer", number: "0161-2445566" },
            { label: "NDMA Helpline", number: "1078" },
            { label: "Police", number: "100" },
            { label: "Ambulance", number: "108" },
          ].map((c) => (
            <div key={c.label} className="flex items-center justify-between bg-card card-glow p-3">
              <span className="text-sm">{c.label}</span>
              <a href={`tel:${c.number}`} className="text-primary text-sm font-medium">{c.number}</a>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full bg-orange-500/20 text-orange-400 font-semibold py-3 rounded-xl hover:bg-orange-500/30 transition">
        📢 Broadcast Alert to Parents
      </button>
    </div>
    <BottomNav type="teacher" />
  </div>
);

export default EmergencyPortal;
