import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Timer,
  Target,
  User,
  Settings,
  Bell,
  Search,
  Plus,
  MoreHorizontal,
} from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import axios from "axios"
import Background from "../components/Background"

export default function Tasks() {
  const API = import.meta.env.VITE_API_URL
  const user = JSON.parse(localStorage.getItem("user"))

  const [columns, setColumns] = useState({
    todo: [],
    focus: [],
    review: [],
    done: [],
  })

  const [newTask, setNewTask] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  // FETCH ALL TASKS
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${API}/api/tasks/${user._id}`
      )

      const grouped = {
        todo: [],
        focus: [],
        review: [],
        done: [],
      }

      res.data.forEach((task) => {
        grouped[task.status].push(task)
      })

      setColumns(grouped)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  // ADD TASK
  const addTask = async () => {
    if (!newTask.trim()) return

    try {
      await axios.post(`${API}/api/tasks`, {
        userId: user._id,
        title: newTask,
        tag: "New",
        due: "Today",
        status: "todo",
      })

      setNewTask("")
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  // MOVE TASK
  const moveTask = async (taskId, status) => {
    try {
      await axios.put(
        `${API}/api/tasks/${taskId}`,
        { status }
      )

      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  // DELETE TASK
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(
        `${API}/api/tasks/${taskId}`
      )

      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  const renderColumn = (title, key, color) => (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 min-h-[620px]">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${color}`} />
          <h3 className="font-semibold text-lg">{title}</h3>

          <span className="text-gray-400 text-sm">
            {columns[key].length}
          </span>
        </div>

        <MoreHorizontal
          size={16}
          className="text-gray-400"
        />
      </div>

      {/* TASKS */}
      <div className="space-y-4">
        {columns[key].map((task) => (
          <motion.div
            key={task._id}
            whileHover={{ y: -3 }}
            className="rounded-3xl border border-white/10 bg-black/20 p-5"
          >
            <h4 className="font-semibold text-lg">
              {task.title}
            </h4>

            <div className="flex gap-2 mt-4 flex-wrap">
              <span className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300">
                {task.tag}
              </span>

              {task.due && (
                <span className="text-xs text-gray-400">
                  {task.due}
                </span>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-5 flex-wrap">
              {key !== "todo" && (
                <button
                  onClick={() =>
                    moveTask(task._id, "todo")
                  }
                  className="text-xs px-3 py-1 rounded-xl bg-white/10"
                >
                  Todo
                </button>
              )}

              {key !== "focus" && (
                <button
                  onClick={() =>
                    moveTask(task._id, "focus")
                  }
                  className="text-xs px-3 py-1 rounded-xl bg-cyan-500/20"
                >
                  Focus
                </button>
              )}

              {key !== "review" && (
                <button
                  onClick={() =>
                    moveTask(task._id, "review")
                  }
                  className="text-xs px-3 py-1 rounded-xl bg-indigo-500/20"
                >
                  Review
                </button>
              )}

              {key !== "done" && (
                <button
                  onClick={() =>
                    moveTask(task._id, "done")
                  }
                  className="text-xs px-3 py-1 rounded-xl bg-green-500/20"
                >
                  Done
                </button>
              )}

              <button
                onClick={() =>
                  deleteTask(task._id)
                }
                className="text-xs px-3 py-1 rounded-xl bg-red-500/20 text-red-300"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen text-white flex relative overflow-hidden">
      <Background />

      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/10 bg-black/20 backdrop-blur-xl p-5 hidden lg:block relative z-10">
        <h1 className="text-xl font-bold mb-10">
          LetsFocus
        </h1>

        <nav className="space-y-3">
          {[
            [
              "Dashboard",
              "/dashboard",
              LayoutDashboard,
            ],
            ["Tasks", "/tasks", CheckSquare],
            [
              "Analytics",
              "/analytics",
              BarChart3,
            ],
            ["Timer", "/timer", Timer],
            ["Goals", "/goals", Target],
            ["Profile", "/profile", User],
            [
              "Settings",
              "/settings",
              Settings,
            ],
          ].map(([name, path, Icon]) => (
            <Link key={name} to={path}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition ${
                  path === "/tasks"
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                <Icon size={18} />
                {name}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 lg:p-8 relative z-10">
        {/* TOPBAR */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-400 w-[60%]">
            <Search size={18} />

            <input
              placeholder="Search tasks..."
              className="bg-transparent outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-5">
            <Bell size={18} />

            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center font-bold">
              {user?.name?.[0] || "A"}
            </div>
          </div>
        </div>

        {/* HEADER */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="text-5xl font-black">
              Tasks
            </h2>

            <p className="text-gray-400 mt-2 text-lg">
              Capture, prioritize, and ship.
            </p>
          </div>

          <div className="flex gap-3">
            <input
              value={newTask}
              onChange={(e) =>
                setNewTask(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" && addTask()
              }
              placeholder="Write new task..."
              className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none"
            />

            <button
              onClick={addTask}
              className="px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold flex items-center gap-2"
            >
              <Plus size={18} />
              New task
            </button>
          </div>
        </div>

        {/* BOARD */}
        {loading ? (
          <p className="mt-10 text-gray-400">
            Loading tasks...
          </p>
        ) : (
          <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6 mt-8">
            {renderColumn(
              "To do",
              "todo",
              "bg-purple-400"
            )}

            {renderColumn(
              "In focus",
              "focus",
              "bg-cyan-400"
            )}

            {renderColumn(
              "Review",
              "review",
              "bg-indigo-400"
            )}

            {renderColumn(
              "Done",
              "done",
              "bg-green-400"
            )}
          </div>
        )}
      </main>
    </div>
  )
}