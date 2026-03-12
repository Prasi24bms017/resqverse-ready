import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";

const ParentTeenLogin = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"Parent" | "Teen">("Parent");

  return (
    <div className="app-container min-h-screen px-6 py-8">
      <BackButton to="/student/mode" />

      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-1">Welcome Back! 👋</h1>
        <p className="text-muted-foreground text-sm mb-6">Sign in to continue</p>

        {/* Toggle */}
        <div className="flex bg-secondary rounded-xl p-1 mb-8">
          {(["Parent", "Teen"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition ${
                mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {m === "Parent" ? "Parent" : "Teen (12-16)"}
            </button>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); navigate("/parent/home"); }} className="space-y-4">
          {[
            { label: "Name", placeholder: "Enter your name", type: "text" },
            { label: "Date of Birth", placeholder: "", type: "date" },
            { label: "Email", placeholder: "your@email.com", type: "email" },
            { label: "Password", placeholder: "••••••••", type: "password" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-sm text-muted-foreground mb-1.5 block">{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
            </div>
          ))}

          <button type="submit" className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition mt-2">
            Continue
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          New here? <span className="text-primary cursor-pointer hover:underline">Create Account</span>
        </p>
      </div>
    </div>
  );
};

export default ParentTeenLogin;
