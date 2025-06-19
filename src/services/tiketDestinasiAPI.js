import axios from 'axios'

const API_URL = "https://uvpquemlrqmpwcsstceu.supabase.co/rest/v1/tiketDestinasi"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2cHF1ZW1scnFtcHdjc3N0Y2V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MjcxOTYsImV4cCI6MjA2NTAwMzE5Nn0.Xk0Af7ztTknXyiNpsoAAOJpD8GhOgS58MEIEB-_-u2M"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
}

export const tiketDestinasiAPI = {
  async fetchTiket() {
    const res = await axios.get(API_URL, { headers });
    return res.data;
  },

  async createTiket(data) {
    const res = await axios.post(API_URL, [data], { headers }); 
    return res.data;
  },

  async updateTiket(id, data) {
  const res = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
  return res.data;
},

  async deleteTiket(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  }
};