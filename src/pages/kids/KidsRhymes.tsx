import BackButton from "@/components/BackButton";

const KidsRhymes = () => {
  return (
    <div className="app-container min-h-screen px-6 py-6">
      <BackButton />
      <div className="mt-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🎵</div>
          <h1 className="text-2xl font-bold text-white">Safety Rhymes</h1>
          <p className="text-muted-foreground text-sm mt-1">Sing and learn how to stay safe!</p>
        </div>

        {/* YouTube Video */}
        <div className="rounded-2xl overflow-hidden border border-border mb-6" style={{ aspectRatio: "16/9" }}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dZMPuIXCDsQ"
            title="Safety Rhymes for Kids"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Rhyme lyrics card */}
        <div className="bg-card card-glow-kids p-5 rounded-2xl mb-4">
          <p className="text-sm font-semibold text-white mb-3">🎶 Safety Song</p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Watch the video above and sing along to learn important safety tips! 🌟
          </p>
        </div>

        {/* Stars reward */}
        <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-4 text-center">
          <p className="text-white font-bold">Watch the full video to earn</p>
          <p className="text-3xl mt-1">⭐⭐⭐</p>
          <p className="text-purple-300 text-sm mt-1">+30 XP Reward!</p>
        </div>
      </div>
    </div>
  );
};

export default KidsRhymes;