import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BackButton from "@/components/BackButton";

const rhymes = [
  { emoji: "🔥", text: "If there's a fire, don't delay,\nDrop to the floor and roll away!", color: "from-red-500/20 to-orange-500/20" },
  { emoji: "🌍", text: "When the ground begins to shake,\nDrop and cover for safety's sake!", color: "from-yellow-500/20 to-green-500/20" },
  { emoji: "🌊", text: "If the water starts to rise,\nMove to high ground, be safe and wise!", color: "from-blue-500/20 to-cyan-500/20" },
  { emoji: "⛈️", text: "Thunder roars and lightning strikes,\nStay inside, away from heights!", color: "from-purple-500/20 to-indigo-500/20" },
];

const KidsRhymes = () => {
  const [index, setIndex] = useState(0);
  const rhyme = rhymes[index];

  return (
    <div className="app-container min-h-screen px-6 py-8">
      <BackButton to="/kids/home" />

      <div className="mt-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Safety Rhymes 🎵</h1>
        <p className="text-muted-foreground text-sm mb-8">Sing along and stay safe!</p>

        <div className={`bg-gradient-to-br ${rhyme.color} rounded-3xl p-8 mb-8`}>
          <span className="text-6xl block mb-6">{rhyme.emoji}</span>
          <p className="text-xl font-bold leading-relaxed whitespace-pre-line text-foreground">{rhyme.text}</p>
        </div>

        {/* Stars earned */}
        <p className="text-sm text-muted-foreground mb-6">⭐ {index + 1} / {rhymes.length} rhymes learned</p>

        {/* Play button */}
        <button className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-8 hover:scale-110 transition-transform">
          <span className="text-2xl">▶️</span>
        </button>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-8">
          <button
            onClick={() => setIndex(Math.max(0, index - 1))}
            disabled={index === 0}
            className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center disabled:opacity-30 hover:bg-secondary/80 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <span className="text-sm text-muted-foreground">{index + 1} / {rhymes.length}</span>
          <button
            onClick={() => setIndex(Math.min(rhymes.length - 1, index + 1))}
            disabled={index === rhymes.length - 1}
            className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center disabled:opacity-30 hover:bg-secondary/80 transition"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KidsRhymes;
