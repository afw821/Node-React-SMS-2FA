import http from "./httpService";
import jwtDecode from "jwt-decode";
import { apiUrl, deployedApiUrl } from "../config.json";

export async function login(userName, password) {
  const { data: jwt } = await http.post(
    apiUrl + "/auth",
    {
      userName,
      password,
    },
    { withCredentials: true }
  );
  return jwt;
}
//This will probably be DEPRECATED user with regenerate token
// export function loginWithJwt(jwt) {
//   sessionStorage.setItem("token", jwt);
// }
//***deprecated*** res.cookie sets it in browser cookies
// export function setCurrentUser(jwt) {
//   sessionStorage.setItem("token", jwt);
// }

export function logout(cookie) {
  //sessionStorage.removeItem("token");
  document.cookie = `${cookie}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function getLoggedInUser(token) {
  try {
    return jwtDecode(token);
  } catch (ex) {
    return null;
  }
}

export async function isPwResetUrlStillActive(token, userId) {
  const reqBody = {
    token: token,
    userId: userId,
  };
  const { data } = await http.post(apiUrl + "/auth/isTokenValid", reqBody);
  return data.isTokenValid;
}

export function getJwt() {
  return sessionStorage.getItem("token");
}

export default {
  login,
  logout,
  getLoggedInUser,
  getJwt,
};
