import axios from 'axios';

const AUTH_TOKEN_KEY = 'authToken';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  delete http.defaults.headers.common.Authorization;
}

http.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  } else {
    config.headers.delete('Authorization');
  }
  return config;
});
