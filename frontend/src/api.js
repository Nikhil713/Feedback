import axios from "axios";

const API_BASE = "http://127.0.0.1:8000"; // change this for Azure later

export const submitFeedback = (feedback) =>
  axios.post(`${API_BASE}/feedback`, feedback);

export const fetchFeedback = () =>
  axios.get(`${API_BASE}/feedback`);
