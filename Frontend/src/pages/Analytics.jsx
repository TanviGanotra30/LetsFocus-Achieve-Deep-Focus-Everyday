import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bell } from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import Background from "../components/Background";

import {
  getWeeklyStats,
  getSessions,
  getContributionData,
  getStudyStreak,
} from "../services/api";

// ─── Custom Tooltip ──────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "rgba(10,15,30,0.95)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 10,
        padding: "8px 14px",
        color: "#fff",
        fontSize: 13,
      }}
    >
      <p style={{ color: "#94a3b8", marginBottom: 2 }}>{label}</p>
      <p style={{ color: "#00CFFF", fontWeight: 700 }}>
        {payload[0].value} min
      </p>
    </div>
  );
};

// ─── Heatmap grid builder ────────────────────────────────────────────────────
function buildHeatmapGrid(contributions) {
  const map = {};
  contributions.forEach(({ date, count }) => { map[date] = count; });

  const TOTAL = 18 * 7;
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - (TOTAL - 1));

  return Array.from({ length: TOTAL }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    return { date: dateStr, count: map[dateStr] || 0 };
  });
}

function heatColor(count) {
  if (count === 0) return "#1e293b";
  if (count < 30)  return "#06b6d4";
  if (count < 60)  return "#8b5cf6";
  return "#ec4899";
}

