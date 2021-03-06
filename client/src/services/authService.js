import http from "./httpService";
import jwtDecode from "jwt-decode";
import { apiUrl, deployedUrl } from "../config.json";

export async function login(validationCode, userId) {
  const { data: jwt } = await http.post(
    deployedUrl + `/auth/secondLevelAuth/${userId}`,
    {
      validationCode,
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

export async function getSMSCode(userName, password) {
  //first level auth

  const { data } = await http.post(
    deployedUrl + "/auth/firstLevelAuth",
    {
      userName,
      password,
    }
    //{ withCredentials: true }
  );
  const { user, validPassword, token } = data;
  
  //sessionStorage.setItem("valid_pw_token", token);
  return {
    user,
    validPassword,
    token,
  };
}

export function logout(cookie) {
  //sessionStorage.removeItem("token");
  document.cookie = `${cookie}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function getTokenFromCookie() {
  //get the current user
  const fullCookie = document.cookie;

  const cookie = fullCookie.replace("AUTH_SESSION_TOKEN=", "");

  return decodeToken(cookie);
}

export function decodeToken(token) {
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
  const { data } = await http.post(deployedUrl + "/auth/isTokenValid", reqBody);
 
  return data.isTokenValid;
}

export function getJwt() {
  return sessionStorage.getItem("token");
}

export default {
  login,
  logout,
  decodeToken,
  getJwt,
  getTokenFromCookie,
};
