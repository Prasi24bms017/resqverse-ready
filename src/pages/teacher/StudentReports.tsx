import { useState } from "react";
import { Search, Download } from "lucide-react";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";

const students = [
  { name: "Ananya Sharma", age: 14, modules: 8, score: 92, badges: 5, status: "Complete" },
  { name: "Rohit Kumar", age: 11, modules: 6, score: 78, badges: 3, status: "In Progress" },
  { name: "Priya Singh", age: 15, modules: 10, score: 95, badges: 7, status: "Complete" },
  { name: "Arjun Patel", age: 10, modules: 2, score: 45, badges: 1, status: "Not Started" },
  { name: "Meera Joshi", age: 13, modules: 7, score: 88, badges: 4, status: "Complete" },
  { name: "Vikram Reddy", age: 12, modules: 5, score: 72, badges: 3, status: "In Progress" },
  { name: "Sunita Devi", age: 9, modules: 0, score: 0, badges: 0, status: "Not Started" },
  { name: "Karan Malhotra", age: 16, modules: 9, score: 91, badges: 6, status: "Complete" },
];

const statusColor: Record<string, string> = {
  Complete: "text-green-400 bg-green-400/10",
  "In Progress": "text-yellow-400 bg-yellow-400/10",
  "Not Started": "text-red-400 bg-red-400/10",
};

const StudentReports = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const tabs = ["All", "<12 yrs", "12-16 yrs"];

  const filtered = students.filter((s) => {
    const nameMatch = s.name.toLowerCase().includes(search.toLowerCase());
    if (filter === "<12 yrs") return s.age < 12 && nameMatch;
    if (filter === "12-16 yrs") return s.age >= 12 && s.age <= 16 && nameMatch;
    return nameMatch;
  });

  return (
    <div className="app-container min-h-screen pb-24">
      <div className="px-6 py-5">
        <div className="flex items-center justify-between">
          <BackButton to="/teacher/dashboard" />
          <button className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs px-3 py-2 rounded-lg">
            <Download size={14} /> Export PDF
          </button>
        </div>

        <h1 className="text-xl font-bold mt-4 mb-4">Student Reports 📊</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`text-xs px-3 py-1.5 rounded-full transition ${
                filter === t ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-secondary border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Student List */}
        <div className="space-y-3">
          {filtered.map((s) => (
            <div key={s.name} className="bg-card card-glow p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm">{s.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[s.status]}`}>{s.status}</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
                <div>Age: {s.age}</div>
                <div>Modules: {s.modules}</div>
                <div>Score: {s.score}%</div>
                <div>Badges: {s.badges}</div>
              </div>
              <button className="text-primary text-xs mt-2 hover:underline">View Detail →</button>
            </div>
          ))}
        </div>
      </div>
      <BottomNav type="teacher" />
    </div>
  );
};

export default StudentReports;
