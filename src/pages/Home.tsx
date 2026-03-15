import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import LearningTab from "@/components/tabs/LearningTab";
import CommunityTab from "@/components/tabs/CommunityTab";
import MapTab from "@/components/tabs/MapTab";
import RecordsTab from "@/components/tabs/RecordsTab";

const tabs = [
  { id: "learning", label: "Learn", emoji: "📚" },
  { id: "community", label: "Community", emoji: "💝" },
  { id: "map", label: "Map", emoji: "🗺️" },
  { id: "records", label: "Records", emoji: "📊" },
];

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("learning");
  const [sosPressed, setSosPressed] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const fullName = user.displayName || user.email || "Friend";
        setUserName(fullName.split(" ")[0].split("@")[0]);
      } else {
        setUserName(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSOS = () => {
    setSosPressed(true);
    setTimeout(() => setSosPressed(false), 300);
    navigate("/sos");
  };

  return (
    <div className="app-container min-h-screen pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-background z-40">
        
        {/* Left — Back + Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground transition text-lg mr-1"
          >
            ←
          </button>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-sm">
            🛡️
          </div>
          <div>
            <span className="font-bold text-base">ResQverse</span>
            {userName && (
              <p className="text-[10px] text-muted-foreground">
                Hi, {userName}! 👋
              </p>
            )}
          </div>
        </div>

        {/* Right — Login/Logout + SOS */}
        <div className="flex items-center gap-2">
          {userName ? (
            <button
              onClick={() => {
                auth.signOut();
                navigate("/");
              }}
              className="text-xs text-muted-foreground hover:text-foreground transition bg-secondary px-3 py-1.5 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-semibold"
            >
              Login
            </button>
          )}

          {/* SOS Button */}
          <button
            onClick={handleSOS}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-black text-sm transition-all ${
              sosPressed
                ? "bg-yellow-500 scale-95"
                : "bg-red-600 hover:bg-red-500 animate-pulse"
            }`}
            style={{ boxShadow: "0 0 0 3px rgba(220,38,38,0.3)" }}
          >
            <span>🚨</span>
            <span className="text-white">SOS</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "learning" && <LearningTab />}
        {activeTab === "community" && <CommunityTab />}
        {activeTab === "map" && <MapTab />}
        {activeTab === "records" && <RecordsTab />}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 py-2 flex justify-around z-40 max-w-md mx-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition ${
              activeTab === t.id
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-lg">{t.emoji}</span>
            <span className="text-[10px] font-medium">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
