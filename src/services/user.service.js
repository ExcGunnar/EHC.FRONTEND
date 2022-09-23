import axios from "axios";
import authHeader from "./auth.header";
const API_URL = "http://localhost:5000/Ehc/";
const getPublicContent = () => {
  return axios.get(API_URL + "all"); 
  // need to set landing page rather than an api call
};
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
// const getModeratorBoard = () => {
//   return axios.get(API_URL + "mod", { headers: authHeader() });
// };
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
const UserService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
};
export default UserService;