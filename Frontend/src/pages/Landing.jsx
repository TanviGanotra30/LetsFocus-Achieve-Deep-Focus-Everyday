// import { Link } from "react-router-dom"
// import videoSrc from "../assets/focus-bg.mp4"

// export default function Landing() {

//   return (

//     <div className="min-h-screen bg-gray-950 text-white overflow-hidden">

//       {/* NAVBAR */}

//       <nav className="flex justify-between items-center px-12 py-6 absolute w-full z-20">

//         <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
//           LetsFocus
//         </h1>

//         <div className="space-x-4">

//           <Link
//             to="/login"
//             className="px-6 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
//           >
//             Login
//           </Link>

//           <Link
//             to="/signup"
//             className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
//           >
//             Get Started
//           </Link>

//         </div>

//       </nav>



//       {/* HERO */}

//       <section className="relative h-screen flex items-center justify-center text-center">

//         <video
//           autoPlay
//           loop
//           muted
//           className="absolute w-full h-full object-cover opacity-40"
//         >
//           <source src={videoSrc} type="video/mp4" />
//         </video>

//         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black"></div>

//         <div className="absolute w-[700px] h-[700px] bg-indigo-500 blur-[180px] opacity-30 animate-pulse"></div>


//         <div className="relative z-10 max-w-4xl px-6">

//           <h1 className="text-7xl font-extrabold leading-tight mb-8">

//             Achieve Deep Focus  
//             <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
//               Every Day
//             </span>

//           </h1>

//           <p className="text-xl text-gray-300 mb-12 leading-relaxed">

//             LetsFocus is your personal productivity companion.  
//             Track focus sessions, visualize study analytics, maintain streaks,
//             and generate AI-powered study plans designed to help you learn faster.

//           </p>

//           <div className="flex justify-center gap-6">

//             <Link
//               to="/signup"
//               className="px-10 py-4 bg-indigo-600 rounded-xl text-lg hover:bg-indigo-700 hover:scale-105 transition shadow-lg"
//             >
//               Start Focusing
//             </Link>

//             <Link
//               to="/login"
//               className="px-10 py-4 border border-white/30 rounded-xl hover:bg-white/10 transition"
//             >
//               Login
//             </Link>

//           </div>

//         </div>

//       </section>



//       {/* STATS */}

//       <section className="py-20 bg-black">

//         <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 text-center">

//           <div>
//             <h2 className="text-4xl font-bold text-indigo-400">10K+</h2>
//             <p className="text-gray-400">Focus Sessions Completed</p>
//           </div>

//           <div>
//             <h2 className="text-4xl font-bold text-indigo-400">5K+</h2>
//             <p className="text-gray-400">Active Students</p>
//           </div>

//           <div>
//             <h2 className="text-4xl font-bold text-indigo-400">1M+</h2>
//             <p className="text-gray-400">Minutes Focused</p>
//           </div>

//           <div>
//             <h2 className="text-4xl font-bold text-indigo-400">95%</h2>
//             <p className="text-gray-400">Productivity Increase</p>
//           </div>

//         </div>

//       </section>



//       {/* FEATURES */}

//       <section className="py-32 px-16">

//         <h2 className="text-5xl font-bold text-center mb-20">
//           Powerful Tools For Deep Work
//         </h2>

//         <div className="grid md:grid-cols-3 gap-12">

//           <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-2xl hover:scale-105 transition">

//             <h3 className="text-2xl font-semibold mb-4">
//                Smart Focus Timer
//             </h3>

//             <p className="text-gray-400 text-lg">

//               Enter deep work mode with a distraction-free timer
//               built to maximize productivity.

//             </p>

//           </div>


//           <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-2xl hover:scale-105 transition">

//             <h3 className="text-2xl font-semibold mb-4">
//               📊 Productivity Analytics
//             </h3>

//             <p className="text-gray-400 text-lg">

//               Track study streaks, visualize focus time,
//               and discover your productivity patterns.

//             </p>

//           </div>


//           <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-2xl hover:scale-105 transition">

//             <h3 className="text-2xl font-semibold mb-4">
//                AI Study Planner
//             </h3>

