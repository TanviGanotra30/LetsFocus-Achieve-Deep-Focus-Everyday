const express = require("express")
const authRoutes = require("./routes/authRoutes")
const mongoose = require("mongoose")
const cors = require("cors")
const sessionRoutes = require("./routes/sessionRoutes")
const aiRoutes = require("./routes/aiRoutes")
const taskRoutes = require("./routes/taskRoutes")

require("dotenv").config()

const app = express()

app.use(cors({
  origin: [ "http://localhost:5173",
    "https://lets-focus-achieve-deep-focus.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true
}))


app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/session", sessionRoutes)
app.use("/api/ai", aiRoutes)
app.use("/api/tasks", taskRoutes)


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

app.get("/", (req, res) => {
  res.send("LetsFocus API running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})