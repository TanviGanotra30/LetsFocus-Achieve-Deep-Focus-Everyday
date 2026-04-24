import { useEffect, useState } from "react"
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Timer,
  Target,
  User,
  Settings,
  Bell,
  Search,
  Flame,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import TodoCard from "../components/TodoCard"
import { Link } from "react-router-dom"

import { getSessions, getStudyStreak } from "../services/api"
import Background from "../components/Background"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

// ─── Heatmap helpers ──────────────────────────────────────────────────────────
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
const WEEKS  = 22

function buildGrid(sessions) {
  const map = {}
  sessions.forEach(s => {
    const d = new Date(s.createdAt || s.date)
    if (isNaN(d)) return
    const key = d.toISOString().split("T")[0]
    map[key] = (map[key] || 0) + (s.duration || 0)
  })

  const total = WEEKS * 7
  const today = new Date()
  const startOffset = today.getDay()
  const start = new Date(today)
  start.setDate(today.getDate() - (total - 1) - startOffset)

  const cells = []
  for (let i = 0; i < total + startOffset; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const dateStr = d.toISOString().split("T")[0]
    cells.push({ dateStr, minutes: map[dateStr] || 0, d })
  }
  return cells
}

function cellColor(minutes) {
  if (minutes === 0)  return { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.06)", glow: "none" }
  if (minutes < 30)   return { bg: "rgba(6,182,212,0.4)",   border: "rgba(6,182,212,0.5)",    glow: "0 0 8px rgba(6,182,212,0.5)" }
  if (minutes < 60)   return { bg: "rgba(139,92,246,0.6)",  border: "rgba(139,92,246,0.6)",   glow: "0 0 10px rgba(139,92,246,0.6)" }
  if (minutes < 120)  return { bg: "rgba(168,85,247,0.8)",  border: "rgba(168,85,247,0.7)",   glow: "0 0 14px rgba(168,85,247,0.8)" }
  return               { bg: "rgba(236,72,153,1)",          border: "rgba(236,72,153,0.8)",   glow: "0 0 18px rgba(236,72,153,0.9)" }
}

function intensityLabel(minutes) {
  if (minutes === 0)  return null
  if (minutes < 30)   return "Light session"
  if (minutes < 60)   return "Moderate focus"
  if (minutes < 120)  return "Deep focus"
  return "Elite session "
}

function getMonthLabels(columns) {
  const labels = []
  let lastMonth = -1
  columns.forEach((week, wi) => {
    const m = week[0]?.d.getMonth()
    if (m !== undefined && m !== lastMonth) {
      labels.push({ col: wi, label: MONTHS[m] })
      lastMonth = m
    }
  })
  return labels
}

