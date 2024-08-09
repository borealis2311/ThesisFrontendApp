import Http from "./Http";
import objectToQueryString from "../shared/ultils/filter";

export const register = (data)=>Http.post("/Register", data);
export const login = (data)=>Http.post("/Login", data);
export const profile = (data)=>Http.post("/Profile", data);
export const getCategories = (config)=>Http.get("/categories", config);
export const getProducts = (config)=>Http.get(`/products?${objectToQueryString(config)}`);
export const createCommentProduct = (id, data)=>Http.post(`/products/${id}/comments`, data);
export const getInfoProduct = (id, config)=>Http.get(`/products/${id}`, config);
export const getComments = (id, config)=>Http.get(`/comments/${id}?${objectToQueryString(config)}`);
export const order = (data)=>Http.post("/order", data);
export const orderSuccess = (data)=>Http.post(`/orderSuccess?session_id=${data}`);
export const history = (config)=>Http.get(`/history?${objectToQueryString(config)}`);
export const detailsCart = (id, config)=>Http.get(`/details/${id}`, config);
export const historyComment = (config)=>Http.get(`/historyComment?${objectToQueryString(config)}`);
