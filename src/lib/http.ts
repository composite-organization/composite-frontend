import axios from 'axios';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export function setAuthToken(token: string): void {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function clearAuthToken(): void {
  delete http.defaults.headers.common.Authorization;
}
