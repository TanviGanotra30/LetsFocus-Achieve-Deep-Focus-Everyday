// import { Link } from "react-router-dom"
// import { useState } from "react"
// import axios from "axios"
// import { useNavigate } from "react-router-dom"

// export default function Signup() {

//   const navigate = useNavigate()
//   const API = import.meta.env.VITE_API_URL;
//   const [name,setName] = useState("")
//   const [email,setEmail] = useState("")
//   const [password,setPassword] = useState("")

//   const handleSignup = async (e) => {

//     e.preventDefault()

//     try {

//       await axios.post(
//         `${API}/api/auth/signup`,
//         { name,email,password }
//       )

//       navigate("/login")

//     } catch (err) {

//       alert("Signup failed")

//     }

//   }

//   return (

//     <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white relative overflow-hidden">


//       {/* Glow Background */}

//       <div className="absolute w-[500px] h-[500px] bg-indigo-500 blur-[150px] opacity-30 top-10 left-10"></div>
//       <div className="absolute w-[500px] h-[500px] bg-purple-500 blur-[150px] opacity-30 bottom-10 right-10"></div>



//       {/* Signup Card */}

//       <form
//         onSubmit={handleSignup}
//         className="relative z-10 bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-2xl shadow-xl w-[420px]"
//       >

//         <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
//           LetsFocus
//         </h1>

//         <p className="text-center text-gray-400 mb-8">
//           Create your account and start focusing today.
//         </p>



//         <input
//           type="text"
//           placeholder="Full Name"
//           className="bg-black/40 border border-white/10 p-3 rounded-lg w-full mb-4 focus:outline-none focus:border-indigo-500"
//           onChange={(e)=>setName(e.target.value)}
//         />

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
//           Create Account
//         </button>



//         <p className="text-center mt-6 text-gray-400">

//           Already have an account?{" "}

//           <Link
//             to="/login"
//             className="text-indigo-400 font-semibold hover:underline"
//           >
//             Login
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

export default function Signup() {
  const navigate = useNavigate()
  const API = import.meta.env.VITE_API_URL

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post(`${API}/api/auth/signup`, {
        name,
        email,
        password,
      })

      navigate("/login")
    } catch (err) {
      alert("Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gray-950 text-white relative overflow-hidden">
      
      {/* Glow Background - Shared across both sides */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-500 blur-[150px] opacity-25 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-500 blur-[150px] opacity-25 bottom-10 right-10 animate-pulse"></div>
      
      {/* LEFT SIDE CONTENT */}
      <div className="hidden md:flex relative flex-col justify-between p-12 overflow-hidden">

        {/* Logo */}
        <Link to="/" className="relative z-10 text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          LetsFocus
        </Link>

        {/* Main Text */}
        <div className="relative z-10 max-w-md">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold leading-tight"
          >
            Start your <span className="text-indigo-400">deep focus</span> journey.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-gray-400 mt-6 text-lg leading-relaxed"
          >
            Join thousands of productive minds building habits, crushing goals,
            and mastering consistency every day.
          </motion.p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            {[
              { value: "180K+", label: "Users" },
              { value: "2.4x", label: "Focus Gain" },
              { value: "4.9★", label: "Rating" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.1 }}
                className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-4 text-center"
              >
                <p className="text-2xl font-bold text-indigo-400">
                  {item.value}
                </p>
                <p className="text-xs text-gray-400 mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-gray-500">
          © {new Date().getFullYear()} LetsFocus
        </p>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="relative flex items-center justify-center p-6 md:p-12">

        <motion.form
          onSubmit={handleSignup}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10"
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

          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="text-gray-400 text-sm mt-2 mb-8">
            Start focusing today and unlock your best self.
          </p>

          {/* Name */}
          <label className="text-sm text-gray-400 block mb-2">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-3 rounded-xl mb-5 focus:outline-none focus:border-indigo-500 transition"
          />

          {/* Email */}
          <label className="text-sm text-gray-400 block mb-2">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-3 rounded-xl mb-5 focus:outline-none focus:border-indigo-500 transition"
          />

          {/* Password */}
          <label className="text-sm text-gray-400 block mb-2">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-3 rounded-xl mb-6 focus:outline-none focus:border-indigo-500 transition"
          />

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 shadow-lg shadow-indigo-500/20 disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </motion.button>

          {/* Login */}
          <p className="text-center mt-6 text-gray-400 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-400 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  )
}