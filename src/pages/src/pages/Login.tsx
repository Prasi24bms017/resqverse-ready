import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (tab === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
      }
      navigate("/home");
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", "").replace(/\(auth.*\)/, ""));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", "").replace(/\(auth.*\)/, ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container min-h-screen px-6 py-8 flex flex-col justify-center">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          🛡️
        </div>
        <span className="font-bold text-lg">ResQverse</span>
      </div>

      <h1 className="text-2xl font-black mb-1">Welcome Back 👋</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Sign in to save progress and access all features
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {["login", "register"].map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setError(""); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition ${
              tab === t
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {t === "login" ? "Login" : "Register"}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      {/* Google Button */}
      <button
        onClick={handleGoogle}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-xl mb-4 hover:bg-white/90 transition disabled:opacity-50"
      >
        <img
          src="https://www.google.com/favicon.ico"
          alt="Google"
          className="w-4 h-4"
        />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">OR</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {tab === "register" && (
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        )}

        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">
            Email
          </label>
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">
            Password
          </label>
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
          disabled={loading}
          className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : tab === "login"
            ? "Login →"
            : "Create Account →"}
        </button>
      </form>

      <button
        onClick={() => navigate("/home")}
        className="text-center text-xs text-muted-foreground mt-6 hover:text-foreground transition"
      >
        Skip for now — Browse without login
      </button>
    </div>
  );
};

export default Login;