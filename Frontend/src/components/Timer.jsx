import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { saveSession } from "../services/api"

export default function Timer({ subject }) {

  const [totalSeconds, setTotalSeconds] = useState(1500)
  const [timeLeft, setTimeLeft] = useState(1500)
  const [isRunning, setIsRunning] = useState(false)
  const [inputMinutes, setInputMinutes] = useState(25)
  const [endTime, setEndTime] = useState(null)

  useEffect(() => {

    let timer
    const finishSession = async () => {

  const sessionData = {
    duration: totalSeconds / 60,
    subject: subject || "Focus Session"
  }

  try {
    await saveSession(sessionData)
    console.log("Session saved")
  } catch (error) {
    console.log(error)
  }

}

    if (isRunning && endTime) {

      timer = setInterval(() => {

        const remaining = Math.round((endTime - Date.now()) / 1000)

        if (remaining <= 0) {

          clearInterval(timer)
          setTimeLeft(0)
          setIsRunning(false)

          finishSession()

          alert("Focus session completed!")

        } else {
          setTimeLeft(remaining)
        }

      }, 1000)

    }

    return () => clearInterval(timer)

  }, [isRunning, endTime, totalSeconds, subject])


  const startTimer = () => {

    const end = Date.now() + timeLeft * 1000
    setEndTime(end)
    setIsRunning(true)

  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(totalSeconds)
    setEndTime(null)
  }

  const setCustomTime = () => {

    const seconds = inputMinutes * 60

    setTotalSeconds(seconds)
    setTimeLeft(seconds)
    setIsRunning(false)
    setEndTime(null)
    

  }

  const percentage = ((totalSeconds - timeLeft) / totalSeconds) * 100

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (

  <div className="flex flex-col items-center justify-center p-10 bg-white/70 backdrop-blur rounded-3xl shadow-lg">

    {/* Title */}
    {/* <h2 className="text-xl font-semibold text-gray-700 mb-1">
      Set Your Focus Session
    </h2>
    <p className="text-sm text-gray-400 mb-8">
      Focus duration (minutes)
    </p> */}


    {/* CIRCLE */}
    <div className="relative w-64 h-64 flex items-center justify-center mb-8">

      {/* Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-indigo-200 blur-2xl opacity-40"></div>

      {/* Progress */}
      <div className="w-56 h-56">
        <CircularProgressbar
          value={percentage}
          text={`${minutes}:${seconds.toString().padStart(2,"0")}`}
          styles={buildStyles({
            pathColor: "#6366F1",   // indigo
            textColor: "#111827",
            trailColor: "#E5E7EB",
            strokeLinecap: "round"
          })}
        />
      </div>

    </div>


    {/* PRESET BUTTONS */}
    {/* TIME CONTROLS */}
<div className="flex items-center gap-6 mb-8">

  {/* Custom Input */}
  <div className="flex items-center gap-4 bg-white border rounded-full px-4 py-2 shadow-sm">

    <button
      onClick={() => setInputMinutes(prev => Math.max(1, prev - 5))}
      className="text-lg px-2 text-gray-500 hover:text-indigo-600"
    >
      −
    </button>

    <input
      type="number"
      value={inputMinutes}
      onChange={(e) => setInputMinutes(Number(e.target.value))}
      className="w-16 text-center text-lg font-semibold outline-none"
    />

    <button
      onClick={() => setInputMinutes(prev => prev + 5)}
      className="text-lg px-2 text-gray-500 hover:text-indigo-600"
    >
      +
    </button>

    <span className="text-gray-400 text-sm">min</span>

  </div>


  {/* Apply Button */}
  <button
    onClick={setCustomTime}
    className="px-5 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
  >
    Apply Time
  </button>

</div>


    {/* CONTROLS */}
    <div className="flex gap-4">

      <button
        onClick={startTimer}
        className="px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition shadow"
      >
        Start
      </button>

      <button
        onClick={pauseTimer}
        className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
      >
        Pause
      </button>

      <button
        onClick={resetTimer}
        className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
      >
        Reset
      </button>

    </div>

  </div>

)
}