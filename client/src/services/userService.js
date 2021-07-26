import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export async function register(
  firstName,
  lastName,
  userName,
  phoneNo,
  email,
  password,
  isAdmin,

) {
  const obj = {
    firstName,
    lastName,
    userName,
    phoneNo,
    email,
    password,
    isAdmin,
  };
  console.log("register", obj);
  const { data: user } = await http.post(apiUrl + "/users", obj);
  console.log("returned user", user);
  return user;
}

export async function getUserById(id) {
  const reqBody = {
    token: sessionStorage.getItem("token"),
  };
  const user = await http.post(apiUrl + `/users/${id}`, reqBody);

  return user;
}

export async function updateUser(
  id,
  firstName,
  lastName,
  address,
  address2,
  city,
  state,
  zipCode,
  email,
  isAdmin
) {
  const reqBody = {
    firstName,
    lastName,
    address,
    address2,
    city,
    state,
    zipCode,
    email,
    isAdmin,
    token: sessionStorage.getItem("token"),
  };
  const result = await http.put(apiUrl + `/users/${id}`, reqBody);

  return result;
}

export default {
  register,
};