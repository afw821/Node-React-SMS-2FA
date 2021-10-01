import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export function updateForgetPw(userId, token, newPassword) {
  const reqBody = {
    userId: userId,
    token: token,
    password: newPassword,
  };
  const result = http.put(
    apiUrl + `/forgotPassword/${userId}/${token}`,
    reqBody
  );

  return result;
}