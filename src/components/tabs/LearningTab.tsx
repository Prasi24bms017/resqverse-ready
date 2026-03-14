import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LearningTab = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="px-6 py-5">
      <h2 className="text-xl font-black mb-1">📚 Learn & Be Ready</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Choose what describes you best
      </p>

      {/* Role Selection */}
      {!selected && (
        <div className="space-y-3">
          {[
            { id: "kids", emoji: "👦", title: "I'm a Kid (under 12)", desc: "Fun games, rhymes & safety drills", color: "from-yellow-900/40 to-orange-900/40", border: "border-yellow-500/30" },
            { id: "teen", emoji: "🧑‍🎓", title: "I'm a Teen (12-16)", desc: "Quizzes, scenarios & games", color: "from-purple-900/40 to-pink-900/40", border: "border-purple-500/30" },
            { id: "teacher", emoji: "👨‍🏫", title: "I'm a Teacher", desc: "Drills, modules & training", color: "from-blue-900/40 to-indigo-900/40", border: "border-blue-500/30" },
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

      {/* Kids Content */}
      {selected === "kids" && (
        <div>
          <button onClick={() => setSelected(null)} className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
            ← Back
          </button>
          <h3 className="font-bold text-lg mb-4">👦 Kids Zone</h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { emoji: "🎵", label: "Rhymes", path: "/kids/rhymes" },
              { emoji: "🧩", label: "Matching", path: "/kids/matching" },
              { emoji: "🎯", label: "Drills", path: "/kids/drills" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="bg-card card-glow p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-secondary transition"
              >
                <span className="text-3xl">{item.emoji}</span>
                <p className="text-xs font-medium">{item.label}</p>
              </button>
            ))}
          </div>
          <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border border-orange-500/30 rounded-2xl p-4">
            <p className="font-bold text-orange-400 text-sm mb-1">🌍 Earthquake Survival Game</p>
            <p className="text-xs text-muted-foreground mb-3">Can you survive the disaster?</p>
            <button
              onClick={() => window.open("https://uppalpurva.my.canva.site/earthquake-drill", "_blank")}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-2 rounded-xl text-sm"
            >
              🎮 Play Now
            </button>
          </div>
        </div>
      )}

      {/* Teen Content */}
      {selected === "teen" && (
        <div>
          <button onClick={() => setSelected(null)} className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
            ← Back
          </button>
          <h3 className="font-bold text-lg mb-4">🧑‍🎓 Teen Zone</h3>
          <div className="space-y-3 mb-5">
            {[
              { emoji: "🌍", label: "Earthquake Safety Quiz", xp: "50 XP" },
              { emoji: "🌊", label: "Flood Awareness Quiz", xp: "40 XP" },
              { emoji: "🏥", label: "First Aid Basics Quiz", xp: "60 XP" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate("/parent/learn")}
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
          <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-2xl p-4">
            <p className="font-bold text-cyan-400 text-sm mb-1">🚨 Disaster Ready Game</p>
            <p className="text-xs text-muted-foreground mb-3">Real-time Emergency Response</p>
            <button
              onClick={() => window.open("https://disas.my.canva.site/", "_blank")}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-2 rounded-xl text-sm"
            >
              🚀 Play Now
            </button>
          </div>
        </div>
      )}

      {/* Teacher Content */}
      {selected === "teacher" && (
        <div>
          <button onClick={() => setSelected(null)} className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
            ← Back
          </button>
          <h3 className="font-bold text-lg mb-4">👨‍🏫 Teacher Zone</h3>
          <div className="space-y-3">
            {[
              { emoji: "🔔", label: "Manage Drills", desc: "Schedule interschool drills", path: "/teacher/drills" },
              { emoji: "📊", label: "Student Reports", desc: "View student progress", path: "/teacher/reports" },
              { emoji: "🏆", label: "School Rankings", desc: "See district rankings", path: "/teacher/rankings" },
              { emoji: "🚨", label: "Emergency Portal", desc: "Send school alerts", path: "/teacher/emergency" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="w-full bg-card card-glow p-4 flex items-center gap-4 hover:bg-secondary transition rounded-2xl text-left"
              >
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <span className="ml-auto text-muted-foreground">→</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningTab;