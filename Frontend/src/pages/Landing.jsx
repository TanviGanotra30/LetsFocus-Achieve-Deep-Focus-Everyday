import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Timer,
  BarChart3,
  KanbanSquare,
  Bot,
  Music,
  Flame,
  Target,
  Brain,
  Sparkles,
  ArrowRight,
  Play,
} from "lucide-react"
import Background from "../components/Background"

export default function Landing() {
  const features = [
    {
      icon: Timer,
      title: "Deep Focus Timer",
      desc: "Pomodoro, deep work blocks, and ambient soundscapes engineered for flow.",
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      desc: "See where your hours go with insights that actually change behavior.",
    },
    {
      icon: KanbanSquare,
      title: "Task Management",
      desc: "Beautiful kanban boards. Capture, prioritize, and ship every day.",
    },
    {
      icon: Bot,
      title: "AI Productivity Coach",
      desc: "A coach in your pocket — plans your day and unblocks you in real time.",
    },
    {
      icon: Music,
      title: "Focus Music",
      desc: "Curated soundscapes — rain, lo-fi, binaural, deep space.",
    },
    {
      icon: Flame,
      title: "Streak System",
      desc: "Build momentum with streaks that celebrate consistency.",
    },
    {
      icon: Target,
      title: "Habit Builder",
      desc: "Tiny daily systems that compound into powerful routines.",
    },
    {
      icon: Brain,
      title: "Mindful Mode",
      desc: "Breathwork breaks and intention-setting into workflow.",
    },
  ]

  const steps = [
    {
      no: "01",
      title: "Set your intention",
      desc: "Choose what matters today. Protect time for it.",
    },
    {
      no: "02",
      title: "Enter deep focus",
      desc: "Silence the noise. Timer, music and AI take over.",
    },
    {
      no: "03",
      title: "Achieve & reflect",
      desc: "Track wins, build streaks, improve weekly.",
    },
  ]

  return (
    <div className=" text-white overflow-hidden relative">
      <Background />

      {/* NAVBAR */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
              <Sparkles size={15} />
            </div>
            <span className="font-bold">LetsFocus</span>
          </Link>

          <div className="hidden md:flex gap-8 text-sm text-gray-300">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
          </div>

          <div className="flex gap-3 items-center">
            <Link to="/login" className="text-sm hidden md:block">
              Sign in
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 rounded-xl text-sm bg-gradient-to-r from-cyan-500 to-purple-500"
            >
              Start free
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-6 pt-1 relative"
      >
        <div className="max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex mb-6 items-center gap-2 rounded-full px-4 py-2 border border-white/10 bg-white/5 text-sm text-gray-300"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            New • AI Productivity Coach is live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black leading-none"
          >
            Achieve Deep Focus.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              EveryDay.
            </span>
          </motion.h1>

          <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mt-8 leading-relaxed">
            The all-in-one focus platform that helps you reclaim your
            attention, build powerful habits, and finish what matters most.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 rounded-2xl font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_35px_rgba(99,102,241,0.35)] flex items-center justify-center gap-2"
            >
              Start free <ArrowRight size={18} />
            </Link>

            <button className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center gap-2">
              <Play size={16} />
              Watch demo
            </button>
          </div>
        </div>
        

        {/* Floating Cards */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="hidden xl:block absolute left-20 bottom-40 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 w-56"
        >
          <p className="text-gray-400 text-sm">In session</p>
          <h3 className="text-4xl font-bold mt-2">42:18</h3>
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="hidden xl:block absolute right-20 bottom-36 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 w-56"
        >
          <p className="text-gray-400 text-sm">This week</p>
          <h3 className="text-4xl font-bold text-cyan-400 mt-2">23.4h</h3>

          <div className="flex gap-2 mt-4">
            {[40, 55, 70, 35, 62, 48].map((h, i) => (
              <div
                key={i}
                className="w-3 rounded-full bg-gradient-to-t from-purple-500 to-cyan-400"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4.5 }}
          className="hidden xl:block absolute bottom-3 left-1/2 -translate-x-1/2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 w-80"
        >
          <p className="text-cyan-400 font-semibold">AI Coach</p>
          <p className="text-sm text-gray-300 mt-2">
            You focus best between 9–11am. I've blocked your calendar and
            queued your top 3 tasks.
          </p>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-5xl font-black text-center">
          One platform.
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Total focus.
          </span>
        </h2>

        <div className="grid md:grid-cols-4 gap-5 mt-16">
          {features.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
              >
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mb-5">
                  <Icon size={18} />
                </div>

                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-5xl font-black text-center mb-16">
          How it{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            works
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((item, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                {item.no}
              </div>

              <h3 className="text-2xl font-bold mt-6">{item.title}</h3>
              <p className="text-gray-400 mt-4">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        id="pricing"
        className="max-w-5xl mx-auto px-6 py-24"
      >
        <div className="rounded-[32px] bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border border-white/10 p-14 text-center">
          <h2 className="text-5xl md:text-6xl font-black leading-tight">
            Your best work
            <br />
            is one focus session away.
          </h2>

          <p className="text-gray-400 mt-6 text-lg">
            Join 180,000+ people who reclaimed their attention.
          </p>

          <Link
            to="/signup"
            className="inline-flex items-center gap-2 mt-10 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold"
          >
            Start free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="about"
        className="max-w-6xl mx-auto px-6 py-16 border-t border-white/10"
      >
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                <Sparkles size={14} />
              </div>
              <span className="font-bold">LetsFocus</span>
            </div>

            <p className="text-gray-400 mt-5 leading-relaxed">
              The most beautiful productivity platform built for deep work and focus.
            </p>

            <div className="flex gap-3 mt-6">
              {/* {[Twitter].map((Icon, i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center"
                >
                  <Icon size={16} />
                </div>
              ))*/}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-5">Product</h4>
            <div className="space-y-3 text-gray-400">
              <p>Features</p>
              <p>Pricing</p>
              <p>Dashboard</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-5">Company</h4>
            <div className="space-y-3 text-gray-400">
              <p>About</p>
              <p>Blog</p>
              <p>Contact</p>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-16">
          © 2026 Focus & Achieve. Designed for deep work.
        </p>
      </footer>
    </div>
  )
}