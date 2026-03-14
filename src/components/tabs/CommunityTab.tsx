import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CommunityTab = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="px-6 py-5">
      <h2 className="text-xl font-black mb-1">💝 Community</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Support disaster relief efforts
      </p>

      {!selected && (
        <div className="space-y-3">
          {[
            { id: "donor", emoji: "💝", title: "I want to Donate", desc: "Support families affected by disasters", color: "from-pink-900/40 to-rose-900/40", border: "border-pink-500/30" },
            { id: "teacher", emoji: "👨‍🏫", title: "I'm a Teacher", desc: "Manage school donor community", color: "from-blue-900/40 to-indigo-900/40", border: "border-blue-500/30" },
            { id: "request", emoji: "🆘", title: "I need Help", desc: "Request aid for your family", color: "from-red-900/40 to-orange-900/40", border: "border-red-500/30" },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setSelected(r.id)}
              className={`w-full bg-gradient-to-br ${r.color} border ${r.border} rounded-2xl p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform text-left`}
            >
              <span className="text-4xl">{r.emoji}</span>
              <div>
                <p className="font-bold text-white">{r.title}</p>
                <p className="text-xs text-white/60 mt-0.5">{r.desc}</p>
              </div>
              <span className="ml-auto text-white/40">→</span>
            </button>
          ))}
        </div>
      )}

      {/* Donor Content */}
      {(selected === "donor" || selected === "teacher") && (
        <div>
          <button onClick={() => setSelected(null)} className="text-xs text-muted-foreground mb-4">← Back</button>

          {/* Solana Banner */}
          <div className="bg-gradient-to-r from-[#9945FF]/20 to-[#14F195]/20 border border-[#14F195]/30 rounded-2xl p-4 mb-5">
            <div className="flex items-center gap-2 mb-2">
              <span>⛓️</span>
              <span className="text-xs bg-[#14F195]/20 text-[#14F195] px-2 py-0.5 rounded-full font-semibold">● VERIFIED ON-CHAIN</span>
            </div>
            <h3 className="font-bold text-white mb-1">Disaster Relief Hub</h3>
            <p className="text-xs text-muted-foreground mb-3">Transparent blockchain donations on Solana</p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[{ val: "1.10 SOL", label: "Raised" }, { val: "2", label: "Donors" }, { val: "2", label: "TXNs" }].map((s) => (
                <div key={s.label} className="bg-black/30 rounded-xl p-2 text-center">
                  <p className="text-sm font-bold text-[#14F195]">{s.val}</p>
                  <p className="text-[10px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => window.open("https://uppalpurva.my.canva.site/donor-community", "_blank")}
              className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black font-bold py-3 rounded-xl text-sm"
            >
              🚀 Donate with Solana
            </button>
          </div>

          {/* Feed */}
          <h3 className="font-semibold mb-3">Community Feed</h3>
          <div className="space-y-3">
            {[
              { type: "request", name: "Priya Sharma", desc: "Need food for 3 families", tag: "🍱 Food", time: "2 hrs ago" },
              { type: "donated", name: "Rahul Mehta", desc: "Donated ₹5,000 for flood relief", tag: "💝 Donated", time: "4 hrs ago" },
              { type: "request", name: "Sunita Devi", desc: "Need temporary shelter", tag: "🏠 Shelter", time: "5 hrs ago" },
            ].map((item, i) => (
              <div key={i} className="bg-card card-glow p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${item.type === "request" ? "bg-red-400/10 text-red-400" : "bg-green-400/10 text-green-400"}`}>
                    {item.type === "request" ? "🆘 REQUEST" : "💝 DONATED"}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                <span className="text-xs bg-secondary px-2 py-1 rounded mt-2 inline-block">{item.tag}</span>
                {item.type === "request" && (
                  <button
                    onClick={() => window.open("https://uppalpurva.my.canva.site/donor-community", "_blank")}
                    className="w-full bg-primary text-primary-foreground text-xs py-2 rounded-lg mt-3"
                  >
                    Donate Now via Solana 🔗
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Request Help */}
      {selected === "request" && (
        <div>
          <button onClick={() => setSelected(null)} className="text-xs text-muted-foreground mb-4">← Back</button>
          <h3 className="font-bold text-lg mb-4">🆘 Request Help</h3>
          <div className="space-y-3">
            {["🍱 Food", "💧 Water", "🏠 Shelter", "🏥 Medical", "📦 Other"].map((t) => (
              <button
                key={t}
                onClick={() => { alert(`Help request for ${t} submitted! Nearby volunteers will be notified.`); }}
                className="w-full bg-card card-glow p-4 text-left rounded-2xl hover:bg-secondary transition"
              >
                <p className="font-medium">{t}</p>
                <p className="text-xs text-muted-foreground mt-1">Tap to request this type of help</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityTab;