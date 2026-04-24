import { useState, useEffect } from "react"
import {
  User,
  Mail,
  Calendar,
  Trophy,
  Flame,
  Clock3,
  Target,
  Pencil,
  Save,
  Camera,
} from "lucide-react"
import Sidebar from "../components/Sidebar"
import Background from "../components/Background"

export default function Profile() {
  const [editing, setEditing] = useState(false)

  const user = JSON.parse(localStorage.getItem("user")) || {}

  const [formData, setFormData] = useState({
    name: user.name || "user name",
    email: user.email || "abc@gmail.com",
    goal: "5 Hours Daily",
    bio: "Focused on becoming the best version of myself through consistency, coding, and discipline.",
  })

  const [stats, setStats] = useState({
    streak: 12,
    sessions: 48,
    hours: 96,
    tasks: 82,
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const saveProfile = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        name: formData.name,
        email: formData.email,
      })
    )
    setEditing(false)
  }

  return (
    <div className="min-h-screen flex text-white relative overflow-hidden">
      <Background />

      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 relative z-10">
        {/* TOP HEADER */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black">Profile</h1>
            <p className="text-gray-400 mt-1">
              Manage your personal growth identity.
            </p>
          </div>

          <button
            onClick={() =>
              editing ? saveProfile() : setEditing(true)
            }
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold flex items-center gap-2"
          >
            {editing ? <Save size={18} /> : <Pencil size={18} />}
            {editing ? "Save" : "Edit"}
          </button>
        </div>

        {/* PROFILE CARD */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* LEFT */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <div className="relative w-28 h-28 mx-auto">
              <div className="w-28 h-28 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-4xl font-bold">
                {formData.name?.[0]}
              </div>

              <button className="absolute bottom-0 right-0 bg-black/70 p-2 rounded-full border border-white/10">
                <Camera size={16} />
              </button>
            </div>

            <h2 className="text-2xl font-bold mt-5">{formData.name}</h2>
            <p className="text-gray-400 mt-1">{formData.email}</p>

            <div className="mt-6 p-4 rounded-2xl bg-black/20 border border-white/10">
              <p className="text-sm text-gray-400">Daily Goal</p>
              <p className="text-xl font-bold text-cyan-400 mt-1">
                {formData.goal}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-bold mb-6">Personal Info</h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-gray-400">Full Name</label>
                <input
                  disabled={!editing}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Email</label>
                <input
                  disabled={!editing}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Focus Goal</label>
                <input
                  disabled={!editing}
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="mt-2 w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Joined</label>
                <input
                  disabled
                  value="24 April 2026"
                  className="mt-2 w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm text-gray-400">Bio</label>
              <textarea
                rows="4"
                disabled={!editing}
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="mt-2 w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-3 outline-none resize-none"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}