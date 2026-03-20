const express = require("express")
const router = express.Router()

const {
  createSession,
  getUserSessions,
  getWeeklyStats,
  getContributionData,
  getStudyStreak
} = require("../controllers/sessionController")

const { protect } = require("../middleware/authMiddleware")

router.post("/create", protect, createSession)
router.get("/", protect, getUserSessions)
router.get("/weekly", protect, getWeeklyStats)
router.get("/contributions", protect, getContributionData)
router.get("/streak", protect, getStudyStreak)

module.exports = router