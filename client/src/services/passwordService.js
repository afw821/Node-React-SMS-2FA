import http from "./httpService";
import { apiUrl, deployedUrl } from "../config.json";

export function updateForgetPw(userId, token, newPassword) {
  const reqBody = {
    userId: userId,
    token: token,
    password: newPassword,
  };
 
  const result = http.post(
    deployedUrl + `/auth/forgotPassword/${userId}`,reqBody
  );

  return result;
}
