import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const navigate = useNavigate()
  const API = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    try {

      const res = await axios.post(
        `${API}/api/auth/login`,
        { email, password }
      )

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))

      navigate("/dashboard")

    } catch (err) {

      alert("Login failed")

    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white relative overflow-hidden">


      {/* Background Glow */}

      <div className="absolute w-[500px] h-[500px] bg-indigo-500 blur-[150px] opacity-30 top-10 left-10"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-500 blur-[150px] opacity-30 bottom-10 right-10"></div>



      {/* Login Card */}

      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-2xl shadow-xl w-[420px]"
      >

        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          LetsFocus
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Welcome back! Continue your focus journey.
        </p>



        <input
          type="email"
          placeholder="Email"
          className="bg-black/40 border border-white/10 p-3 rounded-lg w-full mb-4 focus:outline-none focus:border-indigo-500"
          onChange={(e)=>setEmail(e.target.value)}
        />


        <input
          type="password"
          placeholder="Password"
          className="bg-black/40 border border-white/10 p-3 rounded-lg w-full mb-6 focus:outline-none focus:border-indigo-500"
          onChange={(e)=>setPassword(e.target.value)}
        />


        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 transition py-3 rounded-lg w-full text-lg font-semibold cursor-pointer"
        >
          Login
        </button>


        <p className="text-center mt-6 text-gray-400">

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="text-indigo-400 font-semibold hover:underline"
          >
            Sign Up
          </Link>

        </p>

      </form>

    </div>

  )

}