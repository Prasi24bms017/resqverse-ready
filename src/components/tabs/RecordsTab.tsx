import { useNavigate } from "react-router-dom";

const RecordsTab = ({ role }: { role: string }) => {
  const navigate = useNavigate();

  // Teacher view
  if (role === "teacher") {
    return (
      <div className="px-6 py-5">
        <h2 className="text-lg font-bold mb-4">📊 Records</h2>
        <div className="space-y-3">
          {[
            { emoji: "📊", label: "Student Reports", desc: "View all student progress", path: "/teacher/reports" },
            { emoji: "🏆", label: "School Rankings", desc: "See district rankings", path: "/teacher/rankings" },
            { emoji: "🔔", label: "Interschool Drills", desc: "Manage drill schedules", path: "/teacher/drills" },
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
    );
  }

  // Student/Parent/Teen view
  return (
    <div className="px-6 py-5">
      <h2 className="text-lg font-bold mb-4">📊 My Records</h2>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card card-glow p-3 text-center">
          <p className="text-lg font-bold">7</p>
          <p className="text-[10px] text-muted-foreground">Modules Done</p>
        </div>
        <div className="bg-card card-glow p-3 text-center">
          <p className="text-lg font-bold">🔥 5</p>
          <p className="text-[10px] text-muted-foreground">Day Streak</p>
        </div>
        <div className="bg-card card-glow p-3 text-center">
          <p className="text-lg font-bold">4</p>
          <p className="text-[10px] text-muted-foreground">Badges</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-card card-glow p-4 mb-4 rounded-2xl">
        <p className="text-xs text-muted-foreground mb-1">📖 Current Module</p>
        <h3 className="font-semibold">Flood Safety Module</h3>
        <div className="w-full bg-secondary rounded-full h-2 mt-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }} />
        </div>
        <p className="text-xs text-muted-foreground mt-1">60% complete</p>
      </div>

      {/* Badges */}
      <h3 className="font-semibold mb-3">Badges Earned 🏅</h3>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {["🔥 Fire Expert", "🌍 Earthquake Pro", "🌊 Flood Ready", "⚡ Storm Safe"].map((b) => (
          <div key={b} className="bg-card card-glow p-3 text-center text-sm rounded-2xl">{b}</div>
        ))}
      </div>

      {/* Leaderboard */}
      <h3 className="font-semibold mb-3">Top Learners 🏆</h3>
      <div className="space-y-2">
        {[
          { name: "Arjun K.", score: 2840, emoji: "🥇" },
          { name: "Meera S.", score: 2650, emoji: "🥈" },
          { name: "Rohit P.", score: 2400, emoji: "🥉" },
        ].map((l) => (
          <div key={l.name} className="bg-card card-glow p-3 flex items-center justify-between rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xl">{l.emoji}</span>
              <span className="text-sm font-medium">{l.name}</span>
            </div>
            <span className="text-sm text-primary font-bold">{l.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordsTab;