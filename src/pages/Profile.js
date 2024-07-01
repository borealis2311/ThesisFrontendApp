import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../services/api";
import { loggedOut } from "../redux/authReducer";
import { resetCart } from "../redux/cartReducer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputEdit, setInputEdit] = useState({});
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    setInputEdit({
      first_name: currentUser?.first_name,
      last_name: currentUser?.last_name,
      gender: currentUser?.gender,
      Dob: currentUser?.Dob,
      email: currentUser?.email, 
    });
    setShowModal(true);
  };
  const currentUser = useSelector(({ Auth }) => Auth.login.currentUser);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputEdit({ ...inputEdit, [name]: value });
  }

  const handleEdit = (e) => {
    e.preventDefault();

    const dobDate = new Date(inputEdit.Dob);
    const currentDate = new Date();
    if (!inputEdit.Dob || isNaN(dobDate.getTime()) || dobDate > currentDate) {
      toast.error("Invalid date of birth");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (inputEdit.password && !passwordRegex.test(inputEdit.password)) {
      toast.error("Password is not valid");
      return;
    }


    profile(inputEdit)
      .then(({ data }) =>{
        dispatch(resetCart());
        dispatch(loggedOut());
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <section id="navbar" style={{ background: "#f5deb3", paddingTop: "20px", minHeight: "800px" }}>
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-8 col-xl-12">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h2>Personal Information</h2>
                      <ToastContainer/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <p>First name</p>
                    </div>
                    <div className="col-sm-9">
                      <p>{currentUser?.first_name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <p>Last name</p>
                    </div>
                    <div className="col-sm-9">
                      <p>{currentUser?.last_name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <p>Gender</p>
                    </div>
                    <div className="col-sm-9">
                      <p>{currentUser?.gender}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <p>Date of birth</p>
                    </div>
                    <div className="col-sm-9">
                      <p>{currentUser?.Dob}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <p>Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p>{currentUser?.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <button className="btn btn-primary" onClick={handleShowModal}>Edit</button>
                    </div>
                  </div>
                  {showModal && (
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="modal-title">
                              <h5>Personal Information</h5>
                              <h6>(After save changes, you will be logout)</h6>
                            </div>
                            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="mb-3">
                                <label htmlFor="first_name" className="form-label">First name</label>
                                <input type="text" className="form-control" id="first_name" name="first_name" onChange={handleChange} value={inputEdit.first_name} />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="last_name" className="form-label">Last name</label>
                                <input type="text" className="form-control" id="last_name" name="last_name" onChange={handleChange} value={inputEdit.last_name} />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <select className="form-select" id="gender" name="gender" onChange={handleChange} value={inputEdit.gender}>
                                  <option value="">Select Gender</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                              <div className="mb-3">
                                <label htmlFor="Dob" className="form-label">Date of birth</label>
                                <input type="date" className="form-control" id="Dob" name="Dob" onChange={handleChange} value={inputEdit.Dob} />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="Password" className="form-label">Password</label>
                                <span title="Your password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long" style={{cursor: "help"}}>
                                  &#x1F6C8;
                                </span>
                                <input type="password" className="form-control" id="Password" name="password" placeholder='New password' onChange={handleChange} />
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleEdit}>Save changes</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
