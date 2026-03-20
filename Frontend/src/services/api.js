import axios from "axios"

const API = axios.create({
  baseURL: "https://letsfocus-backend.onrender.com/api"
})
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token")

//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`
//   }

//   return req
// })


API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token")

  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }

  return req
})

export const saveSession = (data) => {
  return API.post("/session/create", data)   
}


export const getSessions = async () => {
  return API.get(`/session`)
}

export const getWeeklyStats = async () => {
  return API.get(`/session/weekly`)
}

export const getContributionData = async () => {
  return API.get(`/session/contributions`)
}

export const getStudyStreak = async () => {
  return API.get(`/session/streak`)
}