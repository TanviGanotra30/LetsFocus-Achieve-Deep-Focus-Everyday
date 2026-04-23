import { useState } from "react"
import { Plus, Check, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

export default function TodoCard() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([
    { text: "Ship landing page redesign", done: true },
    { text: "Review Q2 OKRs with team", done: true },
    { text: "90-min deep work: API refactor", done: false },
    { text: "Reflection journal", done: false },
  ])

  const addTask = () => {
    if (!task.trim()) return

    setTasks([
      ...tasks,
      {
        text: task,
        done: false,
      },
    ])

    setTask("")
  }

  const toggleTask = (index) => {
    const updated = [...tasks]
    updated[index].done = !updated[index].done
    setTasks(updated)
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask()
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl font-bold text-white">Today</h3>

        <button
          onClick={addTask}
          className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center hover:scale-105 transition"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Input */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Add today's task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-black/30 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400"
        />

        <button
          onClick={addTask}
          className="px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold"
        >
          Add
        </button>
      </div>

      {/* Tasks */}
      <div className="space-y-4">
        {tasks.map((item, index) => (
          <motion.div
            key={index}
            layout
            className="flex items-center justify-between group"
          >
            <div
              onClick={() => toggleTask(index)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div
                className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                  item.done
                    ? "bg-cyan-500 border-cyan-500"
                    : "border-gray-400"
                }`}
              >
                {item.done && <Check size={12} />}
              </div>

              <p
                className={`text-lg ${
                  item.done
                    ? "line-through text-gray-500"
                    : "text-gray-200"
                }`}
              >
                {item.text}
              </p>
            </div>

            <button
              onClick={() => deleteTask(index)}
              className="opacity-0 group-hover:opacity-100 transition text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}