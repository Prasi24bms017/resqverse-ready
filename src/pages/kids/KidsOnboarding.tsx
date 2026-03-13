import { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";

const KidsOnboarding = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStart = async () => {
    if (!name || !dob) { setError("Please fill in both fields!"); return; }
    setLoading(true);
    try {
      const kidId = `kid_${Date.now()}`;
      await set(ref(db, `kids/${kidId}`), {
        name,
        dob,
        stars: 0,
        lessonsCompleted: 0,
        createdAt: Date.now(),
      });
      localStorage.setItem("kidId", kidId);
      localStorage.setItem("kidName", name);
      navigate("/kids/home");
    } catch {
      setError("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-gray-950 px-6">
      <BackButton />
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">👋</div>
        <h1 className="text-3xl font-bold text-white">Hi there!</h1>
        <p className="text-purple-300 mt-2">Let's get you started, Safety Hero!</p>
      </div>

      {error && (
        <div className="bg-red-900/40 border border-red-400 text-red-300 text-sm rounded-xl p-3 mb-4 w-full max-w-sm text-center">
          {error}
        </div>
      )}

      <div className="w-full max-w-sm space-y-4">
        <div>
          <p className="text-white font-semibold mb-2 text-lg">What's your name? 🌟</p>
          <input
            type="text"
            placeholder="Type your name here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/10 border border-purple-400 rounded-2xl px-5 py-3 text-white text-lg placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <p className="text-white font-semibold mb-2 text-lg">When's your birthday? 🎂</p>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full bg-white/10 border border-purple-400 rounded-2xl px-5 py-3 text-white text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <button
          onClick={handleStart}
          disabled={loading}
          className="w-full bg-gradient-to-r from-teal-400 to-purple-500 text-white font-bold py-4 rounded-2xl text-xl mt-4 hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Setting up..." : "Let's Go! 🚀"}
        </button>
      </div>
    </div>
  );
};

export default KidsOnboarding;




