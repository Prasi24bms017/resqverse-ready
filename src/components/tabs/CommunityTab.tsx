import { useNavigate } from "react-router-dom";

const CommunityTab = ({ role }: { role: string }) => {
  const navigate = useNavigate();

  if (role === "kids") {
    return (
      <div className="px-6 py-5 text-center mt-16">
        <p className="text-4xl mb-4">🔒</p>
        <p className="font-bold text-lg">Parents Only</p>
        <p className="text-muted-foreground text-sm mt-2">This section is for parents and teachers only.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-5">
      <h2 className="text-lg font-bold mb-4">🤝 Community</h2>

      {/* Solana Donation Banner */}
      <div className="bg-gradient-to-r from-[#9945FF]/20 to-[#14F195]/20 border border-[#14F195]/30 rounded-2xl p-4 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">⛓️</span>
          <span className="text-xs bg-[#14F195]/20 text-[#14F195] px-2 py-0.5 rounded-full font-semibold">● VERIFIED ON-CHAIN</span>
        </div>
        <h3 className="font-bold text-white text-base mb-1">Disaster Relief Hub</h3>
        <p className="text-xs text-muted-foreground mb-3">Transparent blockchain-powered donations on Solana</p>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { val: "1.10 SOL", label: "Raised" },
            { val: "2", label: "Donors" },
            { val: "2", label: "TXNs" },
          ].map((s) => (
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
      <div className="space-y-3">
        {[
          { type: "request", name: "Priya Sharma", school: "DAV School", desc: "Need food supplies for 3 families", tag: "🍱 Food", time: "2 hrs ago" },
          { type: "donated", name: "Rahul Mehta", school: "St. Xavier's", desc: "Donated ₹5,000 for flood relief", tag: "💝 Donated", time: "4 hrs ago" },
          { type: "request", name: "Sunita Devi", school: "Govt School", desc: "Need temporary shelter for 2 weeks", tag: "🏠 Shelter", time: "5 hrs ago" },
        ].map((item, i) => (
          <div key={i} className="bg-card card-glow p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${item.type === "request" ? "bg-red-400/10 text-red-400" : "bg-green-400/10 text-green-400"}`}>
                {item.type === "request" ? "🆘 REQUEST" : "💝 DONATED"}
              </span>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
            <p className="text-sm font-medium">{item.name} — {item.school}</p>
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
  );
};

export default CommunityTab;