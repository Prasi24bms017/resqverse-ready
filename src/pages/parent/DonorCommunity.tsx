import { useState } from "react";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";

const feed = [
  { type: "request", name: "Priya Sharma", role: "Parent, DAV School", desc: "Need food supplies for 3 families affected by flooding", tag: "🍱 Food", time: "2 hours ago" },
  { type: "donated", name: "Rahul Mehta", role: "Parent, St. Xavier's", desc: "Donated ₹5,000 for flood relief", note: "Every rupee counts! 💪", likes: 45, time: "4 hours ago" },
  { type: "request", name: "Sunita Devi", role: "Parent, Govt School", desc: "Need temporary shelter for 2 weeks", tag: "🏠 Shelter", time: "5 hours ago" },
];

const DonorCommunity = () => {
  const [tab, setTab] = useState("feed");

  return (
    <div className="app-container min-h-screen pb-24">
      <div className="px-6 py-5">
        <BackButton to="/parent/home" />
        <div className="flex items-center gap-2 mt-4 mb-1">
          <h1 className="text-xl font-bold">Community Support 💝</h1>
        </div>
        <span className="text-xs bg-green-400/10 text-green-400 px-2 py-0.5 rounded-full">✓ Parents Only</span>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 my-5">
          <div className="bg-card card-glow p-3 text-center">
            <p className="text-sm font-bold">₹3,45,000</p>
            <p className="text-[10px] text-muted-foreground">Total Raised</p>
          </div>
          <div className="bg-card card-glow p-3 text-center">
            <p className="text-sm font-bold">234</p>
            <p className="text-[10px] text-muted-foreground">Donors</p>
          </div>
          <div className="bg-card card-glow p-3 text-center">
            <p className="text-sm font-bold">18</p>
            <p className="text-[10px] text-muted-foreground">Active Requests</p>
          </div>
        </div>

        {/* Quote */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-3 mb-5 text-center">
          <p className="text-sm">Together we rebuild. Together we rise. 🌟</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button className="bg-orange-500/20 text-orange-400 font-semibold py-3 rounded-xl text-sm hover:bg-orange-500/30 transition">+ Raise a Request</button>
          <button className="bg-primary text-primary-foreground font-semibold py-3 rounded-xl text-sm hover:opacity-90 transition">Make a Donation</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {["feed", "history"].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`text-xs px-3 py-1.5 rounded-full capitalize transition ${tab === t ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
              {t === "feed" ? "Feed" : "Donation History"}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="space-y-3 mb-6">
          {feed.map((item, i) => (
            <div key={i} className="bg-card card-glow p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${item.type === "request" ? "bg-red-400/10 text-red-400" : "bg-green-400/10 text-green-400"}`}>
                  {item.type === "request" ? "🆘 REQUEST" : "💝 DONATED"}
                </span>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
              <p className="text-sm font-medium">{item.name} — {item.role}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              {item.tag && <span className="text-xs bg-secondary px-2 py-1 rounded mt-2 inline-block">{item.tag}</span>}
              {item.note && <p className="text-xs text-primary mt-2">{item.note}</p>}
              {item.likes && <p className="text-xs text-muted-foreground mt-1">❤️ {item.likes} people liked this</p>}
              {item.type === "request" && (
                <button className="w-full bg-primary text-primary-foreground text-xs py-2 rounded-lg mt-3 hover:opacity-90 transition">Donate Now</button>
              )}
            </div>
          ))}
        </div>

        {/* Notification */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-3 mb-5">
          <p className="text-sm">💧 3 families near you need water supplies</p>
        </div>

        {/* Awareness */}
        <div className="bg-card card-glow p-4 text-center">
          <p className="text-xs text-muted-foreground">Did you know?</p>
          <p className="text-sm font-medium mt-1">72% of disaster victims need help within first 6 hours</p>
        </div>
      </div>
      <BottomNav type="parent" />
    </div>
  );
};

export default DonorCommunity;
