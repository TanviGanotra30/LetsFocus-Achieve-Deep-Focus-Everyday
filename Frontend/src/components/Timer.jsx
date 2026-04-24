import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  RotateCcw,
  Search,
  Bell,
} from "lucide-react";
import Background from "../components/Background";

export default function Timer() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const API = import.meta.env.VITE_API_URL + "/api/session";

  const [subject, setSubject] = useState("");
  const [customTime, setCustomTime] = useState(25);

  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  const [sessions, setSessions] = useState([]);

  const timerRef = useRef(null);

  useEffect(() => {
    restoreTimer();
    fetchSessions();
  }, []);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(updateTimer, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [running]);

  const restoreTimer = () => {
    const saved = localStorage.getItem("focusTimer");

    if (!saved) return;

    const data = JSON.parse(saved);

    if (data.endTime) {
      setRunning(true);
      updateTimer();
    }
  };

  const updateTimer = () => {
    const data = JSON.parse(
      localStorage.getItem("focusTimer")
    );

    if (!data) return;

    const diff = Math.floor(
      (data.endTime - Date.now()) / 1000
    );

    if (diff <= 0) {
      clearInterval(timerRef.current);
      setRunning(false);
      setRemaining(0);
      completeSession(data.duration);
      localStorage.removeItem("focusTimer");
      return;
    }

    setRemaining(diff);
  };

  const startTimer = () => {
    const endTime =
      Date.now() + customTime * 60 * 1000;

    localStorage.setItem(
      "focusTimer",
      JSON.stringify({
        endTime,
        duration: customTime,
      })
    );

    setRemaining(customTime * 60);
    setRunning(true);
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setRunning(false);
    localStorage.removeItem("focusTimer");
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setRunning(false);
    setRemaining(customTime * 60);
    localStorage.removeItem("focusTimer");
  };

  const completeSession = async (mins) => {
    try {
      await axios.post(
        `${API}/create`,
        {
          subject:
            subject || "Focus Session",
          duration: mins,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchSessions();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSessions = async () => {
    try {
      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSessions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;

  const totalMinutes = sessions.reduce(
    (sum, item) => sum + item.duration,
    0
  );

  return (
    <div className="min-h-screen flex text-white relative overflow-hidden">
      <Background />

      <aside className="w-60 hidden lg:block border-r border-white/10 bg-black/20 p-5 z-10">
        <h1 className="text-xl font-bold mb-10">
          LetsFocus
        </h1>

        <nav className="space-y-3">
          {[
            ["Dashboard", "/dashboard"],
            ["Tasks", "/tasks"],
            ["Analytics", "/analytics"],
            ["Timer", "/timer"],
          ].map(([name, path]) => (
            <Link key={name} to={path}>
              <div className="px-4 py-3 rounded-2xl hover:bg-white/5">
                {name}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 z-10">
        <div className="text-center mt-10">
          <h1 className="text-5xl font-black">
            Focus Timer
          </h1>
          <p className="text-gray-400 mt-2">
            Persistent Deep Work Engine
          </p>
        </div>

        {/* Subject */}
        <div className="max-w-xl mx-auto mt-8">
          <input
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
            placeholder="What are you studying?"
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10"
          />
        </div>

        {/* Custom Time */}
        <div className="flex justify-center gap-4 mt-5">
          <input
            type="number"
            min="1"
            value={customTime}
            onChange={(e) =>
              setCustomTime(
                Number(e.target.value)
              )
            }
            className="w-32 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
          />

          <button
            onClick={() =>
              setRemaining(customTime * 60)
            }
            className="px-5 rounded-xl bg-cyan-500"
          >
            Set Minutes
          </button>
        </div>

        {/* Timer Circle */}
        <div className="flex justify-center mt-10">
          <div className="w-[340px] h-[340px] rounded-full border-[12px] border-white/10 flex items-center justify-center bg-white/5">
            <h1 className="text-7xl font-black">
              {String(mins).padStart(2, "0")}:
              {String(secs).padStart(2, "0")}
            </h1>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-5 mt-8">
          <button
            onClick={startTimer}
            className="w-16 h-16 rounded-2xl bg-cyan-500"
          >
            <Play />
          </button>

          <button
            onClick={pauseTimer}
            className="w-16 h-16 rounded-2xl bg-white/10"
          >
            <Pause />
          </button>

          <button
            onClick={resetTimer}
            className="w-16 h-16 rounded-2xl bg-white/10"
          >
            <RotateCcw />
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="rounded-3xl bg-white/5 p-6">
            <p className="text-gray-400">
              Total Focus
            </p>
            <h2 className="text-5xl font-black mt-3">
              {Math.floor(totalMinutes / 60)}h{" "}
              {totalMinutes % 60}m
            </h2>
          </div>

          <div className="rounded-3xl bg-white/5 p-6 max-h-[280px] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              Recent Sessions
            </h3>

            {sessions.map((item) => (
              <div
                key={item._id}
                className="py-3 border-b border-white/10 flex justify-between"
              >
                <div>
                  <p>{item.subject}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(
                      item.createdAt
                    ).toDateString()}
                  </p>
                </div>

                <p>{item.duration}m</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}