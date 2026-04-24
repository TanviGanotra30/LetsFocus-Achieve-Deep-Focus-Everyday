const Session = require("../models/Session")
exports.createSession = async (req, res) => {
  try {
    const duration = Number(req.body?.duration) || 0
    const subject = req.body?.subject || "General"

    const session = new Session({
      userId: req.user.id,
      duration,
      subject,
    })

    await session.save()

    res.status(201).json({ message: "Session saved successfully" })

  } catch (error) {
    console.log("CREATE ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id })
      .sort({ createdAt: -1 }) 

    res.json(sessions)

  } catch (error) {
    console.error("GET SESSIONS ERROR:", error)
    res.status(500).json({ message: "Server error" })
  }
}

exports.getWeeklyStats = async (req, res) => {
  try {
    const userId = req.user?.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" })

    const today = new Date()

    const firstDayOfWeek = new Date(today)
    firstDayOfWeek.setDate(today.getDate() - today.getDay())
    firstDayOfWeek.setHours(0, 0, 0, 0)

    const lastDayOfWeek = new Date(firstDayOfWeek)
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6)
    lastDayOfWeek.setHours(23, 59, 59, 999)

    const sessions = await Session.find({
      userId,
      createdAt: {
        $gte: firstDayOfWeek,
        $lte: lastDayOfWeek,
      },
    })

    const weekData = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 }

    sessions.forEach(session => {
      const d = new Date(session.createdAt)
      if (isNaN(d)) return
      const day = d.toLocaleString("en-US", { weekday: "short" })
      if (weekData[day] !== undefined) {
        weekData[day] += Number(session.duration) || 0
      }
    })

    const chartData = Object.keys(weekData).map(day => ({
      day,
      minutes: weekData[day],
    }))

    res.json(chartData)

  } catch (error) {
    console.error("WEEKLY ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.getContributionData = async (req, res) => {
  try {
    const userId = req.user?.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" })

    const sessions = await Session.find({ userId })

    const contributions = {}

    sessions.forEach(session => {
      const d = new Date(session.createdAt)
      if (isNaN(d)) return

      const date = d.toISOString().split("T")[0] // "YYYY-MM-DD"
      contributions[date] = (contributions[date] || 0) + Number(session.duration)
    })

    const result = Object.keys(contributions)
      .sort() // chronological order
      .map(date => ({ date, count: contributions[date] }))

    res.json(result)

  } catch (error) {
    console.error("CONTRIBUTION ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}


exports.getStudyStreak = async (req, res) => {
  try {
    const userId = req.user?.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" })

    const sessions = await Session.find({ userId })

    const dates = sessions
      .map(s => {
        const d = new Date(s.createdAt)
        if (isNaN(d)) return null
        return d.toISOString().split("T")[0]
      })
      .filter(Boolean)

    const uniqueDates = [...new Set(dates)].sort() // ascending

    let streak = 0
    const todayStr = new Date().toISOString().split("T")[0]

    // Walk backwards from today
    for (let i = uniqueDates.length - 1; i >= 0; i--) {
      const expected = new Date()
      expected.setDate(expected.getDate() - streak)
      const expectedStr = expected.toISOString().split("T")[0]

      if (uniqueDates[i] === expectedStr) {
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
