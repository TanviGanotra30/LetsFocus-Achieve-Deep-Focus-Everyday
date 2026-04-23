// import { useEffect, useState } from "react"
// import Navbar from "../components/Navbar"
// import { getSessions, getStudyStreak } from "../services/api"
// import ContributionHeatmap from "../components/ContributionHeatmap"
// import { motion } from "framer-motion"

// export default function Dashboard() {

//   const [sessions, setSessions] = useState([])
//   const [streak, setStreak] = useState(0)

//   const user = JSON.parse(localStorage.getItem("user"))

//   useEffect(() => {
//     fetchData()
//   }, [])

//   const fetchData = async () => {
//     try {
//       const res = await getSessions(user._id)
//       setSessions(res.data)

//       const streakRes = await getStudyStreak(user._id)
//       setStreak(streakRes.data.streak)

//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const totalSessions = sessions.length
//   const totalMinutes = sessions.reduce(
//     (sum, session) => sum + session.duration,
//     0
//   )

//   const subjects = [...new Set(sessions.map(s => s.subject))]

//   // ✅ WEEK DATA FIXED
// const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

// const weeklyData = weekDays.map((day, index) => {

//   const total = sessions
//     .filter(session => {
//       const date = new Date(session.createdAt || session.date)
//       return date.getDay() === index   // 🔥 FIXED
//     })
//     .reduce((sum, session) => sum + session.duration, 0)

//   return total
// })
  

//   const maxVal = Math.max(...weeklyData, 60) // safe fallback
// const bestDayIndex = weeklyData.indexOf(maxVal)

//   return (

//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-200"
//     >

//       {/* Glow Effects */}
//       <div className="absolute w-[500px] h-[500px] bg-purple-300 blur-[150px] opacity-40 top-10 left-10"></div>
//       <div className="absolute w-[500px] h-[500px] bg-indigo-300 blur-[150px] opacity-40 bottom-10 right-10"></div>

//       <Navbar />

//       <div className="max-w-6xl mx-auto px-6 py-10 relative z-10">

//         {/* Header */}
//         <motion.div
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="mb-12"
//         >
//           <h1 className="text-5xl font-extrabold text-gray-800 mb-3">
//             Welcome back, {user?.name} 👋
//           </h1>
//           <p className="text-gray-500 text-lg">
//             Stay consistent. Small steps daily leads to big results.
//           </p>
//         </motion.div>


//         {/* Stats */}
//         <div className="grid md:grid-cols-4 gap-6 mb-12">

//           {[ 
//             { label: "Focus Time", value: `${totalMinutes} min`, color: "indigo" },
//             { label: "Sessions", value: totalSessions, color: "green" },
//             { label: "Subjects", value: subjects.length, color: "purple" },
//             { label: "Streak", value: ` ${streak}`, color: "orange" }
//           ].map((item, i) => (

//             <motion.div
//               key={i}
//               initial={{ y: 40, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: i * 0.1 }}
//               whileHover={{ scale: 1.05 }}
//               className="p-6 rounded-2xl bg-white/70 backdrop-blur shadow-lg"
//             >

//               <p className="text-gray-500 text-sm">{item.label}</p>

//               <h2 className={`text-3xl font-bold mt-2 text-${item.color}-600`}>
//                 {item.value}
//               </h2>

//             </motion.div>

//           ))}

//         </div>


//         {/* Heatmap */}
//         <motion.div
//           initial={{ scale: 0.95, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="p-10 rounded-3xl bg-white/80 backdrop-blur shadow-xl mb-12"
//         >

//           <h2 className="text-2xl font-bold mb-6 text-gray-700">
//             Study Consistency
//           </h2>

//           <ContributionHeatmap />

//         </motion.div>


//         {/* Bottom */}
//         <div className="grid md:grid-cols-2 gap-8">

//           {/* ✅ REAL WEEKLY CHART */}
//           <motion.div
//   initial={{ x: -40, opacity: 0 }}
//   animate={{ x: 0, opacity: 1 }}
//   className="p-8 rounded-2xl bg-white/80 backdrop-blur shadow-lg"
// >

