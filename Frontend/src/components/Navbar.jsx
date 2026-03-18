import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {

  const navigate = useNavigate()
  const location = useLocation()

  const [open, setOpen] = useState(false)
  const dropdownRef = useRef()

  const storedUser = localStorage.getItem("user")
  const user = storedUser ? JSON.parse(storedUser) : null

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U"

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const linkStyle = (path) =>
    `px-3 py-1 rounded-lg transition ${
      location.pathname === path
        ? "bg-indigo-100 text-indigo-600 font-semibold"
        : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
    }`

  return (

    <div className="sticky top-4 z-50 px-6">

      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-4 
        bg-white/70 backdrop-blur-xl border border-gray-200 
        rounded-2xl shadow-md">

        {/* LEFT */}
        <div className="flex items-center gap-8">

          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            LetsFocus
          </h1>

          <div className="flex gap-4">

            <Link to="/dashboard" className={linkStyle("/dashboard")}>
              Dashboard
            </Link>

            <Link to="/focus" className={linkStyle("/focus")}>
              Focus
            </Link>

            <Link to="/analytics" className={linkStyle("/analytics")}>
              Analytics
            </Link>

          </div>

        </div>


        {/* RIGHT */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>

          <p className="text-gray-600 hidden md:block">
            Hi, <span className="font-semibold">{user?.name}</span>
          </p>

          {/* Avatar */}
          <div
            onClick={() => setOpen(!open)}
            className="w-10 h-10 flex items-center justify-center rounded-full 
            bg-gradient-to-br from-indigo-500 to-purple-500 
            text-white font-bold cursor-pointer hover:scale-105 transition"
          >
            {initial}
          </div>


          {/* DROPDOWN (RIGHT SIDE PERFECT) */}
          <AnimatePresence>
            {open && (

              <motion.div
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 20, y: 10 }}
                className="absolute right-0 top-14 w-56 
                bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
              >

                <div className="px-4 py-3 border-b">
                  <p className="font-semibold text-gray-700">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>

                <button
                  onClick={() => navigate("/settings")}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 transition"
                >
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-500 transition"
                >
                  Logout
                </button>

              </motion.div>

            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  )
}