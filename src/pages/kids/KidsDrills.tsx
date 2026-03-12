import { useState } from "react";
import BackButton from "@/components/BackButton";

const steps = [
  { emoji: "🌍", title: "Ground is shaking!", instruction: "DROP to your hands and knees immediately!" },
  { emoji: "🪑", title: "Find cover!", instruction: "Get UNDER a sturdy table or desk" },
  { emoji: "🤲", title: "Hold on tight!", instruction: "HOLD ON to your shelter until shaking stops" },
  { emoji: "🚪", title: "Time to evacuate!", instruction: "When shaking stops, calmly walk to the open area" },
  { emoji: "📞", title: "Tell an adult!", instruction: "Find a teacher or parent and tell them you're safe" },
];

const KidsDrills = () => {
  const [step, setStep] = useState(0);
  const isComplete = step >= steps.length;

  return (
    <div className="app-container min-h-screen px-6 py-8">
      <BackButton to="/kids/home" />

      <h1 className="text-2xl font-bold mt-4 mb-2">Basic Drills 🎯</h1>
      <p className="text-muted-foreground text-sm mb-6">Earthquake Safety Drill</p>

      {/* Progress dots */}
      <div className="flex gap-2 justify-center mb-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i < step ? "bg-green-400" : i === step && !isComplete ? "bg-primary scale-125" : "bg-secondary"
            }`}
          />
        ))}
      </div>

      {isComplete ? (
        <div className="text-center py-12 animate-scale-in">
          <span className="text-7xl block mb-4">🏅</span>
          <h2 className="text-2xl font-bold mb-2">Amazing Job!</h2>
          <p className="text-muted-foreground mb-4">You completed the earthquake drill!</p>
          <p className="text-xl mb-6">⭐⭐⭐ +40 XP</p>
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4 inline-block">
            <p className="text-sm font-medium">🏅 Earthquake Hero Badge Earned!</p>
          </div>
        </div>
      ) : (
        <div className="text-center animate-fade-in" key={step}>
          <span className="text-7xl block mb-6">{steps[step].emoji}</span>
          <h2 className="text-xl font-bold mb-3">Step {step + 1}: {steps[step].title}</h2>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">{steps[step].instruction}</p>

          <button
            onClick={() => setStep(step + 1)}
            className="w-full gradient-kids-green text-foreground font-bold text-lg py-4 rounded-2xl hover:opacity-90 transition"
          >
            {step === steps.length - 1 ? "Finish! 🎉" : "Next Step →"}
          </button>
        </div>
      )}
    </div>
  );
};

export default KidsDrills;
