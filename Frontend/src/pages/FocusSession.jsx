import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Timer from "../components/Timer"
import { getSessions } from "../services/api"
import { motion } from "framer-motion"

export default function FocusSession() {

  const [subject, setSubject] = useState("")
  const [sessions, setSessions] = useState([])

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {

    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await getSessions(token)
        setSessions(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchSessions()

  }, [])

  const totalMinutes = sessions.reduce(
    (sum, session) => sum + session.duration,
    0
  )

  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  const formatDate = (date) => {
  const d = new Date(date)

  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  if (d.toDateString() === today.toDateString()) return "Today"
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday"

  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })
}

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-200">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* HEADER */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-800">
            Focus Mode 
          </h1>
          <p className="text-gray-500">
            Deep work starts here. Stay consistent.
          </p>
        </motion.div>


        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT - TIMER */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="p-8 rounded-3xl bg-white/80 backdrop-blur shadow-xl flex flex-col items-center"
          >

            {/* Subject Input */}
            <input
              type="text"
              placeholder="What are you studying?"
              value={subject}
              onChange={(e)=>setSubject(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full mb-6 focus:outline-none focus:border-indigo-500"
            />

            {/* Active Subject */}
            {subject && (
              <span className="mb-4 px-4 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                {subject}
              </span>
            )}

            {/* TIMER */}
            <Timer subject={subject} />

          </motion.div>



          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-6">

            {/* TODAY STATS */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-6 rounded-2xl bg-white/80 backdrop-blur shadow-lg"
            >

              <h2 className="text-lg font-semibold text-gray-600 mb-2">
                Today's Focus
              </h2>

              <p className="text-3xl font-bold text-indigo-600">
                {hours}h {minutes}m
              </p>

              <p className="text-sm text-gray-400 mt-2">
                Keep going, you're doing great
              </p>

            </motion.div>



            {/* RECENT SESSIONS */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-6 rounded-2xl bg-white/80 backdrop-blur shadow-lg"
            >

              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Recent Sessions
              </h2>

              <div className="space-y-3 max-h-60 overflow-y-auto">

                {sessions.length === 0 && (
                  <p className="text-gray-400 text-sm">
                    No sessions yet. Start focusing!
                  </p>
                )}

                {sessions.slice(0,5).map((session) => (

                  <div
                    key={session._id}
                    className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 transition"
                  >

                    <div>
                      <p className="font-medium text-gray-700">
                        {session.subject || "General"}
                      </p>
                      <p className="text-xs text-gray-400">
  {formatDate(session.createdAt || session.date)}
</p>
                    </div>

                    <span className="text-indigo-600 font-semibold">
                      {session.duration} min
                    </span>

                  </div>

                ))}

              </div>

            </motion.div>

          </div>

        </div>

      </div>

    </div>

  )
}