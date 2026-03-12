import { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";

const pairs = [
  { danger: "🌍 Earthquake", action: "🪑 Hide under table" },
  { danger: "🔥 Fire", action: "🧯 Use extinguisher" },
  { danger: "🌊 Flood", action: "⛰️ Move to high ground" },
  { danger: "⚡ Lightning", action: "🏠 Stay indoors" },
];

const KidsMatching = () => {
  const [selected, setSelected] = useState<{ type: string; index: number } | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState<string | null>(null);

  const shuffledActions = [...pairs].sort(() => 0.3 - Math.random());

  const handleSelect = (type: string, index: number) => {
    if (matched.includes(index) && type === "danger") return;

    if (!selected) {
      setSelected({ type, index });
    } else if (selected.type !== type) {
      // Check match
      const dangerIdx = type === "danger" ? index : selected.index;
      const actionIdx = type === "action" ? index : selected.index;

      if (pairs[dangerIdx].action === pairs[actionIdx]?.action || shuffledActions[actionIdx]?.action === pairs[dangerIdx]?.action) {
        setMatched([...matched, dangerIdx]);
        setScore(score + 10);
      } else {
        setWrong("Try again!");
        setTimeout(() => setWrong(null), 800);
      }
      setSelected(null);
    } else {
      setSelected({ type, index });
    }
  };

  const isComplete = matched.length === pairs.length;

  return (
    <div className="app-container min-h-screen px-6 py-8">
      <BackButton to="/kids/home" />

      <h1 className="text-2xl font-bold mt-4 mb-2">Matching Game 🧩</h1>
      <p className="text-muted-foreground text-sm mb-6">Match dangers to safe actions!</p>

      {/* Score */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-bold">Score: {score}</span>
        <span className="text-sm text-muted-foreground">{matched.length}/{pairs.length} matched</span>
      </div>

      {wrong && (
        <div className="text-center text-yellow-400 text-sm mb-4 animate-fade-in">❌ {wrong}</div>
      )}

      {isComplete ? (
        <div className="text-center py-16 animate-scale-in">
          <span className="text-6xl block mb-4">🎉</span>
          <h2 className="text-2xl font-bold mb-2">Well Done!</h2>
          <p className="text-muted-foreground mb-4">You matched all dangers correctly!</p>
          <p className="text-xl">⭐⭐⭐ +50 XP</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground font-semibold mb-1">DANGERS</p>
            {pairs.map((p, i) => (
              <button
                key={`d-${i}`}
                onClick={() => handleSelect("danger", i)}
                disabled={matched.includes(i)}
                className={`w-full p-4 rounded-2xl text-left text-sm font-medium transition-all ${
                  matched.includes(i)
                    ? "bg-green-500/20 border border-green-500/30 opacity-60"
                    : selected?.type === "danger" && selected.index === i
                    ? "bg-purple-500/30 border-2 border-purple-400 scale-105"
                    : "bg-card border border-border hover:border-purple-400/50"
                }`}
              >
                {p.danger}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground font-semibold mb-1">ACTIONS</p>
            {pairs.map((p, i) => (
              <button
                key={`a-${i}`}
                onClick={() => handleSelect("action", i)}
                className={`w-full p-4 rounded-2xl text-left text-sm font-medium transition-all ${
                  matched.includes(i)
                    ? "bg-green-500/20 border border-green-500/30 opacity-60"
                    : selected?.type === "action" && selected.index === i
                    ? "bg-purple-500/30 border-2 border-purple-400 scale-105"
                    : "bg-card border border-border hover:border-purple-400/50"
                }`}
              >
                {p.action}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default KidsMatching;
