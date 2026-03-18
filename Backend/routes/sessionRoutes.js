const express = require("express")
const router = express.Router()

const { createSession,getUserSessions,getWeeklyStats,getContributionData,getStudyStreak} = require("../controllers/sessionController")

router.post("/create", createSession)
router.get("/user/:userId", getUserSessions)
router.get("/weekly/:userId", getWeeklyStats)
router.get("/contributions/:userId", getContributionData)
router.get("/streak/:userId", getStudyStreak)

module.exports = router

