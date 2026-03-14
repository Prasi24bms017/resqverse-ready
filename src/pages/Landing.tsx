import { useNavigate } from "react-router-dom";
import { Shield, ArrowRight } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
      <ParticleBackground />

      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Logo */}
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse-teal">
          <Shield size={48} className="text-primary" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Res<span className="text-primary">Q</span>verse
        </h1>
        <p className="text-muted-foreground text-sm mb-12">Prepare Today. Protect Tomorrow.</p>

        {/* Role Cards */}
        <div className="grid grid-cols-2 gap-4 w-full mb-12">
          <button
            onClick={() => navigate("/teacher/login")}
            className="gradient-teacher-blue card-glow p-5 text-left group"
          >
            <span className="text-3xl mb-3 block">👨‍🏫</span>
            <h3 className="font-semibold text-foreground mb-1 text-sm">I'm a Teacher</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">Manage your school & students</p>
            <ArrowRight size={16} className="text-primary mt-3 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate("/home")}
            className="gradient-teacher-teal card-glow p-5 text-left group"
          >
            <span className="text-3xl mb-3 block">👨‍👩‍👧</span>
            <h3 className="font-semibold text-foreground mb-1 text-sm">Students & Parents</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">Learn, Play & Stay Safe</p>
            <ArrowRight size={16} className="text-primary mt-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Trust badge */}
        <p className="text-muted-foreground text-xs">Trusted by 500+ schools across India 🇮🇳</p>
      </div>
    </div>
  );
};

export default Landing;
