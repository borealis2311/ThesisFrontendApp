import axios from "axios";
import { jwtDecode } from "jwt-decode"
import { baseAPI } from "../shared/api/app";
import { loggedOut } from "../redux/authReducer";
import { store } from "../redux/store";
import { resetCart } from "../redux/cartReducer";

const Http = axios.create({
    baseURL: baseAPI
});
Http.interceptors.request.use(function (config) {
  const Auth = store.getState().Auth;
  const accessToken = Auth.login.currentUser?.accessToken;

  if(accessToken){
    const decoded = jwtDecode(accessToken);
    if(decoded.exp < new Date()/1000){
      store.dispatch(resetCart());
      store.dispatch(loggedOut());
    }
    config.headers["token"] = `Bearer ${accessToken}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default Http;