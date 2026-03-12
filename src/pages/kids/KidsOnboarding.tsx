import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";

const KidsOnboarding = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  return (
    <div className="app-container min-h-screen px-6 py-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 text-3xl animate-float" style={{ animationDelay: "0.5s" }}>⭐</div>
      <div className="absolute top-32 left-8 text-2xl animate-float" style={{ animationDelay: "1s" }}>🌟</div>
      <div className="absolute bottom-40 right-6 text-2xl animate-float" style={{ animationDelay: "1.5s" }}>✨</div>

      <BackButton to="/student/mode" />

      <div className="mt-16 text-center">
        <h1 className="text-3xl font-bold mb-2">Hi there! 👋</h1>
        <p className="text-xl text-muted-foreground mb-10">What's your name?</p>

        <input
          type="text"
          placeholder="Type your name here..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-secondary border-2 border-purple-500/30 rounded-2xl px-5 py-4 text-lg text-center text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-purple-400 transition"
        />

        <p className="text-xl text-muted-foreground mt-8 mb-4">When's your birthday? 🎂</p>
        <input
          type="date"
          className="w-full bg-secondary border-2 border-purple-500/30 rounded-2xl px-5 py-4 text-lg text-center text-foreground focus:outline-none focus:border-purple-400 transition"
        />

        <button
          onClick={() => navigate("/kids/home")}
          className="w-full gradient-kids-purple text-foreground font-bold text-xl py-4 rounded-2xl mt-10 hover:opacity-90 transition-all hover:scale-[1.02]"
        >
          Let's Go! 🚀
        </button>
      </div>
    </div>
  );
};

export default KidsOnboarding;
