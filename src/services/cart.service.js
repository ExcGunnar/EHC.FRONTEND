import http from "../http-common";
import authHeader from "../services/auth.header";
const headerBase = authHeader().authorization
const config = {
    headers:{
      Authorization: `Bearer ${headerBase}`,
    }
  };
const getAllProducts = () => {
  return http.get("Medicine/GetAllMedicine", config);
};
const getCartItems = (userId) => {
  return http.get(`Cart/GetCartByUserID/${userId}`, config);
};
const getMedicineById = id => {
  return http.get(`Medicine/GetMedicineById/${id}`, config);
};
const addToCart = (id, userId) => {
  return http.post(`Cart/AddToCart/${id}/${userId}`, "", config);
};
const removeFromCart = (inputUserId, productId, cartItemId) => {
  return http.delete(`Cart/DeleteCartItem/${inputUserId}/${productId}/${cartItemId}`, config);//
};

const removeAllFromCart = (userId) => {
  return http.delete(`Cart/RemoveAllFromCart/${userId}`, config );//cartItems, config
};

const placeOrder = (userId, cartItems) => {
  return http.post(`Cart/PlaceOrder/${userId}`, cartItems, config);
};
// const removeAll = () => {
//   return http.delete(`/tutorials`);
// };
const findByDisease = desc => {
  return http.get(`Medicine/Search/${desc}`, config);
};
const CartService = {
  getAllProducts,
  getCartItems,
  getMedicineById,
  addToCart,
  placeOrder,
  findByDisease,
  removeFromCart,
  removeAllFromCart
//   update,
//   remove,
//   removeAll,
};
export default CartService;