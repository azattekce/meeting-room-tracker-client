import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import LoginModal from "../features/auth/components/LoginModal";
import { useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [show, setShow] = useState(false);
  const { color } = useContext(ThemeContext);

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${color} bg-${color}`}>
        <div className="container">
          <Link className="navbar-brand" to="/">📅 Toplantı Yönetimi</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/users">Kullanıcılar</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/meetings">Toplantılar</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/rooms">Toplantı Odaları</Link></li>
              <li className="nav-item">
                {user ? (
                  <div className="d-flex align-items-center">
                    <span className="nav-link text-light me-3">
                      Hoşgeldin, {user.firstname} {user.lastname}
                    </span>
                    <button className="btn btn-outline-light btn-sm" onClick={logout}>Çıkış Yap</button>
                  </div>
                ) : (
                  <span className="nav-link" style={{ cursor: "pointer" }} onClick={() => setShow(true)}>
                    Login
                  </span>
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
