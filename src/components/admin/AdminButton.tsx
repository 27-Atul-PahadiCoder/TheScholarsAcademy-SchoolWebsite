import { Settings } from "lucide-react";
import { useState } from "react";

interface AdminButtonProps {
  onClick: () => void;
}

export function AdminButton({ onClick }: AdminButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-30 group">
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-20 right-0 bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-200">
          Admin Panel (Password Required)
          <div className="absolute top-full right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
        </div>
      )}

      {/* Button */}
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group/btn"
        aria-label="Open Admin Panel"
        title="Click to access admin panel"
      >
        <Settings className="w-6 h-6 group-hover/btn:rotate-90 transition-transform duration-500" />

        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-blue-600 animate-pulse opacity-75"></div>
      </button>
    </div>
  );
}
