import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";

const ParentTeenLogin = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<"parent" | "teen">("parent");
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
      if (mode === "register") {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await set(ref(db, `users/${result.user.uid}`), {
          name,
          email,
          role,
          createdAt: Date.now(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/home");
    } catch (err: any) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await set(ref(db, `users/${result.user.uid}`), {
        name: result.user.displayName,
        email: result.user.email,
        role,
        createdAt: Date.now(),
      });
      navigate("/home");
    } catch (err: any) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const getFirebaseError = (code: string) => {
    switch (code) {
      case "auth/user-not-found": return "No account found.";
      case "auth/wrong-password": return "Incorrect password.";
      case "auth/email-already-in-use": return "Email already registered.";
      case "auth/weak-password": return "Password must be 6+ characters.";
      default: return "Something went wrong. Try again.";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <BackButton />
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md mt-10">
        <h2 className="text-2xl font-bold text-white text-center mb-2">Welcome Back 👋</h2>

        {/* Role Toggle */}
        <div className="flex bg-gray-800 rounded-lg p-1 mb-6">
          {(["parent", "teen"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                role === r ? "bg-teal-500 text-white" : "text-gray-400"
              }`}
            >
              {r === "parent" ? "👨‍👩‍👧 Parent" : "🧑 Teen (12-16)"}
            </button>
          ))}
        </div>

        {/* Login/Register Toggle */}
        <div className="flex gap-4 mb-6">
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition ${
                mode === m
                  ? "border-teal-500 text-teal-400"
                  : "border-gray-700 text-gray-500"
              }`}
            >
              {m === "login" ? "Login" : "Register"}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-900/40 border border-red-500 text-red-400 text-sm rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-700" />
          <span className="mx-3 text-gray-500 text-xs">OR</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-gray-700 rounded-lg py-2 text-sm text-gray-300 hover:bg-gray-800 transition disabled:opacity-50"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default ParentTeenLogin;