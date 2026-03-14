import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SOSButton = () => {
  const [pressed, setPressed] = useState(false);
  const navigate = useNavigate();

  const handleSOS = () => {
    setPressed(true);
    setTimeout(() => {
      setPressed(false);
      navigate("/sos");
    }, 300);
  };

  return (
    <button
      onClick={handleSOS}
      className={`fixed bottom-24 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center font-black text-sm shadow-lg transition-all duration-200 ${
        pressed
          ? "bg-yellow-500 scale-95"
          : "bg-red-600 hover:bg-red-500 scale-100 animate-pulse"
      }`}
      style={{
        boxShadow: "0 0 0 4px rgba(220,38,38,0.3), 0 4px 20px rgba(220,38,38,0.5)",
      }}
    >
      🚨
      <span className="text-white text-[10px] font-black">SOS</span>
    </button>
  );
};

export default SOSButton;