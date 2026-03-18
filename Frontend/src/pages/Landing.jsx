import { Link } from "react-router-dom"
import videoSrc from "../assets/focus-bg.mp4"

export default function Landing() {

  return (

    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">

      {/* NAVBAR */}

      <nav className="flex justify-between items-center px-12 py-6 absolute w-full z-20">

        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          LetsFocus
        </h1>

        <div className="space-x-4">

          <Link
            to="/login"
            className="px-6 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>

        </div>

      </nav>



      {/* HERO */}

      <section className="relative h-screen flex items-center justify-center text-center">

        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover opacity-40"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black"></div>

        <div className="absolute w-[700px] h-[700px] bg-indigo-500 blur-[180px] opacity-30 animate-pulse"></div>


        <div className="relative z-10 max-w-4xl px-6">

          <h1 className="text-7xl font-extrabold leading-tight mb-8">

            Achieve Deep Focus  
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Every Day
            </span>

          </h1>

          <p className="text-xl text-gray-300 mb-12 leading-relaxed">

            LetsFocus is your personal productivity companion.  
            Track focus sessions, visualize study analytics, maintain streaks,
            and generate AI-powered study plans designed to help you learn faster.

          </p>

          <div className="flex justify-center gap-6">

            <Link
              to="/signup"
              className="px-10 py-4 bg-indigo-600 rounded-xl text-lg hover:bg-indigo-700 hover:scale-105 transition shadow-lg"
            >
              Start Focusing
            </Link>

            <Link
              to="/login"
              className="px-10 py-4 border border-white/30 rounded-xl hover:bg-white/10 transition"
            >
              Login
            </Link>

          </div>

        </div>

      </section>



      {/* STATS */}

      <section className="py-20 bg-black">

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 text-center">

          <div>
            <h2 className="text-4xl font-bold text-indigo-400">10K+</h2>
            <p className="text-gray-400">Focus Sessions Completed</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-indigo-400">5K+</h2>
            <p className="text-gray-400">Active Students</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-indigo-400">1M+</h2>
            <p className="text-gray-400">Minutes Focused</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-indigo-400">95%</h2>
            <p className="text-gray-400">Productivity Increase</p>
          </div>

        </div>

      </section>



      {/* FEATURES */}

      <section className="py-32 px-16">

        <h2 className="text-5xl font-bold text-center mb-20">
          Powerful Tools For Deep Work
        </h2>

        <div className="grid md:grid-cols-3 gap-12">

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-2xl hover:scale-105 transition">

            <h3 className="text-2xl font-semibold mb-4">
               Smart Focus Timer
            </h3>

            <p className="text-gray-400 text-lg">

              Enter deep work mode with a distraction-free timer
              built to maximize productivity.

            </p>

          </div>


          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-2xl hover:scale-105 transition">

            <h3 className="text-2xl font-semibold mb-4">
              📊 Productivity Analytics
            </h3>

            <p className="text-gray-400 text-lg">

              Track study streaks, visualize focus time,
              and discover your productivity patterns.

            </p>

          </div>


          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-2xl hover:scale-105 transition">

            <h3 className="text-2xl font-semibold mb-4">
               AI Study Planner
            </h3>

            <p className="text-gray-400 text-lg">

              Generate smart AI-powered study schedules
              tailored to your goals.

            </p>

          </div>

        </div>

      </section>



      {/* WHY LETSFOCUS */}

      <section className="py-32 bg-black text-center">

        <h2 className="text-5xl font-bold mb-16">
          Why Students Love LetsFocus
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">

          <div>

            <h3 className="text-2xl font-semibold mb-3">
              Stay Consistent
            </h3>

            <p className="text-gray-400">

              Maintain study streaks and build strong learning habits.

            </p>

          </div>


          <div>

            <h3 className="text-2xl font-semibold mb-3">
              Learn Faster
            </h3>

            <p className="text-gray-400">

              AI helps you create efficient study schedules.

            </p>

          </div>


          <div>

            <h3 className="text-2xl font-semibold mb-3">
              Track Progress
            </h3>

            <p className="text-gray-400">

              Visual dashboards keep you motivated every day.

            </p>

          </div>

        </div>

      </section>



      {/* TESTIMONIAL */}

      <section className="py-32 px-12 text-center">

        <h2 className="text-5xl font-bold mb-16">
          Loved By Students
        </h2>

        <div className="max-w-4xl mx-auto text-xl text-gray-300">

          "LetsFocus completely transformed my study habits.
          The focus timer and analytics helped me stay consistent
          during my exam preparation."

          <p className="mt-6 text-indigo-400">
            — Computer Science Student
          </p>

        </div>

      </section>



      {/* CTA */}

        <section className="py-24 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 relative overflow-hidden">

  <div className="absolute w-[500px] h-[500px] bg-purple-500 blur-[150px] opacity-30 left-1/2 -translate-x-1/2 top-0"></div>

  <h2 className="text-4xl font-bold mb-8 text-white">
    Ready To Transform Your Productivity?
  </h2>

  <Link
    to="/signup"
    className="px-12 py-5 bg-white text-indigo-600 rounded-xl text-lg hover:scale-105 transition"
  >
    Get Started Free
  </Link>

</section>



      {/* FOOTER */}

      <footer className="text-center py-8 text-gray-500 bg-black">

        © {new Date().getFullYear()} LetsFocus — Built for smarter studying

      </footer>

    </div>

  )

}