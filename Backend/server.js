const express = require("express")
const authRoutes = require("./routes/authRoutes")
const mongoose = require("mongoose")
const cors = require("cors")
const sessionRoutes = require("./routes/sessionRoutes")
const aiRoutes = require("./routes/aiRoutes")

require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/session", sessionRoutes)
app.use("/api/ai", aiRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err))

app.get("/", (req,res)=>{
  res.send("StudyFlow API running")
})

app.listen(5000,()=>{
  console.log("Server running on port 5000")
})