// ─── StudyHeatmap ─────────────────────────────────────────────────────────────
function StudyHeatmap({ sessions }) {
  const [tooltip, setTooltip] = useState(null)

  const CELL = 35
  const GAP  = 5
  const STEP = CELL + GAP

  const cells   = buildGrid(sessions)
  const columns = []
  for (let w = 0; w < Math.ceil(cells.length / 7); w++) {
    columns.push(cells.slice(w * 7, w * 7 + 7))
  }
  const monthLabels = getMonthLabels(columns)

  const activeDays = cells.filter(c => c.minutes > 0).length
  const totalMins  = cells.reduce((s, c) => s + c.minutes, 0)
  const bestDay    = cells.reduce((b, c) => c.minutes > b.minutes ? c : b, { minutes: 0 })

  return (
    <div style={{ position: "relative" }} className="heatmap-root">

      {/* Summary pills */}
      <div className="flex gap-3 mb-5 flex-wrap">
        {[
          { label: "Active days", value: activeDays },
          { label: "Total focus", value: `${(totalMins / 60).toFixed(1)}h` },
          { label: "Best day",    value: bestDay.minutes ? `${bestDay.minutes}m · ${bestDay.dateStr}` : "—" },
        ].map(({ label, value }) => (
          <div key={label} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "6px 14px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            fontSize: 17,
          }}>
            <span style={{ color: "#64748b" }}>{label}</span>
            <span style={{ color: "#fff", fontWeight: 700 }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Month labels */}
      <div style={{ display: "flex", marginLeft: 42, marginBottom: 6, position: "relative", height: 18 }}>
        {monthLabels.map(({ col, label }) => (
          <div key={col + label} style={{
            position: "absolute",
            left: col * STEP,
            fontSize: 15,
            color: "#64748b",
            letterSpacing: "0.04em",
            fontWeight: 500,
          }}>
            {label}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "flex", gap: 0 }}>

        {/* Day labels */}
        <div style={{ display: "flex", flexDirection: "column", gap: GAP, marginRight: 8, paddingTop: 0 }}>
          {DAYS.map((d, i) => (
            <div key={d} style={{
              height: CELL,
              width: 34,
              fontSize: 15,
              color: "#475569",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: 4,
              opacity: [1, 3, 5].includes(i) ? 1 : 0,
              fontWeight: 500,
              letterSpacing: "0.03em",
            }}>
              {d}
            </div>
          ))}
        </div>

        {/* Week columns */}
        <div style={{ display: "flex", gap: GAP, overflowX: "auto" }}>
          {columns.map((week, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
              {week.map((cell, di) => {
                if (!cell) return <div key={di} style={{ width: CELL, height: CELL }} />
                const { bg, border, glow } = cellColor(cell.minutes)
                const isFuture = cell.d > new Date()
                return (
                  <motion.div
                    key={cell.dateStr}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: isFuture ? 0.1 : 1, scale: 1 }}
                    transition={{ delay: Math.min((wi * 7 + di) * 0.0015, 0.4), duration: 0.25 }}
                    whileHover={!isFuture ? { scale: 1.4, zIndex: 20 } : {}}
                    style={{
                      width: CELL,
                      height: CELL,
                      borderRadius: 4,
                      backgroundColor: bg,
                      boxShadow: glow,
                      border: `1px solid ${border}`,
                      cursor: isFuture ? "default" : "crosshair",
                      flexShrink: 0,
                    }}
                    onMouseEnter={e => {
                      if (isFuture) return
                      const rect   = e.currentTarget.getBoundingClientRect()
                      const parent = e.currentTarget.closest(".heatmap-root").getBoundingClientRect()
                      setTooltip({
                        x: rect.left - parent.left + CELL / 2,
                        y: rect.top  - parent.top,
                        dateStr: cell.dateStr,
                        minutes: cell.minutes,
                      })
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            key="tip"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              left: tooltip.x,
              top: tooltip.y - 72,
              transform: "translateX(-50%)",
              pointerEvents: "none",
              zIndex: 100,
            }}
          >
            <div style={{
              background: "rgba(6,10,24,0.97)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 10,
              padding: "8px 13px",
              fontSize: 12,
              whiteSpace: "nowrap",
              boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
              minWidth: 140,
            }}>
              <div style={{ color: "#64748b", marginBottom: 3, fontSize: 11 }}>{tooltip.dateStr}</div>
              {tooltip.minutes > 0 ? (
                <>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>
                    {tooltip.minutes} min focused
                  </div>
                  <div style={{ color: "#818cf8", fontSize: 11, marginTop: 2 }}>
                    {intensityLabel(tooltip.minutes)}
                  </div>
                </>
              ) : (
                <div style={{ color: "#475569" }}>No sessions this day</div>
              )}
            </div>
            <div style={{
              width: 0, height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid rgba(6,10,24,0.97)",
              margin: "0 auto",
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        <span style={{ color: "#475569", fontSize: 11 }}>Less</span>
        {[
          { bg: "rgba(255,255,255,0.05)", label: "0 min" },
          { bg: "rgba(6,182,212,0.4)",   label: "< 30m" },
          { bg: "rgba(139,92,246,0.6)",  label: "< 60m" },
          { bg: "rgba(168,85,247,0.8)",  label: "< 2h"  },
          { bg: "rgba(236,72,153,1)",    label: "2h+"   },
        ].map(({ bg, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{
              width: CELL, height: CELL, borderRadius: 4,
              backgroundColor: bg,
              border: "1px solid rgba(255,255,255,0.08)",
              flexShrink: 0,
            }} />
            <span style={{ color: "#475569", fontSize: 10 }}>{label}</span>
          </div>
        ))}
        <span style={{ color: "#475569", fontSize: 11 }}>More</span>
      </div>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [sessions, setSessions] = useState([])
  const [streak,   setStreak]   = useState(0)
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const res = await getSessions(user._id)
      setSessions(res.data)
      const streakRes = await getStudyStreak(user._id)
      setStreak(streakRes.data.streak)
    } catch (error) {
      console.log(error)
    }
  }

  const totalSessions = sessions.length
  const totalMinutes  = sessions.reduce((sum, s) => sum + s.duration, 0)
  const subjects      = [...new Set(sessions.map(s => s.subject))]
  const focusHours    = (totalMinutes / 60).toFixed(1)

  const getGreeting = () => {
    const h = new Date().getHours()
    if (h >= 5  && h < 12) return "Good morning"
    if (h >= 12 && h < 17) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="min-h-screen text-white flex relative overflow-hidden">
      <Background />

      {/* SIDEBAR */}
      <Sidebar/>

      {/* MAIN */}
      <main className="flex-1 p-6 lg:p-8 relative z-10">
        {/* TOPBAR */}
        <Topbar/>

        {/* Header */}
        <div className="mt-8">
          <h2 className="text-5xl font-black">
            {getGreeting()}, {user?.name || "User"}
          </h2>
          <p className="text-gray-400 mt-2 text-lg">
            You're 70% to your daily focus goal. Let's finish strong.
          </p>
        </div>

        {/* TOP CARDS */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <motion.div whileHover={{ y: -5 }} className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-gray-400 text-sm">TODAY'S FOCUS</p>
            <h3 className="text-7xl font-black mt-3 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
            </h3>
            <p className="text-gray-400 mt-2">+38% vs yesterday</p>
            <button className="mt-8 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold">
              Start session
            </button>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <Flame className="mx-auto text-orange-400" size={54} />
            <h3 className="text-6xl font-black mt-4">{streak}</h3>
            <p className="text-gray-400">day streak </p>
          </motion.div>
        </div>

        {/* MIDDLE GRID */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">

          {/* HEATMAP CARD */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">Study Consistency</h3>
                <p className="text-gray-400 mt-1 text-sm">Every lit square is a day you showed up.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
                </span>
                <span className="text-xs text-gray-500">Live</span>
              </div>
            </div>
            <StudyHeatmap sessions={sessions} />
          </div>

          {/* TASKS */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <TodoCard />
          </div>
        </div>

        {/* BOTTOM STATS */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {[
            ["Deep Hours / Week", `${focusHours} hrs`],
            ["Sessions Completed", totalSessions],
            ["Subjects", subjects.length],
          ].map((item, i) => (
            <motion.div whileHover={{ y: -5 }} key={i}
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <p className="text-gray-400">{item[0]}</p>
              <h3 className="text-4xl font-black mt-3">{item[1]}</h3>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
