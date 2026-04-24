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