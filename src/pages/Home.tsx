import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "@/firebase";
import SOSButton from "@/components/SOSButton";

// Learning Tab
import LearningTab from "@/components/tabs/LearningTab";
import CommunityTab from "@/components/tabs/CommunityTab";
import MapTab from "@/components/tabs/MapTab";
import RecordsTab from "@/components/tabs/RecordsTab";

const tabs = [
  { id: "learning", label: "Learning", emoji: "📚" },
  { id: "community", label: "Community", emoji: "🤝" },
  { id: "map", label: "Map", emoji: "🗺️" },
  { id: "records", label: "Records", emoji: "📊" },
];

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("learning");
  const [userName, setUserName] = useState("Friend");
  const [role, setRole] = useState("parent");

  useEffect(() => {
    const storedRole = localStorage.getItem("resqverse_role") || "parent";
    setRole(storedRole);
    const user = auth.currentUser;
    if (user) {
      const fullName = user.displayName || user.email || "Friend";
      setUserName(fullName.split(" ")[0].split("@")[0]);
    }
  }, []);

  return (
    <div className="app-container min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-sm">🛡️</div>
          <div>
            <p className="font-bold text-sm">Hi, {userName}! 👋</p>
            <p className="text-[10px] text-muted-foreground capitalize">{role} Mode</p>
          </div>
        </div>
        <button
          onClick={() => { auth.signOut(); navigate("/"); }}
          className="text-xs text-muted-foreground hover:text-foreground transition bg-secondary px-3 py-1.5 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "learning" && <LearningTab role={role} />}
        {activeTab === "community" && <CommunityTab role={role} />}
        {activeTab === "map" && <MapTab role={role} />}
        {activeTab === "records" && <RecordsTab role={role} />}
      </div>

      {/* SOS Floating Button */}
      <SOSButton />

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 py-2 flex justify-around z-40 max-w-md mx-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition ${
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