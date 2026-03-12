import { useState } from "react";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";

const LearningScreen = () => {
  const [tab, setTab] = useState("Quizzes");
  const tabs = ["Quizzes", "Drills", "Scenarios"];

  const leaderboard = [
    { name: "Arjun K.", score: 2840, emoji: "🥇" },
    { name: "Meera S.", score: 2650, emoji: "🥈" },
    { name: "Rohit P.", score: 2400, emoji: "🥉" },
  ];

  const badges = ["🔥 Fire Expert", "🌍 Earthquake Pro", "🌊 Flood Ready", "⚡ Storm Safe"];

  return (
    <div className="app-container min-h-screen pb-24">
      <div className="px-6 py-5">
        <BackButton to="/parent/home" />
        <h1 className="text-xl font-bold mt-4 mb-4">Learn & Level Up 🎮</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`text-xs px-3 py-1.5 rounded-full transition ${tab === t ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-3 mb-8">
          {tab === "Quizzes" && (
            <>
              <div className="bg-card card-glow p-4">
                <h3 className="font-semibold text-sm">🌍 Earthquake Safety</h3>
                <p className="text-xs text-muted-foreground mt-1">10 questions • 50 XP</p>
                <button className="bg-primary text-primary-foreground text-xs px-4 py-2 rounded-lg mt-3 hover:opacity-90 transition">Start Quiz</button>
              </div>
              <div className="bg-card card-glow p-4">
                <h3 className="font-semibold text-sm">🌊 Flood Awareness</h3>
                <p className="text-xs text-muted-foreground mt-1">8 questions • 40 XP</p>
                <button className="bg-primary text-primary-foreground text-xs px-4 py-2 rounded-lg mt-3 hover:opacity-90 transition">Start Quiz</button>
              </div>
            </>
          )}
          {tab === "Drills" && (
            <div className="bg-card card-glow p-4">
              <h3 className="font-semibold text-sm">🔥 Fire Evacuation</h3>
              <p className="text-xs text-muted-foreground mt-1">Scenario-based drill • 60 XP</p>
              <button className="bg-primary text-primary-foreground text-xs px-4 py-2 rounded-lg mt-3 hover:opacity-90 transition">Start Drill</button>
            </div>
          )}
          {tab === "Scenarios" && (
            <div className="bg-card card-glow p-4">
              <h3 className="font-semibold text-sm">🌊 Flood Response</h3>
              <p className="text-xs text-muted-foreground mt-1">Branching story • 70 XP</p>
              <button className="bg-primary text-primary-foreground text-xs px-4 py-2 rounded-lg mt-3 hover:opacity-90 transition">Play Scenario</button>
            </div>
          )}
        </div>

        {/* Leaderboard */}
        <h2 className="font-semibold mb-3">Top Learners 🏆</h2>
        <div className="space-y-2 mb-8">
          {leaderboard.map((l) => (
            <div key={l.name} className="bg-card card-glow p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{l.emoji}</span>
                <span className="text-sm font-medium">{l.name}</span>
              </div>
              <span className="text-sm text-primary font-bold">{l.score} pts</span>
            </div>
          ))}
        </div>

        {/* Badges */}
        <h2 className="font-semibold mb-3">Badges Earned</h2>
        <div className="grid grid-cols-2 gap-2">
          {badges.map((b) => (
            <div key={b} className="bg-card card-glow p-3 text-center text-sm">{b}</div>
          ))}
        </div>
      </div>
      <BottomNav type="parent" />
    </div>
  );
};

export default LearningScreen;
