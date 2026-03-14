import { useNavigate } from "react-router-dom";

const roles = [
  { emoji: "👨‍🏫", title: "Teacher", desc: "Manage students, drills & emergencies", path: "/teacher/login", role: "teacher", color: "from-blue-900/40 to-indigo-900/40", border: "border-blue-500/30" },
  { emoji: "👨‍👧", title: "Parent", desc: "Track safety, get alerts & donate", path: "/parent/login", role: "parent", color: "from-green-900/40 to-teal-900/40", border: "border-green-500/30" },
  { emoji: "🧑‍🎓", title: "Teen (12-16)", desc: "Learn, play quizzes & stay safe", path: "/parent/login", role: "teen", color: "from-purple-900/40 to-pink-900/40", border: "border-purple-500/30" },
  { emoji: "👦", title: "Kids (under 12)", desc: "Fun games, rhymes & safety drills", path: "/kids/onboarding", role: "kids", color: "from-yellow-900/40 to-orange-900/40", border: "border-yellow-500/30" },
  { emoji: "🔐", title: "Admin", desc: "View all transactions & analytics", path: "/admin/login", role: "admin", color: "from-red-900/40 to-rose-900/40", border: "border-red-500/30" },
];

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRole = (role: typeof roles[0]) => {
    localStorage.setItem("resqverse_role", role.role);
    navigate(role.path);
  };

  return (
    <div className="app-container min-h-screen px-6 py-8">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-sm">🛡️</div>
        <span className="font-bold text-lg">ResQverse</span>
      </div>

      <h1 className="text-2xl font-black mt-6 mb-2">Who are you? 👋</h1>
      <p className="text-muted-foreground text-sm mb-8">Select your role to get started</p>

      <div className="space-y-3">
        {roles.map((role) => (
          <button
            key={role.title}
            onClick={() => handleRole(role)}
            className={`w-full bg-gradient-to-br ${role.color} border ${role.border} rounded-2xl p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform text-left`}
          >
            <span className="text-4xl">{role.emoji}</span>
            <div>
              <p className="font-bold text-white">{role.title}</p>
              <p className="text-xs text-white/60 mt-0.5">{role.desc}</p>
            </div>
            <span className="ml-auto text-white/40">→</span>
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8">
        🛡️ ResQverse — Prepare Today. Protect Tomorrow.
      </p>
    </div>
  );
};

export default RoleSelection;


