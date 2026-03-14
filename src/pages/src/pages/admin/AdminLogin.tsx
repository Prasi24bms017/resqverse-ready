import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAIL = "prasimishra2005@gmail.com";
const ADMIN_PASSWORD = "resqverse@admin2026";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("resqverse_admin", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin credentials!");
    }
  };

  return (
    <div className="app-container min-h-screen px-6 py-8 flex flex-col justify-center">
      <div className="text-center mb-8">
        <p className="text-4xl mb-3">🔐</p>
        <h1 className="text-2xl font-black">Admin Access</h1>
        <p className="text-muted-foreground text-sm mt-1">ResQverse Control Panel</p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm px-4 py-3 rounded-xl mb-4 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">Admin Email</label>
          <input
            type="email"
            placeholder="admin@resqverse.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition"
        >
          🔐 Login as Admin
        </button>
      </form>

      <p className="text-center text-xs text-muted-foreground mt-6">
        This panel is for ResQverse creators only
      </p>
    </div>
  );
};

export default AdminLogin;