import BackButton from "@/components/BackButton";

const KidsDrills = () => {
  return (
    <div className="app-container min-h-screen px-6 py-6">
      <BackButton />
      <div className="mt-8 text-center">
        <div className="text-6xl mb-4">🎯</div>
        <h1 className="text-2xl font-bold text-white mb-2">Earthquake Survival Game</h1>
        <p className="text-muted-foreground mb-8">Can you survive the disaster? Move fast • Find shelter • Stay alive</p>
        
        <button
          onClick={() => window.open("https://uppalpurva.my.canva.site/earthquake-drill", "_blank")}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-5 rounded-2xl text-xl hover:scale-105 transition-transform shadow-lg"
        >
          🎮 Start Mission!
        </button>

        <div className="mt-6 bg-card rounded-2xl p-4 text-left">
          <p className="text-sm font-semibold text-white mb-3">How to play:</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>🕹️ Use WASD or arrow keys to move</p>
            <p>🏠 Choose your level: Home, School or City</p>
            <p>🧑 Pick your avatar and start the mission</p>
            <p>🏆 Find shelter before time runs out!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsDrills;