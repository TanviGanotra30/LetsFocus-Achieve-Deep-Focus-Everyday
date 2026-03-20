import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { getWeeklyStats } from "../services/api"
import { motion } from "framer-motion"

import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell
} from "recharts"

export default function Analytics() {

  const [data, setData] = useState([])
  const [activeTab, setActiveTab] = useState("trend")
  const [weeklyData, setWeeklyData] = useState([])


  const user = JSON.parse(localStorage.getItem("user"))

  // useEffect(() => {
  //   fetchStats()
  // }, [])

  // const fetchStats = async () => {
  //   try {
  //     const res = await getWeeklyStats()
  //     setData(res.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  useEffect(() => {
  const fetchWeekly = async () => {
    try {
      const res = await getWeeklyStats()
      console.log("WEEKLY DATA:", res.data) // 🔥 IMPORTANT
      setWeeklyData(res.data)
    } catch (err) {
      console.error("WEEKLY ERROR:", err)
    }
  }

  fetchWeekly()
}, [])

  // 📊 Stats
  const total = data.reduce((sum, d) => sum + d.minutes, 0)
  const avg = data.length ? Math.round(total / data.length) : 0

  const bestDay = data.length
  ? data.reduce((max, d) => d.minutes > max.minutes ? d : max, data[0])
  : {}

const worstDay = data.length
  ? data.reduce((min, d) => d.minutes < min.minutes ? d : min, data[0])
  : {}

  // 🎯 Subject-wise fake grouping (can later connect backend)
  const subjectData = [
    { name: "DSA", value: 120 },
    { name: "OS", value: 80 },
    { name: "DBMS", value: 60 },
  ]

  const COLORS = ["#6366F1", "#8B5CF6", "#22C55E"]

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-200">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* HEADER */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>

          <h1 className="text-4xl font-bold text-gray-800">
            Analytics 
          </h1>

          <p className="text-gray-500">
            Understand your productivity deeply
          </p>

        </motion.div>


        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">

          {[ 
            { label: "Total", value: `${total} min`, color: "indigo" },
            { label: "Avg", value: `${avg} min`, color: "purple" },
            { label: "Best", value: bestDay.day || "-", color: "green" },
            { label: "Weakest", value: worstDay?.day || "-", color: "red" }
          ].map((item, i) => (

            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/80 backdrop-blur shadow-lg"
            >

              <p className="text-gray-500 text-sm">{item.label}</p>
              <h2 className={`text-2xl font-bold text-${item.color}-600`}>
                {item.value}
              </h2>

            </motion.div>

          ))}

        </div>


        {/* TABS */}
        <div className="flex gap-4 mt-10 mb-6">

          {["trend", "weekly", "subjects"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full ${
                activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}

        </div>


        {/* CHART AREA */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-8 rounded-3xl bg-white/80 backdrop-blur shadow-xl"
        >


                    {/* TREND LINE */}
          {activeTab === "trend" && (

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="minutes"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>

          )}

          {/* WEEKLY BAR */}
          {activeTab === "weekly" && (

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="minutes" fill="#6366F1" radius={[10,10,0,0]} />
              </BarChart>
            </ResponsiveContainer>

          )}


          {/* SUBJECT PIE */}
          {activeTab === "subjects" && (

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subjectData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  {subjectData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

          )}

        </motion.div>


        {/* INSIGHTS */}
         <div className="mt-10 grid md:grid-cols-2 gap-6">

           <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg">

             <h2 className="text-xl font-semibold mb-2">
               Productivity Insight
             </h2>

             <p className="text-sm opacity-90">
               {total < 100
                ? "You're just getting started. Stay consistent!"
                : total < 300
                ? "Good progress! Try increasing focus duration."
                : "Amazing consistency! Keep it up "}
            </p>

          </div>


          <div className="p-6 rounded-2xl bg-white/80 backdrop-blur shadow-lg">

            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              Tips & Tricks
            </h2>

            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Study at the same time daily</li>
              <li>• Use 25–50 min sessions</li>
              <li>• Avoid distractions during focus time</li>
              <li>• Track progress consistently</li>
            </ul>

          </div>

        </div>

      </div>

    </div>

  )
}