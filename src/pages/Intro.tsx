import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const slides = [
  {
    emoji: "🛡️",
    title: "Welcome to ResQverse",
    desc: "India's first disaster preparedness platform built for schools, students and communities.",
    color: "from-blue-900/60 to-indigo-900/60",
  },
  {
    emoji: "📚",
    title: "Learn & Be Ready",
    desc: "Interactive quizzes, games and drills that teach students how to survive any disaster.",
    color: "from-purple-900/60 to-pink-900/60",
  },
  {
    emoji: "🗺️",
    title: "Real-Time Safety Maps",
    desc: "Find nearby hospitals, shelters and safe zones instantly using live GPS.",
    color: "from-green-900/60 to-teal-900/60",
  },
  {
    emoji: "⛓️",
    title: "Transparent Donations",
    desc: "Every donation verified on Solana blockchain. No middlemen. Full transparency.",
    color: "from-orange-900/60 to-yellow-900/60",
  },
  {
    emoji: "🚨",
    title: "SOS in One Tap",
    desc: "Emergency alerts, real GPS location sharing and direct calls to rescue services.",
    color: "from-red-900/60 to-rose-900/60",
  },
];

const Intro = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div
      className={`app-container min-h-screen bg-gradient-to-br ${slide.color} transition-all duration-700 flex flex-col`}
    >
      {/* Skip */}
      <div className="flex justify-end px-6 pt-6">
        <button
          onClick={() => navigate("/home")}
          className="text-xs text-white/60 hover:text-white transition"
        >
          Skip →
        </button>
      </div>

      {/* Logo */}
      <div className="flex items-center gap-2 px-6 pt-4">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-sm">
          🛡️
        </div>
        <span className="font-bold text-white text-lg">ResQverse</span>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="text-8xl mb-8 animate-bounce">{slide.emoji}</div>
        <h1 className="text-2xl font-black text-white mb-4 leading-tight">
          {slide.title}
        </h1>
        <p className="text-white/70 text-sm leading-relaxed max-w-xs">
          {slide.desc}
        </p>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all ${
              i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 pb-10 space-y-3">
        <button
          onClick={() => navigate("/home")}
          className="w-full bg-white text-black font-bold py-4 rounded-2xl text-base hover:bg-white/90 transition"
        >
          Get Started 🚀
        </button>
        <p className="text-center text-white/40 text-xs">
          Trusted by 500+ schools across India
        </p>
      </div>
    </div>
  );
};

export default Intro;