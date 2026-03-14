import { useState } from "react";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";

const schools = [
  { rank: 1, name: "St. Xavier's School", points: 2840, drills: 12 },
  { rank: 2, name: "DAV Public School", points: 2720, drills: 11 },
  { rank: 3, name: "Delhi Public School", points: 2650, drills: 10 },
  { rank: 4, name: "Kendriya Vidyalaya", points: 2400, drills: 9 },
  { rank: 5, name: "Army Public School", points: 2280, drills: 8 },
  { rank: 6, name: "Ryan International", points: 2100, drills: 8 },
  { rank: 7, name: "Govt. Senior Secondary", points: 1950, drills: 7 },
  { rank: 8, name: "Sacred Heart Convent", points: 1800, drills: 6 },
  { rank: 9, name: "Modern School", points: 1650, drills: 5 },
  { rank: 10, name: "Springdale School", points: 1500, drills: 4 },
];

const medals = ["🥇", "🥈", "🥉"];

const SchoolRankings = () => {
  const [tab, setTab] = useState("District");

  return (
    <div className="app-container min-h-screen pb-24">
      <div className="px-6 py-5">
        <BackButton to="/home" />
        <h1 className="text-xl font-bold mt-4 mb-4">District Rankings 🏆</h1>

        {/* Your school */}
        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4 mb-5">
          <p className="text-xs text-primary mb-1">Your School</p>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">Delhi Public School</h3>
              <p className="text-xs text-muted-foreground">2,650 points • 10 drills</p>
            </div>
            <span className="text-3xl font-bold text-primary">#3</span>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-4">
          {["District", "State", "National"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-xs px-3 py-1.5 rounded-full transition ${
                tab === t ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="space-y-2">
          {schools.map((s) => (
            <div key={s.rank} className={`bg-card card-glow p-4 flex items-center gap-3 ${s.rank === 3 ? "border-primary/30" : ""}`}>
              <span className="text-xl w-8 text-center font-bold">
                {s.rank <= 3 ? medals[s.rank - 1] : `#${s.rank}`}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{s.name}</h3>
                <p className="text-xs text-muted-foreground">{s.points} pts • {s.drills} drills</p>
                <div className="w-full bg-secondary rounded-full h-1.5 mt-2">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all"
                    style={{ width: `${(s.points / 2840) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav type="teacher" />
    </div>
  );
};

export default SchoolRankings;
