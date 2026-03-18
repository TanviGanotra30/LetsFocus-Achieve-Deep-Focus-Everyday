import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js"

import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale,LinearScale,BarElement)

export default function ProductivityChart(){

const data={
  labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
  datasets:[
    {
      label:"Focus Hours",
      data:[2,4,3,5,6,4,3]
    }
  ]
}

return(

<div className="bg-white p-6 rounded-xl shadow">

<h2 className="text-lg font-semibold mb-4">
Weekly Productivity
</h2>

<Bar data={data}/>

</div>

)

}