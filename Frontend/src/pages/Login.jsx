// import { Link } from "react-router-dom"
// import { useState } from "react"
// import axios from "axios"
// import { useNavigate } from "react-router-dom"

// export default function Login() {

//   const navigate = useNavigate()
//   const API = import.meta.env.VITE_API_URL;
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const handleLogin = async (e) => {
//     e.preventDefault()

//     try {

//       const res = await axios.post(
//         `${API}/api/auth/login`,
//         { email, password }
//       )

//       localStorage.setItem("token", res.data.token)
//       localStorage.setItem("user", JSON.stringify(res.data.user))

//       navigate("/dashboard")

//     } catch (err) {

//       alert("Login failed")

//     }
//   }

//   return (

//     <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white relative overflow-hidden">


//       {/* Background Glow */}

//       <div className="absolute w-[500px] h-[500px] bg-indigo-500 blur-[150px] opacity-30 top-10 left-10"></div>
//       <div className="absolute w-[500px] h-[500px] bg-purple-500 blur-[150px] opacity-30 bottom-10 right-10"></div>



//       {/* Login Card */}

//       <form
//         onSubmit={handleLogin}
//         className="relative z-10 bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-2xl shadow-xl w-[420px]"
//       >

//         <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
//           LetsFocus
//         </h1>

//         <p className="text-center text-gray-400 mb-8">
//           Welcome back! Continue your focus journey.
//         </p>



//         <input
//           type="email"
//           placeholder="Email"
//           className="bg-black/40 border border-white/10 p-3 rounded-lg w-full mb-4 focus:outline-none focus:border-indigo-500"
//           onChange={(e)=>setEmail(e.target.value)}
//         />


//         <input
//           type="password"
//           placeholder="Password"
//           className="bg-black/40 border border-white/10 p-3 rounded-lg w-full mb-6 focus:outline-none focus:border-indigo-500"
//           onChange={(e)=>setPassword(e.target.value)}
//         />


//         <button
//           type="submit"
//           className="bg-indigo-600 hover:bg-indigo-700 transition py-3 rounded-lg w-full text-lg font-semibold cursor-pointer"
//         >
//           Login
//         </button>


//         <p className="text-center mt-6 text-gray-400">

//           Don't have an account?{" "}

//           <Link
//             to="/signup"
//             className="text-indigo-400 font-semibold hover:underline"
//           >
//             Sign Up
//           </Link>

//         </p>

//       </form>

//     </div>

//   )

// }


import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"

export default function Login() {
  const navigate = useNavigate()
  const API = import.meta.env.VITE_API_URL

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password,
      })

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))

      navigate("/dashboard")
    } catch (err) {
      alert("Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gray-950 text-white relative overflow-hidden">
      
      {/* Glow Background - Shared across both sides */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-500 blur-[150px] opacity-25 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-500 blur-[150px] opacity-25 bottom-10 right-10 animate-pulse"></div>
      
      {/* LEFT SIDE */}
      <div className="hidden md:flex relative flex-col justify-between p-12 overflow-hidden">

        {/* Logo */}
        <Link
          to="/"
          className="relative z-10 text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
        >
          LetsFocus
        </Link>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 max-w-xl"
        >
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            "Where attention goes,
            <br />
            energy flows."
          </h1>

          <p className="mt-4 text-xl text-indigo-400 font-semibold">
            This is where yours begins.
          </p>

          <p className="mt-6 text-sm text-gray-400">
            — Trusted by thousands building focus habits daily.
          </p>
        </motion.div>

        <p className="relative z-10 text-xs text-gray-500">
          © {new Date().getFullYear()} LetsFocus
        </p>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="relative flex items-center justify-center p-6 md:p-12">

        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl"
        >
          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-4">
            <Link
              to="/"
              className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            >
              LetsFocus
            </Link>
          </div>

          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-2 mb-8">
            Sign in to continue your focus streak.
          </p>

          {/* Email */}
          <label className="text-sm text-gray-400 block mb-2">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-3 rounded-xl mb-5 focus:outline-none focus:border-indigo-500 focus:bg-white/5 transition"
          />

          {/* Password */}
          <label className="text-sm text-gray-400 block mb-2">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-3 rounded-xl mb-6 focus:outline-none focus:border-indigo-500 focus:bg-white/5 transition"
          />

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 shadow-lg shadow-indigo-500/20 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>

          {/* Signup */}
          <p className="text-center mt-6 text-gray-400 text-sm">
            New here?{" "}
            <Link
              to="/signup"
              className="text-indigo-400 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  )
}