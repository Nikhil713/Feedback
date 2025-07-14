import axios from "axios";

const API_BASE = "https://feedback-portal-nikhil.azurewebsites.net";

export const submitFeedback = (feedback) =>
  axios.post(`${API_BASE}/feedback`, feedback);

export const fetchFeedback = () =>
  axios.get(`${API_BASE}/feedback`);
