import axios from 'axios';
import { API_BASE_URL } from '../config';

// 1. Axios Instance உருவாக்கம்
const apiService = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // CORS ரிக்வெஸ்ட்களுக்கு இது மிக முக்கியம்
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor
// ஒவ்வொரு முறை Backend-க்கு தகவல் அனுப்பும்போதும் டோக்கன் இருந்தால் அதைச் சேர்க்கும்
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // இமேஜ் அப்லோட் செய்ய FormData பயன்படுத்தினால் Content-Type-ஐ மாற்றும்
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor
// சர்வரிடமிருந்து வரும் எர்ரர்களைக் கையாளும்
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      // லாகின் எக்ஸ்பையர் ஆகிவிட்டால்
      console.error("Authentication failed or Token expired.");
      localStorage.removeItem('token');
      // தேவைப்பட்டால் அட்மின் லாகின் பக்கத்திற்கு ரீடைரக்ட் செய்யலாம்
      // if (window.location.hash.includes('/admin')) window.location.href = '/login';
    }
    
    if (!error.response) {
      console.error("Server is not responding. Please check your Backend URL.");
    }

    return Promise.reject(error);
  }
);

export default apiService;