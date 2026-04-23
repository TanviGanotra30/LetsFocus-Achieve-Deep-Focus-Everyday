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
import { motion } from "framer-motion"
import CalendarHeatmap from "react-calendar-heatmap"
import "react-calendar-heatmap/dist/styles.css"
import TodoCard from "../components/TodoCard"
import { Link } from "react-router-dom"

import { getSessions, getStudyStreak } from "../services/api"
import Background from "../components/Background"

export default function Dashboard() {
  const [sessions, setSessions] = useState([])
  const [streak, setStreak] = useState(0)

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    fetchData()
  }, [])

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

  const totalMinutes = sessions.reduce(
    (sum, session) => sum + session.duration,
    0
  )

  const subjects = [...new Set(sessions.map((s) => s.subject))]

  const heatmapData = sessions.map((session) => ({
    date: new Date(session.createdAt || session.date)
      .toISOString()
      .split("T")[0],
    count: Math.max(1, Math.floor(session.duration / 30)),
  }))

  const focusHours = (totalMinutes / 60).toFixed(1)

  const getGreeting = () => {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) {
    return "Good morning "
  }

  if (hour >= 12 && hour < 17) {
    return "Good afternoon "
  }

  if (hour >= 17 && hour < 21) {
    return "Good evening "
  }

  return "Good night "
}
  return (
    <div className="min-h-screen text-white flex relative overflow-hidden">
      <Background />

      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/10 bg-black/20 backdrop-blur-xl p-5 hidden lg:block relative z-10">
        <h1 className="text-xl font-bold mb-10">LetsFocus</h1>

        <nav className="space-y-3">
          {[
            ["Dashboard", "/dashboard", LayoutDashboard],
            ["Tasks", "/tasks", CheckSquare],
            ["Analytics", "/analytics", BarChart3],
            ["Timer", "/timer", Timer],
            ["Goals", "/goals", Target],
            ["Profile", "/profile", User],
            ["Settings", "/settings", Settings],
          ].map(([name, path, Icon], i) => (
            <Link key={i} to={path}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition ${
                  path === "/dashboard"
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {name}
              </div>
            </Link>
          ))}
        </nav>

        {/* Quote */}
        <div className="mt-20 p-5 rounded-3xl border border-white/10 bg-white/5">
          <p className="text-cyan-400 text-sm mb-3">Daily Quote</p>
          <p className="text-sm text-gray-300 italic leading-relaxed">
            “The successful warrior is the average person, with laser-like
            focus.”
          </p>
          <p className="text-xs text-gray-500 mt-3">— Bruce Lee</p>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 lg:p-8 relative z-10">
        {/* TOPBAR */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-400 w-[60%]">
            <Search size={18} />
            <input
              placeholder="Search tasks, goals, sessions..."
              className="bg-transparent outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-5">
            <Bell size={18} />
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center font-bold">
              {user?.name?.[0] || "A"}
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mt-8">
            <h2 className="text-5xl font-black">
  {getGreeting()}, {user?.name || "User"}
          </h2>

          <p className="text-gray-400 mt-2 text-lg">
            You’re 70% to your daily focus goal. Let’s finish strong.
          </p>
        </div>

        {/* TOP CARDS */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* Focus Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8"
          >
            <p className="text-gray-400 text-sm">TODAY'S FOCUS</p>

            <h3 className="text-7xl font-black mt-3 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
            </h3>

            <p className="text-gray-400 mt-2">+38% vs yesterday</p>

            <button className="mt-8 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold">
              Start session
            </button>
          </motion.div>

          {/* Streak */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center"
          >
            <Flame className="mx-auto text-orange-400" size={54} />
            <h3 className="text-6xl font-black mt-4">{streak}</h3>
            <p className="text-gray-400">day streak 🔥</p>
            {/* <p className="text-sm text-gray-500 mt-2">
              Best ever: {streak + 14} days
            </p> */}
          </motion.div>
        </div>

        {/* MIDDLE GRID */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* HEATMAP */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8 overflow-hidden">
            <h3 className="text-2xl font-bold">Study Consistency</h3>

            <p className="text-gray-400 mt-2 mb-6">
              Every marked square shows the days you worked.
            </p>

            <div className="overflow-x-auto">
              <CalendarHeatmap
                startDate={
                  new Date(
                    new Date().setFullYear(
                      new Date().getFullYear() - 1
                    )
                  )
                }
                endDate={new Date()}
                values={heatmapData}
                classForValue={(value) => {
                  if (!value) return "color-empty"
                  if (value.count >= 4) return "color-github-4"
                  if (value.count >= 3) return "color-github-3"
                  if (value.count >= 2) return "color-github-2"
                  return "color-github-1"
                }}
                showWeekdayLabels={false}
              />
            </div>
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
            <motion.div
              whileHover={{ y: -5 }}
              key={i}
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