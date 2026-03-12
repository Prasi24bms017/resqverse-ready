import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ to }: { to?: string }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2"
    >
      <ArrowLeft size={20} />
      <span className="text-sm">Back</span>
    </button>
  );
};

export default BackButton;
