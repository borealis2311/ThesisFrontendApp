import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { loginSuccess } from "../redux/authReducer";
import { login } from "../services/api";

const Login = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if (!inputs.email || !inputs.password) {
      toast.error("Please input all fields");
      return;
    }

    login(inputs)
        .then(({data})=>{
            dispatch(loginSuccess(data));
            return navigate("/");
        })
        .catch(({response})=>{
          if(response.data==="Incorrect information") return toast.error("Incorrect information");
        });
  }

  return (
    <section id="login" style={{ background: "#f5deb3", paddingTop: "20px", minHeight: "800px" }}>
      <ToastContainer />
      <div className="container" id="main-wrapper" style={{ marginTop: "40px" }}>
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card border-0">
              <div className="card-body p-0">
                <div className="row no-gutters">
                  <div className="col-lg-5">
                    <div className="p-5">
                      <div className="mb-5"></div>
                      <h6 className="text-center h5 mb-0">Welcome back!</h6>
                      <p className="text-center text-muted mt-2 mb-5">Login to access the system</p>
                      <form>
                        <div className="form-group">
                          <div className="input-group">
                            <div className="input-group-text input-group-prepend"><i className="fas fa-envelope"></i></div>
                            <input className="form-control form-control" type="email" name="email" placeholder="Email" onChange={handleChange} />
                          </div>
                        </div>
                        <div className="form-group mb-5" style={{ paddingTop: "10px" }}>
                          <div className="input-group">
                            <div className="input-group-text input-group-prepend">
                              <i className="fas fa-lock">
                              </i>
                            </div>
                            <input 
                              className="form-control form-control" 
                              type={showPassword ? "text" : "password"} 
                              name="password" 
                              placeholder="Password" 
                              onChange={handleChange} 
                            />
                            <div 
                              onClick={handleShowPassword} 
                              className="input-group-text input-group-prepend">
                              <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-primary btn-theme" onClick={handleLogin} type="submit">Login</button>
                      </form>
                      <div style={{ marginTop: "5px" }}>
                        <br /><br />
                        <p className="text-center text-muted mt-2 mb-5">Don't have account? <Link to="/Register">Register</Link></p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7" style={{ background: "url('assets/img/login.jpg') center / auto no-repeat" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;
