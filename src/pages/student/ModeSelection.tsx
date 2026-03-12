import { useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";

const ModeSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container min-h-screen px-6 py-8 flex flex-col">
      <BackButton to="/" />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-2">Who's using ResQverse?</h1>
        <p className="text-muted-foreground text-sm mb-10">Choose your experience</p>

        <button
          onClick={() => navigate("/kids/onboarding")}
          className="w-full gradient-kids-purple card-glow-kids p-6 text-left mb-4"
        >
          <span className="text-4xl mb-3 block">🧒</span>
          <h3 className="font-bold text-lg text-foreground">Kids Mode</h3>
          <p className="text-foreground/70 text-sm mt-1">For children under 12</p>
        </button>

        <div className="text-4xl my-2 animate-float">🦺</div>

        <button
          onClick={() => navigate("/parent/login")}
          className="w-full gradient-teacher-blue card-glow p-6 text-left mt-2"
        >
          <span className="text-4xl mb-3 block">👨‍👩‍👧</span>
          <h3 className="font-bold text-lg text-foreground">Parent & Teen Mode</h3>
          <p className="text-foreground/70 text-sm mt-1">For ages 12-16 & parents</p>
        </button>
      </div>
    </div>
  );
};

export default ModeSelection;
