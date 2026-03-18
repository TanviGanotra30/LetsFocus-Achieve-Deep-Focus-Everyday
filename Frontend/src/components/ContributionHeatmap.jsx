import { useEffect, useState } from "react"
import CalendarHeatmap from "react-calendar-heatmap"
import "react-calendar-heatmap/dist/styles.css"

import { getContributionData } from "../services/api"

export default function ContributionHeatmap() {

  const [data, setData] = useState([])

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {

    fetchData()

  }, [])

  const fetchData = async () => {

    try {

      const res = await getContributionData(user._id)

      setData(res.data)

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">
        Study Consistency
      </h2>

      <CalendarHeatmap
  startDate={new Date(new Date().setDate(new Date().getDate() - 365))}
  endDate={new Date()}
  values={data}

  classForValue={(value) => {

    if (!value) return "color-empty"

    if (value.count < 30) return "color-scale-1"
    if (value.count < 60) return "color-scale-2"
    if (value.count < 120) return "color-scale-3"

    return "color-scale-4"
  }}

  titleForValue={(value) => {

    if (!value || !value.date) return "No study"

    const minutes = value.count
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    const date = new Date(value.date).toLocaleDateString("en-US", {
      weekday: "short"
    })

    if (hours > 0) {
      return `${date} — ${hours}h ${remainingMinutes}m`
    }

    return `${date} — ${minutes} min`
  }}
/>

    </div>

  )

}