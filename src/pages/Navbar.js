import React from 'react';
import { Link } from 'react-router-dom';
import { loggedOut } from "../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../redux/cartReducer";


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logged = useSelector(({ Auth }) => Auth.login.logged);
  const currentUser = useSelector(({ Auth }) => Auth.login.currentUser);
  const totalCart = useSelector(({Cart})=>Cart.items.reduce((total,item)=>total + item.qty, 0))

  const clickLogout = (e) => {
    e.preventDefault();
    dispatch(resetCart());
    dispatch(loggedOut());
    return navigate("/");
  }


  return (
    <section id="navbar">
      <nav className="navbar navbar-expand-md bg-color-nav">
      <div className="container">
      <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/assets/img/icon.png" alt="Icon" style={{ width: '90px', height: '45px' }} />
      </Link>
          <div className="collapse navbar-collapse" id="navcol-2">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item" />
              <li className="nav-item"><Link className="nav-link" to="/Menu">Menu</Link></li>
              {logged ? (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/Cart">Cart({totalCart})</Link></li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {"Hello " + currentUser?.first_name + " " + currentUser?.last_name}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><Link className="dropdown-item" to="/Profile">Profile</Link></li>
                      <li><Link className="dropdown-item" to="/History">History</Link></li>
                      <li><div className="dropdown-item" onClick={clickLogout}>Log out</div></li>
                    </ul>
                  </li>
                </>
              ) : (
                <li className="nav-item"><Link className="nav-link" to="/Login">Login</Link></li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </section>
  )
}

export default Navbar;
