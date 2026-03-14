import { useState } from "react";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";

const feed = [
  { type: "request", name: "Kavitha Nair", school: "DPS Ludhiana", desc: "Need first-aid kits for 50 students", tag: "🏥 Medical", amount: "₹8,000", time: "1 hr ago" },
  { type: "donated", name: "Rajesh Gupta", school: "KV Chandigarh", desc: "Donated ₹10,000 for flood relief supplies", tag: "🍱 Food", amount: "₹10,000", time: "3 hrs ago" },
  { type: "request", name: "Sunita Devi", school: "Govt. School", desc: "Need temporary shelter materials for displaced families", tag: "🏠 Shelter", amount: "₹15,000", time: "5 hrs ago" },
  { type: "request", name: "Anil Kumar", school: "Army Public", desc: "Water purification tablets needed urgently", tag: "💧 Water", amount: "₹3,000", time: "6 hrs ago" },
];

const TeacherDonor = () => {
  const [tab, setTab] = useState("feed");

  return (
    <div className="app-container min-h-screen pb-24">
      <div className="px-6 py-5">
        <BackButton to="/home" />
        <h1 className="text-xl font-bold mt-4 mb-4">Donor Community 💝</h1>

        {/* Solana Donation Banner */}
        <div className="bg-gradient-to-r from-[#9945FF]/20 to-[#14F195]/20 border border-[#14F195]/30 rounded-2xl p-4 mb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⛓️</span>
            <span className="text-xs bg-[#14F195]/20 text-[#14F195] px-2 py-0.5 rounded-full font-semibold">● VERIFIED ON-CHAIN</span>
          </div>
          <h3 className="font-bold text-white text-base mb-1">Disaster Relief Hub</h3>
          <p className="text-xs text-muted-foreground mb-1">Transparent blockchain-powered donations on Solana</p>
          <div className="grid grid-cols-3 gap-2 my-3">
            <div className="bg-black/30 rounded-xl p-2 text-center">
              <p className="text-sm font-bold text-[#14F195]">1.10 SOL</p>
              <p className="text-[10px] text-muted-foreground">Total Raised</p>
            </div>
            <div className="bg-black/30 rounded-xl p-2 text-center">
              <p className="text-sm font-bold text-[#14F195]">2</p>
              <p className="text-[10px] text-muted-foreground">Donors</p>
            </div>
            <div className="bg-black/30 rounded-xl p-2 text-center">
              <p className="text-sm font-bold text-[#14F195]">2</p>
              <p className="text-[10px] text-muted-foreground">Verified TXNs</p>
            </div>
          </div>
          <button
            onClick={() => window.open("https://uppalpurva.my.canva.site/donor-community", "_blank")}
            className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black font-bold py-3 rounded-xl text-sm hover:scale-105 transition-transform"
          >
            🚀 Donate with Solana
          </button>
          <p className="text-[10px] text-muted-foreground text-center mt-2">Every SOL counts. Help rebuild lives.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <div className="bg-card card-glow p-3 text-center">
            <p className="text-sm font-bold">₹2,45,000</p>
            <p className="text-[10px] text-muted-foreground">Total Donated</p>
          </div>
          <div className="bg-card card-glow p-3 text-center">
            <p className="text-sm font-bold">12</p>
            <p className="text-[10px] text-muted-foreground">Active Requests</p>
          </div>
          <div className="bg-card card-glow p-3 text-center">
            <p className="text-sm font-bold">89</p>
            <p className="text-[10px] text-muted-foreground">Donors</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button className="bg-orange-500/20 text-orange-400 font-semibold py-3 rounded-xl text-sm hover:bg-orange-500/30 transition">
            + Raise a Request
          </button>
          <button
            onClick={() => window.open("https://uppalpurva.my.canva.site/donor-community", "_blank")}
            className="bg-primary text-primary-foreground font-semibold py-3 rounded-xl text-sm hover:opacity-90 transition"
          >
            💝 Donate via Solana
          </button>
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
        <div className="space-y-3">
          {feed.map((item, i) => (
            <div key={i} className="bg-card card-glow p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${item.type === "request" ? "bg-red-400/10 text-red-400" : "bg-green-400/10 text-green-400"}`}>
                  {item.type === "request" ? "🆘 REQUEST" : "💝 DONATED"}
                </span>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
              <p className="text-sm font-medium">{item.name} — {item.school}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs bg-secondary px-2 py-1 rounded">{item.tag}</span>
                <span className="text-sm font-semibold text-primary">{item.amount}</span>
              </div>
              {item.type === "request" && (
                <button
                  onClick={() => window.open("https://uppalpurva.my.canva.site/donor-community", "_blank")}
                  className="w-full bg-primary text-primary-foreground text-xs py-2 rounded-lg mt-3 hover:opacity-90 transition"
                >
                  Donate Now via Solana 🔗
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Motivational */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mt-5 text-center">
          <p className="text-sm">Your contribution saves lives 🙏</p>
        </div>
      </div>
      <BottomNav type="teacher" />
    </div>
  );
};

export default TeacherDonor;
