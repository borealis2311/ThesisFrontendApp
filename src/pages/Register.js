import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from "../services/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [inputReg, setInputReg] = useState({});
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputReg({ ...inputReg, [name]: value });
  }

  const handleRegister = (e) => {
    e.preventDefault();
  
    if (!inputReg.first_name || !inputReg.last_name || !inputReg.email || !inputReg.password || !inputReg.repass || !inputReg.gender) {
      toast.error("Please input all fields");
      return;
    }
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(inputReg.password)) {
      toast.error("Password is not valid");
      return;
    }
  
    if (inputReg.password !== inputReg.repass) {
      toast.error("Passwords do not match");
      return;
    }
  
    const dobDate = new Date(inputReg.Dob);
    const currentDate = new Date();
    if (!inputReg.Dob || isNaN(dobDate.getTime()) || dobDate > currentDate) {
      toast.error("Invalid date of birth");
      return;
    }
  
    register(inputReg)
      .then(response => {
        if (response.status === 201) {
          alert("Registration successful!");
          navigate("/login");
        }
      })
      .catch(({ response }) => {
        if (response.data === "Email exists") {
          toast.error("Email exists");
        } else {
          toast.error("Registration failed");
        }
      });
  }

  return (
    <section id="register" className="clean-block clean-form dark" style={{ background: "#f5deb3", paddingTop: "20px", minHeight: "800px" }}>
      <div className="container">
        <div className="block-heading">
          <h2 className="text-center text-info">Register</h2>
          <ToastContainer />
        </div>
        <form>
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label" htmlFor="first_name">First Name</label>
                <div className="input-group">
                  <div className="input-group-text input-group-prepend"><i className="fas fa-user"></i></div>
                  <input className="form-control" type="text" id="first_name" name="first_name" placeholder='First name' onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label" htmlFor="last_name">Last Name</label>
                <div className="input-group">
                  <div className="input-group-text input-group-prepend"><i className="fas fa-user"></i></div>
                  <input className="form-control" type="text" id="last_name" name="last_name" placeholder='Last name' onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <div className="input-group">
                <div className="input-group-text input-group-prepend"><i className="fas fa-envelope"></i></div>
                <input className="form-control" type="email" name="email" placeholder='Enter the correct email to receive notifications from the store' onChange={handleChange} />
                <span className="input-group-text">@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
                <span title="Your password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long" style={{cursor: "help"}}>
                  &#x1F6C8;
                </span>
              </label>
                <div className="input-group">
                  <div className="input-group-text input-group-prepend"><i className="fas fa-lock"></i></div>
                  <input 
                    className="form-control" 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    name="password" 
                    placeholder='Password'
                    onChange={handleChange} 
                  />
                  <div 
                    onClick={handleShowPassword} 
                    className="input-group-text input-group-prepend">
                    <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label" htmlFor="repass">Repeat Password</label>
                <div className="input-group">
                  <div className="input-group-text input-group-prepend"><i className="fas fa-lock"></i></div>
                  <input 
                    className="form-control" 
                    type={showRePassword ? "text" : "password"} 
                    id="repass" 
                    name="repass" 
                    placeholder='Repeat Password'
                    onChange={handleChange} 
                  />
                  <div 
                    onClick={handleShowRePassword} 
                    className="input-group-text input-group-prepend">
                    <i className={showRePassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label" htmlFor="gender">Gender</label>
                <div className="input-group">
                  <div className="input-group-text input-group-prepend"><i className="fas fa-venus-mars"></i></div>
                  <select className="form-control" id="gender" name="gender" onChange={handleChange}>
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label" htmlFor="Dob">Date of Birth</label>
                <div className="input-group">
                  <div className="input-group-text input-group-prepend"><i className="fas fa-calendar"></i></div>
                  <input className="form-control" id="Dob" type="date" name="Dob" onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <button className="btn btn-primary" type="submit" onClick={handleRegister}>Register</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
