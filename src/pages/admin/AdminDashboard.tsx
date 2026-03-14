import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("resqverse_admin")) {
      navigate("/admin/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("resqverse_admin");
    navigate("/");
  };

  const stats = [
    { emoji: "👥", label: "Total Users", value: "1,247" },
    { emoji: "🏫", label: "Schools", value: "43" },
    { emoji: "💝", label: "Total Donated", value: "1.10 SOL" },
    { emoji: "📊", label: "Quizzes Done", value: "3,891" },
    { emoji: "🚨", label: "SOS Alerts", value: "12" },
    { emoji: "🎮", label: "Games Played", value: "892" },
  ];

  const transactions = [
    { id: "5KjX...9mNp", donor: "SolGiver", amount: "0.60 SOL", status: "confirmed", time: "2 hrs ago" },
    { id: "3RtY...7kLm", donor: "AnonHelper", amount: "0.50 SOL", status: "confirmed", time: "5 hrs ago" },
  ];

  const recentUsers = [
    { name: "Priya S.", role: "Teacher", school: "DAV Ludhiana", time: "5 min ago" },
    { name: "Rahul M.", role: "Parent", school: "St. Xavier's", time: "12 min ago" },
    { name: "Ananya K.", role: "Teen", school: "KV Chandigarh", time: "25 min ago" },
    { name: "Arjun P.", role: "Kids", school: "Govt School", time: "1 hr ago" },
  ];

  return (
    <div className="app-container min-h-screen pb-10">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔐</span>
          <div>
            <p className="font-bold text-sm">Admin Panel</p>
            <p className="text-[10px] text-muted-foreground">ResQverse Control Center</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-destructive bg-destructive/10 px-3 py-1.5 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="px-6 py-5 space-y-6">

        {/* Stats Grid */}
        <div>
          <h2 className="font-semibold mb-3">📊 App Analytics</h2>
          <div className="grid grid-cols-3 gap-2">
            {stats.map((s) => (
              <div key={s.label} className="bg-card card-glow p-3 text-center rounded-2xl">
                <p className="text-xl">{s.emoji}</p>
                <p className="text-sm font-bold mt-1">{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Blockchain Transactions */}
        <div>
          <h2 className="font-semibold mb-3">⛓️ Blockchain Transactions</h2>
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="bg-card card-glow p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#14F195] font-mono">{tx.id}</span>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                    ✅ {tx.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{tx.donor}</p>
                  <p className="text-sm font-bold text-[#14F195]">{tx.amount}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{tx.time}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => window.open("https://uppalpurva.my.canva.site/donor-community", "_blank")}
            className="w-full mt-3 bg-[#14F195]/10 text-[#14F195] border border-[#14F195]/20 py-2 rounded-xl text-sm font-semibold"
          >
            View All on Solana →
          </button>
        </div>

        {/* Recent Users */}
        <div>
          <h2 className="font-semibold mb-3">👥 Recent Users</h2>
          <div className="space-y-2">
            {recentUsers.map((u, i) => (
              <div key={i} className="bg-card card-glow p-3 flex items-center justify-between rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm">
                    {u.role === "Teacher" ? "👨‍🏫" : u.role === "Parent" ? "👨‍👧" : u.role === "Teen" ? "🧑‍🎓" : "👦"}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.role} • {u.school}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{u.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SOS Alerts */}
        <div>
          <h2 className="font-semibold mb-3">🚨 Recent SOS Alerts</h2>
          <div className="space-y-2">
            {[
              { loc: "Ludhiana, Punjab", time: "30 min ago", status: "Resolved" },
              { loc: "Chandigarh", time: "2 hrs ago", status: "Resolved" },
            ].map((a, i) => (
              <div key={i} className="bg-destructive/10 border border-destructive/20 rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm">📍 {a.loc}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;