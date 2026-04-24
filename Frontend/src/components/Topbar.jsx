import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  LogOut,
  User,
  Settings,
  X,
} from "lucide-react";

export default function Topbar({
  data = [],               // array to search from parent page
  searchKeys = [],        // ["title","name","subject"]
  onSearchResults,        // callback(results)
  placeholder = "Search...",
}) {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [query, setQuery] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  /* ----------------------------
     REAL TIME SEARCH
  -----------------------------*/
  useEffect(() => {
    if (!onSearchResults) return;

    if (!query.trim()) {
      onSearchResults(data);
      return;
    }

    const q = query.toLowerCase();

    const filtered = data.filter((item) =>
      searchKeys.some((key) =>
        String(item[key] || "")
          .toLowerCase()
          .includes(q)
      )
    );

    onSearchResults(filtered);
  }, [query, data]);

  /* ----------------------------
     OUTSIDE CLICK CLOSE
  -----------------------------*/
  useEffect(() => {
    const handleClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  /* ----------------------------
     LOGOUT
  -----------------------------*/
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4 flex items-center justify-between gap-4 relative">

      {/* Search */}
      <div className="flex items-center gap-3 text-gray-400 w-full max-w-2xl bg-black/20 rounded-xl px-4 py-3 border border-white/5">
        <Search size={18} />

        <input
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder={placeholder}
          className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
        />

        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-gray-500 hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-5 relative">
        {/* Bell */}
        <button className="text-gray-400 hover:text-white transition">
          <Bell size={18} />
        </button>

        {/* User */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() =>
              setOpenMenu(!openMenu)
            }
            className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center font-bold text-white"
          >
            {user?.name?.[0]?.toUpperCase() || "A"}
          </button>

          {/* Dropdown */}
          {openMenu && (
            <div className="absolute right-0 top-14 w-56 rounded-2xl border border-white/10 bg-[#0f172a]/95 backdrop-blur-xl p-2 shadow-2xl z-50">

              {/* User Info */}
              <div className="px-3 py-3 border-b border-white/10">
                <p className="font-semibold text-white truncate">
                  {user?.name || "User"}
                </p>

                <p className="text-xs text-gray-400 truncate">
                  {user?.email || "user@email.com"}
                </p>
              </div>

              {/* Profile */}
              <button
                onClick={() => {
                  navigate("/profile");
                  setOpenMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-300 hover:bg-white/5 transition"
              >
                <User size={16} />
                Profile
              </button>

              {/* Settings */}
              <button
                onClick={() => {
                  navigate("/settings");
                  setOpenMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-300 hover:bg-white/5 transition"
              >
                <Settings size={16} />
                Settings
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}