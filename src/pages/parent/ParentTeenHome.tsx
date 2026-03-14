import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";

const ParentTeenHome = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Friend");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      // Get first name only
      const fullName = user.displayName || user.email || "Friend";
      const firstName = fullName.split(" ")[0].split("@")[0];
      setUserName(firstName);
    }
  }, []);

  return (
    <div className="app-container min-h-screen pb-24">
      <div className="px-6 py-5">
        <BackButton to="/student/mode" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6 mt-8">
          <div>
            <h1 className="font-bold text-lg">Hi, {userName}! 👋</h1>
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
              Parent Mode
            </span>
          </div>
        </div>

        {/* Daily Tip */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-6">
          <p className="text-xs text-primary mb-1">💡 Daily Safety Tip</p>
          <p className="text-sm">
            Keep an emergency kit with water, flashlight, and first-aid supplies near your door.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-card card-glow p-3 text-center">
            <p className="text-lg font-bold">7</p>
            <p className="text-[10px] text-muted-foreground">Modules Done</p>
          </div>
          <div className="bg-card card-glow p-3 text-center">
            <p className="text-lg font-bold">🔥 5</p>
            <p className="text-[10px] text-muted-foreground">Day Streak</p>
          </div>
          <div className="bg-card card-glow p-3 text-center">
            <p className="text-lg font-bold">4</p>
            <p className="text-[10px] text-muted-foreground">Badges</p>
          </div>
        </div>

        {/* Continue Learning */}
        <button
          onClick={() => navigate("/parent/learn")}
          className="w-full bg-card card-glow p-4 text-left mb-4"
        >
          <p className="text-xs text-muted-foreground mb-1">📖 Continue Learning</p>
          <h3 className="font-semibold">Flood Safety Module</h3>
          <div className="w-full bg-secondary rounded-full h-2 mt-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">60% complete</p>
        </button>

        {/* Today's Challenge */}
        <div className="bg-card card-glow p-4 mb-6">
          <p className="text-xs text-muted-foreground mb-1">🎯 Today's Challenge</p>
          <h3 className="font-semibold">Earthquake Quiz — 10 Questions</h3>
          <p className="text-xs text-primary mt-1">+50 XP Reward</p>
        </div>

        {/* Recent Alerts */}
        <h2 className="font-semibold mb-3">Recent Alerts</h2>
        <div className="space-y-2">
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-3">
            <p className="text-sm">🔴 IMD: Heavy rainfall expected — Ludhiana</p>
            <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-3">
            <p className="text-sm">🟡 NDMA: Flood watch advisory — Zone 3</p>
            <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
          </div>
        </div>
      </div>
      <BottomNav type="parent" />
    </div>
  );
};

export default ParentTeenHome;
