import http from "./httpService";
import { apiUrl, deployedUrl } from "../config.json";

export function sendEmailContact(name, email, message) {
  const data = {
    name,
    email,
    message,
  };
  return http.post(deployedUrl + "/messages/contact", data);
}

export function sendEmailRegister(fromEmail, name) {
  const data = {
    fromEmail,
    name,
  };
  return http.post(deployedUrl + "/messages/register", data);
}

export function sendEmailPurchase(name, toEmail, html, userId) {
  const data = {
    name: name,
    toEmail: toEmail,
    html: html,
    userId: userId,
  };

  return http.post(deployedUrl + "/messages/purchase", data);
}

export function sendEmailForgotPW(email) {
  return http.post(deployedUrl + `/emails/forgotPassword/${email}`);
}