//             <p className="text-gray-400 text-lg">

//               Generate smart AI-powered study schedules
//               tailored to your goals.

//             </p>

//           </div>

//         </div>

//       </section>



//       {/* WHY LETSFOCUS */}

//       <section className="py-32 bg-black text-center">

//         <h2 className="text-5xl font-bold mb-16">
//           Why Students Love LetsFocus
//         </h2>

//         <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">

//           <div>

//             <h3 className="text-2xl font-semibold mb-3">
//               Stay Consistent
//             </h3>

//             <p className="text-gray-400">

//               Maintain study streaks and build strong learning habits.

//             </p>

//           </div>


//           <div>

//             <h3 className="text-2xl font-semibold mb-3">
//               Learn Faster
//             </h3>

//             <p className="text-gray-400">

//               AI helps you create efficient study schedules.

//             </p>

//           </div>


//           <div>

//             <h3 className="text-2xl font-semibold mb-3">
//               Track Progress
//             </h3>

//             <p className="text-gray-400">

//               Visual dashboards keep you motivated every day.

//             </p>

//           </div>

//         </div>

//       </section>



//       {/* TESTIMONIAL */}

//       <section className="py-32 px-12 text-center">

//         <h2 className="text-5xl font-bold mb-16">
//           Loved By Students
//         </h2>

//         <div className="max-w-4xl mx-auto text-xl text-gray-300">

//           "LetsFocus completely transformed my study habits.
//           The focus timer and analytics helped me stay consistent
//           during my exam preparation."

//           <p className="mt-6 text-indigo-400">
//             — Computer Science Student
//           </p>

//         </div>

//       </section>



//       {/* CTA */}

//         <section className="py-24 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 relative overflow-hidden">

//   <div className="absolute w-[500px] h-[500px] bg-purple-500 blur-[150px] opacity-30 left-1/2 -translate-x-1/2 top-0"></div>

//   <h2 className="text-4xl font-bold mb-8 text-white">
//     Ready To Transform Your Productivity?
//   </h2>

//   <Link
//     to="/signup"
//     className="px-12 py-5 bg-white text-indigo-600 rounded-xl text-lg hover:scale-105 transition"
//   >
//     Get Started Free
//   </Link>

// </section>



//       {/* FOOTER */}

//       <footer className="text-center py-8 text-gray-500 bg-black">

//         © {new Date().getFullYear()} LetsFocus — Built for smarter studying

//       </footer>

//     </div>

//   )

// }





// import { Link } from "react-router-dom"
// import { motion } from "framer-motion"
// import Background from "../components/Background"

// export default function Landing() {
//   return (
//     <div className="min-h-screen bg-gray-950 text-white overflow-hidden relative">
//       <Background />

//       {/* NAVBAR */}
//       <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl">
//         <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between shadow-xl">
//           {/* Logo */}
//           <Link
//             to="/"
//             className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
//           >
//             LetsFocus
//           </Link>

//           {/* Nav Links */}
//           <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
//             <a href="#home" className="hover:text-white transition">
//               Home
//             </a>
//             <a href="#features" className="hover:text-white transition">
//               Features
//             </a>
//             <a href="#about" className="hover:text-white transition">
//               About
//             </a>
//             <Link to="/dashboard" className="hover:text-white transition">
//               Dashboard
//             </Link>
//           </div>

//           {/* Buttons */}
//           <div className="flex items-center gap-3">
//             <Link
//               to="/login"
//               className="hidden md:block px-5 py-2 text-sm rounded-xl hover:bg-white/10 transition"
//             >
//               Sign In
//             </Link>

//             <Link
//               to="/signup"
//               className="px-5 py-2 rounded-xl text-sm bg-gradient-to-r from-cyan-500 to-purple-500 hover:scale-105 transition"
//             >
//               Start Free
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* HERO */}
//       <section
//         id="home"
//         className="min-h-screen flex items-center justify-center text-center px-6 relative"
//       >
//         <div className="max-w-6xl relative z-10 pt-24">
//           {/* Top Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: -15 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8"
//           >
//             <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
//             New AI Productivity Coach is live
//           </motion.div>

