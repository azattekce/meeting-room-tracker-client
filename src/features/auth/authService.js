// src/auth/authService.js
import httpClient from '../../api/httpClient';
export const login = (formData) => httpClient.post("/login", formData);
export const logout = () => httpClient.post("/logout");
export const getMe = () => httpClient.get("/me");
export const register = (data) => httpClient.post("/register", data);// api register endpoint'in varsa
export const refreshToken = () => httpClient.post("/refresh"); // örneğin FastAPI'de refresh endpoint'in varsa