//   <h2 className="text-xl font-semibold mb-6 text-gray-700">
//     Weekly Focus
//   </h2>

//   <div className="flex items-end justify-between h-52 px-2">

//     {weeklyData.map((val, i) => {

//       const height = (val / maxVal) * 100

//       return (
//         <div key={i} className="flex flex-col items-center group">

//           {/* 🔥 Tooltip */}
//           <span className="opacity-0 group-hover:opacity-100 transition text-xs bg-black text-white px-2 py-1 rounded mb-2">
//             {val} min
//           </span>

//           {/* 🔥 Bar */}
//           <motion.div
//             initial={{ height: 0 }}
//             animate={{ height: `${val === 0 ? 5 : height}%` }}
//             transition={{ delay: i * 0.1, type: "spring" }}
//             whileHover={{ scale: 1.1 }}
//             className={`w-10 rounded-xl transition-all
//               ${i === bestDayIndex
//                 ? "bg-gradient-to-t from-green-400 to-green-600 shadow-lg"
//                 : "bg-gradient-to-t from-indigo-400 to-indigo-600"
//               }
//             `}
//           />

//           {/* Day */}
//           <span className="text-xs text-gray-500 mt-2">
//             {weekDays[i]}
//           </span>

//         </div>
//       )
//     })}

//   </div>

// </motion.div>


//           {/* Motivation */}
//           <motion.div
//             initial={{ x: 40, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             className="p-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg"
//           >

//             <h2 className="text-2xl font-semibold mb-4">
//               Stay Focused 
//             </h2>

//             <p className="text-lg opacity-90">
//               Discipline beats motivation. Even 30 mins daily
//               can change everything.
//             </p>

//           </motion.div>

//         </div>

//       </div>

//     </motion.div>
//   )
// }


// import { useEffect, useState } from "react"
// import {
//   LayoutDashboard,
//   CheckSquare,
//   BarChart3,
//   Timer,
//   Target,
//   User,
//   Settings,
//   Bell,
//   Search,
//   Flame,
// } from "lucide-react"
// import { motion } from "framer-motion"
// import { getSessions, getStudyStreak } from "../services/api"
// import Background from "../components/Background"

// export default function Dashboard() {
//   const [sessions, setSessions] = useState([])
//   const [streak, setStreak] = useState(0)

//   const user = JSON.parse(localStorage.getItem("user"))

//   useEffect(() => {
//     fetchData()
//   }, [])

//   const fetchData = async () => {
//     try {
//       const res = await getSessions(user._id)
//       setSessions(res.data)

//       const streakRes = await getStudyStreak(user._id)
//       setStreak(streakRes.data.streak)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const totalSessions = sessions.length
//   const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0)
//   const subjects = [...new Set(sessions.map((s) => s.subject))]

//   const weekDays = ["M", "T", "W", "T", "F", "S", "S"]

//   const weeklyData = [45, 72, 55, 88, 96, 78, 92]

//   return (
//     <div className="min-h-screen text-white flex relative overflow-hidden">
//       <Background />

//       {/* SIDEBAR */}
//       <aside className="w-64 border-r border-white/10 bg-black/20 backdrop-blur-xl p-5 hidden lg:block">
//         <h1 className="text-xl font-bold mb-10">Focus & Achieve</h1>

//         <nav className="space-y-3">
//           {[
//             ["Dashboard", LayoutDashboard],
//             ["Tasks", CheckSquare],
//             ["Analytics", BarChart3],
//             ["Timer", Timer],
//             ["Goals", Target],
//             ["Profile", User],
//             ["Settings", Settings],
//           ].map(([name, Icon], i) => (
//             <div
//               key={i}
//               className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer ${
//                 i === 0
//                   ? "bg-white/10 text-white"
//                   : "text-gray-400 hover:bg-white/5"
//               }`}
//             >
//               <Icon size={18} />
//               {name}
//             </div>
//           ))}
//         </nav>

