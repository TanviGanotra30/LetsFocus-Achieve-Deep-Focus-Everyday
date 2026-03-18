import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { getSessions, getStudyStreak } from "../services/api"
import ContributionHeatmap from "../components/ContributionHeatmap"
import { motion } from "framer-motion"

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

  const subjects = [...new Set(sessions.map(s => s.subject))]

  // ✅ WEEK DATA FIXED
const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

const weeklyData = weekDays.map((day, index) => {

  const total = sessions
    .filter(session => {
      const date = new Date(session.createdAt || session.date)
      return date.getDay() === index   // 🔥 FIXED
    })
    .reduce((sum, session) => sum + session.duration, 0)

  return total
})
  

  const maxVal = Math.max(...weeklyData, 60) // safe fallback
const bestDayIndex = weeklyData.indexOf(maxVal)

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-200"
    >

      {/* Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-purple-300 blur-[150px] opacity-40 top-10 left-10"></div>
      <div className="absolute w-[500px] h-[500px] bg-indigo-300 blur-[150px] opacity-40 bottom-10 right-10"></div>

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-extrabold text-gray-800 mb-3">
            Welcome back, {user?.name} 👋
          </h1>
          <p className="text-gray-500 text-lg">
            Stay consistent. Small steps daily leads to big results.
          </p>
        </motion.div>


        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">

          {[ 
            { label: "Focus Time", value: `${totalMinutes} min`, color: "indigo" },
            { label: "Sessions", value: totalSessions, color: "green" },
            { label: "Subjects", value: subjects.length, color: "purple" },
            { label: "Streak", value: ` ${streak}`, color: "orange" }
          ].map((item, i) => (

            <motion.div
              key={i}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-white/70 backdrop-blur shadow-lg"
            >

              <p className="text-gray-500 text-sm">{item.label}</p>

              <h2 className={`text-3xl font-bold mt-2 text-${item.color}-600`}>
                {item.value}
              </h2>

            </motion.div>

          ))}

        </div>


        {/* Heatmap */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-10 rounded-3xl bg-white/80 backdrop-blur shadow-xl mb-12"
        >

          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            Study Consistency
          </h2>

          <ContributionHeatmap />

        </motion.div>


        {/* Bottom */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* ✅ REAL WEEKLY CHART */}
          <motion.div
  initial={{ x: -40, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  className="p-8 rounded-2xl bg-white/80 backdrop-blur shadow-lg"
>

  <h2 className="text-xl font-semibold mb-6 text-gray-700">
    Weekly Focus
  </h2>

  <div className="flex items-end justify-between h-52 px-2">

    {weeklyData.map((val, i) => {

      const height = (val / maxVal) * 100

      return (
        <div key={i} className="flex flex-col items-center group">

          {/* 🔥 Tooltip */}
          <span className="opacity-0 group-hover:opacity-100 transition text-xs bg-black text-white px-2 py-1 rounded mb-2">
            {val} min
          </span>

          {/* 🔥 Bar */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${val === 0 ? 5 : height}%` }}
            transition={{ delay: i * 0.1, type: "spring" }}
            whileHover={{ scale: 1.1 }}
            className={`w-10 rounded-xl transition-all
              ${i === bestDayIndex
                ? "bg-gradient-to-t from-green-400 to-green-600 shadow-lg"
                : "bg-gradient-to-t from-indigo-400 to-indigo-600"
              }
            `}
          />

          {/* Day */}
          <span className="text-xs text-gray-500 mt-2">
            {weekDays[i]}
          </span>

        </div>
      )
    })}

  </div>

</motion.div>


          {/* Motivation */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg"
          >

            <h2 className="text-2xl font-semibold mb-4">
              Stay Focused 
            </h2>

            <p className="text-lg opacity-90">
              Discipline beats motivation. Even 30 mins daily
              can change everything.
            </p>

          </motion.div>

        </div>

      </div>

    </motion.div>
  )
}