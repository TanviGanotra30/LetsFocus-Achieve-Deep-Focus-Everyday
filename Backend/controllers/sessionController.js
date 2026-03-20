// const Session = require("../models/Session")

// exports.createSession = async (req, res) => {
//   try {

//     console.log("REQ.USER:", req.user)
// console.log("REQ.BODY:", req.body)
//     const duration = Number(req.body?.duration) || 0
//     const subject = req.body?.subject || "General"

//     const session = new Session({
//       userId: req.user?.id,
//       duration,
//       subject,
//       date: new Date()
//     })

//     await session.save()

//     res.status(201).json({
//       message: "Session saved successfully"
//     })

//   } catch (error) {
//    console.log("ERROR:", error)
// res.status(500).json({
//   message: error.message
// })
//   }
// }
// exports.getUserSessions = async (req, res) => {

//   try {

//     const sessions = await Session.find({ userId: req.user.id })

//     res.json(sessions)

//   } catch (error) {

//     res.status(500).json({ message: "Server error" })

//   }
// }

// // exports.getWeeklyStats = async (req, res) => {

// //   try {

// //     const startOfWeek = new Date()
// // startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()) // Sunday
// // startOfWeek.setHours(0, 0, 0, 0)

// // const endOfWeek = new Date(startOfWeek)
// // endOfWeek.setDate(endOfWeek.getDate() + 7)

// // const sessions = await Session.find({
// //   userId,
// //   createdAt: {
// //     $gte: startOfWeek,
// //     $lt: endOfWeek
// //   }
// // })

// //     const weekData = {
// //       Mon:0,
// //       Tue:0,
// //       Wed:0,
// //       Thu:0,
// //       Fri:0,
// //       Sat:0,
// //       Sun:0
// //     }

// //     sessions.forEach(session => {

// //       const day = new Date(session.date).toLocaleString("en-US",{ weekday:"short" })

// //       if(weekData[day] !== undefined){
// //         weekData[day] += session.duration
// //       }

// //     })

// //     const chartData = Object.keys(weekData).map(day => ({
// //       day,
// //       minutes: weekData[day]
// //     }))

// //     res.json(chartData)

// //   } catch (error) {

// //     res.status(500).json({ message:"Server error" })

// //   }

// // }


// exports.getWeeklyStats = async (req, res) => {
//   try {
//     const { userId } = req.params



// const today = new Date()
// const day = today.getDay()

// const diff = today.getDate() - day + (day === 0 ? -6 : 1)

// const startOfWeek = new Date(today.setDate(diff))
// startOfWeek.setHours(0, 0, 0, 0)

// const endOfWeek = new Date(startOfWeek)
// endOfWeek.setDate(endOfWeek.getDate() + 7)


//     const sessions = await Session.find({
//       userId,
//       createdAt: {
//         $gte: startOfWeek,
//         $lt: endOfWeek
//       }
//     })

//     const weekData = {
//       Mon: 0,
//       Tue: 0,
//       Wed: 0,
//       Thu: 0,
//       Fri: 0,
//       Sat: 0,
//       Sun: 0
//     }

//     sessions.forEach(session => {
//       const day = new Date(session.createdAt).toLocaleString("en-US", {
//         weekday: "short"
//       })

//       if (weekData[day] !== undefined) {
//         weekData[day] += session.duration
//       }
//     })

//     const chartData = Object.keys(weekData).map(day => ({
//       day,
//       minutes: weekData[day]
//     }))

//     res.json(chartData)

//   } catch (error) {
//     res.status(500).json({ message: "Server error" })
//   }
// }





// exports.getContributionData = async (req, res) => {

//   try {

//     const sessions = await Session.find({ userId: req.user.id })

//     const contributions = {}

//     sessions.forEach(session => {

//       const date = new Date(session.date).toISOString().split("T")[0]

//       contributions[date] = (contributions[date] || 0) + session.duration

//     })

//     const result = Object.keys(contributions).map(date => ({
//       date,
//       count: contributions[date]
//     }))

//     res.json(result)

//   } catch (error) {

//     res.status(500).json({ message: "Server error" })

//   }

// }

// exports.getStudyStreak = async (req, res) => {

//   try {

//     const sessions = await Session.find({ userId: req.user.id })

//     const dates = sessions.map(s =>
//       new Date(s.date).toISOString().split("T")[0]
//     )

//     const uniqueDates = [...new Set(dates)].sort()

//     let streak = 0
//     let today = new Date()

//     for (let i = uniqueDates.length - 1; i >= 0; i--) {

//       const sessionDate = new Date(uniqueDates[i])
//       const diff =
//         Math.floor((today - sessionDate) / (1000 * 60 * 60 * 24))

//       if (diff === streak) {
//         streak++
//       } else {
//         break
//       }

//     }

//     res.json({ streak })

//   } catch (error) {

//     res.status(500).json({ message: "Server error" })

//   }

// }






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
      date: new Date()
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
      .sort({ createdAt: -1 })

    res.json(sessions)

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}


// ================= WEEKLY STATS =================
exports.getWeeklyStats = async (req, res) => {
  try {
    const userId = req.user.id

    const today = new Date(new Date().toLocaleString("en-US", {
  timeZone: "Asia/Kolkata"
}))

    // 🟢 START OF WEEK (MONDAY)
    const day = today.getDay()
    const diff = today.getDate() - day + (day === 0 ? -6 : 1)

    // const startOfWeek = new Date(today)
    // startOfWeek.setDate(diff)
    // startOfWeek.setHours(0, 0, 0, 0)

    // const endOfWeek = new Date(startOfWeek)
    // endOfWeek.setDate(endOfWeek.getDate() + 7)

    const firstDayOfWeek = new Date(today)
firstDayOfWeek.setHours(0, 0, 0, 0)
firstDayOfWeek.setDate(today.getDate() - today.getDay())

const lastDayOfWeek = new Date(firstDayOfWeek)
lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6)
lastDayOfWeek.setHours(23, 59, 59, 999)

    const sessions = await Session.find({
      userId: req.user.id,
      date: {
        $gte: startOfWeek,
        $lt: endOfWeek
      }
    })

    const weekData = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0
    }

     sessions.forEach(session => {
    //   const dayName = new Date(session.createdAt).toLocaleString("en-US", {
    //     weekday: "short"
    //   })
    const day = new Date(session.date).toLocaleString("en-US", {
  weekday: "short",
  timeZone: "Asia/Kolkata"
})

      if (weekData[dayName] !== undefined) {
        weekData[dayName] += Number(session.duration) || 0
      }
    })

    const chartData = Object.keys(weekData).map(day => ({
      day,
      minutes: weekData[day]
    }))

    res.json(chartData)

  } catch (error) {
    console.log("WEEKLY ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}


// ================= CONTRIBUTION DATA =================
exports.getContributionData = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id })

    const contributions = {}

    sessions.forEach(session => {
      const date = new Date(session.createdAt)
        .toISOString()
        .split("T")[0]

      contributions[date] =
        (contributions[date] || 0) + Number(session.duration)
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


// ================= STUDY STREAK =================
exports.getStudyStreak = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id })

    const dates = sessions.map(s =>
      new Date(s.createdAt).toISOString().split("T")[0]
    )

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
    res.status(500).json({ message: "Server error" })
  }
}