//         <div className="mt-20 p-5 rounded-3xl border border-white/10 bg-white/5">
//           <p className="text-cyan-400 text-sm mb-2">Daily Quote</p>
//           <p className="text-sm text-gray-300 italic">
//             "Discipline beats motivation."
//           </p>
//         </div>
//       </aside>

//       {/* MAIN */}
//       <main className="flex-1 p-6 lg:p-8 relative z-10">
//         {/* TOPBAR */}
//         <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3 text-gray-400 w-[60%]">
//             <Search size={18} />
//             <input
//               placeholder="Search tasks, goals, sessions..."
//               className="bg-transparent outline-none w-full"
//             />
//           </div>

//           <div className="flex items-center gap-5">
//             <Bell size={18} />
//             <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center font-bold">
//               {user?.name?.[0] || "A"}
//             </div>
//           </div>
//         </div>

//         {/* HEADER */}
//         <div className="mt-8">
//           <h2 className="text-5xl font-black">
//             Good morning, {user?.name || "Aria"}
//           </h2>
//           <p className="text-gray-400 mt-2 text-lg">
//             You're 70% to your daily focus goal. Let's finish strong.
//           </p>
//         </div>

//         {/* TOP GRID */}
//         <div className="grid lg:grid-cols-3 gap-6 mt-8">
//           {/* FOCUS CARD */}
//           <motion.div
//             whileHover={{ y: -5 }}
//             className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8"
//           >
//             <p className="text-gray-400 text-sm">TODAY'S FOCUS</p>
//             <h3 className="text-7xl font-black mt-3 text-purple-400">
//               {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
//             </h3>
//             <p className="text-gray-400 mt-2">+38% vs yesterday</p>

//             <button className="mt-8 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold">
//               Start session
//             </button>
//           </motion.div>

//           {/* STREAK */}
//           <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
//             <Flame className="mx-auto text-orange-400" size={54} />
//             <h3 className="text-6xl font-black mt-4">{streak}</h3>
//             <p className="text-gray-400">day streak</p>
//           </div>
//         </div>

//         {/* MIDDLE GRID */}
//         <div className="grid lg:grid-cols-3 gap-6 mt-6">
//           {/* WEEKLY CHART */}
//           <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8">
//             <h3 className="text-2xl font-bold mb-8">This week</h3>

//             <div className="flex items-end gap-4 h-56">
//               {weeklyData.map((val, i) => (
//                 <div key={i} className="flex-1 text-center">
//                   <div
//                     className="rounded-t-2xl bg-gradient-to-t from-cyan-500 to-purple-500"
//                     style={{ height: `${val * 1.6}px` }}
//                   ></div>
//                   <p className="text-gray-500 text-sm mt-2">{weekDays[i]}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* TASKS */}
//           <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
//             <h3 className="text-2xl font-bold mb-6">Today</h3>

//             <div className="space-y-4 text-gray-300">
//               <p>✓ Ship landing page redesign</p>
//               <p>✓ Review Q2 OKRs</p>
//               <p>○ API refactor</p>
//               <p>○ Reflection journal</p>
//             </div>
//           </div>
//         </div>

//         {/* BOTTOM STATS */}
//         <div className="grid md:grid-cols-3 gap-6 mt-6">
//           {[
//             ["Deep Hours / Week", `${totalMinutes} min`],
//             ["Sessions Completed", totalSessions],
//             ["Subjects", subjects.length],
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="rounded-3xl border border-white/10 bg-white/5 p-8"
//             >
//               <p className="text-gray-400">{item[0]}</p>
//               <h3 className="text-4xl font-black mt-3">{item[1]}</h3>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   )
// }


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

  return (
    <div className="min-h-screen text-white flex relative overflow-hidden">
      <Background />

      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/10 bg-black/20 backdrop-blur-xl p-5 hidden lg:block relative z-10">
        <h1 className="text-xl font-bold mb-10">Focus & Achieve</h1>

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
            Good morning, {user?.name || "Aria"}
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