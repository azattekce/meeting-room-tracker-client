import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import LoginModal from "../features/auth/components/LoginModal";
import { useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import { FaCalendarAlt, FaUsers, FaHandshake, FaDoorOpen, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [show, setShow] = useState(false);
  const { color } = useContext(ThemeContext);

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${color} bg-${color}`}>
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <FaCalendarAlt className="me-2" />
            Toplantı Yönetimi
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  <FaUsers className="me-2" />
                  Kullanıcılar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/meetings">
                  <FaHandshake className="me-2" />
                  Toplantılar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/rooms">
                  <FaDoorOpen className="me-2" />
                  Toplantı Odaları
                </Link>
              </li>
            </ul>
            
            <ul className="navbar-nav">
              <li className="nav-item">
                {user ? (
                  <div className="d-flex align-items-center">
                    <span className="navbar-text me-3">
                      Hoşgeldin, {user.firstname} {user.lastname}
                    </span>
                    <button className="btn btn-outline-light btn-sm" onClick={logout}>
                      <FaSignOutAlt className="me-1" />
                      Çıkış Yap
                    </button>
                  </div>
                ) : (
                  <button 
                    className="btn btn-outline-light" 
                    onClick={() => setShow(true)}
                  >
                    <FaSignInAlt className="me-1" />
                    Giriş Yap
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <LoginModal show={show} handleClose={() => setShow(false)} />
    </>
  );
};

export default Navbar;
