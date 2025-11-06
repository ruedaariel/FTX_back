
// src/auth/jwt.js
import jwtDecode from 'jwt-decode';

// Decodifica payload
export function decodeToken(token) {
  try {
    return jwtDecode(token); // payload
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  const payload = decodeToken(token);
  if (!payload) return true;
  // claim exp en segundos
  if (!payload.exp) return true;
  return Date.now() / 1000 >= payload.exp;
}
