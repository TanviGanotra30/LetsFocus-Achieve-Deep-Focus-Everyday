const Session = require("../models/Session")

exports.createSession = async (req, res) => {

  try {

    const { duration, subject } = req.body

const session = new Session({
  userId: req.user.id,   // 🔥 FIXED
  duration,
  subject,
  date: new Date() 
})


    await session.save()

    res.status(201).json({
      message: "Session saved successfully"
    })

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    })

  }
}

exports.getUserSessions = async (req, res) => {

  try {

    const sessions = await Session.find({ userId: req.user.id })

    res.json(sessions)

  } catch (error) {

    res.status(500).json({ message: "Server error" })

  }
}

exports.getWeeklyStats = async (req, res) => {

  try {

    const sessions = await Session.find({ userId: req.user.id })

    const weekData = {
      Mon:0,
      Tue:0,
      Wed:0,
      Thu:0,
      Fri:0,
      Sat:0,
      Sun:0
    }

    sessions.forEach(session => {

      const day = new Date(session.date).toLocaleString("en-US",{ weekday:"short" })

      if(weekData[day] !== undefined){
        weekData[day] += session.duration
      }

    })

    const chartData = Object.keys(weekData).map(day => ({
      day,
      minutes: weekData[day]
    }))

    res.json(chartData)

  } catch (error) {

    res.status(500).json({ message:"Server error" })

  }

}

exports.getContributionData = async (req, res) => {

  try {

    const sessions = await Session.find({ userId: req.user.id })

    const contributions = {}

    sessions.forEach(session => {

      const date = new Date(session.date).toISOString().split("T")[0]

      contributions[date] = (contributions[date] || 0) + session.duration

    })

    const result = Object.keys(contributions).map(date => ({
      date,
      count: contributions[date]
    }))

    res.json(result)

  } catch (error) {

    res.status(500).json({ message: "Server error" })

  }

}

exports.getStudyStreak = async (req, res) => {

  try {

    const sessions = await Session.find({ userId: req.user.id })

    const dates = sessions.map(s =>
      new Date(s.date).toISOString().split("T")[0]
    )

    const uniqueDates = [...new Set(dates)].sort()

    let streak = 0
    let today = new Date()

    for (let i = uniqueDates.length - 1; i >= 0; i--) {

      const sessionDate = new Date(uniqueDates[i])
      const diff =
        Math.floor((today - sessionDate) / (1000 * 60 * 60 * 24))

      if (diff === streak) {
        streak++
      } else {
        break
      }

    }

    res.json({ streak })

  } catch (error) {

    res.status(500).json({ message: "Server error" })

  }

}