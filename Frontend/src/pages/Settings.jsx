import { useState } from "react"
import Navbar from "../components/Navbar"
import { motion } from "framer-motion"

export default function Settings() {

  const userData = JSON.parse(localStorage.getItem("user"))

  const [name, setName] = useState(userData?.name || "")
  const [email, setEmail] = useState(userData?.email || "")
  const [focusTime, setFocusTime] = useState(25)
  const [goal, setGoal] = useState(120)
  const [darkMode, setDarkMode] = useState(false)

  const handleSave = () => {

    const updatedUser = { ...userData, name, email }

    localStorage.setItem("user", JSON.stringify(updatedUser))

    alert("Settings saved!")

  }

  const initial = name ? name.charAt(0).toUpperCase() : "U"

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-200">

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* HEADER */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-800">
            Settings
          </h1>
          <p className="text-gray-500">
            Customize your experience
          </p>
        </motion.div>


        {/* PROFILE CARD */}
        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur shadow-lg mb-8">

          <h2 className="text-lg font-semibold text-gray-700 mb-6">
            Profile
          </h2>

          <div className="flex items-center gap-6 mb-6">

            {/* Avatar */}
            <div className="w-16 h-16 flex items-center justify-center rounded-full 
              bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xl font-bold">
              {initial}
            </div>

            <div>
              <p className="font-semibold text-gray-700">{name}</p>
              <p className="text-sm text-gray-400">{email}</p>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Name"
            />

            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Email"
            />

          </div>

        </div>


        {/* PREFERENCES */}
        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur shadow-lg mb-8">

          <h2 className="text-lg font-semibold text-gray-700 mb-6">
            Preferences
          </h2>

          <div className="space-y-6">

            {/* Focus Time */}
            <div className="flex justify-between items-center">

              <div>
                <p className="font-medium text-gray-700">
                  Default Focus Time
                </p>
                <p className="text-sm text-gray-400">
                  Set your default session duration
                </p>
              </div>

              <input
                type="number"
                value={focusTime}
                onChange={(e)=>setFocusTime(e.target.value)}
                className="w-24 p-2 rounded-lg border text-center"
              />

            </div>


            {/* Goal */}
            <div className="flex justify-between items-center">

              <div>
                <p className="font-medium text-gray-700">
                  Daily Goal
                </p>
                <p className="text-sm text-gray-400">
                  Target minutes per day
                </p>
              </div>

              <input
                type="number"
                value={goal}
                onChange={(e)=>setGoal(e.target.value)}
                className="w-24 p-2 rounded-lg border text-center"
              />

            </div>


            {/* Dark Mode Toggle */}
            <div className="flex justify-between items-center">

              <div>
                <p className="font-medium text-gray-700">
                  Dark Mode
                </p>
                <p className="text-sm text-gray-400">
                  Switch to dark theme
                </p>
              </div>

              <button
                onClick={()=>setDarkMode(!darkMode)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition
                  ${darkMode ? "bg-indigo-600" : "bg-gray-300"}
                `}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow transform transition
                  ${darkMode ? "translate-x-6" : ""}
                `}/>
              </button>

            </div>

          </div>

        </div>


        {/* SAVE BUTTON */}
        <div className="flex justify-end">

          <button
            onClick={handleSave}
            className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-md"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>

  )
}