import { useNavigate } from "react-router-dom";

const KidsHome = () => {
  const navigate = useNavigate();

  const activities = [
    { emoji: "🎵", title: "Safety Rhymes", subtitle: "Sing and learn!", color: "gradient-kids-purple", stars: 2, xp: 30, path: "/kids/rhymes" },
    { emoji: "🧩", title: "Matching Game", subtitle: "Match the dangers!", color: "gradient-kids-yellow", stars: 3, xp: 50, path: "/kids/matching" },
    { emoji: "🎯", title: "Basic Drills", subtitle: "Practice staying safe!", color: "gradient-kids-green", stars: 1, xp: 40, path: "/kids/drills" },
  ];

  return (
    <div className="app-container min-h-screen px-6 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Hello, Champion! 🌟</h1>
        <p className="text-muted-foreground text-sm mt-1">Ready to be a Safety Hero today?</p>
      </div>

      {/* Stars */}
      <div className="bg-card card-glow-kids p-4 mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Your Stars</p>
          <p className="text-2xl font-bold">⭐ 12</p>
        </div>
        <div className="w-32">
          <p className="text-xs text-muted-foreground mb-1">My Lessons</p>
          <div className="w-full bg-secondary rounded-full h-3">
            <div className="gradient-kids-purple h-3 rounded-full" style={{ width: "45%" }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">45% complete</p>
        </div>
      </div>

      {/* Today's Lesson */}
      <div className="bg-card card-glow-kids p-4 mb-6">
        <p className="text-xs text-muted-foreground mb-1">📖 Today's Lesson</p>
        <h3 className="font-bold text-lg">What to do in an Earthquake? 🌍</h3>
        <p className="text-sm text-muted-foreground mt-1">Learn Drop, Cover & Hold!</p>
      </div>

      {/* Activities */}
      <div className="space-y-4 mb-8">
        {activities.map((a) => (
          <button
            key={a.title}
            onClick={() => navigate(a.path)}
            className={`w-full ${a.color} card-glow-kids p-5 text-left hover:scale-[1.02] transition-transform`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-3xl">{a.emoji}</span>
                <h3 className="font-bold text-lg mt-2 text-foreground">{a.title}</h3>
                <p className="text-foreground/70 text-sm">{a.subtitle}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-foreground/70">{"⭐".repeat(a.stars)}</p>
                <p className="text-xs text-foreground/70 mt-1">+{a.xp} XP</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Mascot */}
      <div className="text-center text-4xl animate-float">🦸‍♂️</div>
      <p className="text-center text-sm text-muted-foreground mt-2">You're doing great! Keep going!</p>
    </div>
  );
};

export default KidsHome;
