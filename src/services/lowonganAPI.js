import axios from 'axios';

const API_URL = "https://fhdtsnyzhetnayjtacpu.supabase.co/rest/v1/lowongan_kerja";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoZHRzbnl6aGV0bmF5anRhY3B1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NTU3NzEsImV4cCI6MjA2NTAzMTc3MX0.z9vbdJRdyYP9jXFA8dO0RI23iDAmYsgWTKYuBq0dLjc";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

export const lowonganAPI = {
  async fetchLowongan() {
    const res = await axios.get(API_URL, { headers });
    return res.data;
  },

  async createLowongan(data) {
    const res = await axios.post(API_URL, [data], { headers }); 
    return res.data;
  },

  async updateLowongan(id, data) {
  const res = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
  return res.data;
},

  async deleteLowongan(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  }
};

