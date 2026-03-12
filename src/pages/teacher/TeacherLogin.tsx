import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";

const TeacherLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ school: "", name: "", email: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/teacher/dashboard");
  };

  return (
    <div className="app-container min-h-screen px-6 py-8">
      <BackButton to="/" />
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-1">Welcome, Educator 👨‍🏫</h1>
        <p className="text-muted-foreground text-sm mb-8">Sign in to manage your school</p>

        <form onSubmit={handleLogin} className="space-y-4">
          {[
            { key: "school", label: "School Name", placeholder: "Enter school name", type: "text" },
            { key: "name", label: "Teacher Name", placeholder: "Enter your name", type: "text" },
            { key: "email", label: "Email", placeholder: "teacher@school.edu", type: "email" },
            { key: "password", label: "Password", placeholder: "••••••••", type: "password" },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-sm text-muted-foreground mb-1.5 block">{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
            </div>
          ))}

          <button type="submit" className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition mt-2">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          New school?{" "}
          <span className="text-primary cursor-pointer hover:underline">Register School</span>
        </p>
      </div>
    </div>
  );
};

export default TeacherLogin;
