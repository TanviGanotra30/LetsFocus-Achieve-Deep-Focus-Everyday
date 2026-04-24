// import axios from "axios"

// const API = axios.create({
//   baseURL: "https://letsfocus-backend.onrender.com/api"
// })
// // API.interceptors.request.use((req) => {
// //   const token = localStorage.getItem("token")

// //   if (token) {
// //     req.headers.Authorization = `Bearer ${token}`
// //   }

// //   return req
// // })


// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token")

//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`
//   }

//   return req
// })

// export const saveSession = (data) => {
//   return API.post("/session/create", data)   
// }


// export const getSessions = async () => {
//   return API.get(`/session`)
// }

// export const getWeeklyStats = () => {
//   return API.get(`/session/weekly`)
// }
// export const getContributionData = async () => {
//   return API.get(`/session/contributions`)
// }

// export const getStudyStreak = async () => {
//   return API.get(`/session/streak`)
// }



// import axios from "axios";

// const API = import.meta.env.VITE_API_URL;

// const token = localStorage.getItem("token");

// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };

// export const getSessions = () =>
//   axios.get(`${API}/api/session`, config);

// export const getWeeklyStats = () =>
//   axios.get(`${API}/api/session/weekly`, config);

// export const getContributionData = () =>
//   axios.get(`${API}/api/session/contributions`, config);

// export const getStudyStreak = () =>
//   axios.get(`${API}/api/session/streak`, config);


import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getSessions = () =>
  axios.get(`${API}/api/session`, getConfig());

export const getWeeklyStats = () =>
  axios.get(`${API}/api/session/weekly`, getConfig());

export const getContributionData = () =>
  axios.get(`${API}/api/session/contributions`, getConfig());

export const getStudyStreak = () =>
  axios.get(`${API}/api/session/streak`, getConfig());