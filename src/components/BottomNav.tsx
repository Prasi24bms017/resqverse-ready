import { Home, BookOpen, AlertTriangle, Map, Heart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface BottomNavProps {
  type: "teacher" | "parent";
}

const BottomNav = ({ type }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const teacherItems = [
    { icon: Home, label: "Home", path: "/teacher/dashboard" },
    { icon: BookOpen, label: "Reports", path: "/teacher/reports" },
    { icon: AlertTriangle, label: "Emergency", path: "/teacher/emergency" },
    { icon: Map, label: "Drills", path: "/teacher/drills" },
    { icon: Heart, label: "Donate", path: "/teacher/donor" },
  ];

  const parentItems = [
    { icon: Home, label: "Home", path: "/parent/home" },
    { icon: BookOpen, label: "Learn", path: "/parent/learn" },
    { icon: AlertTriangle, label: "SOS", path: "/parent/sos" },
    { icon: Map, label: "Map", path: "/parent/map" },
    { icon: Heart, label: "Community", path: "/parent/community" },
  ];

  const items = type === "teacher" ? teacherItems : parentItems;

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card/95 backdrop-blur-lg border-t border-border z-50">
      <div className="flex justify-around py-2">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
