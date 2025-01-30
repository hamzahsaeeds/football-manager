import axios from "axios";

const API_URL = "/api";

export const loginOrRegister = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth`, { email, password });
  return res.data;
};

export const getUserTeam = async (token) => {
  const res = await axios.get(`${API_URL}/team`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
