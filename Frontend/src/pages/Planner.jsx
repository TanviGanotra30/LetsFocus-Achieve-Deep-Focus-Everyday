import { useState } from "react"
import axios from "axios"

export default function Planner() {

  const [subjects,setSubjects] = useState("")
  const [hours,setHours] = useState("")
  const [goal,setGoal] = useState("")
  const [plan,setPlan] = useState("")

  const generatePlan = async () => {

    const res = await axios.post(
      "http://localhost:5000/api/ai/study-plan",
      { subjects, hours, goal }
    )

    setPlan(res.data.plan)
  }

  return(

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        AI Study Planner
      </h1>

      <input
        placeholder="Subjects (DSA, OS)"
        onChange={(e)=>setSubjects(e.target.value)}
        className="border p-2 mb-3 block"
      />

      <input
        placeholder="Hours available"
        onChange={(e)=>setHours(e.target.value)}
        className="border p-2 mb-3 block"
      />

      <input
        placeholder="Goal"
        onChange={(e)=>setGoal(e.target.value)}
        className="border p-2 mb-3 block"
      />

      <button
        onClick={generatePlan}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Generate Plan
      </button>

      <pre className="mt-6 bg-gray-100 p-4">
        {plan}
      </pre>

    </div>

  )

}