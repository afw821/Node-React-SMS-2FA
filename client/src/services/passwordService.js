import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export function updateForgetPw(userId, token, newPassword) {
  const reqBody = {
    userId: userId,
    token: token,
    password: newPassword,
  };
  console.log("request body from pw service", reqBody);
  const result = http.put(
    apiUrl + `/forgotPassword/${userId}`,
    reqBody
  );

  return result;
}
