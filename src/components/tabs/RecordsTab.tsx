import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";

const RecordsTab = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const requireLogin = (path: string) => {
    if (auth.currentUser) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="px-6 py-5">
      <h2 className="text-xl font-black mb-1">📊 Records</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Track progress and performance
      </p>

      {!selected && (
        <div className="space-y-3">
          {[
            {
              id: "student",
              emoji: "🧑‍🎓",
              title: "My Progress",
              desc: "View your learning progress and badges",
              color: "from-purple-900/40 to-pink-900/40",
              border: "border-purple-500/30",
            },
            {
              id: "teacher",
              emoji: "👨‍🏫",
              title: "School Records",
              desc: "Student reports, rankings and drills",
              color: "from-blue-900/40 to-indigo-900/40",
              border: "border-blue-500/30",
            },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => {
                if (r.id === "teacher" && !auth.currentUser) {
                  navigate("/login");
                } else {
                  setSelected(r.id);
                }
              }}
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

      {/* Student Records */}
      {selected === "student" && (
        <div>
          <button
            onClick={() => setSelected(null)}
            className="text-xs text-muted-foreground mb-4 flex items-center gap-1"
          >
            ← Back
          </button>
          <h3 className="font-bold text-lg mb-4">🧑‍🎓 My Progress</h3>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { val: "7", label: "Modules Done" },
              { val: "🔥 5", label: "Day Streak" },
              { val: "4", label: "Badges" },
            ].map((s) => (
              <div key={s.label} className="bg-card card-glow p-3 text-center rounded-2xl">
                <p className="text-lg font-bold">{s.val}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-card card-glow p-4 mb-4 rounded-2xl">
            <p className="text-xs text-muted-foreground mb-1">📖 Current Module</p>
            <h3 className="font-semibold">Flood Safety Module</h3>
            <div className="w-full bg-secondary rounded-full h-2 mt-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">60% complete</p>
          </div>

          <h3 className="font-semibold mb-3">Badges Earned 🏅</h3>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {["🔥 Fire Expert", "🌍 Earthquake Pro", "🌊 Flood Ready", "⚡ Storm Safe"].map((b) => (
              <div key={b} className="bg-card card-glow p-3 text-center text-sm rounded-2xl">
                {b}
              </div>
            ))}
          </div>

          <h3 className="font-semibold mb-3">Leaderboard 🏆</h3>
          <div className="space-y-2">
            {[
              { name: "Arjun K.", score: 2840, emoji: "🥇" },
              { name: "Meera S.", score: 2650, emoji: "🥈" },
              { name: "Rohit P.", score: 2400, emoji: "🥉" },
            ].map((l) => (
              <div
                key={l.name}
                className="bg-card card-glow p-3 flex items-center justify-between rounded-2xl"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{l.emoji}</span>
                  <span className="text-sm font-medium">{l.name}</span>
                </div>
                <span className="text-sm text-primary font-bold">{l.score} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Teacher Records */}
      {selected === "teacher" && (
        <div>
          <button
            onClick={() => setSelected(null)}
            className="text-xs text-muted-foreground mb-4 flex items-center gap-1"
          >
            ← Back
          </button>
          <h3 className="font-bold text-lg mb-4">👨‍🏫 School Records</h3>
          <div className="space-y-3">
            {[
              { emoji: "📊", label: "Student Reports", desc: "View all student progress", path: "/teacher/reports" },
              { emoji: "🏆", label: "School Rankings", desc: "See district rankings", path: "/teacher/rankings" },
              { emoji: "🔔", label: "Interschool Drills", desc: "Manage drill schedules", path: "/teacher/drills" },
              { emoji: "🚨", label: "Emergency Portal", desc: "Send school alerts", path: "/teacher/emergency" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => requireLogin(item.path)}
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

export default RecordsTab;
