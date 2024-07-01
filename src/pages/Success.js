
import React, { useEffect } from 'react';
import { orderSuccess } from "../services/api";
import { useLocation, useNavigate } from 'react-router-dom';
import { resetCart } from "../redux/cartReducer";
import { useDispatch } from 'react-redux';

const Success = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const session_id = new URLSearchParams(location.search).get('session_id');
    if (session_id) {
      orderSuccess(session_id)
        .then(({ data }) => {
          if(data.status === "success"){
            dispatch(resetCart());
          }
        })
        .catch(({response}) => {
          if (response.data.error === "Session ID is required" || response.data.error === "Session not found" || response.data.error === "Order already exists") {
            return navigate("/");
          }
        });
    }
  }, [location]);
  
  return (
    <section style={{ background: "#f5deb3", paddingTop: "20px", minHeight: "800px" }}>
    <div class="container mt-5">
        <h1 class="mb-4">Purchase successful, please check your email</h1>
    </div>
</section>
  )
}

export default Success