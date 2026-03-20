const Session = require("../models/Session")

// ================= CREATE SESSION =================
exports.createSession = async (req, res) => {
  try {
    const duration = Number(req.body?.duration) || 0
    const subject = req.body?.subject || "General"

    const session = new Session({
      userId: req.user.id,
      duration,
      subject,
      date: new Date() // ✅ consistent field
    })

    await session.save()

    res.status(201).json({
      message: "Session saved successfully"
    })

  } catch (error) {
    console.log("CREATE ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}


// ================= GET USER SESSIONS =================
exports.getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id })
      .sort({ date: -1 }) // ✅ use date

    res.json(sessions)

  } catch (error) {
    console.error("GET SESSIONS ERROR:", error)
    res.status(500).json({ message: "Server error" })
  }
}


// ================= WEEKLY STATS =================
exports.getWeeklyStats = async (req, res) => {
  try {

    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const today = new Date()

    const firstDayOfWeek = new Date(today)
    firstDayOfWeek.setHours(0, 0, 0, 0)
    firstDayOfWeek.setDate(today.getDate() - today.getDay())

    const lastDayOfWeek = new Date(firstDayOfWeek)
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6)
    lastDayOfWeek.setHours(23, 59, 59, 999)

    const sessions = await Session.find({
      userId,
      date: {
        $gte: firstDayOfWeek,
        $lte: lastDayOfWeek
      }
    })

    const weekData = {
      Sun: 0,
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0
    }

    sessions.forEach(session => {
      if (!session.date) return

      const d = new Date(session.date)
      if (isNaN(d)) return

      const day = d.toLocaleString("en-US", { weekday: "short" })

      if (weekData[day] !== undefined) {
        weekData[day] += Number(session.duration) || 0
      }
    })

    const chartData = Object.keys(weekData).map(day => ({
      day,
      minutes: weekData[day]
    }))

    res.json(chartData)

  } catch (error) {
    console.error("WEEKLY ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}


// ================= CONTRIBUTION DATA =================
exports.getContributionData = async (req, res) => {
  try {

    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const sessions = await Session.find({ userId })

    const contributions = {}

    sessions.forEach(session => {
      if (!session.date) return

      const d = new Date(session.date)
      if (isNaN(d)) return

      const date = d.toISOString().split("T")[0]

      contributions[date] =
        (contributions[date] || 0) + Number(session.duration)
    })

    const result = Object.keys(contributions).map(date => ({
      date,
      count: contributions[date]
    }))

    res.json(result)

  } catch (error) {
    console.error("CONTRIBUTION ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}


// ================= STUDY STREAK =================
exports.getStudyStreak = async (req, res) => {
  try {

    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const sessions = await Session.find({ userId })

    const dates = sessions
      .map(s => {
        if (!s.date) return null
        const d = new Date(s.date)
        if (isNaN(d)) return null
        return d.toISOString().split("T")[0]
      })
      .filter(Boolean)

    const uniqueDates = [...new Set(dates)].sort()

    let streak = 0
    const today = new Date()

    for (let i = uniqueDates.length - 1; i >= 0; i--) {
      const sessionDate = new Date(uniqueDates[i])

      const diff = Math.floor(
        (today - sessionDate) / (1000 * 60 * 60 * 24)
      )

      if (diff === streak) {
        streak++
      } else {
        break
      }
    }

    res.json({ streak })

  } catch (error) {
    console.error("STREAK ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}