//           {/* Heading */}
//           <motion.h1
//             initial={{ opacity: 0, y: 35 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-6xl md:text-8xl font-black leading-tight tracking-tight"
//           >
//             Enter Deep Focus.
//             <br />
//             <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
//               Achieve More.
//             </span>
//           </motion.h1>

//           {/* Paragraph */}
//           <motion.p
//             initial={{ opacity: 0, y: 25 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="max-w-3xl mx-auto text-lg md:text-2xl text-gray-400 mt-8 leading-relaxed"
//           >
//             The all-in-one focus platform that helps you reclaim your
//             attention, build habits, track progress, and finish what matters.
//           </motion.p>

//           {/* CTA */}
//           <motion.div
//             initial={{ opacity: 0, y: 25 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.35 }}
//             className="flex flex-col sm:flex-row justify-center gap-5 mt-12"
//           >
//             <Link
//               to="/signup"
//               className="px-10 py-4 rounded-2xl text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 hover:scale-105 transition shadow-xl"
//             >
//               Start Free →
//             </Link>

//             <Link
//               to="/login"
//               className="px-10 py-4 rounded-2xl text-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
//             >
//               Watch Demo
//             </Link>
//           </motion.div>
//         </div>

//         {/* Floating Card Left */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.6 }}
//           className="hidden lg:block absolute left-20 bottom-28 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 w-64 shadow-xl"
//         >
//           <p className="text-gray-400 text-sm mb-2">In session</p>
//           <h3 className="text-4xl font-bold">42:18</h3>
//         </motion.div>

//         {/* Floating Card Right */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.8 }}
//           className="hidden lg:block absolute right-20 bottom-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 w-64 shadow-xl"
//         >
//           <p className="text-gray-400 text-sm mb-2">This week</p>
//           <h3 className="text-4xl font-bold text-cyan-400">23.4h</h3>

//           <div className="flex gap-2 mt-4">
//             {[40, 55, 65, 30, 70, 50].map((h, i) => (
//               <div
//                 key={i}
//                 className="w-3 rounded-full bg-gradient-to-t from-purple-500 to-cyan-400"
//                 style={{ height: `${h}px` }}
//               />
//             ))}
//           </div>
//         </motion.div>

//         {/* Bottom Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1 }}
//           className="hidden lg:block absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-5 shadow-xl"
//         >
//           <p className="text-cyan-400 font-semibold">⚡ AI Coach</p>
//           <p className="text-sm text-gray-300 mt-1">
//             You focus best right now. Want to begin a 45 min session?
//           </p>
//         </motion.div>
//       </section>
//     </div>
//   )
// }


// import { Link } from "react-router-dom"
// import { motion } from "framer-motion"
// import Background from "../components/Background"

// export default function Landing() {
//   return (
//     <div className="min-h-screen text-white overflow-hidden relative">
//       <Background />

//       {/* NAVBAR */}
//       <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl">
//         <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between shadow-2xl">
//           <Link
//             to="/"
//             className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
//           >
//             LetsFocus
//           </Link>

//           <div className="hidden md:flex gap-8 text-sm text-gray-300">
//             <a href="#home" className="hover:text-white transition">Home</a>
//             <a href="#features" className="hover:text-white transition">Features</a>
//             <a href="#about" className="hover:text-white transition">About</a>
//             <Link to="/dashboard" className="hover:text-white transition">
//               Dashboard
//             </Link>
//           </div>

//           <div className="flex gap-3">
//             <Link
//               to="/login"
//               className="hidden md:block px-5 py-2 rounded-xl hover:bg-white/10 transition"
//             >
//               Sign In
//             </Link>

//             <Link
//               to="/signup"
//               className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:scale-105 transition"
//             >
//               Start Free
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* HERO */}
//       <section
//         id="home"
//         className="min-h-screen flex items-center justify-center text-center px-6 relative pt-10"
//       >
//         <div className="max-w-6xl relative z-10">
//           {/* Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: -15 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8"
//           >
//             <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
//             New AI Productivity Coach is live
//           </motion.div>

