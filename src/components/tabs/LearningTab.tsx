import { useNavigate } from "react-router-dom";

const LearningTab = ({ role }: { role: string }) => {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-5">
      <h2 className="text-lg font-bold mb-4">📚 Learning</h2>

      {/* Kids Section */}
      {(role === "kids" || role === "parent" || role === "teacher") && (
        <div className="mb-6">
          <p className="text-xs text-muted-foreground font-semibold uppercase mb-3">👦 Kids Zone</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { emoji: "🎵", label: "Rhymes", path: "/kids/rhymes" },
              { emoji: "🧩", label: "Matching", path: "/kids/matching" },
              { emoji: "🎯", label: "Drills", path: "/kids/drills" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="bg-card card-glow p-3 rounded-2xl flex flex-col items-center gap-1 hover:bg-secondary transition"
              >
                <span className="text-2xl">{item.emoji}</span>
                <p className="text-xs font-medium">{item.label}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Teen/Parent Section */}
      {(role === "teen" || role === "parent" || role === "teacher") && (
        <div className="mb-6">
          <p className="text-xs text-muted-foreground font-semibold uppercase mb-3">🧑‍🎓 Teen Zone</p>
          <div className="space-y-2">
            {[
              { emoji: "🌍", label: "Earthquake Safety Quiz", xp: "50 XP", path: "/parent/learn" },
              { emoji: "🌊", label: "Flood Awareness Quiz", xp: "40 XP", path: "/parent/learn" },
              { emoji: "🏥", label: "First Aid Basics Quiz", xp: "60 XP", path: "/parent/learn" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="w-full bg-card card-glow p-4 flex items-center justify-between hover:bg-secondary transition rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <p className="text-sm font-medium text-left">{item.label}</p>
                </div>
                <span className="text-xs text-primary font-semibold">{item.xp}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Games */}
      <div className="mb-6">
        <p className="text-xs text-muted-foreground font-semibold uppercase mb-3">🎮 Games</p>
        <div className="space-y-2">
          <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-2xl p-4">
            <p className="font-bold text-cyan-400 text-sm mb-1">🚨 Disaster Ready</p>
            <p className="text-xs text-muted-foreground mb-3">Real-time Emergency Response Game</p>
            <button
              onClick={() => window.open("https://disas.my.canva.site/", "_blank")}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-2 rounded-xl text-sm"
            >
              🚀 Play Now
            </button>
          </div>
          <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border border-orange-500/30 rounded-2xl p-4">
            <p className="font-bold text-orange-400 text-sm mb-1">🌍 Earthquake Survival</p>
            <p className="text-xs text-muted-foreground mb-3">Can you survive the disaster?</p>
            <button
              onClick={() => window.open("https://uppalpurva.my.canva.site/earthquake-drill", "_blank")}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-2 rounded-xl text-sm"
            >
              🎮 Start Mission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningTab;