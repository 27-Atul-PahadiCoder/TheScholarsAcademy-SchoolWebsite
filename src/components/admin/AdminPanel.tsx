import { useState, useEffect } from "react";
import { X, Unlock, Lock, Shield } from "lucide-react";
import { useSuboptionLock } from "../../hooks/useSuboptionLock";
import {
  SUBOPTIONS_LOCKS,
  getSuboptionById,
} from "../../config/suboptionsLocks";
import { hasAdminSession } from "../../api/admin";

const ADMIN_KEY = "admin-master-key-2024"; // The hardcoded admin key

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const { unlock, lock, isUnlocked, getUnlockedState, resetAll } =
    useSuboptionLock();
  const [message, setMessage] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const allSuboptions = Object.values(SUBOPTIONS_LOCKS).flat();

  useEffect(() => {
    if (isOpen) {
      setIsAuthorized(hasAdminSession());
    }
  }, [isOpen]);

  // Handle locking/unlocking and feedback messages
  const handleUnlock = (suboptionId: string) => {
    const subitem = getSuboptionById(suboptionId);
    if (!subitem) {
      setMessage("Subitem not found");
      return;
    }

    const success = unlock(suboptionId, subitem.secretKey);
    if (success) {
      setMessage(`✓ Unlocked: ${subitem.label}`);
    } else {
      setMessage(`✗ Failed to unlock ${subitem.label}`);
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleLock = (suboptionId: string) => {
    const subitem = getSuboptionById(suboptionId);
    if (!subitem) {
      setMessage("Subitem not found");
      return;
    }

    if (!adminKey || adminKey !== ADMIN_KEY) {
      setMessage("Invalid admin key");
      return;
    }

    const success = lock(suboptionId, adminKey);
    if (success) {
      setMessage(`✓ Locked: ${subitem.label}`);
    } else {
      setMessage("✗ Failed to lock");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleResetAll = () => {
    if (!adminKey || adminKey !== ADMIN_KEY) {
      setMessage("Invalid admin key");
      return;
    }
    const success = resetAll(adminKey);
    if (success) {
      setMessage("✓ All suboptions reset to default state");
    } else {
      setMessage("✗ Failed to reset");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleLogout = () => {
    // Clear the session storage and reset the admin key input
    sessionStorage.clear();
    setAdminKey("");
    onClose();
    setMessage("Logged out successfully");
    setTimeout(() => setMessage(""), 2000);
  };

  // Disable right-click and developer tools access
  useEffect(() => {
    const preventDevTools = (e: any) => {
      if (e.keyCode === 123) {
        e.preventDefault(); // F12 key
      }
    };
    document.addEventListener("keydown", preventDevTools);
    return () => {
      document.removeEventListener("keydown", preventDevTools);
    };
  }, []);

  if (!isOpen) return null;

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
            <Shield className="w-6 h-6 text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Admin Access Only
          </h2>
          <p className="text-sm text-slate-600">
            Please sign in through the Admin Dashboard before managing menu
            visibility. This panel is hidden from public visitors.
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="/admin"
              className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-slate-900 text-white text-sm font-semibold px-4 py-2"
            >
              Go to Admin Dashboard
            </a>
            <button
              onClick={onClose}
              className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const unlockedState = getUnlockedState();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Admin Key Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Master Key
            </label>
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Enter admin key to lock/unlock"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onContextMenu={(e) => e.preventDefault()} // Disable right-click
            />
            <p className="text-xs text-gray-500 mt-1">
              Required to lock items or reset all
            </p>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                message.startsWith("✓")
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          {/* Reset All */}
          <button
            onClick={handleResetAll}
            className="w-full px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition"
          >
            Reset All to Default State
          </button>

          {/* Suboptions List */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-gray-900 text-sm mb-3">
              Manage Suboptions
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {allSuboptions.map((subitem) => {
                const unlocked = isUnlocked(subitem.id);
                return (
                  <div
                    key={subitem.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {subitem.label}
                      </p>
                      <p className="text-xs text-gray-500">{subitem.id}</p>
                    </div>
                    <div className="flex gap-2">
                      {!unlocked ? (
                        <button
                          onClick={() => handleUnlock(subitem.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition"
                          title={`Secret key: ${subitem.secretKey}`}
                        >
                          <Unlock className="w-3.5 h-3.5" />
                          Unlock
                        </button>
                      ) : (
                        <button
                          onClick={() => handleLock(subitem.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          Lock
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Debug Info */}
          <div className="border-t border-gray-200 pt-4">
            <details className="text-xs">
              <summary className="font-semibold text-gray-700 cursor-pointer hover:text-gray-900">
                Debug Info (Current Unlocked State)
              </summary>
              <pre className="mt-2 bg-gray-100 p-2 rounded text-xs overflow-x-auto text-gray-600">
                {JSON.stringify(unlockedState, null, 2)}
              </pre>
            </details>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
