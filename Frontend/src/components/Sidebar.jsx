import { Link, useLocation, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Timer,
  User,
  Settings,
  Zap,
  TrendingUp,
  Clock,
} from "lucide-react";
import { getSessions, getStudyStreak } from "../services/api";
import { LogOut, ChevronUp } from "lucide-react";


// ── tiny ring component ────────────────────────────────────────────────────
function Ring({ pct = 0, size = 56, stroke = 5, color = "#00CFFF", children }) {
  const r   = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {children}
      </div>
    </div>
  );
}

// ── live clock ─────────────────────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");
  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  });

  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      padding: "14px 16px",
      textAlign: "center",
    }}>
      <div style={{
        fontFamily: "'Courier New', monospace",
        fontSize: 33,
        fontWeight: 700,
        letterSpacing: "0.08em",
        background: "linear-gradient(135deg,#00CFFF,#a78bfa)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        lineHeight: 1,
      }}>
        {hh}<span style={{
          animation: "blink 1s step-end infinite",
          display: "inline-block",
        }}>:</span>{mm}
        <span style={{ fontSize: 19, opacity: 0.5, marginLeft: 3 }}>:{ss}</span>
      </div>
      <div style={{ color: "#64748b", fontSize: 11, marginTop: 4, letterSpacing: "0.06em" }}>
        {dateStr}
      </div>
    </div>
  );
}

// ── main sidebar ───────────────────────────────────────────────────────────
export default function Sidebar() {
  const location = useLocation();
  const user     = JSON.parse(localStorage.getItem("user") || "{}");

  const [sessions, setSessions] = useState([]);
  const [streak,   setStreak]   = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const [sRes, stRes] = await Promise.all([getSessions(), getStudyStreak()]);
        setSessions(sRes.data ?? sRes ?? []);
        setStreak(stRes.data?.streak ?? stRes?.streak ?? 0);
      } catch { /* silent */ }
    })();
  }, []);

  const totalMins   = sessions.reduce((s, x) => s + (x.duration || 0), 0);
  const todayMins   = sessions.filter(s => {
    const d = new Date(s.createdAt || s.date);
    return d.toDateString() === new Date().toDateString();
  }).reduce((sum, s) => sum + (s.duration || 0), 0);

  const GOAL_MINS   = 120; // daily focus goal in minutes
  const goalPct     = Math.min(100, Math.round((todayMins / GOAL_MINS) * 100));
  const streakPct   = Math.min(100, Math.round((streak / 30) * 100));



