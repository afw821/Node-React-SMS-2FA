import http from "./httpService";
import { apiUrl, deployedUrl } from "../config.json";

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
 
  const { data: user } = await http.post(deployedUrl + "/users", obj);

  return user;
}

export async function getUserById(id) {
  const reqBody = {
    token: sessionStorage.getItem("token"),
  };
  const user = await http.post(deployedUrl + `/users/${id}`, reqBody);

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
  const result = await http.put(deployedUrl + `/users/${id}`, reqBody);

  return result;
}

export default {
  register,
};