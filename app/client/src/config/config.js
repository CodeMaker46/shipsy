import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", BACKEND_URL);

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
//   withCredentials: true, // ✅ very important for CORS auth/session
});

export { BACKEND_URL };
export default api;