const navigate = useNavigate();
const [showMenu, setShowMenu] = useState(false);

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
};

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Tasks",     path: "/tasks",      icon: CheckSquare },
    { name: "Analytics", path: "/analytics",  icon: BarChart3 },
    { name: "Timer",     path: "/timer",      icon: Timer },
    { name: "Profile",   path: "/profile",    icon: User },
    { name: "Settings",  path: "/settings",   icon: Settings },
  ];

  const quotes = [
    { text: "The successful warrior is the average person, with laser-like focus.", author: "Bruce Lee" },
    { text: "You don't rise to the level of your goals, you fall to the level of your systems.", author: "James Clear" },
    { text: "Focus is not about saying yes. It's about saying no.", author: "Steve Jobs" },
  ];
  const quote = quotes[new Date().getDate() % quotes.length];

  return (
    <>
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(0,207,255,0.3); }
          50%       { box-shadow: 0 0 18px rgba(0,207,255,0.7); }
        }
        .nav-item { position: relative; overflow: hidden; }
        .nav-item::before {
          content: "";
          position: absolute;
          left: -100%; top: 0; bottom: 0; width: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
          transition: left 0.4s;
        }
        .nav-item:hover::before { left: 100%; }
      `}</style>

      <aside style={{
        width: 256,
        minHeight: "100vh",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(0,0,0,0.25)",
        backdropFilter: "blur(24px)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: "24px 14px",
        gap: 0,
        flexShrink: 0,
        overflowY: "auto",
      }}>

        {/* ── Logo ── */}
        <div style={{ paddingLeft: 6, marginBottom: 28 }}>
          <div style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg,#fff 40%,#a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            LetsFocus
          </div>
          <div style={{ fontSize: 11, color: "white", marginTop: 2, letterSpacing: "0.04em" }}>
            Study smarter, not harder
          </div>
        </div>

        {/* ── Live Clock ── */}
        <LiveClock />

        {/* ── Nav ── */}
        <nav style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 4 }}>
          {menu.map((item) => {
            const Icon   = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} style={{ textDecoration: "none" }}>
                <div className="nav-item" style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  borderRadius: 14,
                  transition: "all 0.2s",
                  background: active
                    ? "linear-gradient(135deg,rgba(0,207,255,0.15),rgba(167,139,250,0.12))"
                    : "transparent",
                  border: active
                    ? "1px solid rgba(0,207,255,0.2)"
                    : "1px solid transparent",
                  color: active ? "#fff" : "#64748b",
                  cursor: "pointer",
                  animation: active ? "pulse-glow 3s ease-in-out infinite" : "none",
                }}>
                  {/* Active indicator bar */}
                  {active && (
                    <div style={{
                      position: "absolute",
                      left: 0, top: "20%", bottom: "20%",
                      width: 3,
                      borderRadius: 2,
                      background: "linear-gradient(180deg,#00CFFF,#a78bfa)",
                    }} />
                  )}
                  <Icon size={17} color={active ? "#00CFFF" : "#475569"} />
                  <span style={{ fontSize: 14, fontWeight: active ? 600 : 400 }}>
                    {item.name}
                  </span>

                  {/* Active dot */}
                  {active && (
                    <div style={{
                      marginLeft: "auto",
                      width: 6, height: 6,
                      borderRadius: "50%",
                      background: "#00CFFF",
                      boxShadow: "0 0 6px #00CFFF",
                    }} />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* ── Divider ── */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)",
          margin: "20px 0",
        }} />

        {/* ── Today's Stats ── */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 18,
          padding: "16px 14px",
        }}>
          <div style={{
            fontSize: 23,
            color: "#64748b",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}>
            Today's Progress
          </div>

          {/* Goal ring + streak ring */}
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <Ring pct={goalPct} size={60} stroke={5} color="#00CFFF">
                <span style={{ fontSize: 23, fontWeight: 700, color: "#00CFFF" }}>{goalPct}%</span>
              </Ring>
              <div style={{ fontSize: 10, color: "#64748b", marginTop: 6 }}>Daily goal</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>
                {todayMins}m / {GOAL_MINS}m
              </div>
            </div>

            <div style={{
              width: 1, height: 60,
              background: "rgba(255,255,255,0.06)",
            }} />

            <div style={{ textAlign: "center" }}>
              <Ring pct={streakPct} size={60} stroke={5} color="#f97316">
                <span style={{ fontSize: 23, fontWeight: 700, color: "#f97316" }}>{streak}</span>
              </Ring>
              <div style={{ fontSize: 10, color: "#64748b", marginTop: 6 }}>Streak</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>
                {streak} day{streak !== 1 ? "s" : ""}
              </div>
            </div>
          </div>

          {/* Quick stats row */}
          <div style={{
            display: "flex",
            gap: 8,
            marginTop: 14,
          }}>
            {[
              { icon: Zap,       label: "Sessions", value: sessions.length },
              { icon: TrendingUp, label: "Hours",   value: `${(totalMins/60).toFixed(1)}h` },
              { icon: Clock,      label: "Avg",     value: sessions.length
                ? `${Math.round(totalMins / sessions.length)}m` : "—" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} style={{
                flex: 1,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: "8px 6px",
                textAlign: "center",
              }}>
                <Icon size={13} color="#64748b" style={{ margin: "0 auto 3px" }} />
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{value}</div>
                <div style={{ fontSize: 9, color: "#475569", letterSpacing: "0.04em" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quote ── */}
        <div style={{
          marginTop: 16,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 18,
          padding: "16px 14px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative quote mark */}
          <div style={{
            position: "absolute",
            top: -8, right: 10,
            fontSize: 80,
            color: "rgba(0,207,255,0.06)",
            fontFamily: "Georgia, serif",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}>"</div>

          <div style={{ fontSize: 11, color: "#00CFFF", fontWeight: 600,
            letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
            Daily Spark
          </div>
          <p style={{
            fontSize: 15,
            color: "#94a3b8",
            lineHeight: 1.7,
            fontStyle: "italic",
          }}>
            "{quote.text}"
          </p>
          <p style={{ fontSize: 11, color: "#475569", marginTop: 8 }}>— {quote.author}</p>
        </div>

        {/* ── User card ── */}
        {/* <div style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 14px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16,
        }}>
          <div style={{
            width: 36, height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#00CFFF,#a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, fontWeight: 700, flexShrink: 0,
          }}>
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{
              fontSize: 13, fontWeight: 600, color: "#fff",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {user?.name || "User"}
            </div>
            <div style={{ fontSize: 13, color: "#475569" }}>
              {user?.email || "student"}
            </div>
          </div>
        </div> */}


        <div style={{ marginTop: 16, position: "relative" }}>
  <div
    onClick={() => setShowMenu(!showMenu)}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "12px 14px",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 16,
      cursor: "pointer",
    }}
  >
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "linear-gradient(135deg,#00CFFF,#a78bfa)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 15,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {user?.name?.[0]?.toUpperCase() || "U"}
    </div>

    <div style={{ flex: 1, overflow: "hidden" }}>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#fff",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {user?.name || "User"}
      </div>

      <div style={{ fontSize: 11, color: "#64748b" }}>
        {user?.email || "student"}
      </div>
    </div>

    <ChevronUp
      size={16}
      color="#94a3b8"
      style={{
        transform: showMenu ? "rotate(180deg)" : "rotate(0deg)",
        transition: "0.3s",
      }}
    />
  </div>

  {/* Dropdown */}
  {showMenu && (
    <div
      style={{
        marginTop: 8,
        background: "rgba(20,20,30,0.95)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      <button
        onClick={handleLogout}
        style={{
          width: "100%",
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "#ff6b6b",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  )}
</div>
      </aside>
    </>
  );
}
