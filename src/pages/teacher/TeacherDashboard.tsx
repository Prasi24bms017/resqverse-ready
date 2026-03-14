import { useEffect, useState } from "react";
import { LogOut, Users, School, CheckCircle, Award, BarChart3, AlertTriangle, Trophy, Heart, Map } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import BottomNav from "@/components/BottomNav";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Teacher");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const fullName = user.displayName || user.email || "Teacher";
      const firstName = fullName.split(" ")[0].split("@")[0];
      setUserName(firstName);
    }
  }, []);

  const stats = [
    { icon: Users, label: "Total Students", value: "142", emoji: "👥" },
    { icon: School, label: "School Rank", value: "#3 in District", emoji: "🏫" },
    { icon: CheckCircle, label: "Drills Done", value: "8", emoji: "✅" },
    { icon: Award, label: "Badges Issued", value: "67", emoji: "🏅" },
  ];

  const quickActions = [
    { icon: BarChart3, label: "Student Reports", emoji: "📊", path: "/teacher/reports" },
    { icon: AlertTriangle, label: "Emergency Portal", emoji: "🚨", path: "/teacher/emergency" },
    { icon: Trophy, label: "School Rankings", emoji: "🏆", path: "/teacher/rankings" },
    { icon: Heart, label: "Donor Community", emoji: "💝", path: "/teacher/donor" },
    { icon: Map, label: "Safety Map", emoji: "🗺️", path: "/teacher/map" },
  ];

  const drills = [
    { name: "Fire Evacuation Drill", date: "Mar 15, 2026", schools: 12 },
    { name: "Earthquake Preparedness", date: "Mar 22, 2026", schools: 8 },
  ];

  const recentActivity = [
    { name: "Ananya Sharma", action: "completed Fire Safety Quiz", time: "2 min ago" },
    { name: "Rohit Kumar", action: "earned Gold Badge", time: "15 min ago" },
    { name: "Priya Singh", action: "finished Earthquake Drill", time: "1 hr ago" },
    { name: "Arjun Patel", action: "started Flood Module", time: "2 hrs ago" },
    { name: "Meera Joshi", action: "scored 95% in Quiz", time: "3 hrs ago" },
  ];

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <div className="app-container min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border">
        <div>
          <h1 className="font-bold text-lg">Hi, {userName}! 👋</h1>
          <p className="text-xs text-muted-foreground">Teacher Dashboard</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-muted-foreground hover:text-foreground transition"
        >
          <LogOut size={20} />
        </button>
      </div>

      <div className="px-6 py-5 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-card card-glow p-4">
              <span className="text-xl">{s.emoji}</span>
              <p className="text-xl font-bold mt-2">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="font-semibold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((a) => (
              <button
                key={a.label}
                onClick={() => navigate(a.path)}
                className="bg-card card-glow p-4 text-left hover:bg-secondary transition"
              >
                <span className="text-xl">{a.emoji}</span>
                <p className="text-sm font-medium mt-2">{a.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Drills */}
        <div>
          <h2 className="font-semibold mb-3">Upcoming Drills</h2>
          <div className="space-y-3">
            {drills.map((d) => (
              <div key={d.name} className="bg-card card-glow p-4">
                <h3 className="font-medium text-sm">{d.name}</h3>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>📅 {d.date}</span>
                  <span>🏫 {d.schools} schools</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="font-semibold mb-3">Recent Activity</h2>
          <div className="space-y-2">
            {recentActivity.map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
              >
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{a.name}</span> {a.action}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-3">
                  {a.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav type="teacher" />
    </div>
  );
};

export default TeacherDashboard;