//           {/* Heading */}
//           <motion.h1
//             initial={{ opacity: 0, y: 35 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-6xl md:text-8xl font-black leading-tight tracking-tight"
//           >
//             Enter Deep Focus.
//             <br />
//             <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
//               Achieve More.
//             </span>
//           </motion.h1>

//           {/* Subtitle */}
//           <motion.p
//             initial={{ opacity: 0, y: 25 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="max-w-3xl mx-auto text-lg md:text-2xl text-gray-400 mt-8 leading-relaxed"
//           >
//             The all-in-one focus platform that helps you reclaim your
//             attention, build habits, track progress, and finish what matters.
//           </motion.p>

//           {/* CTA */}
//           <motion.div
//             initial={{ opacity: 0, y: 25 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.35 }}
//             className="flex flex-col sm:flex-row justify-center gap-5 mt-12"
//           >
//             <Link
//               to="/signup"
//               className="px-10 py-4 rounded-2xl text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 hover:scale-105 transition shadow-[0_0_35px_rgba(59,130,246,0.45)]"
//             >
//               Start Free →
//             </Link>

//             <Link
//               to="/login"
//               className="px-10 py-4 rounded-2xl text-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
//             >
//               Watch Demo
//             </Link>
//           </motion.div>
//         </div>

//         {/* Floating Left Card */}
//         <motion.div
//           animate={{ y: [0, -12, 0] }}
//           transition={{ repeat: Infinity, duration: 4 }}
//           className="hidden lg:block absolute left-20 bottom-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 w-64 shadow-xl"
//         >
//           <p className="text-gray-400 text-sm mb-2">In session</p>
//           <h3 className="text-4xl font-bold">42:18</h3>
//         </motion.div>

//         {/* Floating Right Card */}
//         <motion.div
//           animate={{ y: [0, -14, 0] }}
//           transition={{ repeat: Infinity, duration: 5 }}
//           className="hidden lg:block absolute right-20 bottom-28 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 w-64 shadow-xl"
//         >
//           <p className="text-gray-400 text-sm mb-2">This week</p>
//           <h3 className="text-4xl font-bold text-cyan-400">23.4h</h3>

//           <div className="flex gap-2 mt-4">
//             {[40, 55, 65, 30, 70, 50].map((h, i) => (
//               <div
//                 key={i}
//                 className="w-3 rounded-full bg-gradient-to-t from-purple-500 to-cyan-400"
//                 style={{ height: `${h}px` }}
//               />
//             ))}
//           </div>
//         </motion.div>

//         {/* Bottom AI Coach */}
//         <motion.div
//           animate={{ y: [0, -10, 0] }}
//           transition={{ repeat: Infinity, duration: 4.5 }}
//           className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-5 shadow-xl"
//         >
//           <p className="text-cyan-400 font-semibold">⚡ AI Coach</p>
//           <p className="text-sm text-gray-300 mt-1">
//             You focus best right now. Want to begin a 45 min session?
//           </p>
//         </motion.div>
//       </section>

//       {/* SECOND SECTION */}
//       <section
//         id="features"
//         className="relative z-10 max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-8"
//       >
//         {[
//           {
//             title: "Deep Focus Timer",
//             desc: "Enter distraction-free sessions with immersive productivity mode.",
//           },
//           {
//             title: "Smart Analytics",
//             desc: "Track consistency, focus patterns, and weekly performance.",
//           },
//           {
//             title: "AI Productivity Coach",
//             desc: "Personalized guidance to keep you sharp and consistent.",
//           },
//         ].map((item, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 35 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: i * 0.1 }}
//             whileHover={{ y: -8 }}
//             className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl"
//           >
//             <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
//             <p className="text-gray-400 leading-relaxed">{item.desc}</p>
//           </motion.div>
//         ))}
//       </section>
//     </div>
//   )
// }



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
  //GitHub,
  //Twitter,
  //Linkedin,
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
            <Link to="/dashboard">Dashboard</Link>
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
              The most beautiful productivity platform built for deep work.
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