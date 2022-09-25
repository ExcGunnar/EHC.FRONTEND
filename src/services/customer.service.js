import http from "../http-common";
import authHeader from "../services/auth.header";
const headerBase = authHeader().authorization
const config = {
    headers:{
      Authorization: `Bearer ${headerBase}`,
    }
  };
const getAll = () => {
  return http.get("User/GetAllUsers", config);
};
const get = id => {
  return http.get(`User/FindUserById/${id}`, config);
};

const findByEmail = email => {
  return http.get(`User/FindUserByEmail/${email}`, config);
};
const CustomerService = {
  getAll,
  get,
  
findByEmail
};
export default CustomerService;