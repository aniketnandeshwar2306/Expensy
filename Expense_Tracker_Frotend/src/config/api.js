// API base URL configuration
// In development: uses localhost (from .env file)
// In production: uses the deployed backend URL (set in Vercel environment variables)
const rawUrl = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").trim();
export const API_URL = rawUrl.replace(/\/+$/, "");
