import { useState } from "react"
import {
  Moon,
  Sun,
  Bell,
  Shield,
  User,
  Lock,
  Save,
  Trash2,
  Globe,
} from "lucide-react"
import Sidebar from "../components/Sidebar"
import Background from "../components/Background"

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [weeklyMail, setWeeklyMail] = useState(true)
  const [publicProfile, setPublicProfile] = useState(false)
  const [language, setLanguage] = useState("English")

  const Toggle = ({ enabled, onClick }) => (
    <button
      onClick={onClick}
      className={`w-14 h-8 rounded-full p-1 transition ${
        enabled
          ? "bg-gradient-to-r from-cyan-500 to-purple-500"
          : "bg-white/10"
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full bg-white transition ${
          enabled ? "translate-x-6" : ""
        }`}
      />
    </button>
  )

  const Card = ({ title, desc, icon, children }) => (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
          {icon}
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-gray-400 text-sm mt-1">{desc}</p>

          <div className="mt-5">{children}</div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex text-white relative overflow-hidden">
      <Background />
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 relative z-10">
        {/* HEADER */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black">Settings</h1>
            <p className="text-gray-400 mt-1">
              Personalize your Focus & Achieve experience.
            </p>
          </div>

          <button className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold flex items-center gap-2">
            <Save size={18} />
            Save Changes
          </button>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          {/* APPEARANCE */}
          <Card
            title="Appearance"
            desc="Customize theme and interface look."
            icon={<Moon className="text-cyan-400" />}
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Dark Mode</span>
              <Toggle
                enabled={darkMode}
                onClick={() => setDarkMode(!darkMode)}
              />
            </div>

            <div className="flex gap-3 mt-5">
              <button className="flex-1 py-3 rounded-2xl bg-white/5 border border-white/10">
                <Sun className="mx-auto mb-1" size={18} />
                Light
              </button>

              <button className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500">
                <Moon className="mx-auto mb-1" size={18} />
                Dark
              </button>
            </div>
          </Card>

          {/* NOTIFICATIONS */}
          <Card
            title="Notifications"
            desc="Control reminders and updates."
            icon={<Bell className="text-yellow-400" />}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Email Notifications</span>
                <Toggle
                  enabled={notifications}
                  onClick={() => setNotifications(!notifications)}
                />
              </div>

              <div className="flex justify-between items-center">
                <span>Weekly Progress Mail</span>
                <Toggle
                  enabled={weeklyMail}
                  onClick={() => setWeeklyMail(!weeklyMail)}
                />
              </div>
            </div>
          </Card>

          {/* ACCOUNT */}
          <Card
            title="Account"
            desc="Manage your profile details."
            icon={<User className="text-purple-400" />}
          >
            <div className="space-y-4">
              <input
                placeholder="Full Name"
                defaultValue="Tanvi Ganotra"
                className="w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-3 outline-none"
              />

              <input
                placeholder="Email"
                defaultValue="tanvi@email.com"
                className="w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-3 outline-none"
              />
            </div>
          </Card>

          {/* PRIVACY */}
          <Card
            title="Privacy"
            desc="Security and visibility settings."
            icon={<Shield className="text-green-400" />}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Public Profile</span>
                <Toggle
                  enabled={publicProfile}
                  onClick={() => setPublicProfile(!publicProfile)}
                />
              </div>

              <button className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 flex justify-center gap-2">
                <Lock size={18} />
                Change Password
              </button>
            </div>
          </Card>

          {/* LANGUAGE */}
          <Card
            title="Language"
            desc="Choose your preferred language."
            icon={<Globe className="text-cyan-400" />}
          >
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-3 outline-none"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Punjabi</option>
              <option>French</option>
            </select>
          </Card>

          {/* DANGER */}
          <Card
            title="Danger Zone"
            desc="Permanent actions."
            icon={<Trash2 className="text-red-400" />}
          >
            <button className="w-full py-3 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-300 font-semibold">
              Delete Account
            </button>
          </Card>
        </div>
      </main>
    </div>
  )
}