import axios from "axios";
const API_URL = "http://localhost:5000/Ehc/";
const register = (firstName, lastName, email, password, dateOfBirth, phone, address) => {//username, 
  return axios.post(API_URL + "User/SignUp", {
    id: 0,
    firstName,
    lastName,
    email,
    password,
    isAdmin: false,
    dateOfBirth,
    phone,
    address
  });
};
const login = (email, password) => {//changed from username
  return axios
    .post(API_URL + "User/SignIn", {
      email,
      password,
      IsAdmin : 'false'
    })
    .then((response) => {
      if (response.data) {//.accessToken
        window.sessionStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {window.sessionStorage.clear();
};
const getCurrentUser = () => {
  return JSON.parse(window.sessionStorage.getItem("user"));
};
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default AuthService;
