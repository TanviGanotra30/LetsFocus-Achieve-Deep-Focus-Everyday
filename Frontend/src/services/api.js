import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api"
})

export const saveSession = async (data) => {
  return API.post("/session/create", data)
}

export const getSessions = async (userId) => {
  return API.get(`/session/user/${userId}`)
}

export const getWeeklyStats = async (userId) => {
  return API.get(`/session/weekly/${userId}`)
}

export const getContributionData = async (userId) => {
  return API.get(`/session/contributions/${userId}`)
}

export const getStudyStreak = async (userId) => {
  return API.get(`/session/streak/${userId}`)
}