// ─── Chart wrapper — gives Recharts a guaranteed pixel height ────────────────
// This is the ONLY reliable fix for "width(-1) height(-1)" errors.
// Recharts uses ResizeObserver on the immediate parent; it must have
// a concrete pixel height, not a percentage or min-height.
function ChartBox({ height = 280, children }) {
  return (
    <div style={{ position: "relative", width: "100%", height }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function Analytics() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [weeklyData,       setWeeklyData]       = useState([]);
  const [sessionsData,     setSessionsData]     = useState([]);
  const [contributionData, setContributionData] = useState([]);
  const [streak,           setStreak]           = useState(0);
  const [loading,          setLoading]          = useState(true);
  const [error,            setError]            = useState(null);

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const [weekly, sessions, contribution, streakRes] = await Promise.all([
        getWeeklyStats(),
        getSessions(),
        getContributionData(),
        getStudyStreak(),
      ]);

      setWeeklyData(weekly?.data       ?? weekly       ?? []);
      setSessionsData(sessions?.data   ?? sessions     ?? []);
      setContributionData(contribution?.data ?? contribution ?? []);
      setStreak(streakRes?.data?.streak ?? streakRes?.streak ?? 0);
    } catch (err) {
      console.error("Analytics fetch error:", err);
      setError("Failed to load analytics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalMinutes  = sessionsData.reduce((sum, s) => sum + (s.duration || 0), 0);
  const totalHours    = (totalMinutes / 60).toFixed(1);
  const totalSessions = sessionsData.length;
  const avgSession    = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;
  const streakCapped  = Math.min(streak, 30);
  const heatmapCells  = buildHeatmapGrid(contributionData);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white relative overflow-hidden">
        <Background />
        <div className="z-10 text-center">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading analytics…</p>
        </div>
      </div>
    );
  }

  return (
    /*
      ✅ KEY FIX: Use h-screen (concrete pixel height) NOT min-h-screen.
      min-h-screen makes the div's height "auto" in flexbox context,
      which means children can't measure their height → Recharts gets -1.
      h-screen = 100vh = a real pixel value ResizeObserver can read.
      overflow-y-auto moves scroll to the flex container level.
    */
    <div className="h-screen flex overflow-hidden text-white relative">
      <Background />

      {/* ── Sidebar ── */}
      <aside className="w-60 hidden lg:flex lg:flex-col z-10 border-r border-white/10 bg-black/20 backdrop-blur-xl p-5 flex-shrink-0">
        <h1 className="text-xl font-bold mb-10">Focus &amp; Achieve</h1>
        <nav className="space-y-3">
          {[
            ["Dashboard", "/dashboard"],
            ["Tasks",     "/tasks"],
            ["Analytics", "/analytics"],
            ["Timer",     "/timer"],
          ].map(([name, path], i) => (
            <Link key={i} to={path}>
              <div className={`px-4 py-3 rounded-2xl ${
                path === "/analytics" ? "bg-white/10" : "text-gray-400 hover:bg-white/5"
              }`}>
                {name}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* ── Main — scroll happens here ── */}
      <main className="flex-1 overflow-y-auto z-10 p-6">

        {/* Topbar */}
        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 flex justify-between items-center">
          <div className="flex gap-3 items-center text-gray-400">
            <Search size={18} />
            <input placeholder="Search..." className="bg-transparent outline-none" />
          </div>
          <div className="flex gap-5 items-center">
            <Bell size={18} />
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center font-bold">
              {user?.name?.charAt(0) ?? "U"}
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Analytics</h1>
            <p className="text-gray-400">Where your hours actually go.</p>
          </div>
          <button
            onClick={fetchStats}
            className="text-xs text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/10 px-4 py-2 rounded-xl transition"
          >
            ↻ Refresh
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* ── Stat Cards ── */}
        <div className="grid md:grid-cols-4 gap-5 mt-8">
          {[
            ["Focus Hours",  totalHours],
            ["Sessions",     totalSessions],
            ["Avg Session",  `${avgSession}m`],
            ["Streak",       `${streak}d`],
          ].map(([label, val], i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-gray-400">{label}</p>
              <h2 className="text-4xl font-black mt-2 text-cyan-400">{val}</h2>
            </div>
          ))}
        </div>

        {/* ── Graph Row ── */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">

          {/* Weekly Line Chart */}
          <div className="md:col-span-3 rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="font-bold mb-1">Weekly Focus</h2>
            <p className="text-xs text-gray-500 mb-4">Minutes focused per day this week</p>
            <ChartBox height={280}>
              <LineChart data={weeklyData}>
                <XAxis dataKey="day" stroke="#334155" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="minutes"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ fill: "#8B5CF6", r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#00CFFF", strokeWidth: 0 }}
                  isAnimationActive
                />
              </LineChart>
            </ChartBox>
          </div>

          {/* Streak Donut */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="font-bold mb-1">Consistency</h2>
            <p className="text-xs text-gray-500 mb-4">Day streak (out of 30)</p>
            <ChartBox height={280}>
              <PieChart>
                <Pie
                  data={[
                    { value: streakCapped },
                    { value: Math.max(0, 30 - streakCapped) },
                  ]}
                  innerRadius={68}
                  outerRadius={88}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  strokeWidth={0}
                  isAnimationActive
                >
                  <Cell fill="#00CFFF" />
                  <Cell fill="#1e293b" />
                </Pie>
                <text x="50%" y="46%" textAnchor="middle" dominantBaseline="middle"
                  fill="white" fontSize="26" fontWeight="bold">
                  {streak}d
                </text>
                <text x="50%" y="59%" textAnchor="middle" dominantBaseline="middle"
                  fill="#64748b" fontSize="11">
                  streak
                </text>
              </PieChart>
            </ChartBox>
          </div>
        </div>

        {/* ── Contribution Heatmap ── */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 mt-8">
          <h2 className="font-bold mb-1">Contribution Graph</h2>
          <p className="text-xs text-gray-500 mb-5">Last 18 weeks of study activity</p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(18, 14px)",
            gridTemplateRows: "repeat(7, 14px)",
            gridAutoFlow: "column",
            gap: 5,
            overflowX: "auto",
          }}>
            {heatmapCells.map((cell, i) => (
              <div
                key={i}
                title={`${cell.date}: ${cell.count} min`}
                style={{
                  width: 14, height: 14, borderRadius: 3,
                  backgroundColor: heatColor(cell.count),
                  transition: "opacity 0.15s",
                  cursor: "default",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.5")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-5 text-xs text-gray-500">
            <span>Less</span>
            {[
              ["#1e293b", "0 min"],
              ["#06b6d4", "< 30 min"],
              ["#8b5cf6", "< 60 min"],
              ["#ec4899", "60+ min"],
            ].map(([color, label]) => (
              <div key={color} className="flex items-center gap-1">
                <div style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: color }} />
                <span className="text-gray-600">{label}</span>
              </div>
            ))}
            <span>More</span>
          </div>
        </div>

        {/* ── Productivity Bar Chart ── */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 mt-8 mb-8">
          <h2 className="font-bold mb-1">Productivity Breakdown</h2>
          <p className="text-xs text-gray-500 mb-4">Total minutes per day this week</p>
          <ChartBox height={260}>
            <BarChart data={weeklyData} barCategoryGap="30%">
              <XAxis dataKey="day" stroke="#334155" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="minutes" fill="#00CFFF" radius={[8, 8, 0, 0]} isAnimationActive />
            </BarChart>
          </ChartBox>
        </div>

      </main>
    </div>
  );
}
